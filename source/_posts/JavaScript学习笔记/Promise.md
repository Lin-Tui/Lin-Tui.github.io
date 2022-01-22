---
title: Promise
date: 1588318250446.7017
tags:
- JavaScript
category:
- JavaScript学习笔记
---
## 目录

#### [**1. `Promise` 基本结构**](#jumpa)

#### [**2. `Promise` 状态和值**](#jumpb)

#### [**3. `Promise` 的 `then` 方法**](#jumpc)

#### [**4. `Promise`基本实现**](#jumpd)

#### [**5. `Promise`零碎知识**](#jumpe)



**学习`Promise` 用法  见** ：[**MDN Promise**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

**学习Promise底层实现  见**：[**Promise实现原理（附源码）**](https://www.jianshu.com/p/43de678e918a) （本文学习并参考的一篇博客，推荐直接阅读）

**其他推荐**：[**Promise简单实现**](https://www.jianshu.com/p/473cd754311f/)

# <span id="jumpa">**（一）`Promise` 基本结构**</span>

`Promise` 是一种抽象异步处理对象，其核心概念为 “确保一件事做完之后，再做另一件事”

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('FULFILLED')
  }, 1000)
})
```

构造函数`Promise`必须接受一个函数作为参数，称该函数为`handle`，`handle`又包含`resolve`和`reject`两个参数，它们是两个函数。

# <span id="jumpb">**（二） `Promise` 状态和值**</span>

`Promise` 对象存在以下**三种状态**：

- **`Pending`**  (进行中)
- **`Fulfilled`**  (已成功)
- **`Rejected`  **（已失败)

状态只能由 `Pending` 变为 `Fulfilled` 或由 `Pending` 变为 `Rejected` ，且状态改变之后不会在发生变化，会一直保持这个状态。

`Promise`的值是指状态改变时传递给回调函数的值.

上文中`handle`函数包含 `resolve` 和 `reject` 两个参数，它们是两个函数，可以用于改变 `Promise` 的状态和传入 `Promise` 的值。

-  **`resolve`** : 将Promise对象的状态从 `Pending`(进行中) 变为 `Fulfilled`(已成功)`
-  **`reject`** : 将Promise对象的状态从 `Pending`(进行中) 变为 `Rejected`(已失败)`
-  **`resolve`** ：和 `reject` 都可以传入任意类型的值作为实参，表示 `Promise` 对象成功`（Fulfilled）`和失败`（Rejected）`的值

在Promise构造函数`handle`中可以执行一些处理（可以是异步处理），如果执行结果正常则调用resolve回调函数，否则调用reject回调函数。在ES6中将“执行结果正常” 称为Promise对象返回肯定结果，将 “执行失败” 称为Promise对象返回否定结果。

# <span id="jumpc">**（三）`Promise` 的 `then` 方法**</span>

```js
promise.then(onFulfilled, onRejected)
```

`Promise` 对象的 `then` 方法接受两个参数，`onFulfilled` 和 `onRejected` 都是可选参数。

**多次调用**： `then` 方法可以被同一个 `promise` 对象调用多次

- 当 `promise` 成功状态时，所有 `onFulfilled` 需按照其注册顺序依次回调
- 当 `promise` 失败状态时，所有 `onRejected` 需按照其注册顺序依次回调

**返回**：`then` 方法必须返回一个新的 `promise` 对象

```javascript
promise2 = promise1.then(onFulfilled, onRejected);
```

因此 `promise` 支持链式调用

```javascript
promise1.then(onFulfilled1, onRejected1).then(onFulfilled2, onRejected2);
```

### **1. `onFulfilled` 特性**

 **（1）`onFulfilled` 不是函数时**：

*  `onFulfilled` 将被忽略。

* `onFulfilled` 不是函数且 `promise1` 状态为成功`（Fulfilled）`时， `promise2` 必须变为成功`（Fulfilled）`并返回 `promise1` 成功的值。

  ```js
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
  promise2 = promise1.then('这里的onFulfilled本来是一个函数，但现在不是')
  promise2.then(res => {
    console.log(res) // 1秒后打印出：success
  }, err => {
    console.log(err)
  })
  ```

 **（2）`onFulfilled` 是函数时**：

- 当 `promise` 状态变为成功时必须被调用，其第一个参数为 `promise` 成功状态传入的值（ `resolve` 执行时传入的值）
- 在 `promise` 状态改变前其不可被调用
- 其调用次数不可超过一次

* 如果 `onFulfilled`  返回一个值 `x` ，则运行下面的 `Promise` 解决过程：`[[Resolve]](promise2, x)`

  * 若 `x` 不为 `Promise` ，则使 `x` 直接作为新返回的 `Promise` 对象的值， 即新的`onFulfilled` 或者 `onRejected` 函数的参数.

  * 若 `x` 为 `Promise` ，这时后一个回调函数，就会等待该 `Promise` 对象(即 `x` )的状态发生变化，才会被调用，并且新的 `Promise` 状态和 `x` 的状态相同。

  ```js
  // 当onFulfilled返回值不为Promise：
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  promise2 = promise1.then(res => {
    // 返回一个普通值
    return '这里返回一个普通值'
  })
  promise2.then(res => {
    console.log(res) //1秒后打印出：这里返回一个普通值
  })
  
  // 当onFulfilled返回值为Promise：
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  promise2 = promise1.then(res => {
    // 返回一个Promise对象
    return new Promise((resolve, reject) => {
      setTimeout(() => {
       resolve('这里返回一个Promise')
      }, 2000)
    })
  })
  promise2.then(res => {
    console.log(res) //3秒后打印出：这里返回一个Promise
  })
  ```

* 如果 `onFulfilled` 抛出一个异常 `e` ，则 `promise2` 必须变为失败`（Rejected）`，并返回失败的值 `e`

  ```js
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
  promise2 = promise1.then(res => {
    throw new Error('这里抛出一个异常e')
  })
  promise2.then(res => {
    console.log(res)
  }, err => {
    console.log(err) //1秒后打印出：这里抛出一个异常e
  })
  ```

### **2. `onRejected` 特性**

 **（1）`onRejected` 不是函数时**：

* `onRejected` 将被忽略。

*  `onRejected` 不是函数且 `promise1` 状态为失败`（Rejected）`，`promise2`必须变为失败`（Rejected）` 并返回 `promise1` 失败的值。

  ```js
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('fail')
    }, 1000)
  })
  promise2 = promise1.then(res => res, '这里的onRejected本来是一个函数，但现在不是')
  promise2.then(res => {
    console.log(res)
  }, err => {
    console.log(err)  // 1秒后打印出：fail
  })
  ```

  **（2）`onRejected` 是函数：**

- 当 `promise` 状态变为失败时必须被调用，其第一个参数为 `promise` 失败状态传入的值（ `reject` 执行时传入的值）
- 在 `promise` 状态改变前其不可被调用
- 其调用次数不可超过一次

* 如果`onRejected` 返回一个值 `x` ，则运行下面的 `Promise` 解决过程：`[[Resolve]](promise2, x)`

  * 若 `x` 不为 `Promise` ，则使 `x` 直接作为新返回的 `Promise` 对象的值， 即新的`onFulfilled` 或者 `onRejected` 函数的参数.

  * 若 `x` 为 `Promise` ，这时后一个回调函数，就会等待该 `Promise` 对象(即 `x` )的状态发生变化，才会被调用，并且新的 `Promise` 状态和 `x` 的状态相同。

* 如果`onRejected` 抛出一个异常 `e` ，则 `promise2` 必须变为失败`（Rejected）`，并返回失败的值 `e`

# <span id="jumpd">**（四）`Promise`基本实现**</span>

下面代码仅实现`Promise`中`resolve`、`reject`、`then`方法。

```js
// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

