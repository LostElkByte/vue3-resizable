# vue3-resizable

vue3-resizable是一个高度可定制的 Vue 组件，允许用户通过拖动其边缘或角落来动态调整容器的大小。它使用 Vue 3 Composition API 构建，并结合 [any-touch](https://github.com/any86/any-touch) 库有效地处理触摸事件，非常适合PC以及移动触摸设备。

## 特性

- **触摸和鼠标支持**: 使用 AnyTouch 处理触摸事件。
- **可自定义的尺寸和位置**: 设置初始尺寸和位置。
- **受限制的调整大小**: 执行最小和最大尺寸限制。
- **自定义样式**: 用 CSS 样式化盒子和手柄。
- **动态 UI 反馈**: 可选显示当前尺寸和位置信息。

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

```javascript
import ElkResize from 'vue3-resizable'
import 'vue3-resizable/style.css'
```

然后，在你的组件中使用它：

```vue
<template>
  <ResizableBox
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
  </ResizableBox>
</template>
```

## Props

| Prop           | 类型                  | 默认值 | 描述                             |
| -------------- | --------------------- | ------ | -------------------------------- |
| `minWidth`     | `number`              | `30`   | 最小宽度限制                     |
| `minHeight`    | `number`              | `30`   | 最小高度限制                     |
| `maxWidth`     | `number`              | `无`   | 最大宽度限制                     |
| `maxHeight`    | `number`              | `无`   | 最大高度限制                     |
| `initialWidth` | `number`              | `200`  | 初始化宽度                       |
| `initialHeight`| `number`              | `200`  | 初始化高度                       |
| `initialTop`   | `number`              | `100`  | 初始化上偏移                     |
| `initialLeft`  | `number`              | `100`  | 初始化左偏移                     |
| `cssUnit`      | `'px' | 'rem' ` | `'px'`| 宽高单位 |
| `showDimension`| `boolean`             | `false`| 是否显示尺寸信息                 |
| `showPosition` | `boolean`             | `false`| 是否显示位置信息                 |
| `style`        | `CSSProperties`       | `{}`   | 容器样式                         |
| `handleStyle`  | `CSSProperties`       | `{}`   | 拖拽点样式                       |

## 开发者指南

要参与此组件的开发，你可以克隆源代码仓库，并安装所有依赖：

```bash
git clone https://your-repository-url.git
cd your-repository-directory
npm install
```

## 贡献

欢迎通过发起 Issues 或提交 Pull Requests 来贡献你的代码。请确保你的代码符合项目的代码风格和质量标准。

## 许可证

此项目遵循 MIT 许可证发布。更多信息请查看 `LICENSE` 文件。




