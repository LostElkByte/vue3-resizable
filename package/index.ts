import type { App } from "vue"
import LResize from "./LResize.vue"

// 使用install方法，在app.use挂载
LResize.install = (app: App) => {
  app.component(LResize.name as string, LResize)
}

const components = [LResize]
const install = (app: any) => {
  components.map((component) => {
    app.component(component.name, component)
  })
}

export { install, LResize }

export default {
  install,
}
