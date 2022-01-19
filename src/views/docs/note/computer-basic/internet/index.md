---
title: 计算机网络
desc: 《图解http》阅读笔记
keywords: 计算机网络、笔记
date: 2020-02-17 01:01:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1.jpg
---

# 计算机网络

## web 及网络基础

web 使用一种名为 HTTP 的协议作为规范，web 是建立在 http 协议上通信的

### http 的诞生

最初是 Tim·BernersLee 博士提出的借助文档之间相互关联形成的超文本，连成可相互参阅的 WWW 万维网。
有三项构建 WWW 的技术，一是把 SGML 标准通用标记语言作为页面的文本标记语言的 HTML；指定文档所在地址的 URL；作为文档传输协议的 HTTP。WWW 这一名称，是 web 浏览器当年用来浏览超文本的客户端应用程序时的名称。现在则用来表示这一系列的集合，也可简称为 web

### 网络基础 TCP/IP

通常使用的网络包括互联网都是在 TCP/IP 协议族上运作的。协议是能让计算机与网络设备相互通信的规则。
可以认为 TCP/IP 指的是 TCP 和 IP 这两种协议，也可以认为 TCP/IP 是在 IP 协议的通信过程中，使用到的协议族的统称。
​

TCP/IP 协议族里最重要的一点是分成。分为 4 层：应用层、传输层、网络层、数据链路层

- 应用层决定了向用户提供应用服务时通信的活动。TCP/IP 协议族内预存了各类通用的应用服务。如 FTP 文件传输协议、DNS 域名系统服务。HTTP 协议也正是处于该层
- 传输层对上层应用层提供处于网络连接中的两台计算机之间的数据传输，有 TCP 传输控制协议和 UDP 用户数据报协议
- 网络层用来处理在网络上流动的数据包。数据包时网络传输的最小数据单位。该层规定了通过怎样的路径到达对方计算机，并把数据包传送给对方。与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所起的作用就是在众多的选项内选择一条传输路线
- 链路层又名数据链路层、网络接口层。用来处理连接网络的硬件部分。包括控制操作系统、硬件的设备驱动、NIC 网卡及光纤等物理可见部分。所有硬件上的范畴均在链路层的作用范围之内

#### TCP/IP 通信传输流

发送端从应用层往下走，接收端从下往应用层走。

比如

1. 首先客户端在应用层发出一个想看某个 web 页面的 http 请求
2. 接着。为了传输方便，传层层把应用层获取到的数据（http 请求报文）进行分割，并在各个报文上打上标记序号及端口号转发给网络层
3. 在网络层加上通信目的地的 mac 地址后转发给数据链路层
4. 接收端的服务器在链路层接受到数据，按序往上层发送，一直到达应用层。当传输到应用层，才算真正接收到客户端发送过来的 HTTP 请求

![image.png](./images/work-flow.png)

发送端层与层之间传输数据时，每经过一层必定会被打上一个该层所属的首部信息。反之，接收端在层与层之间传输数据时，每经过一层时会把对应的首部消去

![image.png](./images/http-encapsulate.png)

### IP、TCP 和 DNS

#### IP 协议

位于网络层，几乎所有使用网络的系统都会用到 IP 协议，IP 和 IP 地址不要混淆，IP 其实是一种协议的名称

IP 协议的作用是把各种数据包传送给对方。为了切实传输，需要满足两个重要的条件 IP 地址和 MAC 地址。

- IP 地址。指明节点被分配到的地址
- MAC 地址。网卡所属的固定地址

IP 地址和 MAC 地址可以进行配对，IP 地址可以更换，但是 MAC 地址基本上不会更改

IP 间的通信依赖 MAC 地址。但是在网络上，通信双方在同一局域网（LAN）内的情况是很少的，通常需要多台计算机和网络设备中转才能连接到对方。中转进行时，会利用下一站中转设备的 MAC 地址来搜索下一个中转目标。这时需要 ARP 协议来解析地址，根据通信方的 IP 地址就可以反查出对应的 MAC 地址

我们无法全面掌握互联网中的传输情况。因为在到达目标前的中转过程中，那些计算机和路由等网络设备智能获悉很粗略的传输路线。这被称为路由选择（routing），每个计算机或者网络设备掌握的都只是这一条网络传输路线中的某一部分

#### TCP 协议

TCP 位于传输层，提供可靠的字节流服务

> 字节流（ByteStreamService）是为了方便传输，TCP 将大块数据分割成以报文段（segment）为单位的数据包进行管理。所谓“可靠”，是 TCP 协议能够确认数据最终是否送达给对方

