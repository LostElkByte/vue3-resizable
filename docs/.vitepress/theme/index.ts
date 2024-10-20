// 引入 VitePress 默认主题
import DefaultTheme from "vitepress/theme"

// 从 '@vitepress-demo-preview/component' 包中导入各个 UI 框架的容器组件
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from "@vitepress-demo-preview/component"

// 引入 '@vitepress-demo-preview/component' 包的样式文件
import "@vitepress-demo-preview/component/dist/style.css"

// 引入自定义样式
import "./custom.css"

// 引入组件
import { LResize } from "../../../package/index"

export default {
  // 使用 VitePress 的默认主题
  ...DefaultTheme,

  // 增强 VitePress 应用的方法
  enhanceApp({ app }) {
    // 注册 `demo-preview` 组件，使用 ElementPlusContainer 容器
    app.component("demo-preview", ElementPlusContainer)
    app.component("LResize", LResize)
  },
}
