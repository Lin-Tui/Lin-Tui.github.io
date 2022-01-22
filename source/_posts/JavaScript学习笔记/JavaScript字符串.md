---
title: JavaScript字符串
date: 1584320285961.55
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# JavaScript字符串

JavaScript 字符串用于存储和处理文本。

* 字符串可以是插入到引号中的任何字符。你可以使用单引号或双引号：

  ```js
  var carname = "Volvo XC60";
  var carname = 'Volvo XC60';
  ```

* 可以使用索引位置来访问字符串中的每个字符：

  ```js
  var character = carname[7];
  ```

* 可以在字符串中使用引号，字符串中的引号不要与字符串的引号相同:

  ```js
  var answer = "It's alright";
  var answer = "He is called 'Johnny'";
  var answer = 'He is called "Johnny"';
  ```

* 也可以在字符串添加转义字符来使用引号：

   反斜杠是一个**转义字符**。 转义字符将特殊字符转换为字符串字符：

   转义字符 (\) 可以用于转义撇号，换行，引号，等其他特殊字符。

  ```js
  var x = 'It\'s alright';
  var y = "He is called \"Johnny\"";
  ```

* 通常， JavaScript 字符串是原始值，可以使用字符创建： `var firstName = "John"`

  但我们也可以使用 new 关键字将字符串定义为一个对象： `var firstName = new String("John")`

  ```js
  var x = "John";
  var y = new String("John");
  typeof x // 返回 String
  typeof y // 返回 Object
  (x === y) // 结果为 false，因为 x 是字符串，y 是对象
  ```

### 字符串方法：

|         方法          | 描述                                                         |
| :-------------------: | :----------------------------------------------------------- |
|      `charAt()`       | 返回指定索引位置的字符                                       |
|    `charCodeAt()`     | 返回指定索引位置字符的 Unicode 值                            |
|      `concat()`       | 连接两个或多个字符串，返回连接后的字符串                     |
|   `fromCharCode()`    | 将 Unicode 转换为字符串                                      |
|      `indexOf()`      | 返回字符串中检索指定字符第一次出现的位置                     |
|    `lastIndexOf()`    | 返回字符串中检索指定字符最后一次出现的位置                   |
|   `localeCompare()`   | 用本地特定的顺序来比较两个字符串                             |
|       `match()`       | 找到一个或多个正则表达式的匹配。用来查找字符串中特定的字符，并且如果找到的话，则返回这个字符。 |
|      `replace()`      | 替换与正则表达式匹配的子串                                   |
|      `search()`       | 检索与正则表达式相匹配的值                                   |
|       `slice()`       | 提取字符串的片断，并在新的字符串中返回被提取的部分           |
|       `split()`       | 把字符串分割为子字符串数组                                   |
|      `substr()`       | 从起始索引号提取字符串中指定数目的字符                       |
|     `substring()`     | 提取字符串中两个指定的索引号之间的字符                       |
| `toLocaleLowerCase()` | 根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射 |
| `toLocaleUpperCase()` | 根据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射 |
|    `toLowerCase()`    | 把字符串转换为小写                                           |
|     `toString()`      | 返回字符串对象值                                             |
|    `toUpperCase()`    | 把字符串转换为大写                                           |
|       `trim()`        | 移除字符串首尾空白                                           |
|      `valueOf()`      | 返回某个字符串对象的原始值                                   |
|     `toString()`      | 返回一个字符串。                                             |

```js
var str="Hello world, welcome to the universe.";
var n=str.indexOf("welcome");

document.write(str.match("world") + "<br>");
document.write(str.match("World") + "<br>");
document.write(str.match("world!"));

str="Please visit Microsoft!"
var n=str.replace("Microsoft","Runoob");

var txt="Hello World!";       // String
var txt1=txt.toUpperCase();   // txt1 文本会转换为大写
var txt2=txt.toLowerCase();   // txt2 文本会转换为小写

txt="a,b,c,d,e"   // String
txt.split(",");   // 使用逗号分隔
txt.split(" ");   // 使用空格分隔
txt.split("|");   // 使用竖线分隔 
```

学习自[菜鸟教程](https://www.runoob.com/js/js-strings.html)







































