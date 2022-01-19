---
title: node
desc: 《JavaScript设计模式》、《大话设计模式》笔记
keywords: 设计模式、笔记
date: 2020-02-17 01:01:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1.jpg
---

# nodejs

## nodejs 是什么？

不是 web 框架，也不是编程语言，而是一个将多种技术组合起来的平台
用到了 v8 引擎，libuv，c/c++实现的 c-ares、http-parser、OpenSSL、zlib 等
![NodeJS的API.png](./images/nodejs-API.png)
源代码看 0.10 版本，因为使用了很久一段时间

## nodejs bindings

- 为了让 js 能够调用 c++库，需要对其进行封装，使它符合某些要求，如对 http_parser 封装为 http_parser_bindings.cpp
- 用 node 提供的编译工具将其编译为.node 文件，于是 js 可以直接 require 这个.node 文件
- binding 是 js 调用 c++库的桥梁

[官方示例](http://nodejs.cn/api/addons.html#addons_function_arguments)

## libuv&v8

### libuv

- libuv 让 nodejs 具备跨平台的异步 IO 能力
- 因为 FreeBSD 系统上有 kqueue、windows 上有 IOCP、Linux 上有 epoll，nodejs 之父 Ryan 为了实现一个跨平台的异步 I/O 库写了 libuv，会根据系统自动选择合适的方案
- 可以用于 TCP/UDP/DNS/文件等异步操作

### v8

- 将 js 源代码变成本地代码并执行
- 维护调用栈，确保 JS 的执行顺序
- 内存管理，为所有对象分配内存
- 垃圾回收，重复利用无用的内存
- 实现 JS 的标准库

注意点：

- v8 不提供 DOM API，dom 是浏览器提供的
- v8 执行 JS 是单线程的
- 可以开启两个线程分别执行 JS
- V8 本身是包含多个线程的，如垃圾回收为单独线程
- 自带 Event Loop，但 nodejs 基于 libuv 实现了一版

## nodejs Event Loop 简述

事件存在优先级，处理起来分先后
操作系统可以触发事件，JS 可以处理事件，Event Loop 就是对事件处理的顺序管理

--

![timers.png](./images/event-loop.png)

- poll 阶段处理大部分的请求
- timers 检查计时器
- poll 轮询，检查系统事件
- check 检查 setImmediate 回调
- 其他阶段用得较少
