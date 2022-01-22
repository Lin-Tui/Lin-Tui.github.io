---
title: 《JavaScript权威指南》学习笔记(2) 表达式和运算符
date: 1581421265480.8154
tags:
- JavaScript
category:
- 《JavaScript权威指南》学习笔记
---
# 第四章  表达式和运算符

## 1.  属性访问表达式

两种语法：

- expression . identifier
- expression [ expression ]

```
var o = { x: 1, y: { z :3 } }; //一个示例对象
var a = [ o, 4, [5, 6] ]; // 一个包含中国对象的示例数组
o.x // 1
o.y.z // 3
o["x"] // 1
a[1] // 4
a[2]["1"] // 6
a[0].x // 1
```

## 2. 运算符

下表是按照运算符的优先级排序，前面的运算符优先级要高于后面的运算符优先级。

被水平线分割开来的运算符具有不同的优先级。

标题为A的列表示运算符的结合性，L（从左到右）或R（从右到左）

标题为N的列表操作数的个数。

标题为“类型”的列表表示期望的操作数类型，以及运算符的结构类型（在“-->”符合之后）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211223146809.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

左值：指表达式只能出现在赋值运算符的左侧。

在JavaScript中，变量，对象属性，数组均是左值。

ECMAScript规范允许内置函数返回一个左值，但自定义的函数则不能返回左值。

需要注意的是，属性访问表达式和调用表达式的优先级要比上标列出的所有运算符都要高。

```
typeof my.function[x](y)
```

尽管typeof是优先级最高的运算符之一，但typeof也是在两次属性访问和函数调用之后执行的。

#### 运算符的结合性

减法运算符具有从左到右的结合性

```
w = x - y - z;
//和这段代码一样：
w = ((x - y) -z);
```

反过来讲，下面这个表达式：

```
x = ~-y;
w = x = y = z;
q = a ? b: c ? d: e ? f: g;
//上面代码和下面一样：
x = ~(-y);
w = (x = (y = z));
q = a ? b: (c ? d: (e ? f: g));
```

因为一元操作符，赋值和三元体检运算符都具有从右到左的结合性。

## 3. 算法运算符

基本的算法运算符是` *` ，`/`，`%`，`+`，`-`。

除` +`运算符以外，剩下4个运算符都不难，只是在必要时将操作数转换为数字，然后求积商余数和差。所有那些无法转换为数字的操作树都转换为NaN，如果操作树是NaN值，算术运算的结果也是NaN。

#### “` / `” 运算符：

在JavaScript中，所有的数字都是浮点数，除法运算的结果也是浮点型，比如5/2的结果是2.5，而不是2.除数为0的运算结果为正无穷大或负无穷大，而0/0的结果是NaN，所有这些运算均不含报错。

#### “` %` ” 运算符：

结果的符号和第一个操作数的符号保持一致。5%2 = 1，-5%2 = -1。求余运算符的操作符通常都是整数，但也适用于浮点数，比如6.5%2.1 = 0.2。

#### “` +` ” 运算符：

如果其中一个操作数是字符串或者转换为字符串的对象，另一个操作数将会转换为字符串，加法将进行字符串的连接操作。

从技术上讲，加法操作符的行为表现为：

- 如果其中一个操作数是对象，则对象会遵循对象到原始值的转换规则转换为原始类型，日期对象通过`toString()`方法执行转换，其他对象则通过`valueOf()`方法执行转换。由于多数对象不具备可用的`valueOf()`方法，因此它们会通过`toString()`方法来执行转换。
- 在进行了对象到原始值的转换后，如果其中一个操作数是字符串的话，另一个操作数也会转换为字符串，然后进行字符串连接。
- 否则，两个操作数都将转换为数字，然后进行加法操作

```
1 + 2 //3
"1" + "2" //"2"
"1" + 2 //"12",数字转换为字符串后做加法
1 + {} //"1[object Object]",对象转换为字符串后进行字符串连接
true + true //2 布尔值转换为数字后做加法
2 + null //2 ,null转换为0后做加法
2 + undefined //NaN,undefined转换为NaN后做加法
```

需要特别注意的是，当加法运算符和字符串和数字一起使用时，需要考虑加法结合性对运算顺序的影响。也就是说，运算结果是依赖于运算符顺序的，比如：

```
1 + 2 + " blind mice"; //"3 blind mice"
1 + (2 + " blind mice"); //"12 blind mice"
```

#### 一元算术运算符

- 递增（`++`）：

  运算符将操作数转换为数字，然后给数字加1

  ```
  var i = 1,j = ++1;//i=1,j=1
  var i = 1,j = i ++; //i=2,j=1
  ```

  需要注意的是，表达式`++x`并不总和`x = x + 1`完全一样，“`++`”运算符从不进行字符串连接操作，它总是会将操作数转换为数字并增1。

## 4. 关系表达式

#### 相等和不等运算符

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211223301673.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211223311757.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211223324498.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### 比较运算符

