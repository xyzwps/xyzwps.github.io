---
title: 数组
---

## 泛型数组

因为类型擦除的原因，在 Java 中并不能创建泛型数组，只能创建一个 `Object` 数组，然后强制类型转换（泛型参数会被用 `Object` 替换）。比如：

```java
class Demo<E> {
    E[] a1 = new E[10];            // 不允许
    E[] a2 = (E[]) new Object[10]; // 这才是正常的做法，可编译器会提示 unchecked cast
}
```

但是在遇到嵌套类时，会出现一些难以处理的情况。比如：

```java
class ArrayDemo<E> {
    E element;
    Sub sub = new Sub();

    class Sub {
        E value;
        Sub[] subs1 = new Sub[10]; // <1>
        Sub[] subs2 = (Sub[]) new Object[10]; // <2>
    }
}
```

现在你猜猜看 `subs1` 和 `subs2` 初始化这两行，哪一行可以正常工作？答案是，哪行都不行。

<1> 会在编译时抛出错误，即编译都编译不了，原因是不能创建泛型数组。
<2> 会在运行时抛出错误，原因是不能把一个 `Object` 类型的数组转换为 `Sub` 类型的数组。

那该怎么办？只能饶了。要么把 `Sub` 类中的泛型参数类型改成 `Object`，要么吧 `Sub[]` 改成 `Object[]`。
