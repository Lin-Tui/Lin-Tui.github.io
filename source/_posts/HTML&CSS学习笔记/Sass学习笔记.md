---
title: Sass学习笔记
date: 1601256878188.7957
tags:
- CSS
category:
- HTML&CSS学习笔记
---
## 什么是 CSS 预处理器？

**定义：**

CSS 预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为 CSS 增加了一些编程的特性，将 CSS 作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。

通俗的说，“CSS 预处理器用一种专门的编程语言，进行 Web 页面样式设计，然后再编译成正常的 CSS 文件，以供项目使用。CSS 预处理器为 CSS 增加一些编程的特性，无需考虑浏览器的兼容性问题”，例如你可以在 CSS 中使用**变量**、**简单的逻辑程序**、**函数（**如右侧代码编辑器中就使用了变量**$color）**等等在编程语言中的一些基本特性，可以让你的 CSS **更加简洁**、**适应性更强**、**可读性更佳**，**更易于代码的维护**等诸多好处。

**其它 CSS 预处理器语言：**

CSS 预处理器技术已经非常的成熟，而且也涌现出了很多种不同的 **CSS 预处理器语言**，比如说：

- Sass（SCSS）
- LESS
- Stylus
- Turbine
- Swithch CSS
- CSS Cacheer
- DT CSS

如此之多的 CSS 预处理器，那么“我应该选择哪种 CSS 预处理器？”也相应成了最近网上的一大热门话题，在 **Linkedin**、**Twitter**、**CSS-Trick**、**知乎**以及各大技术论坛上，很多人为此争论不休。相比过去我们对是否应该使用 CSS 预处理器的话题而言，这已经是很大的进步了。

到目前为止，在众多优秀的 CSS 预处理器语言中就属 **Sass**、**LESS** 和 **Stylus** 最优秀，讨论的也多，对比的也多。本教程将着重向大家介绍 CSS 预处理器中的 Sass。相信前端开发工程师会喜欢的。

##  什么是 Sass？

[Sass 官网](http://sass-lang.com/)上是这样描述 Sass 的：

```
Sass 是一门高于 CSS 的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通 CSS 更加强大的功能。
Sass 能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表。
```

**Sass 前世今生：**

Sass 是最早的 CSS 预处理语言，有比 LESS 更为强大的功能，不过其一开始的缩进式语法（Sass 老版本语法，后面课程会详细介绍 ）并不能被大众接受，不过由于其强大的功能和 Ruby on Rails 的大力推动，还是有很多开发者选择了 Sass。

Sass 是采用 **Ruby** 语言编写的一款 CSS 预处理语言，它诞生于2007年，是最大的成熟的 CSS 预处理语言。最初它是为了配合 HAML（一种缩进式 HTML 预编译器）而设计的，因此有着和 HTML 一样的缩进式风格。

**为什么早期不如 LESS 普及？**

虽然缩进式风格可以有效缩减代码量，强制规范编码风格，但它一方面并不为大多数程序接受，另一方面无法兼容已有的 CSS 代码。这也是 Sass 虽然出现得最早，但远不如 LESS 普及的原因。

## Sass 和 SCSS 有什么区别？

Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

1. 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名
2. 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

先来看一个示例：

**Sass 语法**

```
$font-stack: Helvetica, sans-serif  //定义变量
$primary-color: #333 //定义变量

body
  font: 100% $font-stack
  color: $primary-color
```

**SCSS 语法**

```
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

**编译出来的 CSS**

```
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

**提示：**小伙伴们可以看出来，我们的右侧代码使用的是 **SCSS 语法**方式（我们的代码编辑器**不支持** **Sass 语法**方式噢！）。

## Sass/SCSS 和纯 CSS 写法差很多吗？

写法差很多吗？这是很多初学者会问的一个问题。那么借此机会简单了解一下。

**Sass 和 CSS 写法有差别：**

Sass 和 CSS 写法的确存在一定的差异，由于 Sass 是基于 Ruby 写出来，所以其延续了 Ruby 的书写规范。在书写 Sass 时不带有大括号和分号，其主要是依靠严格的缩进方式来控制的。如：

Sass写法：

```
body
  color: #fff
  background: #f36
```

而在 CSS 我们是这样书写：

```
body{
  color:#fff;
  background:#f36;
}
```

**SCSS 和 CSS 写法无差别：**

SCSS 和 CSS 写法无差别，这也是 Sass 后来越来越受大众喜欢原因之一。简单点说，把你现有的“.css”文件直接修改成“.scss”即可使用。

 

































