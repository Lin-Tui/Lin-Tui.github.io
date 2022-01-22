---
title: EventBus实现
tags:
- JavaScript
category:
- JavaScript学习笔记
---
## 实现：

```js

class MyEventBus{
	constructor() {
		this.eventQueue = {}
	}
	on(eventName, callback) {  //订阅
		if (!this.eventQueue[eventName]) {
			this.eventQueue[eventName] = []
		}
		this.eventQueue[eventName].push(callback)
	}
	once(eventName, callback) {
        let wrap = (...argus) => {
            callback.apply(this, argus)
            this.off(eventName, wrap)
        }
        this.on(eventName,wrap)
	}
	emit(eventName, ...argus) {  //发布
       if(this.eventQueue[eventName]) {
	        for(let callback of this.eventQueue[eventName]){
	             callback(...argus);
	     	}       	
	     }
	}
	off(eventName, callback) {
        let cbList = this.eventQueue[eventName];
		if(cbList) {
            if(callback) {
                cbList.forEach((item, index) => {
                    if (item == callback) cbList.splice(index, 1)
                })
            } else {
                cbList.length = 0;
            }
		}
	}
}
```

#### **测试**：

```js
const EventBus = new MyEventBus()

//订阅消息
EventBus.once('first-event', function(msg) {
    alert(`订阅的消息是：${msg}`);
});

// 发送消息
EventBus.emit('first-event', "123")
EventBus.emit('first-event', "456")

// 移除消息
EventBus.off('first-event')
```

