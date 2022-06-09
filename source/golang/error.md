---
title: error
comments: false
---

Go 语言早期，并没有 `recover` 函数。调用 `panic` 函数后，程序就直接结束了，还没有什么办法来避免。这个时候，Go 用值来表示错误，并把错误标在返回值列表里。原则上，你可以用自己随便指定个什么类型来表示错误。不过因为 Go 内置了 `error` 接口来表示错误，所以我们下面再说错误的时候，就指实现了 `error` 接口的值。

# `error` 接口

它非常简单，长这样：

```go
type error interface {
    Error() string
}
```

# 创建简单错误

如果没有什么追求的话，调用 `errors` 包中的函数 `New` 就可以创建一个简单错误了：

```go
errors.New("Some error message.")
```

# 在函数“抛出”错误

Go 语言中，并没有类似 Java 中的 `throw`，函数执行过程中出现的错误，是通过返回值通知到调用者的。比如 os 包中的 `ReadFile` 函数：

```go
func ReadFile(name string) ([]byte, error)
```

如果读取文件成功，就返回文件的字节串表示，返回 `err == nil`；如果读取失败，就返回 `err != nil`。

按照约定，如果函数有多个返回值的话，错误排最后一个，并且不使用具体的错误类型，而是使用 `error`。

Go 语言中处理错误的一般方式是写 `if` 语句:

```go
if fileBytes, err := os.ReadFile(fileName); err != nil {
    // 处理错误
}
```

这种处理错误的方式呢，有人觉得爽，有人觉得不爽。反正爽不爽也就只能这么着了。

# 自定义错误

自定义错误的方式是实现 `error` 接口。比如：

```go
type HttpError struct {
    Code    int
    Body    any
    Message string
}

func (e *HttpError) Error() string {
    return e.Message
}
```

再比如：

```go
type CodeError int

func (e *CodeError) Error() string {
	return "some error message"
}
```

# Stack Trace

你可能已经注意到了，`error` 接口十分简陋。如何在发生错误时，按需输出 stack trace 呢？

在 `runtime/debug` 包下，有一个 `Stack` 函数，它返回当前 goroutine 的 stack trace 的字节串表示。还有一个 `PrintStack` 函数，把 stack trace 输出到标准错误中。

# 参考

- [Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors): 在 1.13 版本中，Go 语言对 error 的使用体验做了一点提升。
- [Errors are values](https://go.dev/blog/errors-are-values): 本文似乎在说，Go 中的 error 和别的类型的值之间并没有本质的区别。
- [Error handling and Go](https://go.dev/blog/error-handling-and-go): 这是一个教程，演示 Go 语言处理 error 的哲学。
