---
title: type 关键字
comments: false
---

`type` 关键字有两个作用：**声明类型别名**和**定义类型**。

每个类型都有一个[底层类型](https://golang.org/ref/spec#Types)。

TODO: 底层类型

## 类型别名

定义类型别名的语法是：

```go
type 类型别名 = 类型
```

比如：

```go
type (
    A1 = string  // A1 是 string
    A2 = A1      // A2 是 string
    A3 = []A2    // A3 是 []string
)

type A4 = string // A4 是 string

type Point = struct { X, Y int } // Point 是 struct { x int; y int; z int }
```

类型别名和原来的类型是一回事：

```go
package main

import (
	"fmt"
	"reflect"
)

type A1 = string

func main() {
	tstring := reflect.TypeOf("a0")
	fmt.Println(tstring)        // 输出 string

	var a1 A1 = "a1"
	ta1 := reflect.TypeOf(a1)
	fmt.Println(ta1, a1)        // 输出 string a1
	fmt.Println(ta1 == tstring) // 输出 true
}
```

## 定义类型

类型定义的语法是：

```go
type 类型别名 类型
```

比如：

```go
package main

type (
    A1 string  // A1 是 main.A1，底层类型是 string
    A2 A1      // A2 是 main.A2，底层类型是 string
    A3 []A2    // A3 是 main.A3，底层类型是 []string
)

type A4 string // A4 是 main.A4，底层类型是 string

type Point struct { X, Y int } // Point 是 main.Point，底层类型是 struct { x int; y int; z int }
```

可以直接把底层类型的值赋值给新定义的类型。比如：

```go
var a1 A1 = "a1" // 把 string 值赋值给 main.A4 变量
```

类型定义之后，新类型和原类型就不是同一个类型了：

```go
package main

import (
	"fmt"
	"reflect"
)

type A1 string // 这是和上一节例子的唯一区别

func main() {
	tstring := reflect.TypeOf("a0")
	fmt.Println(tstring)       // 输出 string

	var a1 A1 = "a1"
	ta1 := reflect.TypeOf(a1)
	fmt.Println(ta1, a1)        // 输出 main.A1 a1
	fmt.Println(ta1 == tstring) // 输出 false
}
```

### 方法

我们可以给新定义的类型增加方法。为 struct 类型增加方法的例子可以在 [struct](./struct/#方法) 这一节找到。这里给一个更加简单的例子：

```go
type Integer int64

func (i Integer) isOdd() bool {
	return i%2 == 1
}

func main() {
	i := Integer(32)
	fmt.Printf("%v is odd: %v", i, i.isOdd())
}
```

注意，你不可以为非本地（*non-local*）类型定义方法。比如下面为 `int` 定义的新方法是不允许的：

```go
func (v int) p() int {
	return v
}
```

TODO: 底层类型