---
title: HTTP
date: 1588172262508.0415
tags:
- 计算机网络
category:
- 计算机网络
---
## 目录
#### [**1. HTTP原理**](#jump1)

- [**概念**](jump1)

- [**HTTP过程**](#jumpa)
- [**特点**](#jumpb)

#### [**2. HTTP请求报文**](#jump2)

- [**请求报文结构**](#jumpc)

- [**请求行**（请求方法、URL、协议版本）](#jumpd)
  - [**请求方法**](#jumpd)
  - [**URL**](#jumpabc)
  - [**协议版本**](#jump5)
- [**请求头**](#jumpe)
- **请求体**

#### [**3. HTTP响应报文**](#jump3)

- [**响应报文结构**](#jumpf)

- [**响应行**（版本协议、状态码及状态描述）](#jumpg)
  - [**状态码及状态描述**](#jumpg)
- [**响应头**](#jumph)
- **响应体**

#### [**4. HTTP缓存（浏览器缓存机制）**](#jump4)

- [**强缓存**](https://blog.csdn.net/jutal_ljt/article/details/80021545)
- [**协商缓存**](https://blog.csdn.net/jutal_ljt/article/details/80021545)

#### [**5. 不同版本HTTP**](#jump5)

- [**HTTP 0.9**](#jumpi)

- [**HTTP 1.0**](#jumpj)
- [**HTTP 1.1**](#jumpk)
- [**HTTP 2.0**](#jumpl)

# <span id="jump1">**（一）HTTP原理**</span>

**这部分学习并参考于**：[HTTP协议超级详解](https://www.cnblogs.com/an-wen/p/11180076.html)

超文本传输协议（英文：**H**yper**T**ext **T**ransfer **P**rotocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议。HTTP是万维网的数据通信的基础。

HTTP是一个客户端终端（用户）和服务器端（网站）请求和应答的标准（TCP）。

http协议是基于TCP/IP协议之上的应用层协议。

### <span id="jumpa">**1. HTTP 请求/响应的步骤**：</span>

HTTP协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求行（请求的方法、URL、协议版本）、请求头部和请求数据。服务器以一个状态行作为响应，响应的内容包括响应行（协议的版本、状态码、状态信息）、响应头部和响应数据。

- 客户端连接到Web服务器

  一个HTTP客户端，通常是浏览器，与Web服务器的HTTP端口（默认为80）建立一个TCP套接字连接。

- 发送HTTP请求

  通过TCP套接字，客户端向Web服务器发送一个文本的请求报文，一个请求报文由请求行、请求头部、空行和请求数据4部分组成。

- 服务器接受请求并返回HTTP响应

  Web服务器解析请求，定位请求资源。服务器将资源复本写到TCP套接字，由客户端读取。一个响应由状态行、响应头部、空行和响应数据4部分组成。

- 释放连接TCP连接

  若connection 模式为close，则服务器主动关闭TCP连接，客户端被动关闭连接，释放TCP连接;若connection 模式为keepalive，则该连接会保持一段时间，在该时间内可以继续接收请求;

- 客户端浏览器解析HTML内容

### <span id="jumpb">**2. HTTP特点**：</span>

- **基于TCP/IP协议之上的应用层协议。**

- **基于 请求-响应 的模式**

  HTTP协议规定,请求从客户端发出,最后服务器端响应该请求并 返回。换句话说,肯定是先从客户端开始建立通信的,服务器端在没有 接收到请求之前不会发送响应

- **无状态保存**

  HTTP是一种不保存状态,即无状态(stateless)协议。HTTP协议 自身不对请求和响应之间的通信状态进行保存。也就是说在HTTP这个 级别,协议对于发送过的请求或响应都不做持久化处理。协议本身并不保留之前一切的请求或响应报文的信息。这是为了更快地处理大量事务,确保协议的可伸缩性,而特意把HTTP协议设计成 如此简单的。

- **无连接**

  无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间，并且可以提高并发性能，不能和每个用户建立长久的连接，请求一次相应一次，服务端和客户端就中断了。

  但是无连接有两种方式，早期的http协议是一个请求一个响应之后，直接就断开了，但是现在的http协议1.1版本不是直接就断开了，而是等几秒钟，这几秒钟是等什么呢，等着用户有后续的操作，如果用户在这几秒钟之内有新的请求，那么还是通过之前的连接通道来收发消息，如果过了这几秒钟用户没有发送新的请求，那么就会断开连接，这样可以提高效率，减少短时间内建立连接的次数，因为建立连接也是耗时的，默认的好像是3秒中现在，但是这个时间是可以通过咱们后端的代码来调整的，自己网站根据自己网站用户的行为来分析统计出一个最优的等待时间。

[HTTP请求行、请求头、请求体详解](https://www.cnblogs.com/an-wen/p/11180076.html)

# <span id="jump2">**（二）HTTP请求报文**</span>

### <span id="jumpc">**1. 请求报文结构**</span>

请求报文由**请求行**（请求方法、URL、协议版本）、**请求头**部和**请求体**（请求数据）组成。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430200238746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


下面是一个实际的请求报文：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430200224751.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

下面分别展开说明请求行、请求头、请求体。

### <span id="jumpd">**2. 请求行**</span>

请求行由三部分组成：**请求方法**，**请求URL**（不包括域名），**HTTP协议版本**

##### **（1）请求方法**：

请求方法比较多：**GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT**

其中：

- HTTP1.0定义了三种请求方法： GET, POST 和 HEAD方法。
- HTTP1.1新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 方法。

|  方法   |                             描述                             |
| :-----: | :----------------------------------------------------------: |
|   GET   |                     从指定的资源请求数据                     |
|  HEAD   | 向服务器请求与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以再不必传输整个响应内容的情况下，就可以获取包含在响应小消息头中的元信息。 |
|  POST   |  向指定的资源提交要被处理的数据（例如提交表单或者上传文件）  |
|   PUT   |                 向指定资源位置上传其最新内容                 |
| DELETE  |            请求服务器删除Request-URL所标识的资源             |
| CONNECT |   HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。   |
| OPTIONS | 用于请求获得由Request-URI标识的资源在请求/响应的通信过程中可以使用的功能选项。允许客户端查看服务器的性能。 |
|  TRACE  |           回显服务器收到的请求，主要用于测试或诊断           |

注意：

- 方法名称是区分大小写的。当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码405（Method Not Allowed），当服务器不认识或者不支持对应的请求方法的时候，应当返回状态码501（Not Implemented）。

- HTTP服务器至少应该实现GET和HEAD方法，其他方法都是可选的。当然，所有的方法支持的实现都应当匹配下述的方法各自的语义定义。此外，除了上述方法，特定的HTTP服务器还能够扩展自定义的方法。例如PATCH（由 RFC 5789 指定的方法）用于将局部修改应用到资源*。*

[HTTP请求方法对照表](http://tools.jb51.net/table/http_request_method)

**关于请求方法的常见面试题**

- **HEAD**

  HEAD方法跟GET方法相同，只不过服务器响应时不会返回消息体。一个HEAD请求的响应中，HTTP头中包含的元信息应该和一个GET请求的响应消息相同。这种方法可以用来获取请求中隐含的元信息，而不用传输实体本身。也经常用来测试超链接的有效性、可用性和最近的修改。

  HEAD请求主要有以下特点：

  - 只请求资源的首部；

  - 检查超链接的有效性；

  - 检查网页是否被修改；

  - 多用于自动搜索机器人获取网页的标志信息，获取rss种子信息，或者传递安全认证信息等

- **get和post的区别**

  - 传参方式

    get传参方式是通过地址栏URL传递，get把请求的数据在URL后通过？连接，通过&进行参数分割。是可以直接在url中看到get传递的参数。

    post传参方式是将从参数存放在HTTP的包体内，在url看不到它传递的参数。

  - 传输数据大小

    get传递数据是通过URL进行传递，对传递的数据长度是受到URL大小的限制，URL最大长度是2048个字符。post没有长度限制。

  - 编码方式

    　get请求只URL编码，post支持多种编码方式

  - 字符类型

    get只支持ASCII字符，post没有字符类型限制

  - 历史记录

    get请求的记录会留在历史记录中，post请求不会留在历史记录

  - 缓存

    get请求可以被缓存，post不可以被缓存

    get请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。post不同，post做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此get请求适合于请求缓存。

  - GET和POST的底层也是TCP/IP，GET/POST都是TCP链接。

    而GET产生一个TCP数据包；POST产生两个TCP数据包。

  - 对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

  - **终极区别**：幂等性区别

    幂等性是指一次和多次请求某一个资源应该具有同样的副作用。简单来说意味着对同一URL的多个请求应该返回同样的结果。

    GET和POST最大的区别主要是GET请求是幂等性的，POST请求不是。

- **options**

  [options](https://www.cnblogs.com/mamimi/p/10602722.html)

##### <span id="jumpabc">（2）请求URL</span>

**这部分学习并摘自**：[统一资源定位符URL和统一资源标识符URI](https://www.cnblogs.com/jaci/p/11470688.html)

先说说**URI**（Uniform Resource Identifiers）：统一资源标识符。

HTTP使用统一资源标识符来传输数据和建立连接。URL是一种特殊类型的URI，包含用于查找某个资源的足够信息。

**URL**（Uniform Resource Locator）：统一资源定位符。是互联网上用来标识某一处资源的地址。

以下URL为例子做介绍：

http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name

从上面的URL看出，一个完整的URL包含这7部分：

- 协议部分：“http:”这里使用HTTP协议，协议后面的“//”为分隔符

- 域名部分：“[www.aspxfans.com](http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name)”，URL中也可以使用IP地址作为域名

- 端口部分（非必要）：“8080”，在域名之后，使用“:”作为分隔符，若省略端口则会采用默认端口

- 虚拟目录部分（非必要）：“[/news/](http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name)”域名后的第一个“/”到最后一个“/”中间是虚拟目录部分

- 文件名部分（非必要）：“[index.asp](http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name)”，从域名后的最后一个“/”到“?”之间是文件名部分；如果没有“?”，那就是从域名后的最后一个“/”到“#”是文件名部分

- 锚部分（非必要）：“name”，从“#”到最后都是锚部分

- 参数部分：也叫搜索部分、查询部分，“[boardID=5&ID=24618&page=1](http://www.aspxfans.com:8080/news/index.asp?boardID=5&ID=24618&page=1#name)”，从“?”到“#”之间是参数部分，可有多个参数，参数之间用“&”作为分隔符

##### （3）HTTP协议版本

HTTP版本协议主要有HTTP1.0、HTTP1.1、HTTP2.0。

笔者在文章下面会有一部分专门写这几个版本以及HTTPS的区别，这里先不多写。

### <span id="jumpe">**3. HTTP请求头**</span>

HTTP请求头提供了关于请求，响应或者其他的发送实体的信息。

| Header              | 解释                                                         | 示例                                                    |
| :------------------ | :----------------------------------------------------------- | :------------------------------------------------------ |
| Accept              | 指定客户端能够接受的响应内容类型                             | Accept: text/plain, text/html                           |
| Accept-Charset      | 浏览器可以接受的字符编码集。                                 | Accept-Charset: iso-8859-5                              |
| Accept-Encoding     | 指定浏览器可以支持的web服务器返回内容压缩编码类型。          | Accept-Encoding: compress, gzip                         |
| Accept-Language     | 浏览器可接受的语言                                           | Accept-Language: en,zh                                  |
| Accept-Ranges       | 可以请求网页实体的一个或者多个子范围字段                     | Accept-Ranges: bytes                                    |
| Authorization       | HTTP授权的授权证书                                           | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==       |
| Cache-Control       | 指定请求和响应遵循的缓存机制                                 | Cache-Control: no-cache                                 |
| Connection          | 表示是否需要持久连接。（HTTP 1.1默认进行持久连接）           | Connection: close                                       |
| Cookie              | HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器。 | Cookie: $Version=1; Skin=new;                           |
| Content-Length      | 请求的内容长度                                               | Content-Length: 348                                     |
| Content-Type        | 请求的与实体对应的MIME信息                                   | Content-Type: application/x-www-form-urlencoded         |
| Date                | 请求发送的日期和时间                                         | Date: Tue, 15 Nov 2010 08:12:31 GMT                     |
| Expect              | 请求的特定的服务器行为                                       | Expect: 100-continue                                    |
| From                | 发出请求的用户的Email                                        | From: user@email.com                                    |
| Host                | 指定请求的服务器的域名和端口号                               | Host: www.zcmhi.com                                     |
| If-Match            | 只有请求内容与实体相匹配才有效                               | If-Match: “737060cd8c284d8af7ad3082f209582d”            |
| If-Modified-Since   | 如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码 | If-Modified-Since: Sat, 29 Oct 2010 19:43:31 GMT        |
| If-None-Match       | 如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变 | If-None-Match: “737060cd8c284d8af7ad3082f209582d”       |
| If-Range            | 如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag | If-Range: “737060cd8c284d8af7ad3082f209582d”            |
| If-Unmodified-Since | 只在实体在指定时间之后未被修改才请求成功                     | If-Unmodified-Since: Sat, 29 Oct 2010 19:43:31 GMT      |
| Max-Forwards        | 限制信息通过代理和网关传送的时间                             | Max-Forwards: 10                                        |
| Pragma              | 用来包含实现特定的指令                                       | Pragma: no-cache                                        |
| Proxy-Authorization | 连接到代理的授权证书                                         | Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ== |
| Range               | 只请求实体的一部分，指定范围                                 | Range: bytes=500-999                                    |
| Referer             | 先前网页的地址，当前请求网页紧随其后,即来路                  | Referer: http://www.zcmhi.com/archives/71.html          |
| TE                  | 客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息     | TE: trailers,deflate;q=0.5                              |
| Upgrade             | 向服务器指定某种传输协议以便服务器进行转换（如果支持）       | Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11          |
| User-Agent          | User-Agent的内容包含发出请求的用户信息                       | User-Agent: Mozilla/5.0 (Linux; X11)                    |
| Via                 | 通知中间网关或代理服务器地址，通信协议                       | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)             |
| Warning             | 关于消息实体的警告信息                                       | Warn: 199 Miscellaneous warning                         |

# <span id="jump3">**（三）HTTP响应报文**</span>

### <span id="jumpf">**1. 响应报文结构概述**</span>

响应报文 由**响应行**（版本协议、状态码及其状态描述）、**响应头**、**响应体**组成。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430200139484.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


下面是一个实际的响应报文：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430200116746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


### <span id="jumpg" >**2. 响应行**</span>

响应行由三部分组成：**版本协议**、**状态码**、**状态码描述**。

##### （1）状态码

状态代码的第一个数字代表当前响应的类型：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430195950952.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


| 状态码 | 状态码英文名称                  | 中文描述                                                     |
| :----- | :------------------------------ | :----------------------------------------------------------- |
| 100    | Continue                        | 继续。客户端应继续其请求                                     |
| 101    | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
| 200    | OK                              | 请求成功。一般用于GET与POST请求                              |
| 201    | Created                         | 已创建。成功请求并创建了新的资源                             |
| 202    | Accepted                        | 已接受。已经接受请求，但未处理完成                           |
| 203    | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 204    | No Content                      | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205    | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206    | Partial Content                 | 部分内容。服务器成功处理了部分GET请求                        |
| 300    | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301    | Moved Permanently               | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302    | Found                           | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303    | See Other                       | 查看其它地址。与301类似。使用GET和POST请求查看               |
| 304    | Not Modified                    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305    | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                       |
| 306    | Unused                          | 已经被废弃的HTTP状态码                                       |
| 307    | Temporary Redirect              | 临时重定向。与302类似。使用GET请求重定向                     |
| 400    | Bad Request                     | 客户端请求的语法错误，服务器无法理解                         |
| 401    | Unauthorized                    | 请求要求用户的身份认证                                       |
| 402    | Payment Required                | 保留，将来使用                                               |
| 403    | Forbidden                       | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404    | Not Found                       | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405    | Method Not Allowed              | 客户端请求中的方法被禁止                                     |
| 406    | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                   |
| 407    | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408    | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                     |
| 409    | Conflict                        | 服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突 |
| 410    | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411    | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息       |
| 412    | Precondition Failed             | 客户端请求信息的先决条件错误                                 |
| 413    | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414    | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理               |
| 415    | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                             |
| 416    | Requested range not satisfiable | 客户端请求的范围无效                                         |
| 417    | Expectation Failed              | 服务器无法满足Expect的请求头信息                             |
| 500    | Internal Server Error           | 服务器内部错误，无法完成请求                                 |
| 501    | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                         |
| 502    | Bad Gateway                     | 充当网关或代理的服务器，从远端服务器接收到了一个无效的请求   |
| 503    | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504    | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505    | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理               |

具体查看：[HTTP状态码对照表](http://tools.jb51.net/table/http_status_code)

##### （2）关于状态码的常见面试题

- **301和302有什么具体区别**

  301：永久移动，请求的网页已永久移动到新的位置，服务器返回此响应，会自动将请求者转到新位置

  302：临时移动，服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来继续以后的请求。

- **200和304 的区别**

  200表示成功，服务器已成功处理了请求，通常表示为服务器提供了请求的网页

  304表示未修改，自从上次请求后，请求的网页未修改过，服务器返回此响应时不会返回网页内容。

- **400和401、403状态码**

  400状态码：请求无效

  产生原因：前端提交数据的字段名称和字段类型与后台的实体没有保持一致

  前端提交到后台的数据应该是json字符串类型，但是前端没有将对象JSON.stringify转化成字符串。

  解决方法：对照字段的名称，保持一致性，将obj对象通过JSON.stringify实现序列化

  401状态码：当前请求需要用户验证

  403状态码：服务器已经得到请求，但是拒绝执行

### <span id="jumph" >**3. 响应头**</span>

| Header             | 解释                                                         | 示例                                                  |
| :----------------- | :----------------------------------------------------------- | :---------------------------------------------------- |
| Accept-Ranges      | 表明服务器是否支持指定范围请求及哪种类型的分段请求           | Accept-Ranges: bytes                                  |
| Age                | 从原始服务器到代理缓存形成的估算时间（以秒计，非负）         | Age: 12                                               |
| Allow              | 对某网络资源的有效的请求行为，不允许则返回405                | Allow: GET, HEAD                                      |
| Cache-Control      | 告诉所有的缓存机制是否可以缓存及哪种类型                     | Cache-Control: no-cache                               |
| Content-Encoding   | web服务器支持的返回内容压缩编码类型。                        | Content-Encoding: gzip                                |
| Content-Language   | 响应体的语言                                                 | Content-Language: en,zh                               |
| Content-Length     | 响应体的长度                                                 | Content-Length: 348                                   |
| Content-Location   | 请求资源可替代的备用的另一地址                               | Content-Location: /index.htm                          |
| Content-MD5        | 返回资源的MD5校验值                                          | Content-MD5: Q2hlY2sgSW50ZWdyaXR5IQ==                 |
| Content-Range      | 在整个返回体中本部分的字节位置                               | Content-Range: bytes 21010-47021/47022                |
| Content-Type       | 返回内容的MIME类型                                           | Content-Type: text/html; charset=utf-8                |
| Date               | 原始服务器消息发出的时间                                     | Date: Tue, 15 Nov 2010 08:12:31 GMT                   |
| ETag               | 请求变量的实体标签的当前值                                   | ETag: “737060cd8c284d8af7ad3082f209582d”              |
| Expires            | 响应过期的日期和时间                                         | Expires: Thu, 01 Dec 2010 16:00:00 GMT                |
| Last-Modified      | 请求资源的最后修改时间                                       | Last-Modified: Tue, 15 Nov 2010 12:45:26 GMT          |
| Location           | 用来重定向接收方到非请求URL的位置来完成请求或标识新的资源    | Location: http://www.zcmhi.com/archives/94.html       |
| Pragma             | 包括实现特定的指令，它可应用到响应链上的任何接收方           | Pragma: no-cache                                      |
| Proxy-Authenticate | 它指出认证方案和可应用到代理的该URL上的参数                  | Proxy-Authenticate: Basic                             |
| refresh            | 应用于重定向或一个新的资源被创造，在5秒之后重定向（由网景提出，被大部分浏览器支持） | Refresh: 5; url=http://www.zcmhi.com/archives/94.html |
| Retry-After        | 如果实体暂时不可取，通知客户端在指定时间之后再次尝试         | Retry-After: 120                                      |
| Server             | web服务器软件名称                                            | Server: Apache/1.3.27 (Unix) (Red-Hat/Linux)          |
| Set-Cookie         | 设置Http Cookie                                              | Set-Cookie: UserID=JohnDoe; Max-Age=3600; Version=1   |
| Trailer            | 指出头域在分块传输编码的尾部存在                             | Trailer: Max-Forwards                                 |
| Transfer-Encoding  | 文件传输编码                                                 | Transfer-Encoding:chunked                             |
| Vary               | 告诉下游代理是使用缓存响应还是从原始服务器请求               | Vary: *                                               |
| Via                | 告知代理客户端响应是通过哪里发送的                           | Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)           |
| Warning            | 警告实体可能存在的问题                                       | Warning: 199 Miscellaneous warning                    |
| WWW-Authenticate   | 表明客户端请求实体应该使用的授权方案                         | WWW-Authenticate: Basic                               |

# <span id="jump4">**（四）HTTP缓存**</span>

笔者只看学习HTTP缓存时阅读了下面这篇博文，觉得写得很赞，推荐阅读。第二篇主要是一些概念，可补充阅读。

[Http缓存机制与原理](https://blog.csdn.net/jutal_ljt/article/details/80021545)

[HTTP强缓存和协商缓存](https://segmentfault.com/a/1190000008956069)

# <span id="jump5">**（五）不同版本HTTP**</span>

### <span id="jumpi">**1. HTTP 0.9**</span>

HTTP 0.9是第一个版本的HTTP协议，已过时。它的组成极其简单，只允许客户端发送GET这一种请求，且不支持请求头。由于没有协议头，造成了HTTP 0.9协议只支持一种内容，即纯文本。不过网页仍然支持用HTML语言格式化，同时无法插入图片。

HTTP 0.9具有典型的无状态性，每个事务独立进行处理，事务结束时就释放这个连接。由此可见，HTTP协议的无状态特点在其第一个版本0.9中已经成型。一次HTTP 0.9的传输首先要建立一个由客户端到Web服务器的TCP连接，由客户端发起一个请求，然后由Web服务器返回页面内容，然后连接会关闭。如果请求的页面不存在，也不会返回任何错误码。

### <span id="jumpj">**2. HTTP 1.0**</span>

HTTP协议的第二个版本，第一个在通讯中指定版本号的HTTP协议版本，至今仍被广泛采用。相对于HTTP 0.9 增加了如下主要特性：

- 请求与响应支持头域
- 响应对象以一个响应状态行开始
- 响应内容不只限于超文本
- 开始支持客户端通过POST方法向Web服务器提交数据，支持GET、HEAD、POST方法
- 支持长连接（默认还是使用短连接），使用长连接需要添加请求头 Connection: Keep-Alive，缓存机制，以及身份认证 

### <span id="jumpk"> **3. HTTP 1.1**</span>

HTTP协议的第三个版本是HTTP 1.1，是目前使用最广泛的协议版本 。

HTTP 1.1引入了许多关键性能优化：

- **持久连接**（Persistent Connections）

  也就是 `Connection:keep-alive`，服务器返回请求之后不会立刻关闭连接，允许客户端使用同一个连接发送后续HTTP请求。这在`HTTP/1.1`是默认开启的，除非指定 `Connection: close` 首部。

  好处是，使网页响应更快。但是对于访问量大的服务器来说，他要维持更多连接会有更大的开销，所以会关掉，比如大型电商网站。

- **HTTP 管道**（Pipelining）

  客户端把多个HTTP请求放到一个TCP连接中一一发送，而在发送过程中不需要等待服务器对前一个请求的响应。增加了并发性，进一步改善了HTTP协议的效率。

  举例来说，客户端需要请求两个资源。以前的做法是，在同一个TCP连接里面，先发送A请求，然后等待服务器做出回应，收到后再发出B请求。管道机制则是允许浏览器同时发出A请求和B请求，但是服务器还是按照顺序请求的，先回应A请求，完成后再回应B请求。如果前一个请求非常耗时，后续的请求都会受影响，在客户端这里导致一个队首阻塞的问题，所以现代浏览器都关闭这个功能。

- **Content-Length 字段**

  一个TCP连接现在可以传送多个回应，势必就要有一种机制，区分数据包是属于哪一个回应的。这就是`Content-length`字段的作用，声明本次回应的数据长度。

  ```
   Content-Length: 3495
  ```

  上面代码告诉浏览器，本次回应的长度是3495个字节，后面的字节就属于下一个回应了。

  在1.0版中，`Content-Length`字段不是必需的，因为浏览器发现服务器关闭了TCP连接，就表明收到的数据包已经全了。

- **Chunked 编码**（Chunked Encoding）

  使用`Content-Length`字段的前提条件是，服务器发送回应之前，必须知道回应的数据长度。

  对于一些很耗时的动态操作来说，这意味着，服务器要等到所有操作完成，才能发送数据，显然这样的效率不高。更好的处理方法是，产生一块数据，就发送一块，采用"流模式"（stream）取代"缓存模式"（buffer）。

  因此，1.1版规定可以不使用`Content-Length`字段，而使用["分块传输编码"](https://zh.wikipedia.org/wiki/分块传输编码)（chunked transfer encoding）。只要请求或回应的头信息有`Transfer-Encoding`字段，就表明回应将由数量未定的数据块组成。

  ```
   Transfer-Encoding: chunked
  ```

  每个非空的数据块之前，会有一个16进制的数值，表示这个块的长度。最后是一个大小为0的块，就表示本次回应的数据发送完了。

- **协议升级**（Protocol Switching）

  HTTP/1.1 引入了 Upgrade 机制，它使得客户端和服务端之间可以借助已有的 HTTP 语法升级到其它协议。

  要发起协议升级，客户端必须在请求首部中指定这两个字段：

  ```
  Connection: UpgradeUpgrade: protocol-name[/protocol-version]
  ```

  如果服务端不同意升级或者不支持 Upgrade 所列出的协议，直接忽略即可（当成 HTTP/1.1 请求，以 HTTP/1.1 响应）；如果服务端同意升级，那么需要这样响应：

  ```
  HTTP/1.1 101 Switching ProtocolsConnection: upgradeUpgrade: protocol-name[/protocol-version]
  ```

  HTTP `Upgrade` 响应的状态码是 101，并且响应正文可以使用新协议定义的数据格式。

- **Host 首部**（Host Header）

  使用`HTTP/1.1`发送的请求，必须指明host。

  因为在服务器只知道请求的IP，如果两个域名指向同一个IP，`HTTP/1.0`是无法区分的。但是携带host，就能区分了。

- 新增了请求方式PUT、PATCH、OPTIONS、DELETE等。

### <span id="jumpl"> **4. HTTP 2.0**</span>

`HTTP/2` 并没有改动 `HTTP/1` 的语义部分，例如请求方法、响应状态码、URI 以及首部字段等核心概念依旧存在。`HTTP/2` 最大的变化是重新定义了格式化和传输数据的方式，这是通过在高层 HTTP API 和低层 TCP 连接之间引入`二进制分帧层`来实现的。这样带来的好处是原来的 WEB 应用完全不用修改，就能享受到协议升级带来的收益。

HTTP 2.0是下一代HTTP协议，目前应用还非常少。主要特点有：

- **二进制协议**（Binary Protocol）

  HTTP/1.1 版的头信息肯定是文本（ASCII编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"（frame）：头信息帧和数据帧。

  二进制协议解析起来更快，更重要的是，相比文本协议，它更少出错。

- **多路复用**（Multiplexed）

  HTTP/2 复用TCP连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了"队头堵塞"。

  举例来说，在一个TCP连接里面，服务器同时收到了A请求和B请求，于是先回应A请求，结果发现处理过程非常耗时，于是就发送A请求已经处理好的部分， 接着回应B请求，完成后，再发送A请求剩下的部分。

  这样双向的、实时的通信，就叫做多工（Multiplexing）。

- **拥有优先级**（Prioritized）

  同时能进行多个请求和响应，所以需要控制顺序。`HTTP/2` 允许给每个流附上 `weight`（1~256）和对其他流的依赖，这最终会构建一个优先级树。

- **服务端推送**（Server Push）

  允许服务器在给原本请求返回响应的同时，还能主动返回其他资源给客户端。

  在 `HTTP/1.X` 的时代，有很多连接数优化的网站性能优化方式，比如资源内联。其实到了新版本，开启服务端推送，就能帮你解决问题，提升性能。

- **首部压缩**（Header Compression，HPACK）

  HTTP 协议不带有状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如`Cookie`和`User Agent`，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。

  HTTP/2 对这一点做了优化，引入了头信息压缩机制（header compression）。一方面，头信息使用`gzip`或`compress`压缩后再发送；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了。

**学习并参考于**：

[浅谈不同版本HTTP协议](https://www.dazhuanlan.com/2020/01/31/5e344360e45ad/)

[http协议各个版本](https://blog.csdn.net/qq_22238021/article/details/81197157)