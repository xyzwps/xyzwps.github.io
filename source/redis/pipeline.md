---
title: 流水线处理
---

## 请求/响应协议和 RTT

Redis 是一个 TCP 服务器，它使用**客户端-服务器模型**和**请求/响应协议**。

这意味着一个请求通常需要以下几步才能完成：

* 客户端向服务器发送一个请求，从 socket 中读取服务端的响应，通常还是以一种阻塞的方式。
* 服务器处理请求，然后把响应发回客户端。

比如我们有像下面这样的四个命令序列：

* 客户端：`INCR X`
* 服务器：`1`
* 客户端：`INCR X`
* 服务器：`2`
* 客户端：`INCR X`
* 服务器：`3`
* 客户端：`INCR X`
* 服务器：`4`

客户端服务器通过一个网络链路相连。这个链路可能很快（比如 loopback interface），或者很慢（互联网上两个主机之间有很多跳的连接）。不管网络延迟如何，数据包在客户端和服务器之间传输时总是要花时间的。

这个时间就被称为 RTT（Round Trip Time）。容易看出，当客户端需要连续执行一串请求时，RTT 会直接影响性能表现。比如，如果 RTT 时间是 250 毫秒（这算是互联网上的一个非常慢的链路了），如果服务器每秒能够处理 10 万个请求，那么这种情况下，，每秒最多只能处理 4 个请求。

如果链路使用 loopback interface，RTT 时间会非常短（通常不超过 0.1 毫秒），但是如果你需要顺序地执行写操作时，这个时间依然显得很多。

Redis 提供了一种方法来提升此种场景下的性能。

## Redis 流水线处理

一个请求/响应服务器可以这样实现，以使得即使在客户端还没有读取旧请求时也能发送新请求。这种方式能够发送多个命令到服务器而不用等待响应返回，最后用一个单独的步骤来读响应。

这叫流水线处理，这个技术已经被使用了很多年了。比如 POP3 协议就已经实现了这个特性，明显地提升了从服务器下载电子邮件的速度。

Redis 很早就支持了流水线处理了，所以不管你使用哪个版本，你都可以使用流水线。这是一个使用原始 netcat 工具的例子：

```console
$ (printf "PING\r\nPING\r\nPING\r\n"; sleep 1) | nc localhost 6379
+PONG
+PONG
+PONG
```

这样，我们就不用对每个请求都花费一次 RTT 时间了，三个命令只需要一个 RTT 时间。

我们把第一个例子中的命令改用流水线处理如下：

* 客户端：`INCR X`
* 客户端：`INCR X`
* 客户端：`INCR X`
* 客户端：`INCR X`
* 服务器：`1`
* 服务器：`2`
* 服务器：`3`
* 服务器：`4`

**注意：**当客户端使用流水线发送命令时，服务器必须*在内存中*对响应进行排队。如果你需要以流水线方式发送了大量命令，最好对这些命令分批执行，每批次包含的命令数量要合理些，比如先发送 1 万个命令，等读到回复时，在发送另外 1 万个命令，如此反复。这样速度几乎一样，不过 Redis 使用的额外内存的最大数量就成了排队的 1 万个命令的返回。

## 不只是 RTT 的问题

流水线不仅仅是一个减少 RTT 导致的时延的方式，它还能极大提升一个给定 Redis 服务器每秒能执行的操作数量。原因是，若不使用流水线，即使从访问数据和产生响应的角度看，处理每个命令都很廉价，但是从 socket I/O 的角度看，花费依然很大。这涉及到 `read(2)` 和 `write(2)` 系统调用，这意味着要在用户空间和内核空间进行上下文切换，而这回十分影响速度。

在使用流水线时，多个命令的读一般会使用一次 `read(2)` 系统调用，多个回复在发送时使用一个 `write(2)` 系统调用。因此，从下图中可以看出，开始的时候，Redis 每秒能处理查询总数随流水线长度线性增加，最终流水线方式的吞吐量稳定在不使用流水线的 10 倍左右。

![](/assets/img/redis-pipeline-iops.png)

## 一个真实世界的代码示例

下面我们使用 NodeJS 的库 ioredis 来测试 pipelining 带来的速度提升：

