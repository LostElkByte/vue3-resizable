<template>
  <!-- 可调整大小的盒子，支持通过拖拽边缘或角落来改变尺寸 -->
  <div
    id="resizable-box"
    class="resizable-box"
    :style="[boxStyle, style]"
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

// props 接口
interface Props {
  /** 最小宽度限制, 应 > 0 && < maxWidth && < initialWidth */
  minWidth?: number
  /** 最小高度限制, 应 > 0 && < maxHeight && < initialHeight */
  minHeight?: number
  /** 最大宽度限制, 应 > minWidth && > initialWidth */
  maxWidth?: number
  /** 最大高度限制, 应 > minHeight && > initialHeight */
  maxHeight?: number
  /** 初始化宽度, 应 > 0 && > minWidth && < maxWidth */
  initialWidth?: number
  /** 初始化高度, 应 > 0 && > minHeight && < maxHeight */
  initialHeight?: number
  /** 初始化上偏移 */
  initialTop?: number
  /** 初始化左偏移 */
  initialLeft?: number
  /** 容器样式, 应为一个CSS对象 */
  style?: CSSProperties,
  cssUnit?: 'px' | 'rem'
}

// 定义组件接收的props
const props = withDefaults(defineProps<Props>(), {
  minWidth: 50,
  minHeight: 50,
  initialWidth: 200,
  initialHeight: 200,
  initialTop: 100,
  initialLeft: 100,
  cssUnit: 'px'
})

/**
 * 宽度与高度的边界控制警告
 */
const boundaryWarning = (widthOrHeight: 'Width' | 'Height') => {
  // 最小宽/高、最大宽/高、初始化宽/高需要大于0
  if (
    props[`min${widthOrHeight}`] <= 0 ||
    props[`initial${widthOrHeight}`] <= 0 ||
    (props[`max${widthOrHeight}`] && props[`max${widthOrHeight}`]! <= 0)
  ) {
    console.error(
      'The minimum width/height, maximum width/height, and initial width/height must be greater than 0'
    )
  }
  // 最小高/宽度不能大于初始化高/宽度
  if (props[`min${widthOrHeight}`] > props[`initial${widthOrHeight}`])
    console.error(
      `The min${widthOrHeight} cannot be greater than the initial${widthOrHeight}!`
    )
  // 初始化高/宽度不能大于最大高/宽度
  if (
    props[`max${widthOrHeight}`] &&
    props[`initial${widthOrHeight}`] > props[`max${widthOrHeight}`]!
  )
    console.error('The initialHeight cannot be greater than the maxHeight!')
  // 最小高/宽度不能大于最大高/宽度
  if (
    props[`max${widthOrHeight}`] &&
    props[`min${widthOrHeight}`] > props[`max${widthOrHeight}`]!
  )
    console.error('The minHeight cannot be greater than the maxHeight!')
}

/**
 * 计算初始化高度
 */
const calculateInitialHeight = () => {
  boundaryWarning('Height')
  return Math.min(
    Math.max(props.initialHeight, props.minHeight),
    props.maxHeight || Infinity
  )
}

/**
 * 计算初始化宽度
 */
const calculateInitialWidth = () => {
  boundaryWarning('Width')
  return Math.min(
    Math.max(props.initialWidth, props.minWidth),
    props.maxWidth || Infinity
  )
}

// 盒子的尺寸和位置
const box: BoxState = reactive({
  width: calculateInitialWidth(),
  height: calculateInitialHeight(),
  top: props.initialTop,
  left: props.initialLeft,
})

// 盒子样式的响应式对象
const boxStyle = reactive<CSSProperties>({
  width: `${box.width}${props.cssUnit}`,
  height: `${box.height}${props.cssUnit}`,
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
  boxStyle.width = `${box.width}${props.cssUnit}`
  boxStyle.height = `${box.height}${props.cssUnit}`
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
  props.maxWidth,
  props.maxHeight,
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
