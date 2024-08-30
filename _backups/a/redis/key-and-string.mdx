---
title: Key 和 String
---

## Redis Key

Redis key 都是二进制安全的，这意味着你可以把任何二进制序列作为 key，小到可以是简单的 string `"foo"`，大到可以是一个 JPEG 文件内容，空 string 也是一个有效的 key。

使用 key 时有一些规则：

* 不推荐过长的 key。比如 key 的长度超过 1024 字节就不好，不只是内存问题，在查找指定 key 时会在 key 的比较上花费大量时间。如果 key 避免不了使用大值，那么取其哈希值作为 key 就比较好，比如用 SHA1 哈希，这样还可以省些内存和网络带宽。
* 太短的 key 也不太好。比如短一点的 key `"u1000flw"` 就没有 `"user:1000:followers"` 好，后者可读性更好。虽然更短的 key 更省内存，不过我们需要在此之间找到一个平衡。
* 尽量坚持一种模式。比如 `object-type:id` 这种就不错，可以有 `"user:1000"`。`.` 和 `-` 经常被用用于分隔多单词字段，比如 `"comment:123:reply.to"` 或者 `"comment:123:reply-to"`。
* Key 的最大长度是 512MB。

## Redis String

String 是 Redis 中能和 key 关联的最简单的数据类型。

> 说明一下，这里没有把 string 翻译为“字符串”的原因是，它已经不仅仅是“字符”的“串”了。干脆直接用 string 算了。

因为 Redis key 也是 string，所以当我们把一个 string 作为 value 关联到 key 时，实际上是把一个 string 映射到另一个 string。在一些场景下，string 类型非常有用，比如缓存 HTML 片段或者网页、

下面我们来玩一下 string 类型：

```console
> set mykey somevalue
OK
> get mykey
"somevalue"
```

如你所见，我们使用 `SET` 和 `GET` 命令来设置和获取 string value。注意，如果在 redis 中一个 key 已经有了对应的 value，那么 `SET` 会用新 value 替换掉它，即使这个已经存在的 value 不是 string。

Value 可以是任何一种类型的 string，比如可以是一个 JPEG 图片。Value 的最大长度不可超过 512 MB。

`SET` 命令还有一些选项来提供额外功能，比如如果 key 已经存在时 set 会失败，或者反过过来，只有 key 已经存在是才会成功：

```console
> set mykey newval nx
(nil)
> set mykey newval xx
OK
```

即使 string 是基本数据类型，但我们还是可以对他们执行一些有趣的操作。比如原子性自增：

```console
> set counter 100
OK
> incr counter
(integer) 101
> incr counter
(integer) 102
> incrby counter 50
(integer) 152
```

`INCR` 命令会把 string 值转成整数，然后对其加一，最后用加一后的 value 替换旧 value。其他类似的命令有 `INCRBY`、`DECR`、`DECRBY`。

`INCR` 是原子的怎么理解呢？多个客户端 `INCR` 同一个 key 的时候绝不会陷入静态条件，比如这样的情况绝不会发生：客户端 1 读到 10，客户端 2 同时也读到 10，它们都把值 `INCR` 到 11，最后新值绝对不会是 11，而是 12，因为 `INCR` 在进行读-增加-写的操作的同时，其他客户端的操作不会执行。

还有一些其他命令来操作字 string。比如 `GETSET` 命令把新 value 写入后返回旧 value。

在一条命令中同时获取和设置多个 key 的 value 可以有效降低延迟，这时你可以使用 `MSET` 和 `MGET` 命令：

```console
> mset a 10 b 20 c 30
OK
> mget a b c
1) "10"
2) "20"
3) "30"
```

`MGET` 返回一个 value 数组。

## 修改和查询 key 空间

有一些命令不针对任何特定类型的数据，它不关心与 key 关联的 value 是何种数据类型。在与 key 进行操作时很有用。

比如，`EXISTS` 命令用于判断一个给定的 key 是否存在于 Redis 中，存在就返回 1，否则返回 0；`DEL` 命令删除给定 key 以及和它关联的 value，不管这个 value 是何种类型。

```console
> set mykey hello
OK
> exists mykey
(integer) 1
> del mykey
(integer) 1
> exists mykey
(integer) 0
```

从上例可以看出，`DEL` 命令的返回值取决于它要删除的 key 是否存在，删除前 key 存在就返回 1，否则返回 0。

