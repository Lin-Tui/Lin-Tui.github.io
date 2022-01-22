---
title: JS中的异步以及事件轮询机制
date: 1589505603472.269
tags:
- JavaScript
category:
- JavaScript学习笔记
---
## 1. JS为何是单线程的？

 JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。（在JAVA和c#中的异步均是通过多线程实现的，没有循环队列一说，直接在子线程中完成相关的操作）

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。

## 2. JS是单线程的，那么他是如何是实现异步操作的？

JS的异步是通过回调函数实现的，即通过任务队列，在主线程执行完当前的任务栈（所有的同步操作），主线程空闲后轮询任务队列，并将任务队列中的任务（回调函数）取出来执行。"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

虽然JS是单线程的但是浏览器的内核是多线程的，在浏览器的内核中不同的异步操作由不同的浏览器内核模块调度执行，异步操作会将相关回调添加到任务队列中。而不同的异步操作添加到任务队列的时机也不同，如 `onclick`, `setTimeout`, `ajax` 处理的方式都不同，这些异步操作是由浏览器内核的 webcore 来执行的，webcore 包含上图中的3种 webAPI，分别是 `DOM Binding`、`network`、`timer`模块。

* `onclick `由浏览器内核的 `DOM Binding` 模块来处理，当事件触发的时候，回调函数会立即添加到任务队列中。
* `setTimeout` 会由浏览器内核的 `timer` 模块来进行延时处理，当时间到达的时候，才会将回调函数添加到任务队列中。
* `ajax` 则会由浏览器内核的 `network `模块来处理，在网络请求完成返回之后，才将回调添加到任务队列中。

**JS中的异步运行机制**如下:  

* 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
* 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
* 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
* 主线程不断重复上面的第三步。

## 3. JS种事件队列的优先级

在JS中ES6 中新增的任务队列（promise）是在事件循环之上的，事件循环每次 tick 后会查看 ES6 的任务队列中是否有任务要执行，也就是 ES6 的任务队列比事件循环中的任务（事件）队列优先级更高。

如 Promise 就使用了 ES6 的任务队列特性。也即在执行完任务栈后首先执行的是任务队列中的promise任务。其他的上面常见的异步操作加入队列的时间没有相应的优先级。

```js
setTimeout(function(){console.log('111')},0);
new Promise(function(resolve,reject){
   console.log("2222");//此处还没有执行异步操作，执行异步操作及执行回调函数，在promise中即then中的回调
  resolve();
}).then(function(){console.log('3333')})
console.log("44444");
//输出
 2222
 44444//上面的两个输出属于同步操作
 3333//promise加入到队列的优先级高于setTimeout
 111
```

   同时在嵌套异步操作中，会将嵌套的异步加入到下次的任务队列中，以此类推（如嵌套的promise）。

```js
new Promise(function(resolve,reject){
  resolve();
}).then(function(){
    console.log("111");
    return new Promise(function(resolve,reject){
   resolve();
})
}).then(function(){ console.log("222");})

new Promise( function(resolve,reject){
    resolve();
}).then(function(){ console.log("33333");})//输出 111 33333 222
```