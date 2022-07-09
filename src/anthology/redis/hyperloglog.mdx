---
title: Hyperloglog
---

## HyperLogLog

HyperLogLog 是一种概率数据结构，用于估计集合中元素的数量。通常，要计算集合中元素的数量，就需要使用和集合中元素数量成比例的内存，因为你需要记住哪些元素已经被计数过了，来避免多次计数。不过，有一些用精度换内存的的算法：你可以得到一个标准误差估计，在 Redis 中，这个误差小于 1%。这个算法的神奇之处在于，你不用在使用和集合元素数量成比例的内存来计数，只需要使用常数内存即可！如果你使用 HyperLogLog（后面我们简称为 HLL），最坏的情况下要使用 12K 字节内存，多数情况下，使用的内存数量会远少于此。

尽管在技术上 HLL 和 string 是完全不同的数据类型，但是 HHL 被编码为 string，所以你可以是使用 `GET` 命令来序列化一个 HHL，或者用 `SET` 命令把反序列化后的数据存回 Redis。

概念上，HLL 的 API 使用起来就像 set 的 API 类似：你可以用 `SADD` 把一个元素添加进 set，可以使用 `SCARD` 来统计 set 的基数。不过和 set 不同，我们并不真正把元素添加近 HLL，因为 HLL 仅包含一个个基数有关的状态，而不包含实际的元素。在 HLL 中和 `SADD` 和 `SCARD` 对应的 API 是这样的：

* 当你遇到一个新元素时，你用命令 `PFADD` 来把它添加到 HLL。
* 当你想得到已经通过 `PFADD` 添加的唯一元素的基数估计值时，用命令 `PFCOUNT`。

```console
> pfadd hll a b c d
(integer) 1
> pfcount hll
(integer) 4
```

HLL 的一个使用例子是，统计每天用户在搜索框里进行的不同查询的数量。

Redis 还支持对多个 HLL 求并集，见下面的命令列表。

## 相关命令

- `PFADD key [element [element ...]]`\
   <small>Adds the specified elements to the specified HyperLogLog.</small>
- `PFCOUNT key [key ...]`\
   <small>Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).</small>
- `PFDEBUG`\
   <small>Internal commands for debugging HyperLogLog values</small>
- `PFMERGE destkey sourcekey [sourcekey ...]`\
   <small>Merge N different HyperLogLogs into a single one.</small>
- `PFSELFTEST`\
   <small>An internal command for testing HyperLogLog values</small>