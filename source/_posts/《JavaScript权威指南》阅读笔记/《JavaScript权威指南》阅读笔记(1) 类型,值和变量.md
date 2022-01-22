---
title: 《JavaScript权威指南》学习笔记(1) 类型,值和变量
date: 1581337943459.8806
tags:
- JavaScript
category:
- 《JavaScript权威指南》学习笔记
---
# 第2章  词法结构

JavaScript标识符必须以字母，下划线，美元符开始，后续的字符可以是字母，数字，下划线或美元符。

常见保留字：

`break	delete	function	return	typeof	case	do	if	swicth	var	catch	else	in	this	void	continue	false	instanceof	throw	while	debugger	finally	new	true	`

JavaScript预定义了很多全局变量和函数，应当避免把它们的名字用做变量名和函数名：

`arguments	encodeURI		Infinity	Number	RegExp	Array	encodeURIComonent	isFinite	Object	String	Date	eval	JSON	parseInt	TypeError	decodeURI	EvalError	Math	RangeError	undefined	decodeURIComponent	Function	NaN	ReferrnceError	URIError`

# 第3章  类型，值和变量

JavaScript数据类型分为两类：原始类型  和 对象类型

原始类型包括：数字，字符串 ，布尔值，`null`，`undefined`

特殊的对象：函数，数组   

JavaScript定义的几种类：数组（`Array`）类，函数（`Function`）类，日期（`Date`）类，正则（`RegExp`）类，错误（`Error`）类

### 1. JavaScript中的算术运算

JavaScript不区分整数值和浮点数值，所有数字均用64位的浮点数值表示。

十六进制的直接量以“`0x`”或“`0X`”为前缀

八进制的直接量以“`0`”为前缀

JavaScript中算术运算在溢出，下溢，被零整除时不会报错。

被零整除时，只是简单返回无穷大（`Infinity`）或负无穷大（`-Infinity`）。

零除零是没有意义的，这种整除结果是非数字，用`NaN`表示。

非数字`NaN`：它和任何值都不相等，包括自身，也就是说没有方法通过`x == NaN`来判断变量x是否是`NaN`。相反应当使用`x ！= x`来判断，当且仅当x为`NaN`时，表达式结果为`true`。函数`isNaN()`作用与此相似，如果参数为`NaN`或者是一个非数字值，则返回`true`。JavaScript中有一个类似的函数`isFinite()`，在参数不是`NaN`，`Infinity`，或`-Infinity`的时候返回`true`。

负零值同样有些特别，它和正零值相等。

```
var zero = 0;
var negz = -0;
zero === negz; //true    
1/zero === 1/negz;  // false  正无穷大 和 负无穷大 不相等
```

### 2. 浮点数直接量

```
var x = .3 - .2;
var y = .2 - .1;
x === y; //false;
x == .1; //false;
y == .1; //true;
```

### 3. 字符串

将加法（+）运算符用于数字，表示两树相加。但将它用于字符串，则表示字符串连接，将第二个字符串拼接在第一个之后。

JavaScript中字符串是固定不变的，类似`replace()`和`toUpperCase()`的方法都返回新字符串，原字符串并没有发生改变。

### 4. 布尔值

任意JavaScript的值都可以转换为布尔值。

`undefined`，`null`，`0`，`-0`，`NaN`，“``”这些值会被转换成`false`。

其他所有值，包括所有对象（数组）都会转换成true。

### 5. null，undefined

对`null`执行`typeof`运算，结果返回字符串“`object`”。

`undefined`不是关键字，对其进行`typeof`运算，返回“`undefined`”

```
null == undefined //true
null === undefined //false
```

### 6. 全局对象

当JavaScript解释器启动时，它将创建一个新的全局对象，并给它一组定义的初始属性：

- 全局属性，比如`undefined`，`Infinity`，`NaN`
- 全局函数，比如`isNAN()`, `parseInt()`, `eval()`
- 构造函数，比如`Date()`, `RegExp()`, `String()`, `Object()`和`Array（）`
- 全局对象，比如`Math`, `JSON`

### 7. 不可变的原始值和可变的对象引用

JavaScript中原始值（`null`，`undefined`，数字，布尔值，字符串）与对象（包括数组和函数）有着根本区别。

- 原始值是不可更改的；任何方法都无法更改一个原始值。

- 原始值的比较是值的比较：只有在它们值相等时才相等。如果比较两个单独的字符串，并且仅当它们的长度相等且每个索引的字符都相等时，JavaScript才认为它们相等。

