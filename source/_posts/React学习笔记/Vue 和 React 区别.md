---
title: Vue 和 React 区别
date: 1597891733691.3894
tags:
- React
category:
- React学习笔记
---
## 一. 区别点：

* **Templating vs JSX**

react的思路是all in js，通过js来生成html， 所以设计了jsx，还有通过js来操作css，社区的styled-component、jss等

vue是把html，css，js组合到一起，用各自的处理方式，vue有单文件组件， 可以把html、css、js写到一个文件中，html提供了模板引擎来处理

react渲染是使用jsx，用js来操作html，列表渲染、条件判断等都通过js来控制，而vue提供了模板的语法，支持指令、过滤器等模板功能，简化了渲染逻辑。在react组件里需要写大段js才能描述清楚的逻辑，使用vue的模板可以很简洁紧凑的表明。

*  **单向绑定 vs 双向绑定**

单双向绑定，指的是View层和Model层之间的映射关系。

双向绑定是在同一个组件内，将数据和视图绑定起来，和父子组件之间的通信并无什么关联；

React采用单向绑定，如图所示：
       ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200820105639128.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)



用户访问View，用户发出交互到Actions中进行处理，Actions中通过setState对State进行更新，可以看出，View层不能直接修改State，必须要通过Actions来进行操作，这样更加清晰可控。

而Vue支持单向绑定和双向绑定：

单向绑定：插值形式{{data}}， v-bind也是单向绑定。

双向绑定：表单v-model，用户对view层的更改会直接同步到model层。（实际上v-model只是v-bind:value 和 v-on:input的语法糖）

* **框架本质不同**

Vue是MVVM模式的一种方式实现。但没有完全遵循 MVVM 模型。

React是前端组件化框架，是严格的view层，MVC模式。由后端组件化发展而来。

*  **状态管理**

应用中的状态是React关键的概念，也有一些配套框架被设计为管理一个大的state对象，如Redux。state对象在react应用中是不可变的，需要使用setState()方法更新状态。在Vue中，state对象并不是必须的，数据由data属性在Vue对象中进行管理。

而在Vue中，state对象并不是必须的，数据由data属性在Vue对象中进行管理，也无需使用如setState()之类的方法去改变它的状态，在Vue对象中，data参数就是应用中数据的保存者。

*  **性能优化**

在react中，当组件状态改变时（setState后），它会触发整个子组件数重新渲染，以根组件作为渲染基点。为了避免不必要的子组件重新渲染，你需要使用PureComponent或者实现 shouldComponentUpdate。
  在Vue中，vue组件在初始化时会通过Object.defineProperty对每一个data属性建立对应的Wather，然后在模板编译时收集依赖。以后只要修改data的任何一个属性，就会触发视图的重新渲染，而且是精确的修改对应的vdom。这就不需要开发人员对整个性能进行优化，允许他们更专注于构建应用程序本身。   

总之，react的性能优化需要手动去做，而vue的性能优化是自动的，但是vue的响应式机制也有问题，就是当state特别多的时候，Watcher也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用react，更加可控。

* **Hoc和minxins**

 

##  **二. 共同点：**

* **单向数据流**

数据流指的是组件之间的数据流动。

虽然vue有双向绑定v-model，但是vue和react父子组件之间数据传递，仍然还是遵循单向数据流的，父组件可以向子组件传递props，但是子组件不能修改父组件传递来的props，子组件只能通过事件通知父组件进行数据更改。如图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081916312479.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)

这样做的优点是所有状态的改变可记录、可跟踪、源头易追溯，所有数据只有一份，组件数据只有唯一的入口和出口，使得程序更直观更容易理解，有利于应用的可维护性。

*  **都使用Virtual DOM**

Virtual DOM是一个映射真实DOM的JavaScript对象，如果需要改变任何元素的状态，那么是先在Virtual DOM上进行改变，而不是直接改变真实的DOM。当有变化产生时，一个新的Virtual DOM对象会被创建并计算新旧Virtual DOM之间的差别。之后这些差别会应用在真实的DOM上。

*  **组件化**

React与Vue都鼓励组件化应用。这本质上说，是建议你将你的应用分拆成一个个功能明确的模块，每个模块之间可以通过合适的方式互相联系。



**学习于**：

[单向数据流和双向数据](https://segmentfault.com/q/1010000019491720)

 [Vue与React的异同](https://www.cnblogs.com/Jomsou/p/10342466.html)

[Vue和React的对比](https://www.cnblogs.com/suihang/p/10098860.html)

[React与Vue有什么不同？](https://zhuanlan.zhihu.com/p/33051365)

[react的工作原理](https://blog.csdn.net/a1943206465/article/details/60570567?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~all~baidu_landing_v2~default-1-60570567.nonecase)