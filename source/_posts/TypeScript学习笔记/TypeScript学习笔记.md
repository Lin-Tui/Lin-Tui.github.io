---
title: TypeScript学习笔记
date: 1604644118706.432
tags:
- TypeScript
category:
- TypeScript学习笔记
---

# 一. TypeScript基础

## 1. 什么是TypeScript 

​	鉴于JavaScript目前在大规模、可扩展应用上的不足，微软公司设计了TypeScript语言。TypeScript语言具有静态类型检测和面向对象的特征，在编译阶段可以及时发现语法错误，同时支持分模块开发，编译后转换成原生的JavaScript代码，可以直接运行在各类浏览器上，而不需要额外的配置。

​	TypeScript本质上是在JavaScript语言中添加了可选的静态类型和基于类的面向对象编程等新特性。

Typescript是JavaScript的超集，专门为开发大规模可扩展的应用程序而设计的，且可编译为原生JavaScript的一种静态类型语言。

**Typescript语言特点**：

* TYpeScript是以JavaScript为基础
* TypeScript支持第三方JavaScript库
* TypeScript是可移植的
* TypeScript是静态类型语言

## 2. 为什么要学习TypeScript

​	由于目前各主流浏览器中JavaScript引擎还没有完全实现ES6的特性，如JavaScript模块导入与导出和面向对象编程的类与接口等。另外，JavaScript是一种动态语言，很难做到静态类型检查。这将导致很多JavaScript语法问题在编码阶段无法暴露，而只能运行时暴露。

​	这种背景下，微软使用Apache授权协议推出开源语言TypeScript，增加了可选类型、与模块等特征，可编译成标准的JavaScript代码，并保证编译后的JavaScript代码兼容性。另外，TypeScript是一门静态类型语言，本身具有静态类型检查的功能，很好地弥补了JavaScript在静态类型检查上的不足。

​	TypeScript非常适合开发大规模可扩展的JavaScript应用程序。

* 面向对象特征，支持类、接口、命名空间和模块等。
* 静态类型检查，可以在编码阶段检查代码有无语法错误。
* 胜任大规模可扩展应用开发，这是TypeScript诞生的初心。
* 更高的编码效率，通过IED可以实现代码补全、接口提示。跳转到定义和代码重构等操
* 兼容JavaScript语法，同时支持ES6特征，可以使用最先进JavaScript语法。

**TypeScript相比JavaScript的优势**

* 编译时检查：

  TypeScript是静态类型的语言，静态类型可以让开发工具在编码阶段（编译阶段）即时检测各类语法错误。

* 面向对象特征：

  面向对象程序可以更好地构建大规模应用程序，通过对现实问题合理地抽象，可以利用面向对象特征中的接口、类等来构建可复用、易扩展的大型应用程序。TypeScript支持面向对象功能，可以更好地构建大型JavaScript应用程序。

* 更好的协作：

  TypeScript支持分模块开发，这样可以更好地进行分工协作，最后在合并的时候解决命名冲突等问题，这对于团队协作来说是至关重要的。

* 更强的生产力：

  TypeScript遵循ES6规范，可以让代码编辑器IDE实现代码智能提示，代码自动完成和diamante重构等操作，这些功能有助于提高开发人员的工作效率。

**TypeScript给前端开发带来的好处**

* 提高编码效率和代码质量

  传统的JavaScript在编写代码时，往往比较痛苦的是没有一个很好的编辑器IDE，可以像C#或者java那样，IDE对代码进行智能提示和语法错误检查，从而导致JavaScript代码在编码阶段很难发生潜在发错误。

  TypeScript是一种静态类型语言，可以让编辑器实现包括代码补全、接口提示、跳转到定义和代码重构等操作。借助编辑器，可以在编译阶段就发现大部分语法错误，这总比JavaScript在运行时发现错误要好得多。

* 增加了代码的可读性和可维护性

* 胜任大规模应用开发

  TypeScript是具有面向对象特征的编程语言，在大规模应用开发中，可以利用模块和类等特征对代码进行合理规划，达到高内聚低耦合的目的。TypeScript可以让复杂的代码结构更加清晰、一致和简单，降低了代码后续维护和升级的难度。因此，在面对大型应用开发时，使用TypeScript往往更加合适。

* 使用最先进的JavaScript语法

## 3. TypeScript的组成部分

TypeScript整个体系组成比较复杂，从本质上讲它主要由以下3个部分构成。

* TypeScript编译器核心：包括语法、关键字和类型注释等。
* 独立的TypeScript编译器：将TypeScript编写的代码转换成等效的JavaScript代码，可以通过参数动态生成ES5 或者ES3等目标代码。
* TypeScript语言服务：在TypeScript编译器核心层上公开一个额外的层，是类似编辑器的应用程序。语言服务支持常用的代码编辑器中需要的操作，如代码智能提示，代码重构、代码格式化、代码折叠和着色等。





# 二. TypeScript基本语法

## 1. 简单语法

#### （1）变量声明：

```ts
let 或 var 变量名： 数据类型 = 初始化值
//例如：
let varName: string = 'hello world'
```

## 2. 类型

#### （2）基础类型

* 数值型 number
* 布尔型 boolean
* 字符型 string

字符串和数字用+字符连接，那么结果将成为字符串。

字符串和布尔值用+拼接，也会生成字符串。

字符串和数组用字符串连接，那么结果将成为字符串，因此可以将空字符串和数组相加用于将数值的值转成用（，）分隔的一个字符串。

```ts
let res1 = '' + 5; // '5'
let res2 = true + ''; // 'true'
let res3 = '' + [1, 2, 3]; // '1, 2, 3'
```

#### （3）枚举

```ts
// 用enum关键词声明了一个名为Days的枚举类型，一般枚举类型的标识符首字母大写。
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// 用自定义的枚举类型来声明一个新的变量today，并赋值为Days.Sun
let today: Days = Days.Sun;
```

使用枚举可以限定我们的赋值范围，防止赋值错误，例如不能为today变量赋值为Days.OneDays。

一般情况下，枚举中的元素从0开始编码。同时也会对枚举值到枚举名进行反向映射。

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days{'Sun'} === 0); //true
console.log(Days{'Mon'} === 1); //true
console.log(Days{'Tue'} === 2); //true
console.log(Days{'Wed'} === 3); //true
console.log(Days{'Sat'} === 6); //true
console.log(Days[0] === 'Sun'); //true
console.log(Days[1] === 'Mon'); //true
console.log(Days[2] === 'Tue'); //true
console.log(Days[6] === 'Sat'); //true
```

枚举支持连续编号和不连续编号，也支持部分编号和部分不编号。

给枚举类型进行手动赋值时，一定要注意手动编号和自动编号不要重复，否则会相互覆盖。

```ts
enum Days {Sun = 1, Mon = 2, Tue = 4, Wed = 3, Thu = 5, Fri, Sat};
console.log(Days{'Sun'} === 1); // true
console.log(Days{'Mon'} === 2); // true
console.log(Days{'Tue'} === 4); // true
console.log(Days{'Wed'} === 3); // true
console.log(Days{'Thu'} === 5); // true
console.log(Days{'Fri'} === 6); // true
console.log(Days{'Sat'} === 7); // true
```

枚举手动编号和自动编号如果出现重复，那么重复的枚举名会指向同一个值，而这个数值只会返回最后一个赋值的枚举名。TypeScript编辑器并不会提示错误或警告。

```ts
enum Days {Sun = 1, Mon = 2, Tue = 4, Wed = 3, Thu, Fri, Sat};
console.log(Days{'Sun'} === 1); // true
console.log(Days{'Mon'} === 2); // true
console.log(Days{'Tue'} === 4); // true
console.log(Days.Tue); // 4
console.log(Days.Thu); // 4
console.log(Days.Fri); // 5
console.log(Days.Sat); // 6
console.log(Days[4]); // Thu
```

#### （4）任意值

​	TypeScript语言是一种静态类型的JavaScript，可以更好地进行编译检查和代码分析等，但有些时候TypeScript需要和JavaScript进行交互，这时就需要任意值（any）类型。

​	在某些情况下，编程阶段还不清楚要声明的变量是什么类型，这些值可能来自动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查，此时可以声明一个任意值类型的变量。

```ts
let myVar: any = 7;
myVar = 'maybe a string instead';
myVar = false
```

any类型上没有任何内置的属性和方法可以被调用，它只能在运行时检测该属性或方法是否存在。因此声明一个变量为任意值之后，编译器无法帮助你继续类型检测和代码提示。

```ts
let notSure: any = 4;
notSure.ifItExits(); //ifItExits方法在运行时可能存在
notSure.toFixed(); //toFixed是数值4的方法
let prettySure: Object = 4; // 此处是大写的Object，不是小写的object
prettySure.toFixed(); //错误object类型没有toFixed方法
```

可以看出，any类型的变量可以调用任何方法和属性，但是Object类型的变量却不允许调用次类型之外的任何属性和方法，即使Object对象有这个属性和方法也不允许。

变量如果在声明的时候未明确指定其类型且未赋值，那么它会被识别到任意值类型。

TypeScript会在没有明确地指定类型的时候推测出一个类型，这就是类型推论。通过定义的时候没有赋值，不管之后有没有赋值，都会被推断成any类型而完全不被编译器进行类型检查。

```ts
let some; //any类型
some = 'Seven';
some = 7;
some.getName();
```

#### （5）空值、Null与Undefined

#### （6）Never

#### （7）Symbols

#### （8）交叉类型

交叉类型可以将多个类型合并成为一个类型，合并后的交叉类型包含了其中使用类型的特性。

```ts
class Car {
    public dirverOnRoad() {
        console.log('can driver on road');
    }
}

