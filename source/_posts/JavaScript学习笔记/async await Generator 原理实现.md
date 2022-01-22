---
title: async await Generator 原理实现
date: 1588390751284.0146
tags:
- JavaScript
category:
- JavaScript学习笔记
---
## 目录

#### [1. async  await](#jump1)

#### [2. Generator](#jump2)

#### [3. async await 和 Generator 区别](#jump3)

<br/>

本文主要是学习：[**异步编程二三事 | Promise/async/Generator实现原理解析**](https://msd.misuland.com/pd/4146263433584579672?page=1) 中一部分内容的学习笔记，（强烈推荐阅读原本）

<br/>

# <span id="jump1">**（一）async await**</span>

在多个回调依赖的场景中，尽管Promise通过链式调用取代了回调嵌套，但过多的链式调用可读性仍然不佳，流程控制也不方便，ES7 提出的async 函数，终于让 JS 对于异步操作有了终极解决方案，简洁优美地解决了以上两个问题。

async/await 两个关键字均用来实现异步处理，使用这两个关键字，可以书写比Promise更为简洁的异步处理代码。async函数可以返回Promise，当函数返回值时，Promise返回肯定结果，当async函数抛出异常时，Promise返回否定结果。

async/await实际上是对Generator（生成器）的封装，是一个语法糖。

### 1. 自动执行

初步实现了一个`async/await`：

```js
function* myGenerator() {
  console.log(yield Promise.resolve(1))   //1
  console.log(yield Promise.resolve(2))   //2
  console.log(yield Promise.resolve(3))   //3
}

function run(myGenerator) {
	var g = gen(); //由于每次gen()获取到的都是最新的迭代器,因此获取迭代器操作要放在step()之前,否则会进入死循环

	function step(val) {  //封装一个方法, 递归执行next()
		var res = g.next(val)  //获取迭代器对象，并返回resolve的值
		if (res.done) return res.value; //递归终止条件
		res.value.then(val => {  //Promise的then方法是实现自动迭代的前提
			step(val)   //等待Promise完成就自动执行下一个next，并传入resolve的值
		})
	}

	step(); //第一次执行
}
```

### 2.返回Promise & 异常处理

上面实现了Generator的自动执行以及让yield返回resolve的值，但上边的代码还存在着几点问题：

- **需要兼容基本类型**：这段代码能自动执行的前提是`yield`后面跟Promise，为了兼容后面跟着基本类型值的情况，我们需要把yield跟的内容(`gen().next.value`)都用`Promise.resolve()`转化一遍
- **缺少错误处理**：上边代码里的Promise如果执行失败，就会导致后续执行直接中断，我们需要通过调用`Generator.prototype.throw()`，把错误抛出来，才能被外层的try-catch捕获到
- **返回值是Promise**：`async/await`的返回值是一个Promise，我们这里也需要保持一致，给返回值包一个Promise

我们改造一下run方法：

```js
function run(gen) {
  //把返回值包装成promise
  return new Promise((resolve, reject) => {
    var g = gen()

    function step(val) {
      //错误处理
      try {
        var res = g.next(val) 
      } catch(err) {
        return reject(err); 
      }
      if(res.done) {
        return resolve(res.value);
      }
      //res.value包装为promise，以兼容yield后面跟基本类型的情况
      Promise.resolve(res.value).then(
        val => {
          step(val);
        }, 
        err => {
          //抛出错误
          g.throw(err)
        });
    }
    step();
  });
}
```

可以测试一下：

```js
function* myGenerator() {
  try {
    console.log(yield Promise.resolve(1)) 
    console.log(yield 2)   //2
    console.log(yield Promise.reject('error'))
  } catch (error) {
    console.log(error)
  }
}

const result = run(myGenerator)     //result是一个Promise
//输出 1 2 error
```

# <span id="jump2">**（二）Generator**</span>

```js
// 生成器函数根据yield语句将代码分割为switch-case块，后续通过切换_context.prev和_context.next来分别执行各个case
function gen$(_context) {
  while (1) {
    switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return 'result1';

      case 2:
        _context.next = 4;
        return 'result2';

      case 4:
        _context.next = 6;
        return 'result3';

      case 6:
      case "end":
        return _context.stop();
    }
  }
}

// 低配版context  
var context = {
  next:0,
  prev: 0,
  done: false,
  stop: function stop () {
    this.done = true
  }
}

// 低配版invoke
let gen = function() {
  return {
    next: function() {
      value = context.done ? undefined: gen$(context)
      done = context.done
      return {
        value,
        done
      }
    }
  }
} 

// 测试使用
var g = gen() 
g.next()  // {value: "result1", done: false}
g.next()  // {value: "result2", done: false}
g.next()  // {value: "result3", done: false}
g.next()  // {value: undefined, done: true}
```

这段代码并不难理解，我们分析一下调用流程：

我们定义的`function*`生成器函数被转化为以上代码

1. 转化后的代码分为三大块：
   - `gen$(_context)`由yield分割生成器函数代码而来
   - `context对象`用于储存函数执行上下文
   - `invoke()方法`定义next()，用于执行gen$(_context)来跳到下一步
2. 当我们调用`g.next()`，就相当于调用`invoke()方法`，执行`gen$(_context)`，进入switch语句，switch根据context的标识，执行对应的case块，return对应结果
3. 当生成器函数运行到末尾（没有下一个yield或已经return），switch匹配不到对应代码块，就会return空值，这时`g.next()`返回`{value: undefined, done: true}`

从中我们可以看出，Generator实现的核心在于`上下文的保存`，函数并没有真的被挂起，每一次yield，其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个context对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样

# <span id="jump3">**（一）async await 和 Generator 区别**</span>

`async/await`实际上是对`Generator`（生成器）的封装，`async`函数是`Generator`函数的语法糖，将`Generator`的星号换成`async`，将`yield`换成`await`，`async`函数比`Generator`函数更好用.

`Generator`与`async function`都是返回一个特定类型的对象：

- `async/await`自带执行器，不需要手动调用next()就能自动执行下一步
- `async`始终返回一个`Promise`，使用`await`或者`.then()`来获取返回值，而Generator返回的是生成器对象，一个类似`{ value: XXX, done: true }`这样结构的`Object`
- `await`能够返回Promise的resolve/reject的值













