---
title: Sorted Set
---

## Redis Sorted Set

Sorted Set 数据类型类似于 Set 和 Hash 的混合。向 set 那样，sorted set 中都是独一无二的、不重复的字符串元素，所以从某种意义上说，sorted set 也是一种 set。不过 set 中的元素是没有排序的，sorted set 中的元素和一个浮点值关联，这个浮点值叫做 score（这也是为什么这个类型类似于 hash，因为每个元素都对应一个 score 值）。

而且，Sorted set 中的元素是有序的，不是在请求时进行排序，而是说顺序是这种数据结构的一种特征。排序遵循以下规则：

* 若 A 和 B 是两个个有不同 score 的元素，那么如果 A.score > B.score 那么 A > B
* 若 A 和 B 的 score 相同，那么如果 A string 按字典序大于 B string，那么 A > B。A 和 B string 不可以相等，因为 sorted set 中的元素是唯一的。

我们用一个简单的例子来演示下：把一些黑客的名字用作 sorted set 元素，把它们的出生年份用作 “score”：

```console
> zadd hackers 1940 "Alan Kay"
(integer) 1
> zadd hackers 1957 "Sophie Wilson"
(integer) 1
> zadd hackers 1953 "Richard Stallman"
(integer) 1
> zadd hackers 1949 "Anita Borg"
(integer) 1
> zadd hackers 1965 "Yukihiro Matsumoto"
(integer) 1
> zadd hackers 1914 "Hedy Lamarr"
(integer) 1
> zadd hackers 1916 "Claude Shannon"
(integer) 1
> zadd hackers 1969 "Linus Torvalds"
(integer) 1
> zadd hackers 1912 "Alan Turing"
(integer) 1
```

如你所见，`ZADD` 类似于 `SADD`，不过它要多接受一个 score 参数放在被添加的元素前面。`ZADD` 可以接受多组参数，所以你可以随意指定多组 score-value 对，即使上例中没有演示。

通过 sorted set，可以很容易的返回按出生年份排序的黑客列表，因为它们已经是有序的了。

实现说明：Sorted set 是通过一个双端口数据结构实现的，它包含 skip list 和 hash table，所以往 sorted set 中添加一个元素的时间复杂度是 $O(log(N))$。这很好，当我们向 redis 请求对元素排序时什么都不需要做，因为它们已经被排序了：

```console
> zrange hackers 0 -1
1) "Alan Turing"
2) "Hedy Lamarr"
3) "Claude Shannon"
4) "Alan Kay"
5) "Anita Borg"
6) "Richard Stallman"
7) "Sophie Wilson"
8) "Yukihiro Matsumoto"
9) "Linus Torvalds"
```

注意：0 和 -1 的意思是从第 0 个元素到最后一个元素（类似于 `LRANGE` 那样）。

如果你想逆序排列它们，从最年轻的开始到最老的，应该怎么办？可以使用 `ZREVRANGE` 来代替 `ZRANGE`：

```console
> zrevrange hackers 0 -1
1) "Linus Torvalds"
2) "Yukihiro Matsumoto"
3) "Sophie Wilson"
4) "Richard Stallman"
5) "Anita Borg"
6) "Alan Kay"
7) "Claude Shannon"
8) "Hedy Lamarr"
9) "Alan Turing"
```

我们还可以返回 score 的值，通过指定参数 `WITHSCORES`：

```console
> zrange hackers 0 -1 withscores
1) "Alan Turing"
2) "1912"
3) "Hedy Lamarr"
4) "1914"
5) "Claude Shannon"
6) "1916"
7) "Alan Kay"
8) "1940"
9) "Anita Borg"
10) "1949"
11) "Richard Stallman"
12) "1953"
13) "Sophie Wilson"
14) "1957"
15) "Yukihiro Matsumoto"
16) "1965"
17) "Linus Torvalds"
18) "1969"
```

## 对范围的操作

Sorted set 还有别的骚操作，它可以操作指定范围内的数据。我们来获取所有出生于1950年及以前的人。我们可以用命令 `ZRANGEBYSCORE` 来搞：

