---
title: CountDownLatch
---

假设我们有这样一段批量并发执行任务的代码：

[source,java]
----
var listOfTaskList = List.of(
        List.of(1, 2, 3, 4, 5, 6),
        List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
        List.of(1, 2, 3, 4, 5, 6, 7)
);

for (var tasks : listOfTaskList) {
    System.out.println(">>> batch start <<<");
    var threads = tasks.stream().map(id -> {
        var thread = new Thread(() -> {
            sleep(id * 1000);
            System.out.println("Thread " + Thread.currentThread().getName() + " ends with " + id);
        });
        thread.start(); // 启动执行任务的线程
        return thread;
    }).collect(Collectors.toList());

    for(var t : threads) t.join(); // 工作线程 join 到“主”线程，直到所有工作线程结束

    System.out.println(">>> batch end <<< ");
}
----

这段代码中有一个 `for` 循环，每次循环获取一批任务，这些任务并发执行。并发的方式是，给每个任务申请一个单独的线程。
这些线程都 `join` 到“主”线程，等这一批次的所有任务都完成之后，再进行下一批次的执行。

我们知道，在 Java 环境中启动一个新线程，是一个十分昂贵的操作。于是我们想要申请一个线程池来改进这段代码。有了这样的想法后，
我们遇到的第一个问题是：怎么把线程池中分配的线程对象返回到“主”线程中？相当棘手。
其实我们可以绕过这个问题——使用 `java.util.concurrent.CountDownLatch`。

Latch 的意思是门栓。`CountDownLatch` 的思想很简单：在收尾的位置增加一个带有计数器的“自动门栓”，当这个计数器的计数大于 0
时，阻塞“主”线程；计数减至（count down）0 的时候，就对“主”线程“放行”。这个类的 API 也非常简单：`countDown` 用来减计数，
`await` 用来设置门栓阻塞“主”线程。

现在，我们可以使用 `CountDownLatch` 和线程池来改写上面的代码了，如下：

[source,java]
----
var executors = Executors.newFixedThreadPool(10); // 给足够多的线程
for (var tasks : listOfTaskList) {
    System.out.println(">>> batch start <<<");
    var cd = new CountDownLatch(tasks.size());
    tasks.forEach(id -> executors.submit(() -> {
        sleep(id * 1000);
        System.out.println("Thread " + Thread.currentThread().getName() + " ends with " + id);
        cd.countDown(); // 执行完了之后，计数器减一
    }));
    cd.await(); // 阻塞当前线程，直到计数器减没了
    System.out.println(">>> batch end <<< ");
}
----

最后，如果不需要这个线程池了，记得要把它 `shutdown`。