class Ship {
    public driverInWater() {
        console.log('can driver in water')
    }
} 

let car = new Car();
let ship = new Ship();
let carShip: Car & Ship = <Car & Ship>; //Car & Ship是Car和Ship的交叉类型
carShip['driverOnRoad'] = car['driverOnRoad'];
carShip['driverInWater'] = ship['driverWater'];
carShip.driverInWater();
carShip.driverOnRoad();
```

#### （9）Union类型

联合类型表示取值可以为多种类型中的一种。联合类型与交叉类型在用法上完全不一样。

```ts
function padLeft(value: string, padding: number | string) {
    if (typeof padding === 'number') {
        return Array(padding + 1).join(" ") +value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw new Error(`参数为string或number，但传入${padding}.`);
}
console.log(padLeft('hello world', 3))
console.log(padLeft('hello world', '_ '))
```

#### （10）类型别名

联合类型往往比较长，也不容易记忆和书写，我们可以用类型别名来解决这个问题。类型别名可以用来给一个类型起一个新名字没。

类型别名的语法是：

```
type 类型别名 = 类型或表达式
```

类别别名可以用于简单了下和自定义类型，也可以用于表达式。

```ts
//用type给表达式() => string起一个别名myfunc；
type myfunc = () => string;
// 用type 给联合类型string|number|myfunc起一个别名NameOrStringOrMyFunc。
type NameOrStringOrMyFunc = string | number | myFunc;
function getName(n: NameOrStringOrMyFunc): string {
    ...
}
```

#### （11）类型断言

类型断言可以用来手动指定一个值的类型。

类型断言的语法是:

```ts
1. <类型>值或者对象
2. 值或者对象 as 类型
// 在tsx语法中必须使用后一种，因此<>有特殊意义。
```

类型断言一般和联合类型一起使用，可以将一个联合类型的变量指定为一个更具体的类型进行操作，从而可以使用特定类型的属性和方法。

```ts
function getLength(a: string | number): number {
    //if (a as string).length {
    if ((<string>a).length) {
        return (<string>a).length;
    } else {
        return a.toString().length;
    }
}
console.log(getLength(6)); //1
console.log(getLength('hello')) //5
```

联合类型string|number限定参数a的类型，可以用类型断言`<string>a`指定类型为string，从而可以调用字符的length属性，如果传入的是数值，那么会返回a.toString().length的值。类型断言成一个联合类型string|number 中不存在的类型是不允许的。

类型断言不是类型转换，且类型推断不能直接进行调用，需要放于条件判断中或者先将其转化成unknown在进行类型断言。

## 3. 变量

类型分为值类型和引用类型，所以变量可分为值类型变量和引用类型变量。

JavaScript中的数据主要包含两种：一种是基本类型（值类型），另一种是引用类型（引用类型）。

内存分为两个部分：栈内存和堆内存。

基本类型保存在栈内存中，引用类型值在堆内存中保存着对象，在栈内存中保存着指向堆内存的指针。

JavaScript中，基本类型值包括： undefined、null、number、string、boolean，在内存中分别占固定大小的空间。引用类型只有object，这种值的大小不固定，可以动态添加属性和方法，而基本类型则不可以。

对基本类型值进行复制，复制的是指本身，相当于复制了一个副本，修改一个变量不会影响另一个变量的值。而对引用类型值进行复制，复制的是对象所在的内存地址。所以两者指向的都是栈内存的同一个数据，修改一个变量导致另一个变量的值也进行修改。

#### （1）声明变量

在TypeScript编码规范中，建议使用变量前一定要先声明。变量声明可以使用以下4中方式：

```ts
// [var 或 let 或 const][变量名]:[类型]=值;
var uname:string = 'Tom';
let uname2: string = 'Jane';
const version: string = '1.0';
```

```ts
// [var 或 let][变量名]: [类型];
var uname: string;
let uname2: string;
// 此范式进行变量声明，只指定了声明变量的类型，初始值默认为undefined。
```

```ts
// [var 或 let][变量名];
var uname;
let uname2;
// 此范式进行变量声明，值提供了变量名，声明变量的类型和初始值都未提供。变量类型默认为any，变量值默认为undefined。
```

```ts
// [var 或 let 或 const][变量名] = 值;
var uname = 'Rom'; //string
let uname2 = 100; //number
const version = '1.0' //string
// 此范式进行变量声明，未指定声明变量的类型，但是给出了初始值，这时会用类型推断来确定变量的类型。
```

## 4. 运算符

#### （1）类型运算符 typeof

typeof操作符返回一个字符串，用以获取一个变量或表达式的类型。

typeof运算符一般只能返回如下几个结果：number、boolean、string、symbol、function、object、undefined。

| 变量类型  |         示例         | typeof 返回值 |
| :-------: | :------------------: | :-----------: |
|  number   |       typeof 2       |   'number'    |
|  boolean  |     typeof true      |   'boolean'   |
|  string   |   typeof  'hello'    |   'string'    |
|   null    |     typeof null      |   'object'    |
| undefined |   typeof undefined   |  'undefined'  |
| function  | typeof JSON.stringfy |  'function'   |
|   array   |    typeof [1, 2]     |   'object'    |
|  object   |      typeof {}       |   'object'    |
|   enum    |    typeof Colors     |   'object'    |
|   enum    |  typeof Colors.Red   |   'number'    |
|   class   |    typeof Person     |  'function'   |
|   tuple   | typeof [2, 'hello']  |   'object'    |

#### （2）instanceof 运算符

instanceof运算符可用于测试对象是否为指定类型的实例。如果是，那么返回的值为true，否则返回false。instanceof运算符的基本语法为：

```ts
类实例 instanceof 类
```

```ts
class People {
    private name: string = '';
    private age: string = '';
}
let man: People = new People();
alert (man instanceof People); //true
```

instanceof 左边的只能是any类型或者对象类型或者类型参数。其他不能用，如`"hello" instanceof string`报错。

# 三. 数组、元组

## 1. 数组

数组即一组数据，它把一系列具有相同类型的数据组织在一起，成为一个可操作的对象。

**声明和初始化数组**：

```ts
// let 或 var 数组名: 元素类型[] = [值1, 值2, ..., 值N];
// 其中，元素类型可以是字符类型、数值类型、布尔类型，也可以是联合类型和用户自定义的类型。
let arr1: string[] = ['a', 'b', 'c'];
let arr2: number[] = [1, 2, 3];
let arr3: boolean[] = [true, false];
let arr4: any[] = [10, 'jack', true];
let arr5: object[] = [10, true, 'jack']; // 错误
let arr6: object[] = [{age: 2}, {age: 20}];
let arr7: (string | number)[] = [1, 'true'];
```

```ts
// let 或 var 数组名: Array<元素类型> = [值1, 值2, ..., 值N];
let arr1: Array<string> = ['a', 'b', 'c'];
let arr2: Array<number> = [1, 2, 3];
let arr3: Array<boolean> = [true, false];
let arr4: Array<any> = [10, true, 'jack'];
let arr5: Array<object> = [10, true, 'jack']; //错误
let arr6: Array<object> = [{age: 2}, {age: 20}];
let arr7: Array<string | number> = [1, 'true']
// 这种方式声明数组的时候，元素类型不能省略，即不允许Array<>
```

```ts
// 使用数组字面量，数组声明和初始化的基本语法如下：
//let 或 var 数组名 = [值1, 值2, ..., 值N];
// 使用数组字面量的方式构建数组，则数组的元素类型会根据初始化的值来确定。如果数组在声明时未设置元素类型且只初始化为空数组，就会被认为是any类型，可以存储任何类型的数据。如果未设置元素类型，且初始化了非空的值，那么编译器会根据初始化的值来自动推断数组的类型。
let arr1 = []; //any[]
arr1.push(3);
arr1 = [1, 'tom', true, {age: 2}];
let arr2 = [1, 2, 3]; // number[];
let arr3 = [1, 'true']; //(string | number)[];
arr3.push(2);
arr3.push(true); //错误，布尔类型不能存储
```

## 2. 元组

元组是关系数据库中的基本概念，关系是一张表，表中的每行就是一个元组，每列就是一个属性。在二维表里，元组也称为行。

元组可以是不同类型的对象集合。

**元组特点**：

* 元组的数据类型可以是任何类型
* 在元组中，可以包含其他元组
* 元组可以是空元组
* 元素的取值同数组的取值，元组的标号从0开始
* 元组可以作为参数传递给函数

元组的声明和初始化与数组比较类似，只是元组中的各个元素类型可以不同。

需要注意元组和数组在语法上的区别：数组是datatype[]， 而元组是[datatype1, datatype2,...]。

```ts
let row: [number, string, number] = [1, 'tom', 99]
// 元组声明的时候[]中的类型不能省略，且初始化的个数必须和声明中的类型个数一致，否则报错。
```

上面用let声明了一个类型为[number, string, number]的元组row。将上面的代码稍微做修改后则不是元组，而是一个联合类型的数组：

```ts
let row = [1, 'tom', 2] // (string | number)[]
```

可以将any类型的变量赋值给元组：

```ts
let a: any = true;
let row: [number, string, number] = [1, 'tom', a];
```

# 四. 函数

## 1. 定义函数

#### （1）函数声明

```ts
function 函数名(参数1: 类型, 参数2: 类型, ..., 参数n: 类型): 类型 {
    //执行代码
}

function add(x: number, y: number): number {
    return x + y;
}
```

函数返回类型会自动进行类型推断，一般可以省略。

函数声明定义的函数可以称为普通函数，也叫命名函数。

#### （2）函数表达式

```ts
let 或 var 函数表达式名 = function 函数名(参数1: 类型, 参数2: 类型, ..., 参数n: 类型): 类型 {
    // 执行代码
}
// 在函数表达式中，函数名可以省略，此时函数就是匿名函数，即function关键字后直接就是小括号。 
let add = function(x: number, y: number): number {
    return x + y;
}
// 在函数表达式中，函数名只是函数体中的一个本地变量。外部并不能通过函数名来调用函数。
let a = function add2(x: number, y: number): number {
    return x + y;
}
console.log(a(2, 3)) //5
console.log(add2(2, 3)) // 错误
```

函数表达式一般都是匿名的，如果给出函数名，那么这个函数表达式则称为命名函数表达式。如果函数表达式中有递归这种场景，也就是自己需要调用自己，那么必须用命名函数表达式。

```ts
let func = function factorial(n: number): number {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1); //需要函数名factorial
    }
}
console.log(func(3))
```

#### （3）箭头函数表达式

```ts
let 或 var 箭头表达式名 = (参数1: 类型, 参数2: 类型, ..., 参数n: 类型) => {
    //执行代码
}
// 箭头函数表达式也是一个匿名函数
let add = (a: number, b: number) => {
    return a + b;
}
console.log(add(2, 3))

