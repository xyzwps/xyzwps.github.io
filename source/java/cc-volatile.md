---
title: Volatile
---

Java `volatile` 关键字用来修饰类的字段。下面把类成员字段或者静态字段都说成变量。`volatile` 起着两个作用：

## 保证对变量修改对其他线程的可见性

在多核 CPU 上，一些局部数据会被缓存到 CPU cache 中。如果修改了一个变量的值，那么这个修改可能仅仅反映在当前线程占用的 CPU 核的 cache 里，而对在其他核上的线程不可见（不能在变量被修改后立刻得到新值）。要使修改对其他线程可见，只要把变量用 `volatile` 修饰即可。

## 避免指令重排

在 Java 语言规范中给了这样一个例子：

[source,java]
----
class Test {
    static int i = 0, j = 0;
    static void one() { i++; j++; }
    static void two() {
    System.out.println("i=" + i + " j=" + j);
}
----

在这个例子中，如果一个线程反复调用 `one` 方法，另一个线程反复调用 `two` 方法，那么可能会出现输出结果中 `j` 的值大于 `i` 的现象。Java 内存模型允许编译器对指令进行重排和优化，这导致共享变量 `j` 和 `i` 的更新顺序是不确定的。

要避免这种情况出现，可以把 `one` 和 `two` 两个方法变成同步方法，也可以把 `i` 和 `j` 标记为 `volatile` 变量。

---

参考：

- http://tutorials.jenkov.com/java-concurrency/volatile.html[Java Volatile Keyword]