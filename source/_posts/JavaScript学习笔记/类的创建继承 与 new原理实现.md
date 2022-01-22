---
title: 类的创建继承 与 new原理实现
date: 1588475838980.1306
tags:
- JavaScript
category:
- JavaScript学习笔记
---
## **目录**

#### [**1. 类的创建**](#jumpa)

* [**工厂模式**](#jump1)
* [**构造函数模式**](#jump2)
* [**原型模式**](#jump3)
* [**组合模式**](#jump4)

#### [**2. 类的继承**](#jumpb)

* [**原型链继承**](#jump5)
* [**构造继承**](#jump6)
* [**实例继承**](#jump7)
* [**拷贝继承**](#jump8)
* [**组合继承**](#jump9)
* [**寄生组合继承**](#jump10)

#### [**3. new 的原理实现**](#jumpc)

<br/>

**学习和参考于**：

[**JS定义类的六种方式详解**](https://www.jb51.net/article/84089.htm)

[**JS实现继承的几种方式**](https://www.cnblogs.com/humin/p/4556820.html)

[**JavaScript深入之创建对象的多种方式以及优缺点**](https://juejin.im/post/59128676128fe100586779cc)

[**js new一个对象的过程，实现一个简单的new方法**](https://www.cnblogs.com/echolun/p/10903290.html)

</br>

# <span id="jumpa">**（一）类的创建**</span>

### <span id="jump1">**1. 工厂模式**</span>

```js
function createPerson(name){
    //原料:
    var obj=new Object();
    //加工:
    obj.name=name;
    obj.showName=function(){
    alert(this.name);
    }
    //出场:
    return obj;
}

var p1=createPerson('小米');
p1.showName();
```

```js
var arr=new Array();//生成一个系统数组对象
```

与系统对象的区别：

* 系统对象是直接用**new**在外面生成，而工厂定义的是在函数内部生成

* 工厂定义的函数名称第一个是小写开头，而系统定义的是大写开头

**工厂模式的优缺点**：

* **优点**：实例可以识别为一个特定的类型

* **缺点**：每次创建实例时，每个方法都要被创建一次

### <span id="jump2">**2. 构造函数方式**</span>

```js
function Car(color,door){
    this.color = color;
    this.doors = door;
    this.showColor = function(){
    alert(this.color)
    };
}
var car1 = new Car(“red”,4);
var car2 = new Car(“blue”,4);
```

**构造函数模式的优缺点：**

* **优点**：实例可以识别为一个特定的类型

* **缺点**：每次创建实例时，每个方法都要被创建一次

**构造函数模式优化**：

```js
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
```

**优点**：解决了每个方法都要被重新创建的问题

### <span id="jump3">**3. 原型方式**</span>

该方式利用了对象的prototype属性。首先用空函数创建类名，然后所有的属性和方法都被赋予prototype属性。

```js
function Car(){
}
Car.prototype.color = “red”;
Car.prototype.doors = 4;
Car.prototype.showColor = function(){
alert(this.color);
}
var car1 = new Car();
var car2 = new Car();
```

在这段代码中，首先定义了一个空函数，然后通过prototype属性来定义对象的属性。调用该函数时，原型的所有属性都会立即赋予要创建的对象，所有该函数的对象存放的都是指向showColor()的指针，语法上看起来都属于同一个对象。但是这个函数没有参数，不能通过传递参数来初始化属性，必须要在对象创建后才能改变属性的默认值。

**原型模式的优缺点：**

* **优点**：方法不会重新创建

* **缺点**：所有的属性和方法都共享 、不能初始化参数。

  ```js
  //属性指向的是对象时，如数组：下面代码由于数组的引用值，Car的两个对象指向的都是同一个数组，所以当在car1添加值后，在car2中也可以看到。
  function Car(){
  }
  Car.prototype.color = “red”;
  Car.prototype.doors = 4;
  Car.prototype.arr = new Array(“a”,”b”);
  Car.prototype.showColor = function(){
  alert(this.color);
  }
  var car1 = new Car();
  var car2 = new Car();
  car1.arr.push(“cc”);
  alert(car1.arr); //output:aa,bb,cc
  alert(car2.arr); //output:aa,bb,cc
  ```

### <span id="jump4">**4. 组合模型**</span>

构造函数模式用于定义实例属性，原型模式则用于定义方法和共享的属性。这种混合模式不仅支持向构造函数传入参数，还最大限度地节约了内存，可谓是集两模式之长。推荐使用这种方式创建类（同类对象）

```js
function Car(color,door){
    this.color = color;
    this.doors = door;
    this.arr = new Array(“aa”,”bb”);
}
Car.prototype.showColor(){
    alert(this.color);
}
var car1 = new Car(“red”,4);
var car2 = new Car(“blue”,4);
car1.arr.push(“cc”);
alert(car1.arr); //output:aa,bb,cc
alert(car2.arr); //output:aa,bb
```

**优点**：该共享的共享，该私有的私有，使用最广泛的方式

**缺点**：有的人就是希望全部都写在一起，即更好的封装性

##### **还有几种创建方式，推荐查看**：

[**JavaScript深入之创建对象的多种方式以及优缺点**](https://www.jb51.net/article/84089.htm)

#  <span id="jumpb">**（二）类的继承**</span>

**这部分学习并摘自**：[**JS实现继承的几种方式**](https://www.cnblogs.com/humin/p/4556820.html)（建议直接阅读原文）

既然要实现继承，那么首先我们得有一个父类，代码如下：

```js
// 定义一个动物类
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function(food) {
  console.log(this.name + '正在吃：' + food);
};
```

### <span id="jump5">**1. 原型链继承**</span>

**核心：** 将父类的实例作为子类的原型

```js
function Cat() {

}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

var cat = new Cat;
console.log(cat.name);
console.log(cat.eat('fish'));
console.log(cat.sleep());
console.log(cat instanceof Animal); //true
console.log(cat instanceof Cat); //true
```

**特点**：

* 非常纯粹的继承关系，实例是子类的实例，也是父类的实例

* 父类新增原型方法/原型属性，子类都能访问到

* 简单，易于实现

**缺点**：

* 要想为子类新增属性和方法，必须要在`new Animal()`这样的语句之后执行，不能放到构造器中

* 无法实现多继承

* 来自原型对象的所有属性被所有实例共享（来自原型对象的引用属性是所有实例共享的）（详细请看附录代码： 示例1）

* 创建子类实例时，无法向父类构造函数传参

推荐指数：★★（后两个缺点是两大致命缺陷）

### <span id="jump6">**2. 构造继承**</span>

**核心：**使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）

```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```

**特点**：

* 解决了1中，子类实例共享父类引用属性的问题

* 创建子类实例时，可以向父类传递参数

* 可以实现多继承（call多个父类对象）

**缺点**：

* 实例并不是父类的实例，只是子类的实例

* 只能继承父类的实例属性和方法，不能继承原型属性/方法

* 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

推荐指数：★★（缺点3）

### <span id="jump7">**3. 实例继承**</span>

**核心：**为父类实例添加新特性，作为子类实例返回

```js
function Cat(name){
  var instance = new Animal();
  instance.name = name || 'Tom';
  return instance;
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // false
```

**特点**：

* 不限制调用方式，不管是`new 子类()`还是`子类()`,返回的对象具有相同的效果

**缺点**：

* 实例是父类的实例，不是子类的实例

* 不支持多继承

推荐指数：★★

### <span id="jump8">**4. 拷贝继承**</span>

```js
function Cat(name){
  var animal = new Animal();
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true
```

**特点**：

* 支持多继承

**缺点**：

* 效率较低，内存占用高（因为要拷贝父类的属性）

* 无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）

推荐指数：★（缺点1）

### <span id="jump9">**5. 组合继承**</span>

**核心：**通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();

Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
```

**特点**：

* 弥补了方式2的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法

* 既是子类的实例，也是父类的实例

* 不存在引用属性共享问题

* 可传参

* 函数可复用

**缺点**：

* 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）

推荐指数：★★★★（仅仅多消耗了一点内存）

### <span id="jump10">**6. 寄生组合继承**</span>

**核心：**通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

```js
function Cat(name) {
	Animal.call(this);
	this.name = name || 'Tom';
}
(function() {
	var Super = function(){};
	Super.prototype = Animal.prototype;
	Cat.prototype = new Super()
})()

console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true
```

**特点**：

* 堪称完美

**缺点**：

* 实现较为复杂

推荐指数：★★★★（实现复杂，扣掉一颗星）

### 7. 附录代码：

```js
function Animal (name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
  //实例引用属性
  this.features = [];
}
function Cat(name){
}
Cat.prototype = new Animal();

var tom = new Cat('Tom');
var kissy = new Cat('Kissy');

console.log(tom.name); // "Animal"
console.log(kissy.name); // "Animal"
console.log(tom.features); // []
console.log(kissy.features); // []

tom.name = 'Tom-New Name';
tom.features.push('eat');

//针对父类实例值类型成员的更改，不影响
console.log(tom.name); // "Tom-New Name"
console.log(kissy.name); // "Animal"
//针对父类实例引用类型成员的更改，会通过影响其他子类实例
console.log(tom.features); // ['eat']
console.log(kissy.features); // ['eat']

/*
原因分析：
关键点：属性查找过程
执行tom.features.push，首先找tom对象的实例属性（找不到），
那么去原型对象中找，也就是Animal的实例。发现有，那么就直接在这个对象的
features属性中插入值。
在console.log(kissy.features); 的时候。同上，kissy实例上没有，那么去原型上找。
刚好原型上有，就直接返回，但是注意，这个原型对象中features属性值已经变化了。
*/
```

# <span id="jumpc">**（三）new 原理实现**</span>

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

### 1. new一个对象中间做了什么操作

- 以构造器的prototype属性为原型，创建新对象；
- 将this(也就是上一句中的新对象)和调用参数传给构造器，执行；
- 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则舍弃掉第一步创建的新对象，返回手动return的对象。

new过程中会**新建对象**，此对象会继承**构造器的原型与原型上的属性**，最后它会被**作为实例返回**这样一个过程。

### 2. 实现

```js
function newMethod(){
  //拿到传入的参数中的第一个参数，即构造函数名Func
  let constr = [].shift.call(arguments);
  // 1.以构造器的prototype属性为原型，创建新对象：             
  let obj = Object.create(constr.prototype);
 // 2.将this和调用参数传给构造器执行 (使用apply，将构造函数中的this指向新对象，这样新对象就可以访问构造函数中的属性和方法)：
  let result = constr.apply(obj, arguments);
  // 3.如果构造器没有手动返回对象，则返回第一步的对象(构造函数的一个实例对象)
  return typeof result === "object" ? result : obj;
}
```

**测试**：

```js
// 构造器函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};

//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'echo', 26);
child.sayName() //'echo';

//最后检验，与使用new的效果相同
child instanceof Parent//true
child.hasOwnProperty('name')//true
child.hasOwnProperty('age')//true
child.hasOwnProperty('sayName')//false
```