```js
const Redis = require('ioredis')
const prettyHrtime = require('pretty-hrtime')

const redis = new Redis({ host: 'localhost', port: 6379 })

const COUNT = 100_0000

async function execInARow () {
  const key = 'demo:benchmark:exec-in-a-row'
  const start = process.hrtime()

  for (let i = 0; i < COUNT; i++) {
    await redis.incr(key)
  }

  const end = process.hrtime(start)
  const result = await redis.get(key)
  console.log(`挨个执行\t用时: ${prettyHrtime(end)}\t结果: ${result}`)
  await redis.expire(key, 3)
}

async function execPipelining (batchSize) {
  const key = 'demo:benchmark:exec-pipelining:' + batchSize
  const start = process.hrtime()

  let pipeline = redis.pipeline()
  for (let i = 1; i <= COUNT; i++) {
    pipeline.incr(key)
    if (i % batchSize == 0) {
      await pipeline.exec()
      pipeline = redis.pipeline()
    } else if (i == COUNT) {
      await pipeline.exec()
    }
  }

  const end = process.hrtime(start)
  const result = await redis.get(key)
  console.log(`管道[${batchSize}]\t用时: ${prettyHrtime(end)}\t结果: ${result}`)
  await redis.expire(key, 3)
}

async function app () {
  console.log('开始')
  await execInARow()
  await execPipelining(100)
  await execPipelining(1000)
  await execPipelining(10000)
  await execPipelining(30000)
  await execPipelining(50000)
  await execPipelining(100000)
  await execPipelining(1000000)
}

app()
  .then(() => process.exit(0))
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
```

上面的简单代码在我的 Mac OS X 上，使用 loopback interface 以使得 RTT 非常低，某次执行得到以下结果：

```console
开始
挨个执行        用时: 51 s      结果: 1000000
管道[100]       用时: 3.1 s     结果: 1000000
管道[1000]      用时: 2.21 s    结果: 1000000
管道[10000]     用时: 2.29 s    结果: 1000000
管道[30000]     用时: 2.64 s    结果: 1000000
管道[50000]     用时: 2.78 s    结果: 1000000
管道[100000]    用时: 3.04 s    结果: 1000000
管道[1000000]   用时: 4.18 s    结果: 1000000
```

可以看到，使用 pipelining，性能提升会有 10 倍以上的提升，但是 pipelining 的大小也是影响性能的因素，这就需要使用者做权衡了。

## Pipelining VS 脚本

使用 Redis 脚本（`自 2.6 版本起开始支持），很多使用 pipelining 来让服务器处理大量工作的场景，都可以更有效率地解决了。脚本的一大优点是它可以同时在读和写数据两方面最小化时延，使得像 *读*、*计算*、*写*之类的操作非常快。Pipelining 就做不到，因为客户端需在调用写命令之前，要先得到读命令的回复。

有时程序希望在 pipelining 中发送 `EVAL` 和 `EVALSHA` 命令。这是完全可行的，Redis 通过 `SCRIPT LOAD` 命令来支持（这保证了 `EVALSHA` 可以被调用，而没有失败的风险）。

## 附录：为何 busy loops 在 loopback interface 上也很慢？

尽管上面把该说的都说了，你可能还想知道为何 Redis 就像下面的那样（伪代码），即使在 loopback interface 环境执行且客户端和服务器同一个物理机器上跑也很慢：

```basic
FOR-ONE-SECOND:
    Redis.SET("foo","bar")
END
```

毕竟，如果两个 Redis 进程和跑分在一起跑，不是仅仅把消息从内存中的一个地方复制到另一个地方就行，而没有任何的时延以及网络开销么？

原因是系统中的进程并不总是在跑，而是由内核调度其来调度进程在跑。所以，当允许跑分执行时，它从 Redis 服务器读取回复（来自最后执行的命令），然后写一个新命令。这个命令现在在 loopback interface buffer 中，不过为了使服务器可以读到，内核要调度服务器进程去执行，等等。所以在实践中，loopback interface 依然会有类似网络产生的时延，这是由内核调度器的工作方式决定的。

基本上，在测量网络服务器的性能时，繁忙循环基准测试是最愚蠢的做法。明智的做法是避免以这种方式进行基准测试。

## 参考

* [Using pipelining to speedup Redis queries](https://redis.io/topics/pipelining)