---
title: JavaScript设计模式
date: 1583996510588.8787
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# JavaScript设计模式

**设计模式**代码经验的总结，是可重用的用于解决软件设计中一般问题的方案。
设计模式都是面向对象的。

学习设计模式，有助于写出可复用和可维护性高的程序。

### 常用的12种设计模式：

* ------

  **[工厂模式](#jump1)**

* **[单例模式](#jump2)**

* **[原型模式](#jump3)**

* **[适配器模式](#jump4)**

* **[代理模式](#jump5)**

* **[策略模式](#jump6)**

* **[迭代器模式](#jump7)**

* **[观察者模式](#jump8)**

* **[发布-订阅模式](#jump9)**

* **[命令模式](#jump10)**

* **[组合模式](#jump11)**

* **[建造者模式](#jump12)**

### 设计原则

* **单一职责原则（SRP）**

  一个对象或方法只做一件事情。如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。

  应该把对象或方法划分成较小的粒度。

* **最少知识原则（LKP）**

  一个软件实体应当 尽可能少地与其他实体发生相互作用 

  应当尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的 相互联系，可以转交给第三方进行处理

* **开放-封闭原则（OCP）**

  软件实体（类、模块、函数）等应该是可以 扩展的，但是不可修改

  当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，尽量避免改动程序的源代码，防止影响原系统的稳定

## <span id="jump1">（一）工厂模式</span>

#### 1. 什么是工厂模式？

工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

工厂模式是用来创建对象的一种最常用的设计模式。我们不暴露创建对象的具体逻辑，而是将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。

工厂模式根据抽象程度的不同可以分为：简单工厂，工厂方法和抽象工厂。

#### 2. 工厂模式目的？

**工厂模式**的目的是为了创建对象，它通常在类或者类的静态方法中实现，具有以下目标：

- 当创建相似对象时执行重复操作
- 当编译时不知道具体类型的情况下，为工厂客户提供一个创建对象的接口

与创建型模式类似，工厂模式创建对象（视为工厂里的产品）时无需指定创建对象的具体类。

#### 3. 工厂模式使用场景？

那么什么时候使用工厂模式呢，以下几种情景下工厂模式特别有用：

- 对象的构建十分复杂
- 需要依赖具体环境创建不同实例
- 处理大量具有相同属性的小对象

什么时候不该用工厂模式：
不滥用运用工厂模式，有时候仅仅只是给代码增加了不必要的复杂度，同时使得测试难以运行下去。

#### 4. 详细内容与例子可学习：

[从ES6重新认识JavaScript设计模式(二): 工厂模式](https://www.jianshu.com/p/11918dd0f694)

[JS工厂模式](https://segmentfault.com/a/1190000012422198)

[设计模式之工厂模式](https://www.cnblogs.com/TomXu/archive/2012/02/23/2353389.html)

## <span id="jump2">（二）单例模式</span>

#### 1. 什么是单例模式?

限制类实例化次数只能一次，一个类只有一个实例，并提供一个访问它的全局访问点。

#### 2. 单例模式的目的？

通过单例模式可以保证系统中一个类只有一个实例而且该实例易于外界访问，从而方便对实例个数的控制并节约系统资源。如果希望在系统中某个类的对象只能存在一个，单例模式是最好的解决方案。

#### 3. 单例模式使用场景？

单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的window对象等。在JavaScript开发中，单例模式的用途同样非常广泛。试想一下，当我们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗用单例模式来创建。

#### 4. 单例模式的特点？

* 类只有一个实例

* 全局可访问该实例

* 自行实例化（主动实例化）

* 可推迟初始化，即延迟执行（与静态类/对象的区别）

JavaScript 是一门非正规面向对象的语言，并没有类的定义。而单例模式要求一个 “唯一” 和 “全局访问” 的对象，在 JavaScript 中类似全局对象，刚好满足单例模式的两个特点：“唯一” 和 “可全局访问”。虽然它不是正规的单例模式，但不可否认确实具备类单例模式的特点。

##### 使用全局变量会有以下问题：

* 命名空间污染（变量名冲突）

* 维护时不方便管控（容易不小心覆盖）

##### 全局变量问题折中的应对方案：

* 使用命名空间

* 闭包封装私有变量（利用函数作用域）

* ES6的 const/symbol

虽然全局变量可以实现单例，但因其自身的问题，不建议在实际项目中将其作为单例模式的应用，特别是中大型项目的应用中，全局变量的维护该是考虑的成本。

#### 5. 单例模式优缺点：

**优点：**

* 单例模式会阻止其他对象实例化其自己的单例对象的副本，从而确保所有对象都访问唯一实例。
* 灵活性
  因为类控制了实例化过程，所以类可以灵活更改实例化过程。

**缺点：**

* 开销
  虽然数量很少，但如果每次对象请求引用时都要检查是否存在类的实例，将仍然需要一些开销。可以通过使用静态初始化解决此问题。
* 可能的开发混淆
  使用单例对象（尤其在类库中定义的对象）时，开发人员必须记住自己不能使用new关键字实例化对象。因为可能无法访问库源代码，因此应用程序开发人员可能会意外发现自己无法直接实例化此类。
* 就是不适用于变化的对象，如果同一类型的对象总是要在不同的用例场景发生变化，单例就会引起数据的错误，不能保存彼此的状态。

#### 6. 单例模式的思路：

一个类能返回一个对象的引用（并且永远是同一个）和一个获得该实例的方法（静态方法，通常使用 getInstance 名称）。

那么当我们调用这个方法时，如果类持有的引用不为空就返回该引用，否者就创建该类的实例，并且将实例引用赋值给该类保持的那个引用再返回。同时将该类的构造函数定义为私有方法，避免其他函数使用该构造函数来实例化对象，只通过该类的静态方法来得到该类的唯一实例

#### 7. 详细内容与例子可学习：

[从ES6重新认识JavaScript设计模式(一): 单例模式](https://www.jianshu.com/p/5386936acfec)

[JavaScript 设计模式（一）：单例模式](https://juejin.im/post/5d11bcdcf265da1b94215726)

[深入理解JavaScript系列（25）：设计模式之单例模式](https://www.cnblogs.com/TomXu/archive/2012/02/20/2352817.html)

## <span id="jump3">（三）原型模式？</span>

#### 1. 什么是原型模式？

原型模式（prototype）是指用原型实例指向创建对象的种类，并且通过拷贝这些原型创建新的对象。

#### 2. 原型模式的实现

对于原型模式，我们可以利用JavaScript特有的原型继承特性去创建对象的方式，也就是创建的一个对象作为另外一个对象的prototype属性值。原型对象本身就是有效地利用了每个构造器创建的对象，例如，如果一个构造函数的原型包含了一个name属性，那通过这个构造函数创建的对象都会有这个属性。

在现有的文献里查看原型模式的定义，没有针对JavaScript的，你可能发现很多讲解的都是关于类的，但是现实情况是基于原型继承的JavaScript完全避免了类（class）的概念。我们只是简单从现有的对象进行拷贝来创建对象。

真正的原型继承是作为最新版的ECMAScript5标准提出的，使用`Object.create`方法来创建这样的对象，该方法创建指定的对象，其对象的prototype有指定的对象（也就是该方法传进的第一个参数对象），也可以包含其他可选的指定属性。例如`Object.create(prototype, optionalDescriptorObjects)`，下面的例子里也可以看到这个用法：

```js
// 因为不是构造函数，所以不用大写
var someCar = {    
    drive: function () { },    
    name: '马自达 3'
};
// 使用Object.create创建一个新车x
var anotherCar = Object.create(someCar);
notherCar.name = '丰田佳美';
```

Object.create运行你直接从其它对象继承过来，使用该方法的第二个参数，你可以初始化额外的其它属性。例如：

```js
var vehicle = {    
    getModel: function () {        
        console.log('车辆的模具是：' + this.model);    
    }
};
var car = Object.create(vehicle, {    
    'id': {        
        value: MY_GLOBAL.nextId(),        
        enumerable: true // 默认writable:false, configurable:false 
    },    
    'model': {        
        value: '福特',        
        enumerable: true    
    }
});
```

这里，可以在Object.create的第二个参数里使用对象字面量传入要初始化的额外属性，其语法与`Object.defineProperties`或`Object.defineProperty`方法类型。它允许您设定属性的特性，例如enumerable, writable 或 configurable。

**学习摘自：**

[深入理解JavaScript系列（42）：设计模式之原型模式](https://www.cnblogs.com/TomXu/archive/2012/04/16/2436460.html)

## <span id="jump4">（四）适配器模式</span>

#### 1. 什么是适配器模式？

**适配器模式(Adapter)**：将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

#### 2. 适配器模式使用场景？

在前端开发中，我们可能会遇见这样的场景：当我们试图调用某个模块或者对象的接口时，却发现这个**接口的格式不符合我们的需求**。这时有两种解决办法：第一种是修改原来的接口实现，但如果原来的代码很复杂，例如是一个库或框架，更改原代码就显得很不现实了。所以这时就需要使用今天所讲的第二种办法：创建一个适配器，将原接口转换为客户希望的另一个接口，客户只需要使用适配器即可。

前端项目中，适配器模式的使用场景一般有以下三种情况：库的适配、参数的适配和数据的适配。下面将以在项目中的实际例子来说明。

#####  ES6中的适配器模式

*  **库的适配**

  项目上线前通常会要求前端开发者在页面中会接入统计网页数据用的SDK，这些SDK能够采集用户的信息和网页行生成可视化的图表和表格，来帮助网站运营人员和产品经理更好的根据用户行为来提升网页质量。

* **参数的适配**

  有的情况下一个方法可能需要传入多个参数。

* **数据的适配**

  数据的适配在前端中是最为常见的场景，这时适配器在解决前后端的数据依赖上有着重要的意义。通常服务器端传递的数据和我们前端需要使用的数据格式是不一致的，特别是在在使用一些UI框架时，框架所规定的数据有着固定的格式。所以，这个时候我们就需要对后端的数据格式进行适配。

#### 3. 详细内容与示例见：

[从ES6重新认识JavaScript设计模式(四): 适配器模式](https://www.jianshu.com/p/2701e7e59e69)

[JavaScript 设计模式（四）：适配者模式](https://juejin.im/post/5d1321a7f265da1b802055e5)

## <span id="jump5">（五）代理模式</span>

#### 1. 什么是代理模式？

为其他对象提供一种代理以控制对这个对象的访问。在某些情况下，一个对象不适合或者不能直接引用另一个对象，而代理对象可以在客户端和目标对象之间起到中介的作用。

（当客户不方便直接访问一个 对象或者不满足需要的时候，提供一个替身对象 来控制对这个对象的访问，客户实际上访问的是 替身对象。

替身对象对请求做出一些处理之后， 再把请求转交给本体对象

代理和本体的接口具有一致性，本体定义了关键功能，而代理是提供或拒绝对它的访问，或者在访问本体之前做一 些额外的事情。）

#### 2. 代理模式使用场景？

利用ES6中的`Proxy`实现前端中3种代理模式的使用场景，分别是：

**缓存代理**、**验证代理**、**实现私有属性**。

ES6所提供`Proxy`构造函数能够让我们轻松的使用代理模式:

```javascript
var proxy = new Proxy(target, handler);
```

`Proxy`构造函数传入两个参数，第一个参数`target`表示所要代理的对象，第二个参数`handler`也是一个对象用来设置对所代理的对象的行为。如果想知道`Proxy`的具体使用方法，可参考阮一峰的[《 ECMAScript入门 - Proxy 》](http://es6.ruanyifeng.com/#docs/proxy)。

##### 缓存代理

缓存代理可以将一些开销很大的方法的运算结果进行缓存，再次调用该函数时，若参数一致，则可以直接返回缓存中的结果，而不用再重新进行运算。例如在采用后端分页的表格时，每次页码改变时需要重新请求后端数据，我们可以将页码和对应结果进行缓存，当请求同一页时就不用在进行ajax请求而是直接返回缓存中的数据。

##### 验证代理

`Proxy`构造函数第二个参数中的`set`方法，可以很方便的验证向一个对象的传值。我们以一个传统的登陆表单举例，该表单对象有两个属性,分别是`account`和`password`，每个属性值都有一个简单和其属性名对应的验证方法

##### 实现私有属性

代理模式还有一个很重要的应用是实现访问限制。总所周知，JavaScript是没有私有属性这一个概念的，通常私有属性的实现是通过函数作用域中变量实现的，虽然实现了私有属性，但对于可读性来说并不好。

私有属性一般是以`_`下划线开头，通过`Proxy`构造函数中的第二个参数所提供的方法，我们可以很好的去限制以`_`开头的属性的访问。

#### 3. 使用代理模式的意义

* 遵循“单一职责原则”，面向对象设计中鼓励将不同的职责分布到细粒度的对象中，`Proxy` 在原对象的基础上进行了功能的衍生而又不影响原对象，符合松耦合高内聚的设计理念

* 遵循“开放-封闭原则”，代理可以随时从程序中去掉，而不用对其他部分的代码进行修改，在实际场景中，随着版本的迭代可能会有多种原因不再需要代理，那么就可以容易的将代理对象换成原对象的调用

#### 4. 详细内容与例子见：

[从ES6重新认识JavaScript设计模式(五): 代理模式和Proxy](https://www.jianshu.com/p/d791a84c5733)

## <span id="jump6">（六）策略模式</span>

#### 1. 什么是策略模式？

定义一系列的算法，把它们一个个封装起来，并使它们可以替换。

**栗子：**

诸葛给刘备的锦囊妙计，遇到任何困难都有应对计策。策略模式实现的也是类似的场景。

给喜欢的女生买冰淇淋，事先不了解其喜好，只能集齐各种味道，总会命中。就是比较 “费钱”，这也是策略模式的缺点，需事先考虑所有应对场景。

#### 2. 策略模式特点？

* 策略类：算法封装成独立的函数/对象

* 环境类：根据不同参数调用对应的策略函数/对象执行

#### 3. 策略模式实现：

将算法的使用和算法的实现分离开来。

**实现方式：**

一个基于策略模式的程序至少由两部分组成，

第一个部分是一组策略类 Strategies（可变），策略类封装类具体的算法，并负责具体的计算过程。

第二个部分是环境类 Context（不变）， Context 接收客户的请求，随后把请求委托给某一个策略类。

**例子：**

假设我们一个开发团队，人员组成包括（开发组长，后端，前端，测试）。开发组长领取开发任务（不变），但具体的任务执行人员可根据类型划分（可变）。

比如开发任务有以下几项：

* 优化服务器缓存（后端任务）

* 优化首屏加载速度（前端任务）

* 完成系统并发测试（测试任务）

开发组长会根据任务类型，分发到对应的开发人员头上，组长不承担具体开发任务。所以每一个开发人员就承担 Strategy 的作用（独立的任务执行），而组长拥有并可支配所有开发人员的资源，充当 Context 的角色。团队每一个开发人员**“组合”**起来就是一个 Strategies 类（执行开发任务）。 这个 Strategies 是可变的，如果说后续开发任务需要安卓的、IOS的支持，只要添加安卓、IOS开发人员配置即可（可扩展）。

```js
// 策略类（开发人员）
var Strategies = {
    "backend": function(task) {
        console.log('进行后端任务：', task);
    },
    "frontend": function(task) {
        console.log('进行前端任务：', task);
    },
    "testend": function(task) {
        console.log('进行测试任务：', task);
    }
};

//  环境类（开发组长）
var Context = function(type, task) {
    typeof Strategies[type] === 'function' && Strategies[type](task);
}

// 若没有使用策略模式的组长...
var Context = function(type, task) {
    if (type === 'backend') {
        // 把后端给我叫来
    } else if (type === 'frontend') {
        // 把前端给我叫来
    } else if (type === 'testend') {
        // 把测试给我叫来
    }
}

Context('backend', '优化服务器缓存');
Context('frontend', '优化首页加载速度');
Context('testend', '完成系统并发测试');
```

JavaScript 中，函数作为“一等公民“，也称“一等对象”。JavaScript 中 ”高阶函数“ 应用中，函数可被作为变量或参数进行传递或调用。因此在 JavaScript 中，我们可将算法封装成独立的函数，并将它作为参数传递给另一个函数调用。

```js
// 封装独立的函数
var backend = function(task) {
    console.log('进行后端任务：', task);
};
var frontend = function(task) {
    console.log('进行前端任务：', task);
};
var testend = function(task) {
    console.log('进行测试任务：', task);
};

//  环境类（开发组长）
var Context = function(func, task) {
    typeof func === 'function' && func(task);
}

Context(backend, '优化服务器缓存');
Context(frontend, '优化首页加载速度');
Context(testend, '完成系统并发测试');
```

少了 Strategies 策略类的外层包裹，函数更加独立，并不妨碍其调用。使用函数替代策略类方式，正是我们日常开发中经常用到的 “隐形” 策略模式。

#### 4. 策略模式适用场景：

* 多重条件语句判断，执行对应的算法场景

* 表单校验（validator)

#### 5. 策略模式优缺点：

##### 优点：

* 利用组合、委托、多态的技术和思想，避免多重条件选择语句 `if...else/switch...case`；

* 复用性更高，算法函数可在系统其它地方使用；

* 支持设计模式 “开发-封闭原则“ ，算法封装在独立的 Strategy 中，易于维护和扩展；

* 策略模式使用 “组合和委托” 来让 Context 拥有执行算法的能力，一种替换对象继承的可行方案

##### 缺点： 

* 增加了许多策略类或对象（开发人员职能划分明确，人员成本有所增加）；

* 必须了解各个 Strategy 的不同点，违反 “最少知识原则”（组长手底下有对应的开发人员，才不用自己那么苦逼）

**摘自好文：**

[JavaScript 设计模式（二）：策略模式](https://juejin.im/post/5d11bd7ff265da1b8811e9c2)

## <span id="jump7">（七）迭代器模式</span>

#### 1. 什么是迭代器模式？

迭代器模式是指一种顺序访问一个聚合对象中的各个元素，而不需要暴露该对象

的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

简单理解（白话理解）：统一 “集合” 型数据结构的遍历接口，实现可循环遍历获取集合中各数据项（不关心数据项中的数据结构）。

**栗子：**

清单 TodoList。每日清单有学习类、生活类、工作类、运动类等项目，清单列表只管罗列，不管类别。

#### 2. 迭代器模式特点：

* 访问一个聚合对象的内容而无需暴露它的内部表示。

* 为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。

* 遍历的同时更改迭代器所在的集合结构可能会导致问题

#### 3. 使用场景：

不同数据结构类型的 “数据集合”，需要对外提供统一的遍历接口，而又不暴露或修改内部结构时，可应用迭代器模式实现。

#### 4. 迭代器模式实现

```js
// 统一遍历接口实现
var each = function(arr, callBack) {
  for (let i = 0, len = arr.length; i < len; i++) {
    // 将值，索引返回给回调函数callBack处理
    if (callBack(i, arr[i]) === false) {
      break;  // 中止迭代器，跳出循环
    }
  }
}

// 外部调用
each([1, 2, 3, 4, 5], function(index, value) {
    if (value > 3) {
      return false; // 返回false中止each
    }
    console.log([index, value]);
})

// 输出：[0, 1]  [1, 2]  [2, 3]
```

**“迭代器模式的核心，就是实现统一遍历接口。”**

#### 5. 迭代器模式细分

* 内部迭代器 （jQuery 的 $.each / for...of)
* 外部迭代器 （ES6 的 yield)

##### 内部迭代器：

内部迭代器: 内部定义迭代规则，控制整个迭代过程，外部只需一次初始调用

```js
// jQuery 的 $.each（跟上文each函数实现原理类似）
$.each(['Angular', 'React', 'Vue'], function(index, value) {
    console.log([index, value]);
});

// 输出：[0, Angular]  [1, React]  [2, Vue]
复制代码
```

优点：调用方式简单，外部仅需一次调用 缺点：迭代规则预先设置，欠缺灵活性。无法实现复杂遍历需求（如: 同时迭代比对两个数组）

##### 外部迭代器：

外部迭代器： 外部显示（手动）地控制迭代下一个数据项

借助 ES6 新增的 `Generator` 函数中的 `yield*` 表达式来实现外部迭代器。

```js
// ES6 的 yield 实现外部迭代器
function* generatorEach(arr) {
  for (let [index, value] of arr.entries()) {
    yield console.log([index, value]);
  }
}

let each = generatorEach(['Angular', 'React', 'Vue']);
each.next();
each.next();
each.next();

// 输出：[0, 'Angular']  [1, 'React']  [2, 'Vue']
复制代码
```

优点：灵活性更佳，适用面广，能应对更加复杂的迭代需求 缺点：需显示调用迭代进行（手动控制迭代过程），外部调用方式较复杂

**参考好文：**

[JavaScript 设计模式（五）：迭代器模式](https://juejin.im/post/5d1a1adde51d45778f076d8c)

## <span id="jump8">（八）观察者模式</span>

#### 1. 什么是观察者模式？

观察者模式：定义了对象间一种一对多的依赖关系（一个目标者，即：被观察者，多个观察者），当目标对象 Subject 的状态发生改变时，所有依赖它的对象 Observer 都会得到通知。

#### 2. 观察者模式特征

* 一个目标者（被观察者）对象 `Subject`，拥有方法：添加 / 删除 / 通知 `Observer`；

* 多个观察者对象 `Observer`，拥有方法：接收 `Subject` 状态变更通知并处理；

* 目标对象 `Subject` 状态变更时，通知所有 `Observer`。

`Subject` 添加一系列 `Observer`， `Subject` 负责维护与这些 `Observer` 之间的联系，“你对我有兴趣，我更新就会通知你”。

#### 3. 观察者模式的实现

```js
// 目标者类
class Subject {
  constructor() {
    this.observers = [];  // 观察者列表
  }
  // 添加
  add(observer) {
    this.observers.push(observer);
  }
  // 删除
  remove(observer) {
    let idx = this.observers.findIndex(item => item === observer);
    idx > -1 && this.observers.splice(idx, 1);
  }
  // 通知
  notify() {
    for (let observer of this.observers) {
      observer.update();
    }
  }
}

// 观察者类
class Observer {
  constructor(name) {
    this.name = name;
  }
  // 目标对象更新时触发的回调
  update() {
    console.log(`目标者通知我更新了，我是：${this.name}`);
  }
}

// 实例化目标者
let subject = new Subject();

// 实例化两个观察者
let obs1 = new Observer('前端开发者');
let obs2 = new Observer('后端开发者');

// 向目标者添加观察者
subject.add(obs1);
subject.add(obs2);

// 目标者通知更新
subject.notify();  
// 输出：
// 目标者通知我更新了，我是前端开发者
// 目标者通知我更新了，我是后端开发者
```

#### 4. 观察者模式优缺点：

**优点：**

* 目标者与观察者，功能耦合度降低，专注自身功能逻辑；

* 观察者被动接收更新，时间上解耦，实时接收目标者更新状态。

**缺点：**

观察者模式虽然实现了对象间依赖关系的低耦合，但却不能对事件通知进行细分管控，如 “筛选通知”，“指定主题事件通知” 。

比如上面的例子，仅通知 “前端开发者” ？观察者对象如何只接收自己需要的更新通知？上例中，两个观察者接收目标者状态变更通知后，都执行了 `update()`，并无区分。

“00后都在追求个性的时代，我能不能有点不一样？”，这就引出我们的下一个模式。进阶版的观察者模式。“发布订阅模式”，部分文章对两者是否一样都存在争议。

仅代表个人观点：两种模式很类似，但是还是略有不同，就是多了个第三者，因 JavaScript 非正规面向对象语言，且函数回调编程的特点，使得 “发布订阅模式” 在 JavaScript 中代码实现可等同为 “观察模式”。

**摘自好文：**

[JavaScript 设计模式（六）：观察者模式与发布订阅模式](https://juejin.im/post/5d25a2316fb9a07f04207010)

## <span id="jump9">（九）发布订阅模式（Publisher && Subscriber）</span>

#### 1. 什么是发布订阅模式？

发布订阅模式：基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。

发布订阅模式与观察者模式的不同，“第三者” （事件中心）出现。目标对象并不直接通知观察者，而是通过事件中心来派发通知。

#### 2. 发布订阅模式的实现

```js
// 事件中心
let pubSub = {
  list: {},
  subscribe: function (key, fn) {   // 订阅
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  },
  publish: function(key, ...arg) {  // 发布
    for(let fn of this.list[key]) {
      fn.call(this, ...arg);
    }
  },
  unSubscribe: function (key, fn) {     // 取消订阅
    let fnList = this.list[key];
    if (!fnList) return false;

    if (!fn) {
      // 不传入指定取消的订阅方法，则清空所有key下的订阅
      fnList && (fnList.length = 0);
    } else {
      fnList.forEach((item, index) => {
        if (item === fn) {
          fnList.splice(index, 1);
        }
      })
    }
  }
}

// 订阅
pubSub.subscribe('onwork', time => {
  console.log(`上班了：${time}`);
})
pubSub.subscribe('offwork', time => {
  console.log(`下班了：${time}`);
})
pubSub.subscribe('launch', time => {
  console.log(`吃饭了：${time}`);
})

// 发布
pubSub.publish('offwork', '18:00:00'); 
pubSub.publish('launch', '12:00:00');

// 取消订阅
pubSub.unSubscribe('onwork');
```

发布订阅模式中，订阅者各自实现不同的逻辑，且只接收自己对应的事件通知。实现你想要的 “不一样”。

#### 3. 发布订阅发布的应用

##### DOM 事件监听也是 “发布订阅模式” 的应用：

```js
let loginBtn = document.getElementById('#loginBtn');

// 监听回调函数（指定事件）
function notifyClick() {
    console.log('我被点击了');
}

// 添加事件监听
loginBtn.addEventListener('click', notifyClick);
// 触发点击, 事件中心派发指定事件
loginBtn.click();             

// 取消事件监听
loginBtn.removeEventListener('click', notifyClick);
复制代码
```

发布订阅的通知顺序：

1. 先订阅后发布时才通知（常规）
2. 订阅后可获取过往以后的发布通知 （QQ离线消息，上线后获取之前的信息）

##### 流行库的应用：

* jQuery 的 `on` 和 `trigger`，`$.callback()`;

* Vue 的双向数据绑定;

* Vue 的父子组件通信 `$on/$emit`

##### jQuery 的 $.Callback()：

jQuery 的 $.Callback() 更像是观察者模式的应用，不能更细粒度管控。

```js
function notifyHim(value) {
 console.log('He say ' + value);
}

function notifyHer(value) {
 console.log('She say ' + value);
}

$cb = $.Callbacks();    // 声明一个回调容器：订阅列表 

$cb.add(notifyHim);     // 向回调列表添加回调：订阅
$cb.add(notifyHer);     // 向回调列表添加回调：订阅

$cb.fire('help');       // 调用所有回调： 发布
```

## <span id="jump10">（十）命令模式</span>

#### 1. 什么是命令模式？

命令模式：请求以命令的形式包裹在对象中，并传给调用对象。调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象，该对象执行命令。

例子：客户下单，订单记录了客户购买的产品，仓库根据订单给客户备货。

#### 2. 命令模式的特点

命令模式由三种角色构成：

* 发布者 `invoker`（发出命令，调用命令对象，不知道如何执行与谁执行）；
* 接收者 `receiver` (提供对应接口处理请求，不知道谁发起请求）；
* 命令对象 `command`（接收命令，调用接收者对应接口处理发布者的请求）。

![1585012888355](C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1585012888355.png)

发布者 `invoker` 和接收者 `receiver` 各自独立，将请求封装成命令对象 `command` ，请求的具体执行由命令对象 `command` 调用接收者 `receiver` 对应接口执行。

命令对象 `command` 充当发布者 `invoker` 与接收者 `receiver` 之间的连接桥梁（中间对象介入）。实现发布者与接收之间的解耦，对比过程化请求调用，命令对象 `command` 拥有更长的生命周期，接收者 `receiver` 属性方法被封装在命令对象 `command` 属性中，使得程序执行时可任意时刻调用接收者对象 `receiver` 。因此 `command` 可对请求进行进一步管控处理，如实现延时、预定、排队、撤销等功能。

#### 3. 命令模式的实现

```js
class Receiver {  // 接收者类
  execute() {
    console.log('接收者执行请求');
  }
}

class Command {   // 命令对象类
  constructor(receiver) {
    this.receiver = receiver;
  }
  execute () {    // 调用接收者对应接口执行
    console.log('命令对象->接收者->对应接口执行');
    this.receiver.execute();
  }
}

class Invoker {   // 发布者类
  constructor(command) {
    this.command = command;
  }
  invoke() {      // 发布请求，调用命令对象
    console.log('发布者发布请求');
    this.command.execute();
  }
}

const warehouse = new Receiver();       // 仓库
const order = new Command(warehouse);   // 订单
const client = new Invoker(order);      // 客户
client.invoke();

/*
输出：
  发布者发布请求
  命令对象->接收者->对应接口执行
  接收者执行请求
*/
```

#### 4. 命令模式应用场景

有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。需要一种松耦合的方式来设计程序，使得发送者和接收者能够消除彼此之间的耦合关系。

* 不关注执行者，不关注执行过程；

* 只要结果，支持撤销请求、延后处理、日志记录等。

#### 5. 命令模式的优缺点

**优点：**

* 发布者与接收者实现解耦；
* 可扩展命令，对请求可进行排队或日志记录。（支持撤销，队列，宏命令等功能）。

**缺点：**

* 额外增加命令对象，非直接调用，存在一定开销。

**学习并摘自：**

[JavaScript设计模式（七）：命令模式](https://juejin.im/post/5d2ad5eb6fb9a07f0b03f0ea)

## <span id="jump11">（十一）组合模式</span>

#### 1. 什么是组合模式？

组合模式：又叫 “部分整体” 模式，将对象组合成树形结构，以表示 “部分-整体” 的层次结构。通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性。

**栗子：**文件目录，DOM 文档树

#### 2. 组合模式的特点

* 表示 “部分-整体” 的层次结构，生成 "树叶型" 结构；
* 一致操作性，树叶对象对外接口保存一致（操作与数据结构一致）；
* 自上而下的的请求流向，从树对象传递给叶对象；
* 调用顶层对象，会自行遍历其下的叶对象执行。

![1585013770931](C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1585013770931.png)

#### 3. 组合模式的实现

树对象和叶对象接口统一，树对象增加一个缓存数组，存储叶对象。执行树对象方法时，将请求传递给其下叶对象执行。

```js
// 树对象 - 文件目录
class CFolder {
    constructor(name) {
        this.name = name;
        this.files = [];
    }

    add(file) {
        this.files.push(file);
    }

    scan() {
        for (let file of this.files) {
            file.scan();
        }
    }
}

// 叶对象 - 文件
class CFile {
    constructor(name) {
        this.name = name;
    }

    add(file) {
        throw new Error('文件下面不能再添加文件');
    }

    scan() {
        console.log(`开始扫描文件：${this.name}`);
    }
}

let mediaFolder = new CFolder('娱乐');
let movieFolder = new CFolder('电影');
let musicFolder = new CFolder('音乐');

let file1 = new CFile('钢铁侠.mp4');
let file2 = new CFile('再谈记忆.mp3');
movieFolder.add(file1);
musicFolder.add(file2);
mediaFolder.add(movieFolder);
mediaFolder.add(musicFolder);
mediaFolder.scan();

/* 输出:
开始扫描文件：钢铁侠.mp4
开始扫描文件：再谈记忆.mp3
*/
```

`CFolder` 与 `CFile` 接口保持一致。执行 `scan()` 时，若发现是树对象，则继续遍历其下的叶对象，执行 `scan()`。

#### 4. 组合模式误区规避

* **组合不是继承，树叶对象并不是父子对象**

  组合模式的树型结构是一种 HAS-A（聚合）的关系，而不是 IS-A 。树叶对象能够合作的关键，是它们对外保持统一接口，而不是叶对象继承树对象的属性方法，两者之间不是父子关系。

* **叶对象操作保持一致性**

  叶对象除了与树对象接口一致外，操作也必须保持一致性。一片叶子只能生在一颗树上。调用顶层对象时，每个叶对象只能接收一次请求，一个叶对象不能从属多个树对象。

* **叶对象实现冒泡传递**

  请求传递由树向叶传递，如果想逆转传递过程，需在叶对象中保留对树对象的引用，冒泡传递给树对象处理。

* **不只是简单的子集遍历**

  调用对象的接口方法时，如果该对象是树对象，则会将请求传递给叶对象，由叶对象执行方法，以此类推。不同于迭代器模式，迭代器模式遍历并不会做请求传导。

#### 5. 应用场景

* 优化处理递归或分级数据结构（文件系统 - 目录文件管理）；
* 与其它设计模式联用，如与命令模式联用实现 “宏命令”。

#### 6. 组合模式优缺点

**优点：**

* 忽略组合对象和单个对象的差别，对外一致接口使用；
* 解耦调用者与复杂元素之间的联系，处理方式变得简单。

**缺点：**

* 树叶对象接口一致，无法区分，只有在运行时方可辨别；
* 包裹对象创建太多，额外增加内存负担。

**学习摘自：**

[JavaScript设计模式（八）：组合模式](https://juejin.im/post/5d2d33226fb9a07f070e5e03)

https://www.jianshu.com/p/9c3f55e47399)

## <span id="jump12">（十二）建造者模式</span>

#### 1. 什么是建造者模式？

**建造者模式(Builder)**是将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。

建造者模式的特点是分步构建一个复杂的对象，可以用不同组合或顺序建造出不同意义的对象，通常使用者并不需要知道建造的细节，通常使用**链式调用**来进行建造过程，最后调用`build`方法来生成最终对象。

同样作为创建型的设计模式，需要注意和工厂模式的区别，工厂虽然也是创建对象，但怎样创建无所谓，**工厂模式关注的是创建的结果**；而建造者模式不仅得到了结果，同时也**参与了创建的具体过程**，适合用来创建一个复杂的复合对象。

#### 2. 建造者模式的实现

 **ES6中的建造者模式：**

假设一个出版社的书籍后台录入系统的业务场景，书籍有四个必填信息，分别是：书名，作者，价格，分类；我们希望创建一个书籍对象返回给后端。下面我们来一步一步深入使用ES6的语法结合建造者模式创建对象。

```js
//书籍建造者类
class BookBuilder {
  constructor() {
    this.name = '';
    this.author = '';
    this.price = 0;
    this.category = '';
  }
  
  withName(name) {
    this.name = name;
    return this;
  }

  withAuthor(author) {
    this.author = author;
    return this;
  }

  withPrice(price) {
    this.price = price;
    return this;
  }

  withCategory(category) {
    this.category = category;
    return  this;
  }

  build() {
    return {
      name: this.name,
      author: this.author,
      prices: this.price,
      category: this.category
    }
  }
}

//调用建造者类
const book = new BookBuilder()
  .withName("高效能人士的七个习惯")
  .withAuthor('史蒂芬·柯维')
  .withPrice(51)
  .withCategory('励志')
  .build();
```

上面就通过`BookBuilder`这个创建者类的写法和调用方法，但是仅仅是一个4个属性的对象，我们使用了如此多的代码去创建，这远比直接在`constructor`传递参数创建对象要复杂得多。这是由于在创建的过程中，我们有太多的`withxxxx`方法。我们其实可以自动创建这类`withxxxx`方法以简化代码。

```js
//书籍建造者类
class BookBuilder {
  constructor() {
    this.name = '';
    this.author = '';
    this.price = 0;
    this.category = '';
  
    Object.keys(this).forEach(key => {
      const withName = `with${key.substring(0, 1).toUpperCase()}${key.substring(1)}`;
      this[withName] = value => {
        this[key] = value;
        return this;
      }
    })
  }
  
  //调用建造者
  build() {
    const keysNoWithers = Object.keys(this).filter(key => typeof this[key] !== 'function');

    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key]
      }
    }, {})
  }
}

const book = new BookBuilder()
  .withName("高效能人士的七个习惯")
  .withAuthor('史蒂芬·柯维')
  .withPrice(51)
  .withCategory('励志')
  .build();
```

上面的`BookBuilder`这个类和第一个例子的效果一样，但是长度确减少不少，在有更多属性的时候，减少的代码量会更为明显。我们将所有的建造方法`withxxxx`在`constructor`调用时自动被创建，这里我们使用了一些ES6的新语法：`Object.keys`获取对象属性数组，`...`的合并对象的语法。

虽然该写法在阅读起来会比第一个方法难以理解，但是这样写法的真正作用在于，当我们需要许多的建造者类时，我们可以将上面自动创建`withxxx`和`build`的代码提取为一个父类。在创建其他建造者类时继承该父类，这使得在创建多个建造者类时变得十分容易。

```js
//父类
class BaseBuilder {
  init() {
    Object.keys(this).forEach(key => {
      const withName = `with${key.substring(0, 1).toUpperCase()}${key.substring(1)}`;
      this[withName] = value => {
        this[key] = value;
        return this;
      }
    })
  }

  build() {
    const keysNoWithers = Object.keys(this).filter(key => typeof this[key] !== 'function');

    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key]
      }
    }, {})
  }
}

//子类1: 书籍建造者类
class BookBuilder extends BaseBuilder {
  constructor() {
    super();

    this.name = '';
    this.author = '';
    this.price = 0;
    this.category = '';
    
    super.init();
  }
}

//子类2: 印刷厂建造者类
class printHouseBuilder extends BaseBuilder {
  constructor() {
    super();

    this.name = '';
    this.location = '';
    this.quality = '';

    super.init();
  }
}

//调用书籍建造者类
const book = new BookBuilder()
  .withName("高效能人士的七个习惯")
  .withAuthor('史蒂芬·柯维')
  .withPrice(51)
  .withCategory('励志')
  .build();


//调用印刷厂建造类
const printHouse = new printHouseBuilder()
  .withName('新华印刷厂')
  .withLocation('北京海淀区')
  .withQuality('A')
  .build();
```

建造者模式的使用有且只适合创建极为复杂的对象。在前端的实际业务中，在没有这类极为复杂的对象的创建时，还是应该直接使用对象字面或工厂模式等方式创建对象。

**学习摘于：**

[从ES6重新认识JavaScript设计模式(三): 建造者模式](https://www.jianshu.com/p/be61fcc47a2f)



**以上内容为零碎资料和以下好文的学习笔记**：

[ES6设计模式](https://www.jianshu.com/nb/23500380)

[以乐为名的专栏](https://juejin.im/user/597950e0f265da3e292a3e46/posts)

[JavaScript中常见的十五种设计模式](https://www.cnblogs.com/imwtr/p/9451129.html)

[深入理解JavaScript系列](https://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)























































