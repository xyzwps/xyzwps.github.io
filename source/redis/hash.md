---
title: Hash
---

## Redis Hash

Redis hash 看起来就像你期望的”hash“那样，存储 field-value 对：

// 这里应该是因为 redis 中 key 已经有所指，而不说是 key-value 对。

```console
> hmset user:1000 username antirez birthyear 1977 verified 1
OK
> hget user:1000 username
"antirez"
> hget user:1000 birthyear
"1977"
> hgetall user:1000
1) "username"
2) "antirez"
3) "birthyear"
4) "1977"
5) "verified"
6) "1"
```

尽管 hash 可以很方便的表示*对象*，不过事实上你可以往 hash 添加的 field 数量没有明确上限（除了可用内存以外），所以你可以再你的应用程序中以各种方式来使用 hash。

命令 `HMSET` 可以一次性同时设置多个 field 的 value，不过 `HGET` 一次只能得到一个 field 的值。`HMGET` 类似于 `HGET`，不过它返回一个 value 数组：

```console
> hmget user:1000 username birthyear no-such-field
1) "antirez"
2) "1977"
3) (nil)
```

Hash 上还有一些命令可以单独操纵 field，比如 `HINCRBY`：

```console
> hincrby user:1000 birthyear 10
(integer) 1987
> hincrby user:1000 birthyear 10
(integer) 1997
```

你可以在这里找到[全部的 hash 命令文档](https://redis.io/commands#hash)。

值得注意的是，小哈希值(也就是一些值很小的元素)在内存中以特殊的方式进行编码，这使得它们的内存效率很高。

## Hash 相关命令

- `HDEL key field [field ...]`\
  <small>Delete one or more hash fields</small>
- `HEXISTS key field`\
  <small>Determine if a hash field exists</small>
- `HGET key field`\
  <small>Get the value of a hash field</small>
- `HGETALL key`\
  <small>Get all the fields and values in a hash</small>
- `HINCRBY key field increment`\
  <small>Increment the integer value of a hash field by the given number</small>
- `HINCRBYFLOAT key field increment`\
  <small>Increment the float value of a hash field by the given amount</small>
- `HKEYS key`\
  <small>Get all the fields in a hash</small>
- `HLEN key`\
  <small>Get the number of fields in a hash</small>
- `HMGET key field [field ...]`\
  <small>Get the values of all the given hash fields</small>
- `HMSET key field value [field value ...]`\
  <small>Set multiple hash fields to multiple values</small>
- `HRANDFIELD key [count [WITHVALUES]]`\
  <small>Get one or multiple random fields from a hash</small>
- `HSCAN key cursor [MATCH pattern] [COUNT count]`\
  <small>Incrementally iterate hash fields and associated values</small>
- `HSET key field value [field value ...]`\
  <small>Set the string value of a hash field</small>
- `HSETNX key field value`\
  <small>Set the value of a hash field, only if the field does not exist</small>
- `HSTRLEN key field`\
  <small>Get the length of the value of a hash field</small>
- `HVALS key`\
  <small>Get all the values in a hash</small>
