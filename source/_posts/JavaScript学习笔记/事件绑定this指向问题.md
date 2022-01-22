---
title: 事件绑定this指向问题
date: 1588655557070.9482
tags:
- JavaScript
category:
- JavaScript学习笔记
---
```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    <meta charset="utf-8">
    <title>This</title>
    <style>
        #container{
            width: 100%; height: 200px; line-height: 200px; text-align: center; color: #fff; background-color: #444; font-size: 30px;
        }
    </style>
</head>
<body>
    <!--看下面代码-->
</body>
</html>
```

### **1. 在 element 上绑定事件**

此时 this 指向 全局变量

```html
<!-- 在<body</body>里加入: -->
<div id="container" onclick="addCount()"></div>
<script>
    var count = 0;
    function addCount() {
        container.innerHTML = count++;
        console.log(this); //window
    };
</script>
```

### **2. js 绑定 onclick 事件**

此时的 this 指向 该元素

```html
<!-- 在<body</body>里加入: -->
<div id="container"></div>
<script>
    var count = 0;
    var container = document.getElementById('container');
    function addCount() {
        container.innerHTML = count++;
        console.log(this); //<div id="container"></div>
    };
    container.onclick = addCount;
//如果写成 container.onclick = addCount(),则：addCount()函数只执行一次，且它this指向window,此时输出为window,就不为<div id="container"></div>
</script>
```

### **3. js 使用 addEventListener 绑定事件**

此时的 this 指向 该元素,

注意： 在IE浏览器中，使用为 attachEvent(), this 指向全局变量

```html
<!-- 在<body</body>里加入: -->
<div id="container"></div>
<script>
    var count = 0;
    var container = document.getElementById('container');
    function addCount() {
        container.innerHTML = count++;
        console.log(this); //<div id="container"></div>
    };
    container.addEventListener('click', addCount);
//如果写成 container.addEventListener('click', addCount());,则：addCount()函数只执行一次，且它this指向window,此时输出为window,就不为<div id="container"></div>
</script>
```

### **4.  jquery 的 3种绑定 click 事件**

此时的 this 均指向该元素

```html
<div id="container"></div>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
var count = 0;
function addCount() {
   $('#container').text(count++);
    console.log(this); 
};
$('#container').bind('click', addCount)//<div id="container"></div>
$('#container').click(addCount)//<div id="container"></div>
$('#container').on('click',addCount)//<div id="container"></div>
</script>
```



















