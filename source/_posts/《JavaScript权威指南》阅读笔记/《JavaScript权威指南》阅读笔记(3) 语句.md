---
title: 《JavaScript权威指南》学习笔记(3) 语句
date: 1581493787731.677
tags:
- JavaScript
category:
- 《JavaScript权威指南》学习笔记
---
# 第五章  语句

JavaScript语句以分号结束。

表达式计算出一个值，但语句用来执行以使某件事发生。

## 条件语句

#### switch语句

`if`语句在程序执行过程中创建一条分支，并且可以使用`else if`来处理多条分支。然而当所有的分支都依赖于同一个表达式的值时，`else if`并不是最佳解决方案。

`switch`语句正适合处理这种情况。

语法：

```
switch(expression) {
	statements
}
```

 例子：

```
switch(n) {
	case 1: // 如果 n === 1，从这里开始执行
		// 执行代码块 1
	break; // 停止执行switch语句
	case 2: // 如果 n === 3，从这里执行
		// 执行代码块2
	break; // 在这里停止执行switch语句
	case 3: // 如果 n === 3，从这里执行
		// 执行代码块3
	break; //在这里停止执行switch语句
	default://如果所有的条件都不匹配
		// 执行代码块4
	break; //在这里停止执行switch语句
}
```

这里“相同”是按照“===”运算符进行比较。

`case`关键字后除了跟随的是数字和字符串直接量，ECMAScript标准允许每个`case`关键字跟随任意的表达式。

在前面例子中，“`default：`”标签出现在`switch`末尾，位于所有`case`标签之后，这是最合理最常见的写法，实际上，“`default：`”标签可以放置在`switch`语句内的任何地方。

## 循环语句

JavaScript有4种循环语句：`while`，`do/while`，`for`和`for/in`。

#### 1. while

```
while ( // 逻辑条件) {
	// 循环体
}
```

`while`循环流程图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213135037103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### 2. do/while

```
do {
	// 循环体
} while ( // 逻辑条件)
```

`do/while`循环流程图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213135051988.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### 3. for

语法：

```
for ( 表达式1; 表达式2; 表达式3) {
	//循环体
}
```

表达式1只在循环开始之前执行一次。

有些循环比较复杂，循环中的一次迭代会改变多个变量。

```
var i,j;
for (i = 0, j = 10; i < 10; i ++, j --) {
	sum += i*j;
}
```

`for`循环流程图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020021313511593.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### 4. for/in

`for/in`它和常规的`for`循环完全是不同的一类循环。

语法：

```
for (variable in object) {
	//循环体
}
```

`variable`通常是一个变量名，也可以是一个可以产生左值的表达式或者通过`var`语句声明的变量，总之必须是一个适用于赋值表达式左侧的值。

`object`是一个表达式，这个表达式的计算结果是一个对象。

`for/in`循环通常是用来更方便地遍历对象属性成员：

```
for(var p in o) { //将属性名字赋值给变量p
	console.log(o[p]); //输出每一个属性的值
}
```



## 跳转语句

跳转语句使得JavaScript的执行可以从一个位置跳转到另一个位置。

`break`语句是跳转到循环或者其他语句的结束。

`continue`语句是终止本次循环的执行并开始下一次循环的执行。

`return`语句让解释器跳出函数体的执行，并提供本次调用的返回值。

`throw`语句触发或者“抛出”一个异常，它与`try/catch/finally`语句一同使用的，这些语句指定了处理异常的代码逻辑。

#### 1. throw语句

异常：是当发生了某种情况或错误时产生的一个信号。

抛出异常：就是用信号通知发生了错误或异常状况。

捕获异常：指处理这个信号，即采用必要的手段从异常中恢复。

在JavaScript中，当产生运行时错误或者程序使用`throw`语句时就会显示地抛出异常。使用`try/catch/finally`语句可以捕获异常。

`throw`语法：

```
throw expression;
```

