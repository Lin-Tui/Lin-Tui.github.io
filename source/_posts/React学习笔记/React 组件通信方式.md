---
title: React 组件通信方式
date: 1597891733637.534
tags:
- React
category:
- React学习笔记
---
需要组件之间进行通信的几种情况

- 父组件向子组件通信
- 子组件向父组件通信
- 跨级组件通信
- 没有嵌套关系组件之间的通信

### 1. 父组件向子组件通信

React数据流动是单向的,父组件向子组件通信也是最常见的;父组件通过props向子组件传递需要的信息。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081916071520.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)


**父组件PageA**：

```js
import React, { Component } from 'react';
import ChildA from '../components/ChildA';
class pageA extends Component {
    render() {
        return (
            <div>
                pageA
                <ChildA name="tom" />
            </div>
        );
    }
}
//函数组件：
function pageA() {
    return (
        <div>
            pageA
            <ChildA name="Eve" />
        </div>
    )
}
export default pageA;
```

**子组件ChildA**：

```js
import React, { Component } from 'react';
class ChildA extends Component {
    render() {
        return (
            <div>
                ChildA: my name is {this.props.name}
            </div>
        );
    }
}
//函数组件：
function ChildA(props) {
    return (
        <div>
            ChildA: my name is {props.name}
        </div>
    )
}
export default ChildA;
```

### 2. 子组件向父组件通信

利用自定义事件，触发回调

**子组件ChildA**：

```js
import React, { Component } from 'react';

class ChildA extends Component {
    constructor(props) {
        super(props)
        this.state = {data:''}
    }
    valueChange = data => {
        this.setState({
            data: data.target.value
        })
        this.props.transferValue(data.target.value)
    }
    render() {
        return (
            <div>
                ChildA
                <input value={this.state.data} onChange={this.valueChange} />
            </div>
        );
    }
}
//函数组件的方式：

export default ChildA;
```

**父组件**：

```js
import React, {Component } from 'react';
import ChildA from '../components/ChildA'
class pageA extends Component {
    constructor(props) {
        super(props)
        this.state = {data: ''}
    }
    childValue = data => {
        this.setState({data})
    }
    render() {
        return (
            <div>
                pageA: 子组件ChildA传递过来的值：{this.state.data}
                <ChildA transferValue={this.childValue} />
            </div>
        );
    }
}
export default pageA;
```

### 3. 跨级组件通信

[聊一聊我对 React Context 的理解以及应用](https://www.jianshu.com/p/eba2b76b290b?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法，它设计目的就是为了共享那些对于一个组件树而言是“全局”的数据

Context API的使用基于生产者消费者模式。生产者一方，通过组件静态属性childContextTypes声明，然后通过实例方法getChildContext()创建Context对象。消费者一方，通过组件静态属性contextTypes申请要用到的Context属性，然后通过实例的context访问Context的属性。

**旧版本context使用方法：**

**父组件PageB**：（生产者）

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ChildB from '../components/ChildB';
class PageB extends Component {
    static childContextTypes = {
        propsB: PropTypes.string,
        methodB: PropTypes.func
    }
    // 声明Context对象属性
    getChildContext() {
        return {
            propsB: 'propsB',
            methodB: () => 'methodB'
        }
    }
     // 返回Context对象，方法名是约定好的
    render() {
        return (
            <ChildB />
        );
    }
}

export default PageB;
```

**子组件ChildB**：

```js
import React, { Component } from 'react';
import ChildC from './ChildC';
class ChildB extends Component {
    render() {
        return (
            <ChildC />
        );
    }
}

export default ChildB;
```

**子组件ChildC**：（消费者）

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types'
class ChildC extends Component {
     // 声明需要使用的Context属性
    static contextTypes = {
        propsB: PropTypes.string,
        methodB: PropTypes.func
    }
    render() {
        const {propsB, methodB} = this.context;
        console.log("!111111")
        console.log(propsB)
        let res = methodB()
        console.log(res)
        return (
            <div>
                ChildC
            </div>
        );
    }
}

export default ChildC;
```

**react升级后：**

[React：Context 使用](https://blog.csdn.net/weixin_46124214/article/details/108102826)

### 4. 非嵌套组件间通信

发布者通过emit事件触发方法，发布订阅消息给订阅者。

订阅者通过emitter.**addListener**(事件名称,函数名)方法，进行事件监听(订阅)。
订阅者通过emitter.**removeListener**(事件名称,函数名)方法 ，进行事件销毁(取消订阅)

**父组件pageC**（发布者）：

```js
import React, { Component } from 'react';
import Custom1 from '../components/Custom1';
import Custom2 from '../components/Custom2';
import emitter from '../Evt'
class PageC extends Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        emitter.emit('callCustom', 'Hello 我来发信息啦')
    }
    render() {
        return (
            <div>
                PageC
                <button onClick={this.handleClick}>点击发布事件</button>
                <Custom1 />
                <Custom2 />
            </div>
        );
    }
}

export default PageC;
```

**子组件Custom1（订阅者）**：

```js
import React, { Component } from 'react';
import emitter from '../Evt.js';

class Custom1 extends Component {
    constructor() {
        super();
        this.state = {
            msg:''
        }
    }
    componentDidMount() {
        emitter.addListener('callCustom', (msg) => {
            this.setState({
                msg: 'Custom1收到信息--' + msg
            })
        })
    }
    componentWillUnmount() {
        emitter.removeListenner('callCustom', (msg) => {
            this.setState({
                msg: 'Custom1即将销毁此信息' + msg
            })
        })
    }
    render() {
        return (
            <div style={{color:'red'}}>
                {this.state.msg}
            </div>
        );
    }
}

export default Custom1;
```

**子组件Custom2（订阅者）**：

```js
import React, { Component } from 'react';
import emitter from '../Evt'
class Custom2 extends React.Component {

    constructor(){
      super();
      this.state= {
        msg:''
      }
    }
  
    componentDidMount () { //在组件挂载完成后声明一个自定义事件
      emitter.addListener('callCustom', (msg) => {
        this.setState({
          msg: 'Custom2收到消息--'+msg
        })
      })
    }
  
    componentWillUnmount () { //组件销毁前移除事件监听
      emitter.removeListener('callCustom', (msg) => {
        this.setState({
          msg: 'Custom2即将销毁此消息--'+ msg
        })
      })
    }
  
    //订阅者2消息显示
    render () {
      return(<p style={{color:'blue'}}>{this.state.msg}</p>) 
    }
  }
  export default Custom2;
```