let add = a => a +3;
console.log(add(2))
```

#### （4）Function 对象

Function对象可以定义任何函数，用Function类直接创建函数的语法：

```ts
let 或 var 函数名 = new Function(参数1, 参数2, ..., 参数N, 函数体)
let fun = new Function('msg', 'console.log("hello " + msg)')
```

## 2. 函数的参数

在Typescript中，参数可以用"参数名：数据类型"来定义一个函数的参数，其中数据类型省略时，默认为any类型，可以传入任意值。

虽然参数类型可以省略，但是不建议省略，any类型将失去静态检测的功能。

```ts
// 错误代码示例：
function func(a: string, b: string) {
    return a + '' + b;
}
let result1 = func('tom') // 错误，少一个参数
let result2 = func('jack', 'tom', undefined) // 错误， 多一个参数
let result3 = fucn('jack', 'tom') // 正确
let result4 = func('tom', 2) // 错误，第二个参数类型不对
```

在TypeScript中，函数参数有以下几类：

* 可选参数
* Rest参数（剩余参数）
* 默认参数

#### （1）可选参数

可选参数使用问号标识(?)来定义，参数一旦声明为可选的，那么在函数调用的时候可以传值也可以不传值。

函数的参数可以全部设为可选，但是可选的必须位于非可选参数之后，否则报错。

```ts
function func(a: string, b?:string) {
    if (b === undefined) {
        b = ''
    } 
    return a +' ' + b;
}
let res1 = func('tom') //正确
let res2 = func('tom', 'jane', undefined); //错误，多一个参数
let res3 = func('tom', 'jane'); // 正确
let res4 = func('tom', 2); //错误，第二个参数类型不对
```

#### （2）Rest参数（剩余参数）

Rest参数可以接受函数的多余参数，组成一个数组，但必须放在形参的最后面。Rest参数名前用...表示：

```ts
function 函数名(a: 类型, b: 类型, ...restArgs: 类型[]) {
    //函数逻辑
}

function func(a: string, ...b: string[]) {
    if (b === undefined) {
        // 避免b = undefined
        b = []
    }
    return a +' ' + b
}
let res1 = function('jack') //正确，'jack '
let res2 = function('jack', 'adams', undefined); //正确， 'jack admas'
let res3 = function('jack', 'adams', 'smith'); //正确，'jack admas,smith'
let res4 = function('jack', 2); //错误，第二个参数类型不对
```

#### （3）默认参数

```ts
function 函数名(a: 类型, ..., b: 类型 = 默认值) {
    //函数逻辑
}
// 函数参数不能同时设置可选和默认
function getDiscount(price: number, rate: number = 0.50) {
    let discount = price * rate;
    return discount;
}
let a = getDiscount(1000); //500
let b = getDiscount(1000, 0.6) //600
```

#### （4）类型注解

​	JavaScript不是一种静态类型语言。这意味着我们不能指定变量和函数参数的类型。但是TypeScript是一种静态类型语言，这让我们可以对变量和函数进行类型注解。类型注解也就是对参数或变量类型进行注释，比如限定参数为数值类型或者字符串类型等。

​	类型注解用于强制执行类型检查。TypeScript中不一定要使用类型注释。但是，类型注解有助于编译器检查类型，并有助于避免处理数据类型时报错在TypeScript编程中，类型注解也是一种编写代码的好习惯，一方面开启静态类型检测功能，将很多潜在的类型错误及时排查出来，另一方面也让后续的维护更容易。

​	可以用冒号（：）在函数的参数名后面指定类型，冒号和参数名之间可以有一个空格。

```ts
let stu: {
    id: string,
    age: number,
    name: string
}
function print(student: {
    id: string,
    age: number,
    name: string
}) {
    console.log('name' + student.name);
}
stu = {
    id: '001',
    age: 31,
    name: 'jack'
}
print(stu);
print({id: '001'}); //error
```

## 3. 特殊函数

#### （1）函数重载

函数重载常用来实现功能类似但所处理的数据类型不同的问题。

函数重载是函数名字相同，而参数不同，返回类型可以相同也可以不相同，但不能只有函数返回值类型不同。这些同名函数的参数要么不同，要么类型不同，那么顺序不同。

每个函数重载都必须有一个独一无二的参数类型列表。函数重载是多态的一种实现方式。

重载函数一般有以下几种方式：

```ts
// 参数类型不同
//1. 声明定义：
function disp(x: string);
function disp(x: number);
//2. 实现：
function disp(x: any) {
    if (typeof x === 'string') {
        console.log('string =' +x)
    } else {
        console.log('number =' + x)
    } else {
        console.log('未实现')
    }
}
disp(2);
disp('2')
```

函数重载声明定义必须放在实现函数之前，否则报错。

```ts
// 参数数量不同
// 1. 声明定义
function disp(x: number);
function disp(x: number, y: number);
//2. 实现
function disp(x: any, y?:any) {
    if (y === undefined) {
        console.log(x)
    } else {
        console.log(x + y)
    }
}
disp(2);
disp(2, 3)
```

函数重载中如果参数个数不同，那么函数实现中对应的参数必须为可选参数，否则报错。

```ts
// 参数类型顺序不同
// 1. 声明定义
function disp(x: number, y: string);
function disp(x: string, y: number);
//2. 实现
function disp(x: any, y: any) {
    if (typeof x === 'number' && typeof y === 'string') {
        console.log(x*10 + y)
    } else if (typeof y === 'number' && typeof x === 'string') {
        console.log(x + y*10)
    } else {
        console.log(‘未实现)
    }
}
disp('2', 3); //'230'
disp(2, '3') //'203'
```

```ts
// 参数默认值不同
// 1. 声明定义
function disp(x: 'jack', y: numeber);
function disp(x: 'tom', y: number);
// 2. 实现
function disp(x: any, y: number) {
    if (x === 'jack') {
        console.log('jack =' + y)
    } else if (x === 'tom') {
        console.log('tom =' + y)
    } else {
        console.log('未实现')
    }
}
disp('jack', 3);
disp('tom', 6)
```

在参数默认值重载函数中，除了默认值外不允许传入其他值。

# 五. 面向对象编程

面向对象编程的本质是以建立模型来抽象表达实现事物。模型是用来反映实现世界中事物特征的一种抽象载体。一般情况下，任何一个模型都不可能完全反映客观事物的一切具体特征，但是可以根据需求抓住待解决问题的主要矛盾，即主要的特征和行为。面向对象是以功能来划分问题，而不是步骤。

面向对象是一种对现实世界理解和抽象的方法，是计算机编程技术发展到一定阶段后的产物。

抽象、封装、继承和多态是面向对象的基础，是面向对象的四大基础特征。

## 1. 对象

对象指的是具体的某个事物，具有唯一性标识。状态和行为的三大特性。

## 2. 类

```ts
class Car {
    //属性
    engine: string = 'V8';
    constructor(engine: string) {
        this.engine = engine;
    }
    getEngine(): string {
        return this.engine;
    }
}
let aodiCar = new Car('奥迪 V8');
console.log(aodiCar.engine);
console.log(aodiCar.getEngine());
// 访问类的实例对象的属性和方法除了用符号外，还可以用[]， 如aodiCar['engine']和aodiCar['getEngine']()
```

#### （1）类的继承

在类的继承中，子类的构造函数必须包含父类的构造函数，调用父类构造函数用super。而且在构造函数里访问this的属性之前一定要调用super()，否则编译器也会提示错误。

TypeScript中的类只能继承一个父类，不支持继承多个类，但支持多重继承。

```ts
class People {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age
    }
    walk() {
        console.log(this.name + ' walk');
    }
    eat() {
        console.log(this.name + ' eating')
    }
}