##### 如何确保可靠？

送达目标时，**三次握手（three-way handshaking）**

TCP 一定会确认数据包是否成功送达。握手过程中使用了 TCP 的标志（flag）

- SYN（synchronize）
- ACK（acknowledgement）

> 具体流程是发送端首先发送一个带 SYN 标志的数据包给对方。接收端收到后，回传一个带有 SYN/ACK 标志的数据包以示传达确认信息，最后发送端再回传一个带 ACK 标志的数据包，表示握手结束。如果握手过程中某个阶段莫名中断，tcp 协议会再次以相同的顺序发送相同的数据包。tcp 还有别的手段来保证通信的可靠性

#### DNS 服务

DNS（domain name system）服务和 http 都是位于应用层的协议，提供域名到 ip 地址之间的解析服务

用户通常搜事用主机名或者域名来访问别人的计算机，而不是直接用 IP 地址发那个吻，是因为 IP 地址是一组纯数字，不好记忆

但是计算机更擅长处理数字，理解名称是困难的，DNS 正是为了解决这个问题，DNS 协议提供通过域名查找 IP 地址，或者逆向从 IP 地址反查域名的服务

#### 各种协议和 HTTP 协议的关系

1. 客户端有个域名。先去问应用层 DNS 要 IP 地址
2. IP 地址给应用层的 HTTP 协议，生成请求报文
3. HTTP 将报文交给 TCP 协议，TCP 分割报文
4. IP 协议搜索到对方的地址，配合 TCP，将报文传送给对方
5. 服务器的 TCP 协议接收到报文段，按序号重组请求报文
6. 报文交给 HTTP 协议，得到对应的请求内容
7. 请求的处理结果以 TCP/IP 通信协议再向用户进行回传

### URI 和 URL

URI（UniformResourceIdentifier），是由某个协议方案表示的资源的定位标识符。协议方案是指访问资源所使用的协议类型名称

- Uniform。规定统一的格式方便处理多种不同类型的资源
- Resource。资源的定义是“可标识的任何东西”
- Identifier。表示可标识的对象，也称为标识符

URI 还包括 ftp、mailto、telnet、file 等，标准的 URI 方案有 30 种左右。

URI 标识某一互联网资源，而 URL 表示资源的地点，即互联网上所处的位置，URL 是 URI 的子集

绝对 URI 的格式

http://user:pass@www.example.jp:80/dir/index.html?uid=1#ch1

依次为协议+登录信息+服务器地址+服务器端口号+带层次的文件路径+查询字符串+片段标识符

## HTTP 协议

HTTP 协议用于客户端和服务器之间的通信

请求访问文本或图像等资源的一端称为客户端，提供资源响应的一端称为服务器端。

客户端会向服务端发送请求。请求报文包括了请求方法、请求 URI、协议版本、可选的首部字段和内容实体

![image.png](./images/request-makeup.png)

响应也会有类似的报文

### HTTP 是不保存状态的协议

HTTP 不对请求和响应之间的通信状态进行保存，协议对于发送过的请求和响应都不做持久化处理。这是为了更快地处理大量事务，确保协议的可伸缩性。

但是，随着 web 发展，有了保存状态的需求，比如登陆状态的保存，为了解决这个问题，引入了**Cookie**技术

### HTTP 方法

- GET。请求资源
- POST。传输实体主体，POST 的主要目的并不是获取响应的主体内容
- PUT。传输文件，要求在请求报文的主体中包含文件内容，然后保存到请求 URI 指定的位置。但是由于 HTTP/1.1 的 PUT 方法自身不带验证机制，任何人都可以上传文件，存在安全问题，因此一般不用该方法。如果配合 WEB 应用程序的验证机制，或者采用 REST 架构标准的同类网站，就可能开放该方法
- HEAD。获得报文首部，Content-Length、Content-Type 等等
- DELETE。删除文件，但是同样的，HTTP/1.1 方法本身不带验证机制，所以一般也不用，当配合应用程序的验证机制或者遵守 REST 标准时是可能开放使用的
- OPTIONS。询问支持的方法，查询针对 URI 指定的资源支持的方法。返回 GET、POST、HEAD 等服务器支持的方法
- TRACE。追踪路径，壤 web 服务器将之前的请求通信环回给客户端的方法。发送请求时，max-forward 首部字段中填入一个数值，每经过一个服务器就将该数字减 1，当数值为 0 时，停止传输，最后接收到请求的服务器端则返回状态码 200ok。TRACE 方法可以用来确认连接到目标服务器的过程中发生的一系列操作。但是该方法不常用，且容易引发 XST（Cross-site tracing）跨站追踪。只是能看到 max-length 的数值变化
- CONNECT。要求在与服务器通信时建立隧道，实现用隧道协议进行 TCP 通信，主要使用 SSL 安全套接层和 TLS 传输层安全协议把通信内容加密后经网络隧道传输

