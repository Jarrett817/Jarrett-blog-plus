---
title: js
desc: 《JavaScript设计模式》、《大话设计模式》笔记
keywords: 设计模式、笔记
date: 2020-02-17 01:01:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1.jpg
---

# JavaScript

## JS 数据类型

js 数据类型包括四基两空一对象

1. Undefined；
1. Null；
1. Boolean；
1. String；
1. Number；
1. Symbol；
1. Object。

### 两个空类型

#### Undefined

Undefined 类型表示未定义，只有一个值 undefined，任何变量在赋值前都是 Undefined 类型，值为 undefined。
一般可以用全局变量 undefined 直接使用，但是 js 设计上有个失误，undefined 是个变量而不是关键字
即便是 es5 后被改为 read-only，它仍然能被修改

```javascript
const test = () => {
  var undefined = 5;
  console.log(typeof undefined); //輸出number
};
```

使用 void(0)获取 undefined 是更好的做法

#### Null

Null 表示定义了但是为空，也只有一个值 null，但是 null 是 JS 关键字，所以可以放心使用 null 关键字来获取 null 值
null 更准确的说是一个空对象指针，用 typeof 检测返回的是 object
null 可以用来做对象的初始化

### Symbol

ES6 中引入的新原始数据类型，一切非字符串的对象 key 的集合。
Symbol 值通过 Symbol 构造函数生成，生成一个 **全局独一无二的值** ，即便使用相同的字符串作为参数，它们也不相等。这个参数相当于一种描述

```js
let a1 = Symbol('a');
let a2 = Symbol('a');
a1 === a2; //false
```

Symbol 类型可以显式的转换为字符串

```javascript
const sym = Symbol('xxx');
String(sym);
sym.toString();
//ES2019提供了一个实例属性description，可以直接返回描述
sym.description;
```

## 作用域和闭包

### 闭包的概念

- MDN:
  - 函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。也就是说，闭包可以让你**_从内部函数访问外部函数作用域_**。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。
  - 闭包是**_由函数以及声明该函数的词法环境组合而成的_**。
- 阮一峰老师：
  - 闭包就是能够读取其他函数内部变量的函数。可以把闭包简单理解成**_"定义在一个函数内部的函数"_**

总结下来就是闭包是定义在一个函数内部的函数，可以从内部函数访问外部函数作用域，它是由函数以及声明该函数的词法环境组合而成的，包含被引用变量 or 函数的对象

### 变量的作用域

首先明确 JavaScript 中变量的作用域。

分为局部变量和全局变量

```javascript
//Javascript的函数，在内部可以直接读取全局变量。

var n = 999;
function f1() {
  alert(n);
}
f1(); // 999

//另一方面，在函数外部自然无法读取函数内的局部变量。

function f1() {
  var n = 999;
}
alert(n); // error

//这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！

function f1() {
  n = 999;
}
f1();
alert(n); // 999

/*
  于是，为了在外部读取局部变量，我们在函数中再返回一个函数
  result 是执行 f1 时创建的 f2 函数实例的引用。f2 的实例维持了一个对它的词法环境（变量 n 存在于其中）的引用。
  通过调用这个实例，实现了对函数内部变量的访问
  */
function f1() {
  var n = 999;
  function f2() {
    alert(n);
  }
  return f2;
}
var result = f1();
result(); // 999
```

#### 作用域链

作用域链：内部函数访问外部函数的变量，采用的是链式查找的方式来决定取哪个值，这种结构称之为作用域链。查找时，采用的是**_就近原则_**。

```javascript
var num = 10;

function fn() {
  // 外部函数
  var num = 20;

  function fun() {
    // 内部函数
    console.log(num);
  }
  fun();
}
fn();
//结果为20
```

## this

this 指的是，调用函数的那个对象。this 永远指向函数运行时所在的对象。

