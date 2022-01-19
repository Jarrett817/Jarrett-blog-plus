---
title: 设计模式
desc: 《JavaScript设计模式》、《大话设计模式》笔记
keywords: 设计模式、笔记
date: 2020-02-17 01:01:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1.jpg
---

# 设计模式

## 设计模式的利与弊

js 的设计模式有工厂模式、桥接模式、组合模式、门面模式、适配器模式装饰者模式、享元模式、代理模式、观察者模式、命令模式、职责链模式

### 利

- 可维护性。降低模块耦合程度，利于重构、合作和维护
- 沟通。对程序员来说，是一套通用的术语
- 性能。某些起优化作用的设计模式。可以大幅度提高程序的运行速度，减少需要传送到客户端的代码量。如享元模式和代理模式

### 弊

- 复杂性。这是获得可维护性付出的代价，带啊吗会变得更复杂
- 性能。某些模式能提升性能，但多数模式对性能有所拖累，尽管可能是微不足道的，取决于项目的具体需求

### 不要盲目使用设计模式

要保证所选用的模式是最恰当的那一种，不要过度牺牲性能

## 设计模式的原则

### 单一职责原则

::: warning
SRP，就一个类而言，应该仅有一个引起它变化的原因，
如果一个类承担的职责过多，就等于把这些职责耦合在一起，一个职责的变化可能会削弱或者抑制这个类完成其他职责的能力，这种耦合会导致脆弱的设计，当变化发生时，设计会遭受到意想不到的破坏
:::

所以我们在写代码过程中需要有意识地去分离代码，比如样式和逻辑分离

### 开放-封闭原则

软件实体应该可以扩展，但是不可以修改

无论模块是多么的封闭，都会存在一些无法对之封闭的变化。既然不可能完全封闭，设计人员必须对于他设计的模块应该对哪种变化封闭做出选择。他必须先猜测出最可能发生的变化种类，然后构造抽象来隔离那些变化

面对需求，对程序的改动是通过增加信贷吗进行的，而不是更改现有的代码

### 依赖倒转原则

A. 高层模块不应该依赖低层模块。两个都应该依赖抽象
B. 抽象不应该依赖细节。细节应该依赖抽象

比如电脑的主板坏了，如果导致 cpu、内存都坏了，就不合理。同样的，cpu 坏了，导致内存、主板坏了也不合理

### 里氏代换原则

一个软件实体如果使用的是一个父类的话，那么一定适用其子类，而且它察觉不出父类和子类对象的区别。就是说，在软件里面，把父类都替换成它的子类，程序的行为没有变化简单说，子类型必须能够替换掉他们的父类型。

正是由于子类型的可替换性才使得使用父类类型的模块在无需修改的情况下就可以扩展

## 常用的设计模式

### 接口

接口规定某个对象必须有哪些方法，但不规定方法的具体实现
利

- 自我描述性

弊：

- js 没有内置接口，这在一定程度上降低了语言的灵活性

### 闭包

其实就是为了解决曾经 js 没有 let 和 const 时的问题。js 只有函数具有作用域，在函数外部用 var 声明的都是全局变量
​

有个弊端就是直接在 prototype 原型上声明函数，函数会被原型链重复利用，内存中只有一份。但是如果使用闭包的方式需要每次生成新的函数的副本，会耗费更多的内存
并且这种创建模式不利于派生子类，因为派生出的子类不能访问超类的所有私有属性和方法，这被称为继承破坏封装

```javascript
const Book = function (newName) {
  var name;
  this.getName = function () {
    return name;
  };
  this.setName = function (_name) {
    name = _name;
  };
  this.setName(newName);
};

Book.prototype = {
  getProtoName() {
    console.log(this);
    return this.name;
  },
};
const book = new Book('xxxx');
console.log(book.getName());
```

不需要访问私有属性的方法直接在 prototype 中声明，需要访问私有属性的特权方法才需要挂在 this 上。
一般使用直接返回函数就可以了

### 继承

```javascript
// 有这么一个Person类
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};
```

#### 类式继承

```javascript
// 使用的时候通过new
let reader = new Person('xxx');
// reader就可以使用Person的getName方法
reader.getName();
```

#### 原型链继承

```javascript
function Author(name, books) {
  Person.call(this, name);
  this.books = books;
}

// 原型挂成Person，但是构造器方法要用自己的
Author.prototype = new Person();
Author.prototype.constructor = Author;
Author.prototype.getBooks = function () {
  return this.books;
};
```

