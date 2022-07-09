---
title: switch 语句
comments: false
---

`switch` 语句是一种简洁地写 `if - else` 的方式。

## 基本 switch 语句

和 `for` 语句一样，`switch` 语句的条件表达式前面可以带有一个初始化语句。如：

```go
package main
import ( "fmt"; "runtime" )

func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		fmt.Printf("%s.\n", os) // freebsd, openbsd, plan9, windows...
	}
}
```

## case

和 Java、C、JavaScript 不同，Go 的 `switch` 语句中 `case` 后面会隐式地带上 `break`。所以不必在 `case` 后面提供 `break` 也不会 fall-through。
另一个不同之处在于，`case` 后面可以不是常量。比如：

```go
package main
import ( "fmt"; "time" )

func main() {
	fmt.Println("When's Saturday?")
	today := time.Now().Weekday()
	switch time.Saturday {
	case today + 0:
		fmt.Println("Today.")
	case today + 1:
		fmt.Println("Tomorrow.")
	case today + 2:
		fmt.Println("In two days.")
	default:
		fmt.Println("Too far away.")
	}
}
```

`switch` 语句中各个 `case` 的执行顺序是从上到下，直到遇到一个匹配为止。比如：

```go
switch i {
case 0:
case f(): // i == 0 时，不会调用函数 f
}
```

## 无条件表达式的 switch 语句

没有条件表达式的 `switch` 等价于 `switch true`。用这种方式可以替换啰嗦的 `if-else` 链。比如：

```go
t := time.Now()
switch {
case t.Hour() < 12:
    fmt.Println("Good morning!")
case t.Hour() < 17:
    fmt.Println("Good afternoon.")
default:
    fmt.Println("Good evening.")
}
```

## `break`

虽然在 `case` 子句的结尾不需要 `break`，但是 `break` 依然可以使用，用来提前终止 `switch`：

```go
switch {
case x < 0:
	if x == -1 {
		break // 提前结束
	}
	t = x
}
```

## Fall-Through

Go 的 `switch` 语句不支持默认 fall-through。

如果你可以有多个 `case` 条件使用共同的处理逻辑，那么可以把处理相同的条件用逗号分隔列到同一个 `case` 后面：

```go
func shouldEscape(c byte) bool {
	switch c {
	case ' ', '?', '&', '=', '#', '+', '%':
		return true
	}
	return false
}
```

并列条件的 `case` 并不能完全像 C、Java 中的 `switch` 语句那样自由地 fall-through，比如下面的 Java 代码，执行结果会输出 12：

```java
int a = 1;
switch(a) {
	case 1:
		System.out.print(1);
	case 2:
		System.out.print(2)
		break;
}
```

如果 Go 也想到达这种目的的话，就要使用 `fallthrough` 关键字。与上面 Java 代码等价的 Go 代码如下：

```go
a := 1
switch a {
case 1:
	fmt.Print("1")
	fallthrough // 到了最后不会默认 break，而是 fallthrough 到 case 2 中
case 2:
	fmt.Print("2")
}
```

## 类型选择

见[类型 switch](./interface/#类型-switch)