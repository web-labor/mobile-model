/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-12-14 17:13:28
 * @LastModifyTime 2020-12-29 14:36:24
 * @desc loading 服务
 */
import WLoading from './WLoading.vue'
import Vue from 'vue'

const LoadingConstructor = Vue.extend(WLoading)

const defaults = {
    message: null,
    isShow: true
}

let loading = false
let loadingCount = 0

LoadingConstructor.prototype.hide = function() {
    loadingCount--
    if (loadingCount > 0) {
        return
    }
    if (this.close) {
        this.close()
        loading = false
    }
}

LoadingConstructor.prototype.show = function() {
    loadingCount++
    if (loadingCount > 1) {
        return
    }
    if (this.open) {
        this.open()
    }
}

const Loading = (options = {}) => {
    if (Vue.prototype.$isServer) return
    options = Object.assign({}, defaults, options)
    if (typeof options.target === 'string') {
        options.target = document.querySelector(options.target)
    }
    options.target = options.target || document.body
    if (options.target === document.body) {
        options.body = true
    }
    if (loading.isShow) {
        return loading
    }

    const parent = options.body ? document.body : options.target
    // 和指令中是一样的
    const instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options
    })
    // 直接添加元素
    parent.appendChild(instance.$el)
    loading = instance
    return instance
}

export default Loading