比较运算符的操作数可能是任意类型。然而，只有数字和字符串才能真正执行比较操作，因此那些不是数字和字符串的操作数都将进行类型转换，类型转换规则如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020021122334297.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211223355941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211223410928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### in运算符

`in`运算符希望它的左操作数是一个字符串或可以转换为字符串，希望它的右操作数是一个对象。如果右侧的对象拥有一个名为左操作数值的属性名，那么表达式返回true

```
var point = {x:1,y:1}
"x" in point //true
"z" in point //false
"toString" in point //true :对象继承了toString（）方法

var data = [7,8,9];
"0" in data //true:数组包含元素“0”
1 in data //true :数字转换为字符串
3 in data //false :没有引索为3的元素
```

#### instanceof 运算符

`instanceof`希望左操作数是一个对象，右操作数标识对象的类。JavaScript中对象的类是通过初始化它们的构造函数来定义的，这样的话，instanceof的右操作数应当是一个函数。

如果左侧的对象是右侧类的实例，则表达式返回true，否则返回false。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211223448376.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

## 5. 赋值表达式

JavaScript使用“`=`”运算符来给变量或者属性赋值。

“`=`”具有非常低的优先级，通常在一个较长的表达式中用到一条赋值语句的值的时候，需要补充圆括号以保证正确的运算顺序。

赋值操作符的结合性是从右到左，也就是说，如果一个表达式中出现了多个赋值运算符，运算顺序是从右到左。因此，可以通常如下方式对多个变量赋值：

```
i = j = k = 0; //把三个变量初始化为0
```

## 6. 其他运算符

#### 条件运算符（`?:`）

条件运算符是JavaScript中唯一的一个三元运算符。

```
x > 0 ? x : -x //求x的绝对值
```

条件运算符的操作数可以是任意类型，第一个操作数当成布尔值，如果它是正值，那么将计算第二个操作数，并返回其计算结果。否则，如果第一个操作数是假值，那么将计算第三个操作数，并返回其计算结果。第二个和第三个操作数总是会计算其中之一，不可能两者同时执行。

#### `typeof`运算符

下表列出了任意值在`typeof`运算符后的返回值：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200212150457148.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### `delete`运算符

`delete`是一元操作数符，它用来删除对象属性或者数组元素。就像赋值，递增，递减运算符一样，`delete`也是具有副作用，它是用来做删除操作的，不是用来返回一个值的。

```
var o = { x: 1,y: 2 }; //定义一个对象
delete o.x; // 删除一个属性
"x" in o //false，这个属性在对象中不再存在

var a = [1, 2, 3]; // 定义一个数组
delete a[2]; // 删除最后一个数组元素
2 in a; // false，元素2在数组中已经不再存在了
a.length //3 ,注意长度并没有改变，尽管上一行代码删除了这个元素，但删除操作数留下了一个“洞”，实际上并没有修改数组的长度，因此数组a的长度仍然是3
```

需要注意的是，删除属性或者数组元素不仅仅是设置了一个`undefined`的值，当删除一个属性是，这个属性将不再存在。读取一个不存在的属性将返回`undefined`，但是可以通过`in`运算符来检测这个属性是否在对象中存在。

`delete`希望它的操作数是一个左值，如果它不是左值，那么`delete`将不进行如何操作同时返回`true`。否则，`delete`将试图删除这个指定的左值。如果删除成功，`delete`将返回`true`。然而并不是所有属性都可删除，一些内置核心和客户端属性是不能删除的，用户通过`var`语句声明的变量不能删除。同样，通过`function`语句定义的函数和函数参数也不能删除。

在严格模式下，如果`delete`的操作数是非法的，比如变量，函数和函数参数，`delete`操作将抛出一个语法错误异常，只有操作数是一个属性访问表达式的时候它才会正常工作。在严格模式下，`delete`删除不可配置的属性时会抛出一个类型错误异常。在非严格模式下，这些`delete`操作都不会报错，只是简单地返回`false`，以表明操作数不能执行删除操作。

```
var o = { x: 1, y: 2};
delete 0.x; //删除一个对象属性，返回true
typeof q.x; //属性不存在，会“undefined”
delete o.x; //删除不存在的属性，返回true
delete o; //不能删除通过var声明的变量，返回false
			//在严格模式下，将抛出一个异常
delete 1;//参数不是左值，返回true
this.x = 1; //给全局定义一个属性，这里没有使用var
delete x; //试图删除它，在非严格模式下返回true
			//在严格模式下回抛出异常
x; //运行时错误，没有定义x
```

#### `,`逗号运算符

逗号表达式是二元运算符，它的操作数可以是任意类型。

它首先计算左操作数，然后计算右操作数，最后返回右操作数的值。

```
i = 0, j = i, k = 2;//计算结果是2，它和下面的代码基本是等价的：
i = 0; j = 1; k = 2;
```

总是会计算左侧的表达式，但计算结果忽略。