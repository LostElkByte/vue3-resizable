// useResizable.ts
import { type HandleDirection, type BoxState } from "../types/resizable.type"
import type { AnyTouchEvent } from "any-touch"
import { resizing } from "../hooks/useSharedState"
import type { ComputedRef } from "vue"
import type { ComputedProps } from "./useProps"

/**
 * 根据垂直方向的位移调整盒子的高度和顶部位置
 * 根据给定的垂直位移量(deltaY)，更新盒子的高度，同时确保新的高度不小于最小高度限制，不超过最大高度限制（如果有）
 * 并且相应调整顶部位置
 *
 * @param {number} deltaY - 垂直方向上的位移量，向上拖动为负，向下拖动为正
 * @param {BoxState} box - 盒子的当前状态，包括高度和顶部位置
 * @param {number} minHeight - 盒子的最小高度限制
 * @param {number | undefined} maxHeight - 最大高度
 * @param {number | undefined} slotRef - 插槽容器DOM
 */
function adjustHeightAndTop(
  deltaY: number,
  box: BoxState,
  minHeight: number,
  maxHeight: number | undefined,
  cssUnit: "px" | "rem" | string,
  slotRef: HTMLElement | null
) {
  // 即将要调整到的高度
  const newHeight = box.height - deltaY

  // 如果即将要调整到的高度大于等于最小高度 或 小于等于最大高度，正常调整高度并更新顶部位置
  if (newHeight >= minHeight && newHeight <= (maxHeight || Infinity)) {
    box.height = newHeight

    // 如果插槽内容存在,更新插槽内容的宽度
    if (slotRef) {
      const child = slotRef.children[0] as HTMLElement
      child.style.height = `${newHeight}${cssUnit}`
    }

    box.top += deltaY
    return
  }

  // 如果即将要调整到的高度大于最大高度, 将高度设置为最大高度, 并根据实际变化调整顶部位置
  if (maxHeight && newHeight > maxHeight) {
    const heightDiff = maxHeight - box.height
    box.height = maxHeight

    // 如果插槽内容存在,更新插槽内容的宽度
    if (slotRef) {
      const child = slotRef.children[0] as HTMLElement
      child.style.height = `${maxHeight}px`
    }

    box.top -= heightDiff
    return
  }

  // 如果即将要调整到的高度小于最小高度，将高度设置为最小高度，并根据实际变化调整顶部位置
  if (newHeight < minHeight) {
    const heightDiff = box.height - minHeight
    box.height = minHeight

    // 如果插槽内容存在,更新插槽内容的宽度
    if (slotRef) {
      const child = slotRef.children[0] as HTMLElement
      child.style.height = `${minHeight}px`
    }

    box.top += heightDiff
  }
}

/**
 * 根据水平方向的位移调整盒子的宽度和左侧位置
 * 根据给定的水平位移量(deltaX)，更新盒子的宽度，同时确保新的宽度不小于最小宽度限制，不超过最大宽度限制（如果有）
 * 并且相应调整左侧位置
 *
 * @param {number} deltaX - 水平方向上的位移量，向左拖动为负，向右拖动为正
 * @param {BoxState} box - 盒子的当前状态，包括宽度和左侧位置
 * @param {number} minWidth - 盒子的最小宽度限制
 * @param {number | undefined} maxWidth - 最大高度
 * @param {number | undefined} slotRef - 插槽容器DOM
 */
function adjustWidthAndLeft(
  deltaX: number,
  box: BoxState,
  minWidth: number,
  maxWidth: number | undefined,
  cssUnit: "px" | "rem" | string,
  slotRef: HTMLElement | null
) {
  // 即将要调整到的宽度
  const newWidth = box.width - deltaX
  // 如果即将要调整到的宽度大于等于最小宽度 或 小于等于最大宽度，正常调整宽度并更新左侧位置
  if (newWidth >= minWidth && newWidth <= (maxWidth || Infinity)) {
    box.width = newWidth
    // 如果插槽内容存在,更新插槽内容的宽度
    if (slotRef) {
      const child = slotRef.children[0] as HTMLElement
      child.style.width = `${newWidth}px`
    }
    box.left += deltaX
    return
  }

  // 如果即将要调整到的宽度大于最大宽度, 将宽度设置为最大宽度, 并根据实际变化调整左侧位置
  if (maxWidth && newWidth > maxWidth) {
    const widthDiff = maxWidth - box.width
    box.width = maxWidth
    // 如果插槽内容存在,更新插槽内容的宽度
    if (slotRef) {
      const child = slotRef.children[0] as HTMLElement
      child.style.width = `${maxWidth}${cssUnit}`
    }
    box.left -= widthDiff
    return
  }

  // 如果即将要调整到的宽度小于最小宽度，将宽度设置为最小宽度，并根据实际变化调整左侧位置
  if (newWidth < minWidth) {
    const widthDiff = box.width - minWidth
    box.width = minWidth
    if (slotRef) {
      const child = slotRef.children[0] as HTMLElement
      child.style.width = `${minWidth}px`
    }
    box.left += widthDiff
  }
}

