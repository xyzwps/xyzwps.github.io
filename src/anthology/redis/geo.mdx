---
title: Geo
---

Redis Geo 是对地球上按照经纬度定位的点的相关操作的抽象。

## 存储模型

* 经度的有效范围是 -180 到 180 度。
* 纬度的有效分为是 -85.05112878 到 85.05112878 度。

Redis 中，地理数据被存储在一个 sorted set 中，决定一个地点在 sorted set 中的 score 的方式是 [Geohash](https://en.wikipedia.org/wiki/Geohash)，即把纬度和经度的 bit 交错排列构成一个 52 bit 的唯一整数。我们知道，sorted set 的双精度 score 可以容得下 52-bit 整数，所以没有经度丢失。


## 使用场景

TODO: 

## 基本命令

### `GEOADD`

把一些带有名称的经纬度点增加到一个 key 中：

```
GEOADD key [NX|XX] [CH] 经度 纬度 名称 [经度 纬度 名称 ...]
```

其中：

* `NX` 表示仅更新已存在的元素，而不是添加新元素
* `XX` 表示不更新已存在的元素，仅添加新元素
* `CH` 表示返回*新增加的元素*数量和*被修改的已存在的元素*数量的和。缺省此项，则仅返回新增加的元素的数量。

从 3.2.0 版本加入。

### `GEODIST`

计算同一个 key 下的两个地点之间的距离：

```
GEODIST key 名称1 名称2 [M|KM|FT|MI]
```

后面四个是单位：

* `M` - meter - 米（缺省值）
* `KM` - kilometer - 千米
* `FT` - feet - 英尺
* `MI` - mile - 英里

从 3.2.0 版本加入。

### `GEOHASH`

获取一些地理位置的 GeoHash 值：

```
GEOHASH key 名称 [名称 ...]
```

从 3.2.0 版本加入。

### `GEOPOS`

获取一些地理位置的经纬度：

```
GEOPOS key 名称 [名称 ...]
```

从 3.2.0 版本加入。


### 示例

```console
redis> GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
(integer) 2
redis> GEODIST Sicily Palermo Catania
"166274.1516"
redis> GEOHASH Sicily Palermo Catania
1) "sqc8b49rny0"
2) "sqdtr74hyu0"
redis> GEOPOS Sicily Palermo Catania NonExisting
1) 1) "13.36138933897018433"
   2) "38.11555639549629859"
2) 1) "15.08726745843887329"
   2) "37.50266842333162032"
3) (nil)
```

## 搜索命令

示例数据准备：

```console
redis> GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
(integer) 2
redis> GEOADD Sicily 12.758489 38.788135 "edge1" 17.241510 38.788135 "edge2"
(integer) 2
```

### `GEOSEARCH`

查询一个区域内（包括边界上）的地理位置点：

```
GEOSEARCH key
    [FROMMEMBER member] [FROMLONLAT longitude latitude]
    [BYRADIUS radius M|KM|FT|MI] [BYBOX width height M|KM|FT|MI]
    [ASC|DESC] [COUNT count [ANY]]
    [WITHCOORD] [WITHDIST] [WITHHASH]
```

* 中心点
  * `FROMMEMBER` 中心点的名称
  * `FROMLONLAT` 中心点的经纬度
* 区域xingzhuang
  * `BYRADIUS` 以中心点为圆心的圆形区域
  * `BYBOX` 以中心点位中心的矩形区域
* 排序
  * `ASC` 按照距离中心点从近到远的顺序
  * `DESC` 按照距离中心点从远到近的顺序
* 返回数量
  * `COUNT` 表示返回最前面几条。缺省则返回区域内的全部地理位置
  * `ANY` 存在时表示，尽可能快地返回指定数量的点，而不是等全部都算出来并排序后取最前面几个点
* 返回值
  * `WITHDIST` 使返回值中带有距离中心点的距离
  * `WITHCOORD` 返回结果位置的坐标
  * `WITHHASH` 返回结果中带有 GeoHash 值

从版本 6.2.0 引入。

```console
redis> GEOSEARCH Sicily FROMLONLAT 15 37 BYRADIUS 200 km ASC
1) "Catania"
2) "Palermo"
redis> GEOSEARCH Sicily FROMLONLAT 15 37 BYBOX 400 400 km ASC WITHCOORD WITHDIST
1) 1) "Catania"
   2) "56.4413"
   3) 1) "15.08726745843887329"
      2) "37.50266842333162032"
2) 1) "Palermo"
   2) "190.4424"
   3) 1) "13.36138933897018433"
      2) "38.11555639549629859"
3) 1) "edge2"
   2) "279.7403"
   3) 1) "17.24151045083999634"
      2) "38.78813451624225195"
4) 1) "edge1"
   2) "279.7405"
   3) 1) "12.7584877610206604"
      2) "38.78813451624225195"
redis>
```

### `GEOSEARCHSTORE`

和 `GEOSEARCH` 类似，它把搜索结果存放到一个目标 key 中：

```
GEOSEARCHSTORE destination source
    [FROMMEMBER member] [FROMLONLAT longitude latitude]
    [BYRADIUS radius M|KM|FT|MI] [BYBOX width height M|KM|FT|MI]
    [ASC|DESC] [COUNT count [ANY]]
    [STOREDIST]
```

使用 `STOREDIST` 时，存到目标 key 中的数据是以距离中心点的距离作为 score 来排序。

从版本 6.2.0 引入。

```console
redis> GEOSEARCHSTORE key1 Sicily FROMLONLAT 15 37 BYBOX 400 400 km ASC COUNT 3
(integer) 3
redis> GEOSEARCH key1 FROMLONLAT 15 37 BYBOX 400 400 km ASC WITHCOORD WITHDIST WITHHASH
1) 1) "Catania"
   2) "56.4413"
   3) (integer) 3479447370796909
   4) 1) "15.08726745843887329"
      2) "37.50266842333162032"
2) 1) "Palermo"
   2) "190.4424"
   3) (integer) 3479099956230698
   4) 1) "13.36138933897018433"
      2) "38.11555639549629859"
3) 1) "edge2"
   2) "279.7403"
   3) (integer) 3481342659049484
   4) 1) "17.24151045083999634"
      2) "38.78813451624225195"
redis> GEOSEARCHSTORE key2 Sicily FROMLONLAT 15 37 BYBOX 400 400 km ASC COUNT 3 STOREDIST
(integer) 3
redis> ZRANGE key2 0 -1 WITHSCORES
1) "Catania"
2) "56.441257870158204"
3) "Palermo"
4) "190.44242984775784"
5) "edge2"
6) "279.7403417843143"
```

### `GEORADIUS`

在 3.2.0 版本引入，在 6.2.0 版本废弃，推荐改用 `GEOSEARCH`。

查询一个圆形区域内的地理位置点，算是 `GEOSEARCH` 的一个弱化版。下面把相关命令也都列出来：

```
GEORADIUS key
    longitude latitude radius M|KM|FT|MI
    [WITHCOORD] [WITHDIST] [WITHHASH]
    [COUNT count [ANY]] [ASC|DESC]
    [STORE key] [STOREDIST key]

GEORADIUSBYMEMBER key
    member radius M|KM|FT|MI
    [WITHCOORD] [WITHDIST] [WITHHASH]
    [COUNT count [ANY]] [ASC|DESC]
    [STORE key] [STOREDIST key]
```

`STORE` 是说把搜索结果存放到指定 key 中。

`GEORADIUS_RO` 和 `GEORADIUSBYMEMBER_RO` 与不带 `_RO` 的两个命令的区别是不带有两个 `STORE` 参数，即只读版。

