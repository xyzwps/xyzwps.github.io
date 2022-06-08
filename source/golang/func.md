---
title: 函数
comments: false
---

## 函数定义

Go 语言中，函数可以接受 0 个或多个参数。函数的声明以关键字 `func` 开头，后面依次是：函数名、函数的参数列表、函数的返回值和函数体。比如：

```go
func add(x int, y int) int {
	return x + y
}
```

## 函数参数

函数参数中，如果连续有几个参数类型相同，那么除了最后一个参数的类型之外，前面的可以省略。比如：

```go
func add(x, y int) int {
	return x + y
}
```

### 按值传递

函数的参数一般都是按值传递。对于 struct，传入的是一份 struct 的深复制：

```go
package main

import "fmt"

type Point2D struct {
	X, Y int
}

type Line struct {
	Start Point2D
	End   Point2D
	Extra int
}

func MoveX(l Line) Line {
	l.Start.X *= 2
	l.End.X *= 2
	l.Extra *= 2
	return l
}

func main() {
	l := Line{
		Start: Point2D{1, 2},
		End:   Point2D{3, 4},
		Extra: 5,
	}
	fmt.Printf("l  = %v\n", l)
	sl := MoveX(l)
	fmt.Printf("sl = %v\n", sl)
	fmt.Printf("l  = %v\n", l)
}
```

输出结果：

```console
l  = {{1 2} {3 4} 5}
sl = {{2 2} {6 4} 10}
l  = {{1 2} {3 4} 5}
```

### varargs

Go 语言的函数支持可变参数。`fmt` 包和 `log` 包里有很多这样的函数。这里也写一个例子演示下：

```go
package main

func sum(start int, values ...int) int {
	result := start
	for _, it := range values {
		result += it
	}
	return result
}

func main() {
	println(sum(1, 2, 3, 4))
	println(sum(1))
	println(sum(1, []int{2, 3, 4}...)) // 解构 slice 时把三个点放到后面
}
```

输出：

```console
10
1
10
```

## 函数返回值

在 Go 语言中，函数可以一次返回多个值。比如：

```go
package main
import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
```

你甚至可以给每个返回值取个名字，不过它们在函数内部被视为变量。比如：

```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return x, y
}
```

如果能用文档的形式说明一下返回值名称的意思，那就再好不过啦。

如果给返回值取了名，那么 `return` 语句后面可以啥也不写，比如下例。这种写法叫”裸“返回。
如果函数比较短，这种写法就很简洁。如果函数比较长，这种写法就影响可读性了。

```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}
```

## 重载

所谓重载……反正 go 也不支持重载，不解释了。

既然 go 不支持重载，那么那些内建函数，比如 `make` 是怎么做到类似重载的效果的呢？可以看到，`make` 函数的签名如下：

```go
func make(t Type, size ...IntegerType) Type
```

它能给人一种重载的感觉，全靠约定 :-P


## 高阶函数

函数也是值，所以函数可以被作为参数传来传去，也可以作为返回值返回。比如：

```go
func compute(fn func(float64, float64) float64) float64 {
	return fn(3, 4)
}

hypot := func(x, y float64) float64 {
	return math.Sqrt(x*x + y*y)
}

fmt.Println(compute(hypot))    // 5
fmt.Println(compute(math.Pow)) // 81
```

## 闭包

Go 语言中的函数可能是一个闭包。闭包是一种特殊的函数，它引用了自己函数体外部的变量。闭包可以访问和修改外部引用。比如：

```go
package main
import "fmt"

func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(pos(i), neg(-2*i))
	}
}
```

## defer 语句

见[Defer 语句](./defer/)。