// useSharedState.ts
import { ref } from 'vue'

// 使用Vue的响应式引用(ref)来跟踪是否正在进行大小调整操作。
// resizing为true表示一个大小调整操作正在进行中，false表示没有进行大小调整操作。
const resizing = ref<boolean>(false)

// 使用Vue的响应式引用(ref)来跟踪是否正在进行拖拽操作。
// dragging为true表示一个拖拽操作正在进行中，false表示没有进行拖拽操作。
const dragging = ref<boolean>(false)

export { resizing, dragging }