`expression`的值可以是任意类型的。可以抛出一个代表错误的数字，或者包含可读的错误消息的字符串。当JavaScript解释器抛出异常的时候通常采用`Error`类型和其子类型。一个`Error`对象有一个`name`属性表示错误类型，一个`message`属性用来存放传递给构造函数的字符串。

```
function factorial(x) {
	//如果输入参数是非法的，则抛出一个异常
	if (x < 0) throw new Error("x不能是负数");
	//否则，计算出一个值，并正常地返回它
	for (var f = 1; x > 1; f *= x, x --);
	return f;
}
```

当抛出异常时，JavaScript解释器会立即停止当前正在执行的逻辑，并跳至就近的异常处理程序。异常处理程序是用`try/catch/finally`

#### 2. try/catch/finally

`try`从句定义了需要处理的异常所在的代码块。

`catch`从句跟随在try从句之后，当try块内某处发生异常时，调用catch内的代码逻辑。

`finally`中放置清理代码，不管try块中是否产生异常，finally块内的逻辑总是会执行。

下面的代码说明了`try/catch/finally`的语法和使用目的：

```
try {
	//通常来件，这里的代码会从头执行到尾而不会产生任何问题，
	//但有时会抛出一个异常，要么是由throw语句直接抛出异常
	//要么是通常调用一个方法间接抛出异常
}
catch(e) {
	//当且仅当try语句块抛出异常，才会执行这里的代码
	//这里可以通过局部变量e来获得Error对象或者抛出的其他值的引用
	//这里的代码可以基于某种原因处理这个异常。也可以忽略这个异常
	//还可以通过throw语句重新抛出异常
}
finally {
	//不管try语句块是否抛出异常，这里的逻辑总是执行，终止try语句块的方式有：
	//正常终止，执行完语句块的最后一条语句
	//通过break，continue或return语句终止
	//抛出一个异常，异常被catch从句捕获
	//抛出一个异常，异常未被捕获，继续向上传播
}
```

## 其他语句类型

#### 1. with语句

with语句用于临时扩展作用域链，它具有如下的语法：

```
with (object)
statement
```

这条语句将`object`添加到作用域的头部，然后执行`statement`，最后把作用域链恢复到原始状态。

在严格模式中，是禁止使用`with`语句，并且在非严格模式里也是不推荐使用`with`语句，尽可能避免使用`with`语句。那些使用with语句的JavaScript代码非常难于`with`语句，并且同没有使用`with`语句的代码相比，它运行得更慢。

在对象嵌套层次很深的时候通常会使用`with`语句来简化代码编写。

例如：在客户端JavaScript中，可能会使用类似下面这种表达式来访问一个HTML表单中元素：

```
document.forms[0].address.value
```

如果这种表达式在代码中多次出现，则可以使用`with`语句将form对象添加至作用域链的顶层：

```
with(document.forms[0]) {
	//	直接访问表单元素，例如
	name.value = "";
	address.value = "";
	email.value = "";
}
```

这种方法减少了大量的输入，不用再为每个属性名添加`document.forms[0]`前缀。这个对象临时挂载在作用域上，当JavaScript需要解析诸如`address`的标识符时，就会自动在这个对象中查找。当然，不使用`with`语句的等价代码可以写成这样：

```
var f = document.forms[0];
f.name.value = "";
f.address.value = "";
f.email.value = "";
```

不用忘记，只有在查找标识符的时候才会用到作用域链，创建新的变量的时候不使用它。

#### 2. debugger语句

`debugger`语句通常什么也不做。然而调试程序可用并运行的时候，JavaScript解释器将会（非必需）以调试模式运行。实际上，这条语句用来产生一个断点，JavaScript代码的执行会停止在断点的位置，这时候使用调试器输出变量的值，检查调用栈等。

#### 3. “use strict”

"`use strict`"是一条指令。指令不是语句。

“`user strict`”指令和普通的语句之间有两个重要的区别。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213135346438.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213135414399.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213135428218.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200213135445756.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)