---
title: 重新认识JavaScript面向对象 从ES5到ES6
date: 1584424518966.1074
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# 重新认识JavaScript面向对象: 从ES5到ES6

## 一. 重新认识面向对象

#### 1. JavaScript是一门面向对象的语言

在说明JavaScript是一个面向对象的语言之前, 我们来探讨一下面向对象的三大基本特征:  **封装**, **继承**, **多态**。

**封装**

> 把抽象出来的属性和对方法组合在一起, 且属性值被保护在内部, 只有通过特定的方法进行改变和读取称为封装

我们以代码举例, 首先我们构造一个`Person`构造函数, 它有`name`和`id`两个属性, 并有一个`sayHi`方法用于打招呼:

```javascript
//定义Person构造函数
function Person(name, id) {
  this.name = name;
  this.id = id;
}

//在Person.prototype中加入方法
Person.prototype.sayHi = function() {
  console.log('你好, 我是' +  this.name);
}
```

现在我们生成一个实例对象`p1`, 并调用`sayHi()`方法

```javascript
//实例化对象
let p1 = new Person('阿辉', 1234);

//调用sayHi方法
p1.sayHi();
```

在上述的代码中, `p1`这个对象并不知道`sayHi()`这个方法是如何实现的, 但是仍然可以使用这个方法. 这其实就是**封装**. 你也可以实现对象属性的私有和公有, 我们在构造函数中声明一个`salary`作为私有属性, 有且只有通过`getSalary()`方法查询到薪资.

```javascript
function Person(name, id) {
  this.name = name;
  this.id = id;
  let salary = 20000;
  this.getSalary = function (pwd) {
    pwd === 123456 ? console.log(salary) : console.log('对不起, 你没有权限查看密码');
  }
}
```

**继承**

> 可以让某个类型的对象获得另一个类型的对象的属性和方法称为继承

以刚才的`Person`作为父类构造器, 我们来新建一个子类构造器`Student`, 这里我们使用`call()`方法实现继承

```javascript
function Student(name, id, subject) {
  //使用call实现父类继承
  Person.call(this, name, id);
  //添加子类的属性
  this.subject = subject;
}

let s1 = new Student('阿辉', 1234, '前端开发');
```

**多态**

> 同一操作作用于不同的对象产生不同的执行结果, 这称为多态

JavaScript中函数没有重载， 所以JavaScript中的多态是靠函数覆盖实现的。

同样以刚才的`Person`构造函数为例, 我们为`Person`构造函数添加一个`study`方法

```javascript
function Person(name, id) {
  this.name = name;
  this.id = id;
  this.study = function() {
    console.log(name + '在学习');
  }
}
```

同样, 我们新建一个`Student`和`Teacher`构造函数, 该构造函数继承`Person`, 并也添加`study`方法

```javascript
function Student(subject) {
  this.subject = subject;
  this.study = function() {
    console.log(this.name + '在学习' + this.subject);
  }
}
Student.prototype = new Person('阿辉', 1234);
Student.prototype.constructor = Student;

function Teacher(subject) {
  this.subject = subject;
  this.study = function() {
    console.log(this.name + '为了教学而学习' + this.subject);
  }
}
Teacher.prototype = new Person("老夫子", 4567);
Teacher.prototype.constructor = Teacher;
```

测试我们新建一个函数`doStudy`

```jsx
function doStudy(role) {
  if(role instanceof Person) {
    role.study();
  }
}
```

此时我们分别实例化`Student`和`Teacher`, 并调用`doStudy`方法

```javascript
let student = new Student('前端开发');
let teacher = new Teacher('前端开发');

doStudy(student); //阿辉在学习前端开发
doStudy(teacher); //老夫子为了教学在学习前端开发
```

对于同一函数`doStudy`， 由于参数的不同， 导致不同的调用结果，这就实现了多态.

