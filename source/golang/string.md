---
title: 字符串
---

Go 语言字符串是一个不可变的**字节**数组，类型是 `string`。

## 零值

字符串的零值是长度为 0 的字符串，即 `""`。

## 长度

因为字符串是字节数组，所以 `len` 函数返回的是字符串中的字节数，`len("Hello, 超越")` 的值是 13 而不是 9。

要求出这个字符串含有的字符数，有两种方式：

1. 用一种解码器，计算字符串中的字符（*rune*）的数量
1. 直接把字符串转成 `[]rune`，计算这个 slice 的长度

如下：

```go
package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	str := "Hello, 超越"
	fmt.Println("byte len:", len(str)) // 13
	fmt.Println("rune count:", utf8.RuneCountInString(str)) // 9
	fmt.Println("rune count:", len([]rune(str))) // 9
}
```

## 转义字符

字符串中可以包含常见的转义字符，比如 `\n`、`\t`、`\r` 等等。

字符串还可以包含 Unicode 转义字符，这种转义字符以 `\u` 或 `\U` 开头。比如：

```go
fmt.Println("\u8d85\u8d8a")         // 输出 超越
fmt.Println("\U00008d85\U00008d8a") // 输出 超越
```

## 原生字符串

字符串字面量是用两个双引号括住的，这时遇到诸如换行之类的字符时，只能使用转义字符。如果使用原生字符串，就不用这么麻烦。

TODO: 这里显示 `\`` 有问题
原生字符串字面量使用两个反引号 `\`` 括起来的字符串，里面忽略任何形式的转义字符。原生字符串支持跨多行。比如：

```go
fmt.Println(`Hello \n
\u8d85\u8d8a 可爱`)
```

输出

```txt
Hello \n
\u8d85\u8d8a 可爱
```

## `rune`

Go 语言的字符串是 Unicode 字符串，采用 UTF-8 编码（这样字符串的存储上更紧凑）。Unicode 字符 code point 在 Go 中用整数类型 `rune` 来表示。

`rune` 是 `int32` 的等价类型。

接着上面的例子，请看以下代码：

```go
fmt.Println(str[8])         // 输出 182
fmt.Println([]rune(str)[8]) // 输出 36234
```

`rune` 字面量是用单引号圈起来的字符。比如：

```go
a, b, c := '超', '\u8d85', '\U00008d85' // a, b, c 是三个 rune
```

## 取子串

对字符串取子串，可以用 slice 那样的语法，但是得到的是一个字节串，很郁闷。比如：

```go
fmt.Println(str[7:10]) // 输出 超
fmt.Println(str[7:9])  // 输出乱码……
```

我们在取子串的时候，总不能像上面那样先数字节，对吧，所以需要一个办法来取子串。但是很可惜，标准库里没有类似 Java 或者 JavaScript 中那样的 `substring` 函数（...）。所以，

* 要么先把字符串转成 `rune` slice，然后取子串，最后再构造出字符串
```go
fmt.Println(string([]rune(str)[7:8])) // 输出 超
```
* 要么自己写一个 `substring`
```go
// 注意，此代码没有处理错误
func substring(str string, from, to int) string {
    runes := make([]rune, to-from)
    for i, c := 0, 0; i < len(str); {
        r, size := utf8.DecodeRuneInString(str[i:])
        if c >= from && c < to {
            runes[c-from] = r
        } else if c >= to {
            break
        }
        c++
        i += size
    }
    return string(runes)
}

fmt.Println(substring(str, 7, 9)) // 输出 超越
```

## 遍历字符串中的字符

看了上面字符串操蛋的一面，都有点怀疑遍历字符串中的是不是也这么麻烦？其实一点都不麻烦……

```go
func char(r rune) string {
	return string([]rune{r})
}

for i, v := range str { // 注意，这里 v 是 rune，i 是 rune 在数组中第一个字节所在的位置
    fmt.Println(i, char(v))
}
```

## 字符串连接符

用 `+`（字符串连接符）可以把两个字符串连接起来。比如：

```go
fmt.Println("杨" + "超越") // 输出 杨超越
```

如果你要把一组字符串 join 起来的话，可以使用 `strings` 包中的 `Join` 函数：

```go
strings.Join([]string{"Tom", "Jerry", "Adam"}, ", ") // 用逗号连接三个人的名字
```

连接字符串，还可以使用 `+=`：

```go
s := "Hello,"
s += " world"
```

## `strings` 包

Go 语言标准库中的 `strings` 包中有一些常用的字符串操作函数，这里不做介绍，开发过程中如果要使用字符操作的话，建议先看看 `strings` 包能不能满足需要。

这里是 `strings` 包的 [中文文档](https://go-zh.org/pkg/strings/) | [英文文档](https://golang.org/pkg/strings/)。

## `unicode` 包

`unicode` 包里主要是一些对 `rune` 的操作。

这个包下有两个子包 `utf8` 和 `utf16`，用来做 `rune` 和 `byte` 之间做转换和对 `rune` 做编码检查。另外，这两个包中，还有两个函数 `DecodeRuneInString` 和 `DecodeLastRuneInString`，可以用来在不把字符串转换成 `[]rune` 的情况下，对字符串做 `rune` 遍历。

可以在这里看到 [中文文档](https://go-zh.org/pkg/) | [英文文档](https://golang.org/pkg/)。

## 字符串转其他类型数据

字符串和数字之间的转换算是是最常见的操作了，这些操作被可以通过标准库 `strconv` 包中的函数来做到。`strconv` 包中还有一些其他的字符串转换函数，如果要用到的话，先来这里看看有没有符合条件的函数可以用。

这里是 `strconv` 包的 [中文文档](https://go-zh.org/pkg/strconv/) | [英文文档](https://golang.org/pkg/strconv/)。