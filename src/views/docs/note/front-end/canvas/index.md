---
title: canvas
desc: canvas
keywords: 设计模式、笔记
date: 2020-02-17 01:01:00
cover: https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2020/02/1.jpg
---

# canvas

## 是什么？

canvas 是一个可以使用 js 脚本绘制图形的 HTML 元素

## 什么用处？

可绘制图标、图形、制作图片

## 怎么用？

### 基本用法

1. 准备一个`<canvas id="xxx"></canvas>`标签
1. 获取 dom 对象，`let canvas=document.getElementById('xxx')`
1. 获取 canvas 的渲染上下文，`let ctx=canvas.getContext('2d')`

> canvas 标签没有 src 和 alt，只有 width 和 height 属性
> 可以插入后备内容，支持 canvas 的显示 canvas，不支持的浏览器忽略 canvas，显示插入的后备内容，因此必须闭合

### 绘制形状

1. 栅格
   canvas 元素默认具有网格，一个单元格相当于一个 canvas 像素

![](https://cdn.nlark.com/yuque/0/2020/png/2165937/1608701881543-31456ccf-d71f-49a4-9bc6-6c6738828405.png#align=left&display=inline&height=220&margin=%5Bobject%20Object%5D&originHeight=220&originWidth=220&size=0&status=done&style=none&width=220)

2. 矩形
   canvas 只支持两种形式的图形绘制：矩形和路径（即线段）
   绘制矩形的三种方法：

- `fillRect(x, y, width, height)`
  绘制一个填充的矩形
- `strokeRect(x, y, width, height)`
  绘制一个矩形的边框
- `clearRect(x, y, width, height)`
  清除指定矩形区域，让清除部分完全透明。 3.路径（线段）
- `beginPath()`
  新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- `closePath()`
  绘制完后调用，闭合路径之后图形绘制命令又重新指向到上下文中。
- `stroke()`
  通过线条来绘制图形轮廓。
- `fill()`
  通过填充路径的内容区域生成实心的图形。
  调用了 fill 不需要再调用 closePath，会自动闭合

### 绘制命令

1. `moveTo(x,y)`
   移动笔触,放置相对于左上角起始点的点位
1. `lineTo(x,y)`
   绘制一条从当前位置到指定坐标点的直线
1. `arc(x, y, radius, startAngle, endAngle, anticlockwise)`
   画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。

> 还可以用`arcTo(x1, y1, x2, y2, radius)`，给定点和半径画一个圆弧，再以直线连接两个控制点

4. 二次贝塞尔曲线及三次贝塞尔曲线

- `quadraticCurveTo(cp1x, cp1y, x, y)`
  绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。
- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`
  绘制三次贝塞尔曲线，cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x,y 为结束点。

  5.Path2D
  一个对象，用来缓存或记录绘画命令

```javascript
var ctx = canvas.getContext('2d');
var rectangle = new Path2D();
rectangle.rect(10, 10, 50, 50);

var circle = new Path2D();
circle.moveTo(125, 35);
circle.arc(100, 35, 25, 0, 2 * Math.PI);

ctx.stroke(rectangle);
ctx.fill(circle);
```

6. SVG paths
   新的 Path2D API，使用 SVG path data 来初始化 canvas 路径
   `var p = new Path2D("M10 10 h 80 v 80 h -80 Z");`
   表示先移动到点 (M10 10) 然后再水平移动 80 个单位(h 80)，然后下移 80 个单位 (v 80)，接着左移 80 个单位 (h -80)，再回到起点处 (z)

### 添加样式和颜色

#### 设置颜色

1. fillStyle=color
   设置图形填充颜色
1. strokeStyle=color
   设置图形轮廓颜色
1. Transparency

- 全局透明度：globalAlpha = transparencyValue
- 也可以直接用 rgba 设置透明度

#### 设置线型

1. lineWidth = value
   设置线条宽度。
1. lineCap = type
   设置线条末端样式。
1. lineJoin = type
   设定线条与线条间接合处的样式。
1. miterLimit = value
   限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
1. getLineDash()
   返回一个包含当前虚线样式，长度为非负偶数的数组。
1. setLineDash(segments)
   设置当前虚线样式。
1. lineDashOffset = value
   设置虚线样式的起始偏移量。

#### 设置渐变

1. `createLinearGradient(x1, y1, x2, y2)`
   `createLinearGradient` 方法接受 4 个参数，表示渐变的起点 `(x1,y1)` 与终点 `(x2,y2)`。

`var lineargradient = ctx.createLinearGradient(0,0,150,150);`

2. `createRadialGradient(x1, y1, r1, x2, y2, r2)`

`createRadialGradient` 方法接受 6 个参数，前三个定义一个以 `(x1,y1)` 为原点，半径为 r1 的圆，后三个参数则定义另一个以 `(x2,y2)`为原点，半径为 r2 的圆。

`var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100);`

> 创建出 `canvasGradient` 对象后，可以用 `gradient.addColorStop(position, color)` 上色。

> `addColorStop` 方法接受 2 个参数，`position` 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。`color` 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。

#### 设置图案样式 Patterns

- createPattern(image, type)
  该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。

```javascript
  var ctx = document.getElementById('canvas').getContext('2d');

  // 创建新 image 对象，用作图案
  var img = new Image();
  img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
  img.onload = function() {

    // 创建图案
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);
```

#### 设置阴影 Shadows

1. `shadowOffsetX = float`
   shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
1. `shadowOffsetY = float`
   shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
1. `shadowBlur = float`
   shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
1. `hadowColor = color`
   shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

#### 设置填充规则

用到 fill（或者 clip 和 isPointinPath ）可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充

1. "nonzero"
1. "evenodd"

### 绘制文本

1. fillText(text, x, y [, maxWidth])
   在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
1. strokeText(text, x, y [, maxWidth])
   在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

还有一系列的样式属性：

1. `font = value`
   当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。
1. `textAlign = value`
   文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。
1. `textBaseline = value`
   基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。
1. `direction = value`
   文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。

以及`measureText()`获取文本宽度，返回一个 TextMetrics 对象的宽度、所在像素，这些体现文本特性的属性。

### 操作图片

有多种类型元素可以作为图片的源

1. `HTMLImageElement`
   这些图片是由 Image()函数构造出来的，或者任何的元素
1. `HTMLVideoElement`
   用一个 HTML 的
1. `HTMLCanvasElement`
   可以使用另一个   元素作为你的图片源。
1. `ImageBitmap`
   这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

#### 基本使用：

1. `drawImage(image, x, y, width, height)`

其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。width,height 用来控制缩放

2. drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
   第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它 8 个参数，前 4 个是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小。

> 过度缩放图像会导致图像模糊或像素化，可以通过使用绘图环境的 imageSmoothingEnabled 属性来控制是否在缩放图像时使用平滑算法。默认值为 true，即启用平滑缩放。也可以通过 imageSmoothingEnabled=false 禁用

### 变形

#### 状态的保存和恢复

1. `save()`
   保存画布的所有状态
1. `restore()`
   restore 用来恢复 canvas 状态

#### 变形相关 API

1. 移动`translate(x,y)`
1. `rotate(angle)`
1. `scale(x,y)`
1. `transform(a,b,c,d,e,f)`
   - `a (m11)`
     水平方向的缩放
   - `b(m12)`
     竖直方向的倾斜偏移
   - `c(m21)`
     水平方向的倾斜偏移
   - `d(m22)`
     竖直方向的缩放
   - `e(dx)`
     水平方向的移动
   - `f(dy)`
     竖直方向的移动
1. `setTransform(a,b,c,d,e,f)`
   - 取消了当前变形,然后设置为指定的变形
1. `resetTransform()`，字面意思，重置

### 合成与裁剪

直接看 mdn 效果：[合成与裁剪 mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Compositing)

### 基本动画

步骤：

1. 清空 canvas
   除非接下来要画的内容会完全充满 canvas （例如背景图），否则你需要清空所有。最简单的做法就是用 clearRect 方法。
1. 保存 canvas 状态
   如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。
1. 绘制动画图形（animated shapes）
   这一步才是重绘动画帧。
1. 恢复 canvas 状态
   如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

> 使用 setInterval()、setTimeout()、requestAnimationFrame()操控动画

> requestAnimationFrame()一般每秒钟执行回调 60 次

**具体实践**：[mdn 高级动画](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Advanced_animations)

### 像素操作

- ImageData 对象存储着 canvas 对象真实的像素数据，包含 width、height、data
- 保存图片 toDataURL(imageType,quality)，会创建一个图片分辨率为 96dpi 的数据链接。quality0 到 1

---

#### 参考

- [canvas 教程 MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
