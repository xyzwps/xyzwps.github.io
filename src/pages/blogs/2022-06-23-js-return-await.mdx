---
title: 记一个 JS return await 问题
comments: false
---

最开始的时候，我经常会写 `return await` 这样的代码，比如:

```js
async function foo() {
    return await bar();
}
```

后来某一天， eslint 提示这里的 `await` 可以省略掉，依据的是规则 [no-return-await](https://eslint.org/docs/rules/no-return-await)。我也没看这个规则的详细描述，想了想这么做确实是对的，确实能省下一些 CPU 开销。学了一手。

前几天，我写了一段下面那样的代码，意思是尝试执行 `doSomething` 3 次，如果有一次成功就返回，如果都失败则抛出最后一个错误：

```js
async function doSomething() {
  throw new Error('xxx');
}

async function doTry() {
  for (let i = 1; i <= 3; i++) {
    try {
      return doSomething();
    } catch (err) {
      if (i >= 3) throw err;
      else console.log('尝试失败');
    }
  }
}

doTry()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log('焯');
    process.exit(1);
  });
```

结果只输出了一个“焯”。

焯。

后来想了想，这段代码确实是写得不对。`return doSomething()` 这一句直接返回来了一个包着错误的 `Promise`，所以外面的 `try` 当然是啥都歘不到。只要改成 `return await doSomething()`，就可以正常重试了。

搞定之后，我回头看了看规则 [no-return-await](https://eslint.org/docs/rules/no-return-await) 的描述，发现人家已经预料到这种情况了。😂

