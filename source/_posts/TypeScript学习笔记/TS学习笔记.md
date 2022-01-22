---
title: TS学习笔记
date: 1604644118706.432
tags:
- TypeScript
category:
- TypeScript学习笔记
---
# 琐碎笔记

## 一. ES6 Modules 和 CommonJS

**[深入 CommonJs 与 ES6 Module](https://www.cnblogs.com/qixidi/p/10287679.html)**



## 二. Typescript 和 Javascript

[**Typescript 和 Javascript之间的区别**](https://www.cnblogs.com/langzianan/p/8403332.html)

## 三. 

#### 1. 类型声明空间

类型声明：

```ts
class Foo {};
interface Bar {};
type Bas = {};
```

将上面作为类型注释：

```ts
let foo: Foo;
let bar: Bar;
let bas: Bas;
```

**注意**： 尽管定义了interface Bar，却并不能把它作为一个变量来使用，因为他没有定义在变量空间中。

```ts
interface Bar {};
const bar = Bar; //Error
```

#### 2. 变量声明空间

变量声明空间包含可用变量的内容，在上文中 class Foo提供了一个类型Foo到类型声明空间，此外它同样提供了一个变量Foo到变量声明空间。

```ts
class Foo {};
const someVar = Foo;
const someOtherVar = 123;
```

**注意**： 一些用var声明的变量，也只能在变量声明空间使用，不能用作类似注解。

```ts
const foo = 123;
let bar: foo; //Error
```

#### 3. 类型注解

```ts
const num: number = 123;
function identity(num: number): number{
	return num
}
```

JavaScript**原始类型**也同样适应于TypeScript的类型系统，因此string，number，boolean也可以被用作类型注解。

```ts
let num: number;
let str: string;
let bool: boolean;
num = 123;
num = 123.456;
num = '123'; //Error
str = '123';
str = 123; //Error
bool = true;
bool = false;
bool = 'false'; //Error
```

**数组**：

```ts
let boolArray: boolean[];
boolArray = [true, false];
console.log(boolArray[0]);
console.log(boolArray.length);
boolArray[1] = true;
boolArray = [false, false];
boolArray[0] = 'false'; //Error
boolArray = 'false'; //Error
boolArray = [true, 'false']; //Error
```

**接口**：

```ts
interface Name {
    first: string;
    second: string;
}
let name: Name;
name = {
    first: 'John',
    second: 'Doe'
};
name = {
    // Error: 'second is missing'
    first: 'John'
}
name = {
    // Error: 'second is the wrong type'
    first: 'John',
    second: 1337
}
```

**内联类型**：

```ts
let name: {
    first: string;
    second: string;
};
name = {
    first: 'John',
    second: 'Doe'
};
name = {
     // Error: 'second is missing'
    fisrt: 'John'
};
name = {
    // Error: 'second is the wrong type'
    first: 'John',
    second: 1337
}
```

**特殊类型**： any、null、undefined、void

```ts
let power: any;
power = '123';
power = 123;
let num: number;
power = num;
num = power;
```

```ts
let num: number;
let str: string;
num = null;
str = undefined;
```

```ts
function log(message: string): void {
    console.log(message);
}
```

**泛型**

```ts
function reverse<T>(items: T[]):T[] {
    const toreturn = [];
    for (let i = items.length - 1; i >= 0; i --) {
        toreturn.push(items[i])
    }
    return toreturn
}
const sample = [1, 2, 3];
let reversed = reverse(sample);
console.log(reversed); //3, 2, 1
reversed[0] = '1'; //Error
reversed = ['1', '2']; //Error
reversed[0] = 1; //Ok
reversed = [1, 2]; //Ok
```

**联合类型**

```ts
function formatCommandline(command: string[] | string) {
    let line = '';
    if (typeof command === 'string') {
        line = command.trim();
    } else {
        line = command.join(' ').trim();
    }
}
```

**交叉类型**

```ts
function extend<T extends object, U extends object> (first: T, second: U): T & U {
    const result = <T & U>{};
    for (let id in first) {
        (<T>result)[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<U>result[id] = second[id]);
        }
    }
    return result
}
const x = extend({a: 'hello'}, {b: 42});
const a = x.a;
const b = x.b;
```

**元组类型**

```ts
let nameNumber: [string, number];
nameNumber = ['tom', 123];
nameNumber = ['tom', '123']; //Error
const [name, num] = nameNumber;
```

**类型别名**

```ts
type StrOrNum = string | number;
// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';

// 会检查类型
sample = true; // Error
type Text = string | { text: string };
type Coordinates = [number, number];
type Callback = (data: string) => void;
```

#### 4. 减少错误

```ts
let foo = 123;
let bar = 'hey';
bar = foo; //Error
bar = foo as any; //Ok
```

```ts
function foo() {
    return 1;
}
let bar = 'hey';
bar = foo(); //Error
```

```ts
function foo(): any{
    return 1;
}
let bar = 'hey';
bar = foo();
```

#### 5. 接口

```ts
//内联注释：
declare const myPoint: {x: number; y: number};
//等效于下面的接口形式：
interface Point {
    x: number;
    y: number;
}
declare const myPoint: Point;
```

**类可以实现接口**：

如果希望在类中使用必须被遵循的接口或别人定义的对象结构，可以使用 implements关键字来确保其兼容性：

```ts
interface Point {
    x: number;
    y: number;
}
class MyPoint implements Point {
    x: number;
    y: number;
}
```

基本上，在implements存在的情况下，该外部Point接口的任何更改都将导致代码库中的编译错误，因此可以轻松地使其保持同步。

```ts
interface Point {
    x: number;
    y: number;
    z: number;
}
class MyPoint implements Point {
    //Error: missing member;
    x: number;
    y: number
}
```

**注意**： implements限制了类实例的结构，如下所示：

```ts
let foo:Point = new MyPoint();
```

#### 6. 枚举

```ts
enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades
}
let Card = CardSuit.Clubs;
// 类型安全
Card = 'not a member of card suit'; // Error: string 不能赋值给 `CardSuit` 类型
```

数字类型枚举与数字类型：

```ts
enum Color {
  Red,
  Green,
  Blue
}

let col = Color.Red;
col = 0; // 有效的，这也是 Color.Red
```

默认情况下，第一个枚举值是 `0`，然后每个后续值依次递增 1：

```ts
enum Color {
  Red, // 0
  Green, // 1
  Blue // 2
```

但是，你可以通过特定的赋值来改变给任何枚举成员关联的数字，如下例子，我们从 3 开始依次递增：

```ts
enum Color {
  DarkRed = 3, // 3
  DarkGreen, // 4
  DarkBlue // 5
}
```

#### 7. 函数

**参数注解**

```js
let sampleVariable: {bar: number};
function foo(sampleParameter: {bar: number}){}
```

**返回类型注解**

```ts
interface Foo {
    foo: string;
}
function foo(sample:Foo): Foo {
    return sample;
}
```

通常，不需要注解函数的返回类型，因为它可以由编译器推断：

```ts
interface Foo {
    foo: string;
}
function foo(sample: Foo) {
    return sample; //inferred return type 'Foo'
}
```

**可选参数**

```ts
function foo(bar: number, bas?:string): void {
    //..
}
foo(123);
foo(123, 'hello')
```

**默认参数**

```ts
function foo(barL number, bas:string = 'hello') {
    console.log(bar, bas)
}
foo(123); //123, hello
foo(123, ;world); //123, world
```

**函数声明**

```ts
//在没有提供函数实现的情况下，有两种函数类型的方式：
type longHand = {
    (a: number): number;
}
type ShortHand = (a:number) => number;
//当想使用函数重载时，只能用第一种方式：
type LongHandAllowsOverloadDeclarations = {
    (a: number): number;
	(a: number): string
};
```

#### 8. 可调用的

可以使用类型别名或者接口来表示一个可被调用的类型注解：

```ts
interface ReturnString {
    (): string;
}
```

它可以表示一个返回值为string的函数：

```ts
declare const foo: ReturnString;
const bar = foo(); //bar 被推断为一个字符串
```

#### 9. 类型断言

```ts
const foo = {};
foo.bar = 123;
foo.bas = 'hello' 
//Error  'bar','bas'属性不存在于{}
```

上面错误可通过类型断言来避免：

```ts
interface Foo {
    bar: number;
    bas: string
}
const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

类型断言可能存在害处，如果没有按照约定添加属性，typescript编译器并不会对此发出错误警告：

```ts
interface Foo {
    bar: number;
    bas: string;
}
const foo = {} as Foo;
// 忘记了什么
```

#### 10. readonly

typescript类型系统允许你在一个接口使使用readonly来标记属性。

```ts
function foo(config:{readonly bar: number, readonly bas: number}) {
    //...
}
const config = {bar: 123, bas: 123};
foo(config);
```

```ts
type Foo = {
    readonly bar: number;
    readonly bas: number;
};
const foo: Foo = {bar: 123, bas: 456};
foo.bar = 456//Error
```

```ts
//也能指定一个类的属性为只读，然后声明时或者构造函数中初始化它们。
class Foo {
    readonly bar = 1;
    readonly baz: string;
    constructor() {
        this.baz = 'hello'; //ok
    }
}
```

有一个**Readonly**的映射类型，它接收一个泛型T，用来把它的所有属性标记为只读类型：

```ts
type Foo = {
    bar: number;
    bas: number;
};
type FooReadonly = Readonly<Foo>;
const foo: Foo = {bar: 123, bas: 456};
const fooReadonly: FooReadonly = {bar: 123, bas: 456};
foo.bar = 456;
fooReadonly.bar = 456; //Error
```

甚至可以把索引标记为只读：

```ts
interface Foo {
    readonly [X: number]: number;
}
const foo: Foo = {0: 123, 2: 345};
console.log(foo[0]);
foo[0] = 456; //Error
```

```ts
let foo:ReadonlyArray<number> = [1, 2, 3];
console.log(foo[0]);
foo.push(4); //Error
foo = foo.concat(4); //ok
```

#### 11. 泛型

设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：

* 类的实例成员
* 类的方法
* 函数参数
* 函数返回值

```ts
class Queue {
    private data = [];
    push = item => this.data.push(item);
    pop = () => this.data.shift()
}
const queue = new Queue();
queue.push(0);
queue.push('1');
```

```ts
class QueueNumber {
    private data = [];
    push = (item: number) => this.data.push(item);
    pop = (): number => this.data.shift();
}
const queue = new QueueNumber();
queue.push(0);
queue.push('1'); //Error
```

```ts
class Queue<T> {
    private data: T[] = [];
    push = (item: T) => this.data.push(item);
    pop = (): T | undefined => this.data.shift();
}
const queue = new Queue<number>();
queue.push(0);
queue.push('1'); //Error
```















































