---
title: JavaScript深入之执行上下文
date: 1581318855142.1252
tags:
- JavaScript
category:
- JavaScript学习笔记
---
# JavaScript深入之执行上下文(举例说明)

```
var scope = "global scope"; 
function checkscope(){     
	var scope = "local scope";     
	function f(){        
		return scope;     
		}     
		return f(); 
	} 
checkscope();
```

执行过程如下：

1. 执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈

```
    ECStack = [
        globalContext
    ];复制代码
```

2. 全局上下文初始化

```
    globalContext = {
        VO: [global, scope, checkscope],
        Scope: [globalContext.VO],
        this: globalContext.VO
    }复制代码
```

2. 初始化的同时，checkscope 函数被创建，保存作用域链到函数的内部属性[[scope]]

```
    checkscope.[[scope]] = [
      globalContext.VO
    ];复制代码
```

3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

```
    ECStack = [
        checkscopeContext,
        globalContext
    ];复制代码
```

4. checkscope 函数执行上下文初始化：
   1. 复制函数 [[scope]] 属性创建作用域链，
   2. 用 arguments 创建活动对象，
   3. 初始化活动对象，即加入形参、函数声明、变量声明，
   4. 将活动对象压入 checkscope 作用域链顶端。

同时 f 函数被创建，保存作用域链到 f 函数的内部属性[[scope]]

```
    checkscopeContext = {
        AO: {
            arguments: {
                length: 0
            },
            scope: undefined,
            f: reference to function f(){}
        },
        Scope: [AO, globalContext.VO],
        this: undefined
    }复制代码
```

5. 执行 f 函数，创建 f 函数执行上下文，f 函数执行上下文被压入执行上下文栈

```
    ECStack = [
        fContext,
        checkscopeContext,
        globalContext
    ];复制代码
```

6. f 函数执行上下文初始化, 以下跟第 4 步相同：
   1. 复制函数 [[scope]] 属性创建作用域链
   2. 用 arguments 创建活动对象
   3. 初始化活动对象，即加入形参、函数声明、变量声明
   4. 将活动对象压入 f 作用域链顶端

```
    fContext = {
        AO: {
            arguments: {
                length: 0
            }
        },
        Scope: [AO, checkscopeContext.AO, globalContext.VO],
        this: undefined
    }复制代码
```

7. f 函数执行，沿着作用域链查找 scope 值，返回 scope 值

8. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

```
    ECStack = [
        checkscopeContext,
        globalContext
    ];复制代码
```

9. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出

```
    ECStack = [
        globalContext
    ];
```

