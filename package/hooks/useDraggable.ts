// useDraggable.ts
import { type BoxState } from '../../types/resizable.type'
import { resizing, dragging } from './useSharedState'
import type { AnyTouchEvent } from 'any-touch'

/**
 * 提供元素拖拽功能，允许用户通过拖动来改变元素的位置。
 * @param {BoxState} box - 盒子宽高以及位置
 * @param {Function} updateBoxStyle - 当盒子的位置改变时，用于更新盒子样式的回调函数。
 * @returns {Object} 包含startDrag、onDragging和endDrag方法的对象，用于处理拖拽的开始、进行和结束。
 */
export function useDraggable(box: BoxState, updateBoxStyle: () => void) {
  // 用于跟踪requestAnimationFrame的ID，以便在需要时取消排队的动画帧。
  let frame: number | null = null

  // 拖拽开始
  const startDrag = () => {
    // 设置拖拽状态为true
    dragging.value = true
  }

  // 拖拽过程中
  const onDragging = (event: AnyTouchEvent) => {
    // 如果正在调整大小、未处于拖拽状态，或者已有一个动画帧排队，则不进行处理
    if (resizing.value || !dragging.value || frame) {
      return
    }

    frame = requestAnimationFrame(() => {
      // x轴位移增量+初始left偏移
      box.left += event.deltaX
      // y轴位移增量+初始top偏移
      box.top += event.deltaY
      // 更新盒子位置
      updateBoxStyle()
      // 动画完成后重置frame，允许下一个动画帧排队。
      frame = null
    })
  }

  // 拖拽结束
  const endDrag = () => {
    // 重置调整大小的状态
    dragging.value = false
    // 取消排队的帧，以防止额外的回调执行
    if (frame) {
      cancelAnimationFrame(frame)
      frame = null
    }
  }

  return { startDrag, onDragging, endDrag }
}