```console
> zrangebyscore hackers -inf 1950
1) "Alan Turing"
2) "Hedy Lamarr"
3) "Claude Shannon"
4) "Alan Kay"
5) "Anita Borg"
```

我们要求 redis 返回所有 score 在负无穷到1950直接的元素（两头也包含）。

当然也支持移除指定范围内的元素。我们来移除所有出生于 1940 和 1960 年之间的黑客：

```console
> zremrangebyscore hackers 1940 1960
(integer) 4
```

`ZREMRANGEBYSCORE` 可能不是一个好的命令名称，不过它非常有用，它返回被移除的元素数量。

另一个非常有用的操作是从 sorted set 中获取元素的排名。它可以被用于求一个元素在 sorted set 中排序的位置：

```console
> zrank hackers "Anita Borg"
(integer) 4
```

命令 `ZREVRANK` 也是用于获取元素的排名，不过它是按逆序来获取。

## 字典序 score

从 2.8 版本开始，我们引入一个新飞车，它允许我们按字典序操作范围，假定 sorted set 中的元素的 score 都一样（元素是通过 C 的 `memcmp` 函数进行比较的，所以它保证没有特定的排序规则，每个 redis 实例都会返回相同的结果）

主要的操作字典序范围的命令有 `ZRANGEBYLEX`、`ZREVRANGEBYLEX`、`ZREMRANGEBYLEX`、`ZLEXCOUNT`。

例如，我们往列表中添加一些著名的黑客，但是这次这些新的的元素的 score 都是 0:

```console
> zadd hackers 0 "Alan Kay" 0 "Sophie Wilson" 0 "Richard Stallman" 0
  "Anita Borg" 0 "Yukihiro Matsumoto" 0 "Hedy Lamarr" 0 "Claude Shannon"
  0 "Linus Torvalds" 0 "Alan Turing"
```

因为 sorted set 的排序规则，他们已经被按照字典序排序：

```console
> zrange hackers 0 -1
1) "Alan Kay"
2) "Alan Turing"
3) "Anita Borg"
4) "Claude Shannon"
5) "Hedy Lamarr"
6) "Linus Torvalds"
7) "Richard Stallman"
8) "Sophie Wilson"
9) "Yukihiro Matsumoto"
```

使用 `ZRANGEBYLEX` 我们可以按字典序范围获取元素：

```console
> zrangebylex hackers [B [P
1) "Claude Shannon"
2) "Hedy Lamarr"
3) "Linus Torvalds"
```

Ranges can be inclusive or exclusive (depending on the first character), also string infinite and minus infinite are specified respectively with the + and - strings. See the documentation for more information.

这个特性非常重要，因为它允许我们可以把 sorted set 用作通用索引。比如，如果你希望用一个 128-bit 的无符号证书参数来索引元素，你所要做的就是把这些元素放到一个 sorted set 中，给它们设置同样的 score（比如 0）但是包含一个 16 字节的前缀，这个前缀包含这个大端在前 128-bit 数字。因为大端在前的数字，在进行字典序排序的时候（以原始的字节序）事实上也是数字的顺序，所以你可以在一个 128-bit 的空间内就那些排序，获取元素的值后就丢掉这些前缀。

## 更新 score: 排行榜

在转到别的主题之前，在说一下 sorted set。sorted set 的 score 可以在任何时候按需修改。只需要在调用一次 `ZADD` 命令的时候指定新的 score 即可，它的时间复杂度是 `O(log(N))`。所以 sorted set 也适用于大量更新的场景。

这个特性的一个常用使用场景是排行榜。典型的应用时 Facebook 游戏，在其中你需要这样的能力，按高分顺序获取用，执行 get rank 操作来展示 top N 用户，以及获取用户在排行榜中的顺序。

## 相关命令

- `BZMPOP timeout numkeys key [key ...] MIN|MAX [COUNT count]`\
   <small>Remove and return members with scores in a sorted set or block until one is available</small>
