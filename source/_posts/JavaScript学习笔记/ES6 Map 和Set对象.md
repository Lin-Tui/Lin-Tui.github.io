---
title: ES6 Map 和Set对象
date: 1585290641009.3381
tags:
- JavaScript
category:
- JavaScript学习笔记
---
## 目录

#### [Set](#jump1)

#### [Map](#jump2)

## <span id ="jump1">1. Set</span>

#### （1）什么是Set对象？

Set对象一些元素的集合。可以在其中添加及移除元素。它类似于数组，但又有着很大区别。

**语法：**

```js
new Set([iterable]);
```

其中：

- 参数：`iterable`

  如果传递一个[可迭代对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)，它的所有元素将不重复地被添加到新的 **Set**中。如果不指定此参数或其值为`null`，则新的 **Set**为空。

* 返回值：一个新的`Set`对象。

#### （2）Set 中的特殊值

Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：

- `+0`与`-0 `在存储判断唯一性的时候是恒等的，所以不重复；
- `undefined` 与` undefined` 是恒等的，所以不重复；
- `NaN `与` NaN `是不恒等的，但是在 Set 中只能存一个，不重复。

* `{}`被认为是不同的

```js
var set = new Set([{},{}])
set  //{{},{}}
set.size  // 2

var set = new Set([NaN,NaN])
set  //{NaN}
set.size  // 1
```

#### （3）Set对象的属性方法

* **`size`**:

  该属性值为Set对象中保存的元素的数量。

  ```js
  let mySet1 = new Set([1,2,3,4]);
  mySet1.size; // 4
  [...mySet1]; // [1,2,3,4]
  
  let mySet2 = new Set("一二三四");
  console.log(mySet2.size); //4
  mySet2.add("四");
  console.log(mySet2.size); //4
  ```

* **`add()` **

  方法用来向一个 `Set` 对象的末尾添加一个指定的值。返回该对象。注意：不能添加重复的值。

  ```js
  
  var mySet = new Set();
   
  mySet.add(1);
  mySet.add(5).add("some text"); // 可以链式调用
   
  console.log(mySet);
  // Set [1, 5, "some text"]
   
  mySet.add(5).add(1); // 重复的值不会被添加进去
  console.log(mySet); // {1, 5, "some text"}
  ```

* **`clear()` **:

  方法用来清空一个 `Set` 对象中的所有元素。返回值：`undefined`。

  ```js
  mySet.clear();
  ```

* **`delete()`**：

   方法可以从一个 `Set` 对象中删除指定的元素。成功删除返回 `true`，否则返回 `false。`

  ```js
  var mySet = new Set();
  mySet.add("foo");
   
  mySet.delete("bar"); // 返回 false，不包含 "bar" 这个元素
  mySet.delete("foo"); // 返回 true，删除成功
   
  mySet.has("foo");    // 返回 false，"foo" 已经成功删除
  ```

* **has()** ：

  方法返回一个布尔值来指示对应的值value是否存在Set对象中。

  ```js
  
  var mySet = new Set();
  mySet.add('foo');
   
  mySet.has('foo');  // 返回 true
  mySet.has('bar');  // 返回 false
   
  var set1 = new Set();
  var obj1 = {'key1': 1};
  set1.add(obj1);
   
  set1.has(obj1);        // 返回 true
  set1.has({'key1': 1}); // 会返回 false，因为其是另一个对象的引用
  set1.add({'key1': 1}); // 现在 set1 中有2条（不同引用的）对象了
  ```

* **`entries() `**：

  g该方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。
  返回值：一个新的包含 [value, value] 形式的数组迭代器对象，value 是给定集合中的每个元素，迭代器 对象元素的顺序即集合对象中元素插入的顺序。

  ```js
  var mySet = new Set();
  mySet.add("foobar");
  mySet.add(1);
  mySet.add("baz");
   
  var setIter = mySet.entries(); // SetIterator {"foobar" => "foobar", 1 => 1, "baz" => "baz"}
   
  console.log(setIter.next().value); // ["foobar", "foobar"]
  console.log(setIter.next().value); // [1, 1]
  console.log(setIter.next().value); // ["baz", "baz"]
  ```

* **`values()`**:

   该方法返回一个新的迭代器对象，该迭代器对象按照原Set 对象元素的插入顺序返回其所有元素。

* **`keys()`** :
  返回值：将返回一个新生成的可迭代对象，以插入 Set 对象的顺序返回其包含的每个元素的值。

