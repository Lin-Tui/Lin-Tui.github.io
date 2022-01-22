---
title: This
date: 1588849425676.1113
tags:
- JavaScript
category:
- JavaScript学习笔记
---
this 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计
得更加简洁并且易于复用。

this 在任何情况下都不指向函数的词法作用域。

this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调

用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包

含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this 就是记录的

其中一个属性，会在函数执行的过程中用到。

# **绑定规则**

来看看在函数的执行过程中调用位置如何决定 this 的绑定对象。

你必须找到调用位置，然后判断需要应用下面四条规则中的哪一条。我们首先会分别解释

这四条规则，然后解释多条规则都可用时它们的优先级如何排列。

### **默认绑定**

最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用
其他规则时的默认规则。

首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用
其他规则时的默认规则。
例子：

```js
function foo() {
console.log( this.a );
}
var a = 2;
foo(); // 2
```

当调用 foo() 时，this.a 被解析成了全局变量 a。为什么？因为在本例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。
那么怎么知道这里应用了默认绑定呢？

可以通过分析调用位置来看看 foo() 是如何调用的。在代码中，foo() 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。
如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此 this 会绑定
到 undefined：

```js
function foo() {
"use strict";
console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined
```

这里有一个微妙但是非常重要的细节，虽然 this 的绑定规则完全取决于调用位置，但是只
有 foo() 运行在非 strict mode 下时，默认绑定才能绑定到全局对象；严格模式下与 foo()
的调用位置无关：

```js
function foo() {
console.log( this.a );
}
var a = 2;
(function(){
"use strict";
foo(); // 2
})();
```

通常来说你不应该在代码中混合使用 strict mode 和 non-strict mode。整个程序要么严格要么非严格。然而，有时候你可能会用到第三方库，其严格程度和你的代码有所不同，因此一定要注意这类兼容性细节。

### 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

例子：

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2
```

需要注意的是 foo() 的声明方式，及其之后是如何被当作引用属性添加到 obj 中的。但是无论是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于
obj 对象。
然而，调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象“拥有”或者“包含”它。
无论你如何称呼这个模式，当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引
用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调
用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。

对象属性引用链中只有最顶层或者说最后一层会影响调用位置。举例来说：

```js
function foo() {
    console.log( this.a );
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 42
```

**隐式丢失**：

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式。
思考下面的代码：

```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的
bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。
一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```js
function foo() {
	console.log( this.a );
}
function doFoo(fn) {
	// fn 其实引用的是 foo
	fn(); // <-- 调用位置！
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样。
如果把函数传入语言内置的函数而不是传入你自己声明的函数，会发生什么呢？结果是一样的，没有区别：

```js
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout( obj.foo, 100 ); // "oops, global"
```

JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似：

```js
function setTimeout(fn,delay) {
	// 等待 delay 毫秒
	fn(); // <-- 调用位置！
}
```

就像我们看到的那样，回调函数丢失 this 绑定是非常常见的。除此之外，还有一种情况 this 的行为会出乎我们意料：调用回调函数的函数可能会修改 this。在一些流行的JavaScript 库中事件处理器常会把回调函数的 this 强制绑定到触发事件的 DOM 元素上。这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷。遗憾的是，这些工具通常无法选择是否启用这个行为。

### 显式绑定

如果不想在对象内部包含函数引用，而想在某个对象上强制调用函数，都可以使用 call(..) 和 apply(..) 方法。

思考下面的代码：

```js
function foo() {
console.log( this.a );
}
var obj = {
a:2
};
foo.call( obj ); // 2
```

通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。
如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者new Number(..)）。这通常被称为“装箱”。

可惜，显式绑定仍然无法解决我们之前提出的丢失绑定问题，是显式绑定的一个变种可以解决这个问题：

**硬绑定**：

```js
function foo() {
	console.log( this.a );
}
var obj = {
	a:2
};
var bar = function() {
	foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call( window ); // 2
```

上面代码创建了函数 bar()，并在它的内部手动调用
了 foo.call(obj)，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它
总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。

硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值：

```js
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 2
};

var bar = function() {
    return foo.apply(obj, arguments);
}

var b = bar(3); // 2  3
console.log(b); // 5
```

另一种使用方法是创建一个 i 可以重复使用的辅助函数：

```js
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
// 简单的辅助绑定函数
function bind(fn, obj) {
	return function() {
	return fn.apply( obj, arguments );
};
}
var obj = {
	a:2
};
var bar = bind( foo, obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

由于硬绑定是一种非常常用的模式，所以在 ES5 中提供了内置的方法 Function.prototype.
bind。

### new绑定

“构造函数”是类中的一些特殊方法，使用 new 初始化类时会调用类中的构造函数。

首先我们重新定义一下 JavaScript 中的“构造函数”。在 JavaScript 中，构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。

# 优先级

如果某个调用位置可以应用多条规则该怎么办？为了解决这个问题就必须给这些规则设定优先级。

**默认绑定的优先级是四条规则中最低的**，所以我们可以先不考虑它。

隐式绑定和显式绑定哪个优先级更高？我们来测试一下：

```js
function foo() {
	console.log( this.a );
}
var obj1 = {
	a: 2,
foo: foo
};
var obj2 = {
	a: 3,
	foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

**显式绑定优先级比隐式绑定更高**，也就是说在判断时应当先考虑是否可以应用显式绑定。

现在我们需要搞清楚 new 绑定和隐式绑定的优先级谁高谁低：

```js
function foo(something) {
this.a = something;
}
var obj1 = {
foo: foo
};
var obj2 = {};
obj1.foo( 2 );
console.log( obj1.a ); // 2
obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3
var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

可以看到 **new 绑定比隐式绑定优先级高**。但是 new 绑定和显式绑定谁的优先级更高呢？

















































（1）默认绑定

 

首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用

其他规则时的默认规则。

 