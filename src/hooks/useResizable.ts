// useResizable.ts
import { type HandleDirection, type BoxState } from '@/types/resizable.type'
import type { AnyTouchEvent } from 'any-touch'
import { resizing } from '@/hooks/useSharedState'

/**
 * 根据垂直方向的位移调整盒子的高度和顶部位置。
 * 如果调整后的高度小于最小高度限制，则将高度设置为最小高度，并相应调整顶部位置。
 *
 * @param {number} deltaY 垂直方向上的位移量，向上拖动为负，向下拖动为正。
 * @param {BoxState} box 盒子的当前状态，包括高度和顶部位置。
 * @param {number} minHeight 盒子的最小高度限制。
 */
function adjustHeightAndTop(deltaY: number, box: BoxState, minHeight: number) {
  if (box.height - deltaY >= minHeight) {
    // 如果调整后的高度大于等于最小高度，正常调整高度并更新顶部位置。
    box.height -= deltaY
    box.top += deltaY
  } else {
    // 如果调整后的高度小于最小高度，将高度设置为最小高度，并根据实际变化调整顶部位置。
    const heightDiff = box.height - minHeight
    box.height = minHeight
    box.top += heightDiff
  }
}

/**
 * 根据水平方向的位移调整盒子的宽度和左侧位置。
 * 如果调整后的宽度小于最小宽度限制，则将宽度设置为最小宽度，并相应调整左侧位置。
 *
 * @param {number} deltaX 水平方向上的位移量，向左拖动为负，向右拖动为正。
 * @param {BoxState} box 盒子的当前状态，包括宽度和左侧位置。
 * @param {number} minWidth 盒子的最小宽度限制。
 */
function adjustWidthAndLeft(deltaX: number, box: BoxState, minWidth: number) {
  if (box.width - deltaX >= minWidth) {
    // 如果调整后的宽度大于等于最小宽度，正常调整宽度并更新左侧位置。
    box.width -= deltaX
    box.left += deltaX
  } else {
    // 如果调整后的宽度小于最小宽度，将宽度设置为最小宽度，并根据实际变化调整左侧位置。
    const widthDiff = box.width - minWidth
    box.width = minWidth
    box.left += widthDiff
  }
}

/**
 * 根据拖动方向调整盒子大小。
 * @param {HandleDirection} direction 拖动方向
 * @param {number} deltaX X轴上的位移
 * @param {number} deltaY Y轴上的位移
 * @param {BoxState} box 盒子状态
 * @param {number} minWidth 最小宽度
 * @param {number} minHeight 最小高度
 */
function adjustSize(
  direction: HandleDirection,
  deltaX: number,
  deltaY: number,
  box: BoxState,
  minWidth: number,
  minHeight: number
) {
  // 根据不同的方向调整盒子的尺寸，并确保不小于最小尺寸
  switch (direction) {
    // 处理上方向调整大小
    case 'top':
      adjustHeightAndTop(deltaY, box, minHeight)
      break
    // 处理下方向调整大小
    case 'bottom':
      box.height = Math.max(box.height + deltaY, minHeight)
      break
    // 处理右方向调整大小
    case 'right':
      box.width = Math.max(box.width + deltaX, minWidth)
      break
    // 处理左方向调整大小
    case 'left':
      adjustWidthAndLeft(deltaX, box, minWidth)
      break
    // 处理右上角方向调整大小
    case 'top-right':
      adjustHeightAndTop(deltaY, box, minHeight)
      box.width = Math.max(box.width + deltaX, minWidth)
      break
    // 处理左上角方向调整大小
    case 'top-left':
      adjustHeightAndTop(deltaY, box, minHeight)
      adjustWidthAndLeft(deltaX, box, minWidth)
      break
    // 处理右下角方向调整大小
    case 'bottom-right':
      box.height = Math.max(box.height + deltaX, minHeight)
      box.width = Math.max(box.width + deltaX, minWidth)
      break
    // 处理左下角方向调整大小
    case 'bottom-left':
      box.height = Math.max(box.height + deltaY, minHeight)
      adjustWidthAndLeft(deltaX, box, minWidth)
      break
  }
}

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
  updateBoxStyle: () => void
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
    const deltaX = event.deltaX
    const deltaY = event.deltaY

    // 根据拖动方向调整盒子大小
    adjustSize(direction, deltaX, deltaY, box, minWidth, minHeight)

    // 更新盒子样式
    updateBoxStyle()
  }

  // 调整大小结束
  const endResize = () => {
    resizing.value = false
  }

  return { onResize, startResize, endResize }
}
