---
title: panic 和 recover
---

函数在执行过程中，如果主动调用 `panic` 函数，或者发生了运行时 panic，那么这个函数的执行就会终止。不过 defer 部分还会照常执行。于是我们就可以在 defer 部分调用 `recover` 函数来处理这些 panic 了。

```go
package main

import "fmt"

func div(a, b int) (result int) {
	defer (func() {
		if err := recover(); err != nil {
			fmt.Printf("Error: %v\n", err)
			result = 10000
		}
	})()
	result = a / b
	return
}

func main() {
	fmt.Printf("4 / 2 = %d\n", div(4, 2))
	fmt.Printf("4 / 0 = %d\n", div(4, 0))
}
```

这里依然有坑需要注意。`recover` 函数返回 `nil` 有三种情况:

1. `panic` 函数的参数是 `nil`
1. goroutine 没有发生 panic
1. `recover` 不是在 defer 部分被调用的

所以，在调用 `panic` 函数时，如果没有特殊理由，千万不要传 `nil`（当然，如果你希望做一些奇怪的事时除外）。
