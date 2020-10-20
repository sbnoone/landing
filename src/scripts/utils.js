export function throttle(func, delay) {
  let timeout = null
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args)
        timeout = null
      }, delay)
    }
  }
}

export function getScrollHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  )
}

export function getScrollPercent() {
  let html = document.documentElement,
    body = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight'
  return ((html[st] || body[st]) / ((html[sh] || body[sh]) - html.clientHeight)) * 100
}

export function getScrollTop() {
  let html = document.documentElement,
    body = document.body,
    st = 'scrollTop'
  return html[st] || body[st]
}