还有一些其他和 key 空间相关的命令，但是上面两个和命令 `TYPE` 最重要。`TYPE` 命令返回 key 对应的 value 的数据类型：

```console
> set mykey x
OK
> type mykey
string
> del mykey
(integer) 1
> type mykey
none
```

## Key 过期

在讨论更复杂的数据结构之前，我们需要先讨论另一个和具体数据类型无关的特性：过期。我们可以给 key 设置一个过期时间，来限制 key 的存在时间。一旦超过了过期时间，key 就会被自动销毁，就像使用了 `DEL` 命令那样。

* 过期时间可以精确到秒或者毫秒。
* 不过，过期时间的分辨率总是 1 毫秒。
* 过期信息被复制并持久化到磁盘上，即使 Redis 服务器停了，这个过期时间依然继续前进（Redis 保存了 key 过期的具体时刻）

设置过期时间很简单：

```console
> set key some-value
OK
> expire key 5
(integer) 1
> get key (immediately)
"some-value"
> get key (after some time)
(nil)
```

上例中，第二次 `GET` 调用时 key 却不见了，因为第二个调用和第一次调用的间隔超过了 5 秒钟。上例中我们还用了 `EXPIRE` 命令来设置 key 的过期时间（`EXPIRE` 命令还可以修改已经存在的过期时间，类似地，`PERSIST` 命令可以移除过期时间，并使得 key 永存）。我们还可以在其他创建 key 的命令里顺便设置过期时间，比如使用 `SET` 命令的选项：

```console
> set key 100 ex 10
OK
> ttl key
(integer) 9
```

上例中把一个 key 的值设置为 100，并使它拥有 10 秒的过期时间。之后通过 `TTL` 命令来查看这个 key 剩余的生存时间。

如果要设置和检查剩余的毫秒数，可以使用 `PEXPIRE` 和 `PTTL` 命令，和 `SET` 命令中的 `PX` 选项。

## 本部分涉及到的命令列表

这个列表是对命令的大致介绍。更加具体的内容，比如时间复杂度等，请到官网查看。

### 基本 Key Value 命令

* `COPY source destination [DB destination-db] [REPLACE]`\
   <small>深复制一个 key。</small>
* `DEL key [key ...]`\
   <small>删除一些 key。</small>
* `DUMP key`\
   <small>获取 key 对应的 value 的序列化版本。</small>
* `EXISTS key [key ...]`\
   <small>判断一些 key 是否存在。</small>
* `EXPIRE key seconds [NX|XX|GT|LT]`\
   <small>设置 key 的秒级过期时间。</small>
* `EXPIREAT key timestamp [NX|XX|GT|LT]`\
   <small>设置 key 的过期时刻为指定的 Unix 时间戳。</small>
* `EXPIRETIME key`\
   <small>获取 key 的过期时刻（Unix 时间戳）。</small>
* `KEYS pattern`\
   <small>得到所有符合指定模式的 key。</small>
* `MIGRATE host port key|"" destination-db timeout [COPY] [REPLACE] [AUTH password] [AUTH2 username password] [KEYS key [key ...]]`\
   <small>自动把 Redis 的 key 迁移到另一个 Redis 实例中。</small>
* `MOVE key db`\
   <small>把 key 移动到另一个数据库。</small>
* `OBJECT ENCODING key`\
   <small>查看 Redis 对象的内部编码。</small>
* `OBJECT FREQ key`\
   <small>获取 Redis 对象的对数访问频率。</small>
* `OBJECT IDLETIME key`\
   <small>获取对象从上次访问到现在的时间。</small>
* `OBJECT REFCOUNT key`\
   <small>获取 key 对应的 value 的引用数量。</small>
* `PERSIST key`\
   <small>移除 key 的过期时间。</small>
* `PEXPIRE key milliseconds [NX|XX|GT|LT]`\
   <small>设置 key 的毫秒级过期时间。</small>
* `PEXPIREAT key milliseconds-timestamp [NX|XX|GT|LT]`\
   <small>设置 key 的过期时刻为毫秒级 Unix 时间戳。</small>
* `PEXPIRETIME key`\
   <small>获取 key 的过期时刻（毫秒级 Unix 时间戳）。</small>
* `PTTL key`\
   <small>获取 key 剩余的生存毫秒数。</small>
