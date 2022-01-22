---
title: Vue2 双向绑定原理（数据响应式
date: 1587306927518.9448
tags:
- Vue
category:
- Vue学习笔记
---
## 目录

#### [1. MVVM](#jumpa)

* [**定义**](#jump1)
* [**优点**](#jump2)
* [**缺点**](#jump3)

#### [2. Vue2 双向绑定原理（数据响应式)](#jumpb)

* [**原理概述**](#jump4)
* [**数据劫持**](#jump5)
* [**发布与订阅**](#jump6)



## <span id="jumpa">（一）MVVM</span>

#### <span id="jump1">1. 定义：</span>

MVVM 是 Model-View-ViewModel（模型-视图-视图模型）的缩写；是一种软件架构设计模式。

其中：

* Model：是数据模型，既后端传过来的数据；
* View：是视图层，既我们看到的页面；
* ViewModel：是连接Model和View的中间桥梁

在MVVM的框架下，View和Model是不能直接通信的，Model与View之间通过ViewMode关联。ViewModel负责将Model数据的变化显示到View上，将View的改变反馈到Model上。这就是我们常说的**双向绑定数据**机制。

#### <span id="jump2">2. 优点：</span>

* 降低耦合：视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
* 可重用性：可以把一些视图逻辑放在ViewModel层中，让很多View重用这些视图逻辑。
* 独立开发。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计。
* 可测试。界面素来是比较难于测试的，测试可以针对ViewModel来写。

#### <span id="jump3">3. 缺点：</span>

* 数据绑定使得 Bug 很难被调试。你看到界面异常了，有可能是你 View 的代码有 Bug，也可能是 Model 的代码有问题。
* 因为使用了dataBinding，增加了大量的内存开销，增加了程序的编译时间，项目越大内存开销越大。

那如何设计MVVM模型模型呢。需要解决两个关键问题：

* 如何知道数据更新。

* 数据更新后，如何通知变化。

下面就分别介绍vue是如何实现的以上两点，理解了这两点，基本上也就明白了双向绑定的机制。

## <span id="jumpb">（二）Vue2 双向绑定原理（数据响应式）</span>

#### <span id="jump4">1. 原理概述</span>

Vue2 采用数据劫持结合发布者-订阅者模式的方式来实现数据的响应式，通过Object.defineProperty来劫持数据的setter，getter，在数据变动时发布消息给订阅者，订阅者收到消息后进行相应的处理。

要实现MVVM的双向绑定，就必须要实现以下几点：

* Compile—指令解析系统，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
* Observer—数据的观察者,让数据对象的读写操作都处于自己的监管之下。当初始化实例的时候，会递归遍历data，用Object.defineProperty来拦截数据（包含数组里的每个数据）。
* Dep+Watcher—发布订阅模型，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。


mvvm入口函数，整合以上三者，具体如图所示：

![](C:\Users\lin\Desktop\1.jpg)

下面分别说明数据劫持与发布者-订阅者模式。

#### <span id="jump5">2. 数据劫持</span>

**`Object.defineProperty()`**

在ES5中有`Object.defineProperty()`方法，它能监听各个属性的set和get方法。

Object.defineProperty()方法，有三个参数，分别为待监听的数据对象，待监听的属性，以及对set，get的监听方法。

例如：对data对象的name属性进行监听，当执行`"data.name='fyn'"`触发set方法，执行`"data.name"`触发get方法。

```js
 let data ={name:'tcy'}
  Object.defineProperty(data,'name',{
  	set: function(newValue) {
        console.log('更新了data的name:' + newValue);
    },
    get: function() {
        console.log('获取data数据name');
    }
  })
data.name="fyn";//更新了data的name:fyn
data.name;//获取data数据name
```

**什么是数据劫持**

通过上面对Object.defineProperty的介绍，我们不难发现，当我们访问或设置对象的属性的时候，都会触发相对应的函数，然后在这个函数里返回或设置属性的值。

既然如此，我们当然可以在触发函数的时候动一些手脚做点我们自己想做的事情，这也就是“劫持”操作。

**模拟Vue实现数据劫持**

vue正是采用了`Object.defineProperty()`方法，对data的属性进行劫持。我们来模拟实现其劫持的过程。

```js
/*
模拟vue的data数据
 var vm = new Vue(
{
   data:{
       name:'tcy',
       age:'20'
   }
 }
 	)
 */
let data ={name:'tcy',age:'20'}
function observe(data){
	//获取所有的data数据对象中的所有属性进行遍历
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
    	let val = data[keys[i]];
       defineReactive(data, keys[i],val)//为每个属性增加监听
    }
}
function defineReactive(obj,key,val){
   Object.defineProperty(obj, key, {
    enumerable: true,//可枚举
    configurable: true,//可配置
    get: function reactiveGetter () {
      //模拟get劫持
      console.log("get劫持");
      return val;
    },
    set: function reactiveSetter (newVal) {
       	//模拟set劫持
     console.log("set劫持,新值："+newVal);
     val = newVal;
    }
  })
}
observe(data);
data.name="fyn";//set劫持,新值：fyn
console.log(data.name);//get劫持,fyn
```

data 模拟 vue.data 对象，observer 中对 data 的属性进行遍历，调用 defineReactive 对每个属性的 get 和 set 方法进行劫持。

由此，data数据的任何属性值变化，都可以监听和劫持，上述的第一个问题（如何知道数据更新）就解决了。那view端的数据变化是如何知道的呢，view端改变数据的组件无外乎input，select等，可以用组件的 onchange 事件监听，这里就不再重点描述。

#### <span id="jump6">3. 发布与订阅</span>

vue在双向绑定的设计中，采用的是观察-订阅模式，前面所讲的数据劫持，其实就是为属性创建了一个观察者对象，监听数据的变化。接下来就是创建发布类和订阅类。

来看一下下面的图：

![](C:\Users\lin\Desktop\3.png)

图中：

* observer，创建数据监听，并为每个属性建立一个发布类。

* Dep是发布订阅者模型中的发布者：get数据的时候，收集订阅者，触发Watcher的依赖收集；set数据时发布更新，通知Watcher 。一个Dep实例对应一个对象属性或一个被观察的对象，用来收集订阅者和在数据改变时，发布更新。

* Watcher是发布订阅者模型中的订阅者：订阅的数据改变时执行相应的回调函数（更新视图或表达式的值）。一个Watcher可以更新视图，如html模板中用到的`{{test}}`，也可以执行一个`$watch`监督的表达式的回调函数（Vue实例中的watch项底层是调用的`$watch`实现的）,还可以更新一个计算属性（即Vue实例中的computed项）。

其中：