---
title: 文档示例
description: 支持移动盒子以及通过拖拽边缘或角落来改变尺寸的盒子组件。
---

# 变形盒子

可调整大小的盒子组件允许用户通过拖拽移动位置以及通过拖拽边缘或角落来调整其尺寸，适合用于动态布局或自定义面板。

## 基础用法

使用插槽插入自定义内容，通过拖拽手柄来调整盒子的大小，通过鼠标拖拽盒子的任意位置可以移动盒子到指定的位置。

<preview path="./demo/Resize/Basic.vue" title="基础用法" description="展示Resize组件的基础用法"></preview>

## 自定义尺寸和位置

用户可以通过 `Props` 自定义盒子的最小和最大尺寸，以及初始尺寸和位置。

<preview path="./demo/Resize/CustomSize.vue" title="自定义尺寸和位置" description="为Resize组件自定义尺寸和位置"></preview>

## 显示尺寸和位置

可以通过 `showDimension` 和 `showPosition` 属性来控制是否显示盒子的实时尺寸和位置信息。

<preview path="./demo/Resize/ShowDimension.vue" title="显示尺寸和位置" description="实时展示尺寸和位置信息"></preview>

## 监听盒子更新事件

当盒子的尺寸或位置发生变化时，可以通过监听 `boxUpdated` 事件来获取最新的状态信息。

<preview path="./demo/Resize/BoxUpdated.vue" title="监听盒子更新事件" description="演示如何监听盒子的尺寸和位置信息更新"></preview>

## API

### Attributes

| 属性名        | 说明             | 类型      | 默认值   |
| ------------- | ---------------- | --------- | -------- |
| minWidth      | 盒子最小宽度     | `number`  | 30       |
| minHeight     | 盒子最小高度     | `number`  | 30       |
| maxWidth      | 盒子最大宽度     | `number`  | Infinity |
| maxHeight     | 盒子最大高度     | `number`  | Infinity |
| initialWidth  | 盒子初始宽度     | `number`  | 200      |
| initialHeight | 盒子初始高度     | `number`  | 200      |
| initialTop    | 盒子初始顶部位置 | `number`  | 100      |
| initialLeft   | 盒子初始左侧位置 | `number`  | 100      |
| cssUnit       | 尺寸单位         | `string`  | 'px'     |
| showDimension | 是否显示尺寸信息 | `boolean` | false    |
| showPosition  | 是否显示位置信息 | `boolean` | false    |
| zIndex        | z-index 值       | `number`  | 1        |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 插入自定义内容 |

### Events

| 事件名     | 说明                       | 参数       |
| ---------- | -------------------------- | ---------- |
| boxUpdated | 当盒子尺寸或位置更新时触发 | `BoxState` |

### BoxState 参数

| 参数名   | 类型     | 说明              |
| -------- | -------- | ----------------- |
| `width`  | `number` | 盒子的宽度        |
| `height` | `number` | 盒子的高度        |
| `top`    | `number` | 盒子的顶部位置    |
| `left`   | `number` | 盒子的左侧位置    |
| `zIndex` | `number` | 盒子的 z-index 值 |

### Exposes

| 方法名         | 说明         | 参数         |
| -------------- | ------------ | ------------ |
| updateBoxStyle | 更新盒子样式 | `() => void` |
| startDrag      | 开始拖拽     | `() => void` |
| endDrag        | 拖拽结束     | `() => void` |
| startResize    | 开始调整大小 | `() => void` |
| endResize      | 调整大小结束 | `() => void` |
