---
title: Map
---


Map 把 key 映射到 value。

## 零值

Map 的零值是 `nil`。零 map 既没有 key，也不允许增加 key。

## make

可以用 `make` 函数创建 map。

```go
package main
import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex) // 一个从 string 到 Vertex 的 map
	m["Bell Labs"] = Vertex{ 40.68433, -74.39967 }
	fmt.Println(m["Bell Labs"])
}
```

## Map 字面量

Map 字面量和结构定义有点像，也只是有点：

```go
var m = map[string]Vertex{
	"Bell Labs": Vertex{40.68433, -74.39967},
	"Google":    Vertex{37.42202, -122.08408},
}
```

如果 value 部分的顶层只是一个类型名字，那么可以忽略。上面的例子可以写成这样：

```go
var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}
```

## Map 操作

### 更新或插入

```go
m[key] = elem
```

### 获取

```go
elem = m[key]
```

### 检查 key 是否存在

检查 key 是否存在，可以使用两值赋值：

```ok
elem, ok := m[key]
```

如果 `key` 在 `m` 中，`ok` 的值就是 `true`；否则是 `false`。如果 `key` 不在 `m` 中，那么 `elem` 的值就是映射中 value 类型的零值。

### 删除一个 key

```go
delete(m, key)
```

### 遍历

使用 `for...range` 语句来遍历 map:

```go
type any = interface{}

func main() {
	data := map[string]any{
		"status": "ok",
		"count":  12,
		"ok":     true,
	}
	for key, value := range data {
		fmt.Printf("%s: %v\n", key, value)
	}
}
```

输出：

```console
status: ok
count: 12
ok: true
```

### 大小

使用 `len` 函数来求 map 的大小。

## 使用 map 来定义一个新类型

你使用 gin 框架的话，大概会见过这样的写法：

```go
gin.H{"hello": "world"}
```

初看起来还挺神秘，其实很容易实现。下面举个例子：

```go
type any = interface{}
type JSON map[string]any

func main() {
	data := JSON{"status": "ok", "count": 12}
	// 省略下面的代码
}
```