import { fileURLToPath, URL } from "node:url"
import { resolve } from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./package", import.meta.url)),
    },
  },
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "package/index.ts"),
      name: "LResize",
      fileName: "l-resize",
      formats: ["umd"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 导出时使用命名导出
        exports: "named",
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === "style.css") {
            return "index.css"
          }
          return chunkInfo.name as string
        },
        entryFileNames: "l-resize.umd.js",
      },
    },
  },
})