![image.png](./images/support-methods.png)

### 持久连接

HTTP keep-alive 或 HTTP connection reuse

只要任一端没有明确提出断开连接，则保持 TCP 连接状态

持久连接的好处在于减少了 TCP 连接的重复建立和断开所造成的额外开销，减轻服务器负担，使得 http 请求和响应都更快结束，提高了页面显示速度

HTTP/1.1 中，所有的连接默认都是持久连接，但是 HTTP/1.0 中并未标准化，即便有服务器通过非标准手段实现了持久连接，但也未必可靠，客户端和服务器都要支持持久连接才行

#### 管线化

管线化可以在不等待响应结束的情况下直接发送下一请求，请求数越多，时间差越明显

### Cookie 状态管理

无状态协议的优点在于不必保存状态，减少了服务器的 CPU 以及内存资源的消耗。

但是人们又有状态管理的需求，于是需要使用 Cookie。Cookie 通过在请求和响应的报文中写入 cookie 信息来控制客户端的状态。

- cookie 会根据从服务端发送的响应报文内的一个叫做 Set-Cookie 的首部字段信息，通知客户端保存 Cookie。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入 Cookie 值后发送出去
- 服务端发现客户端发送过来的 Cookie 后，会去检查究竟是从哪个客户端发来的请求，然后对比服务器上的记录最后得到之前的状态信息

## HTTP 报文

用于 HTTP 协议交互的信息被称为 HTTP 报文，分为报文首部和报文主体两块，报文由多行 CR+LF 换行划分

请求报文和响应报文的报文首部结构基本是相似的

- 请求行|状态行，请求行包含 GET、POST、HTTP 版本，状态行包含响应结果的状态码、原因短语、HTTP 版本
- 请求首部字段|响应首部字段
- 通用首部字段|通用首部字段
- 实体首部字段|实体首部字段
- 其他|其他

LR+LF

报文主体便是 html

### HTTP 编码

HTTP 可以按照数据原貌进行直接传输，编码是为了提升效率，通过在传输时编码，能有效地处理大量的访问请求，但是编码的操作需要计算机来完成，因此会消耗更多的 CPU 资源

#### 报文主体和实体主体的差异

- 报文

HTTP 通信的基本单位，8 位组字节流组成，通过 HTTP 通信传输

- 实体

作为请求或响应的有效载荷数据被传输，由实体首部和实体主体组成

报文的主体是**用来传输请求或者响应的实体主体**，通常可以说报文主体等于实体主体，**只有当传输过程中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异**

#### 压缩

HTTP 协议具备内容编码功能，可以指明应用在实体内容上的编码格式，原样压缩实体信息。内容编码后的实体由客户端接收并负责解码

有以下几种编码方式

- gzip(GNU zip)
- compress(UNIX 系统的标准压缩)
- deflate(zlib)
- identity(不进行编码)

传送大容量数据时，通过把数据分割多块，可以让浏览器逐步显示页面，把实体主体分块的功能称为分块传输编码（chunked transfer coding）

每一块都用 16 进制标记，最后一块使用(0(CR+LF))标记

HTTP/1.1 存在传输编码的机制，可以在通信时按某种编码方式传输，但只定义作用于分块传输编码中

还有一种场景。需要发送多种数据的多部分对象集合。比如邮件里可以写入文字并添加多份附件，是因为采用了 MIME 机制。

通过使用 multipart/form-data、multipart/byteranges

#### 范围请求

`Range: bytes=50001-10000`

可以用来从中断处恢复下载

#### 内容协商

浏览器会根据默认语言显示对应相同网站页面的中文版或者英文版。

内容协商机制是指客户端和服务器端就响应的资源内容进行交涉，然后提供给客户端最为合适的资源，包含在请求报文中的某些首部字段中，如

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language
- Content-Language

内容协商有 3 种类型

1. 服务器驱动协商。以请求的首部字段作为参考，在服务端自动处理
2. 客户端驱动协商。用户从浏览器的可选项列表中手动选择
3. 透明协商。服务端和客户端各自进行内容协商

## HTTP 状态码

