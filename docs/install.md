---
outline: deep
---

# 快速安装

## 安装

#### npm：

```bash
npm install vue3-resizable
```

#### pnpm：

```bash
pnpm install vue3-resizable
```

#### yarn：

```bash
yarn add vue3-resizable
```

#### 浏览器直接引入

直接通过浏览器的 HTML 标签导入 `vue3-resizable`，然后就可以使用全局变量 `LResize` 了。

```html
<head>
  <!-- Import style -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/vue3-resizable/dist/index.css"
  />
  <!-- Import Vue 3 -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="https://unpkg.com/vue3-resizable"></script>
</head>
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

#### 然后，既可在你的组件中使用它：

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
