---
title: 并发
---

## Goroutine

Goroutine 是一种“轻量级线程”，由 Go 运营时管理。

`go f(x, y, z)` 启动一个 goroutine 来执行 `f(x, y, z)`。
其中，`f`、`x`、`y`、`z` 来自当前 goroutine，`f` 的计算发生在新的 goroutine 中。

所有的 goroutine 都在同一个地址空间中中允许，所以访问共享内存必须要同步。`sync`
包提供了很多有用的原语，你可能不会太依赖他们，因为 go 中还提供了一些其他原语。

## Channel

### 基本功能

Channel 是一种带有类型的通道，使用操作符 `<-`，你可以向 channel 中发送值，或者从 channel 中接收值。

```go
ch <- v    // 向 channel ch 中发送 v
v := <-ch  // 从 channel ch 中接收值，并赋值给 v
```

在使用 channel 前，必须先创建：

```go
ch := make(chan int) // ch 是一个可以向其发送或从其接收 int 值的 channel
```

一般地，发送和接收操作会 block 住，直到另一端准备好了。这使得 goroutine 不用显式的锁或条件变量就能进行同步。

下面的例子对一个 slice 中的数求和，把工作分配给了两个 goroutine，一旦两个 goroutine 都完成了计算，就把两个
goroutine 的计算结果相加，计算总和：

```go
package main
import "fmt"

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // 从 c 中接收

	fmt.Println(x, y, x+y) // 输出 -5 17 12
}
```

### 缓冲（Buffered Channel）

Channel 可以缓冲。使用 `make` 创建 channel 时，可以在第二个参数的位置设置缓冲区长度：

```go
ch := make(chan int, 100) // ch 是缓冲区大小为 100 的 channel
```

往缓冲 channel 中发送数据时，只有当缓冲区满了，goroutine 才会被 block。接收者在
channel 的缓冲区空了的时候被 block。

```go
package main
import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
```

### 关闭 Channel

发送者可以 `close` channel 来表示没有新值要发送了。接收者可以通过接收表达式返回的第二个参数来判断
channel 是否被关闭了：

```go
v, ok := <-ch
```

如果 `ok == false`，那么就意味着 channel 被关闭了，接收者就接收不到更多的值了。

注意，只有发送者才可以关闭 channel。

Channel 不像文件，通常你并不需要关闭它，除非你需要明确告诉接收者，不会有更多的值要发过来了，比如终止 `for...range` 循环。

### `for...range` 循环

`for i := range ch` 循环可以不断接受 channel `ch` 发来的值，直到 `channel` 被关闭。

```go
package main
import "fmt"

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}
	close(c)
}

func main() {
	c := make(chan int, 10)
	go fibonacci(cap(c), c)
	for i := range c {
		fmt.Println(i)
	}
}

```

## `select` 语句

`select` 语句允许 goroutine 等待多个通信操作。`select` 被阻塞，直到其中一个 `case` 可以执行为止。如果有多个
`case` 可以执行，那么就随机选择一个：

```go
package main
import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
```

### `default`

`select` 语句可以有个 `default` 分支。这个分支在其他分支 `case` 不可执行时执行。

```go
package main
import ("fmt";"time")

func main() {
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	for {
		select {
		case <-tick:
			fmt.Println("tick.")
		case <-boom:
			fmt.Println("BOOM!")
			return
		default:
			fmt.Println("    .")
			time.Sleep(50 * time.Millisecond)
		}
	}
}

```

## 互斥

如果我们只是想确保，在同一时刻只有一个 goroutine 有权访问一个共享变量，以避免冲突。我们该怎么办呢？

这里就引入了一个叫做**互斥**（__mutual exclusion__）的概念了，按照不成文的约定，提供互斥功能的数据结构叫 __mutex__。

Go 语言标准库通过 `sync.Mutex` 来提供互斥功能，它有两个方法：`Lock` 和 `Unlock`。
我们可以写一个以互斥方式执行的代码块，只需要用 `Lock` 和 `Unlock` 把这段代码包住就行了。我们还可以利用
`defer` 语句来保证函数结束后 mutex 会被解锁。

下例是一个并发安全的计数器实现：

```go
package main
import ("fmt"; "sync"; "time")

// SafeCounter is safe to use concurrently.
type SafeCounter struct {
	v   map[string]int
	mux sync.Mutex
}

// Inc increments the counter for the given key.
func (c *SafeCounter) Inc(key string) {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	c.v[key]++
	c.mux.Unlock()
}

// Value returns the current value of the counter for the given key.
func (c *SafeCounter) Value(key string) int {
	c.mux.Lock()
	// Lock so only one goroutine at a time can access the map c.v.
	defer c.mux.Unlock()
	return c.v[key]
}

func main() {
	c := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go c.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println(c.Value("somekey"))
}
```