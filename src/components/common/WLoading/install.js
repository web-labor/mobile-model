/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-09-10 18:35:12
 * @LastModifyTime 2020-12-14 17:25:50
 * @desc 安装toast
 */
import service from './service'

export default {
    install(Vue) {
        Vue.prototype.$loading = service
    },
    service
}