**JavaScript的面向对象**
 从上面的分析可以论证出, JavaScript是一门面向对象的语言, 因为它实现了面向对象的所有特性. 其实, 面向对象仅仅是一个概念或者一个编程思想而已, 它不应该依赖于某个语言存在, 比如Java采用面向对象思想构造其语言, 它实现了类, 继承, 派生, 多态, 接口等机制. 但是这些机制，只是实现面向对象的一种手段， 而非必须。换言之， 一门语言可以根据自身特性选择合适的方式来实现面向对象。 由于大多数程序员首先学习的是Java, C++等高级编程语言， 因而先入为主的接受了“类”这个面向对象实际方式，所以习惯性的用类式面向对象语言中的概念来判断该语言是否是面向对象的语言。这也是很多有其他编程语言经验的人在学习JavaScript对象时，感觉到很困难的地方。

实际上， JavaScript是通过一种叫**原型(prototype)**的方式来实现面向对象编程的。下面我们就来讨论一下**基于类(class-basesd)的面向对象**和**基于原型(protoype-based)的面向对象**这两者的差别。

**基于类的面向对象**

在基于**类**的面向对象语言中（比如Java和C++）， 是构建在**类(class)**和**实例(instance)**上的。其中**类**定义了所有用于具有某一特征对象的属性。**类**是抽象的事物， 而不是其所描述的全部对象中的任何特定的个体。另一方面， 一个**实例**是一个**类**的实例化，是其中的一个成员。

**基于原型的面向对象**
 在基于**原型**的语言中（如JavaScript）并不存在这种区别：**它只有对象！**不论是构造函数(constructor)，实例(instance)，原型(prototype)本身都是对象。基于原型的语言具有所谓的原型对象的概念，新对象可以从中获得原始的属性。

所以，在JavaScript中有一个很有意思的`__proto__`属性（ES6以下是非标准属性）用于访问其原型对象， 你会发现，上面提到的构造函数，实例，原型本身都有`__proto__`指向原型对象。其最后顺着原型链都会指向`Object`这个构造函数，然而`Object`的原型对象的原型是`null`，不信， 你可以尝试一下`Object.prototype.__proto__ === null`为`true`。然而`typeof null === 'object'`为`true`。到这里， 我相信你应该就能明白为什么JavaScript这类基于原型的语言中没有类和实例的区别， 而是**万物皆对象！**

**差异总结**

| 基于类的（Java）                                           | 基于原型的（JavaScript）                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| 类和实例是不同的事物。                                     | 所有对象均为实例。                                           |
| 通过类定义来定义类；通过构造器方法来实例化类。             | 通过构造器函数来定义和创建一组对象。                         |
| 通过 new 操作符创建单个对象。                              | 相同                                                         |
| 通过类定义来定义现存类的子类， 从而构建对象的层级结构      | 指定一个对象作为原型并且与构造函数一起构建对象的层级结构     |
| 遵循类链接继承属性                                         | 遵循原型链继承属性                                           |
| 类定义指定类的所有实例的所有属性。无法在运行时动态添加属性 | 构造器函数或原型指定初始的属性集。允许动态地向单个的对象或者整个对象集中添加或移除属性。 |

## 二. ES5中的面向对象

> *这里的ES5并不特指ECMAScript 5， 而是代表ECMAScript 6 之前的ECMAScript！

#### **(一) ES5中对象的创建**

在ES5中创建对象有两种方式， 第一种是使用对象字面量的方式， 第二种是使用构造函数的方式。该两种方法在特定的使用场景分别有其优点和缺点， 下面我们来分别介绍这两种创建对象的方式。

##### **1. 使用对象字面量的方式**

我们通过对象字面量的方式创建两个`student`对象，分别是`student1`和`student2`。



```javascript
var student1 = {
  name: '阿辉',
  age: 22,
  subject: '前端开发'
};

var student2 = {
  name: '阿傻',
  age: 22,
  subject: '大数据开发'
};
```

