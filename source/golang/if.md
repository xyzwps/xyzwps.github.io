---
title: if 语句
---

## 基本 if 语句

就像 `for` 语句那样，`if` 语句的条件表达式不需要用括号圈住，而且后面的花括号不可省略。比如：

```go
if x < 0 {
    return "negative"
}
```

## 带有初始语句的 if 语句

就像 `for` 语句那样，`if` 语句可以以一个短语句开始，这个语句在每次条件判断前执行。其中声明的变量只在 `if` 语句的作用域内有效。比如：

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}
```

## if...else...

`if` 语句后面可以带有一个 `else` 块。在 `if` 语句的短语句中声明的变量也可以在 `else` 块中访问。比如：

```go
func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
	return lim
}
```