---
title: 《JavaScript权威指南》学习笔记(5) 数组
date: 1581599600170.718
tags:
- JavaScript
category:
- 《JavaScript权威指南》学习笔记
---
# 第七章 数组

## 创建数组

#### 1. 数组直接量

```js
var empty = []; //没有元素的数组
var primes = [2, 3, 5, 7, 11]; //有5个数值的数组
var misc = [1.1, true, "a"]; //有3个不同类型的元素的数组
//数组直接量中的值不一定要是常量，可以是任意的表达式
var base = 1024;
var table = [base, base+1, base+2, base+3];
var b = [[1,{x:1,y:2}],[2,{x:3,y:4}]];
```

如果省略数组直接量中某个值，省略的元素将被赋予`undefined`值：

```js
var count = [1,,3]; //数组有3个元素，中间的那个元素值为undefined
var underfs = [,,]; //数组有2个元素，都是undefined
```

数组直接量的语法允许有可选的结尾的逗号，故[,,]只有两个元素而非三个。

#### 2. 调用构造函数Array()创建数组

- 调用时没有参数：

  ```js
  var a = new Array();
  ```

  该方法创建一个没有任何元素的数组，等同于数组直接量[]。

- 调用时有一个数值参数，它指定长度：

  ```js
  var a = new Array(10);
  ```

  该技术创建指定长度的数组。

- 显式指定两个或多个数组元素或者数组的一个非数值元素：

  ```js
  var a = new Array(5, 4, 3, 2, 1, "testing,testing");
  ```

## 数组元素的读和写

```js
var a = ["world"];//一个元素的数组开始
var value = a[0]; //读
a[1] = 3.14; //写
i = 2;
a[i] = 3;
a[i + 1] = "hello";
a[a[i]] = a[0];
```

数组的特别之处在于，当使用小于`2^32`的非负数作为属性名时数组会自动维护其`length`属性值。

所有的索引都是属性名，但只有在`0-(2^32-2)`之间的整数属性名才是数组的索引。

所有的数组都是对象，可以为其创建任意名字的属性。但如果使用的属性是数组的索引，数组的特殊行为就是将根据需要更新它们的`length`属性值。

可以使用负数或非整数来索引数组。这种情况下，数值转换为字符串，字符串作为属性名来用。既然名字不是非负数，它就只能当做常规的对象属性，而非数组的索引。

```
a[-1.23] = true; //这将创建一个名为“-1.23”的属性
a["1000"] = 0; // 这是数组的第1001个元素
a[1.000] // 和a[1]相等
```

实际上数组索引仅仅是对象属性名的一种特殊类型，这意味着JavaScript数组没有“越界”错误的概念。当试图查询任何对象中不存在的属性时，不会报错，只会得到`undefined`值。类似于对象，对于对象同样存在这种情况。

## 稀疏数组

稀疏数组就是包括从`0`开始的不连续索引的数组。

通常，数组的`length`属性值代表数组中元素的个数。如果数组是稀疏的，`length`属性值大于元素的个数。

可以用`Array()`构造函数或简单地指定数组的索引值大于当前的数组长度来创建稀疏数组。

```js
a = new Array(5); // 数组没有元素，但是a.length是5
a = []; //创建一个空数组，length = 0
a[1000] = 0; //赋值添加一个元素，但是设置length为1001
```

也可以用`delete`操作符来产生稀疏数组。

注意，当在数组直接量中省略值时不会创建稀疏数组。省略的元素在数组中是存在的，其值为`undefined`。这和数组元素根本不存在是有一些微妙的区别。可以用in操作符检测两者之间的区别：

```js
var a1 = [,,,]; //数组是[undefined,undefined,undefined]
var a2 = new Array(3); //该数组根本没有元素
0 in a1 //true：a1在索引0处有一个元素
0 in a2 //false：a2在索引0处没有元素
```

## 数组长度

为了维持“在数组中肯定找不到一个元素的索引值大于或等于它的长度。”这条规则，数组有两个特殊的行为。

- 如果为严格数组元素赋值，它的索引i大于或等于现有数组的长度，`length`属性的值将设置为i+1。

- 设置length属性为严格小于当前长度的非负整数n时，当前索引大于或等于n的元素将从中删除。

  ```js
  a = [1,2,3,4,5]; //从5个元素的数组开始
  a.length = 3; //现在a为[1,2,3]
  a.length = 0; //删除所有的元素，a为[]
  a.length = 5; //长度为5，但是没有元素，就像new Array(5)
  ```

