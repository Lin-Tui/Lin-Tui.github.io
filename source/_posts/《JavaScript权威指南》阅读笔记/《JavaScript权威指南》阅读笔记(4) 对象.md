---
title: 《JavaScript权威指南》学习笔记(4) 对象
date: 1581573441434.0002
tags:
- JavaScript
category:
- 《JavaScript权威指南》学习笔记
---
# 第六章 对象

对象是一种复合值：它将很多值聚合在一起，可通过名字访问这些值。

JavaScript对象是动态的，可以新增属性也可以删除属性。

对象也可以看做属性的无序集合，每个属性都是一个名/值对。属性名是字符串。

属性包括名字和值。属性名可以包括空字符在内的任意字符串，但对象不能存在同名的属性。值可以是任意JavaScript值，或者可以是一个`getter`或`setter`函数。

**除了名字和值之外。每个属性还有一些与之相关的值，称为“属性特性”**：

- 可写：表明是否可以设置该属性的值。
- 可枚举：表明是否可以通过`for/in`循环返回该属性。
- 可配置：表明是否可以删除或修改该属性。

**除了包括属性之外，每个对象还拥有三个相关的对象特性**：

- 对象的原型：指向另外一个对象，本对象的属性继承自它的原型对象。
- 对象的类：是一个标识对象类型的字符串。
- 对象的扩展：标记指明了是否可以向该对象添加新属性。

**用下面这些术语来对三类JavaScript对象和两类属性作区分**：

- 内置对象：是由ECMAScript规范定义的对象或类。例如，数组，函数，日期和正则表达式都是内置对象。
- 宿主对象：是由JavaScript解释器所嵌入的宿主环境（比如web浏览器）定义的。客户端JavaScript中表示网页结构的HTMLElement对象均是宿主对象。既然宿主环境定义的方法可以当成普通的JavaScript函数对象，那么宿主对象也可以当成内置对象。
- 自定义对象：是由运行中的JavaScript代码创建的对象。
- 自有属性是直接在对象中定义的属性。
- 继承属性：是在对象的原型对象中定义的属性。

## 创建对象

可以通过对象直接量，关键字`new`和`Object.create（）`函数来创建对象。

#### 1. 对象直接量

```
var empty = {}; //没有任何属性的对象
var point1 = { x: 0, y: 0}; //两个属性
var point2 = { x: point.x, y: point.y + 1 }; //更复杂的值
var book = {
	"main title": "JavaScript", //属性名字里有空格，必须用字符串表示
	"sub-title": "The Definitive Cuide"; //属性名字里有连字符，必须用字符串表示
	"for": "all audience"; //“for”是保留字，因此必须用引号
	author: { //这个属性的值是一个对象
		firstname: "David", //注意，这里的属性名都没有引号
		surname: "Flanage"
	}
}
```

对象直接量是一个表达式，这个表达式的每次运算都创建并初始化一个新的对象。每次计算对象直接量的时候，也都会计算它的每个属性的值。也就是说，如果在一个重复调用的函数中的循环体内使用了对象直接量，它将创建很多新对象，并且每次创建的对象的属性值也有可能不同。

#### 2. 通过new创建对象

`new`运算符创建并初始化一个新对象。关键字`new`后面跟随一个函数调用。

这里的函数称做构造函数，构造函数用以初始化一个新创建的对象。

JavaScript语言核心中的原始类型都包含内置构造函数。

```
var o = new Object(); //创建一个空对象，和{}一样
var a = new Array(); //创建一个空数组，和[]一样
var d = new Date(); //创建一个表示当前时间的Date对象
var r = new RegExp("js"); //创建一个可以进行模式匹配的RegExp
```

#### 3. 原型

每一个JavaScript对象都和另一个对象相关联。“另一个”对象就是我们熟知的原型。每一个对象都从原型继承属性。

所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过JavaScript代码`Object.prototype`获得对原型对象的引用。

通过关键字new和构造函数创建的对象的原型就是构造函数的`prototype`属性的值。

因此，同使用{}创建对象一样，通过`new Object()`创建的对象也继承自`Object.prototype`。

通过`new Array()`创建的对象的原型就是`Array.prototype`，通过`new Date()`创建的对象的原型就是`Date.prototype`。

没有原型的对象为数不多，`Object.prototype`就是其中之一。它不继承任何属性。其他原型对象都是普通对象，普通对象都具有原型。

所有的内置构造函数，都具有一个继承自`Object.prototype`的原型。例如，`Date.prototype`的属性继承自`Object.protype`，因此由new Date()创建的Date对象的属性同时继承自`Date.prototype`和`Object.prototype`。这一系列链接的原型对象就是所谓的“原型链”

#### 4. Object.create()

它创建一个新对象，其中第一个参数是这个对象的原型，`Object.create()`提供第二个可选参数，用以对对象的属性进行进一步描述。

