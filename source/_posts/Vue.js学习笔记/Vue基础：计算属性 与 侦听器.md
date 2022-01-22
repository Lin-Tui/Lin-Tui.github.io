---
title: Vue基础：计算属性 与 侦听器
date: 1587385842045.2583
tags:
- Vue
category:
- Vue学习笔记
---


## （一）计算属性computed

对于任何复杂逻辑，你都应当使用**计算属性**。

#### 1. 基本使用

**计算属性是基于它们的响应式依赖进行缓存的。**只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要依赖数据没有发生改变，computed将从缓存中获取之前的计算结果，而不必再次执行函数。

例子：

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
```

上面声明了一个计算属性 `reversedMessage`。其中我们提供的函数将用作属性 `vm.reversedMessage` 的 getter 函数：

```js
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
```

#### 2. 计算属性的 setter

计算属性默认只有 getter，不过在需要时也可以提供一个 setter：

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```



## （二）侦听器watch

 watch 对象就是侦听器，只有当侦听的值改变了它才会执行。

#### 1. 基本使用

```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
        f: {
            g: 5
        }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',  //在方法里写对应的函数
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true // 更改对象的时候需要用深度监听
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true  //该属性能使函数默认的执行一次
    },
    e: [
        function handle1(val, oldVal){ /* ... */ },
        function handle2(val, oldVal){ /* ... */ },
    ],
    // 监听vm.e.f的值: {g: 5}
    'e,f': function(val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```

注意，**不应该使用箭头函数来定义 watcher 函数** (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.updateAutocomplete` 将是 undefined。

#### 2. 与计算属性computed使用场景的对比

- `watch`选项允许我们执行异步操作（访问一个API）或高消耗性能的操作，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态
- `computed` 是计算一个新的属性，并将该属性挂载到 `vm`（Vue 实例）上，而 `watch` 是监听已经存在且已挂载到 `vm` 上的数据，所以用 `watch` 同样可以监听 `computed` 计算属性的变化（其它还有 data、props）
- `computed` 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 `computed` 属性，才会计算新的值，而 `watch` 则是当数据发生变化便会调用执行函数
- `computed` 适用一个数据被多个数据影响，而 `watch` 适用一个数据影响多个数据

**详细见**：

[Vue官方文档 - vm.$watch](https://cn.vuejs.org/v2/api/#vm-watch)


  

