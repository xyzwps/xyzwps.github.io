---
title: List
---

要解释 list 数据类型，最好的方式是先从一点点点点理论开始，因为 list 这个词经常被 IT 技术人员以不恰当的方式使用。比如，Python 中 list 并不像我们想象的那样（比如链表），而是指数组（比如 Ruby 中的那种数组）。

从一般视角上看，list 是只是一个带有顺序关系的元素序列：10、20、1、2、3 就是一个列表。但是使用数组实现的 list 和使用链表来实现的 list，在性质表现上十分不同。

Redis 的 list 是用链表实现的。这意味着，即使你的 list 有几百万个元素，那么往 list 的头部或尾部增加一个元素也只消耗常数时间。

有啥缺点呢？数组实现的 list 可以以常数时间来访问指定索引处的元素，而这样的操作用链表却很慢，时间花费依赖于 list 中的元素总数。

Redis 选择用链表来实现 list，原因是对数据库系统来说，往一个 list 中快速的增加一个元素是至关重要的。Another strong advantage, as you'll see in a moment, is that Redis Lists can be taken at constant length in constant time.

如果要求能够快速访问一个巨大集合中间的元素非常重要，可以使用另一个数据类型：有序集合（Sorted Set）。这个后面说。

## 开始使用 List

命令 `LPUSH` 把一个元素加到 list 的左边（即开头），`RPUSH` 把一个元素加到 list 的右边（即末尾）。命令 `LRANGE` 从 list 中查出指定索引范围内的数据：

```console
> rpush mylist A
(integer) 1
> rpush mylist B
(integer) 2
> lpush mylist first
(integer) 3
> lrange mylist 0 -1
1) "first"
2) "A"
3) "B"
```

注意，`LRANGE` 命令接受两个索引，指向范围内要返回的第一个和最后一个元素。它们可以是负值，告诉 redis 从后面开始数，所以 -1 是最后一个元素，-2 是倒数第二个元素，等等等。

`LPUSH` 和 `RPUSH` 都可以接受参数，这样就可以在一个命令里向 list 中 push 多个元素：

```console
> rpush mylist 1 2 3 4 5 "foo bar"
(integer) 9
> lrange mylist 0 -1
1) "first"
2) "A"
3) "B"
4) "1"
5) "2"
6) "3"
7) "4"
8) "5"
9) "foo bar"
```

Redis list 中另一个重要操作是弹出（pop）元素。弹出一个元素的意思是从 list 中得到这个元素，并同时把它从 list 中删除。你可以从左边或者右边弹出元素（对应的命令是 `LPOP` 和 `RPOP`），类似于你向 list 的左边或者右边推元素：

```console
> rpush mylist a b c
(integer) 3
> rpop mylist
"c"
> rpop mylist
"b"
> rpop mylist
"a"
```

上例中我们向 list 中添加了 3 个元素，然后把它们弹出，所以最后 list 就空了，没有元素可以弹出了。如果我们从空列表弹出一个元素，那么我们会得到这样的结果：

```console
> rpop mylist
(nil)
```

即如果没有元素可以返回的话，就返回一个 `NULL` value。

## 使用 List 的一般场景

List 在很多任务中都很有用，下面有两个非常有代表性的使用场景：

* 记住用户在社交网络上发布的最新更新
* 进程之间通过生产者-消费者模式进行交流，其中生产者 push 元素到 list 中，消费者（通常是一个 worker）从 list 中消费元素并执行对应的动作。Redis 甚至还有专用的命令来使这种场景既可靠又有效率。