`Object.create()`是一个静态函数，而不是提供给某个对象调用的方法。使用它的方法很简单，只须传入所需的原型对象即可。

```
var o1 = Object.create({x: 1, y: 2}); //o1继承了属性x和y
```

可以通过传入参数`null`来创建一个没有原型的新对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法，比如`toString()`

```
var o2 = Object.create(null); //o2不继承任何属性和方法
```

如果想创建一个普通的对象（比如通过`{}`或`new Object()`创建的对象），需要传入`Object.prototype`:

```
var o3 = Object.create(Object.prototype);//o3和{}和new Object()一样
```

## 属性的查询和设置

可以通过点（`.`）或方括号（`[]`）运算符来获取属性的值。

对于点（`.`）来说，右侧必须是一个以属性名称命名的简单标识符。

对于方括号(`[]`)，方括号内必须是一个计算结果为字符串的表达式，这个字符串就是属性的名字：

```
var author = book.author; //得到book的“author”属性
var name = author.surname //得到author的“surname”属性
var title = book["main title"] //得到book的“main title”
```

和查询属性值的写法一样，通过点和方括号也可以创建属性或给属性赋值。但需要将它们放在赋值表达式的左侧：

```
book.edition = 6;
book["main title"] = "ECMAScript";
```

#### 1. 作为关联数组的对象

下面两个JavaScript表达式的值相同：

```
object.property
object["property"]
```

其中第二种语法使用方括号和一个字符串，看起来更像数组，只是这个数组元素是通过字符串引索而不是数字索引。这种数组就是我们所说的关联数组。

JavaScript对象都是关联数组。

#### 2. 继承

JavaScript对象具有“自有属性”，也有一些属性是从原型对象继承而来的。

假设要查询对象o的属性x，如果o中不存在，那么将会继续在o的原型对象中查询属性x。如果原型对象中也没有x，但这个原型对象也有原型，那么继续在这个原型对象的原型对象的原型上执行查询，直到找到x或者查找到一个原型是null的对象为止。

可以看到，对象的原型属性构成了一个“链”，通过这个“链”可以实现属性的继承。

```
var o = {} //o从Object.prototype继承对象的方法
o.x = 1; //给o定义一个属性x
var a = inherit(o); // a继承o和Object.prototype
a.y = 2; // 给a定义一个属性y
var b = inherit(a); // 给b定义一个属性z
b.z = 3; //
var s = b.toString(); // toString继承自Object.protoype
b.x + b.y //3 ,x和y分别继承自o和a
```

假设给对象的属性x赋值，如果o中已经有属性x，那么这个赋值操作只改变这个已有属性x的值。如果o中不存在属性x，那么赋值操作给o添加一个新属性x。如果之前o继承自属性x，那么这个继承的属性就被创建的同名属性覆盖了。

属性赋值操作首先检查原型链，以此判定是否允许赋值操作。如果o继承自一个只读属性，那么赋值操作是不允许的。如果允许属性赋值操作，它也总是在原始对象上创建属性或对已有属性赋值，而不会去修改原型链。

在JavaScript中，只有在查询时才会体会到继承的存在，而设置属性则和继承无关，这是JavaScript的一个重要特性，该特性让程序员可以有选择地覆盖继承的属性。

```
var unitcircle = {r: 1}; // 一个用来继承的对象
var c = inherit(unitcircle); //c继承属性r
c.x = 1;c.y = 1; //c定义两个属性
c.r = 2; //c覆盖继承来的属性
unitcircle.r; //1 ， 原型对象没有修改
```

#### 3. 属性访问错误

属性访问并不总是返回或设置一个值。

查询一个不存在的属性并不会报错，如果在对象o自身的属性或继承的属性均未找到属性x，属性访问表达式o.x返回undefined。

但是，如果对象不存在，那么试图查询这个不存在的对象的属性就会报错。null和undefined值都没有属性，因此查询这些值的属性会报错。给null和undefined设置属性也会报类型错误。

给其他值设置属性也不总是成功，有一些属性是只读的，不能重新赋值，有一些对象不允许新增属性，但让人颇感意外的是，这些设置属性的失败操作不会报错。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210259170.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

## 删除属性

`delete`运算符可以删除对象的属性。它的操作数应当是一个属性访问表达式。

`delete`只是断开属性和宿主对象的联系，而不会去操作属性中的属性：

```
delete book.author; //book不再有属性author
delete book["main title"]; //book也不再有属性"main title"
```

`delete`运算符只能删除自有属性，不能删除继承属性（要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响所有继承自这个原型的对象。）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210316728.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210328298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
## 检测属性

我们经常会检测集合中成员的所属关系-----判断某个属性是否在于某个对象中。可以

#### 1. in运算符

