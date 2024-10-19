<template>
  <!-- 可调整大小的盒子，支持通过拖拽边缘或角落来改变尺寸 -->
  <div
    ref="resizableBoxRef"
    :class="{ 'resizable-box': true, 'resizable-box__hover': showHandles }"
    :style="[boxStyle, style]"
    @pan="onDragging($event)"
    @panstart="startDrag()"
    @panend="endDrag()"
    @click="showHandles = true"
  >
    <!-- 插槽：用于插入自定义内容 -->
    <div class="content-slot" ref="slotRef">
      <slot></slot>
    </div>
    <!-- 循环生成可拖拽的手柄，用于调整盒子大小 -->
    <template v-if="showHandles">
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
    </template>

    <!-- 实时尺寸/位置信息显示面板 -->
    <div v-if="props.showDimension || props.showPosition" class="dimension">
      <span v-if="props.showDimension">
        Size: {{ box.width }} × {{ box.height }}
      </span>
      <span v-if="props.showPosition">Top: {{ box.top }}</span>
      <span v-if="props.showPosition">Left: {{ box.left }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "ElkResize",
})

import {
  type CSSProperties,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  computed,
  watchEffect,
  watch,
} from "vue"
// 导入用于触摸事件处理的AnyTouch库
import AnyTouch from "any-touch"
// 导入自定义钩子：用于实现拖拽和调整大小功能
import { useDraggable } from "./hooks/useDraggable"
import { useResizable } from "./hooks/useResizable"
// 导入公共类型定义
import { type BoxState } from "./types/resizable.type"
// 导入初始化hooks
import {
  calculateInitialHeight,
  calculateInitialWidth,
  handles,
  updateBoxSizeAfterAllElementsLoad,
} from "./hooks/useInitialize"
// 导入props
import { defaultProps, type Props, type ComputedProps } from "./hooks/useProps"

// 定义props
const props = withDefaults(defineProps<Props>(), defaultProps)

const computedProps = computed<ComputedProps>(() => ({
  minWidth: props.minWidth ?? Infinity,
  minHeight: props.minHeight ?? Infinity,
  maxWidth: props.maxWidth ?? Infinity,
  maxHeight: props.maxHeight ?? Infinity,
  initialWidth: props.initialWidth ?? 0,
  initialHeight: props.initialHeight ?? 0,
  initialTop: props.initialTop ?? 0,
  initialLeft: props.initialLeft ?? 0,
  cssUnit: props.cssUnit ?? "px",
  showDimension: props.showDimension ?? false,
  showPosition: props.showPosition ?? false,
}))

// 定义要发出的事件
const emits = defineEmits<{
  (e: "boxUpdated", value: BoxState): void
}>()

// 盒子的尺寸和位置
const box = reactive<BoxState>({
  width: calculateInitialWidth(computedProps),
  height: calculateInitialHeight(computedProps),
  top: computedProps.value.initialTop!,
  left: computedProps.value.initialLeft!,
})

// 监听 computedProps 的变化
watch(
  computedProps,
  () => {
    box.width = calculateInitialWidth(computedProps)
    box.height = calculateInitialHeight(computedProps)
    box.top = computedProps.value.initialTop!
    box.left = computedProps.value.initialLeft!
  },
  { deep: true }
)

// 盒子样式的响应式对象
const boxStyle = reactive<CSSProperties>({
  width: `${box.width}${computedProps.value.cssUnit}`,
  height: `${box.height}${computedProps.value.cssUnit}`,
  top: `${box.top}px`,
  left: `${box.left}px`,
})

watchEffect(() => {
  boxStyle.width = `${box.width}${computedProps.value.cssUnit}`
  boxStyle.height = `${box.height}${computedProps.value.cssUnit}`
  boxStyle.top = `${box.top}px`
  boxStyle.left = `${box.left}px`
})

// 控制手柄显示的状态
const showHandles = ref(false)

/**
 * 更新盒子样式
 */
const updateBoxStyle = () => {
  boxStyle.width = `${box.width}${computedProps.value.cssUnit}`
  boxStyle.height = `${box.height}${computedProps.value.cssUnit}`
  boxStyle.top = `${box.top}px`
  boxStyle.left = `${box.left}px`
  emits("boxUpdated", { ...box })
}

// 导入处理拖拽逻辑的方法
const { startDrag, onDragging, endDrag } = useDraggable(box, updateBoxStyle)

// 响应式引用来存储调整大小函数返回的方法
const startResize = ref<Function>(() => {})
const onResize = ref<Function>(() => {})
const endResize = ref<Function>(() => {})

// 获取插槽容器的DOM
const slotRef = ref<HTMLElement | null>(null)

// 获取最外层的容器的DOM
const resizableBoxRef = ref<HTMLElement | null>(null)
onMounted(() => {
  // 初始化AnyTouch实例以处理触摸事件
  const at = ref<null | AnyTouch>(null)
  // 组件挂载时，创建AnyTouch实例并应用于resizable-box元素t
  at.value = new AnyTouch(resizableBoxRef.value!)

  // 导入处理调整大小的方法
  const resizableMethods = useResizable(
    box,
    computedProps,
    updateBoxStyle,
    slotRef.value
  )

  // 将调整大小的相应方法赋值给响应式对象,供模板使用
  startResize.value = resizableMethods.startResize
  onResize.value = resizableMethods.onResize
  endResize.value = resizableMethods.endResize

  // 更新盒子尺寸
  updateBoxSizeAfterAllElementsLoad(slotRef.value, box, updateBoxStyle)

  onUnmounted(() => {
    // 组件卸载时，销毁AnyTouch实例以清理资源
    at.value?.destroy()
  })
})

// 监听点击事件，如果点击外部，则隐藏手柄
window.addEventListener("click", (event) => {
  // 使用类型断言将 event.target 转换为 Node
  const target = event.target as Node
  if (resizableBoxRef.value && !resizableBoxRef.value.contains(target)) {
    showHandles.value = false
  }
})

defineExpose({
  box, // 盒子的状态
  updateBoxStyle, // 更新盒子样式的方法
  startDrag, // 开始拖拽的方法
  endDrag, // 拖拽结束的方法
  startResize, // 开始调整大小的方法
  endResize, // 调整大小结束的方法
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
  z-index: 999999;
}

.resizable-box__hover {
  user-select: none;
  outline: 1px solid #4af;
  background-color: #ffffff06;
  box-sizing: content-box;
}

/* 调整手柄样式: 用于拖拽改变盒子大小 */
.handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #4af;
  border-radius: 50%;
  border: 1px solid #fff;
  z-index: 999999; /* 确保手柄在盒子之上 */

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