比如，Ruby 库 [resque](https://github.com/resque/resque) 和 sidekiq 就使用 Redis list 来实现后台任务；[Twitter 把用户发挥的最新动态推到 Redis list 中](https://www.infoq.com/presentations/Real-Time-Delivery-Twitter/)。

为了一步步描述一个常见场景，可以想象你的主页展示最新发布的照片到一个共享社交网络，并且你希望可以快速访问到。

* 每当用户发布一张新照片，我们就把照片 ID `LPUSH` 到一个 list 中
* 每当用户访问这个主页是，我们使用 `LRANGE 0 9` 来获取最近 10 条发布内容

## 加盖的 List（Capped List）

在很多使用场景中，我们只想使用 list 来存储最近的内容，而不关系他们是什么：社交网络更新、日志或者其他的东西。

Redis 允许我们把 list 用作加盖的集合，通过 `LTRIM` 命令，就可以做到仅记住最近 N 个元素，并把其他过早的元素都丢掉。

`LTRIM` 命令类似于 `LRANGE`，不过它不是显示指定范围内的元素，而是把这个范围内的元素用做列表的新值，不在范围内的数据都会被扔掉。

下面的例子说的比较清楚：

```console
> rpush mylist 1 2 3 4 5
(integer) 5
> ltrim mylist 0 2
OK
> lrange mylist 0 -1
1) "1"
2) "2"
3) "3"
```

上面的 `LTRIM` 命令告诉 Redis 只留下索引值从 0 到 2 的元素，其他的元素都会被丢掉。这就允许实现一个简单但是很有用的的模式：list push 操作和一个 trim 操作一起执行，以实现增加一个元素的同时，把超过限制数量的元素丢掉。

```
LPUSH mylist <some element>
LTRIM mylist 0 999
```

上面的嘴和把一个元素加到 list 中，并只留下最近 1000 个元素。通过 `LRANGE` 命令，你就可以访问最新的这些元素，而不用记住非常老的数据。

注意：尽管 `LRANGE` 是一个 $O(n)$ 命令，不过从头部或者尾部访问少量的元素的花费也只是常量时间。

## List 上的阻塞操作

List 有一个特殊的 feature，使其适合于实现队列，并且通常作为进程间通信系统的构建块：阻塞操作。

想象你想用一个线程往一个 list 中 push 元素，用另一个不同的线程来用这些元素做事情。这就是一个普通的生产者-消费者模型，你可以用下面的简单方法来实现：

* 生产者用 `LPUSH` 来把数据推到 list 中
* 消费者用 `RPOP` 从 list 中取数据

不过可能有时 list 是空的，没有东西可以处理，所以 `RPOP` 只是简单返回 `NULL`。这种情况下，消费者被迫等待一段时间，之后重试 `RPOP` 操作。这个过程叫 `polling`，在这个上下文中不够好，因为一些缺点：

1. 强迫 Redis 和客户端执行无用的命令（在空 list 上执行的命令都只是简单的返回 `NULL`，没有实际的事情可做）
2. 因为 worker 得到 `NULL` 之后，它就必须等待一段时间，所以就会导致一些延迟。为了使延迟更小，就只能增加 `RPOP` 的执行频率，这就又回到了上一条，向 Redis 发出了更多无用调用。

所以 Redis 实现了命令 `BLPOP` 和 `BRPOP`，它们是 `LPOP` 和 `RPOP` 的阻塞版，如果 list 是空的，就会阻塞到有新的元素被 push 到列表为止，或者阻塞到用户指定的超时时刻。

这里有一个 worker 中 `BRPOP` 调用的例子：

```console
> brpop tasks 5
1) "tasks"
2) "do_something"
```

它是说：从 list `tasks` 中等元素来，如果 5 秒内没有元素来就返回。

注意，你可以使用 0 作为超时时间来一直等下去，你甚至可以指定多个 list 以同时在多个 list 上等，其中一个 list 接到元素是就会通知。

关于 `BRPOP` 还需要指出：

1. 客户端是按 FIFO 顺序被服务的：即先被阻塞等待的客户端先得到推送来的元素
1. 它的返回值和 `RPOP` 不同：返回一个 2 元素数组，第一个元素是 key 的名字，第二个是得到的元素。因为 `BLPOP` 和 `BRPOP` 可以同时从多个 list 上阻塞等到元素。
1. 如果超时，则返回 `NULL`

关于 list 和阻塞操作还有一些事情需要你了解，我们建议你从下面来了解更多信息：

* 使用 `LMOVE` 来构建 safer queues 或者 rotating queue 是可能的
* 它有一个阻塞版本的命令，叫 `BLMOVE`

## 自动创建和删除 key

以上里例子中，我们都没有在 push 元素前先创建空 list，或者在 list 为空时删除 list。这些都是由 redis 负责的工作，我们在往里添加或者弹出元素时不必关心 list 是否存在。

这不是针对 list 的，而是对 redis 中所有的组合了多种元素的数据类型——stream、set、sorted set和hash——都是这样的。

基本上我们可以用三条规则来描述这种行为：

1. 当我们往一个聚合数据类型中添加元素时，如果目标 key 不存在，那么就会在添加之前先创建一个空的聚合数据类型。
1. 当我们从一个聚合数据类型中移除元素时，如果 value 空了，那么这个 key 就会被自动销毁。Stream 类型是本条规则的唯一例外。
1. 对一个不存在的 key 调用一个只读命令，比如 `LLEN`（它返回 list 长度），或者写命令从中移除元素，得到的结果就像对一个空的聚合类型数据执行此命令得到的结果一样。

规则 1 的例子：

```console
> del mylist
(integer) 1
> lpush mylist 1 2 3
(integer) 3
```

不过我们不能在 key 存在时，执行类型不对应的命令：

```console
> set foo bar
OK
> lpush foo 1 2 3
(error) WRONGTYPE Operation against a key holding the wrong kind of value
> type foo
string
```

规则 2 的例子：

```console
> lpush mylist 1 2 3
(integer) 3
> exists mylist
(integer) 1
> lpop mylist
"3"
> lpop mylist
"2"
> lpop mylist
"1"
> exists mylist
(integer) 0
```

在所有元素都被弹出后，key 就不存在了。

规则 3 的例子：

```console
> del mylist
(integer) 0
> llen mylist
(integer) 0
> lpop mylist
(nil)
```

## 操作 List 的命令

* `BLMOVE source destination LEFT|RIGHT LEFT|RIGHT timeout`\
   <small>从 list 中弹出第一个元素，然后 push 到另一个 list 中，最后返回这个元素的 value。如果 list 中不存在元素，那么旧阻塞到有元素存在为止。</small>
* `BLMPOP timeout numkeys key [key ...] LEFT|RIGHT [COUNT count]`\
   <small>从 list 中弹出第一个元素。如果 list 中不存在元素，那么就阻塞到有元素存在为止。</small>
* `BLPOP key [key ...] timeout`\
   <small>从 list 中弹出第一个元素，并返回。如果 list 中不存在元素，那么就阻塞到有元素存在为止。</small>
* `BRPOP key [key ...] timeout`\
   <small>从 list 中弹出最后一个元素，并返回。如果 list 中不存在元素，那么就阻塞到有元素存在为止。</small>
* `BRPOPLPUSH source destination timeout`\
   <small>Pop an element from a list, push it to another list and return it; or block until one is available</small>
* `LINDEX key index`\
   <small>Get an element from a list by its index</small>
* `LINSERT key BEFORE|AFTER pivot element`\
   <small>Insert an element before or after another element in a list</small>
* `LLEN key`\
   <small>Get the length of a list</small>
* `LMOVE source destination LEFT|RIGHT LEFT|RIGHT`\
   <small>Pop an element from a list, push it to another list and return it</small>
* `LMPOP numkeys key [key ...] LEFT|RIGHT [COUNT count]`\
   <small>Pop elements from a list</small>
* `LPOP key [count]`\
   <small>Remove and get the first elements in a list</small>
* `LPOS key element [RANK rank] [COUNT num-matches] [MAXLEN len]`\
   <small>Return the index of matching elements on a list</small>
* `LPUSH key element [element ...]`\
   <small>Prepend one or multiple elements to a list</small>
* `LPUSHX key element [element ...]`\
   <small>Prepend an element to a list, only if the list exists</small>
* `LRANGE key start stop`\
   <small>Get a range of elements from a list</small>
* `LREM key count element`\
   <small>Remove elements from a list</small>
* `LSET key index element`\
   <small>Set the value of an element in a list by its index</small>
* `LTRIM key start stop`\
   <small>Trim a list to the specified range</small>
* `RPOP key [count]`\
   <small>Remove and get the last elements in a list</small>
* `RPOPLPUSH source destination`\
   <small>Remove the last element in a list, prepend it to another list and return it</small>
* `RPUSH key element [element ...]`\
   <small>Append one or multiple elements to a list</small>
* `RPUSHX key element [element ...]`\
   <small>Append an element to a list, only if the list exists</small>
