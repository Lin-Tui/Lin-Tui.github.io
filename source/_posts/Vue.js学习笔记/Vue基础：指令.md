---
title: Vue基础：指令
date: 1587384970075.3425
tags:
- Vue
category:
- Vue学习笔记
---
## 目录

- #### [v-html](#jump1)

- #### [v-for](#jump2)

- #### [v-if](#jump3)

- #### [v-show](#jump4)

- #### [v-model](#jump5)

- #### [v-bind](#jump6)

- #### [v-on](#jump7)

- #### [v-once](#jump8)



## <span id="jump1">1. `v-html`： </span>

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，需要使用该指令。它使内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。

```html
<!--这个 span 的内容将会被替换成为属性值 rawHtml-->
<span v-html="rawHtml"></span>  
```

## <span id="jump2">2. `v-for` ：</span>

 可以绑定数组的数据来渲染一个项目列表。

```html
<!-- 1. 用 v-for 把一个数组对应为一组元素。第一个参数为被迭代的数组元素的别名，还支持一个可选的第二个参数，即当前项的索引。-->
<div v-for="item in items" :key="item.id">{{ item.message }}</div>
<ul>
  <li v-for="(item, index) in items" :key="index">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
</ul>
<!--
data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo', id: 1 },
      { message: 'Bar', id: 2 }
    ]
  }
-->

<!-- 2. 用 v-for 来遍历一个对象的属性。第一个参数为被迭代的对象属性值，也可以提供第二个的参数为 property 名称 (也就是键名)。还可以用第三个参数作为索引。-->
<ul class="demo">
  <li v-for="value in object">{{ value }}</li>
</ul>
<div v-for="(value, name) in object">{{ name }}: {{ value }}</div>
<div v-for="(value, name, index) in object">{{ index }}. {{ name }}: {{ value }}</div>
<!--
data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
-->

<!-- 3. 可以利用带有 v-for 的 <template> 来循环渲染一段包含多个元素的内容。-->
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性。

当`v-for`和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高。这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。

## <span id="jump3">3. `v-if`： </span>

将根据后面表达式的值的真假来插入/移除元素。

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

## <span id="jump4">4. `v-show`：</span>

用于根据条件展示元素。

```html
<h1 v-show="ok">Hello!</h1>
```

**与`v-if`的区别**：

- `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
- `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- 而带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS 属性 `display`。
- `v-if`支持 `<template>` 元素，也支持 `v-else`。 `v-show` 都不支持。

- 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## <span id="jump5">5. `v-model`： </span>

它能轻松实现表单输入和应用状态之间的双向数据绑定。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 `value` 属性和 `input` 事件；
- checkbox 和 radio 使用 `checked` 属性和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

```html
<!-- 1. 文本 -->
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>

<!-- 2. 多行文本 -->
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

<!-- 3. 复选框 -->
<div>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
<!--
  data: {
    checkedNames: []
  }
-->

<!-- 4. 单选按钮 -->
<div >
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
<!--
  data: {
    picked: ''
  }
-->

<!-- 5. 选择框 -->
<div >
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
<!--
  data: {
    selected: ''
  }
-->

<!-- 6. 多选时 (绑定到一个数组) -->
<div>
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
<!--
  data: {
    selected: []
  }
-->

<!-- 7. 修饰符 -->
<!--  (1) 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
<!--  (2) 自动将用户的输入值转为数值类型 -->
<input v-model.number="age" type="number">
<!--  (3) 自动过滤用户输入的首尾空白字符 -->
<input v-model.trim="msg">

<!-- 8. 值绑定 -->
<!-- (1)当选中时，vm.pick === vm.a -->
<input type="radio" v-model="pick" v-bind:value="a">
<!-- (2) 当选中时:vm.toggle === 'yes', 当没有选中时,vm.toggle === 'no' -->
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
<!-- (3)当选中时, typeof vm.selected => 'object', vm.selected.number => 123 -->
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```

## <span id="jump6">6. `v-bind`：</span>

绑定元素 attribute。

```html
<!-- 1. 完整语法 -->
<a v-bind:href="url">...</a>
<button v-bind:disabled="isButtonDisabled">Button</button>

<!-- 2. 内联字符串拼接 -->
<div v-bind:id="'list-' + id"></div>
<img :src="'/path/to/images/' + fileName">

<!-- 3. 缩写 -->
<a :href="url">...</a>

<!-- 4. 动态参数 (2.6.0+) -->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 5. 动态参数的缩写 (2.6.0+) -->
<a :[attributeName]="url"> ... </a>

<!-- 6. class 绑定 -->
<div :class="classObject"></div>
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>
<div v-bind:class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>
<!--
data: {
  classObject: {
    active: true,
    'text-danger': false
  },
  isActive: true,
  hasError: false,
  activeClass: 'active',
  errorClass: 'text-danger'
}
-->

<!-- 7. style 绑定 -->
<div :style="styleObject"></div>
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>
<!--
data: {
  activeColor: 'red',
  fontSize: 30
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
-->

<!-- 8. 绑定一个有属性的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- 9. 通过 prop 修饰符绑定 DOM 属性 -->
<div v-bind:text-content.prop="text"></div>

<!-- 10. prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>

<!-- 11. 通过 $props 将父组件的 props 一起传给子组件 -->
<child-component v-bind="$props"></child-component>
```

## <span id="jump7">7. `v-on` ：</span>

指令添加一个事件监听器，通过它调用在 Vue 实例中定义的方法

```html
<!-- 1. 完整语法 -->
<a v-on:click="doSomething">...</a>
<button v-on:click="counter += 1">Add 1</button>

<!-- 2. 内联语句 -->
<button v-on:click="doSomething('hello', $event)"></button>

<!-- 3. 缩写 -->
<a @click="doSomething">...</a>

<!-- 4. 动态参数 (2.6.0+) -->
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 5. 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>

<!-- 6. 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

<!-- 7. 事件修饰符 -->
<!-- (1)停止冒泡 -->
<button @click.stop="doSomething"></button>
<!-- (2)阻止默认行为 -->
<button @click.prevent="doSomething"></button>
<!-- (3)阻止默认行为，没有表达式 -->
<form @submit.prevent></form>
<!--  (4)串联修饰符 -->
<button @click.stop.prevent="doSomething"></button>
<!-- (5)键修饰符，键别名 -->
<input @keyup.enter="doSomething">
<!-- (6)键修饰符，键代码 -->
<input @keyup.13="doSomething">
<!-- (7)点击回调只会触发一次 -->
<button v-on:click.once="doSomething"></button>
```

## <span id="jump8">8.  `v-once` ：</span>

通过该指令，只能执行一次性地插值，当数据改变时，插值处的内容不会更新。

```html
<span>Message: {{ msg }}</span>
<span v-once>这个将不会改变: {{ msg }}</span>
```

**详细见：**   **[Vue官方文档 -指令](https://cn.vuejs.org/v2/api/#指令)**