// useDraggable.ts
import { type BoxState } from '@/types/resizable.type'
import { resizing, dragging } from '@/hooks/useSharedState'
import type { AnyTouchEvent } from 'any-touch'

/**
 * 拖动
 * @param box 盒子宽高以及位置
 * @param updateBoxStyle 动态更新盒子样式的方法
 * @returns
 */
export function useDraggable(box: BoxState, updateBoxStyle: () => void) {
  let frame: number | null = null

  // 拖动开始
  const startDrag = () => {
    dragging.value = true
  }

  // 拖拽中
  const onDragging = (event: AnyTouchEvent) => {
    // 如果在进行调整大小操作、拖动开始状态未生效或者动画ID存在, 禁用拖拽
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
      frame = null
    })
  }

  // 拖动结束
  const endDrag = () => {
    dragging.value = false
    if (frame) {
      cancelAnimationFrame(frame)
      frame = null
    }
  }

  return { startDrag, onDragging, endDrag }
}
