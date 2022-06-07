---
title: 深复制
---

Go 语言在赋值时，总是对 struct 进行深复制。观察下面的例子：

```go
package main

import "fmt"

type Point2D struct {
	X, Y int
}

type Line struct {
	Start, End Point2D
}

func main() {
	var line Line = Line{Point2D{1, 2}, Point2D{3, 4}}
	var line2 Line
	fmt.Printf("line  = %v \n", line)
	fmt.Printf("line2 = %v \n", line2)

	line2 = line
	fmt.Printf("line2 = %v \n", line2)

	line.End.Y = 10000
	fmt.Printf("line  = %v \n", line)
	fmt.Printf("line2 = %v \n", line2)
}
```

以上代码输出:

```
line  = {{1 2} {3 4}}
line2 = {{0 0} {0 0}}
line2 = {{1 2} {3 4}}
line  = {{1 2} {3 10000}}
line2 = {{1 2} {3 4}}
```