在ECMAScript 5 中可以用`Object.defineProperty（）`让数组的`length`属性变成只读的。

```js
a = [1,2,3];
Object.definedProperty(a,"length",{writable:false});//让length属性只读
a.length = 0; //a不会改变
```

## 数组元素的添加和删除

#### 1. 添加

- 最简单的方法：为新索引赋值：

  ```js
  a = [] //开始是一个空数组
  a[0] = "zero"; //然后向其中添加元素
  a[1] = "one";
  ```

- 使用`push()`方法在数组末尾增加一个或多个元素：

  ```js
  a = []; //开始是一个空数组
  a.push("zero") //在末尾添加一个元素。a = ["zero"]
  a.push("one","two"); //再添加两个元素。a = ["zero","one","two"]
  ```

- 使用`unshift（）`方法在数组首部插入一个元素，并且将其他元素依次移到更高的索引处

#### 2. 删除

- 可以像删除对象属性一样使用`delete`运算符来删除数组元素。注意删除一个数组元素使用`delete`不会修改数组的`length`属性，也不会将元素从高索引处移下来填充已删除属性的空白。如果从数组删除一个元素，它就变成稀疏数组。

  ```js
  a = [1,2,3];
  delete a[1]; //a在索引1的位置不再有元素
  1 in a //false：数组索引1并未在数组中定义
  a.length //3
  ```

- 使用`pop（）`方法，减少长度1并返回被删除元素的值。

- `shift（）`方法，从数组头部删除一个元素，所有元素下移到比当前索引低1的地方。

## 数组遍历

- 使用`for`循环是遍历数组元素最常用的方法

  如果数组不是稠密的，或者存在不合法数据，在使用数组元素之前应该先检测它们。

  如果想要排除`null`，`undefined`和不存在的元素。代码如下：

  ```js
  for (var i = 0; i < a.length; i ++) {
  	if(!a[i]) contine;//跳出null，undefined和不存在的元素。 
  	//循环体
  }
  ```

  如果只想跳出`undefined`和不存在的元素，代码如下：

  ```js
  for (var i = 0; i < a.length; i++) {
  	if (a[i] == undefined) continue;//跳出undefined + 不存在的元素
  	//循环体
  }
  ```

  如果想只跳出不存在的元素，代码如下：

  ```js
  for (var i = 0; i < a.length; i ++) {
  	if(!(i in a)) continue; //跳出不存在的元素
  	//循环体
  }
  ```

- 使用`forEach()`方法：

  ```js
  var data = [1,2,3,4,5]; //这是需要遍历的数组
  var sumOfSquares = 0; //要得到数据的平方和
  data.forEach(function(x){//把每个元素传递给此函数
  	sumOfSquares += x*x; //平方相加
  });
  sumOfSquares //55 : 1+4+9+16+25
  ```

## 多维数组

JavaScript不支持真正的多维数组，但可以用数组的数组来近似。访问数组的数组中的元素，只要简单地使用两次[]操作即可。

## 数组方法

下面主要介绍ECMAScript 3中的一些方法。

#### 1. `join()`

Array.join()方法将数组中所有元素都转化为字符串并连接在一起，**返回最后生成的字符串**。

可以指定一个可选的字符串在生成的字符串中来分隔数组的各个元素。如果不指定分隔符，默认使用逗号。（**不改变原数组**）

```js
var a = [1,2,3];//创建一个包含三个元素的数组
a.join(); //“1,2,3”
a.join(" "); //“1 2 3”
a.join(""); //“123”
var b = new Array(10); //长度为10的空数组
b.join('-'); //‘---------’九个连字符组成的字符串
```

`Array.join()`方法是`String.split（）`方法的逆向操作，`String.split（）`是将字符串分割成若干块来创建一个数组。

#### 2.` reverse()`

`Array.reverse()`方法将数组中的元素颠倒顺序，**返回逆序的数组**。

它采取的是替换；也就是它不通过重新排列的元素创建新的数组，而是在原先的数组中重新排列它们。（**会改变原数组**）

```js
var a = [1,2,3];
a.reverse().join //“3，2,1”，并且现在的a是[3,2,1]
```

