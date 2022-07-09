---
title: Set
---

## Redis Set

Redis set 是无序的字符串集合。命令 `SADD` 把新元素添加到 set 中。Set 上还有一些其他操作，比如判断一个给定的元素是否存在，在多个集合间执行交集、并集、或者差集运算，等等。

```console
> sadd myset 1 2 3
(integer) 3
> smembers myset
1. 3
2. 1
3. 2
```

这里我们往 `myset` 中添加了 3 个元素，然后告诉 redis 把所有元素返回。如你所见，它们是无序的——在每次调用时 Redis 返回元素的顺序都可能是不同的，因为 set 不向用户保证元素顺序。

Redis 有命令来测试成员关系。比如，检查一个元素是否存在：

```console
> sismember myset 3
(integer) 1
> sismember myset 30
(integer) 0
```

"3" 是 set 的成员，而 ”30“ 不是。

Set 非常适用于表达对象之间的关系。比如我们可以用 set 轻易地实现标签功能。这个问题的一个简单的建模方式是，用一个 set 来存储所有我们想打标签的对象。这个 set 内含有与此标签相关的对象的 ID。

一个例子是对新闻文章打标签。如果文章的 ID 是 1000，要对它打上标签 1、2、5和77，可以用一个集合把这些标签 ID 和新闻关联起来：

```console
> sadd news:1000:tags 1 2 5 77
(integer) 4
```

我们也可以把这个关系翻转过来：把所有的新闻和一个标签关联起来：

```console
> sadd tag:1:news 1000
(integer) 1
> sadd tag:2:news 1000
(integer) 1
> sadd tag:5:news 1000
(integer) 1
> sadd tag:77:news 1000
(integer) 1
```

要获取给定对象的所有标签就很简单：

```console
> smembers news:1000:tags
1. 5
2. 1
3. 77
4. 2
```

注：在这个例子中，我们假定你有另一个数据结构，比如 Redis hash，来把标签 ID 映射到标签名。

还有很多不那么简单的操作可以使用适当的 Redis 命令很容易地实现。比如我们想列出所有同时包含标签 1、2、10 和 27 的对象，就可以使用 `SINTER` 命令，它在不同的集合之间求交集。我们可以这样用：

```console
> sinter tag:1:news tag:2:news tag:10:news tag:27:news
... results here ...
```

除了交集，你还可以求并集、差集、随机分离一个元素，等等。

从集合中分离一个元素的命令叫 `SPOP`，它适用于对特定问题建模。比如，为了实现一个 web 版的扑克游戏，你可能想用一个集合来表示你的牌。假设我们使用单字符前缀来表示梅花-(C)lubs, 方块-(D)iamonds, 红桃-(H)earts, 黑桃-(S)pades：

```console
>  sadd deck C1 C2 C3 C4 C5 C6 C7 C8 C9 C10 CJ CQ CK
   D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 DJ DQ DK H1 H2 H3
   H4 H5 H6 H7 H8 H9 H10 HJ HQ HK S1 S2 S3 S4 S5 S6
   S7 S8 S9 S10 SJ SQ SK
   (integer) 52
```

现在我们给每个玩家发 5 张牌。通过命令 `SPOP` 随机移除一个元素，并返回给客户端，所以它非常适用于此场景。

不过，如果我们直接对牌组使用此命令，那么在下一局游戏里，我们需要再次填充牌组，这可能并不理想。所以为了开始，我们先把 `deck` key 中的牌复制一份存到 `game:1:deck` key 中。

This is accomplished using `SUNIONSTORE`, which normally performs the union between multiple sets, and stores the result into another set. However, since the union of a single set is itself, I can copy my deck with:

```console
> sunionstore game:1:deck deck
(integer) 52
```

Now I'm ready to provide the first player with five cards:

```console
> spop game:1:deck
"C6"
> spop game:1:deck
"CQ"
> spop game:1:deck
"D1"
> spop game:1:deck
"CJ"
> spop game:1:deck
"SJ"
```

One pair of jacks, not great...

This is a good time to introduce the set command that provides the number of elements inside a set. This is often called the *cardinality* of a set in the context of set theory, so the Redis command is called `SCARD`.

```console
> scard game:1:deck
(integer) 47
```

The math works: 52 - 5 = 47.

When you need to just get random elements without removing them from the set, there is the `SRANDMEMBER` command suitable for the task. It also features the ability to return both repeating and non-repeating elements.

## 相关命令

- `SADD key member [member ...]`\
   <small>Add one or more members to a set</small>
- `SCARD key`\
   <small>Get the number of members in a set</small>
- `SDIFF key [key ...]`\
   <small>Subtract multiple sets</small>
- `SDIFFSTORE destination key [key ...]`\
   <small>Subtract multiple sets and store the resulting set in a key</small>
- `SINTER key [key ...]`\
   <small>Intersect multiple sets</small>
- `SINTERCARD numkeys key [key ...] [LIMIT limit]`\
   <small>Intersect multiple sets and return the cardinality of the result</small>
- `SINTERSTORE destination key [key ...]`\
   <small>Intersect multiple sets and store the resulting set in a key</small>
- `SISMEMBER key member`\
   <small>Determine if a given value is a member of a set</small>
- `SMEMBERS key`\
   <small>Get all the members in a set</small>
- `SMISMEMBER key member [member ...]`\
   <small>Returns the membership associated with the given elements for a set</small>
- `SMOVE source destination member`\
   <small>Move a member from one set to another</small>
- `SPOP key [count]`\
   <small>Remove and return one or multiple random members from a set</small>
- `SRANDMEMBER key [count]`\
   <small>Get one or multiple random members from a set</small>
- `SREM key member [member ...]`\
   <small>Remove one or more members from a set</small>
- `SSCAN key cursor [MATCH pattern] [COUNT count]`\
   <small>Incrementally iterate Set elements</small>
- `SUNION key [key ...]`\
   <small>Add multiple sets</small>
- `SUNIONSTORE destination key [key ...]`\
   <small>Add multiple sets and store the resulting set in a key</small>
