---
title: for 语句
comments: false
---

## for 语句

Go 语言只有一种循环语句：`for` 循环。

像 Java、C 或 JavaScript 那样，基本的 `for` 循环有三个部分，用两个分号隔开，其中：

* 第一部分是初始化语句，只在 `for` 循环开始时执行一次。这一部分应该是一个短变量声明，而且这里声明的变量仅在 `for` 语句作用域内可用。
* 第二部分是条件表达式，如果值为 `True` 就会迭代。一旦值为 `False`，循环就会结束。
* 第三部分是迭代后语句，在每次迭代后执行。

和 Java、C 或 JavaScript 不同的是，`for` 循环中的三个部分没有被括号括起来，而且 `for` 循环后面的花括号不可省略。举个例子：

```go
sum := 0
for i := 0; i < 10; i++ {
    sum += i
}
```

`for` 语句的初始化语句和迭代后语句可以省略，如：

```go
sum := 1
for ; sum < 1000; {
    sum += sum
}
```

`for` 循环甚至可以像 C 语言中的 `while` 那样使用，如：

```go
sum := 1
for sum < 1000 {
    sum += sum
}
```

如果你连条件表达式都省了，那么 `for` 语句就会无限循环，如：

```go
for {
    // do something forever
}
```

Go 没有逗号操作符，而且 `++` 和 `--` 是语句而非表达式，所以，如果要在 `for` 语句中使用多个变量，应使用平行命名的方式：

```go
// 反转 a
for i, j := 0, len(a)-1; i < j; i, j = i+1, j-1 {
	a[i], a[j] = a[j], a[i]
}
```

## for...range

我们可以使用 for...range 来遍历数组、slice、map，甚至可以从 channel 接受数据。具体用法请参见对应的部分，这里不再举例。