#### 3. `sort()`

`Array.sort()`方法将数组中是元素排序并返回排序后的数组。

当不带参数调用`sort()`时，数组元素以字母顺序排序。（**改变原数组**）

```js
var a = new Array("banana","cherry","apple");
a.sort();
var s = a.json(", ");//s == "apple,banana,cherry"
```

如果数组包含`undefined`元素，它们会被排到数组的尾部。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200215210556376.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020021521061293.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
#### 4.` concat()`

`Array.concat()`方法**创建并返回一个新数组**，它的元素包括调用`concat()`的原始数组的元素和`concat()`的每个参数。如果只想参数中，任何一个自身是数组，则连接的是数组的元素，而非数组本身。（**不改变原数组**）

`concat()`不会递归扁平化数组的数组,也不会修改调用的数组.

```js
var a =[1,2,3];
a.concat(4,5) //返回[1,2,3,4,5]
a.concat([4,5]) //[1,2,3,4,5]
a.concat([4,5],[6,7]) //[1,2,3,4,5,6,7]
a.concat(4,[5,[6,7]])//[1,2,3,4,5,[6,7]]
```

#### 5. `slice()`

`Array.slice()`方法**返回指定数组的一个片段或子数组**。

它的两个参数分别指定了片段的开始和结束位置。

返回的数组包含：第一个参数指定的位置和所有到但不包含第二个参数指定的位置之间的所有数组元素。如果只指定一个参数，返回的数组将包含从开始位置到数组结尾的所有元素。如果参数出现负数，它表示相对于数组中最后一个元素的位置。例如，参数-1指定了最后一个元素，而参数-3指定了倒数第三个元素。注意，`slice()`不会修改调用的数组。（**不改变原数组**）

```js
var a = [1,2,3,4,5];
a.slice(0,3); //返回[1,2,3]
a.slice(3); //[4,5]
a.slice(1,-1);//[2,3,4]
a.slice(-3,-2);//[3]
```

#### 6. `splice()`

`Array.splice()`方法是在数组中插入或删除元素的通用方法。不同于`slice()`和`concat()`，`splice()`会修改调用的数组。（**改变原数组**）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200215210631971.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### 7. `push()`和`pop()`

`push()`方法在数组尾部添加一个或多个元素，并**返回新的长度**。

`pop()`方法则相反：它删除数组的最后一个元素，减少数组长度并**返回它删除的值**。

注意，两个方法都修改并替换原始数组而非生成一个修改版的新数组。

组合使用`push()`和`pop()`能够用JavaScript数组实现先进后退的栈。

```js
var stack = []; // stack:[]
stack.push(1,2); // stack:[1,2] 返回2
stack.pop(); // stack:[1] 返回2
stack.push(3); // stack[1,3] 返回2
stack.pop(); // stack[1] 返回3
stack.push([4,5]); // stack[1,[4,5]] 返回2
stack.pop(); // stack:[1] 返回[4,5]
stack.pop(); // stack:[] 返回1
```

#### 8. `unshift()`和`shift()`

`unshift()`和`shift()`方法的行为非常类似于`push()`和`pop()`，不一样的是：

`unshift()`和`shift()`是在数组的头部进行元素的插入和删除操作。

`unshift()`在数组的头部添加一个或多个元素，并将已存在的元素移动到更高索引的位置来获取足够的空间，最后**返回数组新的长度**。

`shift()`删除数组的第一个元素并**返回它删除的值**，然后所有随后元素下移一个位置来填补数组头部的空缺。例如：

```js
var a = []; // a:[]
a.unshift(1); // a:[1] 返回：1
a.unshift(22); // a:[22,1] 返回：2
a.shift(); // a:[1] 返回：22
a.unshift(3,[4,5]); // a:[3,[4,5],1] 返回：3
a.shift(); //a:[[4,5],1] 返回：3
a.shift(); //a:[1] 返回：[4,5]
a.shift(); //a:[] 返回：1
```

当使用多个参数调用`unshift()`时它的行为令人惊讶。参数是一次插入的，(就像`splice()`方法)而非一次一个插入。这意味着最终的数组中插入的元素的顺序和她们在参数列表中顺序一致。而假如是一次一个地插入，它们的顺序应该是反过来。

#### 9. `toString()`和`LocaleString()`