class Student extends People {
    clazz: string;
    constructor(name: string, age: number, clazz: string) {
        super(name, age);
        this.clazz = clazz;
    }
    learn() {
        console.log(this.name + ' learning')
    }
    display() {
        console.log(JSON.stringfy(this))
    }
}

class HighSchoolStudent extends Student {
    clazz: string;
  	constructor(name: string, age: number, clazz: string) {
        super(name, age, clazz);
        this.clazz = clazz;
    }
    goNCEE() {
        console.log(this.name + ' take NCEE')
    }
}

let studentA = new HighSchoolStudent('jack', 17, '高三一班');
studentA.walk();
studentA.learn();
studentA.goNCEE();
student.display()

// 可以对实例对象进行类型断言，让子类转成父类的类型。
let studentB = studentA as Student;
sudentB.display();
let people = studentA as People;
people.walk();
```

#### （2）方法重载

重载是在一个类里面方法名字相同但参数不同，返回类型可以相同也可以不同。每个重载的方法都必须有一个独一无二的参数类型列表。

重写是子类对父类允许访问的方法的实现共产进行重新编写，返回值和形参都不能改变，即方法签名不变，方法体重写。重写的好处在于子类可以根据需要定义特定于自己的行为，从而覆盖父类的方法。

## 3. 接口

接口是一系列抽象属性或方法的声明，接口只给出属性或方法的约定，并不给出具体实现。

具体的实现逻辑可以交由接口的实现类来完成。借助接口，我们无须关心实现类的内部实现细节就可以用接口定义的属性或方法对某个类进行属性或方法调用。

#### （1）声明接口

TypeScript的核心原则之一是对值所具有的结构进行类型检查。接口的作用就是为这些类型命名或定义契约。TypeScript中接口定义的基本语法如下：

```ts
interface 接口名 {
    //属性或方法定义
}

interface inPeople {
    name: string;
    age:  number;
    walk();
    eat(a: string);
}
```

接口中的属性和方法可以定义为可选的，如果将该接口中的属性和方法用可选符号？限定为可选的情况下，接口的实现中可选属性或方法就可以不实现。

```ts
interface IConfigs {
    name: string;
    height?:number, //接口中的属性和方法既可以用分号;分隔，也可以逗号,分隔
    width?:number;
    learn?(); //可选方法
}
function load(config: IConfigs) {
    console.log(config.name)
}
load({name: 'div', height: 180})
load({name: 'svg', height: 180, width: 200})
load({
    name: 'html',
    heigth: 180,
    width: 200,
    learn: () => {console.log('learning')}
})
```

接口还可以继承自类：

```ts
class Rect {
    heigth: number = 100;
    width: number = 200;
    learn?() {
        console.log('learning')
    }
}

interface Iconfig extends Rect {
    name: string
}

function load(config: Iconfig) {
    console.log(config.name);
    //console.log(config.learn()) // config.learn is not a function
}
// load({name: 'div', heigth: 180}); //错误缺少width
load({name: 'svg', heigth: 180, width: 200})
```

TypeScript中不允许一次继承多个类，但可以实现多个接口。类实现接口用关键字implements来表示。

```ts
interface Iconfigs {
    heigth: number;
    width: number;
}
interface Ibase {
    id: string;
    name: string;
    toString(): string;
}
class MyElement implements Iconfigs, Ibase {
    heigth: number = 200;
    width: number = 300;
    id: string = '';
    name: string = 'myele';
    toString() {
        return JSON.stringfy(this)
    }
}
let e = new MyElement();
console.log(e.tostring)
```

接口中还可以限定一个属性为只读的，只读属性用关键字readonly来指定。

```ts
interface Ibase {
    name: string;
    readonly outhor: string;
    tostring(): string;
}
class MyElement implements Ibase {
    readonly author: string = 'tom';
    name: string = 'myele';
    constructor(author:string, name: string) {
        this.author = author;
        this.name = name;
    }
    tostring() {
        return JSON.stringify(this)
    }
}
let e = new MyElement('tom', 'div') //只读属性，但生成的js文件可以修改
```

类中只读属性除了在构造函数中可以进行赋值外，其他方法不允许修改只读属性的值。

TypeScript具有`ReadonlyArray<T>`类型，它与`Array<T>`相似，只是把所有可变方法进行了移除，因此可以确保数组创建后不能被修改。另外，只读属性不能用const，而只能用readonly。最简单判断该用readonly还是const的方法是，需要限定的是变量还是属性。如果要限定一个变量则用const，若要限定属性则使用readonly。

​	接口描述了类的公共部分，而不是公共和私有两部分。接口不会帮我们检查类是否具有某些私有成员。我们要知道类具有两个类型的：静态部分的类型和实例的类型。

#### （2）Union Type 和 接口

接口中的属性可以是简单的数据类型，也可以使用复杂的数据类型，如联合类型（Union Type）

```ts
interface Ibase {
    name: string;
    width: string | number;
    height: string | number;
}

class MyElement implements Ibase {
    width: string | number = '200px';
    heigth: string | number = '300px';
    name: string = 'tom';
    constructor(name : string, width: string | number, height: string | number) {
        this.name = name;
        this.width = width;
        this.height = heigth;
    } 
}
let e = new MyElement('div', 200, '300px')
```

```ts
interface IFunc {
    (width: string | number, heigth: string | number): boolean;
}
class MyElement {
    width: string | number = '200px';
    height: string | number = '300px';
    name: string = 'tom';
    constructor(name: string, width: string | number, height: string | number) {
        this.name = name;
        this.width = width;
        this.height = height;
    }
    setLocation(func: IFunc): boolean {
        return func(this.width, this.height);
    }
}

let e = new MyElement('div', 200, '300px')
e.setLocation(function(w, h) {
    console.log(w);
    console.log(h);
    return true;
})
    
```

#### （3）接口和数组

```ts
interface IMath {
    data: number[];
    sum(data: number[]): number;
}
class MyMath implements IMath {
    data: number[] = [];
    constructor(data: number[]) {
        this.data = data;
    }
    sum(_data?: number[]): number {
        let ret = 0;
        if (_data === undefined) {
            for (let i of this.data) {
                ret += i;
            }
        } else {
            for (let i of _data) {
                ret += i
            }
        }
        return ret;
    }
}

let e = new MyMath([1, 2, 3]);
console.log(e.sum()); //6
console.log(e.sum([2, 3, 4])) //9
```

#### （4）接口的继承

```ts
interface IBase {
    color: string;
    name: string;
}

interface IShape {
    x: number;
    y: number;
}

interface ICircle extends Ishape, Ibase {
    radius: number;
}

let circle = <ICircle>{};
circle.color = 'blue';
circle.radius = 10;
circle.x = 0;

