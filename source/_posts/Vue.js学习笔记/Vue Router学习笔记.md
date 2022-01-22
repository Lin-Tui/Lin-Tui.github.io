---
title: Vue Router学习笔记
date: 1580354516450.6328
tags:
- Vue
category:
- Vue学习笔记
---
## Vue Router 学习笔记



### 1. **`<router-view></router-view>`**:

Vue Router提供`<router-view></router-view>`来做 路由出口，渲染路径匹配到的视图组件。

`<router-view>` 渲染的组件还可以内嵌自己的 `<router-view>`，根据嵌套路径，渲染嵌套组件。

App.vue中：

` <router-view/>`

路由文件中：

```js
const router = new VueRouter({
  routes: [
    {
    path:'/movieDetail',
    component:MovieDetail
  },
  ]
})
```



### 2. 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```



​	**嵌套命名视图**：

​	我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件。

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar/>
  <router-view/>
  <router-view name="helper"/>
</div>
```

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```



### 3. **`this.$router`** :

通过`this,$router`访问路由器，或访问当前路由。

- `$route.path`

  - 类型: `string`

    字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/foo/bar"`。

- `$route.params`

  - 类型: `Object`

    一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。

  | 模式                          | 匹配路径            | $route.params                          |
  | ----------------------------- | ------------------- | -------------------------------------- |
  | /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
  | /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

- `$route.query`

  - 类型: `Object`

    一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user == 1`，如果没有查询参数，则是个空对象。

- `$route.hash`

  - 类型: `string`

    当前路由的 hash 值 (带 `#`) ，如果没有 hash 值，则为空字符串。

- `$route.name`

  当前路由的名称，如果有的话。



### 4.命名路由：



有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 `/user/123` 路径。



### 5. `<router-link></router-link>`:

Vue Router提供`<router-link></router-link>`来导航。

该组件通过传入 ‘ to ’ 属性指定目标地址，该组件默认会被渲染成一个`<a>`标签。

其中：

* `to`属性：其值表示目标路由的链接。当被点击后，内部会立刻把 `to` 的值传到 `router.push()`，所以这个值可以是一个字符串或者是描述目标位置的对象。

  ```html
  <!-- 字符串 -->
  <router-link to="home">Home</router-link>
  <!-- 渲染结果 -->
  <a href="home">Home</a>
  
  <!-- 使用 v-bind 的 JS 表达式 -->
  <router-link v-bind:to="'home'">Home</router-link>
  
  <!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
  <router-link :to="'home'">Home</router-link>
  
  <!-- 同上 -->
  <router-link :to="{ path: 'home' }">Home</router-link>
  
  <!-- 命名的路由 -->
  <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
  
  <!-- 带查询参数，下面的结果为 /register?plan=private -->
  <router-link :to="{ path: 'register', query: { plan: 'private' }}"
    >Register</router-link
  >
  ```

* `replace`：

  设置 `replace` 属性的话，当点击时，会调用 `router.replace()` 而不是 `router.push()`，于是导航后不会留下 history 记录。

  ```html
  <router-link :to="{ path: '/abc'}" replace></router-link>
  ```



### 6.**嵌套路由：**

实际生活中的应用界面，通常由多层嵌套的组件组合而成。

App.vue:

```html
<div id="app">
  <router-view></router-view> 
</div>
```

这里的 `<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件。

同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。例如，在 `User` 组件的模板添加一个 `<router-view>`:

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
}
```

要在嵌套的出口中渲染组件，需要在 `VueRouter` 的参数中使用 `children` 配置：

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

**要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**



### 7. 路由组件传参

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

使用 `props` 将组件和路由解耦：

**取代与 $route 的耦合**

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

**通过 props 解耦**

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```



### 8. 编程式路由：

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

* **`router.push(location, onComplete?, onAbort?)`**

  在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。

  想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

  当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

  | 声明式                    | 编程式             |
  | ------------------------- | ------------------ |
  | `<router-link :to="...">` | `router.push(...)` |

  ```js
  // 字符串
  router.push('home')
  
  // 对象
  router.push({ path: 'home' })
  
  // 命名的路由
  router.push({ name: 'user', params: { userId: '123' }})
  
  // 带查询参数，变成 /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }})
  ```

  **如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：**

  ```js
  const userId = '123'
  router.push({ name: 'user', params: { userId }}) // -> /user/123
  router.push({ path: `/user/${userId}` }) // -> /user/123
  // 这里的 params 不生效
  router.push({ path: '/user', params: { userId }}) // -> /user
  ```

  同样的规则也适用于 `router-link` 组件的 `to` 属性。

  

* **`router.replace(location, onComplete?, onAbort?)`**

  跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

  | 声明式                            | 编程式                |
  | --------------------------------- | --------------------- |
  | `<router-link :to="..." replace>` | `router.replace(...)` |

  

* **`router.go(n) `**:

  这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步

  ```js
  // 在浏览器记录中前进一步，等同于 history.forward()
  router.go(1)
  
  // 后退一步记录，等同于 history.back()
  router.go(-1)
  
  // 前进 3 步记录
  router.go(3)
  
  // 如果 history 记录不够用，那就默默地失败呗
  router.go(-100)
  router.go(100)
  ```

























