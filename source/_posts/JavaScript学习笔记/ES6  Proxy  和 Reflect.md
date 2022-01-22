---
title: ES6  Proxy  和 Reflect
date: 1584766887282.0076
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# ES6  Proxy 和 Reflect

## （一）Reflect

#### Reflect是什么？

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与[proxy handlers](https://wiki.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。

与大多数全局对象不同，`Reflect`不是一个构造函数。你不能将其与一个[new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)一起使用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像[`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)对象）。

#### 为什么要使用Reflect？

* **更加有用的返回值：**
* **函数操作**
* **更加可靠的函数式执行方式**
* **可变参数形式的构造函数**

* **控制访问器或者读取器的this**
* **避免直接访问 `__proto__`**

**详细见**：

[MDN Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

[ES6新特性：Javascript中的Reflect对象](https://www.cnblogs.com/diligenceday/p/5474126.html)

## （二）Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

**语法：**

```js
let p = new Proxy(target, handler);
```

**参数：**

- `target`

  用`Proxy`包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

- `handler`

  一个对象，其属性是当执行一个操作时定义代理的行为的函数。

**方法：**

[`Proxy.revocable()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable) ：创建一个可撤销的`Proxy`对象。允许的属性一共 13 种，与 `Reflect` 的方法名一致

**handler对象的方法：**

[阮一峰 Proxy](https://es6.ruanyifeng.com/#docs/proxy)

[MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

**示例：**

[使用 Javascript 原生的 Proxy 优化应用](https://juejin.im/post/5a3cb0846fb9a044fb07f36c)