上面的代码就是使用对象字面量的方式创建实例对象， 使用对象字面量的方式在创建单一简单对象的时候是非常方便的。但是，它也有其缺点：

- 在生成多个实例对象时， 我们需要每次重复写`name`,`age`,`subject`属性，写起来特别的麻烦
- 虽然都是学生的对象， 但是看不出`student1`和`student2`之间有什么联系。

为了解决以上两个问题， JavaScript提供了构造函数创建对象的方式。

##### **2. 使用构造函数的方式**

构造函数就其实就是一个普通的函数，当对构造函数使用`new`进行实例化时，会将其内部`this`的指向绑定实例对象上，下面我们来创建一个`Student`构造函数（构造函数约定使用大写开头，和普通函数做区分）。



```javascript
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
  console.log(this);
}
```

我特意在构造函数中打印出`this`的指向。上面我们提到，构造函数其实就是一个普通的函数， 那么我们使用普通函数的调用方式尝试调用`Student`。



```javascript
Student('阿辉', 22, '前端开发'); //window{}
```

采用普通方式调用`Student`时， `this`的指向是`window`。下面使用`new`来实例化该构造函数， 生成一个实例对象`student1`。



```javascript
let student1 = new Student('阿辉', 22, '前端开发'); //Student {name: "阿辉", age: 22, subject: "前端开发"}
```

当我们采用`new`生成实例化对象`student1`时， `this`不再指向`window`, 而是指向的实例对象本身。这些， 都是`new`帮我们做的。上面的就是采用构造函数的方式生成实例对象的方式， 并且当我们生成其他实例对象时，由于都是采用`Student`这个构造函数实例化而来的， 我们能够清楚的知道各实例对象之间的联系。

```javascript
let student1 = new Student('阿辉', 22, '前端开发');
let student2 = new Student('阿傻', 22, '大数据开发');
let student3 = new Student('阿呆', 22, 'Python');
let student4 = new Student('阿笨', 22, 'Java');
```

#### **(二) ES5中对象的继承**

##### **1. prototype的原型继承**

`prototype`是JavaScript这类基于原型继承的核心， 只要弄明白了原型和原型链， 就基本上完全理解了JavaScript中对象的继承。下面我将着重的讲解为什么要使用`prototype`和使用`prototype`实现继承的方式。

**为什么要使用prototype？**

我们给之前的`Student`构造函数新增一个`study`方法



```jsx
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
  this.study = function() {
    console.log('我在学习' + this.subject);
  }
}
```

现在我们来实例化`Student`构造函数， 生成`student1`和``student2`, 并分别调用其`study`方法。

```javascript
let student1 = new Student('阿辉', 22, '前端开发');
let student2 = new Student('阿傻', 22, '大数据开发');

student1.study(); //我在学习前端开发
student2.study(); //我在学习大数据开发
```

这样生成的实例对象表面上看没有任何问题， 但是其实是有很大的**性能问题**！我们来看下面一段代码：

```javascript
console.log(student1.study === student2.study); //false
```

其实对于每一个实例对象`studentx`，其`study`方法的函数体是一模一样的，方法的执行结果只根据其实例对象决定（这就是多态），然而生成的每个实例都需要生成一个`study`方法去占用一份内存。这样是非常不经济的做法。新手可能会认为， 上面的代码中也就多生成了一个`study`方法， 对于内存的占用可以忽略不计。

现在我们应该知道应该将`study`方法挂载到`Student.prototype`原型对象上才是正确的写法，所有的`studentx`实例都能继承该方法。

```javascript
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}
Student.prototype.study = function() {
  console.log('我在学习' + this.subject);
}
```

现在我们实例化`student1`和`student2`

```javascript
let student1 = new Student('阿辉', 22, '前端开发');
let student2 = new Student('阿傻', 22, '大数据开发');

student1.study(); //我在学习前端开发
student2.study(); //我在学习大数据开发

