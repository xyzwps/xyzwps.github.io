---
title: defer 语句
---

## 基本用法

`defer` 语句被包裹在函数内部，在函数 `return` 之后才会执行。`defer` 调用的参数是即时计算的，但是函数调用是直到 `return` 之后才计算。比如：

```go
package main
import "fmt"

func add(a, b int) int {
    fmt.Println("add", a, "+",  b)
	return a + b
}

func main() {
	a, b := 1, 2
	defer fmt.Println("defered", add(a, b))
    a = 3
	fmt.Println(add(a, b))
}

/**
 * 这段代码输出：
 *
 * add 1 + 2
 * add 3 + 2
 * 5
 * defered 3
 */
```

## defer 栈

多个 `defer` 调用被 push 到一个栈中。函数返回时，按后进先出的顺序执行这些 `defer` 调用。比如：


```go
package main
import "fmt"

func main() {
	fmt.Println("counting")
	for i := 0; i < 3; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("done")
}
/**
 * 这段代码输出：
 *
 * counting
 * done
 * 2
 * 1
 * 0
 */

```

## 参考

* [Defer, Panic, and Recover](https://blog.golang.org/defer-panic-and-recover)