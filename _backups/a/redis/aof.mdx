---
title: AOF
date: 2022-01-13
---

## AOF

**仅追加文件**（*Append Only File*）通常被简称为 AOF，是另一种主要的 Redis 持久化选择。它的工作方式极为简单：每当一个写操作修改了内存中的数据集后，这个操作就会被追加到日志末尾。这个生成的日志格式，和客户端与 Redis 通信时使用的数据格式相同，所以 AOF 甚至可以通过 netcat 管道传输到另一个实例中，或者在需要时很容易的解析。在重启时，Redis 重放这些操作来重建数据集。

AOF 的思想很简单，但是实际上要考虑的东西比 RDB 更复杂一点点点点。

## AOF 演示

为展示 AOF 是如何工作的，我们做一个简单的实验，创建一个 Redis 2.6（或者更高版本）实例并打开 AOF 支持：

```console
./redis-server --appendonly yes
```

现在我们往这个实例发送一些写操作：

```console
redis 127.0.0.1:6379> set key1 Hello
OK
redis 127.0.0.1:6379> append key1 " World!"
(integer) 12
redis 127.0.0.1:6379> del key1
(integer) 1
redis 127.0.0.1:6379> del non_existing_key
(integer) 0
```

前三个操作会实际上修改数据集，第四个则不会，因为不存在名为 `non_existing_key` 的 key。下面是 AOF 的样子：

```console
$ cat appendonly.aof
*2
$6
SELECT
$1
0
*3
$3
set
$4
key1
$5
Hello
*3
$6
append
$4
key1
$7
 World!
*2
$3
del
$4
key1
```

如你所见，最后一个 `DEL` 命令并不存在，因为它没有对数据集产生任何修改。

新的命令只有对数据集产生影响时，才会被记录到 AOF 中，就这么简单。不过，不是所有的命令被记录时都和接收到的一模一样。比如对 list 的阻塞操作仅记录它最终产生的影响，就像一个普通的非阻塞命令那样。类似于 `INCRBYFLOAT` 的命令被记录为 `SET`，使用增加后的值作为 `SET` 进去的最终值，所以在重新加载 AOF 后，在不同的架构下不同的处理浮点数的方式不会导致不同的结果。

现在我们知道了 AOF 只做仅追加操作，所以不会导致数据崩溃，不过这个特性也会导致一个问题：上例中在 `DEL` 操作之后，对应的数据已经完全不存在了，但是 AOF 中依然花费了一些空间来保存这个数据的操作。这样一来，AOF 就成了一个*不断变大*的文件。那么，在 AOF 变得很大时该怎么办呢？

## AOF 重写

AOF 文件变得过大时，Redis 会从头开始把它写到一个临时文件中。重写数据不是从老的 AOF 中来，而是直接访问 Redis 内存，这样一来，Redis 就创建一个尽可能小的 AOF 文件，又可以避免在创建新 AOF 文件时从磁盘中读取老的数据。

一旦重写完成，临时文件就会被 fsync 到磁盘，并用于替换老的 AOF 文件。

你可能想知道，在重写的过程中，被写到 Redis 中的数据发生了什么。新数据会被简单地写到老的（当前的）AOF 文件中，同时会被入队到一个内存中的 buffer 里，这样一来，当新的 AOF 已经准好了，我们就可以把这些丢失的部分写进去，最后用新的 AOF 把旧的替换掉。

如你所见，所有的东西都是仅追加的，在重写 AOF 时，我们依然会把数据写到老的 AOF 中，因为创建新的 AOF 需要时间。这意味着在我们的分析中，我们可以简单避免考虑 AOF 被重写的情况。现在的问题是，多久进行一次 write(2) 和 多久进行一次 fsync(2)。

> AOF 重写过程仅使用顺序的 I/O 操作，所以整个 dump 过程非常高效，甚至在旋转式磁盘（不支持随机 I/O）中也是如此。RDB 快照的生成也是如此。在数据库系统中，完全没有（对磁盘的）随机访问是一个很罕见的特性，主要是原因应该是 Redis 服务是从内存中读取数据，所以不需要对磁盘上的数据进行特殊的组织来适应随机访问的需求，仅在重启时会按顺序加载数据。

## AOF 持久性

在新命令执行时，Redis AOF 使用用户空间 buffer 来存储新数据。每当我们返回到时间循环中时，都会把 buffer 刷入磁盘，对 AOF 描述符使用一次 write(2) 系统调用，不过有三个不同的配置来精确控制 write(2) 的行为，尤其是 fsync(2) 调用。