1. 以函数的形式调用时，this 永远都是 window。比如 fun();相当于 window.fun();
1. 以方法的形式调用时，this 是调用方法的那个对象
1. 以构造函数的形式调用时，this 是新创建的那个对象
1. 使用 call 和 apply 调用时，this 是指定的那个对象

一般的定义函数是运行的时候决定 this 的指向。箭头函数中的 this 是在定义函数的时候绑定，而不是在执行函数的时候绑定。箭头函数没有自己的 this，箭头函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。当对箭头函数使用 call()和 apply()方法时对函数内的 this 没有影响。箭头函数会从自己的作用域链的上一层继承 this

## 闭包的用法

闭包很有用，因为它允许将函数与其所操作的某些数据（环境）关联起来。这显然类似于面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。

因此，通常你使用只有一个方法的对象的地方，都可以使用闭包。

```javascript
/*
可以利用闭包，将具有不同参数的同一功能分别用一个全局变量引用
add5和add10其实就是闭包function(y)
原因就在于makeAdder是function(y)的父函数，而function(y)被赋给了一个全局变量，这导致function(y)始终在内存中，而function(y)的存在依赖于makeAdder，因此makeAdder也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。
*/
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12

/*
编程语言中，比如 Java，是支持将方法声明为共有或者私有（public、private）的，即它们只能被同一个类中的其它方法所调用。
而 JavaScript 没有这种原生支持，但我们可以使用闭包来模拟私有方法。这种方式可称为模块模式
*/
var Counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
//或者不声明为自调用函数
var makeCounter = function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```

#### 应用举例

（1）myModule.js：（定义一个模块，向外暴露多个函数，供外界调用）

```
function myModule() {
    //私有数据
    var msg = 'Smyhvae Haha'

    //操作私有数据的函数
    function doSomething() {
        console.log('doSomething() ' + msg.toUpperCase()); //字符串大写
    }

    function doOtherthing() {
        console.log('doOtherthing() ' + msg.toLowerCase()) //字符串小写
    }

    //通过【对象字面量】的形式进行包裹，向外暴露多个函数
    return {
        doSomething1: doSomething,
        doOtherthing2: doOtherthing
    }
}
```

上方代码中，外界可以通过 doSomething1 和 doOtherthing2 来操作里面的数据，但不让外界看到。

```
（2）index.html:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>05_闭包的应用_自定义JS模块</title>
</head>
<body>
<!--
闭包的应用 : 定义JS模块
  * 具有特定功能的js文件
  * 将所有的数据和功能都封装在一个函数内部(私有的)
  * 【重要】只向外暴露一个包含n个方法的对象或函数
  * 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能
-->
<script type="text/javascript" src="myModule.js"></script>
<script type="text/javascript">
    var module = myModule();
    module.doSomething1();
    module.doOtherthing2();
</script>
</body>
</html>
```

方式二

同样是实现方式一种的功能，这里我们采取另外一种方式。

```
（1）myModule2.js：（是一个立即执行的匿名函数）

(function () {
    //私有数据
    var msg = 'Smyhvae Haha'

    //操作私有数据的函数
    function doSomething() {
        console.log('doSomething() ' + msg.toUpperCase())
    }

    function doOtherthing() {
        console.log('doOtherthing() ' + msg.toLowerCase())
    }

    //外部函数是即使运行的匿名函数，我们可以把两个方法直接传给window对象
    window.myModule = {
        doSomething1: doSomething,
        doOtherthing2: doOtherthing
    }
})()
```

```
（2）index.html：

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>05_闭包的应用_自定义JS模块2</title>
</head>
<body>
<!--
闭包的应用2 : 定义JS模块
  * 具有特定功能的js文件
  * 将所有的数据和功能都封装在一个函数内部(私有的)
  * 只向外暴露一个包信n个方法的对象或函数
  * 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能
-->

<!--引入myModule文件-->
<script type="text/javascript" src="myModule2.js"></script>
<script type="text/javascript">
    myModule.doSomething1()
    myModule.doOtherthing2()
</script>
</body>
</html>
```

