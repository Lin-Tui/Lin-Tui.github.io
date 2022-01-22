---
title: call  apply  bind 原理实现
date: 1588465684871.5774
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# **目录**

### [**1. call 的模拟实现**](#jump1)

### [**2. apply 的模拟实现**](#jump2)

### [**3. bind 的模拟实现**](#jump3)

### [**4. 三者异同**](#jump4)

<br />

**学习并参考于**：

[**JavaScript深入之call和apply的模拟实现**](https://juejin.im/post/5907eb99570c3500582ca23c)

[**JS的call,apply与bind详解，及其模拟实现**](https://zhuanlan.zhihu.com/p/80151192)

<br/>

# <span id="jump1">**（一）call的模拟实现**</span>

**call 用法** ： [**MDN  Function.prototype.call()**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

`call()` 方法使用一个指定的 `this` 值和可选的参数列表来调用一个函数。

`call()` 提供新的 **this** 值给当前调用的函数/方法。

#### **1. call 实现主要思路**：

* 将函数设为对象的属性

* 执行该函数

* 删除该函数

另外还有考虑：

* call 函数还能给定参数执行函数
* this 参数不传，或者传null，undefined， this指向window对象
* 函数是可以有返回值的

#### **2. 实现**：

```js
Function.prototype.myCall = function () {
  if (typeof this !== 'function') {
    throw new TypeError('error!')
  }
  let context = arguments[0] || window   //this 参数可以传 null，当为 null 的时候，视为指向 window
  context.fn = this  // 首先要获取调用call的函数，用this可以获取
  let args = [...arguments].slice(1) //从 Arguments 对象中取值，取出第二个到最后一个参数   
  let result = context.fn(...args)  //函数是可以有返回值的
  delete context.fn
  return result
}
```

#### **3. 测试**：

```js
// 测试一下上面实现的myCall
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call(null); // 2

console.log(bar.myCall(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

# <span id="jump2">**（二）apply 的模拟实现**</span>

**apply 用法**：[**MDN Function.prototype.apply()**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

`apply()` 方法使用一个指定的 `this` 值和可选的参数数组 来调用一个函数。

apply 的实现跟 call 类似。

#### **1. 实现**：

```js
Function.prototype.myApply = function () {
  if (typeof this !== 'function') {
    throw new TypeError('error!')
  }
  let context = arguments[0] || window
  context.fn = this
  let result = arguments[1] ? context.fn(...arguments[1]) : context.fn()
  delete context.fn
  return result
}
```

#### **2. 测试**：

```js
var foo = {
    value: 1
}
function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}
bar.myApply(foo, ['black', '18']) // black 18 1
```

# <span id="jump3">**（三）bind 的模拟实现**</span>

**bind 用法**：[**MDN Function.prototype.bind()**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

bind()方法会创建一个新函数，称为绑定函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

bind是ES5新增的一个方法，不会执行对应的函数，而是返回对绑定函数的引用。

#### **1. 实现**：

```js
Function.prototype.customBind = function () {
  if (typeof this !== 'function') {
    throw new TypeError('error!')
  }
  const that = this   // 首先要获取调用bind的函数，用this获取并存放在that中
  let context = arguments[0] || window
  const args = [...arguments].slice(1)
  return function() {
    return that.apply(context, args.concat([...arguments]))
  }
}
```

# <span id="jump4">**（四）三者异同**</span>

#### **1. 相同**：

- 改变函数体内 this 的指向

#### **2. 不同**：

- call、apply的区别：`call()`方法接受的是**参数列表**，而`apply()`方法接受的是**一个参数数组**。
- bind不立即执行。而call或apply会自动执行对应的函数。











