// ICircle接口继承了接口Ishape和IBase，因此接口ICircle中将自动创建接口IShape和IBase中所有的属性和方法定义。
```

如果接口继承自多个接口，且多个接口中有同名的属性，但是属性的数据类型不同，就无法同时继承。

接口除了可以继承接口外，还可以继承自类。当接口继承了一个类时，它会继承类的成员但不包括其实现。接口同样会继承到类的private和protected成员。这意味着当我们创建一个接口并继承一个拥有私有或受保护的成员类时，这个接口只能被该类或其子类所实现。

接口的属性和方法不能限定访问控制符，但是通过继承类可以限定接口中属性的访问权限。

```ts
class Control {
    private state: string;
    protected innerValue: string;
    public name: string
}

interface IClickableControl extends Control {
    click(): void;
    //state: string //错误 不能访问私有属性state
}

class Button extends Control implements IClickableControl {
    click() {
        this.name = 'Button';
        this.innerValue = '@001';
        //this.state = '0'
    }
}

// 错误：MyImage 只是实现了接口IClickableControl，但不是Control的子类，则会报错。Image类型缺少state私有属性
class MyImage implements IclickableControl {
    click() {
       // this.name = 'MyImage'
       // this.innerValue = '@001'
    }
}
```

类可以同时继承类和实现接口，但是注意继承必须置于实现接口之前，即extends要放在implements之前，否则报错。

#### （5）类也可以实现接口

抽象类是一种特殊的类，可以被其他类继承。抽象类一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。abstract关键字用于定义抽象类和抽象类内部定义抽象方法，因此可以用抽象类来实现接口的功能。

抽象类中的抽象方法不包含具体实现，并且必须在子类中实现。抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。抽象方法必须包含abstract关键字并且可以包含访问修饰符。

## 4. 命名空间

命名空间是用来组织和重用代码的，防止重名的情况。

#### （1）定义命名空间

命名空间的目的就是为了解决命名冲突的问题。

TypeScript中命名空间使用namespace关键字来定义，基本语法格式如下：

```ts
namespace 命名空间名 {
    // 内部类和成员
}
// 命名空间名一般符合一般标识符的命名规则。命名空间可以用.分隔的几个单词构成。
    
namespace com.wyd.demo {
    interface IPeople {
        id: string;
        name: string;
        learn();
    }
    export class Man implements IPeople {
        public id: string = '';
        public name: string = '';
        constructor(id: string, name: string) {
            this.id = id;
            this.name = name;
        }
        learn() {
            console.log(this.name + ' learning');
        }
    }
}
let man = new com.wyd.demo.Man('001', 'jack');
man.learn();
```

#### （2）嵌套命名空间

命名空间支持嵌套，即我们可以将命名空间定义在另一个命名空间中。

```ts
namespace com.wyd {
    // 嵌套时， 里层的namespace必须用export，否则无法访问。
    export namespace nested {
        export fucntion callNS() {
            // com.wyd.demo.Man
            let man = new demo.Man('001', 'jack');
            man.learn();
        }
    }
}
// 命名空间别名
import myNs = com.wydnested;
com.wyd.nested.callNS();
myNS.callNS()
```

## 5. 外部模块

#### （1）模块加载器

模块使用模块加载器去导入其他模块。在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。

模块加载器一般分为供浏览器端使用的AMD规范和CMD规范、供服务器端使用的CommonJs规范、跨浏览器和服务器的UMD规范。

#### （2）AMD：

AMD（异步模块加载机制）规范的描述比较简单，完整描述了模块的定义、依赖关系、引用关系以及异步加载机制。requestJS库采用AMD规范进行模块加载。AMD规范特别适用于浏览器环境。

AMD规范用一个全局函数define来定义模块。

```ts
// 第一步，新建一个moduleA.js文件，按照约定，其模块名为文件名moduleA。函数define中用一个匿名函数返回一个对象。
define (
	function() {
        return {
        	name: 'tom',
            age: 31
        }
    }
);
// 第二步： 新建一个moduleB.js文件，按照约定，其模块名为文件名moduleB。模块moduleB依赖模块moduleA。
// 第一个参数需要用一个数组来描述依赖项；第二个参数是一个匿名的工厂函数，返回一个对象，其中匿名函数的参数列表和依赖项时一一对应的关系。
define(['moduleA'], function(moduleA) {
    return {
        showName: function() {
            console.log(moduleA.name)
        },
        getAge: function() {
            return moduleA.age
        }
    }
})
//第三步， 新建一个入口文件man.js。在这个文件中，首先用require.config方法来加载jquery库，然后用require函数来调用moduleB和jquery库中的方法。
// require函数有两个参数时，第一个参数时一个数组，可以用来描述需要引入的依赖项，也就是要加载的模块；第二个是一个匿名的工厂函数，其中匿名函数的参数列表和引入的依赖项是一一对应的关系。
require.config({
    paths: {
        jquery: 'http://code.jquery.com/jquery-1.11.1.min'
    }
})
require(['jquery', 'moduleB'], function($, moduleB) {
    moduleB.showName();
    $('#mydiv').html('age='+moduleB.getAge());
})
// 第四步， 新建一个index.html文件，用来将main.js文件引入到HTML页面中运行。require.js可以在引入自身JS文件时根据script脚本中的data-main属性的配置来加载入口文件。
<!DOCTYPE html>
<html lang="en">
<head>
    ...
</head>
<body>
    <div id='mydiv'>body</div>
	<script type='text/javascript' src='require.js' data-main='main.js'>
    </script>
</body>
</html>
```

#### （3）CMD

CMD（通用模块定义）规范是国内发展出来的。在AMD规范中有一个浏览器的实现库require.js，CMD规范也有一个浏览器的实现库SeaJS。SeaJS功能和requireJS基本相同，只不过模块定义方式和模块加载时机上有所不同。

在CMD规范中，一个模块就是一个JS文件。

代码书写格式如下：

```ts
define(id?,d?.factory)
```

因为CMD推崇一个文件就是一个模块，所以经常用文件名作为模块id。CMD推崇依赖就近，所以一般不在define函数的参数中写依赖。define函数的第三个参数factory是一个工厂函数，格式为function(require, export, module)。其中有三个参数：require是一个方法，用来获取其他模块提供的接口；exports是一个对象，用来向外提供模块接口；module是一个对象，上面存储了当前模块相关联的一些属性和方法。

```ts
//第一步： 新建一个moduleA.js文件，按照约定，其模块名为文件名moduleA。函数define中用一个匿名函数返回一个对象。
define(function(requrie, exports, module) {
    module.exports = {
        name: 'jack',
        age: 31
    }
})

//第二步： 新建一个moduleB.js文件。按照约定，其模块名为文件名muduleB。模块moduleB依赖模块moduleA。define函数前两个参数是可选参数，可以省略。一般都直接用第三个参数factory来构建模块信息，factory工厂函数中可以通过require函数加载模块moduleA，并通过module.exports对外导出模块。
define(function(require, exports, module) {
    var moduleA = requrie('moduleA');
    module.exports = {
        showName: function() {
            console.log(moduleA.name);
        },
        getAge: function() {
            return moduleA.age;
        }
    }
})
// exports仅仅是module.exports的一个引用。在factory工厂函数内部exports重新赋值时并不会改变module.exports的值。因此给exports赋值时无效的，不能用来更改模块接口。

// 第三步：新建一个入口man.js，这个文件中仍然用define函数来定义一个模块main。模块main中用require('moduleB')语句引入模块moduleB，并赋值给内部变量moduleB，这样就可以利用moduleB来访问模块moduleB中的shoeName方法。
define(function(requrie, exports, module) {
    var moduleB = requrie('moduleB');
    console.log(moduleB);
    moduleB.showName();
    $('#mydiv').html('age = ' + moduleB.getAge())
})

//第四步：新建一个index.html文件来加载main.js文件，由于浏览器中并不能直接运行CMD模块代码，这里用sea.js库来加载CMD模块main.js
<!DOCTYPE html>
<html lang="en">
<head>
    ...
</head>
<body>
    <div id='mydiv'>body</div>
	<script type='text/javascript' src='sea.js'>
        seajs.use(['main.js'], function(main) {})
    </script>
