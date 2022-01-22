---
title: Storage封装
date: 1584521808287.9648
tags:
- Vue项目实战
category:
- Vue项目实战:从零独立开发企业级电商系统
---
# Storage封装

**封装Storage的原因：**

* Storage本身有API，但是只是简单的key/value，不能存储更复杂的形式。
* Storage只存储字符串，需要人工转换成json对象
* Storage只能一次性清空，不能单个清空

**封装方法**：

* 希望的session storage数据格式是：

![1584789505772](C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584789505772.png)

* 在源代码src文件夹下新建storage文件夹，storage里新建index.js文件，index.js中的内容：

```js
const STORAGE_KEY = 'mall';
export default{
    getStorge() {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    },
    getItem(key, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            if (val) {
                return val[key]
            }
        }
        return this.getStorge()[key]
    },
    setItem(key, value, module_name) {
        if (module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name,val)
        } else {
            let val = this.getStorge();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
        }

    },
    clear(key, module_name) {
        let val = this.getStorge();
        if (module_name) {
            if (!val[module_name]) return;
            delete val[module_name][key]
        } else {
            delete val[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
}
```

