---
title: 持久化方案
translateFrom: https://redis.io/topics/persistence
---

本文是对 Redis 持久化的一个技术性描述，建议所有 Redis 用户都读一下。你还可以读一下[Redis 持久化解密](http://antirez.com/post/redis-persistence-demystified.html)来了解对 Redis 持久化和其持久化保证的更宽的概述。

## Redis 持久化

Redis 提供了几种持久化选项：

* **RDB**（*Redis Database*）：RDB 持久化按指定的时间间隔，对数据集执行时间点快照。
* **AOF**（*Append Only File*）：AOP 持久化在服务器接收到写操作时记录日志，在服务器启动时重放这些写操作，来重新构造原始数据集。日志中记录的命令格式和 Redis 协议中的一样，不过是按仅追加的方式。当这个日志太大时，Redis 能够在后台重写这个日志。
* **不持久化**：如果你希望数据仅在服务器运行时存在，你就可以完全禁用持久化。
* **RDB + AOF**：在同一个 Redis 实例中，把 RDB 和 AOF 结合起来使用也是可以的。注意，这种情况下，在 Redis 重启时会使用 AOF 文件来重建原始数据集，因为 AOF 保证提供最完整的数据。

最重要的是如何在 RDB 和 AOF 持久化之间做权衡。我们从 RDB 开始说：

## RDB 的优势

* RDB 是一个非常紧凑的单文件 Redis 数据时间点快照（TODO: 怎么理解？）。这个文件非常适用于备份。比如你想每小时都对最近 24 小时的数据进行归档，每天都存一分 RDB 快照，存最近 30 天的。这允许你在灾难时，很容易从不同版本的数据集中恢复数据。
* RDB 非常适用于灾难恢复，作为一个紧凑的单文件，它可以被传送到远处的数据中心，或者传到亚马逊 S3（可能需要加密）。
* RDB 能够最大化 Redis 的性能表现，因为 Redis 主进程唯一需要为持久化做的事情，就是 fork 一个子进程来做具体的持久化工作。主进程不需要执行任何磁盘 I/O 或类似的操作。
* 相比于 AOF，RDB 从大数据集中恢复启动的速度更快。
* 在副本中，RDB 支持 partial resynchronizations after restarts and failovers. TODO:

## RDB 的劣势

* 如果你希望在 Redis 挂掉时（比如断电了），能够最小化数据丢失的可能，RDB 就不够好。你可以配置不同的保存点来产生 RDB（比如在 5 分钟后和每 100 次对数据集的写入之后，不过你可以有多个保存点）。不过通常你会每隔 5 分钟或者更久才创建一个 RDB 快照，所以一旦 Redis 因为某种原因停止工作且没有正确关闭，你就会丢失最近几分钟的数据。
* RDB 需要经常 fork 子进程把数据持久化到磁盘。如果数据集很大，fork 就会很花时间；如果数据集又大、CPU 性能又不够高时，就可能会导致 Redis 在数毫秒甚至 1 秒的时间里，暂时无法处理客户端的命令。尽管 AOF 也需要 fork，但是你可以调优追加 log 的频率，而无需在持久化上做权衡。

## AOF 的优势

* 使用 AOF，Redis 的持久性会更好：你可以有不同的 fsync（TODO: 啥）策略：完全不 fsync、每秒 fsync、每个请求 fsync。默认的 fsync 的策略是每秒 1 次，这种情况下性能依旧很好（fsync 是由一个后台线程执行的，主线程在没有正在进行的 fsync 时会尽最大努力写数据），不过你可能丢失最近 1 秒的数据。
* AOF log 是一个“仅追加 log”，所以既不能 seek，在断电时也不会使数据损坏。即使这个 log 在某些情况下（比如磁盘满了或者其他原因）以“half-written”命令（TODO: 啥）结尾，redis-check-aof 工具也能很容易的修复它。
* 在 AOF log 变得过大时，Redis 能够在后台自动重写 AOF（TODO: 啥意思）。这个重写是完全安全的，因为 Redis 持续往旧的 log 追加，生成的新的 AOF 仅包含用于创建当前数据集的最小操作集，一旦新的文件准备好替换旧文件了，Redis 就会自动往新文件里追加。
* AOF log 了所有操作，这些操作是有明确先后顺序的，所以它很容易理解，也很容易进行格式化。你可以很容易导出 AOF 文件。比如你意外地使用 `FLUSHALL` 命令 flush 的所有数据，只要在此期间没有 rewrite log 执行，你都可以通过停掉服务器来保存你的数据集，移除最近的一些命令，然后重启 Redis。

## AOF 的劣势

* 对于同样的数据集，AOF 文件通常比 RDB 文件要大。
* 对于特定的 fsync 策略，AOF 可能比 RDB 要慢一些。通常，每秒一次的 fsync 策略可以保证 Redis 性能依然很高，禁用 fsync 则可以达到和 RDB 一样的性能即使在高写负载下。RDB is able to provide more guarantees about the maximum latency even in the case of an huge write load. TODO: 怎么理解？
* 过去，在一些特定的命令上，我们遇到过一些罕见的 bug（比如有一个 bug 涉及到类似于 `BRPOPLPUSH` 这样的阻塞命令），导致在重新加载时，AOF 不能重新产生和原来精确一致的数据集。这个 bug 很罕见，我们在测试集中自动地创建随机复杂的数据集，然后重新加载它们来检查数据，结果一切都符合预期。不过，这样的 bug 几乎不会出现在 RDB 持久化中。要说得再清楚一些：Redis AOF 以递增的方式更新一个已经存在的状态，就像 MySQL 或 MongoDB 那样，不过 RDB 快照机制总是从头开始创建整个数据集的快照，一遍又一遍，所以概念上来说，RDB 更健壮。不过：
  1. 需要说明的是，每当 AOF 被 Redis 重写，它总是以数据集中实际存在的数据从头开始创建，这使得它相对于总是追加的 AOF 文件来说，抵御 bug 的能力强
  1. 在真实世界中，我们还没有从用户那里得到 AOF 导致崩溃反馈报告。

## 那我应该用哪个？

如果你希望数据安全度像 PostgreSQL 那样，一般建议你同时使用两种持久化方法。

如果你很在乎你的数据，但是可以在灾难时容忍几分钟的数据丢失，你就可以仅使用 RDB。

有很多用户仅使用 AOF，不过我们不鼓励这么做，因为不时地搞一个 RDB 快照对数据库备份、快速重启和应对 AOF 引擎 bug 来说是一个好主意。

注意：因为这些原因，我们希望未来能够统一 AOF 和 RDB 到一个单独的持久化模型中（长期计划）。

下面的章节会对这两种持久化模型的更多细节做演示。

## 快照

默认情况下，Redis 把数据集的快照以二进制文件的方式保存到磁盘上，这个文件叫 `dump.rdb`。你可以配置 Redis 的自动快照策略：如果数据集至少发生 M 次改变时，就每 N 秒保存一次数据集，或者你可以手动盗用 `SAVE` 和 `BGSAVE` 命令。

比如，下面的配置会使 Redis 在至少发生 1000 个 key 改变时，就每隔 60 秒自动 dump 数据集到磁盘。

```console
save 60 1000
```

这个策略被称为**快照**。

工作方式是：

每当 Redis 需要 dump 数据集到磁盘时，会发生下面的事情：

* Redis 进行一次 [fork](http://linux.die.net/man/2/fork)。这时我们就有了一个子进程和一个父进程。
* 子进程开始把数据集写到一个临时的 RDB 文件中。
* 当子进程把数据全部写到新的 RDB 文件后，就用新的 RDB 文件替换掉旧的。

## 仅追加文件（AOF）

快照的持久性不够好。如果你的计算机跑的 Redis 停了、断电了或者不小心 `kill -9` 掉了 Redis 实例，那么最后写入 Redis 的数据就会丢失。尽管对于很多应用程序来说这不算个事，但是也有很多使用场景要求完全的持久性，这种情况下它就不是一个可行的选择。

**仅追加文件**（*append-only file*， 简称 AOF）就是一个选择，它是 Redis 的完全持久性策略。它从 1.1 版本就引入了 Redis。

你可以在配置文件中打开 AOF：

```txt
appendonly yes
```

从现在开始，每当 Redis 接收到一个命令改变数据集（比如 `SET`），它都会被追加到 AOF中。当你重启 Redis 时，Redis 就会重放 AOF 来重建数据集。

### 日志重写

你可以猜到，AOF 会在写操作执行时变得越来越大。比如，你递增一个计数器 100 次，最后，在你的数据集中只有一个 key 来存放最终值，但是在 AOF 中却有 100 条记录。而其中 99 条对于重建当前状态都是多余的。

所以 Redis 支持一个有趣的特性：它能够在后台重建 AOF 而不会打断对客户端的服务。在任何时候，只要你发起一个 `BGREWRITEAOF`，Redis 就会重写一个重建内存中当前数据集的最少命令序列。如果你使用 Redis 2.2，你需要时不时地执行 `BGREWRITEAOF` 命令。Redis 2.4 能够自动触发日志重写（更多信息可以在 2.4 的示例配置文件中找到）。

### AOF 的持久性怎样？

你可以配置 Redis 会把数据 [fsync](https://linux.die.net/man/2/fsync) 到磁盘多少次。有三个选项：

* `appendfsync always`：每当新命令被追加到 AOF 时都 `fsync`。这种方式很慢，但是很安全。注意：追加命令到 AOF 是发生在一批来自多个客户端的命令之后，或者是一个 pipeline 被执行后，所以实际含义应该是，每写一次 AOF 就 `fsync` 一次（在发送回答之前）。
* `appendfsync everysec`：每秒一次 `fsync`。足够快（在 2.4 中，这种方式就像快照一样快），但是在灾难时，你可能会丢失 1 秒钟的数据。
* `appendfsync no`：从不 `fsync`，仅把数据放到你的操作系统里。这是更快也更不安全的方法。这个配置下，一般 Linux 会每个 30 秒 flush 一次数据，不过这取决于内核的精确调优。

建议的（也是默认的）策略是每秒进行一次 `fsync`。它非常快，也很安全。总是 `fsync` 的策略在实践中非常慢，但是它支持按组提交，所以如果有多个并行的写操作，Redis 会尝试仅执行一次 `fsync` 操作。

### 如果 AOF 被截断了，我应该怎么办？

可能在写 AOF 的时候 Redis 服务器挂了，或者在写 AOF 的时候，存储它的卷满了。这时，AOF 依旧会保有在出事时间点之前的数据集的一致性（对应每秒 `fsync` 的策略，这个时间点可能还要靠前一点），但是后续追加到 AOF 的命令会被截断。最新版本的 Redis 能够加载 AOF，仅仅丢弃最后一个格式不正确的命令。这种情况下，服务器或发送一个类似下面的日志：

```log
* Reading RDB preamble from AOF file...
* Reading the remaining AOF tail...
# !!! Warning: short read while loading the AOF file !!!
# !!! Truncating the AOF at offset 439 !!!
# AOF loaded anyway because aof-load-truncated is enabled
```

你可以改变默认配置来强制 Redis 在这种情况下停掉，不过默认配置是继续服务，而不管文件中的最后一条命令格式是否正确，这样做的目的是保证重启后的可用性。

老版本的 Redis 可能不会恢复，且可能需要下面的步骤：

* 对 AOF 文件做备份
* 修正原始文件，使用 `redis-check-aof` 工具：
  ```console
  $ redis-check-aof --fix
  ```
* 可以用 `diff -u` 来检查两个文件之间的区别
* 使用修正后的文件来重启服务器

## 我的 AOF 文件崩坏了该怎么办？

如果 AOF 不仅仅的被截断了，而是中间有一些非法字节导致文件坏掉了，问题就变得复杂了。Redis 启动时会抱怨，并终止启动：

```console
* Reading the remaining AOF tail...
# Bad file format reading the append only file: make a backup of your AOF file, then use ./redis-check-aof --fix <filename>
```

这时最应该做的事情是执行 `redis-check-aof` 工具，先不要使用 `--fix` 选项，然后理解问题，跳到文件中指定的偏移量处，看看是否能够手动修复这个文件：AOF使用和 Redis 协议同样的格式，很容易手动修复。否则，就由工具来帮我们修复这个文件，但是这种情况下，从有问题的部分到最后的 AOF 文件会被丢掉，如果文件从开始的时候就有问题，使用工具会造成巨大的数据损失。

## 如何工作？

日志重写使用 copy-on-write 方式，这点和快照一样。是按下面的方式工作的：

* Redis 进行一次 [fork](http://linux.die.net/man/2/fork)。这时我们就有了一个子进程和一个父进程。
* 子进程开始把新的 AOF 写到一个临时的文件中。
* 父进程把所有的新修改放到内存中的一个 buffer 中（当然，同时也会把这些新修改写到老的 AOF 中，这种即使重写失败，数据也是安全的）
* 当子进程完成的重写，父进程就得到信号，然后把内存 buffer 中修改追加到子进程产生的文件末尾
* Redis 原子地把老文件的名字给重命名到新文件上，然后开始往新文件上追加数据。

## 如果我现在使用 dump.rdb 快照，如何切换到 AOF？

在 Redis 2.0 和 2.2 中，做法是不同的，你可以猜到咋 Redis 2.2 中更简单，完全不需要重启。

在 Redis 2.2 及其之后的版本中：

* 把最新的 dump.rdb 文件做一个备份
* 把备份传到一个安全的地方
* 发起以下两个命令：
* redis-cli config set appendonly yes
* redis-cli config set save ""
* 确保你的数据库包含同样数量的 key
* 确保往 AOF 中的追加写操作是正确的

第一个 CONFIG 命令启用 AOF。为此，**Redis 会阻塞**来保证初始 dump，之后会打开文件来写，然后会开始追加所有的之后的写请求。

第二个 CONFIG 命令式用于关闭快照存储。这是可选的，如果你希望打开两种持久化方法，就可以跳过。

**重要**：记得去编辑你的 redis.conf 文件来打开 AOF，否则当你重启服务器时，配置修改就会丢失，服务器就会使用旧的配置文件。

Redis 2.0 中的做法：

* Make a backup of your latest dump.rdb file.
* Transfer this backup into a safe place.
* Stop all the writes against the database!
* Issue a `redis-cli BGREWRITEAOF`. This will create the append only file.
* Stop the server when Redis finished generating the AOF dump.
* Edit redis.conf end enable append only file persistence.
* Restart the server.
* Make sure that your database contains the same number of keys it contained.
* Make sure that writes are appended to the append only file correctly.





TODO: