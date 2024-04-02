// 导入公共类型定义
import { type HandleDirection } from '@/types/resizable.type'
import type { Props } from './useProps'
import { boundaryWarning } from './useWarning'
import { nextTick } from 'vue'

// 手柄方向数组，用于v-for循环
const handles: HandleDirection[] = [
  'top-left',
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
]

/**
 * 根据组件的props计算并返回初始化高度值。
 * 这个函数首先调用`boundaryWarning`函数来检查高度相关的props是否满足特定的条件，
 * 然后基于`minHeight`、`initialHeight`和`maxHeight`计算出合适的初始化高度值。
 * 如果`maxHeight`未定义，则使用`Infinity`作为其值。
 * 这确保了计算出的高度不会超过最大允许高度，同时也不会低于最小高度。
 *
 * @param {Props} props - 包含尺寸属性的对象，具体包括`minHeight`、`initialHeight`和`maxHeight`。
 * @returns {number} 计算得出的初始化高度值。
 */

const calculateInitialHeight = (props: Props) => {
  boundaryWarning(props, 'Height')
  return Math.min(
    Math.max(props.initialHeight!, props.minHeight!),
    props.maxHeight || Infinity
  )
}

/**
 * 根据组件的props计算并返回初始化宽度值。
 * 此函数通过调用`boundaryWarning`来确保宽度相关的props符合预期，
 * 然后根据`minWidth`、`initialWidth`和`maxWidth`的值计算出适当的初始化宽度。
 * 如果`maxWidth`未指定，函数会使用`Infinity`作为其值，以保证计算结果不会超出允许的范围。
 *
 * @param {Props} props - 包含尺寸属性的对象，具体包括`minWidth`、`initialWidth`和`maxWidth`。
 * @returns {number} 计算得出的初始化宽度值。
 */
const calculateInitialWidth = (props: Props) => {
  boundaryWarning(props, 'Width')
  return Math.min(
    Math.max(props.initialWidth!, props.minWidth!),
    props.maxWidth || Infinity
  )
}

/**
 * 根据插槽内所有异步加载完成的内容（如图片、视频、iframe）动态更新盒子的尺寸。
 * 此函数在Vue的`nextTick`之后执行，确保DOM已经更新完成。它遍历插槽内所有可能需要
 * 异步加载的元素，并为它们添加`onload`（对于图片和iframe）和`loadeddata`（对于视频）事件监听器。
 * 一旦所有被监听的元素都加载完成，此函数将计算并更新盒子的尺寸。
 *
 * 该方法确保了盒子的尺寸能够适应内容的变化，特别是当内容包含了需要时间加载的媒体文件时。
 *
 * @param {HTMLElement | null} slotRef - 对插槽的直接引用。如果没有插槽元素，则不执行任何操作。
 * @param {{ width: number; height: number }} box - 一个对象，包含了盒子的宽度和高度属性，这些属性将根据内容的加载情况被更新。
 * @param {() => void} updateBoxStyle - 一个函数，被调用来更新盒子的样式。通常，此函数会在盒子尺寸更新后执行，以应用新的尺寸值。
 *
 * 使用示例:
 * ```typescript
 * updateBoxSizeAfterAllElementsLoad(slotElementRef, box, updateBoxStyleFunction);
 * ```
 * 其中`slotElementRef`是插槽元素的引用，`box`是一个包含初始尺寸的对象，`updateBoxStyleFunction`是更新盒子样式的函数。
 */
const updateBoxSizeAfterAllElementsLoad = (
  slotRef: HTMLElement | null,
  box: { width: number; height: number },
  updateBoxStyle: () => void
) => {
  nextTick().then(() => {
    // 获取插槽DOM
    const slotElement = slotRef
    // 如果插槽内没有元素直接更新样式并结束
    if (!slotElement?.children[0]) {
      updateBoxStyle()
      return
    }

    // 获取插槽内的异步元素
    const asyncElements = slotElement.querySelectorAll('img, video, iframe')
    let elementsToLoad = asyncElements.length

    // 更新盒子尺寸
    const updateSize = () => {
      box.width = slotElement.offsetWidth
      box.height = slotElement.offsetHeight
      updateBoxStyle() // 更新盒子样式的方法
    }

    // 如果没有需要异步加载的元素,直接更新尺寸
    if (elementsToLoad === 0) {
      updateSize()
      return
    }

    // 循环遍历插槽内所有的异步元素
    asyncElements.forEach((element) => {
      // 加载事件方法
      const onLoadOrError = () => {
        elementsToLoad--
        if (elementsToLoad === 0) {
          updateSize()
        }
      }

      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement
        img.onload = onLoadOrError
        img.onerror = onLoadOrError
        // 检查图片是否已经加载
        if (img.complete) onLoadOrError()
      } else if (element.tagName === 'VIDEO') {
        const video = element as HTMLVideoElement
        // 检查视频是否已经加载足够的数据
        if (video.readyState > 0) {
          onLoadOrError()
        } else {
          video.addEventListener('loadeddata', onLoadOrError, { once: true })
        }
      } else if (element.tagName === 'IFRAME') {
        const iframe = element as HTMLIFrameElement
        iframe.onload = onLoadOrError
      }
    })
  })
}

export {
  handles,
  calculateInitialHeight,
  calculateInitialWidth,
  updateBoxSizeAfterAllElementsLoad,
}