### 策略模式

定义了算法家族，分别分装起来，让他们之间可以互相替换，此模式让算法的变化，不会影响到使用算法的客户

```ts
abstract class Strategy {
  abstract AlogorithmInterface(): void;
}

class ConcreteStrategyA extends Strategy {
  AlogorithmInterface() {
    consol.log('A算法');
  }
}

class ConcreteStrategyB extends Strategy {
  AlogorithmInterface() {
    console.log('B算法');
  }
}

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }
  ContextInterface() {
    this.strategy.AlogorithmInterface();
  }
}

// 使用
const context = new Context(new ConcreteStrategyA());
context.ContextInterface();
```

其实就是封装多个不同功能的函数，用条件语句去匹配对应的策略，为了避免客户端需要写条件，可以结合简单工厂，将条件匹配放到工厂内

### 观察者模式

又名发布订阅模式
最常见的观察者模式的用途是 dom 的事件监听

```javascript
//使用事件监听器addEventListener
let el = document.querySlector('#id');
let fn1 = function (e) {
  //handle click
};
let fn2 = function (e) {
  //handle click
};
el.addEventListener('click', fn1);
el.addEventListener('click', fn2);
//使用事件处理器
let el = document.querySlector('#id');
let fn1 = function (e) {
  //handle click
};
let fn2 = function (e) {
  //handle click
};
el.onClick = fn1;
el.onClick = fn2;
```

#### 常见实现

有很多实现方式，可以根据业务场景做变换，可以是由发布者来决定订阅者的订阅与否，也可以是订阅者自己决定订阅与否，还可以是订阅者直接从发布者那里主动拉取数据，并且网络上很多言论已经将观察者模式和发布订阅分开来，观察者模式加上一个事件调度中心即是发布订阅模式。以下是观察者模式常见实现

```javascript
class Publisher {
  constructor() {
    this.subscribers = [];
  }
  addSubscriber(subscriber) {
    this.observers.push(observer);
  }

  removeSubscriber(subscriber) {
    let index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notify() {
    this.subscribers.forEach(subscriber => {
      subscriber.update();
    });
  }
}

class Subscriber {
  update() {}

  subscribeTo(publisher) {
    publisher.addSubscriber(this);
  }
}

let publisher = new Publisher();
let subscriber1 = new Subscriber();
let subscriber2 = new Subscriber();
let subscriber3 = new Subscriber();
subscriber1.update = function () {
  console.log('1 update');
};
subscriber2.update = function () {
  console.log('2 update');
};
subscriber3.update = function () {
  console.log('3 update');
};

//测试
subscriber1.subscribeTo(publisher);
subscriber2.subscribeTo(publisher);
subscriber3.subscribeTo(publisher);
```

发布/订阅模式实现，观察者模式是一对多，发布订阅模式是一对一对多（发布者不与观察者直接接触)

```javascript
//订阅者
class Subscriber {
  update() {}
  //update(event){}
  subscribeTo(channel) {
    channel.addSubscriber(this);
  }
}
//中间通道
class Channel {
  constructor() {
    this.subscribers = [];
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  removeSubscriber(subscriber) {
    let index = this.observers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
  publish() {
    //publish(event){
    this.subscribers.forEach(subscriber => {
      subscriber.update();
      //subscriber.update(event)
    });
  }
}
//发布者
class Publisher {
  notify(channel) {
    channel.publish();
    //channel.publish(event)
  }
}

//测试，new一个中间通道对象、发布者对象和三个订阅者对象
let channel = new Channel();
let publisher = new Publisher();

let subscriber1 = new Subscriber();
let subscriber2 = new Subscriber();
let subscriber3 = new Subscriber();

subscriber1.update = function () {
  console.log('1 update');
};
subscriber2.update = function () {
  console.log('2 update');
};
subscriber3.update = function () {
  console.log('3 update');
};
//订阅者向中间通道订阅
subscriber1.subscribeTo(channel);
subscriber2.subscribeTo(channel);
subscriber3.subscribeTo(channel);

//发布者只向中间通道发布事件
publisher.notify(channel);
```

##### 利

比如注册一个事件监听器。借助一个事件监听器去处理各种行为，将信息由一个订阅中心发布，就不需要反复的同样的元素添加各自的事件监听器。利于减少系统开销并提高程序的可维护性

##### 弊

