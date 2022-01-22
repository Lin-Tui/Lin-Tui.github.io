---
title: react 路由
date: 1597891733573.7058
tags:
- React
category:
- React学习笔记
---
## 1. react-router 与 react-router-dom区别

[react-router与react-router-dom使用时的区别](https://www.cnblogs.com/menggirl23/p/10288477.html)

## 2. 示例

#### 安装：

首先进入项目目录，使用npm安装react-router-dom：

```
npm install react-router-dom --save-dev
```

#### 基础使用：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200819160211480.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)


**Class1.js**：

```js
import React, { Component } from 'react';

class Class1 extends Component {
    render() {
        return (
            <div>
                <h1>Class1</h1>
            </div>
        );
    }
}

export default Class1;
```

**Class2.js**：

```js
import React, { Component } from 'react';

class Class2 extends Component {
    render() {
        return (
            <div>
                <h1>Class2</h1>
            </div>
        );
    }
}

export default Class2;
```

**App.js**：

```js
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Class1 from './components/Class1';
import Class2 from './components/Class2';
function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/class1">class1</Link>
        <br />
        <Link to="/class2">class2</Link>
        <Route path="/class1" component={Class1} />
        <Route path="class2" component={Class2} />
      </div>
    </Router>

  );
}

export default App;
```

**入口文件 index.js**：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```

## 3. 路由基本组件

* `<BrowserRouter>`：使用Html5提供的history API来保持UI和URL的同步
* `<HashRouter>`：使用URL和hash来保持UI和URL的同步
* `<Link>`：是react路由中点击切换到哪一个组件的链接
* `<Route>`：代表了你的路由界面，path代表路径，component代表路径对应的界面。
* `<Switch>`：仅渲染与当前位置匹配的第一个子元素。
* exact：路由严格匹配模式，例：‘ink’ 与 '/'正常情况下他们是匹配的，严格模式下他们是不匹配的。

## 4. 嵌套路由

**Class1.js**：

```js
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

const Home = () => <h1>home</h1>;
const About = () => <h1>about</h1>

class Class1 extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>Class1</h1>
                    <Link to="/class1/">首页</Link>
                    <Link to="/class1/about">关于</Link>
                    <Route exact path="/class1/" component = {Home}/>
                    <Route path="/class1/about" component = {About} /> 
                </div>
            </Router>
        );
    }
}

export default Class1;
```

## 5. 路由传参

**Class1.js**：

```js
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

const Home = () => <h1>home</h1>;
// const About = (res) => {
//         console.log(res);
//         return <h1>about</h1>
//     }
const About = ({location, history,match}) => {
    console.log(match.params.title);
    return <h1>about</h1>
}
class Class1 extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>Class1</h1>
                    <Link to="/class1/">首页</Link>
                    <Link to="/class1/about/i-am-title">关于</Link>
                    <Route exact path="/class1/" component = {Home}/>
                    <Route path="/class1/about/:title" component = {About} /> 
                </div>
            </Router>
        );
    }
}

export default Class1;
```

## 6. `<Route>`的渲染方式

* **component**：一个React组件。当带有component参数的route匹配成功后，route会返回一个新的元素，其为component参数所对应的React组件。

* **render**：一个返回React element的函数。当匹配成功后调用该函数。该过程与传入component参数类似。

* **children**：一个返回React element的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。

**重定向 Redirect**：

Redirect重定向是路由的重定向，应该写在组件Route中，一般使用render来实现它。

```js
import {
    BroserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
...
<p><Link to='/class1/redirect'>redirect</Link></p>
...
<Route path='/class1/redirect' render={() => (
    	<Redirect to='/class/' />
    )}
```

**自定义链接**：

```js
const OldSchoolMenuLink = ({label, to, activeOnlyWhenExact}) => (
	<Route 
        path={to}
        children = {({match}) => (
        	<div className={match ? "active" : ""} >
            	{match ? ">" :""}
                <Link to={to}>{label}</Link>
            </div>
        )}
)
//使用
<OldSchoolMenuLink to="/about" label="About" />
```

## 7.  编程式导航

react-router提供了一个withRouter组件，withRouter可以包装如何自定义组件，将react-router的history，location，match三个对象传入。无需一级传递react-router的属性，当需要用的router属性的时候，将组件包一层withRouter，就可以拿到需要的路由信息。

```js
const RouterChange = withRouther(({history}) => (
	<div>
    	<button onClick={() => history.push('/class1/')}>跳转</button>
    </div>
))
```

## 8. 阻止跳转

```js
import {BrowserRouter as Router, Route, Link, Prompt} from 'react-router-dom';
<Prompt 
    when={this.state.isBlocking}
    message={location => `你确定要离开当前页面跳转至${location.pathname}`}
/>
```

使用Prompt组件：when为布尔值是否开启验证

message: string 当用户离开当前页面时，设置的提示信息。

```js
<Prompt message='确定要离开？'/>
```

message:func 当用户离开当前页面时，设置的回调函数

## 9. NavLink

`<NavLink>`是`<Link>`的一个特定的版本，会在匹配上当前的URL的时候给已经渲染的元素添加上参数。

* activeClassName（string）：设置选中的样式，默认值为active
* activeStyle（object）：当前元素被选中时，为此元素添加样式
* isActive（func）：判断链接是否激活的额外逻辑的功能

**学习于**：

[React全家桶之Router学习（一）](https://www.bilibili.com/video/BV1YC4y1p7LG?from=search&seid=7930184209219319256)

[React全家桶之Router学习（二）](https://www.bilibili.com/video/BV1eC4y1p74u?from=search&seid=7930184209219319256)

[React全家桶之Router学习（三）](https://www.bilibili.com/video/BV1MQ4y1P74J?from=search&seid=7930184209219319256)

**文档**：

[React Router 中文文档](http://react-guide.github.io/react-router-cn/docs/Introduction.html)