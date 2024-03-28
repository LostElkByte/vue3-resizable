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
    <!-- 插槽：用于插入自定义内容 -->
    <div class="content-slot">
      <slot></slot>
    </div>
    <!-- 循环生成可拖拽的手柄，用于调整盒子大小 -->
    <div
      class="handle"
      v-for="handle in handles"
      :key="handle"
      :class="`handle-${handle}`"
      @pan="onResize($event, handle)"
      @panstart="startResize()"
      @panend="endResize()"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, ref, reactive, onMounted, onUnmounted } from 'vue'
// 导入用于触摸事件处理的AnyTouch库
import AnyTouch from 'any-touch'
// 导入自定义钩子：用于实现拖拽和调整大小功能
import { useDraggable } from '@/hooks/useDraggable'
import { useResizable } from '@/hooks/useResizable'
// 导入公共类型定义
import { type HandleDirection, type BoxState } from '@/types/resizable.type'

// 定义组件接收的props
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

// 盒子的尺寸和位置
const box: BoxState = reactive({
  width: props.initialWidth,
  height: props.initialHeight,
  top: props.initialTop,
  left: props.initialLeft,
})

// 盒子样式的响应式对象
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

/**
 * 更新盒子样式
 */
const updateBoxStyle = () => {
  boxStyle.width = `${box.width}px`
  boxStyle.height = `${box.height}px`
  boxStyle.top = `${box.top}px`
  boxStyle.left = `${box.left}px`
}

// 导入处理拖拽逻辑的方法
const { startDrag, onDragging, endDrag } = useDraggable(box, updateBoxStyle)

// 导入处理调整大小的方法
const { startResize, onResize, endResize } = useResizable(
  box,
  props.minWidth,
  props.minHeight,
  updateBoxStyle
)

// 初始化AnyTouch实例以处理触摸事件
const at = ref<null | AnyTouch>(null)

onMounted(() => {
  // 组件挂载时更新盒子样式
  updateBoxStyle()

  // 组件挂载时，创建AnyTouch实例并应用于resizable-box元素
  const el = document.getElementById('resizable-box') as HTMLElement
  at.value = new AnyTouch(el)
})

onUnmounted(() => {
  // 组件卸载时，销毁AnyTouch实例以清理资源
  at.value?.destroy()
})
</script>

<style lang="scss">
/* 主容器样式: 实现可调整大小的盒子的基本布局和外观 */
.resizable-box {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  user-select: none;
  border: 1px dashed #ccc;
}

/* 调整手柄样式: 用于拖拽改变盒子大小 */
.handle {
  position: absolute;
  width: 10px; /* 手柄宽度 */
  height: 10px; /* 手柄高度 */
  background-color: #ccc; /* 手柄背景颜色 */
  z-index: 10; /* 确保手柄在盒子之上 */

  /* 手柄位置样式: 根据手柄的具体位置调整 */
  &-top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
  }
  &-top {
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: ns-resize;
  }
  &-top-right {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
  }
  &-right {
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: ew-resize;
  }
  &-bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
  }
  &-bottom {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: ns-resize;
  }
  &-bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
  }
  &-left {
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: ew-resize;
  }
}

/* 插槽容器样式: 用于自定义内容的布局 */
.content-slot {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
