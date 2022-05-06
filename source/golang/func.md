---
title: 函数
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