创建被观察对象带来的加载时间开销可能会较大。可以通过懒加载，把新的被观察对象的实例化推迟到需要发送事件通知的时候。

### 建造者模式

讲一个复杂对象的构建与他的表示分离，使得同样的构建过程可以创建不同的表示

```ts
// 画一个小人，需要有头、身体、手脚
abstract class PersonBuilder {
  constructor(graph, pen) {
    this.graph = graph;
    this.pen = pen;
  }
  abstract buildHead(): void;
  abstract buildBody(): void;
  abstract buildArmLeft(): void;
  abstract buildArmRight(): void;
  abstract buildLegLeft(): void;
  abstract buildLegRight(): void;
}

// 瘦人类
class PersonThinBuilder extends PersonBuilder {
  constructor(graph, pen) {
    super(graph, pen);
  }
  buildHead() {}
  buildBody() {}
  buildArmLeft() {}
  buildArmRight() {}
  buildLegLeft() {}
  buildLegRight() {}
}

// 指挥者
class PersonDirector {
  constructor(pb) {
    // 用户需要告诉指挥者要什么样的小人
    this.pb = pb;
  }
  CreatePerson() {
    pb.buildHead();
    pb.buildBody();
    pd.buildArmLeft();
    pd.buildArmRight();
    pd.buildLegLeft();
    pd.buildLegRight();
  }
}
```

### 工厂模式

#### 简单工厂（静态工厂）

以自行车商店为例,商店把生产自行车的工作交给一个外部对象

```javascript
//User类
class User {
  //构造器
  constructor(opt) {
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  //静态方法
  static getInstance(role) {
    switch (role) {
      case 'superAdmin':
        return new User({
          name: '超级管理员',
          viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'],
        });
        break;
      case 'admin':
        return new User({
          name: '管理员',
          viewPage: ['首页', '通讯录', '发现页', '应用数据'],
        });
        break;
      case 'user':
        return new User({
          name: '普通用户',
          viewPage: ['首页', '通讯录', '发现页'],
        });
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user');
    }
  }
}

let superAdmin = User.getInstance('superAdmin');
let admin = User.getInstance('admin');
let normalUser = User.getInstance('user');
```

##### 利

对于构建逻辑简单、相同且都是同种类的对象工厂是合适的

##### 弊

需要添加新的对象种类时，得去修改源代码。只适用于创建对象数量少、创建逻辑不复杂时使用

#### 工厂模式

与简单工厂相比，不是用另一个类来生产对象，而是用一个子类，核心类成了抽象类。
这样添加新的类时就无需修改基础的工厂方法，只需要将子类注册进工厂方法。

```javascript
class FunctionFactoryBase {
  // 抽象类
  constructor(role) {
    if (new.target === FunctionFactoryBase) {
      throw new Error('抽象类不能实例');
    }
    this.role = role;
  }
}

class FunctionFactory1 extends FunctionFactoryBase {
  // 子类
  constructor(role) {
    super(role);
  }

  static create(role) {
    switch (role) {
      case 'admin':
        return new FunctionFactory1({
          role: '管理员',
          permissions: [
            '设置',
            '删除',
            '新增',
            '创建',
            '开发',
            '推送',
            '提问',
            '评论',
          ],
        });
        break;
      case 'developer':
        return new FunctionFactory1({
          role: '开发者',
          permissions: ['开发', '推送', '提问', '评论'],
        });
        break;
      default:
        throw new Error('参数只能为 admin 或 developer');
    }
  }

  show() {
    const { role, permissions } = this.role;
    const str = `是一个${role}, 权限：${permissions.join(', ')}`;
    console.log(str);
  }
}

class FunctionFactory2 extends FunctionFactoryBase {
  // 子类
  constructor(role) {
    super(role);
  }

  static create(role) {
    switch (role) {
      case 'user':
        return new FunctionFactory2({
          role: '用户',
          permissions: ['提问', '评论'],
        });
        break;
      default:
        throw new Error('参数只能为 user');
    }
  }

  show() {
    const { role, permissions } = this.role;
    const str = `是一个${role}, 权限：${permissions.join(', ')}`;
    console.log(str);
  }
}
// let xl = new FunctionFactoryBase();
// 此行会报错，注释后方可正常执行后面

let xm = FunctionFactory1.create('admin');
xm.show();

let xh = FunctionFactory1.create('developer');
xh.show();

let user1 = FunctionFactory2.create('user');
user1.show();
```