## nginx 的应用

- 解决跨域
- 请求过滤
- 配置 gzip
- 负载均衡
- 静态资源服务器

它是一个高性能的反向代理服务器

### 什么是代理

#### 正向代理

比如翻墙，客户端向代理服务器发送请求并指定目标，代理服务器转交请求，并将内容返回给客户端

- 正向代理是为我们服务的
- 正向代理对我们是透明的，对服务端是非透明的，服务端不知道请求是来自代理还是真实客户端

#### 反向代理

反向代理为服务端服务，反向代理帮助服务器接收来自客户端的请求，帮助服务器做请求转发、负载均衡

- 反向代理对服务端是透明的，为服务端服务

![image.png](./images/forward-everse.png)

### 基本配置

![image.png](./images/basic-config.png)

```javascript
events {

}

http
{
    server
    {
        location path
        {
            ...
        }
        location path
        {
            ...
        }
     }

    server
    {
        ...
    }

}
```

- `main`:nginx 的全局配置，对全局生效。
- `events`​:配置影响 nginx 服务器或与用户的网络连接。
- `http`：可以嵌套多个 server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。
- `server`：配置虚拟主机的相关参数，一个 http 中可以有多个 server。
- `location`：配置请求的路由，以及各种页面的处理情况。
- `upstream`：配置后端服务器具体地址，负载均衡配置不可或缺的部分。

#### 内置变量

下面是 nginx 一些配置中常用的内置全局变量，你可以在配置的任何位置使用它们。

| 变量名           | 功能                                                            |
| ---------------- | --------------------------------------------------------------- |
| $host            | 请求信息中的 Host，如果请求中没有 Host 行，则等于设置的服务器名 |
| $request_method  | 客户端请求类型，如 GET、POST                                    |
| $remote_addr     | 客户端的 IP 地址                                                |
| $args            | 请求中的参数                                                    |
| $content_length  | 请求头中的 Content-length 字段                                  |
| $http_user_agent | 客户端 agent 信息                                               |
| $http_cookie     | 客户端 cookie 信息                                              |
| $remote_addr     | 客户端的 IP 地址                                                |
| $remote_port     | 客户端的端口                                                    |
| $server_protocol | 请求使用的协议，如 HTTP/1.0、·HTTP/1.1`                         |
| $server_addr     | 服务器地址                                                      |
| $server_name     | 服务器名称                                                      |
| $server_port     | 服务器的端口号                                                  |

### 跨域

如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源。反之则为不同源
![image.png](./images/cross-domain.png)

#### nginx 解决跨域的原理

例如：

- 前端 server 的域名为：fe.server.com
- 后端服务的域名为：dev.server.com

现在我在 fe.server.com 对 dev.server.com 发起请求一定会出现跨域。
现在我们只需要启动一个 nginx 服务器，将 server_name 设置为 fe.server.com,然后设置相应的 location 以拦截前端需要跨域的请求，最后将请求代理回 dev.server.com。如下面的配置：

```javascript
server {
  listen   80;
  server_name  fe.server.com;
  location / {
    proxy_pass dev.server.com;
  }
}
```

这样可以完美绕过浏览器的同源策略：fe.server.com 访问 nginx 的 fe.server.com 属于同源访问，而 nginx 对服务端转发的请求不会触发浏览器的同源策略。

### 请求过滤

- 根据状态码过滤

```javascript
error_page 500 501 502 503 504 506 /50x.html;
    location = /50x.html {
        #将跟路径改编为存放html的路径。
        root /root/static/html;
    }

```

- 根据 URL 名称过滤，精准匹配 URL，不匹配的 URL 全部重定向到主页。

```javascript
location / {
    rewrite  ^.*$ /index.html  redirect;
}
```

- 根据请求类型过滤。

```javascript
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
        return 403;
    }

```

### 配置 gzip

gzip 是规定的三种标准 http 压缩格式之一。目前绝大多数网站都在使用 gzip 传输 html、css、javascript 等资源文件。
对于文本文件，gzip 可以将传输流量降低至四分之一到三分之一
并不是每个浏览器都支持 gzip 的，如何知道客户端是否支持 gzip 呢，请求头中的 Accept-Encoding 来标识对压缩的支持。
![](./images/request-headers.png)
启用 gzip 同时需要客户端和服务端的支持，如果客户端支持 gzip 的解析，那么只要服务端能够返回 gzip 的文件就可以启用 gzip 了,我们可以通过 nginx 的配置来让服务端支持 gzip。下面的 respone 中 content-encoding:gzip，指服务端开启了 gzip 的压缩方式。
![](./images/response-headers.png)

```javascript
gzip                    on;
    gzip_http_version       1.1;
    gzip_comp_level         5;
    gzip_min_length         1000;
    gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;
