---
title: Vue：生命周期
date: 1587287734478.9675
tags:
- Vue
category:
- Vue学习笔记
---
Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、销毁等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

## （一）生命周期钩子  按顺序依次为：

#### 1. `beforeCreate()`

在实例初始化事件和生命周期之后、数据观测和事件配置之前被调用。

此时，组件的选项对象还未创建，date、method和el均没有初始化，因此无法访问到数据data， methods、computed等上的方法和数据以及真实的DOM。一般不做挂载数据，绑定事件等操作。

#### 2. `created()`

在实例已经创建完成之后被调用。

此时，实例已完成以下配置：数据观测、属性和方法的运算，watch/event事件回调，完成了data 数据的初始化。 然而，el没有还未初始化，挂载阶段还没有开始, $el属性目前不可见。

这是一个常用的生命周期，可以调用methods中的方法，改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上，获取computed中的计算属性等等。

#### 3. `beforeMount()`

在挂载开始之前被调用，相关的render函数首次被调用（虚拟DOM）。

此时，实例已完成以下的配置： 编译模板，把data里面的数据和模板生成html，完成了el和data 初始化，然而，还没有挂载html到页面上。

该钩子在服务端渲染期间不被调用。 

#### 4. `mounted()`

挂载完成，也就是模板中的HTML渲染到HTML页面中，此时一般可以做一些ajax操作。

该钩子在服务端渲染期间不被调用。 

#### 5. `beforeUpdate()`

在数据更新之前被调用，发生在虚拟DOM重新渲染和打补丁之前，可以在该钩子中进一步地更改状态，不会触发附加地重渲染过程。

该钩子在服务端渲染期间不被调用。 

#### 6. `updated()`

在由于数据更改导致地虚拟DOM重新渲染和打补丁之后调用，调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作，然后在大多是情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。

该钩子在服务器端渲染期间不被调用

#### 7. `beforeDestroy()`

在实例销毁之前调用，实例仍然完全可用。

此时，还可以用this来获取实例，一般在这一步做一些重置的操作，比如清除掉组件中的定时器 和 监听的dom事件。

该钩子在服务端渲染期间不被调用。 

#### 8. `destroy()`

在实例销毁之后调用，调用后，所以的事件监听器会被移出，所有的子实例也会被销毁，该钩子在服务器端渲染期间不被调用。

#### 用更直观的图说明：

* **生命周期**：

  ![4](C:\Users\lin\Desktop\4.png)

* **创建阶段**：

  ![5](C:\Users\lin\Desktop\5.png)

* **更新阶段**：

  ![6](C:\Users\lin\Desktop\6.png)

* **销毁阶段**：

  ![7](C:\Users\lin\Desktop\7.png)

**注意点：**

- 不要在选项属性或回调上使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致错误。
- 如果不指定 el 选项，就只会执行  beforeCreate() 、created()。
- 做一些和DOM有关的操作时，一般放在mounted()
- 和数据有关的操作一般放在created()或mounted()
- beforeCreate()、created()、beforeMount()、mounted()在组件生命周期中只执行一次。



#### 10. Vue实例和子组件之间的生命周期

在Vue中，由于父元素的template模板嵌套了子元素，因此在编译模板时，会先进入到父元素的template，然后层层递归进行子元素的模板编译。

- 在创建时，父子组件的生命周期是：
  父组件beforeCreated -> 父组件created -> 父组件beforeMounted -> **子组件beforeCreated -> 子组件created -> 子组件beforeMounted -> 子组件mounted** -> 父组件mounted。
- 在销毁时，父子组件的生命周期是：
  父组件beforeDestory -> **子组件beforeDestoryed -> 子组件destoryed** -> 父组件destoryed

总之记住，父子组件的生命周期遵循：**由外到内，再由内到外**

## （二）官方的生命周期图示

![](C:\Users\lin\Desktop\lifecycle.png)

**参考链接：**

[Vue的生命周期详解](https://segmentfault.com/a/1190000014816685)