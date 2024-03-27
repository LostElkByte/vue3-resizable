// 定义手柄方向的类型
export type HandleDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'rotate'

// 盒子状态类型
export interface BoxState {
  width: number
  height: number
  top: number
  left: number
}