这样一来，添加新类无需修改抽象类工厂内源代码，只需要创建一个新的子类（工厂）
基础工厂里定义的是各子工厂抽象方法，子工厂可具体定义各自的行为

缺点在于随着工厂种类越来越多，类会越来越多，增加系统复杂度

#### 抽象工厂模式

工厂模式针对一个产品等级结构、而抽象工厂针对多个产品等级结构
比如，华为手机，可以有 mate、p30 等等子类
但是华为不只做手机，还有电脑、电视，电脑、电视、手机位于不同的产品登记结构，但是他们是由一个工厂生产的，称为产品族

```javascript
//这里汽车厂商作为一个产品族，既可以生产车，也可以生产发动机
class AutomakerFactory {
  createCar() {
    throw new Error('不能调用抽象方法，请自己实现');
  }

  createEngine() {
    throw new Error('不能调用抽象方法，请自己实现');
  }
}
class BenzFactory extends AutomakerFactory {
  createCar() {
    return new BenzCar();
  }

  createEngine() {
    return new BenzEngine();
  }
}

class AudiFactory extends AutomakerFactory {
  createCar() {
    return new AudiCar();
  }

  createEngine() {
    return new AudiEngine();
  }
}
class Car {
  drive() {
    throw new Error('不能调用抽象方法，请自己实现');
  }
}

class BenzCar extends Car {
  drive() {
    console.log('Benz drive');
  }
}

class AudiCar extends Car {
  drive() {
    console.log('Audi drive');
  }
}
class Engine {
  start() {
    throw new Error('不能调用抽象方法，请自己实现');
  }
}

class BenzEngine extends Engine {
  start() {
    console.log('Benz engine start');
  }
}

class AudiEngine extends Engine {
  start() {
    console.log('Audi engine start');
  }
}
let benz = new BenzFactory();
let benzCar = benz.createCar();
let benzEngine = benz.createEngine();

let audi = new AudiFactory();
let audiCar = audi.createCar();
let audiEngine = audi.createEngine();

benzCar.drive(); // Benz drive
benzEngine.start(); // Benz engine start

audiCar.drive(); // Audi drive
audiEngine.start(); // Audi engine start
```

缺点也是随着分类越来越多，定义的类会越来越多，系统复杂度变高