console.log(student1.study === student2.study); //true
```

从上面的代码我们可以看出， `student1`和`student2`的`study`方法执行结果没有发生变化，但是`study`本身指向了一个内存地址。这就是为什么我们要使用`prototype`进行挂载方法的原因。接下来我们来讲解一下如何使用`prototype`来实现继承。

##### **如何使用prototype实现继承？**

“学生”这个对象可以分为小学生， 中学生和大学生等。我们现在新建一个小学生的构造函数`Pupil`。



```javascript
function Pupil(school) {
  this.school = school;
}
```

那么如何让`Pupil`使用`prototype`继承`Student`呢? 其实我们只要将`Pupil`的`prototype`指向`Student`的一个实例即可。



```javascript
Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');
Pupil.prototype.constructor = Pupil;

let pupil1 = new Pupil('北大附小');
```

代码的第一行， 我们将`Pupil`的原型对象（`Pupil.prototype`）指向了`Student`的实例对象。



```javascript
Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');
```

代码的第二行也许有的读者会不能理解是什么意思。



```javascript
Pupil.prototype.constructor = Pupil;
```

`Pupil`作为构造函数有一个`protoype`属性指向原型对象`Pupil.prototype`，而原型对象`Pupil.prototype`也有一个`constructor`属性指回它的构造函数`Pupil`。如下图所示：

![1584425977636](C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584425977636.png)

然而， 当我们使用实例化`Student`去覆盖`Pupil.prototype后`， 如果没有第二行代码的情况下， `Pupil.prototype.constructor`指向了`Student`构造函数， 如下图所示：
 ![1584425996493](C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584425996493.png)

而且， `pupil1.constructor`会默认调用`Pupil.prototype.constructor`， 这个时候`pupil1.constructor`指向了`Student`：



```javascript
Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');
let pupil1 = new Pupil('北大附小');

console.log(pupil1.constructor === Student); //true
```

这明显是错误的， `pupil1`明明是用`Pupil`构造函数实例化出来的， 怎么其`constructor`指向了`Student`构造函数呢。所以， 我们就需要加入第二行， 修正其错误：



```tsx
Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');

//修正constructor的指向错误
Pupil.prototype.constructor = Pupil;

let pupil1 = new Pupil('北大附小');

console.log(pupil1.constructor === Student); //false
console.log(pupil1.constructor === Pupil); //ture
```

上面就是我们的如何使用`prototype`实现继承的例子， 需要特别注意的: **如果替换了prototype对象， 必须手动将prototype.constructor重新指向其构造函数。**

##### **2. 使用call和apply方法实现继承**

使用`call`和`apply`是我个人比较喜欢的继承方式， 因为只需要一行代码就可以实现继承。但是该方法也有其局限性，`call`和`apply`不能继承原型上的属性和方法， 下面会有详细说明。

**使用call实现继承**

同样对于上面的`Student`构造函数， 我们使用`call`实现`Pupil`继承`Student`的全部属性和方法：



```javascript
//父类构造函数
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}

//子类构造函数
function Pupil(name, age, subject, school) {
  //使用call实现继承
  Student.call(this, name, age, subject);
  this.school = school;
}

//实例化Pupil
let pupil2 = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');
```

需要注意的是， `call`和`apply`只能继承本地属性和方法， 而不能继承原型上的属性和方法，如下面的代码所示, 我们给`Student`挂载`study`方法，`Pupil`使用`call`继承`Student`后， 调用`pupil2.study()`会报错：



```javascript
//父类构造函数
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}
//原型上挂载study方法
Student.prototype.study = function() {
  console.log('我在学习' + this.subject);
}

//子类构造函数
function Pupil(name, age, subject, school) {
  //使用call实现继承
  Student.call(this, name, age, subject);
  this.school = school;
}

let pupil2 = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');

//报错
pupil2.study(); //Uncaught TypeError: pupil2.study is not a function
```

**使用apply实现继承**
 使用`apply`实现继承的方式和`call`类似， 唯一的不同只是参数需要使用数组的方法。下面我们使用`apply`来实现上面`Pupil`继承`Student`的例子。

```javascript
//父类构造函数
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}

