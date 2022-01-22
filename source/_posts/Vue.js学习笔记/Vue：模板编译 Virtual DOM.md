---
title: Vue：模板编译 Virtual DOM
date: 1587105716679.2722
tags:
- Vue
category:
- Vue学习笔记
---
## （一）Vue模板编译

在Vue中我们有三种方式来创建HTML

- 模板
- 手动写渲染函数
- JSX

渲染函数是最原始的方法，而模板最终会通过编译转换陈渲染函数。渲染函数执行后，会得到一份vnode用来渲染真实DOM。所以，模板编译其实是配合虚拟DOM进行渲染。

#### 1. 什么是模板编译？

所谓模板编译就是把模板编译成vnode的渲染函数。

#### 2. 模板编译过程：

模板编译可以分为三个阶段：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200419204823902.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)


- 将模板解析为AST（抽象语法树）—— 解析器

- 遍历AST，对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化 —— 优化器

- 使用AST生成render函数代码字符串—— 代码生成器

关于模板编译的源码可以在`vue-template-compiler`包中查看。

## （二）Vue虚拟DOM

#### 1. Virtual DOM

**概念：**

 Virtual DOM是一个能够直接描述一段HTML DOM结构的JavaScript对象，浏览器可以根据它的结构按照一定规则创建出确定唯一的HTML DOM结构。

**实现原理：**

Virtual DOM模式来控制页面DOM结构更新的过程：创建原始页面或组件的Virtual DOM结构，用户操作后需要进行DOM更新时，生成用户操作后页面或组件的Virtual DOM结构并与之前的结构进行比对，找到最小变化Virtual DOM的差异化描述对象，最后把差异化的Virtual DOM根据特定的规则渲染到页面上。

 所以核心操作可以抽象成三个步骤：

- 创建Virtual DOM
- 对比两个Virtual DOM生成差异化Virtual DOM
- 将差异化Virtual DOM渲染到页面上

**优势：**

Virtual DOM的交互模式减少了MVVM或其他框架中对DOM的扫描和操作次数，并且在数据发生改变后只在合适的地方根据JavaScript对象来进行最小化的页面DOM操作，避免大量重新渲染。

Virtual DOM交互模式的优势 与以前交互模式相比，Virtual DOM最本质的区别在于减少了对DOM对象的操作，通过JavaScript 对象来代替DOM对象树，并且在页面结构改变进行最小代价的DOM渲染操作，提高了交互的性能和效率。这也是提高前端交互性能的根本原因。

#### 2. Vue实现虚拟DOM原理

**Vue具体如何实现虚拟DOM**（待更新...）

**vue2为什么要引入虚拟Dom，谈谈对虚拟Dom的理解？**

- 随着现代应用对页面的功能要求越复杂，管理的状态越多，如果还是使用之前的`JavaScript`线程去频繁操作`GUI`线程的硕大`Dom`，对性能会有很大的损耗，而且也会造成状态难以管理，逻辑混乱等情况。引入虚拟`Dom`后，在框架的内部就将虚拟`Dom`树形结构与真实`Dom`做了映射，让我们不用在命令式的去操作`Dom`，可以将重心转为去维护这棵树形结构内的状态即可，状态的变化就会驱动`Dom`发生改变，具体的`Dom`操作`vue`帮我们完成，而且这些大部分可以在`JavaScript`线程完成，性能更高。
- 虚拟`Dom`只是一种数据结构，可以让它不仅仅使用在浏览器环境，还可以用与`SSR`以及`Weex`等场景。

## （三）模板转换成视图的过程

Vue.js通过编译将template 模板转换成渲染函数(render ) ，执行渲染函数就可以得到一个虚拟节点树

在对 Model 进行操作的时候，会触发对应 Dep 中的 Watcher 对象。Watcher 对象会调用对应的 update 来修改视图。这个过程主要是将新旧虚拟节点进行差异对比，然后根据对比结果进行DOM操作来更新视图。

简单点讲，在Vue的底层实现上，Vue将模板编译成虚拟DOM渲染函数。结合Vue自带的响应系统，在状态改变时，Vue能够智能地计算出重新渲染组件的最小代价并应到DOM操作上。

我们先对上图几个概念加以解释:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200419204951458.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
- **渲染函数**：渲染函数是用来生成Virtual DOM的。Vue推荐使用模板来构建我们的应用界面，在底层实现中Vue会将模板编译成渲染函数，当然我们也可以不写模板，直接写渲染函数，以获得更好的控制。
- **VNode 虚拟节点**：它可以代表一个真实的 dom 节点。通过 createElement 方法能将 VNode 渲染成 dom 节点。简单地说，vnode可以理解成**节点描述对象**，它描述了应该怎样去创建真实的DOM节点。
- **patch(也叫做patching算法)**：虚拟DOM最核心的部分，它可以将vnode渲染成真实的DOM，这个过程是对比新旧虚拟节点之间有哪些不同，然后根据对比结果找出需要更新的的节点进行更新。这点我们从单词含义就可以看出， patch本身就有补丁、修补的意思，其实际作用是在现有DOM上进行修改来实现更新视图的目的。Vue的Virtual DOM Patching算法是基于**Snabbdom**的实现，并在些基础上作了很多的调整和改进。

**附上 Vue2.0 模板渲染过程：**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200419204756531.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)

此文是对网上查找的资料的总结与笔记，由于还未深入源码，所以对Vue模板编译的具体过程还有疑惑。

**疑惑**：

- 到底在什么时候进行模板编译？

  我觉得，Vue官方的Vue生命周期图和上面的模板渲染过程有些出入，加上网上博客说法不一，实在是困惑。

- 静态模板 、动态模板是什么？
- 模板渲染 、模板编译具体区别？