## 闭包的作用

由上可见，闭包的作用主要有两个：

- 作用 1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
- 作用 2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)

隐藏局部变量，暴露操作函数

```javascript
function fn1() {
  var a = 2;

  function fn2() {
    a++;
    console.log(a);
  }
  return fn2;
}

var f = fn1(); //执行外部函数fn1，返回的是内部函数fn2
f(); // 3       //执行fn2
f(); // 4       //再次执行fn2

const createAdd = () => {
  let n = 0;
  return () => {
    n += 1;
    console.log(n);
  };
};

const add = createAdd();
add(); // 1
add(); // 2
```

## 闭包的注意点

1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
1. 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

---

参考自[阮一峰 JavaScript 闭包](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)、[mdn 闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)、[qianguyihao  github](https://github.com/qianguyihao/Web)

# 原型和原型链

## 明确一些概念：

#### 什么是堆？什么是栈？

- 堆（heap）是不连续的内存区域，即数据可以任意存放， 主要存放的是对象等。
- 栈（stack）是一块连续的内存区域，每个区块按照一定次序存放（后进先出），栈中主要存放的是基本类型的变量的值以及指向堆中的数组或者对象的地址

#### JS 数据类型

数字 number、字符串 string、boolean 布尔、符号 Symbol、null、undefined、对象 object。

- “类型”是 JS 数据的分类，分 7 种，“类”是针对于对象的分类，有无数种
- 其中又可以分为两类：基本数据类型（非对象）和引用数据类型（对象）。
  - 基本数据类型：数字 number、字符串 string、boolean 布尔、符号 Symbol、null、undefined
  - 引用数据类型：对象 object

基本数据类型存储在栈 stack，引用数据类型存储在堆 heap

## 原型

所有的引用类型（数组、对象、函数）都有`__proto__`这个属性。构造函数拥有`prototype`属性

`prototype`显式原型，`__proto__`隐式原型。
构造函数对象才有 prototype 属性， 实例具有`__proto__`属性,他们指向的都是堆区中的原型对象（`prototype`和`__proto__`保存都是堆区中原型对象的地址，并且是一样的地址，所以`构造函数.prototype===实例对象.__proto__`）

原型对象是所有实例共享的，并且每个实例都可以调用原型上的函数方法

Object.prototype 是所有对象的（直接或者间接）原型，对于数组、函数来说，是间接原型，但是对于对象，是直接原型

所有函数对象都是由 Function 构造的
`函数对象.__proto__===Function.prototype`

构造函数有 Object/Array/Function

## 原型链

实例可以直接调用原型上的属性和方法，如果没有，就去原型的原型里找，再没有，就去原型的原型的原型里找，于是形成了原型链

原型链的终点是 null

JS 世界：
xxx 的原型指的是 xxx 的`__proto__`

首先有一个根对象、一个函数原型、一个数组原型。函数原型和数组原型的原型（`__proto__`）为根对象。

然后创建 Function 构造函数，`__proto__`为函数原型，Function.prototype 也为函数原型（Function 的`prototype`和`__proto__`指向同一对象即函数原型）。

接着开始用 Function 构造 Object 和 Array，分别让他们的 prototype 为根对象和数组原型。至此 JS 世界创建完毕，最后用 window 对象里的三个属性 Object、Array、Function 分别保存指向前面创建的 Object、Array、Function 函数对象

Object.prototype 是由 Function 构造的，但是并不是说 Object 是 Function 构造的，Object.prototype 只是个 Function 构造出来的地址，Function 添加了这个指向 prototype 对象的地址，prototype 指向的对象才是根对象

# 异步和 ajax

## 什么是同步？什么是异步？

能直接拿到结果的是同步，不能直接拿到结果的就是异步

JS 是单线程语言，会优先把同步任务执行完再去执行异步任务。

举例：

```javascript
console.log(1);

setTimeout(function () {
  console.log(2);
}, 1000);

setTimeout(function () {
  console.log(3);
}, 0);

console.log(4);
//依次是1 4 3 2，因为1和4都是同步任务，js碰到异步任务会先挂起，等同步任务执行完再执行异步任务
```

异步的应用场景有：

1. 定时任务：setTimeout（定时执行）、setInterval（循环执行）
1. 网络请求：ajax 请求、动态加载
1. 事件绑定（addEventListener）

## 什么是回调？

提前定义好的一个函数，等着被作为实参传入另一函数，并在该函数内被调用，用以来完成某些任务，一般只要作为参数被调用的函数都称为回调函数。

回调分同步回调和异步回调。在同步函数中作为参数被调用就是同步回调，如果传给异步函数，就是异步回调，当异步函数执行完毕时调用 fn，就能通过回调拿到了异步处理的结果。

```javascript
function employee(telNumber) {
  console.log(`给${telNumber}致电中。。。`);
}
function employer(telNumber, callback) {
  console.log('一会把号码发给你，替我打个电话');
  setTimeout(function () {
    callback(telNumber);
  }, 2000);
}
employer('12345678', employee);
```

## ajax

**Ajax**：Asynchronous Javascript And XML（异步 JavaScript 和 XML）

我们在访问一个普通的网站时，当浏览器加载完 HTML、CSS、JS 以后，网站的内容就固定了。如果想让网站内容发生更改，就必须刷新页面才能够看到更新的内容。

可如果用到异步更新，情况就大为改观了。比如，我们在访问新浪微博时，看到一大半了，点击底部的加载更多，会自动帮我们加载更多的微博，同时页面并没有刷新。

试想一下，如果没有异步刷新的话，每次点击“加载更多”，网页都要刷新，体验就太不好了。

web 前端里的异步更新，就要用到 Ajax。

#### 使用方法

第一步：获取 XMLHttpRequest 对象
`let request=new XMLHttpRequest()`
第二步：设置请求参数
`request.open('GET',xxx)`
第三步：监听对象的状态

```javascript
request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(request.response);
  }
};
```

第四步：发送请求
`request.send()`

#### readyState 状态码

| 值  | 状态             | 描述                                              |
| --- | ---------------- | ------------------------------------------------- |
| 0   | UNSENT           | 代理被创建，但尚未调用 open() 方法。              |
| 1   | OPENED           | open() 方法已经被调用。                           |
| 2   | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得。 |
| 3   | LOADING          | 下载中； responseText 属性已经包含部分数据。      |
| 4   | DONE             | 下载操作已完成。                                  |

ajax 加载示例：

```javascript
getJson.onclick = () => {
  const request = new XMLHttpRequest();
  request.open('GET', '/5.json');
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const obj = JSON.parse(request.response);
      console.log(obj);
      myName.textContent = obj.name;
    }
  };
  request.send();
};
getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open('GET', '/4.xml');
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const dom = request.responseXML;
      const text = dom.getElementsByTagName('warning')[0].textContent;
      console.log(text.trim());
    }
  };
  request.send();
};
getCSS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open('GET', '/style.css');
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const style = document.createElement('style');
        style.innerHTML = request.response;
        document.head.appendChild(style);
      } else {
        console.log('失败');
      }
    }
  };

  request.send();
};
getJS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open('GET', '/2.js');
  request.onload = () => {
    const script = document.createElement('script');
    script.innerHTML = request.response;
    document.body.appendChild(script);
    console.log(request.response);
  };
  request.onerror = () => {};
  request.send();
};
getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open('GET', '/3.html');
  request.onload = () => {
    const div = request.createElement('div');
    div.innerHTML = request.response;
    document.body.appendChild(div);
  };
  request.onerror = () => {};
  request.send();
};
```

# JS 模块化

es6 之前，社区的模块加载方案有 CommonJS（服务器）和 AMD（浏览器）两种。
es6 在语言标准层面上实现了模块功能，取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案

CommonJS 需要在运行时才能确定模块的依赖关系

```javascript
// CommonJS模块
let { stat, exists, readfile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

模块被当成对象使用。
而 es6 模块是静态化的设计思想，模块不是对象，而是通过 `export`  显式导出，再通过 `import`  导入
es6 的模块可以在编译时就完成加载，一个文件就是一个模块

```javascript
import { stat, exists, readFile } from 'fs';
```

## 基本用法

1. export 命令

**导出变量** ：
`export var name='Michael'` 
or

```javascript
let name = 'Michael';
export { name };
```

**导出函数** ：

```javascript
export function multiply(x, y) {
  return x * y;
}
```

     或者也可以使用别名

```javascript
function v1() { ... }
function v2() { ... }
export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

2. `import`  命令

用法和 `export`  一样，但是需要 **注意** ：
`import`  的输入变量都是只读的，但是如果是对象，是可以修改属性的（不要轻易改变）

`import 'xxx'`
会执行所加载的模块，但是不输入任何值

还可以整体加载
`import * as xxx from 'xxx'` 
用 xxx.xxx 进行调用

3. export default 命令

可以不用知道模块的属性和方法，直接重命名导入使用，且不用加花括号，用法基本同上

```javascript
// export-default.js
export default function () {
  console.log('foo');
}
```

```javascript
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

export default 就是输出一个叫做 default 的变量或方法，然后允许任意命名。

但是要注意，一个模块只能有一个默认输出

## 进阶用法

4. import 和 export 复合写法

`export {foo,bar} from 'module';` 
也可改名和整体输出

```javascript
// 接口改名
export { foo as myFoo } from 'my_module';
// 整体输出
export * from 'my_module';
```

还可以具名接口改默认，默认接口改具名

```javascript
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;

export { default as es6 } from './someModule';
```

5. 模块继承

利用复合写法，实现在一个模块中导出另一个模块的属性和方法

6.  跨模块常量

         建如下目录
         -constants
         --db.js
         --user.js
         --index.js

    分别在 db 和 user 中导出各种 const 变量，然后利用复合写法，在 index 中直接导入导出
    这样一来，外部使用时，直接从 index 导入就可以
    `import {xxx} from './constants/index'`

7.  动态加载

前面提到的都是静态加载，只能在模块顶层，不支持条件判断，但是 import 在 es2020 中已经支持了动态加载模块，可以在任何地方使用，是在运行时执行
import(specifier)返回一个 Promise 对象
**适用场景** 
下面是`import()`的一些适用场合。
（1）按需加载。
`import()`可以在需要的时候，再加载某个模块。

```
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

上面代码中，`import()`方法放在`click`事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
（2）条件加载
`import()`可以放在`if`代码块，根据不同的情况，加载不同的模块。

```
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。
（3）动态的模块路径
`import()`允许模块路径动态生成。

```
import(f())
.then(...);
```

上面代码中，根据函数`f`的返回结果，加载不同的模块。

## 浏览器加载 js

**传统方式 **

- `<script src="/a/b/c.js"/>`
- `<script>some code...</script>`

由于 js 单线程的关系，渲染引擎会等到执行完脚本再继续向下渲染。如果是外部脚本，还得算上下载时间

因此如果脚本体积庞大，就会阻塞浏览器，所以浏览器允许异步加载

```javascript
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

- defer: dom 完全生成，以及其他脚本执行完毕，才执行
- async: 一旦下载完，渲染引擎终端渲染，执行此脚本

**注意**  多个 defer 按出现顺序加载，多个 async 不能保证加载顺序

**加载 es6 模块** 
`<script type="module" src="./xxx.js"></script>` 
带有 `type="module"`  的都是异步加载，等到页面渲染完才执行，等同于 defer

需要 **注意** ：模块顶层的 this 返回 undefined，而不是指向 window
可以用来判断是否是 es6 模块 `const isNotModuleScript=this!==undefined`

## ES6 VS CommonJS

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载(对象)，ES6 模块是编译时输出接口（静态定义）。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

#

# Promise、async、await

## Promise

作用：

1. 规范了异步事件处理的写法
1. 避免了出现回调地狱
1. 方便错误捕获

### 什么是回调地狱？

为了获取异步结果而造成的层层嵌套
![回调地狱.png](./images/callback-hell.png)
或是这样

```javascript
function a() {
  function b() {
    function c() {
      function d() {}
      d();
    }
    c();
  }
  b();
}
a();
```

而使用 `Promise` ，就可以优雅地处理异步事件

只要用`return new Promise((resolve,reject)=>{})`就能创建一个异步事件

`Promise`  对象存放着某个未来才会结束的事件。有两个 **特点** ：

1. 对象的状态不受外界影响。 共有三种状态`pending`  `fulfilled`  `rejected`
2. 一旦状态改变，就不会再变，任何时候都可以获得这个结果。状态的改变，只有两种可能：从 `pending`  变为 `fulfilled`  和从 `pending`  变为 `rejected`

### 常见用法

1. 创建 `Promise`  实例

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    //将Promise对象的状态从pending变为resolved
    resolve(value);
  } else {
    //将Promise对象的状态从pending变为rejected
    reject(error);
  }
});
```

2. `Promise.prototype.then `

- 如何使用

  接受两个回调函数。

```javascript
promise.then(
  //resolved状态调用
  function (value) {
    // success
  },
  //rejected状态调用，可选
  function (error) {
    // failure
  }
);
```

- then 的返回值大致有两种情况：

情况 1：返回 Promise 实例对象。返回的该实例对象可调用下一个 then。
情况 2：返回普通值。返回的普通值会直接传递给下一个 then，根据 promise 的状态，通过 then 参数中函数的参数接收该值。 因此，then 可以进行链式调用，避免了层层的回调地狱

### 具体应用  

如 ajax 请求

```javascript
//普通版
const ajax = url => {
  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(request.response);
    }
  };
  request.send();
};
```

```javascript
//Promise版
const ajax=(url)=>{
  return new Promise((resolve,reject)=>{
    let request=new XMLHttpRequest()
    request.open('GET',url)
    request.onreadystatechange=function(){
       if (this.readyState == 4 && this.status == 200) {
          resolve(request.response)
       }else{
          reject(new Error(this.statusText))
       }
    }
    request.send()
  }
}
ajax("/a/b/c").then(
    (resp)=>{
      console.log(resp)},
    (err)=>{
      console.log(err)}
  )
```

### 其他常用的 api

1. `Promise.prototype.catch()`

`reject`  和抛出 `Error`  是等同的，都可以用 `catch`  捕获，但是不能在状态已经变成 `resolved`  后再抛出错误，一般不在 `then()`  方法里定义 reject 状态的回调函数，总是使用 catch 方法
要注意的是， `Promise`  内部的错误不会影响外部代码的执行，只能用 `catch`  捕获

```javascript
// 写法一
const promise = new Promise(function (resolve, reject) {
  try {
    throw new Error('test');
  } catch (e) {
    reject(e);
  }
});
promise.catch(function (error) {
  console.log(error);
});
// 写法二
const promise = new Promise(function (resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function (error) {
  console.log(error);
});
```

2. `Promise.prototype.finally()`

   无论 promise 对象最后的状态如何都会执行回调。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

     简单实现：

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
```

3.  `Promsie.prototype.all() `

         接受一个promise实例的数组，

```javascript
const p = Promise.all([p1, p2, p3]);
```

     p1 p2 p3都为fulfilled，p才会变为fulfilled，此时p1 p2 p3的返回值组成一个数组，传递给p的回调
     若是其中有一个为rejected，p的状态就是rejected，此时第一个被reject的实例的返回值传递给p的回调函数

4. `Promsie.prototype.race()`

   与 all()不同的是，只要有一个实例率先改变状态，p 的状态就跟着改变。率先改变的 Promise 实例的返回值，就传给 p 的回调函数

5. `Promsie.prototype.allSettled() `

接收一组 Promise 实例作为参数，包装成一个新的 Promise，只有等这些实例都返回结果（不管是成功还是失败），包装实例才会结束。生成的新的 Promise 实例，一旦结束，状态总是 fulfilled，它的监听函数会接收到一个数组，每个数组成员对应一个 Promise 实例的结果

```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const allSettledPromise = Promise.allSettled([resolved, rejected]);
allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

6. `Promise.prototype.any()`

也是接受一组`Promise`实例作为参数，包装成一个新的`Promise`实例返回，只要有一个是`fulfilled`，包装实例就是`fulfilled`，如果所有的实例参数都是`rejected`，包装实例就会变成`rejected`
假如接收三个`promise`实例，一个`resolve`，两个`reject`，结果回调中的参数会是成功的结果，如果都是`reject`，结果会是一个数组，每个成员对应一个`rejected`的实例抛出的错误。这个数组是一个`AggregateError`实例

```javascript
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);
Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});
Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
```

7. `Promise.prototype.resolve()`

能将现有对象转为 Promise 对象，参数有四种情况
（1）是一个 Promise 实例，原封不动返回
（2）是一个带有 then 方法的对象。这个对象会被转为 Promise 对象，然后立即执行其中的 then 方法
（3）参数不具有 then 方法，或根本不是对象。会返回一个新的 Promise 对象，状态为 resolved
（4）不带有任何参数。直接返回一个 resolved 状态的 Promise 对象

8. `Promise.prototype.reject()`

返回一个新的状态为 rejected 的 Promise 实例
它的参数，会原封不动地作为 reason 变成后续方法的参数

### Promise 的简单实现

```javascript
class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'resolved';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };
    //返回一个新的promise对象实现链式调用
    return new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        let x = onFulfilled(this.value);
        resolve(x);
      }
      if (this.state === 'rejected') {
        let x = onRejected(this.reason);
        reject(x);
      }
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolve(x);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          reject(x);
        });
      }
    });
  }
}
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('我成功执行了');
  }, 1000);
});
promise1
  .then(onfulFilled => {
    console.log(onfulFilled);
    return onfulFilled;
  })
  .then()
  .then()
  .then(e => {
    console.log(e);
  });
