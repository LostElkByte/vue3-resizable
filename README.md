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
     vue3-resizable is a component based on Vue 3 that provides resizing and dragging features, allowing users to customize the size and position of elements through simple drag operations. It effectively handles touch events in combination with the <a href="https://github.com/any86/any-touch">any-touch</a> library, making it suitable for both PC and mobile touch devices. 🚀
  </h4>
  </h4>
</div>

🐳 Vue 3 Composition API

🔥 Written in TypeScript

[English](README.md) · [简体中文](README.ZH.md)

## Installation

Install using npm:

```bash
npm install vue3-resizable
```

Install using pnpm:

```bash
pnpm install vue3-resizable
```

Or using yarn:

```bash
yarn add vue3-resizable
```

## Usage

First, ensure that you import the component in your Vue project:

#### Global Import

```javascript
import { createApp } from "vue"
import App from "./App.vue"

import LResize from "vue3-resizable"
import "vue3-resizable/dist/index.css"

const app = createApp(App)
app.use(LResize)
app.mount("#app")
```

#### Local Import

```javascript
import { LResize } from "vue3-resizable"
import "vue3-resizable/dist/index.css"
```

#### Then, use it in your component:

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
    <!-- You can insert any custom content here -->
    <div>Resizable content container</div>
  </LResize>
</template>
```

## Props

| Prop            | 类型                      | 默认值  | 描述                 |
| --------------- | ------------------------- | ------- | -------------------- |
| `minWidth`      | `number`                  | `30`    | Minimum width limit  |
| `minHeight`     | `number`                  | `30`    | Minimum height limit |
| `maxWidth`      | `number`                  | `none`  | Maximum width limit  |
| `maxHeight`     | `number`                  | `none`  | Maximum height limit |
| `initialWidth`  | `number`                  | `200`   | Initial width        |
| `initialHeight` | `number`                  | `200`   | Initial height       |
| `initialTop`    | `number`                  | `100`   | Initial top offset   |
| `initialLeft`   | `number`                  | `100`   | Initial left offset  |
| `cssUnit`       | `'px' \| 'rem' \| string` | `'px'`  | Size unit            |
| `showDimension` | `boolean`                 | `false` | Show size info       |
| `showPosition`  | `boolean`                 | `false` | Show position info   |
| `style`         | `CSSProperties`           | `{}`    | Container style      |
| `handleStyle`   | `CSSProperties`           | `{}`    | Drag handle style    |

## Developer Guide

To contribute to the development of this component, you can clone the source code repository and install all dependencies:

```bash
git clone https://github.com/LostElkByte/vue3-resizable.git
cd vue3-resizable
npm install
```

## Contribution

Contributions are welcome through Issues or Pull Requests. Please ensure your code follows the project's style and quality standards.

## License

This project is licensed under the MIT License. For more information, please see the LICENSE file.