参考：[工厂模式](https://juejin.cn/post/6844903653774458888)、[工厂模式详解](https://juejin.cn/post/6844903895546724366)、js 设计模式、[抽象工厂模式-字节](https://juejin.cn/post/6844904018393710606)

### 装饰者模式

为了避免经常要去修改对象自身代码，我们需要用到装饰者模式
装饰者模式可以给某个对象添加额外的职责，而不会影响该类的派生对象
核心思想是装饰一些东西，但不影响原来的功能，给对象增加一个额外的功能
在前端领域，可以看作在某个函数执行前或者执行后运行一些额外的小功能

- AOP 面向切面编程

```javascript
const AOP = {};
AOP.before = function (fn, before) {
  return function () {
    before.apply(this, arguments);
  };
};

AOP.after = function (fn, after) {
  return function () {
    fn.apply(this, arguments);
    after.apply(this, arguments);
  };
};
```

- es7 decorator

```javascript
const losgWrapper=targetClass=>{
  let originRender = targetClass.prototype.render
  targetClass.prototype.render=function(){
    xxx()
    originRender.apply(this)
    yyyy()
  }
  return targetClass
}

class App{
  constructor(){
    this.title=""
  }
  render(){}
}

App=logWrapper(App)

// es7提案修饰符，可以直接使用@logWrapper装饰，typescript也支持修饰符
@logWrapper
class App{
  ...some code
}
```

- 自行车的例子

```javascript
class Bicycle {
  wash() {
    console.log('清洗');
  }
  ride() {
    console.log('出发');
  }
  getPrice() {
    return 100;
  }
}
class BicycleDecorator {
  constructor(bicycle) {
    this.bicycle = bicycle;
  }
  wash() {
    return this.bicycle.wash();
  }
  ride() {
    return this.bicycle.ride();
  }
  getPrice() {
    return this.bicycle.getPrice();
  }
}
class HeadlightDecorator extends BicycleDecorator {
  constructor(bicycle) {
    super(bicycle);
  }
  getPrice() {
    return this.bicycle.getPrice() + 100;
  }
}

let bicycle = new Bicycle();
console.log(bicycle.getPrice());
bicycle = new HeadlightDecorator(bicycle);
console.log(bicycle.getPrice());

//100
//200
```

### 单例模式

提供一个全局单一的实例，确保所有代码使用同一份全局资源。

- 基本的单例模式

一句话总结就是单体就是一个只能被实例化一次并且可以通过一个众所周知的访问点访问的类
也可以说是一个用来划分命名空间并将一批相关方法和属性组织在一起的对象，如果可以被实例化，智能呗实例化一次

```javascript
let singleTon = {
  name1: 'xxx',
  name2: 'yyy',
  methods1() {},
  method2() {},
};
```

面向对象设计的第一条原则，类可以被拓展，但不能被修改。所以创建完这么一个单体模式，不应该使用 delete 操作符去更改他
对象字面量只是用来创建单体的方式之一
单体通常有两个部分组成，包括方法和属性成员，以及用于访问它的变量
使用单体模式能有效防止方法被不同的人意外改写
​

使用闭包写的单体模式又称为模块模式
​

在数据量较大时，还有一种优化方式是使用惰性实例化，通过创建一个 getInstance()方法，它会去检查单体是否已经被实例化，如果没有才会创建并返回其实例，如果已经实例化，它会返回现有实例。调用方式为 x.getInstace().method()

### 链式调用

jQuery 的设计方式，每次操作都会返回原对象

### 桥接模式

桥接模式能够在不改变调用方式的情况下让 class1 和 class2 独立于 bridgeClass 发生改变

```javascript
let Class1 = function (a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
};

let Class2 = function (d) {
  this.d = d;
};

let BridgeClass = function (a, b, c, d) {
  this.one = new Class1(a, b, c);
  this.two = new Class2(d);
};
```

太抽象。其实可以看成是将汽车的车型和引擎分离，用的时候组装一下

```javascript
// 比如现在有个Car类，有个继承于Car的RefinedCar，构造方法中接受一个Engine对象作为参数，
// 这个Engine作为具体引擎的抽象类
// 使用的时候只需要
const car = new RefinedCar(new HybirdEngine());

//这样一来，可以实现车和引擎的独立开发
```

![image.png](./images/car-engine.png)

### 组合模式

组合模式适合层层嵌套的树状结构
组合模式的层次体系中分为叶对象和组合对象。
​

两种情况下适合使用组合模式

- 存在一批组织成某种层次体系的对象
- 希望对这批对象或其中的一部分对象实施一个操作

### 门面模式

非常常用的模式，主要有两个作用

- 消除类与使用它的客户代码之间的耦合
- 简化类的接口

```javascript
const util = {
  stop() {},
  start() {},
  fire() {},
  drive() {},
};
```

### 适配器模式

用来协调不同的接口。与门面模式看起来相似，实则不同。
它与门面模式的差别在于如何改变接口。门面元素展现的是一个简化的接口，它并不提供额外的选择，有时为了方便完成常见任务还会做出一些嘉定。而适配器则要把一个 pp{}接口转换为另一个接口，并不会滤除。
对函数参数的适配，if else 都是适配器模式的体现

### 享元模式

最适合于解决因创建大量类似对象而累及性能的问题

享元模式用于减少应用程序所需对象的数量。将对象的内部状态划分为内在数据和外在数据

- 内在数据。类的内部方法所需要的信息
- 外在数据。可以从类身上剥离并存储在外部的信息

创建享元对象需要使用工厂。是为了跟踪到已经实例化的各个对象

举例：

```js
// 表示一个城市的所有汽车，需要保存每一辆汽车的详细情况甚至及其所有权的详细情况
const Car = function (year, price) {
  this.year = year;
  this.price = price;
  // 各种详细信息
};
Car.prototype = {
  getYear() {
    return this.year;
  },
  getPrice() {
    return this.price;
  },
};
```

--

数以万计的汽车信息消耗掉了大量资源。为了优化这个问题，需要使用享元模式减少所需对象的数目

首先划分内在状态和外在状态。车子的自然属性输入内在数据，所有权属性属于外在数据。这意味着对于车子来说，品牌、型号和出厂日期的每一种组合，只需要一个汽车对象。对于所有权数据来说，同一个类型的各车主都可以共享一个汽车对象

```js
// 我们需要创建一个工厂来生成汽车
const carFactory = (function () {
  const createdCars = {};
  return {
    createCar(year, price) {
      if (createdClass[year + '-' + price]) {
        //如果汽车实例存在，就直接返回已有的实例
        return createdCars[year + '-' + price];
      } else {
        const car = new Car(year, owner);
        createdCars[year + 'price' + price] = car;
        return car;
      }
    },
  };
})();
```

还需要管理外在状态

```js
// 用一个单体模式封装外在状态数据的管理器
const CarRecordManager = (function () {
  const carRecordDatabase = {};
  return {
    addCarRecord: function (year, price, owner, age) {
      const car = CarFactory.createCar(year, owner);
      carRecordDatabase[owner] = {
        car,
        age,
      };
    },
    // 其他操作
  };
})();
```

从 Car 类剥离的数据都在 CarRecordManage 这个单体的私有属性 carRecordDatabase 中。

这种优化是以复杂性为代价的。原先只有一个汽车类，现在却变成了一个类和两个单体对象。并且把一个数据保存在两个不同的地方这种做法令人困惑，但是能够解决性能，这些无伤大雅。享元模式运用得当能够显著提升程序的性能

管理外在数据有许多方法。之前用到的单体管理器是一种较常见的做法，也可以使用组合模式

示例

```js
// 日历，顺序显示每月中的各天，还会按顺序显示一年中的各个月
const CalendarYear = function (year, parent) {
  this.year = year;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);
  function isLeapYear(y) {
    return y > 0 && !(y % 4) && (y % 100 || !(y % 400));
  }
  this.months = [];
  this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30];
};

CalendarYear.prototype = {
  display: function () {
    for (let i = 0, len = this.months.length; i < len; i++) {
      this.months[i].display();
    }
    this.element.style.display = 'block';
  },
};
const CalendarMonth = function (monthNum, numDays, parent) {
  this.monthNum = monthNum;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);
  for (let i = 0, len = numDays; i < len; i++) {
    this.days[i] = new CalendarDay(i, this.element);
  }
  this.months = [];
  this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30];
};
CalendarMonth.prototype = {
  display: function () {
    for (let i = 0, len = this.days.length; i < len; i++) {
      this.days[i].display();
    }
    this.element.style.display = 'block';
  },
};

const CalendarDay = function (date, parent) {
  this.date = date;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);
};
CalendarDay.prototype = {
  display: function () {
    this.element.style.display = 'block';
    this.element.innerHTML = this.date;
  },
};
```

根据这段代码的实现，我们不得不为一年创建 365 个 CalendarDay 对象。

更有效的做法是无论日历要显示多少年，都只用一个 CalendarDay 对象来代表所有的日期

​ **改造 calendar**

- 第一步，把 CalendarDay 对象转化为享元对象，除去其中所有保存的数据

```js
const CalendarDay = function () {};
CalendarDay.prototype = {
  display: function (date, parent) {
    const element = document.createElement('div');
    parent.appendChild(element);
    element.innerHTML = date;
  },
};
```

这里直接实例化该对象`const calendarDay=new CalendarDay()`

- 第二步，改造 CalendarMonth

```js
// 复合物
const CalendarMonth = function (monthNum, numDays, parent) {
  this.monthNum = monthNum;
  this.element = document.createElement('div');
  this.element.style.display = 'none';
  parent.appendChild(this.element);

  this.days = [];
  for (let i = 0, len = numDays; i < len; i++) {
    this.days[i] = CalendarDay;
  }
};
CalendarMonth.prototype = {
  display: function () {
    for (let i = 0, len = this.days.length; i < len; i++) {
      this.days[i].display(i, this.element);
    }
    this.element.style.display = 'block';
  },
};
```

此例子中，没有像之前的管理器一样使用一个中心数据库，其实其他类也没做什么修改。
这是因为组合对象的数据结构本身就已经包含了所有的外在数据

组合模式和享元模式配合的比较完美的，因为组合对象通常都拥有大量叶对象，它保存着许多可作为外在
数据处理的数据，叶对象通常只包含极少的内在数据，所以容易被
转化为共享资源

> 另外在 js 需要创建大量 html 内容的情况下，享元模式非常有用

::: warning

享元模式的使用条件

- 适合在使用了大量资源密集型对象时使用，如果只是少量对象，那么这样做不划算
- 对象中所保存的数据至少有一部分能被转化为外在数据
- 将外在数据分离出去后，独一无二的对象的数目相对少，最理想的是只存在一个独一无二的对象

:::

#### 一般的实现步骤

1. 剥离所有外在数据
2. 创建一个用来控制该类实例化的工厂。该工厂掌握该类所有已创建出来的独一无二的实例
3. 创建一个用来保存外在数据的管理器。它把内在数据提供给工厂对象以创建一个对象。外在数据则被保存在管理器的一个数据结构中，管理器随后会根据需要将这些数据提供给共享对象的方法

### 代理模式

代理是一个对象，用来控制对另一个对象的访问，具有与另一个对象同样的接口，并会把任何方法调用传递给那个对象

#### 代理如何控制对本体的访问

不实现任何访问控制的代理最简单，只要把所有方法调用都传递到本体

最有用的代理类型是**虚拟代理**。它会讲本体的实例化推迟到有
方法被调用的时候，适合控制常见开销很大的本体的访问

```js
const publicLibraryVirtualProxy = function (catalog) {
  this.library = null;
  this.catalog = catalog;
};
publicLibraryVirtualProxy.prototye = {
  _initializeLibrary: function () {
    if (this.library === null) {
      this.library = new publicLibraryVirtualProxy(this.catalog);
    }
  },
  findBooks: function (searchString) {
    this._initializeLibrary();
    return this.library.findBooks(searchString);
  },
};
```

虚拟代理对于前端程序员来说比较有用，还有其他代理类型

- 远程代理。需要远程对象长期存在，任何时候都可以从任何其他环境中访问。js 不适用是因为，其一是因为 js 的运行时环境不会长期存在，大多数 js 环境都在 web 浏览器中，随着用户的网上冲浪活动，通常每几分钟都会加载或者卸载一次，其二，js 无法建立到另一个运行时环境的套接字连接以访问其变量空间，即使它能长期存在，与此最接近的做法只是用 json 对方法调用进行序列化，然后用 ajax 技术将结果发送给某个资源
- 保护代理。根据客户的身份控制对特定方法的访问。

### 命令模式

用来对方法进行参数化处理和传送

最简的命令对象的结构形式是一个操作和用以调用这个操作的独享的结合体

就是将对象的某个方法再包一层调用，实现调用对象和实现操作对象的分离

### 职责链模式

由多个不同类型的对象组成。使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。

将这个对象连成一条链，直到有一个对象处理它为止

运转流程：

1. 发送者知道链中的第一个接收者，向这个接收者发送请求
2. 每一个接受者都对请求进行分析，要么处理它，要么往下传
3. 每一个接受者知道的其他对象只有一个，即它在链中的下家
4. 如果没有任何接收者处理请求，那么请求将从链上离开，可以报错或者做其他处理

发出请求的客户端并不知道哪一个对象最终处理这个请求，系统的更改可以在不影响客户端的情况下动态地重新组织和分配责任

```ts
// 一个休假申请的例子，先建一个管理者类
abstract class Manager {
  constructor(name: string) {
    this.name = name;
  }
  setSuperior(superior: Manager) {
    // 设置上级
    this.superior = superior;
  }
  abstract requestApplications(request): void;
}

// 再来一个经理类
class commonManager extends Manager {
  constructor(name) {
    super();
    this.name = name;
  }
  requestApplications(request) {
    // 经理只能批准两天内的假期
    if (request.Request === '请假' && request.Number <= 2) {
      console.log('经理批准');
    } else if (superior !== null) {
      superior.RequestApplications(request);
    }
  }
}

// 还有总监类
class Majordomo extends Manager {
  constructor(name) {
    super();
    this.name = name;
  }
  requestApplications(request) {
    if (request.RequestType === '请假' && request.Number <= 5) {
      console.log('总监批准');
    } else if (superior !== null) {
      superior.RequestApplications(request);
    }
  }
}

class GeneralManager extends Manager {
  RequestApplications(request) {
    if (request.RequestType === '请假') {
      console.log('总经理批准请假');
    } else if (request.RequestType === '加薪') {
      console.log('总经理批准加薪');
    }
  }
}

// 使用举例
const jinli = new CommonManager('经理');
const zongjian = new Majordomo('总监');
const zongjingli = new GeneralManager('总经理');
jinli.SetSuperior(zongjian);
zongjian.SetSuperior(zongjingli);

const request = new Request();
request.RequestType = '请假';
request.RequestContent = '小菜请假';
request.Number = 1;
jinli.RequestApplications(request);
// 客户端的申请都是由经理发起，但具体决策者是谁，客户端不知道
```
