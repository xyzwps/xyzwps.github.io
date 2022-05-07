---
title: 类加载
---

## Java 类加载过程

类的整个加载过程经历以下阶段：

1. **加载**（*loading*）：寻找类/接口的二进制表示（字节码），它们可以是已经从源代码编译出来的 class 文件，也可以是在运行时通过计算得到的字节码。
1. **连接**（*linking*）：把类/接口的二进制表示送入 JVM，之后这些类/接口就可以被执行了。连接过程分为三步：
   1. **验证**（*verification*）：确保类/接口的二进制表示在结构上是正确的。
   1. **准备**（*preparation*）：创建类/接口的静态字段，并把它们初始化为默认值。
+
WARNING: 这一步不执行类/接口中的任何代码。这里把静态字段初始化为默认值是指比如把 `int` 字段初始化为 0，对象初始化为 `null`。
   1. **解析**（*resolution*）：类/接口的二进制表示在引用其他类/接口的字段、方法等的时候，使用符号引用。这一阶段，把符号引用替换为直接引用。
1. **初始化**（*initialization*）：给类/接口的静态字段赋值，执行静态初始化器（静态代码块）。初始化发生在类/接口被第一次使用时。初始化的顺序是先父类，再子类。具体地说，类初始化**只会**在以下情况下发生：
   * 创建了类对象（通过反射也算）
   * 静态方法被调用（通过反射来调用也算）
   * 静态字段被赋值
   * 静态字段被使用，但是这个静态变量不是 `final` 的。

## 类加载器

类的加载是通过类加载器（*class loader*）来加载的。类加载器完成类的**加载**和**连接**工作。

类加载器分两种：由 JVM 提供支持的 bootstrap 类加载器，和用户定义的类加载器。用户定义的类加载器都是 `ClassLoader` 的子类实例。用户定义的类加载器用来扩展 JVM 动态加载类的能力。比如加载从网络上下载的类，加载运行时生成的类，加载被加密的类等。一个类加载器可以直接加载一个类，也可以委托给另一个加载器来加载。

请看下面的例子：

.ClassLoaderDemo.java
[source,java]
----
import java.util.ArrayList;
import javax.sql.DataSource;

public class ClassLoaderDemo {
    public static void main(String[] args) {
        System.out.println(ArrayList.class.getClassLoader());
        System.out.println(DataSource.class.getClassLoader());
        System.out.println(ClassLoaderDemo.class.getClassLoader());
        System.out.println(ClassLoaderDemo.class.getClassLoader().getParent());
    }
}
----

这个例子输出的结果是这样的（JDK 11）：

----
null
jdk.internal.loader.ClassLoaders$PlatformClassLoader@1c6b6478
jdk.internal.loader.ClassLoaders$AppClassLoader@6659c656
jdk.internal.loader.ClassLoaders$PlatformClassLoader@1c6b6478
----

返回 `null` 说明这个类是由 bootstrap 类加载器加载的。Bootstrap 类加载器就像前面说的，由 JVM 提供支持，它不会以一个 `ClassLoader` 类实例的形式体现。程序的主类 `ClassLoaderDemo` 是由 `AppClassLoader` 加载的。`DataSource` 接口是由 `PlatformClassLoader` 加载的（在 Java 9 之前，是 `ExtClassLoader`）。

* Bootstrap 类加载器用来加载核心类
* `PlatformClassLoader` 用来加载 Java 扩展类
* `AppClassLoader` 用来加载当前应用类路径下的类。

## 自定义类加载器

参见参考文档。

## 参考文档

* https://cloud.tencent.com/developer/article/1383145[【腾讯云社区】一看你就懂，超详细java中的ClassLoader详解]
* https://www.javaworld.com/article/2077260/learn-java-the-basics-of-java-class-loaders.html[【javaworld】The basics of Java class loaders]
* https://www.baeldung.com/java-classloaders[【Baeldung】Class Loaders in Java]
* https://docs.oracle.com/javase/specs/[【Oracle】Java 语言与虚拟规范]