数组和其他JavaScript对象一样拥有`toString()`方法。

针对数组，该方法将其每个元素转化为字符串(如有必要将调用元素的`toString（）`方法)并且输出用逗号分隔的字符串列表。注意，输出不包括方括号或其他任何形式的包裹数组值的分隔符。

```js
[1,2,3].toString() // 生成'1,2,3'
["a","b","c"].toString() //生成'a,b,c'
[1,[2,'c']].toString() //生成'1,2,c'
```

`toLocaleString（）`是`toString（`）方法的本地化版本。

它调用元素的`toLocaleString（）`方法将每个数组元素转化为字符串，并且使用本地化（和自定义实现的）分隔符将这些字符串连接起来生成最终的字符串。

## ECMAScript5中的数组方法

先对ECMAScript 5 中的数组方法做一个概述：

首先，大多数方法的第一个参数接收一个函数，并且对数组的每个元素（或一些元素）调用一次该函数。如果是稀疏数组，对不存在的元素不调用传递的函数。

在大多数情况下，调用提供的函数使用三个参数：数组元素，元素的索引和数组本身。通常，只需要第一个参数值，可以忽略后两个参数。

大多数ECMAScript5 数组方法的第一个参数是一个函数，第二个参数是可选的。如果有第二个参数，则调用的函数被看做是第二个参数的方法。也就是说，在调用函数传递进去的第二个参数作为它的this关键字来使用。

被调用的函数的返回值非常重要，但是不同的方法处理返回值的方式也不一样。

ECMAScript5中的数组方法都包含修改它们调用的原始数组。当然，传递给这些方法的函数是可以修改数组的。

#### 1. `forEach()`

`forEach()`方法从头到尾遍历数组，为每个元素调用指定的函数。

传递的函数作为`forEach()`的第一个参数。然后`forEach()`使用三个参数调用该函数：数组元素，元素的索引和数组本身。如果只关心数组元素的值，可以编写只有一个参数的函数，额外的参数将忽略：

```js
var data = [1,2,3,4,5]; //要求和的数组
var sum = 0;
data.forEach(function(value){sun += value;});
sum //15
data.forEach(function(v,i,a){a[i] = v + 1});
data //[2,3,4,5,6]
```

注意，`forEach()`无法在所有元素都传递给调用的函数之前终止遍历。也就是说，没有像for循环中使用的相应的break语句。如果要提前终止，必须把`forEach()`方法放在一个`try`块中，并能抛出一个异常。如果`forEach()`调用的函数抛出`foreach.break`异常，循环会提前终止。

#### 2. `map()`

`map()` 方法将调用的数组的每个元素传递给指定的函数，并返回一个数组，它包含该函数的返回值。

（**不改变原数组**）

```js
a = [1,2,3];
b = a.map(function(x){return x*x;}); //b 是[1,4,9]
```

传递给`map()`函数的调用和传递给`forEach()`的函数调用方式一样。

但传递给`map()`的函数应该有返回值。`map()`返回的是新数组：它不修改调用的数组。如果是稀疏数组，返回的也是相同方式的稀疏数组：它具有相同的长度，相同的缺失元素。

#### 3. `filter()`

`filter()`方法返回数组元素是调用数组元素的子集。

传递的函数是用来逻辑判定的：该函数返回`true`或`false`。

```js
a = [5,4,3,2,1];
smallvalue = a.filter(function(x){return x<3}); //[2,1]
everyother = a.filter(function(x,i){return i%2 == 0});//[5,3,1]
```

注意，`filter()`会跳过稀疏数组中缺少的元素，它的返回值总是稠密的。

为了压缩稀疏数组的空缺，代码如下：

```js
var dense = arr.filter(function(){return true;});
```

压缩空缺并删除`undefined`和`null`元素，可以这样使用`filter()`:

```
a = a.filter(function(x){return x !== undefined && x != null});
```

#### 4. `every()`和`some()`

`every()`和`some()`方法是数组的逻辑判定：它们对数组元素应用指定的函数进行判定，返回true或false。

`every()`方法：当且仅当数组中所有元素调用判定函数都返回`true`，它才返回true。

```js
a = [1,2,3,4,5];
a.every(function(x){return x<10}) //true 所有值<10
a.every(function(x){return x%2 === 0}) // false:不是所有值都是偶数
```

