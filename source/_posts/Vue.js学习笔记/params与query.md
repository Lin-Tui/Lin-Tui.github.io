---
title: params与query
date: 1597891733499.9023
tags:
- Vue
category:
- Vue学习笔记
---
# 一. Vue中路由的传参

假设需要实现一个路由切换，点击之切换到`W组件`。并传递一个`id`值和一个`age`值。

运用`router-link`来写：

```html
<router-link :to="{A: 'xxx', query: {xx: 'xxx'}}" />
<router-link :to="{A: 'xxx', params: {xx: 'xxx'}}" />
routers:{???}
```

对于query 和 params来说：

* A是那么还是path
* routers要怎么写
* url长什么样子
* 会有什么隐藏的坑吗

## 1. `query`：

`name`和`path`都可以用。

* **name**：

```html
<router-link :to="{ name: 'W', query: { id:'1234'，age:'12' }}"/>
```

	`routes`基于`name`设置：

```js
{
  path: '/hhhhhhh', //这里可以任意
  name: 'W',  //这里必须是W
  component: W
}
```

	然后就把`path`匹配添加到`url`上去：

```
http://localhost:8080/#/hhhhhhh?id=1234&age=12
```

* **path**：

```html
<router-link :to="{ path: '/W', query: { id:'1234',age:'12' }}"/>
```

	基于`path`来设置`routes`：

```js
{
  path: '/W', //这里必须是W
  name: 'hhhhhhhh',  //这里任意
  component: W
}
```

	`url`:

```
http://localhost:8080/#/W?id=1234&age=12
```

	这两种方法，都可以自定义`path`的样式，
	不过一个是在`router-link to`里面定义，一个则是在`routes`里面定义

* **接收参数**:

  在接收参数的时候都是使用`this.$route.query.id`

## 2. `parmas`

这里只能用`name`不能用`path`，不然会直接无视掉`params`中的内容

```html
<router-link :to="{ name: 'W', params: { id:'1234',age:'12' }}"/>
```

然后在`routes`中添加:

```js
{
      path:'/W/:id/:age',
      name:'W',
      component:W
}
```

这里的`name`与上面`router-link`中的`name`保持一致

`url`就取决于这个`path`的写法

```
http://localhost:8080/#/W/1234/12
```

注意，`path`里面的`/w`可以任意写，写成`/hhhhh`也可以。
但是！`/:id`和`/:age`不能省略，且不能改名字

不写的话，第一次点击可以实现组件跳转，且可以通过`this.$route.parmas.id`获取到传过来的`id`值，但如果刷新页面，传过来的`id`值和`age`值就会丢失。从这也能看出params比query严格。



# 二. Node中的req.query和req.params

在后端中，要接受前端的`axios`请求，于是我们又会接触到了query、params。

什么样的`axios`请求对应什么样的接受方式？
还有不止是`req.query`,`req.params`,还多了`req.body`

假设前端现在用axios向后端发送一个请求，发送id值请求后端的数据。

## 1. `req.query`

```js
axios.get(`/api/?id=1234`)
```

或者

```js
axios.get(`/api`，{ params:{id:'1234' })
```

在前端里面，`router`怎么发送的就怎么收

* `query`发送的就用`this.$route.query`接收
* `params`发送的就用`this.$route.params`接收

但在这里，虽然第二种方式里面有`params`，但这两种我们都要用`req.query.id`来获取里面的`id`值

```js
router.get('/api',function(req,res){
console.log(req.query.id)
.......
})
```

## 2. `req.params`

那如果直接把`id`值写进发送的`url`里面呢

```js
axios.get(`/api/1234`)
```

看这个形式有没有觉得很眼熟
它跟上面`params`的`url`非常像
我们就反向操作一下

```js
router.get('/api/:id',function(req,res){
    console.log(req.params.id)
    .......
    })
```

如果它是这么请求的

```js
axios.get(`/api/1234-12`)
```

中间用`-`或者`&`隔开

那我们也可以在获取时的路径上这么写

```js
router.get('/api/:id-:age',function(req,res){
    console.log(req.params.id)
    console.log(req.params.age)
    .......
    })
```

## 3. `req.body`

上面两个都是处理`get`请求的，而`req.body`就是用来处理`post`请求的。(需要安装`body-parser`中间件）

```js
axios.post(`/api`,{ id:'1234' })
```

我们就用`req.body`来接收

```js
router.get('/api',function(req,res){
console.log(req.body.id)
.......
})
```



**转载于**：

[容易混淆-论query和params在前后端中的区别](https://segmentfault.com/a/1190000018940855)