---
title: ES6 for...of  解构赋值  扩展、剩余运算符  reduce
date: 1585359111400.761
tags:
- JavaScript
category:
- JavaScript学习笔记
---
## 目录

* [**for...in 和 for...of**](#jump1)

* [**解构赋值**](#jump2)

* [**扩展运算符(spread)和剩余运算符(rest)**](#jump3)

* [**reduce()**](#jump4)

## <span id="jump1">1. for...in 和 for...of</span>

#### （1）for...in是遍历数组、对象的key

* index索引为字符串型数字，不能直接进行几何运算
* 遍历顺序有可能不是按照实际数组的内部顺序
* 使用for in会遍历数组所有的可枚举属性，包括原型。
* 所以for in更适合遍历对象，不要使用for in遍历数组。

```js
let arr = [1, 2, 3];
for (let i in arr) {
    console.log(i) //0  1  2
}

let obj = {
    name: 'wuxiaodi',
    age: 18,
};
for (let i in obj) {
    console.log(i)  // name  age
}
```

如果想用for…in遍历值那就把JS代码改成这样：

```js
let arr = [1, 2, 3];
for (let i in arr) {
    console.log(arr[i])  //1  2  3 
}

let obj = {
    name: 'wuxiaodi',
    age: 18,
};
for (let i in obj) {
    console.log(obj[i]) // wuxiaodi  18
}
```

#### （2）for-of循环机制可以对任何集合(Array、Map、Set、String或迭代器)进行循环，遍历的是value

* for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象,因为对象没有迭代器.与forEach()不同的是，它可以正确响应break、continue和return语句
* for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用for-in循环或内建的Object.keys()方法
* 遍历map对象时适合用解构

```js
let arr = [1, 2, 3];
for (const item of a) {
    console.log(item);
}
//1
//2
//3

let obj = {a:'com', b:'org', c:'top'};
for (const key of Object.keys(obj)) {
    console.log(obj[key]);
}
//com
//org
//top

let str = 'six';
for (const item of str) {
    console.log(item);
}
//s
//i
//x

let mp = new Map([['a', 1], ['b', 2]]);
for (const [key, item] of mp) {
    console.log(key)
    console.log(item)
}
//{o:'233'}
//1
//b
//2

let st = new Set([1, 2, 2, '2', '3']);
for (const key of st) {
    console.log(key)
}
//1
//2
//2
//3
```

## <span id="jump2">2. 解构赋值</span>

所谓解构赋值，是指同时使用数组或对象属性中保存的多个值分别为多个变量赋值。

#### （1）数组的解构赋值

* **基本**

  ```js
  //变量声明并赋值时的解构:
  let [a, b, c] = [1, 2, 3]; // a = 1 // b = 2 // c = 3
  
  let fruits = ['苹果', '桔子', '梨'];
  let [apple, orange, pear] = fruits;
  console.log(apple); //"苹果"
  console.log(orange); //"桔子"
  console.log(pear); //"梨"
  
  var x = [1, 2, 3, 4, 5];
  var [y, z] = x;
  console.log(y); // 1
  console.log(z); // 2
  
  //变量先声明后赋值时的解构:
  var a, b;
  [a, b] = [1, 2];
  console.log(a); // 1
  console.log(b); // 2
  ```

* **可嵌套**

  ```js
  let [a, [[b], c]] = [1, [[2], 3]]; // a = 1 // b = 2 // c = 3
  ```

* **可忽略**

  ```js
  let [a, , b] = [1, 2, 3]; // a = 1 // b = 3
  
  let fruits = ['苹果', '桔子', '梨'];
  let [, orange] = fruits; 
  console.log(orange); // 桔子
  ```

* **不完全解构**

  ```js
  let [a = 1, b] = []; // a = 1, b = undefined
  ```

* **剩余运算符**

  ```
  var [a, ...b] = [1, 2, 3];
  console.log(a); // 1
  console.log(b); // [2, 3]
  ```

* **字符串等**

  在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。可遍历对象即实现 Iterator 接口的数据。

  ```js
  let [a, b, c, d, e] = 'hello'; 
  // a = 'h' // b = 'e' // c = 'l' // d = 'l' // e = 'o'
  ```

* **交换变量**

  ```js
  var a = 1;
  var b = 3;
  [a, b] = [b, a];
  console.log(a); // 3
  console.log(b); // 1
  ```

* **解构默认值**

  ```js
  let [a = 3, b = a] = [];   // a 与 b 匹配结果为 undefined ，触发默认值：a = 3, b = 3 
  let [a=5, b=7] = [1]; // a = 1, b =  7
  let [a = 3, b = a] = [1];   //a 正常解构赋值，匹配结果：a = 1，b 匹配结果 undefined ，触发默认值：b = a =1
  
  let [a = 3, b = a] = [1, 2]; // a 与 b 正常解构赋值，匹配结果: a = 1, b = 2
  ```

* **解析一个从函数返回的数组**

  从一个函数返回一个数组是十分常见的情况。解构使得处理返回值为数组时更加方便。

  ```js
  function f1() {
    return [1, 2];
  }
  var a, b; 
  [a, b] = f1(); 
  console.log(a); // 1
  console.log(b); // 2
  
  function f2() {
    return [1, 2, 3];
  }
  var [a, , b] = f2();
  console.log(a); // 1
  console.log(b); // 3
  ```

#### （2）对象的解构赋值

* **基本**

  ```js
  let {name,age} = {name:"swr",age:28}
  console.log(name) // 'swr'
  console.log(age) // 28
  ```

* **无声明赋值**

  赋值语句周围的圆括号 `( ... )` 在使用对象字面量无声明解构赋值时是必须的.

  `{a, b} = {a: 1, b: 2}` 不是有效的独立语法，因为左边的 `{a, b}` 被认为是一个块而不是对象字面量。

  然而，`({a, b} = {a: 1, b: 2})` 是有效的，正如 `var {a, b} = {a: 1, b: 2}`

  你的 `( ... )` 表达式之前需要有一个分号，否则它可能会被当成上一行中的函数执行。

  ```js
  var a, b;
  ({a, b} = {a: 1, b: 2});
  ```

* **给新的变量名赋值**

  可以从一个对象中提取变量并赋值给和对象属性名不同的新的变量名。

  ```js
  var o = {p: 42, q: true};
  var {p: foo, q: bar} = o;
   
  console.log(foo); // 42 
  console.log(bar); // true 
  ```

* **可嵌套可忽略**

  ```js
  let obj = {p: ['hello', {y: 'world'}] };
  let {p: [x, { y }] } = obj; // x = 'hello' y = 'world' 
  let {p: [x, {  }] } = obj; // x = 'hello'
  ```

* **不完全解构**

  ```js
  let obj = {p: [{y: 'world'}] }; 
  let {p: [{ y }, x ] } = obj; // x = undefined // y = 'world'
  ```

* **剩余运算符**

  ```js
  let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}; // a = 10  b = 20  rest = {c: 30, d: 40}
  ```

* **解构默认值**

  ```js
  let {a = 10, b = 5} = {a: 3}; // a = 3; b = 5; 
  let {a:aa = 10, b:bb = 5} = {a: 3};
  console.log(aa); // 3
  console.log(bb); // 5
  ```

* **函数参数默认值**

  ```js
  //ES5 版本
  function drawES5Chart(options) {
    options = options === undefined ? {} : options;
    var size = options.size === undefined ? 'big' : options.size;
    var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
    var radius = options.radius === undefined ? 25 : options.radius;
    console.log(size, cords, radius);
    // now finally do some chart drawing
  }
  
  drawES5Chart({
    cords: { x: 18, y: 30 },
    radius: 30
  });
  
  //ES6 版本
  function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) 
  {
    console.log(size, cords, radius);
    // do some chart drawing
  }
  
  drawES2015Chart({
    cords: { x: 18, y: 30 },
    radius: 30
  });
  ```

## <span id="jump1">3. 扩展运算符(spread)和剩余运算符(rest)</span>

在ES6中，三个点(...) 有2个含义。分别表示 扩展运算符 和 剩余运算符。

#### （1）扩展运算符(spread)

**作用**：将一个数组或类数组对象转为用逗号分隔的参数序列

**例子：**

* 数组之前

  当运算符"..."用在**数组之前**时，数组会被转为用逗号分隔的参数序列。

  ```js
  function foo(x, y, z){
      console.log(x, y, z)
  }
  foo.appley(null, [1, 2, 3])　　//在ES6之前我们这样使用数组作为函数参数调用。
  foo(...[1, 2, 3])　　//此处...[1, 2, 3]就被展开为用逗号隔开的1, 2, 3参数序列
  ```

* 替代`apply()`方法

  ```js
  // ES5的 写法
  var arr1 = [0, 1, 2];
  var arr2 = [3, 4, 5];
  Array.prototype.push.apply(arr1, arr2);　　//push方法参数不能为数组，ES5需要借助apply()方法实现。
  
  // ES6 的写法
  let arr1 = [0, 1, 2];
  let arr2 = [3, 4, 5];
  arr1.push(...arr2);　　　　　　　　　　　　　　//ES6中借助扩展运算符直接将数组转为了参数序列。
  ```

* 替代数组的`concat()`方法

  ```js
  let a = [2, 3, 4]
  let b = [1, ...a, 5]    //此处a数组被展开为2, 3, 4
  console.log(b)          //结果为[1, 2, 3, 4, 5]
  ```

* 扩展运算符后如果是**空数组**，**不会产生任何效果**

  ```js
  [...[], 1]
  // [1]
  ```

* 字符串转数组

  ```js
  var str='loycoder';
  var arr3= [...str];
  console.log(arr3);
  ```

#### （2）剩余运算符(rest)

**作用：**作用与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组。

**例子：**

* 函数参数之前，当函数参数个数不确定时，用 rest运算符

  ```js
  function foo(x, y, ...z){   //z表示把剩余的参数收集到一起组成一个名叫z的数组。
      console.log(x, y, z)
  }
  foo(1, 2, 3, 4, 5)          //x赋值1，y赋值2，z中赋值[3, 4, 5]数组
  
  function rest01(...arr) {
          for (let item of arr) {
              console.log(item);
          }
      }
  rest01(1, 3, 5);
  ```

* 解构赋值

  ```js
  const [first, ...rest] = [1, 2, 3, 4, 5];　　//此处'...'作为rest收集运算符使用
  first // 1
  rest  // [2, 3, 4, 5]
  
  const [first, ...rest] = [];
  first // undefined
  rest  // []
  
  const [first, ...rest] = ["foo"];
  first  // "foo"
  rest   // []
  ```

#### （3）总结：

如何判断ES6中的运算符是扩展运算符(spread)还是收集运算符(rest)，主要取决于其**作用的位置**。

* 当三个在等号右边，或放在实参上，或数组之前，作为spread运算符使用，将数组转为逗号分隔的参数序列。

* 当三个点(...)在等号左边，或者放在函数形参中，作为 rest 运算符，收集传入的参数为数组。

* 解构赋值中，放在被赋值一方是rest  运算符。放在赋值一方是 spread运算符。

## <span id="jump4">4. reduce()</span>

#### (1) 什么是reduce()

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。对空数组是不会执行回调函数的。

**语法：**

```js
array.reduce( callback(total, currentValue, currentIndex, arr), initialValue )
```

**参数：**

|                        参数                        | 描述                                                         |
| :------------------------------------------------: | :----------------------------------------------------------- |
| `callback(total, currentValue, currentIndex, arr)` | 必需。用于执行每个数组元素的函数。<br />其中：<br />`total`：必需。初始值，或者计算结束后的返回值。<br />`currentValue`：必需。当前元素。<br />`currentIndex`：可选。当前元素的索引。<br />`arr`：可选。当前元素所属的数组对象。 |
|                   `initialValue`                   | 可选。传递给函数的初始值。                                   |

`reduce(callback,initiaValue)`会传入两个变量，回调函数(callback)和初始值(initiaValue)。

假设函数有个传入参数，total和currentValue，currentIndex和arr：

当没有传入初始值时，total是从数组中第一个元素开始的，currentValue是第二个元素。

但是当传入初始值后, 第一个total将是initivalValue，currentValue将是数组中的第一个元素。

#### （2）例子

* **数组求和**

  ```js
  var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  // 和为 6
  
  //也可以写成箭头函数的形式
  var total = [ 0, 1, 2, 3 ].reduce(
    ( acc, cur ) => acc + cur,
    0
  );
  ```

* **累加对象数组里的值**

  ```js
  //要累加对象数组中包含的值，必须提供初始值，以便各个item正确通过你的函数。
  var initialValue = 0;
  var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.x;
  },initialValue)
  console.log(sum) // logs 6
  
  //也可以写成箭头函数的形式
  var initialValue = 0;
  var sum = [{x: 1}, {x:2}, {x:3}].reduce(
      (accumulator, currentValue) => accumulator + currentValue.x
      ,initialValue
  );
  
  console.log(sum) // logs 6
  ```

* **将二维数组转化为一维**

  ```js
  var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    function(a, b) {
      return a.concat(b);
    },
    []
  );
  // flattened is [0, 1, 2, 3, 4, 5]
  
  //也可以写成箭头函数的形式：
  var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
   ( acc, cur ) => acc.concat(cur),
   []
  );
  ```

* **计算数组中每个元素出现的次数**

  ```js
  var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
  
  var countedNames = names.reduce(function (allNames, name) { 
    if (name in allNames) {
      allNames[name]++;
    }
    else {
      allNames[name] = 1;
    }
    return allNames;
  }, {});
  // countedNames is:
  // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
  ```

* **使用扩展运算符和initialValue绑定包含在对象数组中的数组**

  ```js
  // friends - 对象数组
  // where object field "books" - list of favorite books 
  var friends = [{
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21
  }, {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26
  }, {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18
  }];
  
  // allbooks - list which will contain all friends' books +  
  // additional list contained in initialValue
  var allbooks = friends.reduce(function(prev, curr) {
    return [...prev, ...curr.books];
  }, ['Alphabet']);
  
  // allbooks = [
  //   'Alphabet', 'Bible', 'Harry Potter', 'War and peace', 
  //   'Romeo and Juliet', 'The Lord of the Rings',
  //   'The Shining'
  // ]
  ```

* **数组去重**

  ```js
  var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
  var myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
    if (accumulator.indexOf(currentValue) === -1) {
      accumulator.push(currentValue);
    }
    return accumulator
  }, [])
  
  console.log(myOrderedArray);
  ```





























































































































































