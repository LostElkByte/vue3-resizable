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
import { type CSSProperties, reactive, onMounted, onUnmounted } from 'vue'
import { useDraggable } from '@/hooks/useDraggable'
import { useResizable } from '@/hooks/useResizable'
import { type HandleDirection, type BoxState } from '@/types/resizable.type'

// 最小宽高限制
const minWidth = 50
const minHeight = 50

// 默认的盒子宽高以及位置
const box: BoxState = reactive({
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

// 更新盒子样式的函数
const updateBoxStyle = () => {
  boxStyle.width = `${box.width}px`
  boxStyle.height = `${box.height}px`
  boxStyle.top = `${box.top}px`
  boxStyle.left = `${box.left}px`
}

// 处理盒子拖拽的函数
const { handleDragStart } = useDraggable(box, updateBoxStyle)

// 处理调整大小的函数
const { handleResizeStart } = useResizable(
  box,
  minWidth,
  minHeight,
  updateBoxStyle
)

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
