<div align="center">
  <h1>vue3-resizable</h1>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/vue3-resizable">
    <img src="https://img.shields.io/npm/v/vue3-resizable?color=blue" />
  </a>
  <a href="https://github.com/LostElkByte/vue3-resizable/issues">
    <img src="https://img.shields.io/github/issues/LostElkByte/vue3-resizable" />
  </a>
  <a href="https://www.npmjs.com/package/vue3-resizable">
    <img src="https://img.shields.io/npm/dt/vue3-resizable" />
  </a>
  <img src="https://img.shields.io/bundlejs/size/vue3-resizable" />
  <a href="http://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/npm/l/vue3-resizable" />
  </a>
</p>

<div align="center">
  <h4>
    vue3-resizable 是一个基于 Vue 3 的组件库，提供了可调整大小和拖动功能，允许用户通过简单的拖动操作来自定义元素的尺寸和位置。并结合 <a href="https://github.com/any86/any-touch">any-touch</a> 库有效地处理触摸事件，非常适合 PC 以及移动触摸设备。🚀
  </h4>
</div>

🐳 Vue 3 Composition API

🔥 用 TypeScript 编写

## 安装

使用 npm 安装：

```bash
npm install vue3-resizable
```

或者使用 yarn：

```bash
yarn add vue3-resizable
```

## 使用方法

首先，确保在你的 Vue 项目中引入组件：

#### 全局引用

```javascript
import { createApp } from "vue"
import App from "./App.vue"

import LResize from "vue3-resizable"
import "vue3-resizable/dist/index.css"

const app = createApp(App)
app.use(LResize)
app.mount("#app")
```

#### 局部引用

```javascript
import { LResize } from "vue3-resizable"
import "vue3-resizable/dist/index.css"
```

#### 然后，在你的组件中使用它：

```vue
<template>
  <LResize
    :minWidth="100"
    :minHeight="100"
    :maxWidth="300"
    :maxHeight="300"
    :initialWidth="150"
    :initialHeight="150"
    :initialTop="50"
    :initialLeft="50"
    :cssUnit="'px'"
    :showDimension="true"
    :showPosition="true"
  >
    <!-- 你可以在这里插入任何自定义内容 -->
    <div>可调整大小的内容容器</div>
  </LResize>
</template>
```

## Props

| Prop            | 类型                      | 默认值  | 描述             |
| --------------- | ------------------------- | ------- | ---------------- |
| `minWidth`      | `number`                  | `30`    | 最小宽度限制     |
| `minHeight`     | `number`                  | `30`    | 最小高度限制     |
| `maxWidth`      | `number`                  | `无`    | 最大宽度限制     |
| `maxHeight`     | `number`                  | `无`    | 最大高度限制     |
| `initialWidth`  | `number`                  | `200`   | 初始化宽度       |
| `initialHeight` | `number`                  | `200`   | 初始化高度       |
| `initialTop`    | `number`                  | `100`   | 初始化上偏移     |
| `initialLeft`   | `number`                  | `100`   | 初始化左偏移     |
| `cssUnit`       | `'px' \| 'rem' \| string` | `'px'`  | 宽高单位         |
| `showDimension` | `boolean`                 | `false` | 是否显示尺寸信息 |
| `showPosition`  | `boolean`                 | `false` | 是否显示位置信息 |
| `style`         | `CSSProperties`           | `{}`    | 容器样式         |
| `handleStyle`   | `CSSProperties`           | `{}`    | 拖拽点样式       |

## 开发者指南

要参与此组件的开发，你可以克隆源代码仓库，并安装所有依赖：

```bash
git clone https://github.com/LostElkByte/vue3-resizable.git
cd vue3-resizable
npm install
```

## 贡献

欢迎通过发起 Issues 或提交 Pull Requests 来贡献你的代码。请确保你的代码符合项目的代码风格和质量标准。

## 许可证

此项目遵循 MIT 许可证发布。更多信息请查看 `LICENSE` 文件。
