import { fileURLToPath, URL } from "node:url"
import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./package", import.meta.url)),
    },
  },
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "package/index.ts"),
      name: "LResize",
      fileName: "l-resize",
      formats: ["es"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "any-touch"],
      output: {
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === "style.css") {
            return "index.css"
          }
          return chunkInfo.name as string
        },
      },
    },
  },
})