/**
 * 根据水平方向的位移调整盒子的宽度
 * 根据给定的水平位移量(deltaX)，更新盒子的宽度，同时确保新的宽度不小于最小宽度限制，不超过最大宽度限制（如果有）
 *
 * @param {BoxState} box - 包含盒子当前状态的对象，包括宽度等属性
 * @param {number} deltaX - 水平方向上的位移量. 正值表示增加宽度，负值表示减少宽度
 * @param {number} minWidth - 盒子允许的最小宽度
 * @param {number | undefined} maxWidth - 盒子允许的最大宽度. 如果未定义，则不限制最大宽度
 * @param {number | undefined} slotRef - 插槽容器DOM
 */
function adjustWidth(
  box: BoxState,
  deltaX: number,
  minWidth: number,
  maxWidth: number | undefined,
  cssUnit: "px" | "rem" | string,
  slotRef: HTMLElement | null
) {
  // 即将要调整的宽度
  let newWidth = box.width + deltaX

  // 保证不小于最小宽度
  newWidth = Math.max(newWidth, minWidth)

  if (maxWidth) {
    // 保证不超过最大宽度
    newWidth = Math.min(newWidth, maxWidth)
  }

  // 更新盒子宽度
  box.width = newWidth

  // 如果插槽内容存在,更新插槽内容的宽度
  if (slotRef) {
    const child = slotRef.children[0] as HTMLElement
    child.style.width = `${newWidth}${cssUnit}`
  }
}

/**
 * 根据水平方向的位移调整盒子的高度
 * 根据给定的垂直位移量(deltaY)，更新盒子的高度，同时确保新的高度不小于最小高度限制，不超过最大高度限制（如果有）
 *
 * @param {BoxState} box - 包含盒子当前状态的对象，包括高度等属性
 * @param {number} deltaY - 垂直方向上的位移量. 正值表示增加高度，负值表示减少高度
 * @param {number} minHeight - 盒子允许的最小高度
 * @param {number | undefined} maxHeight - 盒子允许的最大高度.如果未定义，则不限制最大高度
 * @param {number | undefined} slotRef - 插槽容器DOM
 */
function adjustHeight(
  box: BoxState,
  deltaY: number,
  minHeight: number,
  maxHeight: number | undefined,
  cssUnit: "px" | "rem" | string,
  slotRef: HTMLElement | null
) {
  // 即将要调整到的高度
  let newHeight = box.height + deltaY

  // 保证不小于最小高度
  newHeight = Math.max(newHeight, minHeight)

  if (maxHeight) {
    // 保证不超过最大高度
    newHeight = Math.min(newHeight, maxHeight)
  }

  // 更新盒子高度
  box.height = newHeight

  // 如果插槽内容存在,更新插槽内容的宽度
  if (slotRef) {
    const child = slotRef.children[0] as HTMLElement
    child.style.height = `${newHeight}${cssUnit}`
  }
}

/**
 * 根据拖动方向调整盒子大小
 * @param {HandleDirection} direction - 拖动方向
 * @param {number} deltaX - X轴上的位移
 * @param {number} deltaY - Y轴上的位移
 * @param {BoxState} box - 盒子状态
 * @param {ComputedRef<ComputedProps>} - 包含最大最小宽高限制
 * @param {number | undefined} slotRef - 插槽容器DOM
 */
