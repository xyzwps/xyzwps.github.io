---
title: 数组和 Slice
---

## 数组

类型 `[n]T` 是指一个数组可以存放 `n` 个 `T` 类型的值。

像下面这样声明一个数组变量：

```go
var a [3]int // a 的值是 [0 0 0]
```

数组的长度是类型的一部分，所以数组大小不可变。

## 切片（slice）

虽然数组是固定大小的，但是切片是动态大小的。切片是数组的一个视图。在实践中，切片更常用。

类型 `[]T` 用于声明一个存放 `T` 类型元素的切片。注意：这里比较隐晦，方括号里带有数字的是数组，不带数字的是切片。

切片需要两个指标，下界和上界，这两个指标用分号隔开。比如：`a[low : high]`。切片包含 `a` 的第 `low` 个元素，但不包含第 `high` 个。这样一来，其长度是 `high - low`（通行做法嘛）。

```go
primes := [6]int{2, 3, 5, 7, 11, 13} // primes 是一个数组
var s []int = primes[1:4] // s 是一个切片
fmt.Println(s) // 输出 [3 5 7]
```

### 底层数组

切片本身并不存放任何数据，它只是描述了底层数组的一部分。改变切片的元素，也会改变底层数组中的对应元素。这个改变，对其他共享同一底层数组元素的切片也是可见的。

```go
nums := [4]int{ 1, 2, 3, 4 }   // 定义一个数组
fmt.Println(nums)              // 输出 [1 2 3 4]

a, b := nums[0:2], nums[1:3]      // a 和 b 共享 nums[1]
fmt.Println("a =", a, ", b =", b) // 输出 a = [1 2] , b = [2 3]

b[0] = 5                          // 改变切片 b 的第一个元素
fmt.Println("a =", a, ", b =", b) // 输出 a = [1 5] , b = [5 3]
fmt.Println(nums)                 // 输出 [1 5 3 4]
```

注意，切片不能超出底层数组的范围。

### 切片字面量

切片字面量和数组字面量类似，唯一的区别就是不带有长度。

```go
[3]bool{true, true, false} // 数组字面量
[]bool{true, true, false}  // 切片字面量，不带有长度
```

### 切片语法默认行为

做切片时，你可以忽略上界和下界，这时会使用默认值。下界的默认值是 0，上界的默认值是数组长度。对于数组：

```go
var a [10]int
```

下面的切片表达式等价：

```go
a[0:10]
a[:10]
a[0:]
a[:]
```

### 长度和容量

切片既有长度，又有容量。切片的长度是切片中的元素数量。容量是底层数组的长度**减去**切片的下界（只能往屁股上追加）。切片 `s` 的长度和容量分别用表达式 `len(s)` 和 `cap(s)` 求出。你可以通过“重切片”操作来扩展切片的长度，但是要给出足够的容量。

```go
s := []int{2, 3, 5, 7, 11, 13}
s := s[:0] // []，重切片
s := s[:4] // [2 3 5 7]，重切片。注意，上一步 len(s) 已经是 0 了，真骚
```

### 零值

切片的零值是 `nil`。零切片的长度和容量都是 0，且没有底层数组。

```go
var s []int
fmt.Println(s, len(s), cap(s)) // 输出 [] 0 0
if s == nil {
    fmt.Println("nil!")
}
```

这里非常蛋疼：尽管 `s == nil`，但 `fmt.Println(s)` 输出的是 `[]`，而且 `len(nil)` 直接被拒绝。 `len(nil)` 抛出了一个错误，叫 `use of untyped nil`，所以 `nil` 也是有类型的……

### make

可以通过内置函数 `make` 来创建切片，这使你可以动态指定切片容量大小。`make` 函数会分配一个元素均为零值的数组，并返回对此数据的切片。可以在 `make` 函数的第三个参数中指定切片容量。

```go
package main

import "fmt"

func main() {
	a := make([]int, 5)
	printSlice("a", a) // a len=5 cap=5 [0 0 0 0 0]

	b := make([]int, 0, 5)
	printSlice("b", b) // b len=0 cap=5 []

	c := b[:2]
	printSlice("c", c) // c len=2 cap=5 [0 0]

	d := c[2:5]
	printSlice("d", d) // d len=3 cap=3 [0 0 0]
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\n", s, len(x), cap(x), x)
}
```

### append

往切片后面追加新元素是很常见的操作。Go 语言提供了內建的 `append` 函数来做这件事：

```go
func append(s []T, vs ...T) []T
```

第一个参数是被追加新元素的切片，剩下的参数是要追加的新元素。

如果切片的底层数组容量太小，新元素放不下了，`append` 函数会分配一个新的更大的数组，返回的切片会指向新数组。

### range

`for` 循环的 `range` 形式是在一个切片或者 map 上进行迭代。

```go
pow := []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {
    fmt.Printf("2**%d = %d\n", i, v)
}
```

如果你想跳过索引或者值，可以用 `_` 替代：

```go
for i, _ := range pow
for _, value := range pow
```

如果你只想要索引，可以直接忽略第二个变量：

```go
for i := range pow
```

## 参考

* [Go Slices: usage and internals](https://blog.golang.org/slices-intro)
* [append 函数文档](https://golang.org/pkg/builtin/#append)