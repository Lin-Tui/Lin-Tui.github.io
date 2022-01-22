---
title: JS 常见的链表操作
date: 1584887683583.0022
tags:
- 数据结构与算法
category:
- 数据结构与算法学习笔记
---
# JS 常见的链表操作

## 目录

#### 1.[ **单链表反转**](#jumpa)

#### 2.[ **链表中环的检测 相关问题**](#jumpb)

* [**判断是否有环**](#jump1)
* [**找出环的入口点**](#jump2)
* [**找出环上结点的个数**](#jump3)
* [**求出链表的长度**](#jump4)
* [**求出环上距离任意一个结点最远的结点**](#jump5)
* [**求出链表的长度**](#jump6)
* [**如果相交，求出第一个相交结点。**](#jump7)

#### 3. [**两个有序的链表合并**](#jumpc)

#### 4. [**删除链表倒数第 n 个结点**](#jumpd)

#### 5.[ **求链表的中间结点**](#jumpe)

## <span id="jumpa">1. 单链表反转</span>

```js
// 判断对象是否为空
function isEmptyObject(obj) {
  for (var name in obj) {
  return false;
}
  return true;
} 

function ReverseList(pHead) {
    if (isEmptyObject(pHead)) {
        return false;
    }
    var pre = pHead;
    var PreNext = null;
    while (pre.next != null) {
        preNext = pre.next;
        pre.next = preNext.next;
        preNext.next = pHead;
        pHead = preNext;
    }
    return pHead;
}
```
反转链表的思路：1-2-3-4-5，先将2换到第一个，变为：2-1-3-4-5。然后将3换到第一个，3-2-1-4-5。
以此类推。其中，pre始终指向1，preNext指向pre的下一个，即本轮需要换到第一个的数。
如此列表：
1-2-3-4-5
2-1-3-4-5
3-2-1-4-5
4-3-2-1-5
5-4-3-2-1
## <span id="jumpb">2. 链表中环的检测 相关问题</span>

关于链表中环的检测，相关问题一般有如下几种：

- 给定一个单链表，判断其中是否有环的存在
- 如果存在环，找.出环的入口点
- 如果存在环，找出环上结点的个数
- 如果存在环，求出链表的长度
- 如果存在环，求出环上距离任意一个结点最远的结点（环的对面结点问题）
- 判断两个无环链表是否相交
- 如果相交，求出第一个相交结点

针对如上七种问题，下面逐一进行分析并写出相应实现代码。

#### <span id="jump1">（1）判断是否有环</span>

**问题分析：**

对于这个问题，有一种非常巧妙的“快慢指针”的方法，就是定义两个指针：fast和slow，最初的时候fast和slow都指向链表的初始结点head，然后每一次操作，fast向前走两步，slow向前走一步。
因为fast比slow移动快，如果有环，那么fast一定会先进入环，而slow后进入环。当两个指针都进入环后，经过一定次数的操作，fast和slow最终会在环上相遇，并且一定是在slow绕环走完一圈之前相遇。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-tFNpgL9b-1584968051925)(C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584887806278.png)\]](https://img-blog.csdnimg.cn/20200323205459293.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

如图所示，slow进入环时，fast可能处于图示状态，然后每次操作，slow会向前走一步，而fast会向前追两步。因此每次操作完fast到slow的距离都会缩短一步，5、4、3、2、1...直到相遇。
又因为同一个环中，slow和fast的距离不可能大于环的总长度，所以fast和slow一定会在slow走完一圈之前相遇。
特殊情况：开始时，slow和fast就在环的入口处，这样相遇时，slow刚好走完一圈。

**实现代码：**

```js
function isExitLoop(head) {
    if (head === null || head.next === null) {
        return false;
    }
    let slow = head;
    let fast = head;
    while (slow !== null && fast !== null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}
```

#### <span id="jump2">（2）找出环的入口点</span>
![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-aejQ4UX5-1584968051935)(C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584888602980.png)\]](https://img-blog.csdnimg.cn/20200323205516504.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

**问题分析：**

如果链表有环，则在slow绕环走完一圈之前，一定会和fast相遇。
我们假设相遇时slow走了s个结点，则fast走了2s个结点。
设环的长度为r，相遇时fast已绕环走了 n 圈(n>=1)，可得等式：
2s = s + n *r 简化得 => s = n* r
又设head与环的入口点距离为 a ，入口点与相遇点的距离为 x ，根据slow的总路径为s可得：
s = a + x
结合上式：a + x = n *r 变形 => a + x = ( n - 1 )* r + r
设链表总长度为L，则：r = L - a ，带入上式，得：a = ( n - 1 ) * r + ( L - a - x )
好了，注意看图，L - a - x 的长度就是从相遇点到环入口点的长度，也就是说，如果我们放置两个指针p1和p2，分别从起始点和相遇点出发，那么在p2绕环 ( n - 1 ) 圈后，最终一定会在环的入口点和p1相遇。
这样，我们就得到了环的入口点。

**代码实现：**

```js
function findLoopPort(head) {
    if (head === null || head.next === null) {
        return false;
    }
    let show = head;
    let fast = head;
    //找到相遇点
    while (slow !== null && fast !== null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    if(fast == null || fast.next == null) return null;
    slow = head;//slow指向开头，fast指在相遇点
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```

#### <span id="jump3">（3）找出环上结点的个数</span>

**问题分析：**

对于这个问题，有两种常见的解决方法：

- 在slow和fast相遇后，让其中一个继续向前走，下次相遇时，所经过的结点，就是环上的结点个数。
- 在slow和fast相遇后，让slow和fast同时继续向前走，下次相遇时，所经过的结点，就是环上的结点个数。

稍微解释一下第二种方法，因为slow和fast的速度不同，同时出发后，两指针最大距离为环的总长度r，然后每次操作距离都会缩短一位，最终一定会再次相遇。再次相遇时，正好操作r次，也正好经过r个结点。

**方法1实现代码：**

```js
function findLoopPort(head) {
    if (head === null || head.next === null) {
        return false;
    }
    let show = head;
    let fast = head;
    //找到相遇点
    while (slow !== null && fast !== null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    if(fast == null || fast.next == null) return null;
    let count = 0;
    while(slow != fast) {
        count ++;
        slow = slow.next;
    }
    return count;
}
```

#### <span id="jump4">（4）求出链表的长度</span>

**问题分析：**

链表长度L = 起点到入口点的距离 + 环的长度r ;
在前面的基础上，我们可以很轻松的得到这个题目的解。

**代码实现：**

```js
function findLoopPort(head) {
	if (head === null || head.next === null) {
		return fasle;
	}
	let slow = head;
	let fast = head;
	while (fast !== null && fast.next != null) {
		slow = slow.next;
		fast = fast.next.next;
		if (slow == fast) break;
	}
	if(fast == null || fast.next == null) return null;
	let len = 1; //放环的长度
	let temp = fast;//暂时存放相遇点
//下面先求出起点到入口点的距离
	slow = head; 
	while(slow != fast) {
		len ++;
		slow = slow.next;
		fast = fast.next.next;
	}
//下面在求完起点到入口点的距离的基础上，加上环的长度，等于链表长度
	slow = temp;
	fast = temp;
	while(slow != fast) {
		len ++;
		slow = slow.next;
	}
	return len;
	
}
```

#### <span id="jump5">（5）求出环上距离任意一个结点最远的结点（环的对面结点问题）</span>

**问题分析：**

如图所示，结点1和结点4，结点2和结点5，结点3和结点6分别互为“对面结点”，也就是环上距离最远的结点。
我们依然可以使用“快慢指针”的思想来解决这道题，定义一个每次移动两个结点的指针fast和每次移动一个结点的指针slow，两指针同时在问题结点出发，当fast或者fast->next再次回到问题结点时，slow所指向的结点就是问题结点的“对面结点”。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-LTN90Rzb-1584968051941)(C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584889823245.png)\]](https://img-blog.csdnimg.cn/20200323205600806.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

**代码实现：**

```js
function findFacePort(prt) {
    let slow = prt;
    let fast = prt;
    do {
        slow = slow.next;
        fast = fast.next.next;
    } while(fast != prt && fast != prt.next);
    return slow;
}
```

#### <span id="jump6">（6）判断两个无环链表是否相交</span>

**问题分析：**

对于判断两个无环链表是否相交类的问题，看起来无从下手，但其实只需要转换一下思路就豁然开朗了。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-JzxKm1cP-1584968051947)(C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584889861120.png)\]](https://img-blog.csdnimg.cn/20200323205617566.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

如图所示，存在ListA和ListB两个无环相交链表，我们只需要将ListA的首尾相连，这样就变成我们熟悉的判断是否有环的问题了。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-45puncNi-1584968051954)(C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1584889876496.png)\]](https://img-blog.csdnimg.cn/20200323205631916.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

#### <span id="jump7">(7)如果相交，求出第一个相交结点。</span>

同理，可转化为求环的相交点的问题。

**学习参考于：**

[链表专项练习题二 | 链表中环的检测 相关问题总结](http://www.chinacion.cn/article/4598.html)

## <span id="jumpc">3. 两个有序的链表合并</span>

```js
class ListNode() {
    constructor(val) {
        this.val = val;
        this.next = null
    }
}

var mergeLists = function(list1, list2) {
    var list3 = new ListNode(0);
    var c = list3;
    while(list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            c.next = list1;
            list1 = list1.next;
        } else {
            c.next= list2;
            list2 = list2.next;
        }
        c = c.next;
    }
    c.next = (list1 == null) ? list2 : list1;
    return list3.next
}
```

## <span id="jump4">4. 删除链表倒数第 n 个结点</span>

这道题要用双指针来实现。先用first指针前进n，然后让second从head开始和first一起前进，直到first到了末尾，此时second的下一个节点就是要删除的节点。（另外，若first一开始前进n就已经不在链表中了，说明要删除的节点正是head节点，那么直接返回head的下一个节点接口。）

```js
function removeNode(head, n) {
    if (!head || k <=0) {
        return null;
    }
    let first = head;
    let second = head;
    while(--k) {
        if(first.next != null) first = first.next;
        else return null;
    }
    while(first.next != null){
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return head;
};
```

## <span id="jump5">5. 求链表的中间结点</span>

```js
var middleNode = function(head) {
    var fast = head,
        slow = head;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
};
```