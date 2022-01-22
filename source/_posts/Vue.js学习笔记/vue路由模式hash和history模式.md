---
title: vue路由模式hash和history模式
date: 1589431580620.0254
tags:
- Vue
category:
- Vue学习笔记
---
# hash模式和history模式 实现原理及区别

目前单页应用（SPA）越来越成为前端主流，单页应用一大特点就是使用前端路由，由前端来直接控制路由跳转逻辑，而不再由后端人员控制，这给了前端更多的自由。

目前前端路由主要有两种实现方式：`hash` 模式和 `history`模式，下面分别详细说明。

### 1. hash模式

比如在用超链接制作锚点跳转的时候，就会发现，url后面跟了"#id"，hash值就是url中从"#"号开始到结束的部分。

hash值变化浏览器不会重新发起请求，但是会触发`window.hashChange`事件，假如我们在hashChange事件中获取当前的hash值，并根据hash值来修改页面内容，则达到了前端路由的目的。

```html
<!-- html：菜单中href设置为hash形式，id为app中放置页面内容 -->
<ul id="menu">
    <li>
        <a href="#index">首页</a>
    </li>
    <li>
        <a href="#news">资讯</a>
    </li>
    <li>
        <a href="#user">个人中心</a>
    </li>
 
</ul>
 
<div id="app"></div>
```

```js
//在window.onhashchange中获取hash值，根据不同的值，修改app中不同的内容，起到了路由的效果
function hashChange(e){
    // console.log(location.hash)
    // console.log(location.href)
    // console.log(e.newURL)
    // console.log(e.oldURL)
 
    let app = document.getElementById('app')
    switch (location.hash) {
        case '#index':
            app.innerHTML = '<h1>这是首页内容</h1>'
            break
        case '#news':
            app.innerHTML = '<h1>这是新闻内容</h1>'
            break
        case '#user':
            app.innerHTML = '<h1>这是个人中心内容</h1>'
            break
        default:
            app.innerHTML = '<h1>404</h1>'
    }
}
window.onhashchange = hashChange
hashChange()
```

**上面这个实现方式比较简陋，我们可以再封装一下:**

```js
class Router {
    constructor(){
        this.routers = []  //存放我们的路由配置
    }
    add(route,callback){
        this.routers.push({
            path:route,
            render:callback
        })
    }
    listen(callback){
        window.onhashchange = this.hashChange(callback)
        this.hashChange(callback)()  //首次进入页面的时候没有触发hashchange，必须要就单独调用一下
    }
    hashChange(callback){
        let self = this
        return function () {
            let hash = location.hash
            console.log(hash)
            for(let i=0;i<self.routers.length;i++){
                let route = self.routers[i]
                if(hash===route.path){
                    callback(route.render())
                    return
                }
            }
        }
    }
}
 
let router = new Router()
router.add('#index',()=>{
    return '<h1>这是首页内容</h1>'
}) 
router.add('#news',()=>{
    return  '<h1>这是新闻内容</h1>'
})
router.add('#user',()=>{
    return  '<h1>这是个人中心内容</h1>'
})
router.listen((renderHtml)=>{
    let app = document.getElementById('app')
    app.innerHTML = renderHtml
})
```

实现一个Router类，通过add方法添加路由配置，第一个参数为路由路径，第二个参数为render函数，返回要插入页面的html；通过listen方法，监听hash变化，并将每个路由返回的html，插入到app中。这样我们就实现了一个简单的hash路由。

### 2. history模式

hash模式看起来是比较丑的，都带个"#"号，我们也可以采取history模式，history就是我们平时看到的正常的连接形式。

history模式基于`window.history`对象的方法。

在HTML4中，已经支持`window.history`对象来控制页面历史记录跳转，常用的方法包括：

- `history.forward()`：在历史记录中前进一步
- `history.back()`：在历史记录中后退一步
- `history.go(n)`：在历史记录中跳转n步骤，n=0为刷新本页,n=-1为后退一页。

在HTML5中，`window.history`对象得到了扩展，新增的API包括：

- `history.pushState(data[,title][,url])`：向历史记录中追加一条记录
- `history.replaceState(data[,title][,url])`：替换当前页在历史记录中的信息。
- `history.state`：是一个属性，可以得到当前页的state信息。
- `window.onpopstate`：是一个事件，在点击浏览器后退按钮或js调用`forward()`、`back()`、`go()`时触发。监听函数中可传入一个event对象，`event.state`即为通过`pushState()`或`replaceState()`方法传入的data参数

