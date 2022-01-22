---
title: props-model-vuex
date: 1584248174811.8638
tags:
- Vue
category:
- Vue学习笔记
---
### props使用：

不推荐使用数组的方式，对系统后续维护不利。

```
props:['name', 'type', 'list', 'isVisible']
```

推荐以下写法：

```js
props: {
	name: String,
	type: {
		validator: function(value) {
//这个值必须匹配下列字符串的一个
				return ["success", "warning", "danger"].includes(value);
		}
	},
    list: {
        type:Array,
//对象或数组默认值必须从一个工厂函数获取
            default: () => []
    }，
    isVisible: {
        type:Boolean,
            default:false
    },
    onChange: {
        type:Function,
            default: () => {}
    } 
}
```

### v-model语法糖实现

index.vue中：

```html
<template>
	<div>
    	<PersonalInfo v-model="phoneInfo"/>
//v-model方式和下列方式等效
        <PersonInfo
			:phone-info="phoneInfo"
			@change="val => (phoneInfo = val)"
		/>
         phoneInfo:{{phoneInfo}}
    </div>
</template>
<script>
import PersonalInfo from "./PersonalInfo";
export default {
    components: {
        PersonalInfo
    },
    data() {
        return {
            phoneInfo: {
                areaCode: "+86",
                phone:""
            }
        };
    }
}
</script>
```

personalInfo.vue文件：

```html
<template>
	<div>
	<input
           :value="phoneInfo.phone"
           type="number"
           placeholder="手机号"
           @input="handlePhoneChange"
     />                                    
	</div>
</template>
<script>
export default {
    name: "PersonalInfo",
    model: {
        prop:"phoneInfo",
        event:"change"
    },
    props: {
        phoneInfo:Object
    },
    methods: {
        handleAreaCodeChange(e) {
            this.$emit("change", {
                ...this.phoneInfo,
                areaCode:e.target.value
            });
        },
        handlePhoneChange(e) {
            this.$emit("change", {
                ...this.phoneInfo,
                phone:e.target.value
            });
        }
    }
}
</script>
```



### min-Vuex实现

在min-vuex.js中：

```js
import Vue from 'vue';
const Store = function Store (options = {}) {
	const {state = {}, mutations = {}} = options;
	this._vm = new Vue({
		data: {
			$$state: state//通过把state放入new Vue({})的data选项里，使state变成响应式数据
		},
	})
	this._mutations = mutations;
}

Store.prototype.commit = function(type, payload) {
	if(this._mutations[type]) {
		this._mutations[type](this.state, payload)
	}
}

Object.defineProperties(Store.prototype, {
	state: {
		get: function() {
			return this._vm._data.$$state;
		}
	}
});

export default {Store}
```

在main.js中：

```js
import Vue from 'vue';
import Vuex from './min-vuex';
import App from './App.vue';
Vue.use(Vuex);
Vue.config.productionTip = false;
const store = new Vuex.Store({
    state: {
        count:0,
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
})
Vue.prototype.$store = store;
new Vue({
    render: h => h(App),
}).$mount('#app')
```

App.vue中：

```html
<template>
<div id="app">
	{{count}}
    <button @click="$store.commit('increment')">count++</button>
</div>
</template>
<script>
export default {
    name:'app',
    computed:{
        count() {
            return this.
        }
    }
}
</script>
```





















