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
    <div
      class="content-slot"
      ref="slotRef"
    >
      <slot></slot>
    </div>
    <!-- 循环生成可拖拽的手柄，用于调整盒子大小 -->
    <div
      class="handle"
      v-for="handle in handles"
      :key="handle"
      :style="handleStyle"
      :class="`handle-${handle}`"
      @pan="onResize($event, handle)"
      @panstart="startResize()"
      @panend="endResize()"
    ></div>
    <!-- 实时尺寸/位置信息显示面板 -->
    <div
      v-if="showDimension || showPosition"
      class="dimension"
    >
      <span v-if="showDimension">Size: {{ box.width }} × {{ box.height }}</span>
      <span v-if="showPosition">Top: {{ box.top }}</span>
      <span v-if="showPosition">Left: {{ box.left }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  type CSSProperties,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  nextTick,
} from 'vue'
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
  style?: CSSProperties
  /** 拖拽点样式, 应为一个CSS对象 */
  handleStyle?: CSSProperties
  /** 宽高单位, 可以是 'px' | 'rem' */
  cssUnit?: 'px' | 'rem'
  /** 显示尺寸信息, 默认是false */
  showDimension?: boolean
  /** 显示位置信息, 默认是false */
  showPosition?: boolean
}

// 定义组件接收的props
const props = withDefaults(defineProps<Props>(), {
  minWidth: 30,
  minHeight: 30,
  initialWidth: 200,
  initialHeight: 200,
  initialTop: 100,
  initialLeft: 100,
  cssUnit: 'px',
  showDimension: false,
  showPosition: false,
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

/**
 * 更新盒子样式
 */
const updateBoxStyle = () => {
  boxStyle.width = `${box.width}${props.cssUnit}`
  boxStyle.height = `${box.height}${props.cssUnit}`
  boxStyle.top = `${box.top}px`
  boxStyle.left = `${box.left}px`
}

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

// 导入处理拖拽逻辑的方法
const { startDrag, onDragging, endDrag } = useDraggable(box, updateBoxStyle)

// 响应式引用来存储调整大小函数返回的方法
const startResize = ref<Function>(() => {})
const onResize = ref<Function>(() => {})
const endResize = ref<Function>(() => {})

// 获取插槽容器的DOM
const slotRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // 初始化AnyTouch实例以处理触摸事件
  const at = ref<null | AnyTouch>(null)
  // 组件挂载时，创建AnyTouch实例并应用于resizable-box元素
  const el = document.getElementById('resizable-box') as HTMLElement
  at.value = new AnyTouch(el)

  // 导入处理调整大小的方法
  const resizableMethods = useResizable(
    box,
    props.minWidth,
    props.minHeight,
    props.maxWidth,
    props.maxHeight,
    updateBoxStyle,
    slotRef.value
  )

  // 将调整大小的相应方法赋值给响应式对象,供模板使用
  startResize.value = resizableMethods.startResize
  onResize.value = resizableMethods.onResize
  endResize.value = resizableMethods.endResize

  // 更新盒子尺寸
  updateBoxSizeAfterAllElementsLoad()

  onUnmounted(() => {
    // 组件卸载时，销毁AnyTouch实例以清理资源
    at.value?.destroy()
  })
})

/**
 * 更新盒子尺寸以适应插槽内所有异步加载完成的内容（如图片、视频、iframe）。
 * 使用Vue的nextTick确保DOM更新完成后执行。
 * 检查插槽内所有可能需要异步加载的元素，并为它们添加onload事件监听器（对于图片和iframe）。
 * 对于视频，使用loadeddata事件。一旦所有元素加载完成，更新盒子尺寸。
 */
const updateBoxSizeAfterAllElementsLoad = () => {
  nextTick().then(() => {
    // 获取插槽DOM
    const slotElement = slotRef.value
    if (!slotElement) return
    const asyncElements = slotElement.querySelectorAll('img, video, iframe')
    let elementsToLoad = asyncElements.length

    // 更新盒子尺寸
    const updateSize = () => {
      box.width = slotElement.offsetWidth
      box.height = slotElement.offsetHeight
      updateBoxStyle() // 更新盒子样式的方法
    }

    // 如果没有需要异步加载的元素,直接更新尺寸
    if (elementsToLoad === 0) {
      updateSize()
      return
    }

    // 循环遍历插槽内所有的异步元素
    asyncElements.forEach((element) => {
      // 加载事件方法
      const onLoadOrError = () => {
        elementsToLoad--
        if (elementsToLoad === 0) {
          updateSize()
        }
      }

      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement
        img.onload = onLoadOrError
        img.onerror = onLoadOrError
        // 检查图片是否已经加载
        if (img.complete) onLoadOrError()
      } else if (element.tagName === 'VIDEO') {
        const video = element as HTMLVideoElement
        // 检查视频是否已经加载足够的数据
        if (video.readyState > 0) {
          onLoadOrError()
        } else {
          video.addEventListener('loadeddata', onLoadOrError, { once: true })
        }
      } else if (element.tagName === 'IFRAME') {
        const iframe = element as HTMLIFrameElement
        iframe.onload = onLoadOrError
      }
    })
  })
}
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
  border: 1px solid #4af;
  background-color: #ffffff06;
  box-sizing: content-box;
  z-index: 99999;
}

/* 调整手柄样式: 用于拖拽改变盒子大小 */
.handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #4af;
  border-radius: 50%;
  border: 1px solid #fff;
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

/** 尺寸面板 */
.dimension {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -30px;
  border-radius: 2px;
  padding: 1px 10px;
  background-color: #4af;
  white-space: nowrap;
  font-weight: bold;
  font-size: 12px;
  span {
    font-weight: bold;
  }
  span + span {
    padding-left: 6px;
  }
}

/* 插槽容器样式: 用于自定义内容的布局 */
.content-slot {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