</body>
</html>
```

#### （4）CommonJS规范

CommonJS规范规定，每一个文件就是一个模块，拥有自己独立的作用域，每个模块内部的module变量代码当前模块。module变量是一个对象，它的exports属性（module.exports）是对外的接口。当需要用require方法加载某个模块时，本质上是加载该模块的module.exports属性。

CommonJs API定义很多普通应用程序（主要是指非浏览器的应用）使用的API。这样的话，开发者可以使用CommonJs API编写各种类型的应用程序，且这些应用可以运行在不同的JavaScript解释器和不同的主机环境中。CommonJs的核心思想就是通过require方法来同步加载依赖的模块，通过exports或者module.exports来导出需要暴露的接口。

NodeJs是CommonJs规范的实现，而webpack打包工具也是原生支持CommonJs规范的。在兼容CommonJs的系统中，我们不但可以开发服务器端的JavaScript应用程序，而且可以开发图形界面应用程序等。

由于CommonJs是同步加载模块的，对于浏览器而言，需要将文件从服务器端请求过来加载就不太适用了，同步等待会出现浏览器“假死”的情况，因此CommonJs是不适用于浏览器端的。

虽然CommonJs编写的模块不适用于浏览器端，但是可以借助工具进行格式转换，从而适用浏览器端。

浏览器不兼容CommonJs的根本原因在于缺少Node.js环境的变量：module，exports、require和global。

```ts
// 第一步：新建一个moduleA.js文件，在moduleA.js文件中定义一个obj对象，并通过module.exports=obj导出模块信息。
var obj = {
    name: 'jack',
    age: 13
}
module.exports = obj;

// 第二步： 新建一个moduleB.js文件，首先用require('./moduleA.js')来表示当前模块依赖于模块文件moduleA.js,然后声明一个func的对象，里面包含showName和getAge方法，这两个方法都可以使用导入的moduleA.js文件中导出的对象obj。最后用module.exports = func导出模块信息。
var moduleA = require('./moduleA.js');
var func = {
    showName: function() {
        console.log(moduleA.name);
    },
    gerAge: function() {
        return moduleA.age
    }
};
module.exports = func;

// 第三步： 新建一个入口文件man.js。这个文件中首先用require('./moduleB.js')方法来加载moduleB.js库并将模块导出信息赋值给变量moduleB。然后可以通过变量moduleB来调用moduleB.js中的方法。
var moduleB = requrie('./moduleB.js');
// console.log(moduleB);
moduleB.showName();

//第四步：在vscode中配置启动项launch.json。CommonJs规范可以在NodeJS中运行，这里配置一个类型为node、启动文件为commonjs文件夹下的main.js。
{
    "version":"0.2.0",
        "configuration": [{
            "type": "node",
            "request": "launch",
            "name": "debug common.js",
            "program": "${workspaceFolfer}/commonjs\\main.js"
        }]
}
// 在vscode中直接调试。
```

#### （5）UMD

UMD（通用模块规范）是由社区想出来的一种整合了CommonJs和AMD两个模块定义规范的方法。UMD用一个工厂函数来统一不同模块定义规范。

UMD有两个基本原则： 所有定义的模块的方法需要单独传入依赖： 所有定义模块的方法都需要返回一个对象，供其他模块使用。UMD实现思路比较简单，先判断当前环境是否支持CommonJs模块机制（判断module和module.exports是否为object类型），如果存在就使用CommonJs规范进行模块加载；如果不存在就判断是否支持AMD（判断define和define.cdm是否存在），若存在则使用AMD规范加载模块，若前两个都不存在，则将模块暴露到全局变量window或global。

```ts
// 第一步：新建一个moduleA.js文件。安装UMD规范，首先判断当前环境是否支持CommonJs模块机制，如果不支持就判断是否支持AMD模块机制。
// moduleA.js中定义的是一个立即执行函数传入模块定义的工厂函数factory。在工厂函数factory中通过exports.obj=obj对外暴露接口。
(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v
    } else if (typeof define === 'function' && define.amd) {
        define(['require', 'exports'], factory);
    }
})(function (require, exports) {
    'use strict';
    exports._esModule = true;
    var obj = {
        name: 'jack',
        age: 31
    };
    exports.obj = obj;
})

//第二步： 新建一个moduleB.js文件。按照UMD规范，首先判断当前环境是否支持CommonJs模块机制，如果不支持就判断一下是否支持AMD模块机制。moduleB.js中定义的是一个立即执行函数传入模块定义的工厂函数factory。在工厂函数factory中通过exports.func = func对外暴露接口。
(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v
    } else if (typeof define === 'fucntion' && define.amd) {
        define(['require', 'exports', './moduleA'], factory);
    }
})(function(require, exports) {
    'use strict';
    exports._esModule = true;
    var moduleA_1 = requrie('./moduleA');
    var func = {
        showName: function() {
            console.log(moduleA_1.obj.name);
        },
        getAge: function() {
            return moduleA_1.obj.age;
        }
    };
    exports.func = func;
})

// 第三步： 新建一个入口文件man.js，该文件用define(['require', 'exports', './moduleB'], factory)和require('./moduleB')定义了在两种模块机制下该模块对moduleB的依赖关系。
(function(factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);
        if (v !== undefine) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(['require', 'exports', './moduleB'], factory);
    }
})(function(require, export) {
    'use strict';
    exports._esModule = true;
    console.log(requrie);
    var moduleB_1 = require('./moduleB');
    console.log(moduleB_1.func);
    moduleB_1.func.showName();
    $('#mydiv').html('age=' + moduleB_1.func.getAge())
})

// 第四步：新建一个index.html页面，用AMD方式来加载main.js文件。
<!DOCTYPE html>
<html lang="en">
<head>
    ...
</head>
<body>
    <div id='mydiv'>body</div>
	<script type='text/javascript' src='jquery.js'></script>
	<script type='text/javascript' src='require.js' data-main='main.js'></script>
</body>
</html>
```

#### （6）ES6规范

现在ES6规范支持模块化，根据规范可以直接用import和export在浏览器中导入和导出模块。一个js文件代表一个js模块。目前浏览器对ES6模块支持程度不同，一般都要借助工具进行转换，如使用babelJS把ES6代码转化为兼容ES5版本的代码。

ES6模块的基本特点：每一个模块织加载一次；每一个模块内声明的变量都是局部变量，不会污染全局作用域；模块内部的变量或者函数可以通过export导出；一个模块可以用inport导入其他模块。

```ts
// 第一步： 新建一个moduleA.js文件，首先定义一个obj对象，并用export导出obj
var obj = {
    name: 'jack',
    age: 31
}
export {obj}

// 第二步：新建一个moduleB.js文件。首先用import {obj} from './moduleA'导出模块中obj对象。然后就在moduleB中直接进行调用，最后用export {func}导出本模块定义的对象func
import {obj} from './moduleA';
var func = {
    showName: function() {
        console.log(obj.name);
    },
    getAge: function() {
        return obj.age
    }
}

//第三步： 新建一个入口文件man.js。使用import {func} from './moduleB'导入模块中的func对象，就可以调用func.showName方法了。
import {func} from './moduleB';
console.log(func);
func.showName()

// 第四步： 目前浏览器对ES6模块支持还不太好，不能直接在浏览器运行，可利用babel-node工具来运行。bable-node提供了在命令行直接运行ES6模块文件的便捷方式。
// 在vscode中配置启动项package.json
{
   ....
}
```

TypeScript会根据编译时指定的模块目标参数生成相应的供CommonJs、AMD、UMD或ES6模块加载系统使用的代码。

tsconfig.json中compilerOptions对象有一个module属性，可以用来指定模块目标，支持的值有'node'、'commonjs'、 'amd'、'system'、'umd'、'es2015'、'esnext'。因此，可以用如下命令生成CommonJs的模块系统：

```
tsc --module commonjs.\ts\main.js
```

## 6. TypeScript如何解析模块

模块解析是指编译器在查找导入模块内容时所遵循的流程。

假设有一个导入语句`import {m} from 'moduleA'`；为了检查导入的m模块是如何使用的，编译器需要准确地知道它表示什么，并且需要经常它的定义moduleA。

#### （1）模块导入路径解析

模块导入时的路径分为相对路径和非相对路径，不同类型的路径会以不同的方式进行解析。

相对路径导入模式是以"/"，"./"或"../"开头的：

```ts
import models from '/components/models';
import {config} from './config';
import '../database/db';
```



所有其他形式的导入被当作是非相对的，例如：

```ts
import * as $ from 'JQuery';
import {Component} from '@angular/core'
```

相对导入在解析是相对导入它的文件而已的，并且不能解析为一个外部模块声明。我们自己写的模块使用相对导入，这样能确保它们在运行时相对位置。

非相对模块的导入可以相对于baseUrl或通过路径映射来进行解析，使用非相对路径来导入你的外部依赖。

#### （2）模块解析策略

共有两种可用的模块解析策略：Node和Classic。可以使用 --moduleResolution标记来指定使用哪种模块解析策略。若未指定，则在使用了--module AMD|System|ES2015时的默认值为Classic，其他情况时则为Node。

Classic这种策略在以前是TypeScript默认的模块解析。现在它存在的理由主要是为了向后兼容。相对导入的模块是相对于它的文件进行解析。因此,/root/src/moduleA.ts文件里的import {b} from './moduleB'导入语句会使用下面的查找顺序：

```
/root/src/moduleB.ts
/root/src/moduleB.d.ts
```

对于非相对模块的导入，编译器会从包含导入文件的目录开始依次向上级目录遍历，尝试定位匹配的声明文件。假设在/root/src/moduleA.ts文件里有一个对moduleB模块的非相对导入，那么Import {b} from 'moduleB'导入语句会使用下面的查找顺序：

```
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts
```

Node这个解析策略在运行时按照Node.js模块的解析机制来解析模块。通常，在Node.js里导入时通过require函数调用进行的。node.js会根据require的是相对路径还是非相对路径做出不同的行为：

```
(1)如果X是内置模块（如requrie('http')）
	a. 返回该模块
	b. 不再继续执行