`some()`方法：当数组中至少有一个元素调用判定函数返回`true`，它就返回`true`；并且当且仅当所有元素调用判定都返回`false`，它才返回`false`：

```js
a = [1,2,3,4,5];
a.som(function(x){return x%2 === 0;}) //true，a包含偶数值
a.some(isNaN) //false，a不包含非数组元素
```

注意，一旦`every()`和`some()`确认该返回什么值它们就会停止遍历数组元素。

在空数组上调用时，`every()`返回`true`,`some()`返回`false`。

#### 5. `reduce()`和`reduceRight()`

`reduce()`和`reduceRight()`方法使用指定的函数元素进行组合，生成单个值。

`reduce()`需要两个参数，第一个是执行化简操作的函数。化简函数的任务就是用某种方法把两个值组合或化简为一个值，并返回化简的值。第二个（可选）的参数是一个传递给函数的初始值。

```js
var a = [1,2,3,4,5]
var sum = a.reduce(function(x,y) {return x+y},0); //数组求和
var product = a.reduce(function(x,y) {return x*y},1); //数组求积
var max = a.reduce(function(x,y) {return (x>y)?x:y}); //求最大值
```

`reduce()`使用的函数和`map()`和`forEach()`使用的函数不同。在第一次调用函数中，第一个参数是一个初始值，它就是传递给`reduce()`的第二个参数。在接下来的调用中，这个值就是上一次化简函数的返回值。

在上面代码的第一个例子中，第一次调用化简函数的参数是0和1,。将两者相加并返回1.再次调用时的参数是1和2，他返回3.然后它计算3+3=6,6+4=10，最后10+5=15。`reduce()`就返回这个值。

上面代码第三个例子，调用`reduce()`时只有一个参数：没有指定初始值。当不指定初始化值调用`reduce()`时，它将使用数组的第一个元素作为其初始化值。这意味着第一次调用化简函数就使用了第一个和第二个数组元素作为其第一个和第二个参数。

在空数组上，不带初始值参数调用`reduce()`将导致类型错误异常。如果调用它的时候只有一个值---数组只有一个元素并且没有指定初始值，或者有一个空数组并且指定一个初始值---`reduce()`只是简单地返回那个值而不会调用化简函数。

`reduceRight()`的工作原理和`reduce()`一样，不同的是他按照数组索引从高到低（从右到左）处理数组，而不是从低到高。

```js
var a = [2,3,4]
//计算2^(3^4)。乘方操作的优先顺序是从右到左
var big = a.reduceRight(function(accumulator,value) {
	return Math.pow(value,accumulator);
});
```

#### 6.` indexOf()`和`lastIndexOf()`

`indexOf()`和`lastIndexOf()`搜索这个数组中具有给定值的元素，返回找到的第一个元素的索引或者如果没有找到就返回-1。

`indexOf()`从头至尾搜索，而`lastIndexOf()`则反向搜索。

```js
a = [0,1,2,1,0];
a.indexOf(1) //1,a[1]是1
a.lastIndexOf(1) //3，a[3]是1
a.indexOf(3) //-1，没有值为3的元素
```

`indexOf()`和`lastIndexOf()`方法的第一个参数是需要搜索的值，第二个参数是可选的：它指定数组中的一个索引，从那里开始搜索。如果省略该参数，`indexOf()`从头开始搜索，而`lastIndexOf()`从末尾开始搜索。第二个参数也可以是负数，它代表相对数组末尾的偏移量。

## 数组类型

在ECMAScript5中，可以使用`Array.isArray()`函数判断严格未知的对象是否为数组。

```js
Array.isArray([]) //true
Array.isArray({}) //false
```

## 作为数组的字符串

在ECMAScript5 中，字符串的行为类似于只读的数组。除了用`charAt()`方法来访问单个的字符以外，还可以使用方括号。

```js
var s = test;
s.charAt(0) // "t"
s[1] //"e"
```

当然，针对字符串的`typeof`操作符仍然返回"`string`"，但是如果给`Array.isArray()`传递字符串，它将返回`false`。

字符串是不可变值，故当把它们作为数组看待时，它们是只读的。如`push()`,`sort()`,`reverse()`和`splice()`等数组方法会修改数组，它们在字符串上是无效的。不仅如此，使用数组方法来修改字符串会导致错误：出错的时候没有提示。