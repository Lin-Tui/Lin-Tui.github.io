---
title: 购物车页面实现与ElementUI集成
date: 1585818278159.0515
tags:
- Vue项目实战
category:
- Vue项目实战:从零独立开发企业级电商系统
---
## 目录

#### [1. 购物车页面](#jumpa)

* [**Order-Header组件**](#jump1)
* [**购物车列表渲染**](#jump2)
* [**购物车全选和非全选**](#jump3)
* [**购物车商品更新和删除**](#jump4)
* [**购物车结算**](#jump5)

#### [2. ElementUI集成](#jumpb)

#### [3. Babel介绍](#jumpc)

## <span id="jumpa">购物车页面</span>

#### <span id="jump1">（1）Order-Header组件</span>

* 在Order-Header.vue中：

```html
<template>
    <div class="order-header">
        <div class="container clearfix">
            <div class="header-logo">
                <a href="/#/index"></a>
            </div>
            <div class="title">
                <h2>{{title}}<slot name="tip"></slot></h2>
            </div>
            <div class="username">
                <a href="javascript:;">{{username}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name:'order-header',
    props: {
        title:String, 
    },
    computed: {
        ...mapState(['username'])
    }
}
</script>
<!--省略样式-->
```

* 在使用该样式的文件中：

```html
        <order-header title="我的购物车">
            <template v-slot:tip>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算。</span>
            </template>    
        </order-header> 
```

#### <span id="jump2">（2）购物车列表渲染</span>

在cart.vue中：

![1585986466180](C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1585986466180.png)

```html
        <div class="cart-box">       
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}"></span>全选</li>
            <li class="col-3">商品 名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
            
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in list" v-bind:key="index">
              <div class="item-check">
                <span class="checkbox" v-bind:class="{'checked':item.productSelected}"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" >+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del"></div>
            </li>
          </ul>   
        </div>
     
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn">去结算</a>
          </div>
        </div>

<script>
export default {
    name: 'cart',
    data() {
        return {
            list: [],
            allChecked: false,
            cartTotalPrice:0,
            checkedNum:0
        }
    },
    mounted() {
        this.getCartList();
    },
    methods: {
        getCartList() {
            this.axois.get('/carts').then((res) => {
                this.list = res.cartProductVoList || [];
                this.allChecked = res.selectedAll;
                this.cartTotalPrice =res.cartTotalPrice;
                this.checkedNum = this.list.filter(item => item.productSelected).length;

            })
        }
    }
}
</script>
```

#### <span id="jump3">（3）购物车全选和非全选</span>

在cart.vue中添加：

```html
 <!--添加click事件在span元素上-->  
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}"  @click="toggleAll"></span>全选</li>
            <li class="col-3">商品 名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
            
<script>
export default {
    data() {
        return {
            list: [],
            allChecked: false,
            cartTotalPrice:0,
            checkedNum:0
        }
    },
    mounted() {
        this.getCartList();
    },
    methods: {
        getCartList() {
            this.axois.get('/carts').then((res) => {
                this.renderData(res);

            })
        },
        toggleAll() {
            let url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectedAll';
            this.axois.put(url).then((res) => {
                this.renderData(res);


            })
        },
         renderData(res) {
             this.list = res.cartProductVoList || [];
             this.allChecked = res.selectedAll;
             this.cartTotalPrice = res.cartTotalPrice;
             this.checkedNum = this.list.filter(item => item.productSelected).length;
         }
    }
}
</script>
```

#### <span id="jump4">（4）购物车商品更新和删除</span>

在cart.vue中添加：

```html
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in list" v-bind:key="index">
              <div class="item-check">
                <span class="checkbox" v-bind:class="{'checked':item.productSelected}"  @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;"  @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul
<script>
export default {
    //在methods中添加两个方法。
    methods: {
        updateCart(item, type) {
            let quantity = item.quantity,
                selected = item.productSelected;
            if (type == '-') {
              if (quantity == 1) {
                alert('商品至少保留一件');
                return;
              }
              -- quantity;
            } else if (type == "+") {
              if (quantity > item.productStock) {
                alert('商品不能超过库存数量');
                return;
              }
              ++ quantity;
            } else {
              selected = !item.productSelected;
            }
            this.axois.put(`/carts/${item.productId}`,{
              quantity,
              selected
            }).then((res) => {
              this.renderData(res)
            })

        },
        delProduct(item) {
          this.axois.delete(`/carts/${item.productId}`).then((res) => {
            this.renderData(res)
          })
        }              
   }
}
</script>
```

#### <span id="jump5">（5）购物车结算</span>

在cart.vue中添加：

```html
<a href="javascript:;" class="btn" @click="order">去结算</a>
<script>
export default {
    //在methods中添加两个方法。
    methods: {
        //购物车下单
        order() {
          let isCheck = this.list.every( item => !item.productSelected);
          if (isCheck) {
            alert('请选择一件商品')
          } else {
            this.$router.push('/order/confirm');
          }
        }
    }
}
</script>
```

## <span id="jumpb"> ElementUI集成</span>

* 安装ElementUI与balel-plugin-component:

  `npm  i element-ui babel-plugin-component --save-dev`

* 安装@babel/preset-env:

  `npm i @babel/preset-env -D`

* 在项目根目录下创建文件.babelrc，并添加配置：

```js
{
    "presets": [["@babel/preset-env", {"modules": false}]],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

下面以使用ElementUI中的Message插件为例：

由于Message是一个插件，插件有两种使用方式。

**第1种是在使用到的文件中导入。如：**

* 在main.js中引入ElementUI并使用：

```js
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
      if (path != '#/index') {
        window.location.href = '/#/login';
        
      } 
      return Promise.reject(res);
  } else {
    Message.warning(res.msg);  //使用ElementUI
    return Promise.reject(res);
  }
})
```

* 在cart.vue中使用：

```html
<script>
import {Message} from 'element-ui'
//购物车下单
        order() {
          let isCheck = this.list.every( item => !item.productSelected);
          if (isCheck) {
            Message.warning('请选择一件商品')
          } else {
            this.$router.push('/order/confirm');
          }
        }
</script>
```

**第2中是通过prototype将其扩展到Vue原型上，通过this调用。如：**

* 在main.js中引入ElementUI并使用：

```js
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$message = Message;

axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
      if (path != '#/index') {
        window.location.href = '/#/login';
        
      } 
      return Promise.reject(res);
  } else {
    this.$message.warning(res.msg);  //使用ElementUI
    return Promise.reject(res);
  }
})
```

* 在cart.vue中使用：

```html
<script>
//购物车下单
        order() {
          let isCheck = this.list.every( item => !item.productSelected);
          if (isCheck) {
            this.$message.warning('请选择一件商品')
          } else {
            this.$router.push('/order/confirm');
          }
        }
</script>
```

## <span id="jumpc"> Babel介绍</span>

**Babel 是一个JavaScript编译器**

Babel是一个工具链，主要用于将ECMAScript2015+版本的代码转换为向后兼容的JavaScript语法，以便能够运行在当前和就版本的浏览器或其他环境中。

* 将文件.babelrc合并到babel.config.js，并删除该文件：

```
{
    "presets": [["@babel/preset-env", {"modules": false}]],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

* 在babel.config.js中：

```js
module.exports = {
  "presets": [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
    ]
]
}
```































































