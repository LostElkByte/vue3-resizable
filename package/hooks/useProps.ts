import type { CSSProperties } from "vue"

// props 接口
interface Props {
  /** 最小宽度限制, 应 > 0 && < maxWidth && < initialWidth */
  minWidth?: number
  /** 最小高度限制, 应 > 0 && < maxHeight && < initialHeight */
  minHeight?: number
  /** 最大宽度限制, 应 > minWidth && > initialWidth */
  maxWidth?: number
  /** 最大高度限制, 应 > minHeight && > initialHeight */
  maxHeight?: number
  /** 初始化宽度, 应 > 0 && > minWidth && < maxWidth */
  initialWidth?: number
  /** 初始化高度, 应 > 0 && > minHeight && < maxHeight */
  initialHeight?: number
  /** 初始化上偏移 */
  initialTop?: number
  /** 初始化左偏移 */
  initialLeft?: number
  /** 容器样式, 应为一个CSS对象 */
  style?: CSSProperties
  /** 拖拽点样式, 应为一个CSS对象 */
  handleStyle?: CSSProperties
  /** 宽高单位, 可以是 'px' | 'rem' */
  cssUnit?: "px" | "rem" | string
  /** 显示尺寸信息, 默认是false */
  showDimension?: boolean
  /** 显示位置信息, 默认是false */
  showPosition?: boolean
}

type ComputedProps = Pick<
  Props,
  | "minWidth"
  | "minHeight"
  | "maxWidth"
  | "maxHeight"
  | "initialWidth"
  | "initialHeight"
  | "initialTop"
  | "initialLeft"
  | "cssUnit"
  | "showDimension"
  | "showPosition"
>

// 定义props的默认值
const defaultProps = {
  minWidth: 30,
  minHeight: 30,
  initialWidth: 200,
  initialHeight: 200,
  initialTop: 100,
  initialLeft: 100,
  cssUnit: "px",
  showDimension: false,
  showPosition: false,
}

export { defaultProps, type Props, type ComputedProps }