复制代码;
```

## async、await

### Iterator 和 for...of

Iterator 遍历器是一种接口，为不同的数据结构提供统一的访问机制。当使用 for...of 时，会自动去寻找 Iterator 接口。es6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，一个数据结构只要有这个属性，就是可遍历的。
原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

### Generator

这是 es6 提供的一种异步解决方案
在这之前，异步编程的解决方案有

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

Generator 是一个状态机，封装多个内部状态，函数返回一个遍历器对象。
Generator 是分段执行的，每次调用 next 就执行一步，遇到下一个 yield 就停止。
遍历结束时 done 属性会变为 true
next()一下走一步

```javascript
function* doWhat() {
  yield '吃饭';
  return '睡觉';
}
let man = doWhat();
console.log(man.next());
console.log(man.next());
/*
{
  done: false,
  value: "吃饭"
}
{
  done: true,
  value: "睡觉"
}
*/
复制代码;
```

- `function* xxx`和`function *xxx`一样
- yield 将函数截成多个状态
- Generator 不会自己执行，而是返回一个遍历器对象
- 遍历器对象通过.next()方法调用各个状态

**Generator 可用于消息传递**

```javascript
function* x() {
  let x = yield '我启动了！';
  let y = yield x + 3;
  let z = yield y * 3;
  return x * 2;
}
let y = x();
console.log(y.next(1)); // {value: "我启动了！", done: false}
console.log(y.next(2)); // {value: 5, done: false}
console.log(y.next(100)); // {value: 300, done: false}
console.log(y.next(1000)); // {value: 4, done: true}
复制代码;
```

**async、await 就是 Genarator 的语法糖** 
通过 Generator 函数加自动执行器实现，于是不需要一直 next()

```javascript
function f() {
  return new Promise(resolve => {
    resolve('hhh');
  });
}
async function doSomething1() {
  let x = await f();
  console.log(x);
}
doSomething1();
//hhh
复制代码;
```

1. async 修饰符表示这个函数是异步函数
1. await 是个运算符，阻塞后面代码
1. await 如果等到的 Promise 对象就得到其 resolve 值

```javascript
async function doSomething1() {
  let x = await 'hhh';
  return x;
}
console.log(doSomething1());
doSomething1().then(res => {
  console.log(res);
});
//打印结果：
//Promise {<pending>}
//hhh
复制代码;
```

1. async 返回一个 Promise 对象，async 修饰的函数内部返回的值，会成为 then 中回调方法的参数
1. await 如果等到的不是 Promise 对象，就得到一个表达式的运算结果

## Event Loop

# 防抖和节流

## 节流  

规定一个单位时间，这个单位时间内只能有一次触发事件的回调函数执行，如果该时间内事件触发多次，只有一次生效  
代码：

```javascript
function throttle(fn, delay) {
  let canUse = true;
  return function () {
    const _this = this;
    if (canUse) {
      canUse = false;
      setTimeout(() => {
        canUse = true;
        fn.apply(_this, arguments);
      }, delay);
    }
  };
}
```

**适用场景 **
可用于 dom 元素拖拽、高频重复点击提交等等。以下是实现一个可拖动的 div，利用节流来减少回调的执行次数

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
  </head>
  <body>
    <div class="box">拖动我</div>
  </body>
</html>
```