* `RANDOMKEY`\
   <small>从 key 空间中随机获取一个 key。</small>
* `RENAME key newkey`\
   <small>重名名 key。</small>
* `RENAMENX key newkey`\
   <small>重命名 key，仅当 `newkey` 不存在是成功。</small>
* `RESTORE key ttl serialized-value [REPLACE] [ABSTTL] [IDLETIME seconds] [FREQ frequency]`\
   <small>通过序列化 value 来创建 key。序列化的 value 来自 `DUMP`。</small>
* `SCAN cursor [MATCH pattern] [COUNT count] [TYPE type]`\
   <small>以递增的方式遍历 key 空间。</small>
* `SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]`\
   <small>对 list、set 或者 sorted set 中的元素进行排序。</small>
* `SORT_RO key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA]`\
   <small>`SORT` 命令的只读版。</small>
* `TOUCH key [key ...]`\
   <small>改变指定 key 的最后一次访问时间。返回存在于 key 空间中的 key 的数量。</small>
* `TTL key`\
   <small>获取 key 剩余的存活秒数。</small>
* `TYPE key`\
   <small>获得 key 对应的 value 的数据类型。</small>
* `UNLINK key [key ...]`\
   <small>在另一个线程中异步地删除一个 key。与 `DEL` 不同，它是非阻塞的。</small>
* `WAIT numreplicas timeout`\
   <small>Wait for the synchronous replication of all the write commands sent in the context of the current connection.</small>


### String 命令


* `APPEND key value`\
   <small>把≈ value 追加到 key 对应的 value 后面。</small>
* `GETRANGE key start end`\
   <small>获取 key 对应的 string value 的子串。</small>
* `GETSET key value`\
   <small>为 key 设置新的 value 并返回旧的 value。</small>
* `GET key`\
   <small>获取 key 对应的 value。</small>
* `GETDEL key`\
   <small>获取 key 对应的 value 后，删除此 key。</small>
* `GETEX key [EX seconds|PX milliseconds|EXAT unix-time|PXAT unix-time|PERSIST]`\
   <small>获取 key 对应的 value 并顺便按需设置其过期时间。</small>
* `LCS key1 key2 [LEN] [IDX] [MINMATCHLEN len] [WITHMATCHLEN]`\
   <small>查找最长公共子串。</small>
* `MGET key [key ...]`\
   <small>一次性获取多个 key 对应的 value。</small>
* `MSET key value [key value ...]`\
   <small>一次性设置多个 key 为对应的 value。</small>
* `MSETNX key value [key value ...]`\
   <small>一次性设置多个 key 为对应的 value，仅当命令参数中的 key 都不存在时才成功。</small>
* `PSETEX key milliseconds value`\
   <small>设置 key 的 value，同时为 key 设置一个毫秒级的过期时间。</small>
* `SET key value [EX seconds|PX milliseconds|EXAT unix-time-seconds|PXAT unix-time-milliseconds|KEEPTTL] [NX|XX] [GET]`\
   <small>为 key 设置 string value。</small>
* `SETEX key seconds value`\
   <small>设置 key 的 value，同时为 key 设置一个秒级的过期时间。</small>
* `SETNX key value`\
   <small>设置 key 的 value，仅当 key 不存在时成功。</small>
* `SETRANGE key offset value`\
   <small>把一个 string 从指定偏移量处到末尾的部分替换为一个新 string。</small>
* `STRLEN key`\
   <small>计算 key 对应的 string 长度。</small>
* `SUBSTR key start end`\
   <small>求一个 key 对应 string value 的子串。</small>

### 整数命令

* `DECR key`\
   <small>使 key 对应的整数 value 减一。</small>
* `DECRBY key decrement`\
   <small>使 key 对应的整数 value 减去一个给定的整数。</small>
* `INCR key`\
   <small>使 key 对应的整数 value 加一。</small>
* `INCRBY key increment`\
   <small>使 key 对应的整数 value 增加一个给定整数。</small>

注意，Redis 中并没有所谓的“整数”类型数据，整数也是以字符串的方式存储，只是一旦字符串可以被当成整数使用时，可以使用一些专用命令。下面的浮点数也是这么回事。

### 浮点数命令

* `INCRBYFLOAT key increment`\
   <small>使 key 对应的浮点数 value 增加指定增量。</small>
