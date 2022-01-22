---
title: React 生命周期
date: 1597891733599.6355
tags:
- React
category:
- React学习笔记
---
## 一. React v16.3前的生命周期

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200819161542855.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)

### 1. 组件初始化initialization阶段

```
constructor()：初始化state
getDefaultProps():设置默认的props，也可以用defaultProps设置组件的默认属性
getInitialState():初始化state，可以直接在constructor中定义this.state
```

### 2. 组件挂载Mounting阶段

```
componentWillMount()：在组件挂载到DOM前调用，整个生命周期只会被调用一次，以后组件更新不会调用，此时可以修改state
render()：创建虚拟dom，进行diff算法，更新dom树都在此进行。
componentDidsMount()：组件挂载到DOM后调用，只会被调用一次。
```

### 3. 组件更新Updation阶段

```
componentWillReceiveProps(nextProps)：组件挂载时不调用，组件接受新的props时调用
shouldComponentUpdate(nextProps, nextState)：组件接收到新的props或者state时调用，return true就会更新dom(使用diff算法更新)，return false能阻止更新(不调用render)。
componentWillUpdate(nextProps, nextState)：在组件更新前调用，此时可以修改state
render()：创建虚拟dom，进行diff算法，更新dom树都在此进行。
componentDidUpdate():组件更新完成后调用
```

**造成组件更新的两类（三种）情况：**

#### **（1）父组件重新render**

父组件重新render引起子组件重新render的情况有两种：

* 子组件直接使用父组件传过来的props, 每当父组件重新render导致的重传props，子组件将直接跟着重新渲染，无论props是否有变化。可通过shouldComponentUpdate方法优化。

  ```js
  class Child extends Component {
     shouldComponentUpdate(nextProps){ // 应该使用这个方法，否则无论props是否有变化都将会导致组件跟着重新渲染
          if(nextProps.someThings === this.props.someThings){
            return false
          }
      }
      render() {
          return <div>{this.props.someThings}</div>
      }
  }
  ```

* 子组件在componentWillReceiveProps方法中，将props转换成自己的state。

  ```js
  class Child extends Component {
      constructor(props) {
          super(props);
          this.state = {
              someThings: props.someThings
          };
      }
      componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
          this.setState({someThings: nextProps.someThings});
      }
      render() {
          return <div>{this.state.someThings}</div>
      }
  }
  ```

  这里有个问题，每次组件接收到新的props或者使用setState更新state时，子组件都会重新渲染，除非用shouldComponentUpdate做了处理来阻止。那上面代码中根据新的props更新state，子组件是不是要进行两次渲染？回答否！

  在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。

  是因为componentWillReceiveProps中判断props是否变化了，若变化了，this.setState将引起state变化，从而引起render，此时就没必要再做第二次因重传props引起的render了，不然重复做一样的渲染了。

#### （2）组件本身调用setState

没有导致state的值发生变化的setState也会导致重渲染。可通过shouldComponentUpdate方法优化。

```js
class Child extends Component {
   constructor(props) {
        super(props);
        this.state = {
          someThings:1
        }
   }
   shouldComponentUpdate(nextStates){ // 应该使用这个方法，否则无论state是否有变化都将会导致组件重新渲染
        if(nextStates.someThings === this.state.someThings){
          return false
        }
    }

   handleClick = () => { // 虽然调用了setState ，但state并无变化
        const preSomeThings = this.state.someThings
         this.setState({
            someThings: preSomeThings
         })
   }

    render() {
        return <div onClick = {this.handleClick}>{this.state.someThings}</div>
    }
}
```

[【react】利用shouldComponentUpdate钩子函数优化react性能以及引入immutable库的必要性](https://www.cnblogs.com/penghuwan/p/6707254.html)

### 4. 组件卸载Unmounting阶段

```
componentWillUnmount()：组件卸载前调用，只调用一次
```

### 5. 错误处理

```
componentDidCatch(error, info)：任何一处的javascript报错会触发
```

## 二. React v16.3

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200819161606424.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)

* React16 新的生命周期弃用了componentWillMount、componentWillReceiveProps、componentWillUpdate

* 新增了getDerivedStateFromProps、getSnapshotBeforeUpdate代替弃用的三个钩子函数
* React16并没有删除那三个钩子函数，但是不能和新增两个钩子函数混用


## 三. React v16.4+

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081916162119.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)

```js
static getDerivedStateFromProps(props, state) {
 // ...
 return newState;
}
/**
注意是静态函数，实例无关。用来更新state，return null表示不需要更新，调用时机有2个：
(1)组件实例化完成之后
(2)re-render之前（类似于componentWillReceiveProps的时机）
配合componentDidUpdate使用，用来解决之前需要在componentWillReceiveProps里setState的场景，比如state依赖更新前后的props的场景
**/
```

```js
getSnapshotBeforeUpdate(prevProps, prevState) {
 // ...
 return snapshot;
}
/**
这个不是静态函数，调用时机是应用DOM更新之前，返回值会作为第3个参数传递给componentDidUpdate():
componentDidUpdate(prevProps, prevState, snapshot)
用来解决需要在DOM更新之前保留当前状态的场景，比如滚动条位置。类似的需求之前会通过`componentWillUpdate`来实现，现在通过`getSnapshotBeforeUpdate + componentDidUpdate`实现
**/
```

**学习于**:

[React-新的生命周期（React16版本）](https://segmentfault.com/a/1190000016617400)

[详解React生命周期(包括react16最新版)](https://www.jianshu.com/p/514fe21b9914)

[react-v16.3新生命周期总结](https://www.debug8.com/javascript/t_27291.html)

[React 生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)