- 对象和原始值不同，它们是可变的，它们的值是可修改的：

  ```
  var o = { x : 1 }; //定义一个对象
  o.x = 2; // 通过修改对象属性值来更改对象
  o.y = 3; // 在此更改这个对象，给它增加一个新属性
  
  var a = [1,2,3]; // 数组也是可修改的
  a[0] = 0; // 更改数组的一个属性
  a[3] = 4; // 给数组增加一个新元素
  ```

- 对象的比较并非值的比较，即使两个对象包含同样的属性及相同的值，它们也是不相等的。各个索引元素相等的两个数组也不相等。

  ```
  var o = { x : 1 },p = { x : 1 }; 
  o === p; //false:两个单独的对象永不相等
  var a = [],b = []; //两个空数组
  a === b; //false：两个单独的数组永不相等
  ```

  通常将对象称为引用类型。对象值都是引用，对象的比较均是引用的比较：当且仅当它们引用同一个基对象时，它们才相等。

  ```
  var a = []; // 定义一个引用空数组的变量a
  var b = a; // 变量b引用同一个数组
  b[0] = 1; // 通过变量b来修改引用的数组
  a[0] // 1；变量a也会修改
  a === b // true；a和b引用同一个数组，因此它们相等
  ```

  将对象赋值给一个变量，仅仅是赋值的引用值，对象本身并没有复制一次。

### 8. 类型转换

```
10 + " object" // "10 object";数字10转换成字符串
"7"*"4" // 28；两个字符串均转换为数字
var n = 1 - "x"; // NaN；字符串“x”无法转换为数字
n + "object" // “NaN object”；NaN转换为字符串“NaN”
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211193306621.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

- #### 转换和相等性

  JavaScript可以做灵活的类型转换，因此“==”相等运算符也随相等的含义灵活多变。

  ```
  null == undefined //true
  "0" == 0 //true 比较前字符串转换成数字
  0 == false //true 在比较之前布尔值转换成数字
  "0" == false //true在比较前字符串都转换成数字
  ```

  注意，一个值转换为另一个值并不意味着两个值相等。

- #### 显示类型转换

  做显示类型转换最简单的方法是使用`Boolean（）`，`Number（）`，`String（）`，`Object（）`函数。

  需要注意，除`null`或`undefined`外的任何值都具有`toString（）`方法，这个方法执行结果通常和`String（）`方法的返回借一致。还需要注意，如果把`null`，`undefined`转换为对象，则会抛出一个类型错误。

  JavaScript中某些运算会做隐式的类型转换，如果“+”运算符的一个操作数是字符串，它将把另一个操作数转换为字符串。一元“！”将其操作数转换为布尔值并取反等。

- #### 对象转换为原始值

  - 对象到布尔值的转换：所有对象都转换为`true`

  - 对象到字符串的转换：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211193331335.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211193342967.png)
  - 对象转换为数字：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211193400325.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
### 9. 变量作用域

- #### 函数作用域和声明提前

  JavaScript函数作用域是指在函数内声明的所有变量在函数体始终是可见的。

  ```
  function test(o) {
  	var i = 0;	//i在整个函数体内是有定义的
  	if (typeof o == "object") {
  		var j = 0; //j在函数内是有定义的，不仅仅是在这个代码段内
  		for (var k =0; k < 10; k ++) { //k在函数体内是有定义的，不仅仅是在循环内
  			console.log(k); //输出数字0-9
  		}
  		console.log(k);//k已经定义了，输出10
  	}
  	console.log(j);//j已经定义了，但可能没有初始化
  }
  ```

  ```
  var scope = "global";
  function f() {
  	console.log(scope);//输出"undefined",而不是"global"
  	var scope = "local";//变量在这里赋初始值，但是变量本身在函数体内任何地方均是有定义的
  	console.log(scope);//输出"local"
  }
  ```

- #### 作为属性的变量

  当声明一个JavaScript全局变量时，实际上是定义了全局对象的一个属性。

  当使用`var`声明一个变量时，创建的这个属性是不可配置的，也就是说这个变量无法通过`delete`运算删除。如果没有使用严格模式并给一个未声明的变量赋值的话，JavaScript会自动创建一个全局变量，以这种方式创建的变量是正常的可配置值属性，并可以删除它们。

  ```
  var truevar = 1; // 声明一个不可删除的全局变量
  fakevar1 = 2; // 创建全局对象的一个可删除的属性
  this.fakevar2 = 3; //同上
  delete truevar // false：变量并没有被删除
  delete fakevar //true：变量被删除
  delete this.fakevar2 //true：变量被删除
  ```

- #### 作用域链

  全局变量在程序中始终都是有定义的，局部变量在声明它的函数体内以及其所嵌套的函数内始终是有定义的。

