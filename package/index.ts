import type { App } from 'vue'
import ElkResize from './ElkResize.vue'

// 使用install方法，在app.use挂载
ElkResize.install = (app: App) => {
  app.component(ElkResize.__name as string, ElkResize)
}

export default ElkResize
