---
title: ES6 class
date: 1584273192355.6184
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# class

传统的javascript中只有对象，没有类的概念。它是基于原型的面向对象语言。原型对象特点就是将自身的属性共享给新对象。

如果要生成一个对象实例，需要先定义一个构造函数，然后通过new操作符来完成。构造函数示例：

```js
//函数名和实例化构造名相同且大写（非强制，但这么写有助于区分构造函数和普通函数）
function Person(name,age) {
    this.name = name;
    this.age=age;
}
Person.prototype.say = function(){
    return "我的名字叫" + this.name+"今年"+this.age+"岁了";
}
var obj=new Person("laotie",88);//通过构造函数创建对象，必须使用new 运算符
console.log(obj.say());//我的名字叫laotie今年88岁了
```

构造函数生成实例的执行过程：

1. 当使用了构造函数，并且new 构造函数(),后台会隐式执行new Object()创建对象;
2. 将构造函数的作用域给新对象，（即new Object()创建出的对象），而函数体内的this就代表new Object()出来的对象。
3. 执行构造函数的代码。
4. 返回新对象（后台直接返回）;

ES6引入了Class（类）这个概念，通过class关键字可以定义类。该关键字的出现使得其在对象写法上更加清晰，更像是一种面向对象的语言。如果将之前的代码改为ES6的写法就会是这个样子：

```js
class Person{//定义了一个名字为Person的类
    constructor(name,age){//constructor是一个构造方法，用来接收参数
        this.name = name;//this代表的是实例对象
        this.age=age;
    }
    say(){//这是一个类的方法，注意千万不要加上function
        return "我的名字叫" + this.name+"今年"+this.age+"岁了";
    }
}
var obj=new Person("laotie",88);
console.log(obj.say());//我的名字叫laotie今年88岁了
```

#### 注意点：

1. 在类中声明方法的时候，千万不要给该方法加上function关键字
2. 方法之间不要用逗号分隔，否则会报错

3. **class不存在变量提升**，所以需要先定义再使用。因为ES6不会把类的声明提升到代码头部

除了通过prototype属性对类添加方法，还可以通过Object.assign方法来为对象动态增加方法。

```js
Object.assign(Person.prototype,{
    getName:function(){
        return this.name;
    },
    getAge:function(){
        return this.age;
    }
})
var obj=new Person("laotie",88);
console.log(obj.getName());//laotie
console.log(obj.getAge());//88
```

#### get 与 set 用法

在 Class 内部可以使用get和set关键字， 对某个属性设置存值函数和取值函数， 拦截该属性的存取行为。

```js
class MyClass {
    constructor() {
        // ...
    }
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: ' + value);
    }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```

上面代码中， prop属性有对应的存值函数和取值函数， 因此赋值和读取行为都被自定义了。



学习自：

[es6中class类的全方面理解](https://www.jianshu.com/p/86267fab4878)