//定义一个名为 MyPromise 的 Class，它接受一个函数 handle 作为参数
class MyPromise {
    constructor (handle) {
      if (!isFunction(handle)) {
        throw new Error('MyPromise must accept a function as a parameter')
      }
      // 添加状态
      this._status = PENDING
      // 添加状态
      this._value = undefined
      // 添加成功回调函数队列
      this._fulfilledQueues = []
      // 添加失败回调函数队列
      this._rejectedQueues = []
      // 执行handle
      try {
        handle(this._resolve.bind(this), this._reject.bind(this)) 
      } catch (err) {
        this._reject(err)
      }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
      if (this._status !== PENDING) return
      // 依次执行成功队列中的函数，并清空队列
      const run = () => {
        this._status = FULFILLED
        this._value = val
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(val)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(() => run(), 0)
    }
	// 添加reject时执行的函数
	_reject (err) { 
	  if (this._status !== PENDING) return
	  // 依次执行失败队列中的函数，并清空队列
	  const run = () => {
	    this._status = REJECTED
	    this._value = err
	    let cb;
	    while (cb = this._rejectedQueues.shift()) {
	      cb(err)
	    }
	  }
	  // 为了支持同步的Promise，这里采用异步调用
	  setTimeout(run, 0)
	}
  // 添加then方法
	then (onFulfilled, onRejected) {
	  const { _value, _status } = this
	  // 返回一个新的Promise对象
	  return new MyPromise((onFulfilledNext, onRejectedNext) => {
	    // 封装一个成功时执行的函数
	    let fulfilled = value => {
	      try {
	        if (!isFunction(onFulfilled)) {
	          onFulfilledNext(value)
	        } else {
	          let res =  onFulfilled(value);
	          if (res instanceof MyPromise) {
	            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	            res.then(onFulfilledNext, onRejectedNext)
	          } else {
	            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
	            onFulfilledNext(res)
	          }
	        }
	      } catch (err) {
	        // 如果函数执行出错，新的Promise对象的状态为失败
	        onRejectedNext(err)
	      }
	    }
	    // 封装一个失败时执行的函数
	    let rejected = error => {
	      try {
	        if (!isFunction(onRejected)) {
	          onRejectedNext(error)
	        } else {
	            let res = onRejected(error);
	            if (res instanceof MyPromise) {
	              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
	              res.then(onFulfilledNext, onRejectedNext)
	            } else {
	              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
	              onFulfilledNext(res)
	            }
	        }
	      } catch (err) {
	        // 如果函数执行出错，新的Promise对象的状态为失败
	        onRejectedNext(err)
	      }
	    }
	    switch (_status) {
	      // 当状态为pending时，将then方法回调函数加入执行队列等待执行
	      case PENDING:
	        this._fulfilledQueues.push(fulfilled)
	        this._rejectedQueues.push(rejected)
	        break
	      // 当状态已经改变时，立即执行对应的回调函数
	      case FULFILLED:
	        fulfilled(_value)
	        break
	      case REJECTED:
	        rejected(_value)
	        break
	    }
	  })
	}

}
```

# <span id="jumpe">**（五）零碎知识**</span>

### **Promise类的all方法**

- Promise类的all方法可以并行执行多个异步处理。
- Promise.all方法以一个**Promise对象数组**作为参数，并创建一个当所有执行结果都成功时返回肯定结果的Promise对象。在该对象的then方法中可以得到一个结果数组result，无论该对象的肯定结果为何，该结果数组与传入的Promise对象数组顺序保持一致。

