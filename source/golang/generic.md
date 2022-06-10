---
title: 泛型
comments: false
---

Go 1.18 版本引入泛型，而且是比较简单的那种。

# 泛型函数

下面有两个函数：

```go
func SumInt(a, b int) int {
	return a + b
}

func SumFloat32(a, b float32) float32 {
	return a + b
}
```

在没有泛型之前，这样的东西就只能硬写。有了泛型之后，就可以写成这样：

```go
func Sum[T int | float32](a, b T) T {
	return a + b
}
```

注意，函数名 `Sum` 后面的方括号中 `T` 是泛型参数，它的取值可以是 `int` 或者 `float32`。使用上也很简单：

```go
println(Sum[int](1, 2))
println(Sum[float32](1.2, 2.3))
```

因为 1 和 2 是 `int` 字面量，所以 `Sum[int](1, 2)` 中的类型参数可以去掉，简写为 `Sum(1, 2)`；因为 1.2 和 2.3 是 `float64` 字面量，所以 `Sum[float32](1.2, 2.3)` 就不能把类型参数去掉。我们可以通观察 IDE 的只能提示来判断是否可以去掉类型参数😁。

# 泛型 struct

就像函数的泛型参数列表要写到函数名后面那样，struct 的泛型参数列表要写到 struct 名称后面，比如：

```go
type Pair[A any, B any] struct {
	First  A
	Second B
}
```

在使用时，类型列表也是要放到 struct 名称后面：

```go
println(Pair[int, string]{First: 1, Second: "12"})
```

# 类型约束

从上面的例子可以看到，泛型参数列表要放到函数或者 struct 的名称后面，用方括号括起来；多个参数用逗号分隔。泛型参数名后面是类型约束。

类型约束一般有这么几种：

* 类型元素约束，即一个或多个类型的联合。如果有多个类型的话，用 `|` 把它们分割开。比如 `[T int | float32 | float64]` 表示 `T` 可以是 `int`、`float32`、`float64`，但不可以是别的。
* 底层类型约束，即接受底层类型为某个指定类型的参数，用 `~` 标在底层类型前方。比如 `[T ~int]` 表示 `T` 的底层类型必须是 `int`。
* `comparable` 是一个 interface，所有的可比较类型都实现了它。这些可比较类型有：布尔类型、数字类型、字符串、指针、channel、可比较类型数组，以及所有字段都是可比较类型的 struct。这个接口仅用于类型约束。比如 `[T comparable]`。
* `any`。

上面写的泛型约束都是一种简写的方式。比如：

```go
[T []P]         // = [T interface{[]P}]
[T ~int]        // = [T interface{~int}]
[T int|string]  // = [T interface{int|string}]
```

泛型参数列表里的类型可以相互依赖。比如下例中类型 `T` 就依赖于类型 `F`：

```go
func List1[T []F, F int | float32 | string](i F) T {
	result := make(T, 1)
	result[0] = i
	return result
}
```

# 示例

有了泛型之后，我们就能快乐地做一些以前做不到的事情了。比如写一个 reduce 函数：

```go
func Reduce[T any, R any](list []T, reducer func(T, R) R, init R) (result R) {
	result = init
	for _, it := range list {
		result = reducer(it, result)
	}
	return
}
```

比如写一个 map 函数:

```go
func Map[F any, T any](from []F, mapper func(F) T) []T {
	to := make([]T, len(from))
	for i, it := range from {
		to[i] = mapper(it)
	}
	return to
}
```

# 泛型库

网上应该也有人写了一些处理集合的一些库，比如 [samber/lo](https://github.com/samber/lo)。可以编程过程中的痛苦少了一大半~

# 常见问题

## 如何返回 T 类型的零值

比如有这么一个函数:

```go
func A[T any]() (T, error) {
	if result, err := doSomething(); err != nil {
		return ${T的零值}, err
	} else {
		return result, nil
	}
}
```

`${}` 部分应该写什么？如果写 `nil` 会产生一个编译时错误。Go 中也没有类似 C# 中的默认值表达式。该怎么办？这里只能绕一下了，比如写成下面这样：

```go
func A[T any]() (T, error) {
	if result, err := doSomething(); err != nil {
		var zeroValue T  // 这里声明一个 T 类型的变量
		return zeroValue, err
	} else {
		return result, nil
	}
}
```


# 参考

- [The Go Programming Language Specification](https://go.dev/ref/spec)