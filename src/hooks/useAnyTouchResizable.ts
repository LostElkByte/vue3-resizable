// useResizable.ts
import { ref } from 'vue'
import { type HandleDirection, type BoxState } from '@/types/resizable.type'
import { type AnyTouchEvent } from 'any-touch'
/**
 *
 * @param box 盒子宽高以及位置
 * @param minWidth 最小宽度限制
 * @param minHeight 最小高度限制
 * @param updateBoxStyle 动态更新盒子样式的方法
 * @returns
 */
export function useResizable(
  box: BoxState,
  minWidth: number,
  minHeight: number,
  updateBoxStyle: () => void
) {
  const resizing = ref(false)

  const handleResizeStart = (
    event: AnyTouchEvent,
    direction: HandleDirection
  ) => {
    // console.log(event)
    resizing.value = true
    // 存储鼠标初始位置
    let startPosition = { x: event.clientX, y: event.clientY }

    // 根据拖拽方向调整盒子尺寸
    const onResize = (moveEvent: MouseEvent) => {
      if (!resizing.value) return

      const { deltaX: dx, deltaY: dy } = event
      // console.log(dy, '1111111111111111')
      // console.log(moveEvent.clientY - startPosition.y, '22222222222222')

      // 计算鼠标（或触摸点）在拖拽过程中移动的距离 (当前鼠标位置减去初始位置)
      // const dx = moveEvent.clientX - startPosition.x
      // const dy = moveEvent.clientY - startPosition.y

      // 计算尝试调整后的新高度和宽度
      const newHeight = box.height - dy
      const newWidth = box.width - dx

      // 根据不同的方向调整盒子的尺寸，并确保不小于最小尺寸
      switch (direction) {
        case 'top': {
          if (newHeight >= minHeight) {
            // 如果新高度大于等于最小高度，则正常调整
            box.height = newHeight
            box.top += dy
          } else {
            // 如果新高度小于最小高度，则将高度设置为最小高度，并调整top以适应这种改变
            const heightDiff = box.height - minHeight
            box.height = minHeight
            box.top += heightDiff
          }
          console.log('top');
          
          break
        }
        case 'bottom':
          box.height = Math.max(box.height + dy, minHeight)
          console.log('bottom');
          break
        case 'right':
          box.width = Math.max(box.width + dx, minWidth)
          break
        case 'left': {
          if (newWidth >= minWidth) {
            box.width = newWidth
            box.left += dx
          } else {
            const widthDiff = box.width - minWidth
            box.width = minWidth
            box.left += widthDiff
          }
          break
        }
        case 'top-right': {
          if (newHeight >= minHeight) {
            box.height = newHeight
            box.top += dy
          } else {
            const heightDiff = box.height - minHeight
            box.height = minHeight
            box.top += heightDiff
          }

          box.width = Math.max(box.width + dx, minWidth)
          break
        }
        case 'top-left': {
          // 处理高度调整
          if (newHeight >= minHeight) {
            box.height = newHeight
            box.top += dy
          } else {
            const heightDiff = box.height - minHeight
            box.height = minHeight
            box.top += heightDiff
          }

          // 处理宽度调整
          if (newWidth >= minWidth) {
            box.width = newWidth
            box.left += dx
          } else {
            const widthDiff = box.width - minWidth
            box.width = minWidth
            box.left += widthDiff
          }
          break
        }

        case 'bottom-right':
          box.height = Math.max(box.height + dy, minHeight)
          box.width = Math.max(box.width + dx, minWidth)
          break
        case 'bottom-left': {
          // 处理高度调整
          box.height = Math.max(box.height + dy, minHeight)

          // 处理宽度调整
          if (newWidth >= minWidth) {
            box.width = newWidth
            box.left += dx
          } else {
            const widthDiff = box.width - minWidth
            box.width = minWidth
            box.left += widthDiff
          }
          break
        }
      }

      startPosition = { x: moveEvent.clientX, y: moveEvent.clientY }
      updateBoxStyle()
    }

    // 停止调整大小的操作
    const stopResize = () => {
      resizing.value = false
      window.removeEventListener('mousemove', onResize)
      window.removeEventListener('mouseup', stopResize)
    }

    window.addEventListener('mousemove', onResize)
    window.addEventListener('mouseup', stopResize)
  }

  return { handleResizeStart }
}