这三个配置由 **appendfsync** 配置指令来控制，对应三个不同的值：*no*、*everysec*和*always*。这三个属性可以在运行时查询和修改，通过 `CONFIG` `SET` 命令，所以你可以在不停止 Redis 的情况下进行修改。

### `appendfsync no`

在此配置下，Redis 完全不执行 fsync(2)。不过，这将确保客户端不使用 TODO: [流水线](https://redis.io/topics/pipelining)，即，在发送下一个命令之前，等待接受当前命令回复的客户端，会收到一个当前命令执行成功的的确认消息，这个确认消息仅在改变被发送到内核后确认，方式是通过 write(2) 系统调用把命令写到 AOF 文件描述符中。

因为这个配置会使 Redis 不调用 fsync(2)，所以数据什么时候被提交到硬盘完全由内核决定，在大多数 Linux 系统中是每 30s 一次。

### `appendfsync everysec`

在此配置下，数据被写到文件时，既会使用 write(2)，同时每秒还会调用一次 fsync(2) 把数据从内核刷到硬盘中。每当我们从事件循环中返回时，通常 write(2) 都会被执行，但并不保证总是。

不过，如果硬盘不能处理写速度，且后台的 fsync(2) 花费时间超过了 1 秒，Redis 就会把写时间延迟 1 秒，以避免写操作阻塞主线程，因为后台线程中执行的 fsync(2）使用同一个文件描述符。如果过了 2 秒 fsync(2) 都没有终止，Redis 最终会执行 write(2) （可能会阻塞）不计代价把数据传输到硬盘上。

所以在这种模式下，Redis 保证在最坏的情况下，2 秒钟内你写入的所有数据都会被提交到操作系统 buffer 中，并被传输到硬盘上。平均的情况是数据每秒提交一次。

### `appendfsync always`

在此模式下，如果客户端不使用 pipeline 却在发起新命令时等待命令返回，那么在确认被返回给客户端之前，数据会被同时写到文件和同步到磁盘（用 fsync(2)）。

这是我们能够得到的最高持久化级别，但是也比其他模式更慢。

Redis 默认的配置是 `appendfsync everysec`，这在速度（几乎和 `appendfsync no` 一样快）和持久化之间提供了一个很好的平衡。

> Redis 实现的 `appendfsync always` 通常被成功**合并提交**(*group commit*，合并为一组一起提交）。这意味着，Redis 不是在每个写命令执行完后都使用 fsync(2)，Redis 能够在向一组客户端发送请求之前，在最后一个事件循环执行期间，把一组操作合并成一个 write+fsync 操作来提交。
>
> 在实践中，这意味着如果你有几百个客户端同时执行写操作时，fsync(2) 会被分解，这样一来，即使旋转磁盘只能每秒支持 100-200 个操作时，那么在此模式下，Redis 也能够每秒支持数千个并发事务。
>
> 这个特性在传统数据库中通常很难实现，不过 Redis 使这个东西变得非常简单。

## 为何 Pipeline 就不同了？

用不同方式处理客户端发起的 pipelining，是因为客户端使用 pipelining 时为了提升写的速度，而牺牲了在执行下一个命令之前读取给定命令的能力。在回复客户端之前，没有提交点，而客户端在发送完命令之前也并不关心回复，而是追求速度。不过即使客户端正在使用 pipelining，write 和 fsync 系统调用（依赖于配置）也依然会在发布会到时间循环之前发生。

## AOF 与事务

AOF 保证 MULTI/EXEC 正确的事务语义，并在在文件末尾有一个损坏的事务时，会拒绝重新加载它。Redis 服务器中有一个工具可以移除 AOF 文件末尾的部分事务。

注意：因为 AOF 在每个时间循环遍历结束后，使用一个单一的 write(2) 系统调用来追加文件，所以不完整的事务仅可能出现在 Redis 写时发现磁盘却满了这种情况下。

## 与 PostgreSQL 比较

所以，在默认配置下使用 AOF 持久化引擎时，Redis 的持久性到底怎样呢？

* 最糟糕的情况：它保证 write(2) 和 fsync(2) 在 2 秒钟内完成。
* 一般情况：它在回复客户端之前先执行 write(2)，并且每秒执行一次 fsync(2)。

有趣的是，在此情况下，Redis 依旧超快，有一些原因。其一是 fsync 是在后台线程中执行的，其他原因是 Redis 在写文件时是在一种仅追加的模式下，这是一个巨大优势。

不过，如果你需要最大化数据安全，且你的写负载不高，你就可以使用在任何数据库系统中都一样好的持久化方式：总是 `fsync`。

我们来一起读一下 PostgreSQL 的文档（注意，我们仅引用有趣的部分，你可以再这里找到[完整的文档](read://https_www.postgresql.org/?url=https%3A%2F%2Fwww.postgresql.org%2Fdocs%2F9.1%2Fruntime-config-wal.html%23GUC-SYNCHRONOUS-COMMIT)）:

> **fsync(boolean)**
>
> 如果这个参数被打开，PostgreSQL 服务器会尝试确保更新被物理地写到了硬盘上，通过提交 fsync(2) 系统调用或者其他等价的方法（见 wal_sync_method）。这确保数据库集群**在操作系统或者硬件崩掉后可以恢复到一个一致性的状态**。
>
> [snip]
>
> 在很多情况下，为非关键事务关掉 synchronous_commit 可以提供关闭fsync的许多潜在性能好处，而不会有伴随而来的数据损坏风险。

所以 PostgreSQL 需要 fsync 数据来避免崩溃。幸运的是有了 Redis AOF，我们再也不用担心这个问题了，不可能有数据损坏。所以，我们来考察一下下一个参数，它和 Redis 的 fsync 策略相比非常接近，甚至可以说只有名字不同：

> **synchronous_commit (enum)**
>
> 指定事务提交返回 “success” 给客户端之前，是否会等到 WAL 记录被写到硬盘上。有效的值有 on、local 和 off。默认的也是安全的值是 on。当 off 时，在返回给客户端成功时和事务确实保证被安全写到硬盘上时之间，会有一段延迟。最大延迟是三倍的 wal_writer_delay。和 fsync 不同，设置此参数为 off 不会导致任何的数据库不一致：操作系统或者数据库崩溃导致一些最近宣称已提交的事务丢失，但是数据库状态会像那些个丢失的事务被干净的中断了一样。

这时，我们就有了一些类似方式来调优 Redis 了。基本上，PostgreSQL 用户会告诉你，想要速度么？禁用同步提交可能是一个好主意。Redis 中也类似：追求速度么？不要使用 `appendfsync always`。

现在，如果你禁用了 PostgreSQL 中的同步提交，你就处在了一种和 Redis `appendfsync everysec` 类似的情况里了，因为 wal_writer_delay 默认是 200 毫秒，同时文档描述，你需要把这个时间乘以 3 来得到实际的写延迟，即 600 毫秒，非常接近于 Redis 默认的 1 秒了。

> MySQL InnoDB 有一个类似的参数用户用户调优。文档中是这样的：
>
> 如果 `innodb_flush_log_at_trx_commit` 的值是 0，那么日志 buffer 每秒被写到日志文件一次，并在日志文件上执行一次 flush 到硬盘的操作，不过在日志提交时什么都不做。当值是 1 时（默认），在每个事务提交时就把日志 buffer 往日志文件写一次，并在日志文件上执行一次 flush 到硬盘的操作。当值是 2 时，日志 buffer 在每次提交时把日志 buffer 写到文件中，但是不会字文件上执行 flush 到硬盘的操作。不过，日志文件的 flush 操作在值是 2 时每秒钟执行一次。注意，每秒一次 flush 也不是 100% 保证发送的，因为进程调度的原因。
>
> 你可以[此读到更多信息](https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_flush_log_at_trx_commit)。

长话短说：即使 Redis 是一个内存数据库，不过和其他硬盘数据库相比，它依然提供了很好的持久性保证。

从更务实的角度看，Redis 提供的 AOF 和 RDB 快照可以同时打开（这是建议的设置），同时提供了操作的便利性和数据持久性。

我们说的所有有关 Redis 持久性的东西，只要要求把数据持久化到硬盘时，不仅适用于 Redis 用作数据库时，也适用于用 Redis 实现的队列，这些场景都能提供很好的持久性保证。


TODO: 太长了，剪短

## 参考

- [Redis persistence demystified](http://oldblog.antirez.com/post/redis-persistence-demystified.html)

## 扩展阅读

* [Atomic Commit In SQLite](https://sqlite.org/atomiccommit.html)
* [Disk lie](https://queue.acm.org/detail.cfm?id=2367378)
* [what-every-data-programmer-needs-to-know-about-disk](https://www.slideshare.net/iammutex/what-every-data-programmer-needs-to-know-about-disks)