```css
.box {
  background: blue;
  color: white;
  width: 3em;
  line-height: 2em;
  user-select: none;
  position: absolute;
  cursor: move;
}
```

```javascript
let box = document.querySelector('.box');
let down = {
  x: 0,
  y: 0,
};
let move = {};

function throttle(fn, delay) {
  let canUse = true;
  return function () {
    let _this = this;
    if (canUse) {
      canUse = false;
      setTimeout(() => {
        fn.apply(_this, arguments);
        canUse = true;
      }, delay);
    }
  };
}
function moveFn() {
  box.style.left = move.x - down.x + 'px';
  box.style.top = move.y - down.y + 'px';
}
function moveDiv() {
  box.addEventListener('mousedown', e => {
    down.x = e.clientX - box.offsetLeft;
    down.y = e.clientY - box.offsetTop;
    let canMove = true;
    window.addEventListener('mouseup', () => {
      canMove = false;
    });
    let throttled = throttle(moveFn, 50);
    window.addEventListener('mousemove', e => {
      if (canMove === true) {
        move.x = e.clientX;
        move.y = e.clientY;
        throttled();
      }
    });
  });
}

moveDiv();
```

## 防抖

规定一个时间 n，事件触发后在 n 秒后执行回调，如果 n 秒内又被触发，则重新计时
代码：

```javascript
function debounce(fn, delay) {
  let timerId = null;
  return function () {
    const _this = this;
    if (timerId) {
      window.clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(_this, arguments);
      timerId = null;
    }, delay);
  };
}
```

**适用场景** 
如防止表单多次提交、减少 ajax。以下是模拟一个表单，使用防抖减少持续输入过程过程中的冗余提交

```javascript
function debounce(fn, delay) {
  let timerId = null;
  return function () {
    const _this = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(_this, arguments);
      timerId = null;
    }, delay);
  };
}
function submit(val) {
  console.log(val);
}
let text = document.querySelector('#text');
let debounced = debounce(submit, 1000);
text.addEventListener('input', e => {
  debounced(e.target.value);
});
```
