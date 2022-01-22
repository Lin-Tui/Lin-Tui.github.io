---
title: 登录页面实现与Vuex集成
date: 1585478770743.4436
tags:
- Vue项目实战
category:
- Vue项目实战:从零独立开发企业级电商系统
---
## 目录

#### [1. 登录页面](#jumpa)

* [**登录功能**](#jump1)
* [**拉取用户信息**](#jump2)

#### [**2. Vuex集成**](#jumpb)

* [**Vuex框架搭建**](#jump3)

* [**Vuex存储读取数据**](#jump4)
* [**解决vuex页面数据延迟**](#jump5)

## <span id="jumpa">登录页面</span>

#### <span id="jump1">（1）登录功能</span>

```html
<template>
	<div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>   
	</div>
</template>
<script>
export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:'',
      userId:''
    }
  },
  methods:{
      login() {
          let {username, password} = this;
          this.axios.post('/user/login', {
               username,
               password
          }).then((res) => {
              this.$cookie.set('userId', res.id, {expires:'1M'});
              //to-do保存用户名
              this.$router.push('/index')
          })
      },
      register() {
          this.axios.post('/user/register', {
              username:'admin',
              password:'admin1',
              email:'admin@163.com'
          }).then(() => {
              alert('注册成功');
          })
      }
  }
}
</script>
```

#### <span id="jump2">（2）拉取用户信息</span>

在App.vue中：

```html
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//import storage from './storage' 
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
    this.getUser(); 
    this.getCartCount();
  },
  methods: {
    getUser() {
      this.axios.get('/user').then(() => {
        //to-do保存在vuex
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then(() => {
        //to-do 保存在vuex
      })
    }
  }
}
</script>
```

## <span id="jumpb">Vuex集成</span>

#### <span id="jump3">（1）Vuex框架搭建</span>

* 在src文件夹中创建文件夹store，并在store文件夹下创建三个文件，分别是 action.js、index.js、mutations.js。

* 在index.js中：

```js
 import Vue from 'vue'
 import Vuex from 'vuex'
 import mutations from './mutations'
 import actions from './action'
 Vue.use(Vuex);
 const state = {
     username: '',
     cartCount: 0
 }
 export default new Vuex.Store({
     state,
     mutations,
     actions
 })
```

* 在mutations.js中：

```js
export default {   
}
```

* 在action.js中：

```js
export default { 
}
```

* 在main.js中新增：

```js
import store from './store'
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
```

#### <span id="jump4">（2）Vuex存储读取数据</span>

* 在action.js中：

```js
export default {
    saveUserName(context, username) {
        context.commit('saveUserName', username);
    },
    saveCartCount(context, count) {
        context.commit('saveCartCount', count);
    }
}
```

* 在mutations.js中：

```js
export default {
    saveUserName(state, username) {
        state.username = username;
    },
    saveCartCount(state, count) {
        state.cartCount = count;
    }
}
```

* 在login.vue中存储用户信息：

```html
<!--大部分无关无关代码被省略-->
<div class="btn-box">
       <a href="javascript:;" class="btn" @click="login">登录</a>
 </div>
<script>
export default {
 methods:{
	login() {
          let {username, password} = this;
          this.axios.post('/user/login', {
               username,
               password
          }).then((res) => {
              this.$cookie.set('userId', res.id, {expires:'1M'});
              this.$store.dispatch('saveUserName', res.username); //将用户信息存入state中
              this.$router.push('/index')
          })     
	  }
 }
}
</script>
```

* 在NavHeader.vue读取用户信息：

```html
<a href="javascript:;" v-if="username">{{username}}</a>
<script>
export default {
  data() {
    return {
      username: this.$store.state.username,
    };
  }
</script>
```

* 在App.vue中

  由于store里的数据是保存在运行内存中的,当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值。当页面重新加载时，在App.vue中重新存储一次用户信息到state里。

```js
 mounted() {
    this.getUser(); 
  }, 
methods: {
    getUser() {
      this.axios.get('/user').then((res) => {
      this.$store.dispatch('saveUserName', res.username);
      })
    }
  }
```

#### <span id="jump5">（3）解决vuex页面数据延迟</span>

vuex数据更新,页面数据没有跟着刷新？这是由于先通过`this.$store.state.username,`读取到了变量，而此时这个变量还未被存储到state中，所以为空。读取了空变量后才执行了` this.$store.dispatch('saveUserName', res.username);`。

**解决方法之一**：使用计算属性。

将NavHeader.vue中修改为如下：

```html
<a href="javascript:;" v-if="username">{{username}}</a>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {
  username(){
    return this.$store.state.username;
  }
}
</script>
```

















































































