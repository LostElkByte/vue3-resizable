import type { ComputedRef } from "vue"
import type { ComputedProps } from "./useProps"

/**
 * 对给定的宽度或高度属性执行边界检查，并在违反边界条件时打印警告信息。
 * 这个函数主要用于验证组件props中的尺寸属性（最小、最大、初始宽度/高度）是否满足以下条件：
 * - 最小宽度/高度、最大宽度/高度、初始宽度/高度必须大于0。
 * - 最小宽度/高度不能大于初始宽度/高度。
 * - 初始宽度/高度不能大于最大宽度/高度（如果指定）。
 * - 最小宽度/高度不能大于最大宽度/高度（如果指定）。
 *
 * @param {ComputedRef<ComputedProps>} computedProps - 包含宽度和高度属性的对象。
 * @param {'Width' | 'Height'} widthOrHeight - 指定要检查的是宽度还是高度属性。
 */
const boundaryWarning = (
  computedProps: ComputedRef<ComputedProps>,
  widthOrHeight: "Width" | "Height"
) => {
  // 最小宽/高、最大宽/高、初始化宽/高需要大于0
  if (
    computedProps.value[`min${widthOrHeight}`]! <= 0 ||
    computedProps.value[`initial${widthOrHeight}`]! <= 0 ||
    (computedProps.value[`max${widthOrHeight}`] &&
      computedProps.value[`max${widthOrHeight}`]! <= 0)
  ) {
    console.error(
      "The minimum width/height, maximum width/height, and initial width/height must be greater than 0"
    )
  }
  // 最小高/宽度不能大于初始化高/宽度
  if (
    computedProps.value[`min${widthOrHeight}`]! >
    computedProps.value[`initial${widthOrHeight}`]!
  )
    console.error(
      `The min${widthOrHeight} cannot be greater than the initial${widthOrHeight}!`
    )
  // 初始化高/宽度不能大于最大高/宽度
  if (
    computedProps.value[`max${widthOrHeight}`] &&
    computedProps.value[`initial${widthOrHeight}`]! >
      computedProps.value[`max${widthOrHeight}`]!
  )
    console.error("The initialHeight cannot be greater than the maxHeight!")
  // 最小高/宽度不能大于最大高/宽度
  if (
    computedProps.value[`max${widthOrHeight}`] &&
    computedProps.value[`min${widthOrHeight}`]! >
      computedProps.value[`max${widthOrHeight}`]!
  )
    console.error("The minHeight cannot be greater than the maxHeight!")
}

export { boundaryWarning }
