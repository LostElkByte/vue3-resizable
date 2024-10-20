import { defineConfig } from "vitepress"
import { fileURLToPath, URL } from "node:url"
import vueJsx from "@vitejs/plugin-vue-jsx"
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vue3-resizable/",
  title: "vue3-resizable",
  description: "一个基于 Vue 3 的组件，提供调整大小和拖动功能。",
  head: [["link", { rel: "icon", href: "/lost-ui/favicon.ico" }]],
  vite: {
    plugins: [vueJsx() as any],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "快速安装", link: "/install" },
      { text: "文档示例", link: "/document" },
    ],

    sidebar: [],

    socialLinks: [
      { icon: "github", link: "https://github.com/LostElkByte/vue3-resizable" },
    ],
  },
})
