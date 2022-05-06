---
title: package 和 import
---

类似于 Java，Go 语言的代码是以 package 的方式组织起来的。

文件的第一行是包声明。比如：

```go
package mypkg
```

在一个包中，以大写字符开头的名称会被暴露出来。比如 `math` 包中的 `Pi`。

在导入一个包时，可以导入整个包，比如：

```go
package main

import ( "fmt"; "math" )

func main() {
	fmt.Println(math.Pi)
}
```

也可以只导入包的一部分，比如下例中的 `rand` 是从 `math` 包中指明导入的：

```go
package main

import ( "fmt"; "math/rand" )

func main() {
	fmt.Println("New random integer:", rand.Intn(10))
}
```

TODO: 可见性问题