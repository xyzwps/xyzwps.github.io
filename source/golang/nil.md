---
title: nil
---

# 两个 nil 不相等的问题

观察下面代码：

```go
package main

import "fmt"

func passNil(it interface{}) interface{} {
	fmt.Printf("it.isNil    : %v \n", it == nil)
	return it
}

func main() {
	var str *string = nil
	fmt.Printf("str.isNil   : %v \n", str == nil)

	it := passNil(str)
	fmt.Printf("finally pk  : %v\n", str == it)
}
```

猜猜看输出是什么？下面把答案写出来：

```console
str.isNil   : true
it.isNil    : false
finally pk  : true
```

注意到第二行是 `false` 了么？😂

这事解释起来比较麻烦，有很多细节，这里尝试解释一下。

## 接口变量与 nil

[Go 语言规范在变量部分](https://go.dev/ref/spec#Variables)对接口类型的变量做了这样的描述：


> Variables of interface type also have a distinct *dynamic type*, which is the (non-interface) type of the value assigned to the variable at run time (unless the value is the predeclared identifier `nil`, which has no type). The dynamic type may vary during execution but values stored in interface variables are always assignable to the static type of the variable.
>
> 即：接口类型的变量还有一个用于区分的*动态类型*。这个动态类型不是接口类型，其值是在运行时决定的（除非其值是 `nil`，`nil` 没有类型）。在执行过程中，这个动态类型的值是可能发生变化的，不过接口变量中存储的值总能赋值给静态类型的变量。

语言规范中还举了个例子：

```go
var x interface{}  // x 是 nil, 其静态类型是 interface{}
var v *T           // v 的值是 nil, 静态类型是 *T
x = 42             // x 的值是 42, 其动态类型是 int
x = v              // x 的值是 (*T)(nil), 其动态类型是 *T
```

## 接口类型的比较

[语言规范中对接口类型的比较规则](https://go.dev/ref/spec#Comparison_operators)描述如下：

* 接口值之间比较。对于两个接口类型的值，如果它们有相同的动态类型，并且它们的动态值相等或者都是 `nil`，那么它们就是相等的。
* 对于一个**非接口类型 X** 的值 x 和一个**接口类型 T** 的值 t，如果类型 X 是可比较的，并且 X 实现了接口 T，那么 x 和 t 之间就是可比较的。如果 t 的动态类型是 X，并且 t 的动态值是 x，那么 x 和 t 相等。

## 对开头部分代码的解释

现在就可以解释开头部分代码中的三个比较的结果了：

1. 第一处比较的结果为 `true`：`nil` 指针当然和 `nil` 相等。
1. 第二处 `it` 是一个接口变量，虽然其动态值为 `nil`，但是其动态类型为 `*string`，所以 `it` 和 `nil` 不相等。
1. 第三处 `it` 也是一个动态值为 `nil` 动态类型为 `*string` 的接口变量，但是 `str` 的值是 `nil` 类型是 `*string`，所以 `it` 和 `str` 相等。

## 如果你曾是 Java 开发者

如果你曾是 Java 开发者，到了这里，你应该意识到了 Go 中的接口和 Java 中的接口在语义上完全不同，只是在用法上，多数情况下看起来很相似而已。从感觉上说，Go 语言中的接口更像是一个包装盒。

**注意闭坑**。

# nil 的类型

上面说了，`nil` 没有类型。😁

# 练习

```go
package main

import "fmt"

func main() {
	var x, y interface{}
	var p *string
	var i *int

	fmt.Println("x %#v", x)
	fmt.Println("p %#v", p)
	fmt.Println("x == p %#v", x == p)

	x = p
	y = i

	fmt.Println("x == y %#v", x == y)
}
```

请尝试预测以上代码的输出结果，并解释原因。