* **`forEach（callback, thisArg）`** 方法会根据集合中元素的插入顺序，依次执行提供的回调函数。
  **callback:**回调函数有三个参数:

  * 元素的值
  * 元素的索引
  * 正在遍历的集合对象

  **thisArg:**回调函数执行过程中的 `this` 值。可选。

  ```js
  function logSetElements(value1, value2, set) {
      console.log("s[" + value1 + "] = " + value2, set);
  }
   
  new Set(["foo", "bar", undefined]).forEach(logSetElements);
   
  // logs:
  // "s[foo] = foo" Set(3) {"foo", "bar", undefined}
  // "s[bar] = bar" Set(3) {"foo", "bar", undefined}
  // "s[undefined] = undefined" Set(3) {"foo", "bar", undefined}
  ```

#### （4）Set应用实例

* **数组去重**

  ```js
  [...new Set([1, 3, 3, 34, 555, 2, 2])] // [1, 3, 34, 555, 2]
  
  function dedupe(array) {
    return Array.from(new Set(array));
  }
  
  dedupe([1, 1, 2, 3]) // [1, 2, 3]
  arrRemove([1, 3, 3, 34, 555, 2, 2]) // [1, 3, 34, 555, 2]
  function arrRemove (arr) {
      let tempArr = arr
      arr = []
      let set = new Set(tempArr)
      for (let i of set) {
          arr.push(i)
      }
      return arr
  }
  ```

* **去除字符串里面的重复字符**

  ```js
  [...new Set('ababbc')].join('')
  // "abc"
  ```

* **set对象与数组之间的转换**

  ```js
  var arr = [1,2,3,4,4];
  var set = new Set(arr) //数组转换set对象
  set //{1,2,3,4}
  //方法一
  Array.from(set) //[1,2,3,4]
  //方法二
  [...set] //[1,2,3,4]
  ```

* **数组去重 & 并集**

  ```js
  let arr1 = [1,2,3,4,5];
  let arr2 = [4,5,6,7,8];
  let a = new Set(arr1);
  let b= new Set(arr2)
  
  new Set([...arr1,...arr2]) //{1,2,3,4,5,6,7,8}
  let arr3 = [...new Set([...arr1,...arr2])] //[1,2,3,4,5,6,7,8]
  ```

* **交集**

  ```js
  let arr3 = new Set(arr1.filter(x=>b.has(x))) //{4,5}
  ```

* **差集**

  ```js
  let arr3 = new Set(arr1.filter(x=>!b.has(x))) //{1,2,3}
  let arr4 = new Set(arr2.filter(x=>!a.has(x))) //{6,7,8}
  [...arr3,...arr4] //[1,2,3,6,7,8]
  ```

**参考学习于：**

《HTML 5 与 CSS3权威指南》

