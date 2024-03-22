<template>
  <!-- 可调整大小的盒子，支持通过拖拽边缘或角落来改变尺寸 -->
  <div
    class="resizable-box"
    :style="boxStyle"
    @mousedown="handleDragStart"
  >
    <div class="content">拖拽我或角点以调整大小</div>
    <!-- 循环创建拖拽手柄 -->
    <div
      class="handle"
      v-for="handle in handles"
      :key="handle"
      :class="`handle-${handle}`"
      @mousedown.stop.prevent="handleResizeStart($event, handle)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, ref, reactive, onMounted, onUnmounted } from 'vue'

// 定义手柄方向的类型
type HandleDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

// 最小宽高限制
const minWidth = 50
const minHeight = 50

// 默认的盒子宽高以及位置
const box = reactive({
  width: 200,
  height: 200,
  top: 100,
  left: 100,
})

// 动态更新盒子样式的反应性对象
const boxStyle = reactive<CSSProperties>({
  width: `${box.width}px`,
  height: `${box.height}px`,
  top: `${box.top}px`,
  left: `${box.left}px`,
})

// 手柄方向数组，用于v-for循环
const handles: HandleDirection[] = [
  'top-left',
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
]

// 标记是否正在调整大小
const resizing = ref(false)
// 标记是否正在拖拽
const dragging = ref(false)

// 更新盒子样式的函数
const updateBoxStyle = () => {
  boxStyle.width = `${box.width}px`
  boxStyle.height = `${box.height}px`
  boxStyle.top = `${box.top}px`
  boxStyle.left = `${box.left}px`
}

// 处理盒子拖拽开始的函数
const handleDragStart = (event: MouseEvent) => {
  dragging.value = true
  // 存储鼠标初始位置
  const startPosition = {
    x: event.clientX - box.left,
    y: event.clientY - box.top,
  }

  // 进行拖动
  const onDragging = (moveEvent: MouseEvent) => {
    if (!dragging.value) return
    box.left = moveEvent.clientX - startPosition.x
    box.top = moveEvent.clientY - startPosition.y
    updateBoxStyle()
  }

  // 停止拖动
  const stopDrag = () => {
    dragging.value = false
    window.removeEventListener('mousemove', onDragging)
    window.removeEventListener('mouseup', stopDrag)
  }

  window.addEventListener('mousemove', onDragging)
  window.addEventListener('mouseup', stopDrag)
}

// 处理调整大小开始
const handleResizeStart = (event: MouseEvent, direction: HandleDirection) => {
  resizing.value = true

  // 存储鼠标初始位置
  let startPosition = { x: event.clientX, y: event.clientY }

  // 根据拖拽方向调整盒子尺寸
  const onResize = (moveEvent: MouseEvent) => {
    if (!resizing.value) return

    // 计算鼠标（或触摸点）在拖拽过程中移动的距离 (当前鼠标位置减去初始位置)
    const dx = moveEvent.clientX - startPosition.x
    const dy = moveEvent.clientY - startPosition.y

    // 计算尝试调整后的新高度和宽度
    const newHeight = box.height - dy
    const newWidth = box.width - dx

    // 根据不同的方向调整盒子的尺寸，并确保不小于最小尺寸
    switch (direction) {
      case 'top': {
        if (newHeight >= minHeight) {
          // 如果新高度大于等于最小高度，则正常调整
          box.height = newHeight
          box.top += dy
        } else {
          // 如果新高度小于最小高度，则将高度设置为最小高度，并调整top以适应这种改变
          const heightDiff = box.height - minHeight
          box.height = minHeight
          box.top += heightDiff
        }
        break
      }
      case 'bottom':
        box.height = Math.max(box.height + dy, minHeight)
        break
      case 'right':
        box.width = Math.max(box.width + dx, minWidth)
        break
      case 'left': {
        if (newWidth >= minWidth) {
          box.width = newWidth
          box.left += dx
        } else {
          const widthDiff = box.width - minWidth
          box.width = minWidth
          box.left += widthDiff
        }
        break
      }
      case 'top-right': {
        if (newHeight >= minHeight) {
          box.height = newHeight
          box.top += dy
        } else {
          const heightDiff = box.height - minHeight
          box.height = minHeight
          box.top += heightDiff
        }

        box.width = Math.max(box.width + dx, minWidth)
        break
      }
      case 'top-left': {
        // 处理高度调整
        if (newHeight >= minHeight) {
          box.height = newHeight
          box.top += dy
        } else {
          const heightDiff = box.height - minHeight
          box.height = minHeight
          box.top += heightDiff
        }

        // 处理宽度调整
        if (newWidth >= minWidth) {
          box.width = newWidth
          box.left += dx
        } else {
          const widthDiff = box.width - minWidth
          box.width = minWidth
          box.left += widthDiff
        }
        break
      }

      case 'bottom-right':
        box.height = Math.max(box.height + dy, minHeight)
        box.width = Math.max(box.width + dx, minWidth)
        break
      case 'bottom-left': {
        // 处理高度调整
        box.height = Math.max(box.height + dy, minHeight)

        // 处理宽度调整
        if (newWidth >= minWidth) {
          box.width = newWidth
          box.left += dx
        } else {
          const widthDiff = box.width - minWidth
          box.width = minWidth
          box.left += widthDiff
        }
        break
      }
    }

    startPosition = { x: moveEvent.clientX, y: moveEvent.clientY }
    updateBoxStyle()
  }

  // 停止调整大小的操作
  const stopResize = () => {
    resizing.value = false
    window.removeEventListener('mousemove', onResize)
    window.removeEventListener('mouseup', stopResize)
  }

  window.addEventListener('mousemove', onResize)
  window.addEventListener('mouseup', stopResize)
}

onMounted(() => {
  // 组件挂载时更新盒子样式
  updateBoxStyle()
})

onUnmounted(() => {
  // 组件卸载时移除事件监听器，防止内存泄漏
  window.removeEventListener('mousemove', () => {})
  window.removeEventListener('mouseup', () => {})
})
</script>

<style scoped>
.resizable-box {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  user-select: none;
  border: 1px dashed #ccc;
}

.handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ccc;
  z-index: 10;
}

.handle-top-left {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}
.handle-top {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: n-resize;
}
.handle-top-right {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}
.handle-right {
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: e-resize;
}
.handle-bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}
.handle-bottom {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: s-resize;
}
.handle-bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}
.handle-left {
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: w-resize;
}

.content {
  user-select: none;
  cursor: default;
  color: #ccc;
}
</style>
