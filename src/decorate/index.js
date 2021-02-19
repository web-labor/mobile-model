/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-11-27 13:55:47
 * @LastModifyTime 2020-11-27 13:58:40
 */

import WLoading from '@/components/common/WLoading/service'

/**
 * @description 请求loading 装饰
 */
export const withLoading = (
    options = {
        message: '',
        type: ''
    }
) => {
    return function(target, name, descriptor) {
        const originFunc = descriptor.value
        descriptor.value = async function(...args) {
            let loading = WLoading(options)
            loading.show()
            let res = null
            try {
                res = await originFunc.apply(this, args)
                loading.hide()
                loading = false
            } catch (e) {
                loading.hide()
                loading = false
                res = Promise.reject(e)
            }
            return res
        }
    }
}
