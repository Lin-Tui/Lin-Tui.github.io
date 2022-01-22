---
title: Vue：深入理解组件
date: 1587386126007.7268
tags:
- Vue
category:
- Vue学习笔记
---
## 目录

####  [1. 组件注册](#jumpa)

* [**全局注册**](#jump1)
* [**局部注册**](#jump2)

#### [2. Prop](#jumpb)

* [**Prop的大小写**](#jump3)
* [**Prop验证**](#jump4)
* [**传递Prop**](#jump5)

#### [3. 插槽](#jumpc)

* [**基本使用**](#jump6)
* [**后备内容**](#jump7)
* [**作用域插槽**](#jump8)

#### [4. 动态组件 & 异步组件](#jumpd)

* [**动态组件**](#jump9)
* [**在动态组件上使用  keep-alive**](#jump10)
* [**异步组件**](#jump11)



## <span id="jumpa">（一）组件注册</span>

两种组件的注册类型：**全局注册**和**局部注册**。

#### <span id="jump1">1. 全局注册</span>

全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

```js
// 定义一个名为 button-counter
//当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会避免和当前以及未来的 HTML 元素相冲突。
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

#### <span id="jump2">2. 局部注册</span>

```js
//模块系统中局部注册
import ComponentA from './ComponentA.vue'
export default {
  components: {
    ComponentA
  },
  // ...
}
```

## <span id="jumpb">（二）Prop</span>

#### <span id="jump3">1. Prop的大小写</span>

HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

```js
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

重申一次，如果你使用字符串模板，那么这个限制就不存在了。

#### <span id="jump4">2. Prop验证</span>

**不推荐**使用数组的方式，对系统后续维护不利。

```js
props:['name', 'type', 'list', 'isVisible']
```

**推荐**以下写法：定制 prop 的验证方式。

```js
 props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    propF: {
        type:Array,
//对象或数组默认值必须从一个工厂函数获取
            default: () => []
    }，
    propG: {
        type:Function,
        default: () => {}
    } 
    // 自定义验证函数
    propH: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    propI: {
        type:Boolean,
         default:false
    },
  }
```

#### <span id="jump5">3. 传递Prop</span>

```html
<!-- 1. 传递静态Prop -->
<blog-post title="My journey with Vue"></blog-post> 
<!-- (1)传入一个数字 -->
<blog-post v-bind:likes="42"></blog-post>
<!-- (2)传入布尔值 -->
<blog-post v-bind:is-published="false"></blog-post>
<!-- (3)传入数组 -->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
<!-- (4)传入对象 -->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 2. 传递动态Prop -->  
<!-- (1)动态赋予一个变量的值 -->
<blog-post v-bind:likes="post.likes"></blog-post>
<blog-post v-bind:author="post.author"></blog-post>
<!-- (2)动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
<!-- (3)传入对象的所有属性 -->
<blog-post v-bind="post"></blog-post>
<!--
post: {
  id: 1,
  title: 'My Journey with Vue'
}
等效于下面代码：
-->
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

## <span id="jumpc">（三）插槽</span>

#### 1. 基本使用

```html
<!-- 在 <navigation-link> 的模板中写为 -->
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>

<!-- 在使用<navigation-link>模板时： -->
<navigation-link url="/profile">Your Profile</navigation-link>

<navigation-link url="/profile">
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link
    
<navigation-link url="/profile">
  <font-awesome-icon name="user"></font-awesome-icon>
  Your Profile
</navigation-link>
```

如果 `<navigation-link>` **没有**包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

#### 2. 后备内容

为一个插槽设置具体的后备 (也就是默认的) 内容，它只会在没有提供内容的时候被渲染。而如果我们提供内容，则这个提供的内容将会被渲染从而取代后备内容。

```html
<!-- 在 <submit-button> 的模板中写为 -->
<button type="submit">
  <slot>Submit</slot>
</button>

<!-- 在使用<submit-button>模板时： -->
<submit-button></submit-button>
<!-- 将被渲染为： -->
<button type="submit">
  Submit
</button>
```

#### 3. 具名插槽

使用场景：需要多个插槽。

对于这样的情况，`<slot>` 元素有一个特殊的 attribute：`name`。这个 attribute 可以用来定义额外的插槽。一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称。

```html
<!-- 在 <base-layout> 的模板中写为 -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

<!-- 在使用<base-layout>模板时： -->
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
<!-- 上面两行代码等效为：  
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
 -->   
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

**具名插槽缩写**：

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

#### 3. 作用域插槽

**编译作用域**：

父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

我们在父级模板里使用带有插槽的子组件。当想在一个插槽中使用数据时，该插槽跟父级模板的其它地方一样可以访问父级的实例属性 (也就是相同的“作用域”)，而**不能**访问子组件的作用域。

而当我们想让插槽内容能够访问子组件中才有的数据时，可以使用作用域插槽。 `<slot>` 元素上的 attribute 被称为**插槽 prop**。

```html
<!-- 在<current-user>的模板中写为: -->
<!-- 为了让 user 在父级的插槽内容中可用，我们可以将 user 作为 <slot> 元素的一个 attribute 绑定上去 -->
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>

<!-- 在使用<current-user>模板时： -->
<!-- 可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

## <span id="jumpd">（四）动态组件 & 异步组件</span>

#### <span id="jump9"> 1. 动态组件</span>

通过 Vue 的 `<component>` 元素加一个特殊的 `is` attribute 来实现：

```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，currentTabComponent 可以包括

* 已注册组件的名字，或
* 一个组件的选项对象

**例子**：

```html
<template>
  <p id="app">
   <component :is="currentView"></component>
   <button @click="changeView('A')">切换到A</button>
   <button @click="changeView('B')">切换到B</button>
   <button @click="changeView('C')">切换到C</button>
  </p>
</template>

<script>
var app = new Vue({
 el: '#app',
 data: {
  currentView: 'comA'
 },
 methods: {
  changeView: function(data){
   this.currentView = 'com'+ data　　//动态地改变currentView的值就可以动态挂载组件了。
  }
 },
 components: {
  comA: {
   template: '<p>组件A</p>'
  },
  comB: {
   template: '<p>组件B</p>'
  },
  comC: {
   template: '<p>组件C</p>'
  }
 }
});
</script>
```

#### <span id="jump10">2. 在动态组件上使用 `keep-alive`</span>

`<keep-alive> `包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 `<transition> `相似，`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

 当组件在` <keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。  主要用于保留组件状态或避免重新渲染。

**详细见**：

[利用Vue中keep-alive，快速实现页面缓存](https://zhuanlan.zhihu.com/p/96740001)

[Vue keep-alive详解](https://www.jianshu.com/p/aad6c4f644f3)

#### <span id="jump11">3. 异步组件</span>

[vue项目实现按需加载的3种方式：vue异步组件、es提案的import()、webpack的require.ensure()](https://www.ucloud.cn/yun/88982.html)