- `BZPOPMAX key [key ...] timeout`\
   <small>Remove and return the member with the highest score from one or more sorted sets, or block until one is available</small>
- `BZPOPMIN key [key ...] timeout`\
   <small>Remove and return the member with the lowest score from one or more sorted sets, or block until one is available</small>
- `ZADD key [NX|XX] [GT|LT] [CH] [INCR] score member [score member ...]`\
   <small>Add one or more members to a sorted set, or update its score if it already exists</small>
- `ZCARD key`\
   <small>Get the number of members in a sorted set</small>
- `ZCOUNT key min max`\
   <small>Count the members in a sorted set with scores within the given values</small>
- `ZDIFF numkeys key [key ...] [WITHSCORES]`\
   <small>Subtract multiple sorted sets</small>
- `ZDIFFSTORE destination numkeys key [key ...]`\
   <small>Subtract multiple sorted sets and store the resulting sorted set in a new key</small>
- `ZINCRBY key increment member`\
   <small>Increment the score of a member in a sorted set</small>
- `ZINTER numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]`\
   <small>Intersect multiple sorted sets</small>
- `ZINTERCARD numkeys key [key ...] [LIMIT limit]`\
   <small>Intersect multiple sorted sets and return the cardinality of the result</small>
- `ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]`\
   <small>Intersect multiple sorted sets and store the resulting sorted set in a new key</small>
- `ZLEXCOUNT key min max`\
   <small>Count the number of members in a sorted set between a given lexicographical range</small>
- `ZMPOP numkeys key [key ...] MIN|MAX [COUNT count]`\
   <small>Remove and return members with scores in a sorted set</small>
- `ZMSCORE key member [member ...]`\
   <small>Get the score associated with the given members in a sorted set</small>
- `ZPOPMAX key [count]`\
   <small>Remove and return members with the highest scores in a sorted set</small>
- `ZPOPMIN key [count]`\
   <small>Remove and return members with the lowest scores in a sorted set</small>
- `ZRANDMEMBER key [count [WITHSCORES]]`\
   <small>Get one or multiple random elements from a sorted set</small>
- `ZRANGE key min max [BYSCORE|BYLEX] [REV] [LIMIT offset count] [WITHSCORES]`\
   <small>Return a range of members in a sorted set</small>
- `ZRANGEBYLEX key min max [LIMIT offset count]`\
   <small>Return a range of members in a sorted set, by lexicographical range</small>
- `ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]`\
   <small>Return a range of members in a sorted set, by score</small>
- `ZRANGESTORE dst src min max [BYSCORE|BYLEX] [REV] [LIMIT offset count]`\
   <small>Store a range of members from sorted set into another key</small>
- `ZRANK key member`\
   <small>Determine the index of a member in a sorted set</small>
- `ZREM key member [member ...]`\
   <small>Remove one or more members from a sorted set</small>
- `ZREMRANGEBYLEX key min max`\
   <small>Remove all members in a sorted set between the given lexicographical range</small>
- `ZREMRANGEBYRANK key start stop`\
   <small>Remove all members in a sorted set within the given indexes</small>
- `ZREMRANGEBYSCORE key min max`\
   <small>Remove all members in a sorted set within the given scores</small>
- `ZREVRANGE key start stop [WITHSCORES]`\
   <small>Return a range of members in a sorted set, by index, with scores ordered from high to low</small>
- `ZREVRANGEBYLEX key max min [LIMIT offset count]`\
   <small>Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.</small>
- `ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]`\
   <small>Return a range of members in a sorted set, by score, with scores ordered from high to low</small>
- `ZREVRANK key member`\
   <small>Determine the index of a member in a sorted set, with scores ordered from high to low</small>
- `ZSCAN key cursor [MATCH pattern] [COUNT count]`\
   <small>Incrementally iterate sorted sets elements and associated scores</small>
- `ZSCORE key member`\
   <small>Get the score associated with the given member in a sorted set</small>
- `ZUNION numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX] [WITHSCORES]`\
   <small>Add multiple sorted sets</small>
- `ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]`\
   <small>Add multiple sorted sets and store the resulting sorted set in a new key