```

### gzip_http_version

- 启用 GZip 所需的 HTTP 最低版本
- 默认值为 HTTP/1.1

这里为什么默认版本不是 1.0 呢？
HTTP 运行在 TCP 连接之上，自然也有着跟 TCP 一样的三次握手、慢启动等特性。
启用持久连接情况下，服务器发出响应后让 TCP 连接继续打开着。同一对客户/服务器之间的后续请求和响应可以通过这个连接发送。
![](./images/keep-alive.png)
为了尽可能的提高 HTTP 性能，使用持久连接就显得尤为重要了。
HTTP/1.1 默认支持 TCP 持久连接，HTTP/1.0 也可以通过显式指定 Connection: keep-alive 来启用持久连接。对于 TCP 持久连接上的 HTTP 报文，客户端需要一种机制来准确判断结束位置，而在 HTTP/1.0 中，这种机制只有 Content-Length。而在 HTTP/1.1 中新增的 Transfer-Encoding: chunked 所对应的分块传输机制可以完美解决这类问题。
nginx 同样有着配置 chunked 的属性 chunked_transfer_encoding，这个属性是默认开启的。
Nginx 在启用了 GZip 的情况下，不会等文件 GZip 完成再返回响应，而是边压缩边响应，这样可以显著提高 TTFB(Time To First Byte，首字节时间，WEB 性能优化重要指标)。这样唯一的问题是，Nginx 开始返回响应时，它无法知道将要传输的文件最终有多大，也就是无法给出 Content-Length 这个响应头部。
所以，在 HTTP1.0 中如果利用 Nginx 启用了 GZip，是无法获得 Content-Length 的，这导致 HTTP1.0 中开启持久链接和使用 GZip 只能二选一，所以在这里 gzip_http_version 默认设置为 1.1。

### gzip_comp_level

- 压缩级别，级别越高压缩率越大，当然压缩时间也就越长（传输快但比较消耗 cpu）。
- 默认值为 1
- 压缩级别取值为 1-9

### gzip_min_length

- 设置允许压缩的页面最小字节数，Content-Length 小于该值的请求将不会被压缩
- 默认值:0
- 当设置的值较小时，压缩后的长度可能比原文件大，建议设置 1000 以上

### gzip_types

- 要采用 gzip 压缩的文件类型(MIME 类型)
- 默认值:text/html(默认不压缩 js/css)

## 负载均衡

负载均衡就是帮助我们将众多的客户端请求合理的分配到各个服务器，以达到服务端资源的充分利用和更少的请求时间

### nginx 实现负载均衡

- Upstream 指定后端服务器地址列表

```javascript
upstream balanceServer {
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

- 在 server 中拦截响应请求，并将请求转发到 Upstream 中配置的服务器列表。

```javascript
server {
        server_name  fe.server.com;
        listen 80;
        location /api {
            proxy_pass http://balanceServer;
        }
    }
```

下一步要指定分配策略
![image.png](./images/allocation-strategy.png)

#### 轮询策略

默认策略，将所有客户端请求轮询分配给服务端。可以正常工作，但如果其中某一台服务器压力太大，出现延迟，会影响所有分配在这台服务器下的用户

```javascript
upstream balanceServer {
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

#### 最小连接数策略

将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。

```javascript
upstream balanceServer {
    least_conn;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

#### 最快响应时间策略

依赖于 nginx plus，优先分配给响应时间最短的服务器

```javascript
upstream balanceServer {
    fair;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

#### 客户端 ip 绑定

来自同一个 ip 的请求永远只分配给一台服务器，有效解决了动态网页存在的 session 共享问题

```javascript
upstream balanceServer {
    ip_hash;
    server 10.1.22.33:12345;
    server 10.1.22.34:12345;
    server 10.1.22.35:12345;
}
```

## 静态资源服务器

匹配以`png｜gif｜jpg｜jpeg`为结尾的请求，并将请求转发到本地路径，`root`中指定的路径即本地 nginx 的路径，同时可以进行一些缓存设置

```javascript
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为10小时
}
```

[参考](http://www.conardli.top/blog/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E8%80%85%E5%BF%85%E5%A4%87%E7%9A%84nginx%E7%9F%A5%E8%AF%86.html#%E9%85%8D%E7%BD%AEgzip)
