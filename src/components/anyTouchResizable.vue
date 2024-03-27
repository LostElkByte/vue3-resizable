<template>
  <!-- 可调整大小的盒子，支持通过拖拽边缘或角落来改变尺寸 -->
  <div
    id="resizable-box"
    class="resizable-box"
    :style="boxStyle"
    @pan="onDragging($event)"
    @panstart="startDrag()"
    @panend="endDrag()"
  >
    <!-- 插槽容器 -->
    <div class="content-slot">
      <slot></slot>
    </div>
    <!-- 循环创建拖拽手柄 -->
    <div
      class="handle"
      v-for="handle in handles"
      :key="handle"
      :class="`handle-${handle}`"
      @pan="onResize($event, handle)"
      @panstart="startResize()"
      @panend="endResize()"
    ></div>
    <!-- 链接旋转手柄的虚线元素 -->
    <div
      class="dashed-line"
      :style="lineStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  type CSSProperties,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  computed,
} from 'vue'
import AnyTouch from 'any-touch'
import { useDraggable } from '@/hooks/useAnyTouchDraggable'
import { useResizable } from '@/hooks/useAnyTouchResizable'
import { type HandleDirection, type BoxState } from '@/types/resizable.type'

const props = defineProps({
  // 最小宽度限制
  minWidth: {
    type: Number,
    default: 50,
  },
  // 最小高度限制
  minHeight: {
    type: Number,
    default: 50,
  },
  // 初始化宽度
  initialWidth: {
    type: Number,
    default: 200,
  },
  // 初始化高度
  initialHeight: {
    type: Number,
    default: 200,
  },
  // 初始化上偏移
  initialTop: {
    type: Number,
    default: 100,
  },
  // 初始化左偏移
  initialLeft: {
    type: Number,
    default: 100,
  },
})

const rotationDegree = ref(0)

// 默认的盒子宽高以及位置
const box: BoxState = reactive({
  width: props.initialWidth,
  height: props.initialHeight,
  top: props.initialTop,
  left: props.initialLeft,
})

// 动态更新盒子样式的反应性对象
const boxStyle = reactive<CSSProperties>({
  width: `${box.width}px`,
  height: `${box.height}px`,
  top: `${box.top}px`,
  left: `${box.left}px`,
  transform: `rotate(${rotationDegree.value}deg)`,
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
  'rotate',
]

// 计算虚线样式
const lineStyle = computed(() => ({
  transform: `translateX(-50%) rotate(${rotationDegree.value}deg)`,
  transformOrigin: 'bottom',
}))

// 更新盒子样式的函数
const updateBoxStyle = (top: number = box.top, left: number = box.left) => {
  boxStyle.width = `${box.width}px`
  boxStyle.height = `${box.height}px`
  boxStyle.top = `${top}px`
  boxStyle.left = `${left}px`
}

// 处理盒子拖拽的函数
const { startDrag, onDragging, endDrag } = useDraggable(box, updateBoxStyle)

// 处理调整大小的函数
const { startResize, onResize, endResize } = useResizable(
  box,
  props.minWidth,
  props.minHeight,
  updateBoxStyle
)

// AnyTouch实例
const at = ref<null | AnyTouch>(null)

onMounted(() => {
  // 组件挂载时更新盒子样式
  updateBoxStyle()

  const el = document.getElementById('resizable-box') as HTMLElement
  at.value = new AnyTouch(el)
})

onUnmounted(() => {
  // 组件卸载时移除事件监听器，防止内存泄漏
  window.removeEventListener('mousemove', () => {})
  window.removeEventListener('mouseup', () => {})
  at.value?.destroy()
})
</script>

<style lang="scss">
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
  cursor: nwse-resize;
}
.handle-top {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}
.handle-top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}
.handle-right {
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}
.handle-bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}
.handle-bottom {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}
.handle-bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}
.handle-left {
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.handle-rotate {
  position: absolute;
  top: -30px; /* 手柄位于方块中上方 */
  cursor: grab;
}

.dashed-line {
  position: absolute;
  top: -30px; /* 调整以使线的起点位于方块的中上方 */
  left: 50%;
  height: 30px; /* 这是线和手柄之间的距离 */
  border-left: 1px dashed #ccc; /* 创建虚线效果 */
  transform-origin: bottom;
  transform: translateX(-50%); /* 调整线的位置使其居中 */
}

.content {
  user-select: none;
  cursor: default;
  color: #ccc;
}

.content-slot {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
