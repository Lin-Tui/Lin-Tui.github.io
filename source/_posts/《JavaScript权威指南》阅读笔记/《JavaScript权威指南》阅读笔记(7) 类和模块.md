---
title: 《JavaScript权威指南》学习笔记(7) 类和模块
date: 1581858886300.0518
tags:
- JavaScript
category:
- 《JavaScript权威指南》学习笔记
---
# 第9章 类和模块

在JavaScript中，类的实现是基于其原型继承机制。如果两个实例都从同一个原型对象上继承了属性，就说它们是同一个类的实例。如果两个对象继承自同一个原型，往往意味着（但不是绝对）它们是由同一个构造函数创建并初始化。

JavaScript中类的一个重要特性是“动态可继承”。

## 类和原型

在JavaScript中，类的所有实例对象都从同一个原型对象上继承属性。因此，原型对象是类的核心。

`inherit（）`这个函数返回一个新创建的对象，后者继承自某个对象。如果定义了一个原型对象，然后通过`inherit（）`函数创建一个继承自它的对象，这样就定义了一个JavaScript类。通常，类的实例还需要进一步初始化，通常是通过定义一个函数来创建并初始化这个新对象。

一个简单的JavaScript类：

```js
//实现一个能表示值的范围的类
//这个工厂方法返回一个新的“范围对象”
function range(from, to) {
//使用inherit（）函数来创建对象，这个对象继承自在下面定义的原型对象
//原型对象作为函数的一个属性存储，并定义所有“范围对象”所共享的方法
	var r = inherit(range.methods);
//存储新的“范围对象”的起始位置和结束位置（状态）
//这两个属性是不可继承的，每个对象都拥有唯一的属性
	r.from = from;
	r.to = to;
//返回新创建的对象
	return r;
}

//原型对象定义方法，这些方法为每个范围对象所继承
range.methods = {
//如果x在范围内，则返回true，否则返回false
//这个方法可以比较数字范围，也可以比较字符串和日期
	includes:function(x) {
		return this.from <= x && x <= this.to; },
	}
//对于范围内的每个整数都调用一次f
//这个方法只可用做数字范围
	foreach: function(f) {
		for(var x = Math.ceil(this.from); x <= this.to; f(x));
	},
//返回表示这个范围的字符串
	toString: function() {return "(" + this.from + "..." + this.to + ")";}
};

//这里是使用“范围对象”的一些例子
var r = range(1,3); //创建一个范围对象
r.includes(2); //true,2在这个范围内
r.foreach(console/log); //输出1 2 3
console.log(r); //输出(1...3)
```

## 类和构造函数

调用构造函数的一个重要特征是，构造函数的`prototype`属性被用来做新对象的原型。这意味着通过同一个构造函数创建的所有对象都继承自一个相同的对象，因此它们都是同一个类的成员。

对上一节中“范围类”做了修改，使用构造函数代替工厂函数：

```js
//不是值的范围的类的另一种实现：
//这是构造函数，用以初始化创建的“范围对象”
//注意，这里并没有创建并返回一个对象，仅仅是初始化
function Range(from, to) {
//存储“范围对象”的起始位置和结束位置（状态）
//这两个属性是不可继承的，每个对象都拥有唯一的属性
	this.from = from;
	this.to = to;
}

//所有的“范围对象”都继承自这个对象
//注意，属性的名字必须是"prototype"
Range.prototype = {
//如果x在范围内，则返回true，否则返回false
//这个方法可以比较数字范围，也可以比较字符串和日期范围
	includes:function(x) {
		return this.from <= x && x <= this.to; },
	}
//对于范围内的每个整数都调用一次f
//这个方法只可用做数字范围
	foreach: function(f) {
		for(var x = Math.ceil(this.from); x <= this.to; f(x));
	},
//返回表示这个范围的字符串
	toString: function() {return "(" + this.from + "..." + this.to 		+ ")";}
};
//这里是使用“范围对象”的一些例子
var r = range(1,3); //创建一个范围对象
r.includes(2); //true,2在这个范围内
r.foreach(console/log); //输出1 2 3
console.log(r); //输出(1...3)
```

两种写法一个非常重要的区别，就是原型对象的命名。在第一段示例代码中，原型是`range.methods`。在第二段示例代码中的原型是`Range.prototype`，这是一个强制的命名。对`Range()`构造的调用会自动使用`Range.prototype`作为新的Range对象的原型。

#### 1. 构造函数和类的标识
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200218085134606.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### 2. constructor属性

任何JavaScript函数都可以用做构造函数，并且调用构造函数是需要用到一个`prototype`属性的。因此，每个JavaScript函数（ECMASCript5中的`Function.bind（）`方法返回的函数除外）都自动拥有一个`prototype`属性。这个属性是一个对象，这个对象包含唯一一个不可枚举属性`constructor`。`constructor`属性的值是一个函数对象：

```js
var F = function() {}; // 这是一个函数对象
var p = F.prototype; // 这是F相关联的原型对象
var c = p.constructor; // 这是与原型相关的函数
c === F // true，对于任意函数F.prototype.constructor == F
```

## 类的扩充

JavaScript中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后原型的属性发生改变，也会影响到继承这个原型的所有实例对象。这意味着我们可以通过给原型对象添加新方法来扩充JavaScript类。

## 类和类型

下面介绍三种用以检测任意对象的技术：`instanceof`运算符，`constructor`属性，以及构造函数的名字。

#### 1. `instanceof`

`instanceof`运算符的左操作数是待检测其类的对象，右操作数是定义类的构造函数。

如果`o`继承自`c.prototype`，则表达式`o instanceof c`值为`true`。这里的继承可以不是直接继承，如果`o`所继承的对象继承自另一个对象，后一个对象继承自`c.prototype`，这个表达式的运算结果也是`true`。

`instanceof`运算符实际上是检测了对象的继承关系，而不是检测创建对象的构造函数。

那如果想检测对象的原型链上是否存在某个特定的原型对象，有没有不使用构造函数作为中介的方法？ 有！

可以使用`isPrototypeOf()`方法。比如，可以通过如下代码来检测对象r是否是之前说过的“范围类”的成员：

```
range.methods.isPrototypeOf(r); //range.method是原型
```

`instanceof`运算符和`isPrototypeOf()`方法的缺点是，我们无法通过对象来获得类名，只能检测对象是否属于指定的类名。

#### 2. constructor属性

另一种识别对象是否属于某个类的方法是使用`constructor`属性。

在JavaScript中并非所有对象都包含`constructor`属性。

#### 3. 构造函数的名称

使用`instanceof`运算符和`constructor`属性来检测对象所属的类有一个主要的问题，在多个执行上下文中存在构造函数的多个副本的时候，这两种函数看起来一模一样的，但它们是互相独立的对象，因此彼此也不相等。

一种可能的解决方案是使用构造函数的名字而不是构造函数本身作为类标识符。