[ES6之Set对象详解](https://blog.csdn.net/weixin_40013817/article/details/101363465)

## <span id="jump2">2. Map</span>

#### （1）什么是Map对象？

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键，这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

**语法**

```js
new Map([iterable])
```

其中：

* 参数：`iterable`

  Iterable 可以是一个[`数组`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)或者其他 [iterable](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/iterable) 对象，其元素为键值对(两个元素的数组，例如: [[ 1, 'one' ],[ 2, 'two' ]])。 每个键值对都会添加到新的 Map。`null` 会被当做 `undefined。`

**Map的key**：

```js
//key 是字符串
var myMap = new Map();
var keyString = "a string"; 
 
myMap.set(keyString, "和键'a string'关联的值");
 
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get("a string");   // "和键'a string'关联的值"
                         // 因为 keyString === 'a string'
//key 是对象
var myMap = new Map();
var keyObj = {}, 
 
myMap.set(keyObj, "和键 keyObj 关联的值");

myMap.get(keyObj); // "和键 keyObj 关联的值"
myMap.get({}); // undefined, 因为 keyObj !== {}

//key 是函数
var myMap = new Map();
var keyFunc = function () {}, // 函数
 
myMap.set(keyFunc, "和键 keyFunc 关联的值");
 
myMap.get(keyFunc); // "和键 keyFunc 关联的值"
myMap.get(function() {}) // undefined, 因为 keyFunc !== function () {}

//key 是 NaN
var myMap = new Map();
myMap.set(NaN, "not a number");
 
myMap.get(NaN); // "not a number"
 
var otherNaN = Number("foo");
myMap.get(otherNaN); // "not a number"
```

#### （2）Map 和 Objects 的区别

- 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
- Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
- Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
- `Map` 可直接进行迭代，而 `Object` 的迭代需要先获取它的键数组，然后再进行迭代。
- Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
- `Map` 在涉及频繁增删键值对的场景下会有些性能优势。

#### （3）Map对象的属性方法

* **`size`**

  该属性返回 Map 对象中保存的键名/键值的数量。

  ```js
  const map = new Map();
  map.set('foo', true);
  map.set('bar', false);
  map.size // 2
  ```

* **`set(key, value)`**

  `set`方法设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新为value，否则就新生成该键。

  `set`方法返回的是当前的`Map`对象，因此可以采用链式写法。

  ```js
  const m = new Map();
   
  m.set('edition', 6)        // 键是字符串
  m.set(262, 'standard')     // 键是数值
  m.set(undefined, 'nah')    // 键是 undefined
  
  
  let map = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
  ```

* **`get(key)`**

  `get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

  ```js
  const m = new Map();
   
  const hello = function() {console.log('hello');};
  m.set(hello, 'Hello ES6!') // 键是函数
   
  m.get(hello)  // Hello ES6!
  ```

* **`has(key)`**

  `has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

  ```js
  
  const m = new Map();
   
  m.set('edition', 6);
  m.set(262, 'standard');
  m.set(undefined, 'nah');
   
  m.has('edition')     // true
  m.has('years')       // false
  m.has(262)           // true
  m.has(undefined)     // true
  ```

* **`delete(key)`**

  `delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。

  ```js
  const m = new Map();
  m.set(undefined, 'nah');
  m.has(undefined)     // true
   
  m.delete(undefined)
  m.has(undefined)       // false
  ```

* **`clear()`**

  移除Map对象中保存的所有键名/键值对，方法没有返回值

  ```js
  let map = new Map();
  map.set('foo', true);
  map.set('bar', false);
   
  map.size // 2
  map.clear()
  map.size // 0
  ```

* **`keys()`** 

  返回一个新的 `Iterator` 对象。它包含按照顺序插入 `Map` 对象中每个元素的key值。

* **`values()`** 

  该方法返回一个新的Iterator对象。它包含按顺序插入Map对象中每个元素的value值。

* **`entires()`**:

  该方法返回一个新的Iterator对象。它包含按顺序插入Map对象中每个。

  ```js
  var myMap = new Map();
  myMap.set(0, "零");
  myMap.set(1, "一");
  for (let key of myMap.keys()) {
      console.log(key); //0  1
  }
  
  for (let value of myMap.key()) {
      console.log(value); //  零  一
  }
  
  for (let [key, value] of myMap) {
      console.log(key + "=" + value);  //0=零   1=一
  }
  ```

* **`forEach(callback, thisArg)`**:

  `forEach()` 方法将会以插入顺序对 Map 对象中的每一个键值对执行一次参数中提供的回调函数。

  其中：

  * **参数**：

    `callback`：必要，每个元素所要执行的函数。

    `thisArg`：可选，`callback` 执行时其 `this` 的值。

  * **返回值**：undefined

  ```js
  var myMap = new Map();
  myMap.set(0, "零");
  myMap.set(1, "一");
  myMap.forEach(function(value, key) {
      console.log(key + "=" + value);
  }, myMap)
  ```

#### （4）Map 对象的操作

* **Map 与 Array的转换**

  ```js
  var kvArray = [["key1", "value1"], ["key2", "value2"]];
   
  // Map 构造函数可以将一个 二维 键值对数组转换成一个 Map 对象
  var myMap = new Map(kvArray);
   
  // 使用 Array.from 函数可以将一个 Map 对象转换成一个二维键值对数组
  var outArray = Array.from(myMap);
  ```

* **Map 的克隆**

  ```js
  var myMap1 = new Map([["key1", "value1"], ["key2", "value2"]]);
  var myMap2 = new Map(myMap1);
   
  console.log(original === clone); 
  // 打印 false。 Map 对象构造函数生成实例，迭代出新的对象。
  ```

* **Map 的合并**

  ```js
  var first = new Map([[1, 'one'], [2, 'two'], [3, 'three'],]);
  var second = new Map([[1, 'uno'], [2, 'dos']]);
   
  // 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的，对应值即 uno，dos， three
  var merged = new Map([...first, ...second]);
  ```

  

