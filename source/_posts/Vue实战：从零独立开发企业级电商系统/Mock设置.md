---
title: Mock设置
date: 1584879517693.3704
tags:
- Vue项目实战
category:
- Vue项目实战:从零独立开发企业级电商系统
---
# Mock设置 

**作用：**

- 开发阶段，为了高效率，需要提前Mock
- 减少代码冗余，灵活插拔
- 减少沟通，减少接口联调时间

#### mock设置三种方式：

- 本地创建json
- 集成Mock API
- easy-mock平台

**（1）本地加载请求静态json文件**：

- 在public下创建文件夹mock，mock里创建文件夹user,user里添加文件login.json:

```json
{
    "status": 0,
    "data": {
        "id": 12,
        "username": "admin",
        "email": "...",
        "phone": null,
        "role": 0,
        "createTime": 123,
        "updataTime":456
    }
}
```

- 在App.vue中：

```js
export default {
  name: 'App',
  components: {
  },
  data() {
    return { 
      res: {}
    }
  },
  mounted() {
   this.axios.get('/mock/user/login.json').then((res) => {
     this.res = res
   }) 
  }
}
```

- 在main.js中将以下注释掉内容：

```js
//import env from './env'
//axios.defaults.baseURL = '/api';
//axios.default.baseURL = env.baseURL;
```

这种方式虽然简单，但是请求的地址并不是真正的地址，但接口联调对接时，就需要改代码。

**（2）本地集成mock.js实现数据mock：**

- 先安装mock.js

`npm i mockjs --save-dev`

- 安装完，在main.js中加入:

```js
//mock开关
const mock = true;
if (mock) {
    require('./mock/api')
}
axios.defaults.baseURL = '/api';

```

- 在src文件夹建一个mock文件夹，在改文件夹中新建api.js文件：

```js
import Mock from 'mockjs'
Mock.mock('/api/user/login', {
    "status": 0,
    "data": {
        "id": 12,
        "username": "admin",
        "email": "...",
        "phone": null,
        "role": 0,
        "createTime": 123,
        "updataTime":456
    }
})
```

- 在App.vue中，修改：

```js
export default {
  name: 'App',
  components: {
  },
  data() {
    return { 
      res: {}
    }
  },
  mounted() {
   this.axios.get('/user/login').then((res) => {
     this.res = res
   }) 
  }
}
```

**（3）easy-mock平台**

- 在Easy Mock官网上创建好项目。（创建过程中将 项目基础URL可随便取）

- 在main.js中修改：

```js
//mock开关
const mock = false;
if (mock) {
    require('./mock/api')
}
axios.defaults.baseURL = '...为Easy Mock上生成的base URL地址';
```

- 在Easy Mock官网创建接口，URL和数据都设置为自己需要的。















