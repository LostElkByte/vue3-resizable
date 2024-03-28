// useDraggable.ts
import { ref } from 'vue'
import { type BoxState } from '@/types/resizable.type'
/**
 * 拖动
 * @param box 盒子宽高以及位置
 * @param updateBoxStyle 动态更新盒子样式的方法
 * @returns
 */
export function useDraggable(box: BoxState, updateBoxStyle: () => void) {
  const dragging = ref(false)
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

  return { handleDragStart }
}