//子类构造函数
function Pupil(name, age, subject, school) {
  //使用applay实现继承
  Student.apply(this, [name, age, subject]);
  this.school = school;
}

//实例化Pupil
let pupil2 = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');
```

##### **3. 其他继承方式**

JavaScript中的继承方式不仅仅只有上面提到的几种方法， 在《JavaScript高级程序设计》中， 还有实例继承，拷贝继承，组合继承，寄生组合继承等众多继承方式。在寄生组合继承中， 就很好的弥补了`call`和`apply`无法继承原型属性和方法的缺陷，是最完美的继承方法。这里就不详细的展开论述，感兴趣的可以自行阅读《JavaScript高级程序设计》。

### **三. ES6中的面向对象**

基于原型的继承方式，虽然实现了代码复用，但是行文松散且不够流畅，可阅读性差，不利于实现扩展和对源代码进行有效的组织管理。不得不承认，基于类的继承方式在语言实现上更健壮，且在构建可服用代码和组织架构程序方面具有明显的优势。所以，ES6中提供了基于类`class`的语法。但`class`本质上是ES6提供的一颗**语法糖**，正如我们前面提到的，**JavaScript是一门基于原型的面向对象语言**。

#### **(一) ES6中对象的创建**

我们使用ES6的`class`来创建`Student`



```javascript
//定义类
class Student {
  //构造方法
  constructor(name, age, subject) {
    this.name = name;
    this.age = age;
    this.subject = subject;
  }

  //类中的方法
  study(){
    console.log('我在学习' + this.subject);
  }
}

//实例化类
let student3 = new Student('阿辉', 24, '前端开发');
student3.study(); //我在学习前端开发
```

上面的代码定义了一个`Student`类， 可以看到里面有一个`constructor`方法， 这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5中的构造函数`Student`， 对应的是E6中`Student`类中的`constructor`方法。

`Student`类除了构造函数方法，还定义了一个`study`方法。需要特别注意的是，在ES6中定义类中的方法的时候，前面不需要加上`function`关键字，直接把函数定义进去就可以了。另外，方法之间不要用逗号分隔，加了会报错。而且，类中的方法全部是定义在原型上的，我们可以用下面的代码进行验证。

```javascript
console.log(student3.__proto__.study === Student.prototype.study); //true
console.log(student3.hasOwnProperty('study')); // false
```

上面的第一行的代码中, `student3.__proto__`是指向的原型对象，其中`Student.prototype`也是指向的原型的对象，结果为`true`就能很好的说明上面的结论： **类中的方法全部是定义在原型上的**。第二行代码是验证`student3`实例中是否有`study`方法，结果为`false`， 表明实例中没有`study`方法，这也更好的说明了上面的结论。其实，只要理解了**ES5中的构造函数对应的是类中的constructor方法**，就能推断出上面的结论。

#### **(二) ES6中对象的继承**

E6中`class`可以通过`extends`关键字来实现继承， 这比前面提到的ES5中使用原型链来实现继承， 要清晰和方便很多。下面我们使用ES6的语法来实现`Pupil`。

```javascript
//子类
class Pupil extends Student{
  constructor(name, age, subject, school) {
    //调用父类的constructor
    super(name, age, subject); 
    this.school = school;
  }
}

let pupil = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');
pupil.study(); //我在学习小学义务教育课程
```

上面代码代码中， 我们通过了`extends`实现`Pupil`子类继承`Student`父类。需要特别注意的是，子类必须在`constructor`方法中**首先调用super方法**，否则实例化时会报错。这是因为子类没有自己的`this`对象， 而是继承父类的`this`对象，然后对其加工。如果不调用`super`方法，子类就得不到`this`对象。

[重新认识JavaScript面向对象: 从ES5到ES6](https://www.jianshu.com/p/2371055d0cc0) 



























