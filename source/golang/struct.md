---
title: Struct
---

`struct` 是一组字段的集合。

## 定义 struct

像下面这样定义一个 `struct`：

```go
type Vertex struct {
	X int
	Y int
}
```

像下面这样创建一个 `struct` 值：

```go
fmt.Println(Vertex{1, 2}) // 输出： {1, 2}
```

## 访问字段

使用点号 `.` 来访问 struct 的字段。如：

```go
v := Vertex{1, 2}
v.X = 4
fmt.Println(v.X)
```

## 指向 struct 的指针

可以通过 struct 指针来直接访问字段。例如：

```go
v := Vertex{1, 2}
p := &v
p.X = 1e9 // 注意，这里 p 是一个指针
fmt.Println(v)
```

本来可以使用 `(*p).X` 的形式来访问字段的，但是这么做有点呆萌，所以 Go 语言允许使用 `p.X` 的形式，直接用指针来访问 struct 字段，而不用显示的解引用（少有的贴心）。

## 字面量

Struct 字面量表示一个新分配的 struct 值，形式是在 struct 名称后面的花括号里把字段值列出来。比如：

```go
Vertex{1, 2}       // 按字段声明顺序，X 是 1, Y 是 2
Vertex{Y: 1, X: 2} // 按名指定字段值
```

创建 struct 值是，可以只给一部分字段设初值。这个时候就必须要指定字段名称了：

```go
Vertex{X: 1}  // Y 取零值
Vertex{}  // X 和 Y 都取零值
```

## 方法

你可以在 struct 类型上定义方法。方法是一个函数，但是带有一个特殊的接受参数。接受参数出现在 `func` 关键字和方法名之间。比如：

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

v := Vertex{3, 4}
fmt.Println(v.Abs()) // 5
```

因为方法是函数，所以上例可以写成这样：

```go
fmt.Println(Abs(v)) // 5
```

## 指针接受参数

接受参数可以是指针类型的。如果接受参数是值类型，那么传入方法的其实是值的副本，你在方法里对它做的任何修改都不会影响函数调用者。使用指针接受参数，就不会有此限制。因为这个原因，指针类型的接受参数实际上会被用得更多。下例演示了两种接受参数的区别：

```go
package main
import ("fmt", "math")

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	v.X *= 2
	v.Y *= 2
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs()) // 输出 100
	fmt.Println(v.Abs()) // 因为 Abs 中修改的是 v 的副本，所以输出和上一行一样
}
```

// TODO: time.Time.Add 探究