history模式原理可以这样理解，首先我们要改造我们的超链接，给每个超链接增加onclick方法，阻止默认的超链接跳转，改用`history.pushState`或`history.replaceState`来更改浏览器中的url，并修改页面内容。由于通过history的api调整，并不会向后端发起请求，所以也就达到了前端路由的目的。

如果用户使用浏览器的前进后退按钮，则会触发`window.onpopstate`事件，监听页面根据路由地址修改页面内容。

也不一定非要用超链接，任意元素作为菜单都行，只要在点击事件中通过 history 进行调整即可。

```html
<!--html:-->
<ul id="menu">
    <li>
        <a href="/index">首页</a>
    </li>
    <li>
        <a href="/news">资讯</a>
    </li>
    <li>
        <a href="/user">个人中心</a>
    </li>
 
</ul>
<div id="app"></div>
```

```js
//js:
//改造超链接，阻止默认跳转，默认的跳转是会刷新页面的
document.querySelector('#menu').addEventListener('click',function (e) {
    if(e.target.nodeName ==='A'){
        e.preventDefault()
        let path = e.target.getAttribute('href')  //获取超链接的href，改为pushState跳转，不刷新页面
        window.history.pushState({},'',path)  //修改浏览器中显示的url地址
        render(path)  //根据path，更改页面内容
    }
})
 
function render(path) {
    let app = document.getElementById('app')
    switch (path) {
        case '/index':
            app.innerHTML = '<h1>这是首页内容</h1>'
            break
        case '/news':
            app.innerHTML = '<h1>这是新闻内容</h1>'
            break
        case '/user':
            app.innerHTML = '<h1>这是个人中心内容</h1>'
            break
        default:
            app.innerHTML = '<h1>404</h1>'
    }
}
//监听浏览器前进后退事件，并根据当前路径渲染页面
window.onpopstate = function (e) {
    render(location.pathname)
}
//第一次进入页面显示首页
render('/index')
```

上面这个写法太low，我们可以用类封装一下，通过 add 方法添加路由，通过 pushState 进行跳转，初始化时更改所以超链接的跳转方式:

```js
class Router {
    constructor(){
        this.routers = []
        this.renderCallback = null
    }
    add(route,callback){
        this.routers.push({
            path:route,
            render:callback
        })
    }
    pushState(path,data={}){
        window.history.pushState(data,'',path)
        this.renderHtml(path)
    }
    listen(callback){
        this.renderCallback = callback
        this.changeA()
        window.onpopstate = ()=>this.renderHtml(this.getCurrentPath())
        this.renderHtml(this.getCurrentPath())
    }
    changeA(){
        document.addEventListener('click', (e)=> {
            if(e.target.nodeName==='A'){
                e.preventDefault()
                let path = e.target.getAttribute('href')
                this.pushState(path)
            }
        })
    }
    getCurrentPath(){
        return location.pathname
    }
    renderHtml(path){
        for(let i=0;i<this.routers.length;i++){
            let route = this.routers[i]
            if(path===route.path){
                this.renderCallback(route.render())
                return
            }
        }
    }
}
  
let router = new Router()
router.add('/index',()=>{
    return '<h1>这是首页内容</h1>'
})
router.add('/news',()=>{
    return  '<h1>这是新闻内容</h1>'
})
router.add('/user',()=>{
    return  '<h1>这是个人中心内容</h1>'
})
router.listen((renderHtml)=>{
    let app = document.getElementById('app')
    app.innerHTML = renderHtml
})
```

当然，上面这个实现只是一个非常初级的 demo，并不能用于真正的开发场景，只是加深对前端路由的理解。

### 3. hash模式和history模式的区别

- hash 模式较丑，history 模式较优雅
- pushState 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，故只可设置与当前同文档的 URL
- pushState 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发记录添加到栈中
- pushState 通过 stateObject 可以添加任意类型的数据到记录中；而 hash 只可添加短字符串
- pushState 可额外设置 title 属性供后续使用
- hash 兼容IE8以上，history 兼容 IE10 以上
- history 模式需要后端配合将所有访问都指向 index.html，否则用户刷新页面，会导致 404 错误





