(2)如果X以'./','/','../'开头
	a. 根据X所在的父模块，确定X的绝对路径
	b. 将X当成文件，依次查找下面的文件，只要其中有一个存在，就返回该文件，不再继续执行。
	X
	X.js
	X.json
	X.node
	c. 将X当成目录，依次查找下面的文件，只要其中有一个存在，就返回该文件，不再继续执行。
	X/package.json(main字段)
	X/index.js
	X/index.json
	X/index.node
(3)如果X不带路径
	a. 根据X所在父模块，确定X可能的安装目录
	b. 依次在每个目录中，将X当成文件名或目录名加载
(4)抛出'not found'
```

假设是相对路径，为/root/src/moduleA.js，包含一个导入requrie('./moduleB')语句，那么Nodejs以下面的顺序解析这个模块moduleB：

首先检查/root/src/moduleB.js文件是否存在，存在则导入；不存在则检查/root/src/moduleB目录中是否包含一个package.json文件，如果包含package.json且package.json文件指定了一个"main"模块（假设为”mian“： ”libs/moduleB.js“）， 那么Node.js会引用/root/src/moduleB/libs/moduleB.js

如果没有package.json文件，就检查/root/src/moduleB目录是否包含一个index.js文件。如果没有找到就报错。

如果是非相对模块名的解析，NodeJs会在文件夹node_module里查找模块。node_modules可能与当前文件在同一级目录或者在上层目录里。NodeJs会向上级目录遍历，查找每个node_modules直到它找到要加载的模块。

TypeScript模仿NodeJs运行时的解析策略在编译阶段单位模块定义文件。但是TypeScript在Node.js解析逻辑基础上增加了TypeScript源文件的扩展名（.ts  .tsx  .d.ts）。同时，TypeScript在package.json里使用字段'types'属性来表示类似’mian‘的意义。编译器会使用它来找到要使用的’main‘定义文件。

#### （3）BaseUrl

在利用AMD模块加载器的应用里使用BaseUrl是常用的做法，要求在运行时模块都被放到一个文件夹里。这些模块的源码可以在不同的目录下，但是构建脚本会将它们集中到一起。设置BaseUrl来告诉编译器到哪里去查找模块。所有非相对模块导入都会被当作相对于BaseUrl。TypeScript编译器通过tsconfigjson中的BaseUrl来设置。

相对模块的导入不会被设置的BaseUrl所影响，因为它们总是相对于导入它们的文件。

#### （4）路径映射

有时模块不是直接放在BaseUrl下面。比如jquery模块的导入，在运行时可能被解释为“node_modules/jquery/dist/jquery.slim.min.js”。加载器使用映射配置来将模块名映射到运行时的文件。TypeScript编译器通过使用tsconfig.json文件里的“paths”来支持这样的声明映射。

```json
{
    "compilerOptions": {
        "baseUrl": ".", //paths提供的话，必须提供该属性
        "paths": {
            "jquery": ['node_modules/jquery/dist/jquery'] // 此处映射是相对于“BaseUrl”的
        }
    }
}
```

“paths”是相对于“BaseUrl”进行解析的。

通过paths属性，还可以指定复杂的映射，包括指定多个位置。假设在一个项目中一些模块位于目录A中，而其他的模块位于目录B中，在项目构建过程中，可以用工具将模块集中到一处。

```
root
|---folder1
|	|---file1.ts  (imports 'folder1/file2' and 'folder2/file3')
|	|---file2.ts
|---generated
|	|---folder1
|	|---folder2
|		|---file3.ts
|---tsconfig.json
```

那么对应的tsconfig.json文件：

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "*": [
                "*",
                "generated/*"
            ]
        }
    }
}
```

这个tsconfig.json告诉编译器匹配所有“*”模式的模块导入会在以下两个位置查找：

* “*”表示模块名字不变。映射为<模块名>的路径将转换成`<baseUrl>/<模块名>`
* "generated"表示模块名前添加路径generated作为前缀，映射为<模块名>的路径将转换成`<baseUrl>/generated/<模块名>`

在对file.ts中的导入模块语句import 'folder1/file2'进行解析时，首先匹配“*”模式且通配符捕抓到整个文件名。folder1/file2为非相对路口，需要结合BaseUrl属性值来进行合并，也就是root/folder1/file2.ts。由于此文件存在，因此导入完成。

在对file.ts中的导入模块语句import 'folder2/file3'进行解析时，首先匹配“`*`”模式且通配符捕获到整个文件名。folder/file3为非相对路径，需要与baseUrl进行合并，也就是root/folder2/file3.由于次文件不存在，因此用第二个"`generated/*`"进行匹配。可以匹配到generated/folder2/file3。此路径为非相对路径，需要与baseUrl进行合并，也就是root/generated/folder2/file3，此文件存在，导入完成。

另外，可以利用rootDirs指定虚拟目录。有时多个目录下的项目源文件在编译时会进行合并，放在某一个输出目录中。这个输出目录可以看作是一些源目录的一个虚拟目录。利用rootDirs属性可以告诉编译器生成这个虚拟目录，此时编译器就可以在虚拟目录中解析相对模块导入，就好像不同的目录被合并到一个输出目录中一样。

```
root
|---src
|	|---views
|		|---view1.ts  (imports './template1')
|		|---view2.ts
|---generated
|	|---templates
|		|---views
|			|---template1.ts (imports './view2')
|---tsconfig.json
```



rootDirs属性是一个数组，可以指定一个roots虚拟目录数组列表，列表里的内容会在运行时合并，这个tsconfig.json内容如下：

```json
{
    "compilerOptions": {
        "rootDirs": {
            "src/views",
            "generated/templates/views"
        }
    }
}
```

每当编译器在rootDirs的子目录下发现了相对模块导入，就会尝试从每一个rootDirs中导入。rootDirs的灵活性不仅仅在于其指定了要在逻辑上合并的物理目录列表，还体现在它提供的数组可以包含任意数量的任何名字的目录，不论它们是否存在。

## 7. 声明合并

在TypeScript中，声明合并是指编译器针对同一个名字的两个独立声明合并为单一声明，合并后的声明同时拥有原先两个声明的特性。任何数量的声明都可以被合并。

TypeScript中声明合并支持命名空间、接口和类。下面对接口。命名空间和类的声明合并进行说明。

#### （1）合并接口

最简单也最常见的声明合并类型就是接口合并。从根本上说，合并的机制是把双方的成员放到一个同名的接口里。接口的非函数成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型。如果两个接口中同时声明了同名的非函数成员且它们的类型不同，则编译器会报错。

对应函数成员，每个同名函数声明都会被当成这个函数的一个重载。同时需要注意，当接口A与后来的接口A合并时，后面的接口具有更高的优先级。

```ts
interface Ishape {
    height: number;
    width: number;
}
interface Ishape {
    scale: number
}

let rect: IShape = {heigth: 5, width: 6, scale: 10}

// 上面声明了两个同名的接口Ishape，但是其内部定义的属性不同，接口进行合并后就等同于：
interface Ishape {
    scale: number;
    heigth: number;
    width: number
}
let rect: IShape = {
    height: 5, width: 6, scale: 10
}
```

每组接口里的声明顺序保持不变，但各组接口之间顺序是后来的接口重载出现在考前位置。

# 六. 泛型

泛型是TypeScript语言中的一种特性。TypeScript是一种静态类型语言，函数或方法中参数往往都是有类型限定的。我们在编写程序时，经常会遇到两个方法的功能非常相似、参数个数也一样，只是处理的参数类型不同。例如，一个是处理number类型的数据，另一个是处理string类型的数据。如果不借助泛型，那么一般需要写多个方法，分别用来处理不同的数据类型。

泛型能够在方法中传入通用的数据类型，使多个方法合并成一个，它可将类型参数化，以达到代码复用、提高代码通用性的目的。

