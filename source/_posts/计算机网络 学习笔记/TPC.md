---
title: TPC
date: 1588140810820.457
tags:
- 计算机网络
category:
- 计算机网络
---
## 目录

#### [**1. TCP数据包结构**](#jumpa)

#### [**2. TCP三次握手 和  四次握手**](#jumpb)

- [ **TPC三次握手**](#jump1)
- [**TCP四次挥手**](#jump2)

#### [**3. TCP如何保证传输可靠性 详解**](#jumpc)

- [**概述**](#jump3)
- [**校验和**](#jump4)
- [**确认应答+序列号**](#jump5)
- [**超时重传**](#jump6)
- [**停止等待协议**](#jump123)
- [**流量控制**](#jump7)
- [**拥塞控制**](#jump8)
- [**连接管理**](#jump9)

#### [**4. TCP短连接 与 长连接**](#jumpd)

- [**短连接**](#jump10)
- [**长连接**](#jump11)

#### [**5. TCP 粘包和拆包** ](#jumpe)

#### [**6. TCP和UDP协议的区别**](#jumpf)

#### [**7. 网络模型**](#jumpg)

* [**OSI 七层网络模型**](#jumpg)
* [**TCP/IP 网络模型**](#jumpw)

传输层控制协议（Transport Control Protocol），TCP/IP协议栈的核心之一。位于传输层，提供面向连接的、可靠的字节流服务。

# <span id="jumpa">**（一）TCP数据包结构**</span>
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430130357725.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
- **源端口号**（16 位）：它（连同源主机 IP 地址）标识源主机的一个应用进程。

- **目的端口号**（ 16 位）：它（连同目的主机 IP 地址）标识目的主机的一个应用进程。

  TCP的包是没有IP地址的，那是IP层上的事。但是有源端口和目标端口。

  一个TCP连接需要四个元组来表示是同一个连接（src_ip, src_port, dst_ip, dst_port）准确说是五元组，还有一个是协议。但因为这里只是说TCP协议，所以，这里只说四元组。由这无元组可以唯一确定一个 TCP 连接。

- **序列号**（ 32 位）：用来标识从 TCP 源端向 TCP 目的端发送的数据字节流，它存储当前数据包数据第一个字节的序号。**用来解决网络包乱序（reordering）问题。**如果将字节流看作在两个应用程序间的单向流动，则 TCP 用顺序号对每个字节进行计数。序号是 32bit 的无符号数，序号到达 2^32 － 1 后又从 0 开始。当建立一个新的连接时， SYN 标志变 1 ，顺序号字段包含由这个主机选择的该连接的初始顺序号 ISN （ Initial Sequence Number ）。

- **确认号**（ 32 位）：包含发送确认的一端所期望收到的下一个顺序号。因此，确认序号应当是上次已成功收到数据字节顺序号加 1 。只有 ACK 标志为 1 时确认序号字段才有效。**用来解决不丢包的问题**。 TCP 为应用层提供全双工服务，这意味数据能在两个方向上独立地进行传输。因此，连接的每一端必须保持每个方向上的传输数据顺序号。

- **TCP 报头长度**（ 4 位）：给出报头中 32bit 字的数目，它实际上指明数据从哪里开始。需要这个值是因为任选字段的长度是可变的。这个字段占 4bit ，因此 TCP 最多有 60 字节的首部。然而，没有任选字段，正常的长度是 20 字节。

- **保留位**（ 6 位）：保留给将来使用，目前必须置为 0 。

- **控制位**（ control flags ， 6 位）：在 TCP 报头中有 6 个标志比特，它们中的多个可同时被设置为 1 。依次为：

  - URG ：(urgent 紧急位 0/1） 为 1 表示紧急指针有效，为 0 则忽略紧急指针值。
  - ACK ：（acknowledge 确认位 0/1)为 1 表示确认号有效，为 0 表示报文中不包含确认信息，忽略确认号字段。
  - PSH ：(push 推标志)为 1 表示是带有 PUSH 标志的数据，指示接收方应该尽快将这个报文段交给应用层而不用等待缓冲区装满。
  - RST ：(reset 重置位 0/1）用于复位由于主机崩溃或其他原因而出现错误的连接。它还可以用于拒绝非法的报文段和拒绝连接请求。一般情况下，如果收到一个 RST 为 1 的报文，那么一定发生了某些问题。
  - SYN ：（synchronize sequence 序列位 0/1）同步序号，为 1 表示连接请求，用于建立连接和使顺序号同步（ synchronize ）。
  - FIN ：（finish 完结位 0/1)用于释放连接，为 1 表示发送方已经没有数据发送了，即关闭本方数据流。

- **窗口大小**（ 16 位）：数据字节数，表示从确认号开始，本报文的源方可以接收的字节数，即源方接收窗口大小。窗口大小是一个 16bit 字段，因而窗口大小最大为 65535字节。也就是著名的滑动窗口（Sliding Window），**用于解决流控的**。

- **校验和**（ 16 位）：此校验和是对整个的 TCP 报文段，包括 TCP 头部和 TCP 数据，以 16 位字进行计算所得。这是一个强制性的字段，一定是由发送端计算和存储，并由接收端进行验证。

- **紧急指针**（ 16 位）：只有当 URG 标志置 1 时紧急指针才有效。紧急指针是一个正的偏移量，和顺序号字段中的值相加表示紧急数据最后一个字节的序号。 TCP 的紧急方式是发送端向另一端发送紧急数据的一种方式。

- **选项**：最常见的可选字段是最长报文大小，又称为 MSS(Maximum Segment Size) 。每个连接方通常都在通信的第一个报文段（为建立连接而设置 SYN 标志的那个段）中指明这个选项，它指明本端所能接收的最大长度的报文段。选项长度不一定是 32 位字的整数倍，所以要加填充位，使得报头长度成为整字数。

- **数据**： TCP 报文段中的数据部分是可选的。在一个连接建立和一个连接终止时，双方交换的报文段仅有 TCP 首部。如果一方没有数据要发送，也使用没有任何数据的首部来确认收到的数据。在处理超时的许多情况中，也会发送不带任何数据的报文段。

# <span id="jumpb">**（二）TCP三次握手 和  四次握手**</span>

### <span id="jump1">**1. TPC三次握手**</span>

**过程**：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430130608454.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


最初两端的TCP进程都处于CLOSED状态。client是主动打开连接，server是被动打开连接。

- 首先client的TCP客户进程向server发出连接请求报文段，这时首部中的同步位SYN=1，初始序号seq=x。这时，client的客户进程就进入SYN-SENT(同步已发送)状态。
- server收到连接请求报文段后，向client发送确认。在确认报文段中把SYN和ACK位都置为1，确认号是ack=x+1,初始序号seq=y。这时server的TCP服务器进程就进入SYN-RCVD(同步已收到)状态。
- client的TCP客户进程收到server的确认后，还要向server给出确认。确认报文段的ACK置为1，确认号ack=y+1，序号seq=x+1。这时，TCP连接已经建立，client进入ESTABLISHED(已建立连接)状态，当server收到client的确认后，也会进入ESTABLISHED状态。

以上给出的连接建立过程就是常说的TCP三次握手。

**为什么要三次握手？(为什么client还要发送一次确认呢?)**

三次握手最主要的目的就是双方确认自己与对方的发送与接收是正常的。

而第三次握手主要是为了防止已失效的连接请求报文段突然又传送到了server，因而产生错误。

假定client发出的某一个连接请求报文段在传输的过程中并没有丢失，而是在某个网络节点长时间滞留了，以致延误到连接释放以后的某个时间才到达server。本来这是一个早已失效的报文段。但server收到此失效的连接请求报文段后，就误以为client又发了一次新的连接请求，于是向client发出确认报文段，同意建立连接。假如不采用三次握手，那么只要server发出确认，新的连接就建立了。由于client并未发出建立连接的请求，因此不会理睬server的确认，也不会向server发送数据。但server却以为新的运输连接已经建立了，并一直等待client发来数据，因此白白浪费了许多资源。

采用TCP三次握手的方法可以防止上述现象发生。例如在刚才的情况下，由于client不会向server的确认发出确认，server由于收不到确认，就知道client并没有要求建立连接。

**为什么要传回syn？**

接收端传回发送端所发送的SYN是：为了告诉发送端，我接收到的信息确实就是你所发送的信号了。

**传了SYN,为啥还要传ACK？**

双方通信无误必须是两者互相发送信息都无误。传了SYN，证明发送方到接收方的通道没有问题，但是接收方到发送方的通道还需要ACK信号来进行验证。

[TCP建立连接的三次握手过程](https://www.cnblogs.com/winner-0715/p/5032661.html)

### <span id="jump2">**2. 四次握手**</span>

**过程**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430131434210.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


数据传输结束后，通信的双方都可释放连接。

- 现在client和server都处于ESTABLISHED状态。client的应用进程先向server发出连接释放报文段，主动关闭TCP连接。client把连接释放报文段的首部的终止控制位FIN置为1，序号seq=u，它等于前面已传送过的数据的最后一个字节的序号加1。这时A进入FIN-WAIT-1(终止等待1)状态，等待server的确认。

- server收到连接释放报文段后即发出确认(发出的不是连接释放报文段)，确认号是ack=u+1，而这个报文段自己的序号是seq = v，等于server前面已传送过的数据的最后一个字节的序号加1。然后server就进入CLOSE-WAIT(关闭等待)状态。TCP服务器进程这时通知高层应用进程，因而从client到server这个方向的连接释放了，这时的TCP连接处于半关闭状态，即client已经没有数据要发送了，但server若发送数据，client仍要接受。也就是说，从server到client这个方向的连接并未关闭。这个状态可以会持续一些时间。

  client收到server的确认后，就进入FIN-WAIT-2(终止等待2)状态，等待server发出的连接释放报文段。

- 若server已经没有要向client发送的数据，其应用进程就通知TCP释放连接。这时server发出的连接释放报文段必须使用FIN=1。现假定server的序号为w(在半关闭状态B可能又发送了一些数据)。server还必须重复上次已发送过的确认号ack=u+1。这是server就进入LAST-ACK状态，等待A的确认。

- 在client收到server的连接释放报文段后，必须对此发出确认。在确认报文段中把ACK置为1，确认号ack=w+1，而自己的序号是seq=u+1(前面的FIN报文消耗了1个序号)。然后进入TIME-WAIT状态。请注意，现在TCP连接还没释放掉。必须再经过2MSL后，client才进入到CLOSED状态。MSL叫最长报文段寿命，一般为2分钟。

  当server收到client发出的确认，就进入CLOSED状态。由此可见server结束TCP连接的时间要比client早一些。等到2MSL结束后client也进入CLOSED状态，至此完成了TCP四次挥手断开连接全过程。

**tcp四次挥手为什么要等待2MSL**？（为什么要有TIME-WAIT这个状态呢）

MSL 是Maximum Segment Lifetime,译为“报文最大生存时间”，任何报文在网络上存在的最长时间，超过这个时间报文将被丢弃。

2MSL是两倍的MSL(Maximum Segment Lifetime)，2MSL就是一个发送和一个回复所需的最大时间

- 防止客户端最后一次发给服务器的确认在网络中丢失以至于客户端关闭，而服务端并未关闭，导致资源的浪费。

  client发送出最后的ACK回复后，但该ACK可能丢失。Server如果没有收到ACK，将不断重复发送FIN片段。所以Client不能立即关闭，它必须确认Server接收到了该ACK。Client会在发送出ACK之后进入到TIME_WAIT状态。Client会设置一个计时器，等待2MSL的时间。如果在该时间内再次收到FIN，那么Client会重发ACK并再次等待2MSL，如果直到2MSL，Client都没有再次收到FIN，那么Client推断ACK已经被成功接收，则结束TCP连接。

- 等待最大的2msl可以让本次连接的所有的网络包在链路上消失，以防造成不必要的干扰。

  如果client直接closed，然后又向server发起了一个新连接，我们不能保证这个新连接和刚关闭的连接的端口号是不同的。假设新连接和已经关闭的老端口号是一样的，如果前一次滞留的某些数据仍然在网络中，这些延迟数据会在新连接建立后到达Server，所以socket就认为那个延迟的数据是属于新连接的，数据包就会发生混淆。所以client要在TIME_WAIT状态等待2倍的MSL，这样保证本次连接的所有数据都从网络中消失。

**为什么连接的时候是三次握手，关闭的时候却是四次握手？**

因为在握手过程中，当Server端收到Client端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。

四次握手因为是双方彼此都建立了连接，因此双方都要释放自己的连接，A向B发出一个释放连接请求，他要释放链接表明不再向B发送数据了，此时B收到了A发送的释放链接请求之后，给A发送一个确认，A不能再向B发送数据了，它处于FIN-WAIT-2的状态，但是此时B还可以向A进行数据的传送。此时B向A 发送一个断开连接的请求，A收到之后给B发送一个确认。此时B关闭连接。A也关闭连接。

# <span id="jumpc">**（三）TCP如何保证传输可靠性 详解** </span>

这部分是学习并摘自：[TCP如何保证传输可靠性](https://www.iteye.com/blog/uule-2429131)

### <span id="jump3">**1. 概述**</span>

TCP协议保证数据传输可靠性的方式主要有：**（校序重流拥）**

- **校验和**

  发送的数据包的二进制相加然后取反，目的是检测数据在传输过程中的任何变化。如果接收端的检验和有差错，TCP将丢弃这个报文段和不确认收到此报文段。 

- **确认应答+序列号**

       TCP给发送的每一个包进行编号，接收方对数据包进行排序，把有序数据传送给应用层。 

- **超时重传**

  当TCP发出一个段后，它启动一个定时器，等待目的端确认收到这个报文段。如果不能及时收到一个确认，将重发这个报文段。 

- **停止等待ARQ协议**

  也是为了实现可靠传输的，它的基本原理就是每发完一个分组就停止发送，等待对方确认。在收到确认后再发下一个分组。

- **流量控制**

  TCP连接的每一方都有固定大小的缓冲空间，TCP的接收端只允许发送端发送接收端缓冲区能接纳的数据。当接收方来不及处理发送方的数据，能提示发送方降低发送的速率，防止包丢失。TCP使用的流量控制协议是可变大小的滑动窗口协议。 接收方有即时窗口（滑动窗口），随ACK报文发送 。

- **拥塞控制**

  当网络拥塞时，减少数据的发送。发送方有拥塞窗口，发送数据前比对接收方发过来的即时窗口，取小。

  拥塞控制主要是四个算法：**慢启动**、**拥塞避免**、**快重传**、**快速恢复**。

- **应用数据切割**：应用数据被分隔成TCP认为最适合发送的多个报文段（由特定的算法和机制来确认）

**接下来详细说明上面列举的几种举措！**

### <span id="jump4">**2. 校验和**</span>

**计算方式**：在数据传输的过程中，将发送的数据段都当做一个16位的整数。将这些整数加起来。并且前面的进位不能丢弃，补在后面，最后取反，得到校验和。 

**发送方**：在发送数据之前计算检验和**，**并进行校验和的填充。 

**接收方**：收到数据后，对数据以同样的方式进行计算，求出校验和，与发送方的进行比对。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430131327432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


 **注意**：如果接收方比对校验和与发送方不一致，那么数据一定传输有误。但是如果接收方比对校验和与发送方一致，数据不一定传输成功。

### <span id="jump5">**3.  确认应答与序列号**</span>

**序列号**：TCP传输时将每个字节的数据都进行了编号，这就是序列号。 

**确认应答**：TCP传输的过程中，每次接收方收到数据后，都会对传输方进行确认应答。也就是发送ACK报文。这个ACK报文当中带有对应的确认序列号，告诉发送方，接收到了哪些数据，下一次的数据从哪里发。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430131303215.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

序列号的作用不仅仅是应答的作用，有了序列号能够将接收到的数据根据序列号排序，并且去掉重复序列号的数据。这也是TCP传输可靠性的保证之一。

### <span id="jump6">**4. 超时重传**</span>

在进行TCP传输时，由于确认应答与序列号机制，也就是说发送方发送一部分数据后，都会等待接收方发送的ACK报文，并解析ACK报文，判断数据是否传输成功。

如果发送方发送完数据后，迟迟没有等到接收方的ACK报文，这该怎么办呢？而没有收到ACK报文的原因可能是什么呢？

首先，**发送方没有接收到响应的ACK报文原因可能有两点**：

- 数据在传输过程中由于网络原因等直接全体丢包，接收方没有接收到。
- 接收方接收到了响应的数据，但是发送的ACK报文响应却由于网络原因丢包了。

TCP在解决这个问题的时候引入了一个新的机制，叫做**超时重传机制。**简单理解就是发送方在发送完数据后等待一个时间，时间到达没有接收到ACK报文，那么对刚才发送的数据进行重新发送。

- 如果是刚才第一个原因，接收方收到二次重发的数据后，便进行ACK应答。
- 如果是第二个原因，接收方发现接收的数据已存在（判断存在的根据就是序列号，所以上面说序列号还有去除重复数据的作用），那么直接丢弃，仍旧发送ACK应答。

那么发送方发送完毕后**等待的时间是多少呢？**如果这个等待的时间过长，那么会影响TCP传输的整体效率，如果等待时间过短，又会导致频繁的发送重复的包。如何权衡？

由于TCP传输时保证能够在任何环境下都有一个高性能的通信，因此这个最大超时时间（也就是等待的时间）是动态计算的。

**注意：**

超时以500ms（0.5秒）为一个单位进行控制，每次判定超时重发的超时时间都是500ms的整数倍。重发一次后，仍未响应，那么等待2*500ms的时间后，再次重传。等待4*500ms的时间继续重传。以一个指数的形式增长。累计到一定的重传次数，TCP就认为网络或者对端出现异常，强制关闭连接。

**详细内容推荐阅读以下博客！**

[TCP 的那些事儿（上）](https://coolshell.cn/articles/11564.html)

### <span id="jump123">**5. 停止等待协议**</span>

- 停止等待协议是为了实现可靠传输的，它的基本原理就是每发完一个分组就停止发送，等待对方确认。在收到确认后再发下一个分组。
- 为了提高传输效率，发送方可以不使用低效率的停止等待协议，而是采用流水线传输。流水线传输就是发送方可连续发送多个分组，不必每发完一个分组就停下来等待对方确认。这样可使信道上一直有数据不间断的在传送。这种传输方式可以明显提高信道利用率。

### <span id="jump7">**6.  流量控制**</span>

接收端在接收到数据后，对其进行处理。如果发送端的发送速度太快，导致接收端的结束缓冲区很快的填充满了。此时如果发送端仍旧发送数据，那么接下来发送的数据都会丢包，继而导致丢包的一系列连锁反应，超时重传呀什么的。而**TCP根据接收端对数据的处理能力，决定发送端的发送速度，这个机制就是流量控制**。**流量控制所要做的就是控制发送端发送数据的速率，以便使接收端来得及接受。流量控制往往指的是点对点通信量的控制，是个端到端的问题。**

在TCP协议的报头信息当中，有一个16位字段的窗口大小。在介绍这个窗口大小时我们知道，窗口大小的内容实际上是接收端接收数据缓冲区的剩余大小。这个数字越大，证明接收端接收缓冲区的剩余空间越大，网络的吞吐量越大。接收端会在确认应答发送ACK报文时，将自己的即时窗口大小填入，并跟随ACK报文一起发送过去。而发送方根据ACK报文里的窗口大小的值的改变进而改变自己的发送速度。如果接收到窗口大小的值为0，那么发送方将停止发送数据。并定期的向接收端发送窗口探测数据段，让接收端把窗口大小告诉发送端。 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430131206712.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

 注：16位的窗口大小最大能表示65535个字节（64K），但是TCP的窗口大小最大并不是64K。在TCP首部中40个字节的选项中还包含了一个窗口扩大因子M，实际的窗口大小就是16为窗口字段的值左移M位。每移一位，扩大两倍。

### <span id="jump8">**7.  拥塞控制**</span>

TCP传输的过程中，发送端开始发送数据的时候，如果刚开始就发送大量的数据，那么就可能造成一些问题。网络可能在开始的时候就很拥堵，如果给网络中在扔出大量数据，那么这个拥堵就会加剧。拥堵的加剧就会产生大量的丢包，就对大量的超时重传，严重影响传输。

拥塞控制就是防止过多的数据注入到网络中，这样可以使网络中的路由器或链路不致过载。

拥塞控制是TCP在传输时尽可能快的将数据传输，并且避免拥塞造成的一系列问题。是可靠性的保证，同时也是维护了传输的高效性。

 发送方维持一个叫做**拥塞窗口 cwnd**（congestion window）的状态变量。拥塞窗口的大小取决于网络的拥塞程度，并且动态地在变化。发送方让自己的发送窗口等于拥塞窗口，另外考虑到接受方的接收能力，发送窗口可能小于拥塞窗口。

拥塞控制主要是四个算法：慢开始、拥塞避免、快重传、快恢复。

- **慢启动 与 拥塞避免**

  **慢开始**算法的思路就是：在开始发送数据时，先发送少量的数据探路。探清当前的网络状态如何，再决定多大的速度进行传输。

  最初的TCP在连接建立成功后会向网络中发送大量的数据包，这样很容易导致网络中路由器缓存空间耗尽，从而发生拥塞。因此新建立的连接不能够一开始就大量发送数据包，而只能根据网络情况逐步增加每次发送的数据量，以避免上述现象的发生。具体来说，当新建连接时，cwnd初始化为1个最大报文段(MSS)大小，发送端开始按照拥塞窗口大小发送数据，每当有一个报文段被确认，cwnd就增加1个MSS大小。这样cwnd的值就随着网络往返时间(Round Trip Time,RTT)呈指数级增长，事实上，慢启动的速度一点也不慢，只是它的起点比较低一点而已。我们可以简单计算下：

  ```
     开始           --->     cwnd = 1
     经过1个RTT后   --->     cwnd = 2*1 = 2
     经过2个RTT后   --->     cwnd = 2*2= 4
     经过3个RTT后   --->     cwnd = 4*2 = 8
  如果带宽为W，那么经过RTT*log2W时间就可以占满带宽。
  ```

  从慢启动可以看到，cwnd可以很快的增长上来，从而最大程度利用网络带宽资源，但是cwnd不能一直这样无限增长下去，一定需要某个限制。TCP使用了一个叫慢启动门限(ssthresh)的变量，当cwnd超过该值后，慢启动过程结束，进入**拥塞避免**阶段。对于大多数TCP实现来说，ssthresh的值是65536(同样以字节计算)。拥塞避免的主要思想是加法增大，也就是cwnd的值不再指数级往上升，开始加法增加。此时当窗口中所有的报文段都被确认时，cwnd的大小加1，cwnd的值就随着RTT开始线性增加，这样就可以避免增长过快导致网络拥塞，慢慢的增加调整到网络的最佳值。

  **当cwnd<ssthresh时，使用慢开始算法。**

  **当cwnd>ssthresh时，改用拥塞避免算法。**

  **当cwnd=ssthresh时，慢开始与拥塞避免算法任意。**

  无论是在**慢开始阶段**还是在**拥塞避免阶段**，只要发送方判断网络出现拥塞（其根据就是没有收到确认，虽然没有收到确认可能是其他原因的分组丢失，但是因为无法判定，所以都当做拥塞来处理），就将cwnd置为1，ssthresh置为cwnd的一半，然后开始执行慢启动算法（cwnd<ssthresh）。 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430131134930.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


- **快重传 和 快恢复**

  在TCP/IP中，**快速重传和恢复 FRR**（fast retransmit and recovery）是一种拥塞控制算法，它能快速恢复丢失的数据包。没有FRR，如果数据包丢失了，TCP将会使用定时器来要求传输暂停。在暂停的这段时间内，没有新的或复制的数据包被发送。有了FRR，如果接收机接收到一个不按顺序的数据段，它会立即给发送机发送一个重复确认。如果发送机接收到三个重复确认，它会假定确认件指出的数据段丢失了，并立即重传这些丢失的数据段。有了FRR，就不会因为重传时要求的暂停被耽误。 　当有单独的数据包丢失时，快速重传和恢复（FRR）能最有效地工作。当有多个数据信息包在某一段很短的时间内丢失时，它则不能很有效地工作。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430131053680.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


**详细内容推荐阅读以下博客！**

[TCP慢启动、拥塞避免、快速重传、快速恢复](https://blog.csdn.net/ydyang1126/article/details/72842274)

[TCP 的那些事儿（下）](https://coolshell.cn/articles/11609.html)

### <span id="jump9">**8. 连接管理**</span>

连接管理就是三次握手与四次挥手的过程，在前面详细讲过这个过程，这里不再赘述。保证可靠的连接，是保证可靠性的前提。

# <span id="jumpd" >**（四）TCP短连接 与 长连接**</span>

**学习并整理摘于** ：[TCP长连接与短连接](https://www.jianshu.com/p/313798ae863d)

当网络通信时采用TCP协议时，在真正的读写操作之前，server与client之间必须建立一个连接，当读写操作完成后，双方不再需要这个连接时它们可以释放这个连接，连接的建立是需要三次握手的，而释放则需要4次握手，所以说每个连接的建立都是需要资源消耗和时间消耗的。

### <span id="jump10" >**1. 短连接**</span>

模拟一下TCP短连接的情况:

- client 向 server 发起连接请求

- server 接到请求，双方建立连接

- client 向 server 发送消息

- server 回应 client

- 一次读写完成，此时双方任何一个都可以发起 close 操作

在第 5 点中，一般都是 client 先发起 close 操作。因为一般的 server 不会回复完 client 后就立即关闭连接。当然也不排除有特殊的情况。
**短连接一般只会在 client/server 间传递一次读写操作！**

**短连接的操作步骤是：**

- 建立连接——数据传输——关闭连接......建立连接——数据传输——关闭连接

**短连接的优缺点是：**

- **优点**：管理起来比较简单，存在的连接都是有用的连接，不需要额外的控制手段。

- **缺点**是：但如果客户请求频繁，将在TCP的建立和关闭操作上浪费时间和带宽。

**短连接应用场景**：

像WEB网站的http服务一般都用短链接，因为长连接对于服务端来说会耗费一定的资源，而像WEB网站这么频繁的成千上万甚至上亿客户端的连接用短连接会更省一些资源，如果用长连接，而且同时有成千上万的用户，如果每个用户都占用一个连接的话，那可想而知吧。所以并发量大，但每个用户无需频繁操作情况下需用短连好。

### <span id="jump11" >**2. 长连接**</span>

模拟一下长连接的情况:

- client 向 server 发起连接

- server 接到请求，双方建立连接

- client 向 server 发送消息

- server 回应 client

- 一次读写完成，连接不关闭

- 后续读写操作...

长连接的**操作步骤**是：

- 建立连接——数据传输......（保持连接）......数据传输——关闭连接

而长连接的状态是如何保持的呢？有些博主已经总结的很好，这里就不加篇（ctrl）幅（c+v  ^_^）。推荐看下面博客：

[TCPKeepAlive保活机制](https://blog.csdn.net/TT_love9527/article/details/82887250)

长连接的**优缺点**是：

- **优点**：长连接可以省去较多的TCP建立和关闭的操作，减少浪费，节约时间。

- **缺点**：在长连接的应用场景下，client端一般不会主动关闭它们之间的连接，client与server之间的连接如果一直不关闭的话，会存在一个问题，随着客户端连接越来越多，server早晚有扛不住的时候，这时候server端需要采取一些策略，如关闭一些长时间没有读写事件发生的连接，这样可以避免一些恶意连接导致server端服务受损；如果条件再允许就可以以客户端机器为颗粒度，限制每个客户端的最大长连接数。

**长连接应用场景**：

长连接多用于操作频繁，点对点的通讯，而且连接数不能太多情况。每个TCP连接都需要三步握手，这需要时间，如果每个操作都是先连接，再操作的话那么处理速度会降低很多，所以每个操作完后都不断开，再次处理时直接发送数据包就OK了，不用建立TCP连接。例如：数据库的连接用长连接，如果用短连接频繁的通信会造成socket错误，而且频繁的socket 创建也是对资源的浪费。

# <span id="jumpe">**（五）TCP 粘包和拆包** </span>

学习并摘自：[tcp粘包和拆包](https://www.cnblogs.com/panchanggui/p/9518735.html)

粘包拆包问题是处于网络比较底层的问题，在数据链路层、网络层以及传输层都有可能发生。我们日常的网络应用开发大都在传输层进行，由于UDP有消息保护边界，不会发生粘包拆包问题，因此粘包拆包问题只发生在TCP协议中。

### **1. 什么是粘包、拆包？**

假设客户端向服务端连续发送了两个数据包，用packet1和packet2来表示，那么服务端收到的数据可以分为三种，现列举如下：

第一种情况，接收端正常收到两个数据包，即没有发生拆包和粘包的现象，此种情况不在本文的讨论范围内。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430130951407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

第二种情况，接收端只收到一个数据包，由于TCP是不会出现丢包的，所以这一个数据包中包含了发送端发送的两个数据包的信息，这种现象即为粘包。这种情况由于接收端不知道这两个数据包的界限，所以对于接收端来说很难处理。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-xwAyOL8X-1588222913651)(C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1588215794024.png)\]](https://img-blog.csdnimg.cn/20200430130931400.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


第三种情况，这种情况有两种表现形式，如下图。接收端收到了两个数据包，但是这两个数据包要么是不完整的，要么就是多出来一块，这种情况即发生了拆包和粘包。这两种情况如果不加特殊处理，对于接收端同样是不好处理的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430130855181.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)



### **2. 为什么会发生TCP粘包、拆包？**

发生TCP粘包、拆包主要是由于下面一些原因：

- 应用程序写入的数据大于套接字缓冲区大小，这将会发生拆包。

- 应用程序写入数据小于套接字缓冲区大小，网卡将应用多次写入的数据发送到网络上，这将会发生粘包。

- 进行MSS（最大报文长度）大小的TCP分段，当TCP报文长度-TCP头部长度>MSS的时候将发生拆包。

- 接收方法不及时读取套接字缓冲区数据，这将发生粘包。

### **3. 粘包、拆包解决办法**

TCP本身是面向流的，作为网络服务器，如何从这源源不断涌来的数据流中拆分出或者合并出有意义的信息呢？通常会有以下一些常用的方法：

- 发送端给每个数据包添加包首部，首部中应该至少包含数据包的长度，这样接收端在接收到数据后，通过读取包首部的长度字段，便知道每一个数据包的实际长度了。

- 发送端将每个数据包封装为固定长度（不够的可以通过补0填充），这样接收端每次从接收缓冲区中读取固定长度的数据就自然而然的把每个数据包拆分开来。

- 可以在数据包之间设置边界，如添加特殊符号，这样，接收端通过这个边界就可以将不同的数据包拆分开。

# <span id="jumpf">**（六）TCP和UDP协议的区别**</span>

### **1. UDP数据包结构**

用户数据报协议（User Datagram Protocol, UDP），是一种无连接方式的、不可靠的传输协议。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430130635445.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)


- 源端口号和目的端口号如上和TCP的相同。

- UDP长度：UDP报文的字节长度（包括首部和数据）。

- UDP校验和: 检验UDP首部和数据部分的正确性。

### **2. TCP与UDP区别**

|   特点   |                       TCP                        |                UDP                 |
| :------: | :----------------------------------------------: | :--------------------------------: |
|  连接性  |                     面向连接                     |             面向非连接             |
|  可靠性  |                       可靠                       |               不可靠               |
|   报文   |                    面向字节流                    |              面向报文              |
| 传输效率 |                        低                        |                 高                 |
| 传输速度 |                        慢                        |                 快                 |
|  双工性  |                      全双工                      |   一对一、一对多、多对一、多对多   |
| 流量控制 |                     滑动窗口                     |                 无                 |
| 拥塞控制 |         慢开始、拥塞控制、快重传、快恢复         |                 无                 |
| 应用场景 | 对效率要求低、对准确性要求高或者要求有连接的场景 | 对效率要求高、对准确性要求低的场景 |

**TCP和UDP协议的一些应用**：

| 应用层协议 | 应用           | 传输层协议 |
| ---------- | -------------- | ---------- |
| SMTP       | 电子邮件       | TCP        |
| TELNET     | 远程终端接入   | TCP        |
| HTTP       | 万维网         | TCP        |
| FIP        | 文件传输       | TCP        |
| DNS        | 域名转换       | UDP        |
| TFIP       | 文件传输       | UDP        |
| SNMP       | 网络管理       | UDP        |
| NFS        | 远程文件服务器 | UDP        |

# <span id="jumpg">**（七）网络模型**</span>

### <span id="jumpg">**1. OSI七层模型**</span>

![1588303941361](C:\Users\lin\AppData\Roaming\Typora\typora-user-images\1588303941361.png)

**其中各层作用：**

- **应用层**：

  是为计算机用户提供应用接口，也为用户直接提供各种网络服务。我们常见应用层的网络服务协议有：HTTP，HTTPS，FTP，POP3、SMTP等。

- **表示层**：

  表示层提供各种用于应用层数据的编码和转换功能,确保一个系统的应用层发送的数据能被另一个系统的应用层识别。

- **会话层**：

  会话层就是负责建立、管理和终止表示层实体之间的通信会话。该层的通信由不同设备中的应用程序之间的服务请求和响应组成。      

- **传输层**：

  传输层建立了主机端到端的链接，传输层的作用是为上层协议提供端到端的可靠和透明的数据传输服务，包括处理差错控制和流量控制等问题。该层向高层屏蔽了下层数据通信的细节，使高层用户看到的只是在两个传输实体间的一条主机到主机的、可由用户控制和设定的、可靠的数据通路。

- **网络层**：

  本层通过IP寻址来建立两个节点之间的连接，为源端的运输层送来的分组，选择合适的路由和交换节点，正确无误地按照地址传送给目的端的运输层。就是通常说的IP层。这一层就是我们经常说的IP协议层。IP协议是Internet的基础。

- **数据链路层**：

  将比特组合成字节,再将字节组合成**帧**,使用链路层地址 (以太网使用MAC地址)来访问介质,并进行差错检测。

- **物理层**：

   实际最终信号的传输是通过物理层实现的。通过物理介质传输**比特流**。规定了电平、速度和电缆针脚。常用设备有（各种物理设备）集线器、中继器、调制解调器、网线、双绞线、同轴电缆。这些都是物理层的传输介质。

**参考**：[OSI网络模型](https://www.jianshu.com/p/f32cfd6c208b)

### <span id="jumpw">2. TCP/IP网络模型</span>

TCP/IP协议模型（Transmission Control Protocol/Internet Protocol），包含了一系列构成互联网基础的网络协议，是Internet的核心协议。

基于TCP/IP的参考模型将协议分成四个层次，它们分别是**链路层（网络接口层）、网络层、传输层和应用层**。下图表示TCP/IP模型与OSI模型各层的对照关系。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020043013074119.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70#pic_center)

**其中各层作用：**

- **应用层**：决定了向用户提供应用服务时通信的活动，主要负责应用之间的数据传输。
- **传输层**：主要负责的功能是将应用层的数据进行传输，为为两台主机上的应用提供端到端的通信。
- **网络层**：主要处理在网络中传输的数据包，定义了数据包在网络中传输的格式。
- **链路层**：处理连接网络的硬件部分，是这些硬件部分之间通信规范的一个标准，使这些硬件设备之间能够相互连接。

TCP/IP协议通信的过程其实就对应着数据入栈与出栈的过程。入栈的过程，数据发送方每层不断地封装首部与尾部，添加一些传输的信息，确保能传输到目的地。出栈的过程，数据接收方每层不断地拆除首部与尾部，得到最终传输的数据。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200430130656980.png#pic_center)