---
title: JavaScript深入之变量对象
date: 1581315982785.1257
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# JavaScript深入之变量对象

当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。

对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

## 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

因为不同执行上下文下的变量对象稍有不同，来看全局上下文下的变量对象和函数上下文下的变量对象。

#### 全局上下文

**全局对象**是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。

在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。

例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。

* 可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。

  ```
  console.log(this);复制代码
  ```

* 全局对象是由 Object 构造函数实例化的一个对象。

  ```
  console.log(this instanceof Object);复制代码
  ```

* 预定义了一堆，嗯，一大堆函数和属性。

  ```
  // 都能生效
  console.log(Math.random());
  console.log(this.Math.random());复制代码
  ```

* 作为全局变量的宿主。

  ```
  var a = 1;
  console.log(this.a);复制代码
  ```

* 客户端 JavaScript 中，全局对象有 window 属性指向自身。

  ```
  var a = 1;
  console.log(window.a);
  
  this.window.b = 2;
  console.log(this.b);
  ```

全局上下文中的变量对象就是全局对象。

#### 函数上下文

在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。

活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

## 执行过程

执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：

1. 进入执行上下文
2. 代码执行

#### 进入执行上下文

当进入执行上下文时，这时候还没有执行代码

变量对象会包括：

* 函数的所有形参 (如果是函数上下文)
  * 由名称和对应值组成的一个变量对象的属性被创建

  * 没有实参，属性值设为 undefined

* 函数声明

  * 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建

  * 如果变量对象已经存在相同名称的属性，则完全替换这个属性

* 变量声明

  * 由名称和对应值（undefined）组成一个变量对象的属性被创建；

  * 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

举个例子：

```
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);复制代码
```

在进入执行上下文后，这时候的 AO 是：

```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```

#### 代码执行

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

还是上面的例子，当代码执行完后，这时候的 AO 是：

```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

到这里变量对象的创建过程就介绍完了，让我们简洁的总结我们上述所说：

1. 全局上下文的变量对象初始化是全局对象
2. 函数上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

练习：

```
console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
```

会打印函数，而不是 undefined 。

```
function foo() {
    console.log(a);
    a = 1;
}

foo(); // Uncaught ReferenceError: a is not defined

function bar() {
    a = 1;
    console.log(a);
}
bar(); // 1
```

















