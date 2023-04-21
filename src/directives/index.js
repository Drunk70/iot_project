// 所有的自定义指令

// 图片报错自定义指令
export const imgError = {
  inserted(dom, options) {
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
