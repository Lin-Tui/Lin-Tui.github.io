---
title: Js运行机制
date: 1580699060534.0828
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# Js运行机制

### 1.基础知识

- JavaScript 是一门**单线程**语言，在最新的HTML5 中提出了Web-Worker，但JavaScript 是单线程这一核心仍未改变。

- Js 作为浏览器脚本语言，它的主要用途是与用户互动，以及操作DOM，因此Js是单线程，也避免了同时操作同一个DOM的矛盾问题；

- 为了利用多核CPU的计算能力，H5的Web Worker实现的“多线程”实际上指的是“多子线程”，完全受控于主线程，且不允许操作DOM；

- 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）；

- 如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行；

### 2.Js中的异步操作

- setTimeOut
- setInterval
- ajax
- promise
- I/O

### 3.同步任务 or 异步任务

- 同步任务(synchronous)：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
- 异步任务(asynchronous)：不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

### 4.宏任务 or 微任务

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

- 宏任务(macro-task)：整体代码script、setTimeOut、setInterval
- 微任务(mincro-task)：promise.then、promise.nextTick(node)

### 5.JavaScript事件循环
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203155133427.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

导图要表达的内容用文字来表述的话：

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
- 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
- Js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。上述过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

### 6. setTimeout

- ```
  setTimeout(() => {
      task();
  },3000)
  console.log('执行console');
  ```

  `setTimeout`是异步的，上面代码先执行`console.log`这个同步任务，再执行task()。

- ```
  setTimeout(() => {
      task()
  },3000)
  
  sleep(10000000)
  ```

  上面代码执行`task()`需要的时间远远超过3秒，说好的延时三秒，为啥现在需要这么长时间啊？

  我们先说上述代码是怎么执行的：

  1. `task()`进入Event Table并注册,计时开始。
  2. 执行`sleep`函数，很慢，非常慢，计时仍在继续。
  3. 3秒到了，计时事件`timeout`完成，`task()`进入Event Queue，但是`sleep`也太慢了吧，还没执行完，只好等着。
  4. `sleep`终于执行完了，`task()`终于从Event Queue进入了主线程执行。

  

  **`setTimeout`这个函数，是经过指定时间后，把要执行的任务**(本例中为`task()`)**加入到Event Queue中。**又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间远远大于3秒。

  我们还经常遇到`setTimeout(fn,0)`这样的代码，0秒后执行又是什么意思呢？是不是可以立即执行呢？

  答案是不会的，`setTimeout(fn,0)`的含义是，指定某个任务在主线程最早可得的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。

### 7. setInterval

- 对于执行顺序来说，`setInterval`会每隔指定的时间将注册的函数置入Event Queue，如果前面的任务耗时太久，那么同样需要等待。

- 注意的是，对于`setInterval(fn,ms)`来说，我们已经知道不是每过`ms`秒会执行一次`fn`，而是每过`ms`秒，会有`fn`进入Event Queue。一旦**setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了**。

### 8. Promise与process.nextTick(callback)

- new Promise是会进入到主线程中立刻执行，而promise.then则属于微任务。

- `process.nextTick(callback)`类似node.js版的"setTimeout"，在事件循环的下一次循环中调用 callback 回调函数。

### 9. 事件循环的顺序

事件循环的顺序，决定Js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

- #### 事件循环，宏任务，微任务的关系如图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020020315511331.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
- #### **例子1**：

  ```
  setTimeout(function() {
      console.log('setTimeout');
  })
  
  new Promise(function(resolve) {
      console.log('promise');
  }).then(function() {
      console.log('then');
  })
  
  console.log('console');
  ```

  1. 这段代码作为宏任务，进入主线程。
  2. 先遇到`setTimeout`，那么将其回调函数注册后分发到宏任务Event Queue。(注册过程与上同，下文不再描述)
  3. 接下来遇到了`Promise`，`new Promise`立即执行，`then`函数分发到微任务Event Queue。
  4. 遇到`console.log()`，立即执行。
  5. 好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了`then`在微任务Event Queue里面，执行。
  6. ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中`setTimeout`对应的回调函数，立即执行。
  7. 结束。

- #### **例子2**：

  ```
  console.log('1');
  
  setTimeout(function() {
      console.log('2');
      process.nextTick(function() {
          console.log('3');
      })
      new Promise(function(resolve) {
          console.log('4');
          resolve();
      }).then(function() {
          console.log('5')
      })
  })
  process.nextTick(function() {
      console.log('6');
  })
  new Promise(function(resolve) {
      console.log('7');
      resolve();
  }).then(function() {
      console.log('8')
  })
  
  setTimeout(function() {
      console.log('9');
      process.nextTick(function() {
          console.log('10');
      })
      new Promise(function(resolve) {
          console.log('11');
          resolve();
      }).then(function() {
          console.log('12')
      })
  })
  ```

  **第一轮事件循环流程分析如下**：

  1. 整体script作为第一个宏任务进入主线程，遇到`console.log`，输出1。
  2. 遇到`setTimeout`，其回调函数被分发到宏任务Event Queue中。我们暂且记为`setTimeout1`。
  3. 遇到`process.nextTick()`，其回调函数被分发到微任务Event Queue中。我们记为`process1`。
  4. 遇到`Promise`，`new Promise`直接执行，输出7。`then`被分发到微任务Event Queue中。我们记为`then1`。
  5. 又遇到了`setTimeout`，其回调函数被分发到宏任务Event Queue中，我们记为`setTimeout2`。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203155045497.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
  6. 上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。
  7. 我们发现了`process1`和`then1`两个微任务。
  8. 执行`process1`,输出6。
  9. 执行`then1`，输出8。
  10. 第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。

  **那么第二轮事件循环从`setTimeout1`宏任务开始：**

  1. 首先输出2。接下来遇到了`process.nextTick()`，同样将其分发到微任务Event Queue中，记为`process2`。`new Promise`立即执行输出4，`then`也分发到微任务Event Queue中，记为`then2`。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203155009321.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
  2. 第二轮事件循环宏任务结束，我们发现有`process2`和`then2`两个微任务可以执行。

  3. 输出3。

  4. 输出5。
  5. 第二轮事件循环结束，第二轮输出2，4，3，5。

  **第三轮事件循环开始：**

  1. 此时只剩setTimeout2了，执行。直接输出9。
  2. 将`process.nextTick()`分发到微任务Event Queue中。记为`process3`。
  3. 直接执行`new Promise`，输出11。
  4. 将`then`分发到微任务Event Queue中，记为`then3`。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203154824999.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

  6. 第三轮事件循环宏任务执行结束，执行两个微任务`process3`和`then3`。

  7. 输出10。

  8. 输出12。

  9. 第三轮事件循环结束，第三轮输出9，11，10，12。



  **整段代码，共进行了三次事件循环**完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。
  (请注意，node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差)



### 10. 最后

- ###### 事件循环Event Loop是js实现异步的一种方法，也是js的执行机制。

- ###### javascript的执行和运行有很大的区别，javascript在不同的环境下，比如node，浏览器，Ringo等等，执行方式是不同的。而运行大多指javascript解析引擎，是统一的。

- ###### 微任务和宏任务还有很多种类，比如`setImmediate`等等，执行都是有共同点的，有兴趣的同学可以自行了解。

参考：[link](https://juejin.im/post/59e85eebf265da430d571f89#heading-9)