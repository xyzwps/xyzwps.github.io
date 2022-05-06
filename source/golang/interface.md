---
title: 接口
---

## 接口的定义与实现

接口是一组方法签名的集合。一个类型实现了接口，是指它实现了接口中的所有方法。
一个类型实现接口是隐式的，只需要实现接口中的所有方法即可，并不需要在类型的某个地方标注实现的接口名称（如 Java 中的 `implement`）。
这把接口的定义和实现解耦了。

```go
package main
import ("fmt"; "math")

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // MyFloat 实现了 Abser
	a = &v // *Vertex 实现了 Abser

	a = v // 不可以，因为 v 是一个 Vertex（而非 *Vertex），Vertex 没有实现 Abser

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
```

## 接口值

在底层，接口的值是一个值和具体类型的二元组——`(value, type)`。接口值持有一个底层类型的值。
接口值调用方法，是使用底层的值调用底层类型的方法。

```go
package main

import ( "fmt"; "math" )

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	fmt.Println(t.S)
}

type F float64

func (f F) M() {
	fmt.Println(f)
}

func main() {
	var i I

	i = &T{"Hello"}
	describe(i) // 输出 (&{Hello}, *main.T)
	i.M() // 输出 Hello

	i = F(math.Pi)
	describe(i) // 输出 (3.141592653589793, main.F)
	i.M() // 输出 3.141592653589793
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

如果接口值内部的值是一个 `nil`，但是有底层类型，那么接口值调用方法时，会往方法的接受参数中传入一个 `nil`。在别的语言中，这会抛出一个空指针异常，但是 Go 中不会，因为方法就是函数。

## 接口零值

接口零值既没有值，又没有具体类型。用接口零值调用方法，会跑出一个运行时错误，因为没有具体类型绑定，所以没有函数可以调用。比如：

```go
package main
import "fmt"

type I interface {
	M()
}

func main() {
	var i I
	describe(i) // 输出 (<nil>, <nil>)
	i.M() // panic: runtime error, balabalabala
}

func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

## 空接口

空接口没有任何方法声明。就像下面那样：

```go
interface {}
```

空接口可以持有任何类型的值（因为每个类型至少实现了 0 个方法）。空接口通常用来处理类型未知的值，比如 `fmt.Print` 接受任何数量的 `interface{}` 参数。

```go
package main
import "fmt"

func main() {
	var i interface{}
	describe(i) // (<nil>, <nil>)

	i = 42
	describe(i) // (42, int)

	i = "hello"
	describe(i) // (hello, string)
}

func describe(i interface{}) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

## 类型断言

类型断言提供一种方式来访问接口底层 value。

```go
t := i.(T)
```

上面的语句，断言接口值 `i` 持有一个 `T` 类型的底层值，并把这个底层值赋值给 `t`。如果 `i` 不含有 `T` 类型的值，那么就会触发一个 panic。

为了检测接口值是否持有具体类型，接口断言可以返回两个值：底层值和断言是否正确：

```go
t, ok = i.(T)
```

如果 `i` 持有 `T` 类型的底层值，那么 `ok == true` 且 `t` 被赋值为接口底层值；否则，`ok == false`，`t` 被赋值为类型 `T` 的零值，不会触发 panic。

```go
package main

import "fmt"

func main() {
	var i interface{} = "hello"

	s := i.(string)
	fmt.Println(s) // 输出 hello

	s, ok := i.(string)
	fmt.Println(s, ok) // 输出 hello true

	f, ok := i.(float64)
	fmt.Println(f, ok) // 输出 0 false

	f = i.(float64) // panic
	fmt.Println(f)
}
```

## 类型 switch

类型 switch 允许进行一系列类型断言。类型 switch 和普通 switch 类似，但是 case 后面跟的是类型名称，而不是具体的值：

```go
switch v := i.(type) { // 注意这里括号中是关键字 type
case T:
    // v 是 T 类型的
case S:
    // v 是 S 类型的
default:
    // 没匹配，v 和 i 是统一类型
}
```

## 常用接口

### Stringer

`Stringer` 是一个很常用的接口，被定义在 `fmt` 包中：

```go
type Stringer interface {
    String() string
}
```

`Stringer` 用于输出一个对象的字符串描述（类似于 Java 的 `toString`），`fmt` 包用这个接口来打印值。

### Error

Go 语言用 `error` 值来表达错误状态。`error` 接口是一个內建接口，大约长下面这样：

```go
type error interface {
    Error() string
}
```

函数经常会返回一个 `error` 值，调用代码需要对此做检查，如果非 `nil`，就要处理错误：

```go
i, err := strconv.Atoi("42")
if err != nil {
    fmt.Printf("couldn't convert number: %v\n", err)
    return
}
fmt.Println("Converted integer:", i)
```

`error` 值为 `nil` 表示成功，否则表示失败。

### io.Reader

在 `io` 包中，有一个叫 `io.Reader` 的接口，表示读到一个流数据的末尾。Go 语言有很多标准库实现了此接口，比如文件、网络连接、压缩、密码等等等等。此接口只有一个方法：

```go
func (T) Read(b []byte) (n int, err error)
```

这个方法把数据中的字节读到一个切片中，并返回读到的字节数和一个错误。如果到了流的末尾，则会返回一个 `io.EOF` 错误。