function adjustSize(
  direction: HandleDirection,
  deltaX: number,
  deltaY: number,
  box: BoxState,
  computedProps: ComputedRef<ComputedProps>,
  slotRef: HTMLElement | null
) {
  // 根据不同的方向调整盒子的尺寸，并确保不小于最小尺寸
  switch (direction) {
    // 处理上方向调整大小
    case "top":
      adjustHeightAndTop(
        deltaY,
        box,
        computedProps.value.minHeight!,
        computedProps.value.maxHeight,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
    // 处理下方向调整大小
    case "bottom":
      adjustHeight(
        box,
        deltaY,
        computedProps.value.minHeight!,
        computedProps.value.maxHeight,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
    // 处理右方向调整大小
    case "right":
      adjustWidth(
        box,
        deltaX,
        computedProps.value.minWidth!,
        computedProps.value.maxWidth,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
    // 处理左方向调整大小
    case "left":
      adjustWidthAndLeft(
        deltaX,
        box,
        computedProps.value.minWidth!,
        computedProps.value.maxWidth,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
    // 处理右上角方向调整大小
    case "top-right":
      adjustHeightAndTop(
        deltaY,
        box,
        computedProps.value.minHeight!,
        computedProps.value.maxHeight,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      adjustWidth(
        box,
        deltaX,
        computedProps.value.minWidth!,
        computedProps.value.maxWidth,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
    // 处理左上角方向调整大小
    case "top-left":
      adjustHeightAndTop(
        deltaY,
        box,
        computedProps.value.minHeight!,
        computedProps.value.maxHeight,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      adjustWidthAndLeft(
        deltaX,
        box,
        computedProps.value.minWidth!,
        computedProps.value.maxWidth,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
    // 处理右下角方向调整大小
    case "bottom-right":
      adjustHeight(
        box,
        deltaY,
        computedProps.value.minHeight!,
        computedProps.value.maxHeight,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      adjustWidth(
        box,
        deltaX,
        computedProps.value.minWidth!,
        computedProps.value.maxWidth,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
    // 处理左下角方向调整大小
    case "bottom-left":
      adjustHeight(
        box,
        deltaY,
        computedProps.value.minHeight!,
        computedProps.value.maxHeight,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      adjustWidthAndLeft(
        deltaX,
        box,
        computedProps.value.minWidth!,
        computedProps.value.maxWidth,
        computedProps.value.cssUnit ?? "px",
        slotRef
      )
      break
  }
}

/**
 * 提供可调整大小的功能，允许通过拖拽改变盒子的尺寸
 * @param {BoxState} box - 盒子宽高以及位置
 * @param {ComputedRef<ComputedProps>} - 包含最大最小宽高限制
 * @param {Function} updateBoxStyle - 一个回调函数，用于在盒子尺寸或位置变化后更新其样式
 * @returns {Object} 包含`onResize`、`startResize`和`endResize`三个方法的对象，用于处理拖拽开始、进行中和结束时的逻辑
 * @param {number | undefined} slotRef - 插槽容器DOM
 */
export function useResizable(
  box: BoxState,
  computedProps: ComputedRef<ComputedProps>,
  updateBoxStyle: () => void,
  slotRef: HTMLElement | null
) {
  // 用于跟踪requestAnimationFrame的ID，以便在需要时取消排队的帧
  let frame: number | null = null

  // 在调整大小开始时
  const startResize = () => {
    // 设置一个标志为true，表示正在进行尺寸调整
    resizing.value = true
  }

  // 在调整大小进行中
  const onResize = (event: AnyTouchEvent, direction: HandleDirection) => {
    // 如果正在进行拖拽操作或已经有一个调整操作在进行中（即frame不为null），则忽略此次操作
    if (!resizing.value || frame) {
      return
    }

    frame = requestAnimationFrame(() => {
      // 根据拖动方向调整盒子大小
      adjustSize(
        direction,
        event.deltaX,
        event.deltaY,
        box,
        computedProps,
        slotRef
      )
      // 更新盒子样式
      updateBoxStyle()
      // 重置frame变量，允许下一个调整大小操作的帧被排队
      frame = null
    })
  }

  // 调整大小结束时
  const endResize = () => {
    // 重置调整大小的状态
    resizing.value = false
    if (frame !== null) {
      // 取消排队的帧，以防止额外的回调执行
      cancelAnimationFrame(frame)
      frame = null
    }
  }

  return { onResize, startResize, endResize }
}
