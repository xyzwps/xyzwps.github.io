---
title: 特殊函数
---

# 内置函数

## `len`

接受一个参数，用来求长度。参数类型和返回值含义如下：

| 参数类型         | 结果                           |
|-----------------|-------------------------------|
| `string`        | 字符串的字节长度                 |
| `[n]T`, `*[n]T` | 数组的长度，值为 `n`             |
| `[]T`           | slice 的长度                   |
| `map[K]T`       | map 的长度，即 map 中 key 的数量 |
| `chan T`        | channel buffer 中排队的元素数量  |

## `cap`

接受一个参数，用来求容量。参数类型和返回值含义如下：


| 参数类型         | 结果                   |
|-----------------|-----------------------|
| `[n]T`, `*[n]T` | 数组的容量，值为 `n`     |
| `[]T`           | slice 的容量           |
| `chan T`        | channel buffer 的容量  |

## `make`

用来创建一个 slice、map 或 channel。其调用方式和返回结果如下：

| 调用               | T 表示的类型 | 返回结果                                     |
|-------------------|-------------|--------------------------------------------|
| `make(T, n)`      | `slice`     | T 类型的 slice，容量长度都是 n                |
| `make(T, n, m)`   | `slice`     | T 类型的 slice，长度是 n，容量是 m             |
| `make(T)`         | `map`       | T 类型的 map                                |
| `make(T, n)`      | `map`       | T 类型的 map，其初始空间大约可以存放 n 个元素    |
| `make(T)`         | `channel`   | 无 buffer 的 T 类型 channel                 |
| `make(T, n)`      | `channel`   | 有 buffer 的 T 类型 channel，buffer 容量是 n |

## `append`

用于往一个 slice 后面追加元素，并返回追加新元素后的 slice。可同时追加 0 到多个。比如:

```go
s0 := []int{0, 0}
s1 := append(s0, 2)                // append a single element     s1 == []int{0, 0, 2}
s2 := append(s1, 3, 5, 7)          // append multiple elements    s2 == []int{0, 0, 2, 3, 5, 7}
s3 := append(s2, s0...)            // append a slice              s3 == []int{0, 0, 2, 3, 5, 7, 0, 0}
s4 := append(s3[3:6], s3[2:]...)   // append overlapping slice    s4 == []int{3, 5, 7, 2, 3, 5, 7, 0, 0}

var t []interface{}
t = append(t, 42, 3.1415, "foo")   //                             t == []interface{}{42, 3.1415, "foo"}

var b []byte
b = append(b, "bar"...)            // append string contents      b == []byte{'b', 'a', 'r' }
```

## `copy`

```go
copy(dst, src []T) int
copy(dst []byte, src string) int
```

用于复制一个 slice 到另一个 slice，也可以用于复制一个字符串到 `[]byte`。此函数返回的是复制过去的元素个数：

```go
var a = [...]int{0, 1, 2, 3, 4, 5, 6, 7}
var s = make([]int, 6)
var b = make([]byte, 5)
n1 := copy(s, a[0:])            // n1 == 6, s == []int{0, 1, 2, 3, 4, 5}
n2 := copy(s, s[2:])            // n2 == 4, s == []int{2, 3, 4, 5, 4, 5}
n3 := copy(b, "Hello, World!")  // n3 == 5, b == []byte("Hello")
```

## `delete`

用于从 map 中移除元素。

```go
delete(m, k) // 从 map m 中移除元素 map[k]
```

如果 `m` 是 `nil` 或者 `m[k]` 不存在，则什么都不做（这就比较爽了）。

## `panic` 和 `recover`



TODO: main
TODO: init
TODO: panic
TODO: recover