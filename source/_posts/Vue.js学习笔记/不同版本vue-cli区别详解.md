---
title: 不同版本vue-cli区别详解
date: 1587264707288.3413
tags:
- Vue
category:
- Vue学习笔记
---
# 不同版本vue-cli区别详解

## 目录

* #### [vue-cli 命令](#jump1)

* #### [项目结构](#jump2)

* #### [设置环境变量](#jump2)



## <span id="jump1">（一）vue-cli 命令</span>

#### 1. vue-cli下载安装：

* vue-cli2:

  `npm install vue-cli -g`

* vue-cli3/cli4:

  `npm install -g vue@cli`

#### 2. 创建新项目

* vue-cli2:

  `vue init webpack 2.0project`

* vue-cli3/cli4:

  `vue create 3.0project`

  或通过视图创建项目：`vue ui`

#### 3. 启动项目

* vue-cli2:

  `npm run dev`

* vue-cli3/cli4:

  `npm run serve`

## <span id="jump2">（二）项目结构</span>

vue-cli3/cli4中移除了配置文件目录：`config` 和 `build` 文件夹。

同时移除了 `static` 静态文件夹，新增了 `public` 文件夹，将 `index.html` 移动到 `public` 中。

#### 1. vue-cli2

```
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // webpack loader配置
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置,构建开发本地服务器
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|-- src                              // 源码目录
|   |-- components                   // vue公共组件
|   |-- router                       // vue的路由管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcsssrc                      // postcss配置文件
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息,包依赖信息等
```

推荐阅读：

[vue-cli项目结构详解](https://blog.csdn.net/tanzhenyan/article/details/78871610)

#### 2. vue cli3/cli4

```
|-- src                            // 源码目录
|  |-- components                  // vue公共组件
|  |-- router                      // vue的路由管理
|  |-- App.vue                     // 页面入口文件
|  |-- main.js                     // 程序入口文件，加载各种公共组件
|-- public                         // 静态文件，比如一些图片，json数据等
|  |-- favicon.ico                 // 图标文件
|  |-- index.html                  // 入口页面
|-- vue.config.js                  // 是一个可选的配置文件，包含了大部分的vue项目配置
|-- .babelrc                       // ES6语法编译配置
|-- .editorconfig                  // 定义代码格式
|-- .gitignore                     // git上传需要忽略的文件格式
|-- .postcsssrc                    // postcss配置文件
|-- README.md                      // 项目说明
|-- package.json                  // 项目基本信息,包依赖信息等
```

## <span id="jump3">（三）设置环境变量</span>

项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。

不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。

#### 1. vue-cli2:

推荐阅读：

[vue-cli如何添加多种环境变量](https://www.cnblogs.com/sinosaurus/p/10294399.html)

#### 2. vue-cli3：

vue-cli3构建的项目中默认只有development模式和production模式，默认的NODE_ENV分别是development和production，很多配置也只依据NODE_ENV区分这2种模式。

但当我们需要其他模式，如测试模式时，就需要添加相关配置。

详细设置过程，推荐看：

[vue-cli如何添加多种环境变量](https://www.cnblogs.com/sinosaurus/p/10294399.html)

**补充：**

在 .env.[mode] 模式文件中，三个环境变量及其含义：

*  `NODE_ENV`（对应当前模式的名称）
* `VUE_APP_RUNTIME_ENV`（对应当前环境的名称）
* `VUE_APP_BASE_URL`（当前环境向后台发请求的baseurl）

使用环境变量：

只有以 `VUE_APP_` 开头的变量会被 `webpack.DefinePlugin` 静态嵌入到客户端侧的包中。

在js文件或者在vue文件中process.env.{环境变量名}，比如上文定义的VUE_APP_BASE_URL，使用process.env.VUE_APP_BASE_URL即可获取环境变量的值。

在html文件中使用环境变量，采用模板引用指令<%= process.env.process.env.{环境变量名} %>，比如

```html
<script src="xxx.com" app_id="<%= process.env.process.env.MY_APP_ID %>"/>
```

#### 3. vue-cli4

推荐阅读：

[vue cli4-环境变量和模式](https://blog.csdn.net/qq_28988969/article/details/104558991)









