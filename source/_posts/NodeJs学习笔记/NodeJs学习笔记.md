---
title: NodeJs学习笔记
date: 1588494614023.5945
tags:
- NodeJs
category:
-  NodeJs学习笔记
---

### NodeJs概念：

Node.js 就是运行在服务端的 JavaScript。

Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

### NodeJs特点：

- 它是一个Javascript运行环境
- 依赖于Chrome V8引擎进行代码解释
- 事件驱动
- 非阻塞I/O
- 轻量、可伸缩，适于实时数据交互应用
- 单进程，单线程

### NodeJs的优缺点：

**优点**：

- 高并发；
- 适合I/O密集型应用。

**缺点**：

- 不适合CPU密集型应用，只支持单核CPU，不能充分利用CPU；
- 单进程，单线程，一旦代码某处出现bug，整个系统都崩溃；

### V8 JavaScript 引擎

V8 是为 Google Chrome 提供支持的 JavaScript 引擎的名称。 当使用 Chrome 进行浏览时，它负责处理并执行 JavaScript。

V8 提供了执行 JavaScript 的运行时环境。 DOM 和其他 Web 平台 API 则由浏览器提供。

JavaScript 引擎独立于托管它的浏览器。 此关键的特性推动了 Node.js 的兴起。 V8 于 2009 年被选为为 Node.js 提供支持的引擎，并且随着 Node.js 的爆炸性发展，V8 成为了现在为大量的服务器端代码（使用 JavaScript 编写）提供支持的引擎。

### Node.js REPL(交互式解释器)

Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

Node 自带了交互式解释器，可以执行以下任务：

- **读取** - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
- **执行** - 执行输入的数据结构
- **打印** - 输出结果
- **循环** - 循环操作以上步骤直到用户两次按下 **ctrl-c** 按钮退出。

Node 的交互式解释器可以很好的调试 Javascript 代码。













### NodeJs事件循环机制和浏览器事件循环机制的区别

[浏览器端与nodejs端EventLoop机制(宏任务与微任务)的异同](https://blog.csdn.net/qq_39989929/article/details/89109937)

[JS异步详解 - 浏览器/Node/事件循环/消息队列/宏任务/微任务](https://segmentfault.com/a/1190000018951319)

[浏览器端时间循环与nodejs端时间循环的不同之处（宏任务与微任务）](http://www.manongjc.com/article/105408.html)