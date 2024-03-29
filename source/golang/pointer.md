---
title: 指针
comments: false
---

Go 语言有指针类型。惊不惊喜？

指针的值是一个内存地址。类型 `*T` 是一个指向 `T` 类型值的指针。指针的零值是 `nil`。

可以像下面这这样声明一个指针：

```go
var p *int // p 是指向 int 值的指针
```

使用操作符 `&`（取地址操作符）来获取一个值的地址。比如：

```go
i := 42
p = &i
```

使用操作符 `*`（解引用操作符）表示指针所指向的值。比如：

```go
fmt.Println(*p) // 通过指针 p 读取 i 的值
*p = 21         // 通过指针 p 设置 i 的值
```