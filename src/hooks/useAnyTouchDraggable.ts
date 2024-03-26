// useDraggable.ts
import { type BoxState } from '@/types/resizable.type'
/**
 * 拖动
 * @param box 盒子宽高以及位置
 * @param updateBoxStyle 动态更新盒子样式的方法
 * @returns
 */
export function useDraggable(
  box: BoxState,
  updateBoxStyle: (top?: Number, left?: Number) => void
) {
  // 处理盒子拖拽开始的函数
  const onDragging = (event: any) => {
    // x轴位移增量+初始left偏移
    box.left += event.deltaX
    // y轴位移增量+初始top偏移
    box.top += event.deltaY
    // 更新盒子位置
    updateBoxStyle(box.top, box.left)
  }

  return { onDragging }
}
