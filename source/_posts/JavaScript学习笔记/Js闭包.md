---
title: Js闭包
date: 1578014187942.8196
tags:
- JavaScript
category:
- JavaScript学习笔记
---
（本文是对网上一些关于闭包的资料的小总结，主要参考链接[link](https://www.jianshu.com/p/26c81fde22fb),对其中坑点例子的代码进行小修正，并加入自己的理解和代码注解，方便读者理解。）

**闭包定义：**闭包就是能够读取其他函数内部变量的函数。清晰地说，闭包就是一个函数，这个函数能够访问其他函数作用域中的变量。

```js
function outer() {
     var  a = '变量1'
     var  inner = function () {
            console.info(a)
     }
    return inner    // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
}
```

（因为inner能够访问到outer作用域的变量，所以inner是个闭包函数）

**在说闭包前，先了解一下js函数和变量在堆栈中的如何存储：**

js基本类型：Undefined，Null，Boolean，Number，String

js引用类型：Object，Array，Function

基本类型值在内存中占固定大小，被保存在栈中。引用类型值是对象，保存在堆内存中。

1. 栈：stack是有结构的，先进先出，存放基本数据类型和对象的引用，每个区块的大小是明确的。
2. 堆：heap没有结构，数据任意存放，js中主要存放的是引用类型。

参考链接：[link](https://blog.csdn.net/sinat_15951543/article/details/79228675)

看一个例子：

```js
var a = 1;
function fn(){
    var b = 2;
    function fn1(){
        console.log(b);
    }
    fn1();
}
fn();
```

他在栈中的存放情况：

![img](https://upload-images.jianshu.io/upload_images/7155532-ee4142a5b829d016.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

栈是一种先进后出的数据结构：
 1 在执行fn前，此时我们在全局执行环境(浏览器就是window作用域)，全局作用域里有个变量a；
 2 进入fn，此时栈内存就会push一个fn的执行环境，这个环境里有变量b和函数对象fn1，这里可以访问自身执行环境和全局执行环境所定义的变量
 3 进入fn1，此时栈内存就会push 一个fn1的执行环境，这里面没有定义其他变量，但是我们可以访问到fn和全局执行环境里面的变量，因为程序在访问变量时，是向底层栈一个个找，如果找到全局执行环境里都没有对应变量，则程序抛出underfined的错误。

4 随着fn1()执行完毕，fn1的执行环境被杯销毁，接着执行完fn()，fn的执行环境也会被销毁，只剩全局的执行环境下，现在没有b变量，和fn1函数对象了，只有a 和 fn(函数声明作用域是window下)



现在看回最初的例子outer与inner：

```js
function outer() {
     var  a = '变量1'
     var  inner = function () {
            console.info(a)
     }
    return inner    // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
}
var  inner = outer()   // 获得inner闭包函数
inner()   //"变量1"
```



当程序执行完var inner = outer()，其实outer的执行环境并没有被销毁，因为他里面的变量a仍然被被inner的函数作用域链所引用，当程序执行完inner(), 这时候，inner和outer的执行环境才会被销毁调。



现在基本了解闭包，通过分析以下几个坑点，来深入了解闭包：

1. 坑点：**引用的变量可能发生变化**：

   ```js
   function outer() { 
         var result = [];
         for (var i = 0; i<10; i++){
           result[i] = function () {  //将函数赋值给每个result数组中的元素。
               console.info(i)
           }
        }
        return result  //outer函数返回值result是一个包含10个元素的数组，而每个元素都是一个函数。
   }
   var res = outer();  //这里调用了outer函数，并将outer函数返回值result赋值给res，
   res[3]();//这里调用res数组中的第四个函数。
   ```

看样子result每个闭包函数对打印对应数字，1,2,3,4,...,10, 实际不是，因为每个闭包函数访问变量i是outer执行环境下的变量i，随着循环的结束，i已经变成10了，所以执行每个闭包函数，结果打印10， 10， ..., 10

**出现上面的原因是因为：**

在刚开始的一段代码中，我们只是在声明一个outer函数，并没有调用它，也没有调用outer返回值result中的函数。

而在运行了`var res = outer()`这段代码后，也只是调用了outer函数，也就是说，此时outer函数返回值result数组里只是存了10个函数，并没有被调用。当我们在运行`res[3]()`这句代码时，res数组里的第四个函数才被调用，这个函数被调用时，他需要打印出变量i，所以他得去栈里找到i，然而在他被调用前，for循环早已从0到10，i已经是10了，所以打印出的i就是10。



怎么解决这个问题呢？

```js
function outer() {
      var result = [];
      for (var i = 0; i<10; i++){
        result[i] = function (num) { //这里的num就是函数的输入变量，即i
             return function() {
                   console.info(num);    // 此时访问的num，是上层函数执行环境的num，数组有10个函数对象，每个对象的执行环境下的number都不一样
             }
        }(i)  //注意看这个加在函数后面（i）,说明在此赋值给result数组的10个元素都是立即执行函数，他们在创建之后立即被执行。
     }
     return result  //因为赋值给result元素的函数是立即执行函数，他们在创建就已经被执行，所以此时result里面存的实际是立即执行函数执行完返回的10个函数 function() {console.info(num);}，他们的num不相同，分别是0-10
}
var res = outer();
res[3]();//此时调用的是res元素的第四个元素，他是立即执行函数返回的函数function() {console.info(num);}，此时他去找的num就是3
```



2. 坑点：**this指向问题**

```js
var object = {
     name: "object"
     getName： function() {
        return function() {
             console.info(this.name)
        }
    }
}
object.getName()()    // underfined  
// 因为里面的闭包函数是在window作用域下执行的，也就是说，this指向windows
```

那为什么说里面的闭包函数是在weindow作用域下呢?

原因：主要看这句代码：`object.getName()()` ，其中，先看前面`object.getName()`这句是在调用对象object中的getName函数，执行完后这句话后，返回值是另一个函数`function() { console.info(this.name) }`此时这个返回的函数已经和object无关，他不在是在object里面，而是在window作用域中的函数。也就是说`object.getName()()` 这句话是在调用getName函数返回的一个已经和object无关的函数。

