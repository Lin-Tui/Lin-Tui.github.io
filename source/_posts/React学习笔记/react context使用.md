---
title: react context使用
date: 1597891733546.7766
tags:
- React
category:
- React学习笔记
---
Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行跨层级数据传递的方法，它设计目的就是为了共享那些对于一个组件树而言是“全局”的数据


## 一. 式例1

#### 1. 目录结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200819155135853.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)
#### 2. 基本使用

**global.js**：

```js
import React from "react";
export const globalData = {
    a: 1
}
export const globalContext = React.createContext(globalData);
```

**/public/index.html**:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <title>React App</title>
    <style>
      .app {
        border: 1px solid red;
        padding: 30px
      }
      .father {
        border: 1px solid blue;
        padding: 30px
      }
      .son {
        border: 1px solid pink;
        padding: 30px   
      }
    </style>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

**App.js**：

```js
import React, { Component } from 'react';
import { globalContext, globalData } from '../global';
import Father from '../components/Father';
const { Provider } = globalContext;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...globalData
    }
  }
  render() {
    return (
      <Provider value={this.state}>
        <div className="App">
          <h2>我是App组件</h2>
          <Father />
        </div>
      </Provider>
    );
  }
}

export default App;
```

**Father.js**：

```js
import React, { Component } from 'react';
import Son from './Son'
class Father extends Component {
    render() {
        return (
            <div className="father">
                <h2>我是Father组件</h2>
                <Son></Son>
            </div>
        );
    }
}

export default Father;
```

**Son.js**：

```js
//方式一：
import React, { Component } from 'react';
import { globalContext } from '../global';
class Son extends Component {
    render() {
        return (
            <div className="son">
                <h2>我是Son组件</h2>
                {this.context.a}
            </div>
        );
    }
}
Son.contextType = globalContext;
export default Son;
//方式二：
import React, { Component } from 'react';
import { globalContext } from '../global';
const { Consumer } = globalContext;
class Son extends Component {
    render() {
        return (
            <div className="son">
                <h2>我是Son组件</h2>
                <Consumer>
                    {
                        value => <h3>{value.a}</h3>
                    }
                </Consumer>
            </div>
        );
    }
}
export default Son;
```

#### 3. 修改状态

**global.js**

```js
import React from "react";
export const globalData = {
    a: 1
}
export const globalActions = self => ({
    add() {
        self.setState(state => ({
            a: state.a + 1
        }))
    },
    minus() {
        self.setState(state => ({
            a: state.a -1
        }))
    }
})
export const globalContext = React.createContext(globalData);
```

**App.js**:

```js
import React, { Component } from 'react';
import { globalContext, globalData, globalActions } from '../global';
import Father from '../components/Father';
const { Provider } = globalContext;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...globalData,
      ...globalActions(this)
    }
  }
  render() {
    return (
      <Provider value={this.state}>
        <div className="App">
          <h2>我是App组件</h2>
          <Father />
        </div>
      </Provider>
    );
  }
}

export default App;
```

**Son.js**:

```js
import React, { Component } from 'react';
import { globalContext } from '../global';
class Son extends Component {
    add1() {
        this.context.add()
    }
    minus1() {
        this.context.minus()
    }
    render() {
        return (
            <div className="son">
                <h2>我是Son组件</h2>
                {this.context.a} 
                <button onClick={this.add1.bind(this)}>点我 +1</button>
                <button onClick={this.minus1.bind(this)}>点我 -1</button>
            </div>
        );
    }
}
Son.contextType = globalContext;
export default Son;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200819155228131.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)


## 二. 示例2

#### 1. 目录结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200819155257816.png#pic_center)

#### 2. 基本使用-方法一

**someData.js**:

```js
import React from "react";
const Context = React.createContext();
class SomeData extends React.Component {
    constructor() {
        super()
        this.state = {
            people: [
                {
                    name: "xiaoming",
                    age: 12,
                    sex: "male"
                },
                {
                    name: "xiaohong",
                    age: 11,
                    sex: "female"
                }
            ]
        }
    }
    render() {
        return (
            <Context.Provider value={this.state.people}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
```

**App.js**:

```js
import React from 'react';
import { SomeData } from './SomeData';
import Display from './Display'
function App() {
    return (
        <div className="App">
          <SomeData>
            <Display />
          </SomeData>
        </div>
    );
}
export default App;
```

**Display.js**:

```js
import React from 'react';
import { Context } from './SomeData';
export default function Display() {
    const val = React.useContext(Context);
    return (
        <div>
            <h1>name: {val[0].name}</h1>
            <h1>name: {val[0].age}</h1>
        </div>
    )
}
```

#### 3. 基本使用-方法二

**someData.js**:

```js
import React from "react";
export const Context = React.createContext();
export class SomeData extends React.Component {
    constructor() {
        super()
        this.state = {
            people: [
                {
                    name: "xiaoming",
                    age: 12,
                    sex: "male"
                },
                {
                    name: "xiaohong",
                    age: 11,
                    sex: "female"
                }
            ]
        }
    }
    render() {
        return (
            <Context.Provider value={this.state.people}>
                {this.props.children}
            </Context.Provider>
        )
    }
}
export const ContextConsumer = Context.Consumer
```

**Display.js**:

```js
import React from 'react';
import { ContextConsumer } from './SomeData';
export default function Display() {
    return (
        <ContextConsumer>
            {value => value.map(val => {
                return (
                    <div key={val.name}>
                        <h1>name: {val.name}</h1>
                        <h1>age: {val.age}</h1>
                    </div>
                )
            })}
        </ContextConsumer>
    )
}
```



[React 中文文档 context](https://reactjs.bootcss.com/docs/context.html)