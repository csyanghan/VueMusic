export default(Vue, options = {}) => {
  // 初始化选项
  var init = {
    default: 'http://img.zcool.cn/community/01730758f113e7a8012049efbab035.png'
  }
  // 数组方法
  if (!Array.prototype.remove) {
    // eslint-disable-next-line
    Array.prototype.remove = function(item) {
      if (!item.length) return
      var index = this.indexOf(item)
      if (index > -1) {
        this.splice(index, 1)
        return this
      }
    }
  }
  // 需监听的图片列表，还未加载
  var listenList = []
  // 已加载过的图片缓存列表
  var imageCacheList = []
  // 判断是否加载
  const isAlreadyLoad = (imageSrc) => {
    if (imageCacheList.indexOf(imageSrc) > -1) {
      return true
    } else {
      return false
    }
  }
  // 检查是否可加载
  const isCanShow = (item) => {
    var ele = item.ele
    var src = item.src
    // 图片距顶部距离
    var top = ele.getBoundingClientRect().top
    var windowHeight = window.innerHeight
    if (top + 10 < windowHeight) {
      var image = new Image()
      image.src = src
      image.onload = function() {
        ele.src = src
        imageCacheList.push(src)
        listenList.remove(item)
      }
      return true
    } else {
      return false
    }
  }
  // 添加监听事件scroll
  const onListenScrool = () => {
    window.addEventListener('scroll', function() {
      var length = listenList.length
      for (let i = 0; i < length; i++) {
        isCanShow(listenList[i])
      }
    })
  }
  const addListenner = (ele, binding) => {
    var imageSrc = binding.value
    if (isAlreadyLoad(imageSrc)) {
      ele.src = imageSrc
      return false
    }
    var item = {
      ele: ele,
      src: imageSrc
    }
    ele.src = init.default
    if (isCanShow(item)) {
      return
    }
    listenList.push(item)
    onListenScrool()
  }
  Vue.directive('lazyload', {
    inserted: addListenner,
    updated: addListenner
  })
}
