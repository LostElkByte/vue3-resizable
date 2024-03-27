// useResizable.ts
import { type HandleDirection, type BoxState } from '@/types/resizable.type'
import type { AnyTouchEvent } from 'any-touch'
import { resizing } from '@/hooks/useSharedState'

/**
 * 调整大小
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
  updateBoxStyle: (top?: number, left?: number) => void
) {
  // 调整大小开始
  const startResize = () => {
    resizing.value = true
  }

  // 调整大小中
  const onResize = (event: AnyTouchEvent, direction: HandleDirection) => {
    // 如果调整大小状态未生效 禁用拖拽
    if (!resizing.value) {
      return
    }

    // x/y轴位移增量
    const dx = event.deltaX
    const dy = event.deltaY

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
        break
      }
      case 'bottom':
        box.height = Math.max(box.height + dy, minHeight)
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
      case 'rotate': {
        console.log(111);
        break
      }
    }

    updateBoxStyle(box.top, box.left)
  }

  // 调整大小结束
  const endResize = () => {
    resizing.value = false
  }

  return { onResize, startResize, endResize }
}