## 1. 泛型的定义

泛型是程序设计语言的一种特性。泛型是一种参数化类型。定义函数或方法时参数是形参，调用此函数或方法时传递的参数值是实参。那么参数化类型就是将类型由原来具体的类型变成一种类型参数，然后在调用时才传入具体的类型作为参数，调用时传入的类型称为类型实参。

在使用过程中，泛型操作的数据类型会根据传入的类型实参来确定。泛型可以用在类、接口和方法中分别被称为泛型类、泛型接口和泛型方法。泛型类和泛型方法同时具备通用性、类型安全和性能，是非泛型类和非泛型方法无法具备的。

泛型为TypeScript语言编写面向对象程序带来极大的便利和灵活性。泛型不会强行对值类型进行装箱和拆箱，或对引用类型进行强制类型转换，所以性能得到提高。泛型为开发者提供了一种高性能的编程方式，能够提高代码的重用性，并允许开发者编写非常优雅的代码。

#### （1）泛型函数的定义

泛型函数必须使用<>括起泛型类型参数T，跟在函数名后面，后续就可以用T来表示此类型。

泛型函数的基本语法为：

```ts
function 函数名<T>(参数1:T, ..., 参数n: 类型): 返回类型 {
    //函数体
}
```

其中，泛型函数中必须在函数名后用类型参数`<T>`，参数既可以没有也也是多个。一般情况下，泛型函数参数中都有一个用T定义的形参。泛型函数返回类型既可以用T来定义，也可以是其他类型。

#### （2）泛型类的定义

泛型类必须使用<>括起来参数T，跟在类名后面，后续就可以用T来表示此类型。泛型类的基本语法为：

```ts
class 类名<T> {
    //属性和方法签名
}
```

其中，类中的属性或方法都需要用类型参数T来约定类型，否则声明一个父类也就失去了实际意义。

方法签名是由方法名和形参列表共同组成的方法头。

#### （3）泛型接口的定义

泛型接口可以使用<>括起泛型类型参数T，跟着接口后面，后续就可以用T来表示此类型。泛型接口的基本语法为：

```ts
interface 接口名<T> {
    // 属性和方法签名
}
```

无法参加泛型枚举和泛型命名空间。

## 2. 详解泛型变量

泛型变量一般用大写字母T表示，如果有多个不同的泛型变量，可以同时用T、U和K表示。泛型变量T必须放于<>符号中才能告诉编译器是一个泛型变量，而不是一个普通的字母。

泛型变量T一般不能单独出现，会出现在函数、接口和类中。在函数体内，由于编译器并不知道泛型变量T定义的参数的具体数据类型，因此只能认为其为任意值类型。

```ts
function entitySave<T> (entity: T): boolean {
    let ret = false;
    try {
        console.log("save entity to db");
        // save (entity);
        ret = true;
    }
    catch (e) {
        ret = false;
        console.log(e)
    } finally {
        return ret;
    }
}
```

## 3. 详解泛型函数

泛型函数必须使用<>括起泛型参数T，跟在函数名后面。泛型函数可以用一个通用的函数来处理不同的数据类型，从而提高代码的重用性。

```ts
function echo<T>(msg: T): T {
    console.log(msg);
    return msg;
}
// 上面定义了一个泛型函数，它的类型参数是T，可以代表任意类型，函数中有一个形参msg为T类型，返回值类型也是T类型。
// 调用泛型函数：
let g = echo<string>('hello world');
console.log(typeof g); //'string'
// 由于T的类型和参数msg的类型是一致的，因此，使用类型推断，编译器可以根据传入的参数自动为T指定类型：
let g = echo('hello world')
console.log(typeof g) // 'string'
```

泛型函数内部泛型参数T只能当作一个any类型值来使用，并不能调用可能存在的方法或属性。如果通过类型断言，就可以打破这个限制：

```ts
function echo<T> (msg:T): T {
    if (typeof msg === 'string') {
        console.log((<string><unknow>msg).length)
    } else if (typeof msg === 'number') {
        console.log((<number><unknown>msg).toFixed(2));
    } else {
        console.log(typeof msg)
    } 
    return msg;
}
echo('222');
echo(222)

// 用typeof判断参数msg的类型是否为string，如果是，就用类型断言(<string><unknown>msg)将其转为字符串类型，并调用length属性；如果不是字符串类型，判断是否为数值类对象，如果是就用类型断言(<number><unkown>msg)将其转为数值类型，并调用toFixed方法。
```

`<string><unkown>msg`也可以写成`<string>msg`

假设有一个学生管理信息系统，其中需要对学生和老师对象进行数据处理（增、删、改、查）。如果没有泛型，那么需要写两个数据处理的类来分别对学生实体和老师实体进行处理，借助泛型，可以对应该通用的数据处理方法对不同实体进行数据处理。

## 4. 详解泛型类

泛型类必须使用<>括起泛型类型参数T，跟在类名后面。

类是面向对象编程中一个非常重要的概念。类是现实问题的抽象，包括实现事物的主要属性和行为。

假设现在有一个简单的学生管理信息系统需要开发，通过做需求分析，我们梳理出这个系统主要有几个实体：学生、老师和课程。通过分析，我们明确了学生、老师和课程这几个实体的属性，并将其转成类。

```ts
// 学生实体有学号（XH,字符型）、姓名（name, 字符型）和班级名称（clazz,字符型）
class Student {
    XH: string;
    name: string;
    clazz: string;
    constructor(XH: string, name: string, clazz: string) {
        this.XH = XH;
        this.name = name;
        this.clazz = clazz;
    }
}
// 老师实体有工号（GH，字符型）和姓名（name， 字符型）
class Teacher {
    GH: string;
    name: string;
    constructor(GH: string, name: string) {
        this.GH = GH;
        this.name = name;
    }
}
```

作为一个管理系统，必须对学生和老师相关数据进行处理，一般来说就是增删改查。如果没有泛型，那么需要写多个非常类似的数据处理类，分别对学生实例和老师类实例进行处理。

基于泛型类和泛型接口，可以构建一个通用的后台数据操作类，GenericDAOI。该类是泛型类：

```ts
interface IGeneric<T> {
    arg: T;
    save(arg: T): boolean;
}
class GenericDAO<T> implements IGeneric<T> {
    arg: T;
    save(arg: T): boolean {
        let ret = false;
        try { 
        	console.log("svae to do");
            //save(arg);
            ret = true;
        } catch(e) {
            console.log(e);
            ret = false;
        } finally {
            return ret;
        }
    }
    
}
// 对学生和老师等不同的数据进行操作：
let student = new Student('0906', 'jack'm '高三一班');
let teacher = new Teacher('T1008', 'Smith');
let geDao = new GenericDAO<Student>();
let ret = getDao.save(student);
let geDao2 = new GenericDAO<Teacher>();
ret = geDao2.save(teacher);
console.log(ret)
```

## 5. 详解泛型约束

泛型参数T类似于any类型，可以表示任意值。但是有些情况下，函数需要处理的数据有一定的约束，比如有一个分泛型函数需要访问参数T的length属性，并加1.基于这种需求，必须对泛型参数T进行约束，也就是泛型约束。

泛型约束的语法为：

```
T extends 接口或类
```

```ts
// 为了直观地理解泛型约束的相关内涵，首先定义一个接口来明确约束条件，给出一个用于约束泛型的接口IGeneric，其中有一个属性length：
interface IGeneric {
    length: number;
}
// 创建一个泛型类GenericAdd,此泛型类的T需要继承这个接口以实现泛型约束。
class GenericAdd<T extends IGeneric> {
    arg: T;
    add(arg: T): boolean {
        this.arg = arg;
        arg.length ++;
        return true;
    }
    getLength() {
        return this.arg.length
    }
}
// <T extends IGeneric>创建了一个带约束的泛型类。泛型类型T必须有一个length属性，否则无法作为泛型类GenericAdd的参数。
class ObjLen {
    length = 2;
    name = 'obj';
}
let obj = new ObjLen();
let geDao = new GenericAdd<ObjLen>().add(obj);
let geDao2 = new GenericAdd<string>().add('hello');
// let geDao3 = new GenericAdd<number>(); //报错，没有name属性
```

除了用接口作为泛型约束外，还可以用一个类型参数约束另一个类型参数。比如，现在想要用属性名从对象obj中获取属性，并且要确保这个属性存在于对象obj中，那么需要在这两个类型参数之间使用约束。

```ts
// 索引类型（Index types）
function getProperty<T, K, extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let obj = {a: 1, b: 2, c: 3, d: 4};
let x = getProperty(obj, "a"); //1
let m = getProperty(obj, 'm'); //报错
// keyof T 是索引类型查询操作符，索引类型属于TypeScript中的高级类型。
```



























.