通过`in`运算符，`hasOwnPreperty()`和`propertyIsEnumerable()`方法来完成这个工作，甚至仅通过属性查询也可以做到这一点。

```
var o = { x: 1}

"x" in o; //true ， “x”是o的属性
"y" in o; //false，“y”不是o的属性
"toString" in o; //true，o继承toString属性
```

#### 2. hasOwnProperty()方法

用来检测给定的名字是否是对象的自有属性。对于继承属性它将返回false

```
var o = {x: 1}
o.hasOwnProperty("x"); //true：有一个自有属性x
o.hasOwnProperty("y"); //false：o中不存在属性y
o.hasOwnProperty("toString"); // false:toString是继承属性
```

#### 3. propertyIsEnumerable()方法

是`hasOwnProperty()`方法的增强版，只有检测到是自有属性且这个属性的可枚举性为`true`时，它才返回`true`。

某些内置属性是不可枚举的。通常由JavaScript代码创建的属性都是可枚举的，除法在ECMAScript中使用严格特殊的方法来改变属性的可枚举性。

```
var o = inherit({y: 2});
o.x = 1;
o.propertyIsEnumerable("x"); //true,o有一个可枚举的自有属性
o.propertyIsEnumerable("y"); //false，y是继承来的
Object.prototype.propertyIsEnumerable("toString"); //false，不可枚举
```

#### 4. “！==”

可以用来判断严格属性是否是`undefined`：

```
var o = {x:1}
o.x !== undefined; //true
o.y !== undefined; //false:o中没有属性y
o.toString !== undefined; //true:o继承了toString属性

//注意：
var o = { x: undefined } //属性被显式赋值为undefined
o.x !== undefined //false，属性存在，但为undefined
o.y !== undefined //false，属性不存在
"x" in o //true
"y" in o //false
delete o.x; //删除了属性x
"x" in o //false
```

## 属性getter和setter

在ECMAScript5中，属性值可以用一个或两个方法替代，这两个方法就是`getter`和`setter`。由`getter`和`setter`定义的属性称做“存取器属性”，它不同于“数据属性”，数据属性只有一个简单的值。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210652284.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210527535.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
JavaScript把`getter`和`setter`函数当做对象的方法来调用，也就是说，在函数体内的this指向表示这个点的对象。

和数据属性一样，存取器属性是可以继承的。

因此可以将上述代码中的对象p当做另一个“点”的原型。可以给新对象定义它的x和y属性，但r和theta属性是继承来的：

```
var q = inherit(p); //创建一个继承getter和setter的新对象
q.x = 1,q.y = 1; //给q添加两个属性
console.log(q.r); //可以使用继承的存取器属性
console.log(q.theta);
```

## 属性的特性

除了包含名字和值外，属性还包含一些标识它们可写，可枚举和可配置的特性。

在ECMAScript3中无法设置这些特性，所有通过ECMASCript3的程序创建的属性都是可写的，可枚举的和可配置的，且无法对这些特性做修改。下面讲述ECMAScript5中查询和设置这些特性的API。

可以通过这些API给原型对象添加方法，并将它们设置成不可枚举的，让他们看起来更像内置方法。还可以通过这些API给对象定义不能修改或删除的属性，借此“锁定”这个对象。

## 对象的三个属性

每个对象都有与之对应的原型（prototype），类（class）和可拓展性（extensible attribute）。

#### 1. 原型属性

对象的原型属性是用来继承属性的。

想要检测一个对象是否是另一个对象的原型（或处于原型链中），请使用`isPrototypeOf（）`方法。

例如，可以使用`p.isPrototypeOf(o)`来检测p是否是o的原型：

```
var p = {x: 1}; //定义一个原型对象
var o = Object.create(p); // 使用这个原型创建一个对象
p.isPrototypeOf(o) // true：o继承自p
Object.prototype.isPrototypeOf(o) //true：p继承自Object.prototype
```

#### 2. 类属性

#### 3. 可扩展性

## 对象方法

所有JavaScript对象都从`Object.prototype`继承属性（除了那些不通过原型显式创建的对象）。这些继承属性主要是方法。

下面将对定义在`Object.prototype`里的对象方法展开讲解，这些方法非常好用而且使用广泛，但一些特定的类会重写这些方法。

#### 1. toString()方法

`toString（）`方法没有参数，它将返回一个表示这个方法的对象值的字符串。

在需要将对象转换为字符串的时候，JavaScript都会调用这个方法。比如，当使用“+”运算符连接一个字符串和一个对象时或者希望使用字符串的方法中使用了对象时都会调用`toString（）`。

默认的`toString（）`方法的返回值带有的信息量很少。

```
var s = {x: 1,y: 1}.toString();
```

因此很多类都带有自定义的`toString（）`。

#### 2. toLocaleString（）方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210507919.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### 3. toJSON（）方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210455448.png)

#### 4. valueOf()方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213210444408.png)