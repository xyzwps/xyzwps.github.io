---
title: Bitmap
---

## Bitmap

Bitmap 不是一个实际上的数据类型，而是一组定义在字符串上的面向bit的操作集合。因为字符串是二进制安全的 blob，最大长度是 512MB，所以它可以设置 $2^{32}$ 个不同的 bit。

Bit 操作被分成两组：常数时间的单 bit 操作，类似于把一个 bit 设置为 0 或 1，或者获取它的值；和对一组 bit 进行的操作，例如统计指定范围内的bit数量。

Bitmap 的一个最大优点是它在存储信息时极为节省空间。比如一个系统中，不同的用户用递增的用户 ID，那么用 bitmap 只需要 512MB 内存就可以记录 40一个用户的单 bit 信息。

设置和获取 bit 使用命令 `SETBIT` 和 `GETBIT`：

```console
> setbit key 10 1
(integer) 1
> getbit key 10
(integer) 1
> getbit key 11
(integer) 0
```

命令 `SETBIT` 把第一个参数作为 bit 的位置，第二个参数作为 bit 的值（取 0 或 1）。命令自动扩展字符串的长度，在设置的 bit 为超出字符串长度时。

命令 `GETBIT` 只是返回指定索引处的 bit 值。超出字符串长度范围之外的 bit 总是被认为是 0.

有三个命令来操作一组 bit：

1. `BITOP` 在不同字符串之间进行按位操作。提供的操作有 AND、OR、XOR 和 NOT。
1. `BITCOUNT` 进行统计，返回所有为 1 的 bit 的数量。
1. `BITPOS` 返回第一个具有指定值的 bit 的位置。

`BITPOS` 和 `BITCOUNT` 都可以按字节操作字符串，而非遍历整个字符串。下面是一个使用 `BITCOUNT` 命令的简单例子：

```console
> setbit key 0 1
(integer) 0
> setbit key 100 1
(integer) 0
> bitcount key
(integer) 2
```

常见的使用场景有：

* 各种实时分析
* 存储空间高线且高性能的布尔信息，和一个对象的 ID 关联。

把多个 Bitmap 拆分成多个 key 很简单，比如，因为要对数据集进行分片，或者因为通常建议避免使用巨型 key。

## 相关命令

- `BITCOUNT key [start end [BYTE|BIT]]`\
    <small>Count set bits in a string</small>
- `BITFIELD key [GET encoding offset] [SET encoding offset value] [INCRBY encoding offset increment] [OVERFLOW WRAP|SAT|FAIL]`\
    <small>Perform arbitrary bitfield integer operations on strings</small>
- `BITFIELD_RO key GET encoding offset`\
    <small>Perform arbitrary bitfield integer operations on strings. Read-only variant of BITFIELD</small>
- `BITOP operation destkey key [key ...]`\
    <small>Perform bitwise operations between strings</small>
- `BITPOS key bit [start [end [BYTE|BIT]]]`\
    <small>Find first bit set or clear in a string</small>
- `GETBIT key offset`\
    <small>Returns the bit value at offset in the string value stored at key</small>
- `SETBIT key offset value`\
    <small>Sets or clears the bit at offset in the string value stored at key</small>










