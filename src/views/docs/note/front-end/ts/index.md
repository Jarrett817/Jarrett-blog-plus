---
title: node
desc: 《JavaScript设计模式》、《大话设计模式》笔记
keywords: 设计模式、笔记
date: 2020-02-17 01:01:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1.jpg
---

# typescript

## 启用 ts

- webpack+babel

- vite2

- tsc typescript compiler 执行编译，会把 ts 编译成 js

## 类型 type vs 类 class

type js 基本类型 NaN、undefined、string、bool、number、symbol、bigint、object

类比如 Array、Object，都是 object，但需要更准确的区分

ts 类型兼容 js 的类型

## 基本语法

```ts
const a: undefined = undenfined;
const b: null = null;
const c: Object = {};
const d: Array = [];
// 泛型
const d: Array<string | number> = ['1', '2', 5];
// 函数
const add1 = (a: number, b: number): number => a + b;
const add2: (a: number, b: number) => number = (a, b) => a + b;

// interface 声明多个属性
interface xxx {
  (a: number, b: number): number;
  a: string;
}
```

## TS 的类型

```ts
let a: any = 'hi';
// a.name

// unkown需要用断言
// let b:unknown=JSON.parse('{name:'jarrett'}')
(b as { name: string }).name;

const print: () => void = function () {};

// 空集，什么都没有
const c: never = 12;

// 元组，固定长度的数组，ts特有，js可随意改变数组

let x: [number, number] = [100, 200];

// 枚举，一般不用，前端用 type=东|南|西|北 更香
enum Dir {
  东,
  南,
  西,
  北,
}

let d: Dir = Dir.东; //即Dir.东是0
```

## 注意点

- typeof null 会返回 object，错误点

- typeof funtion 会返回 function，但函数也是对象

- class 包括 Array、Function，class 既是 value 也是 type

```ts
class A {}
// A可以被当作值来赋值
const B = A;
// 左侧是类型，右侧是值
const a: A = new A();

// A的类型是object;
```

## 联合类型和交差类型

```ts
type A = {
  name: string;
};
const f = (n: A | string) => {};
A.name.toString();
// 存在问题，不知道何时是什么类型
// 用typeof判断类型再调用api，比如string的toString()
// ts可以在你写条件判断的时候自动推测、收窄类型
if (typeof n === 'string') {
  A.name.toString();
} else {
}
```

```ts
type A = number & string; // never
const a: A = 1; //报错

// 把两个复杂类型合并
type B = { name: string } & { age: number };

// 声明div的类型
let div1: HTMLDivElement;
```

## 泛型

```ts
type A = 'hi' | 123;
type FNumber = F<number>;

const add = (a: number, b: number) => a + b;

type Add<T> = (a: T, b: T) => T;

// T可代表任何类型
const addN: Add<number> = (a, b) => a + b;
const addS: Add<string> = (a, b) => a + b;
```

```ts
// react的例子
type P = {
  name: string;
};
const App: FunctionComponent<P> = props => {
  props.name;
  return <div></div>;
};

// 把泛型当作函数来理解
```

```ts
// 重载
type Add<T> = (a: T, b: T) => T;

const add: Add<number | string> = (a, b) => {
  return a + b;
};

// type Add2 = (a: number, b: number) => number;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    return a + '' + b;
  }
}
```

```ts
// 封装网络请求
type User = {
  id: string | number;
  name: string;
};
type CreateResource = (path: string) => {
  create: (attrs: Omit<Partial<User>, 'id'>) => Promise<Response<User>>;
};
const createResource = (path: string) => {
  return {
    create(attrs: Omit<Partial<User>, 'id'>) {},
    delete() {},
    update() {},
    get() {},
  };
};
var userResource = createFetcher('/api/v1/user');
```
