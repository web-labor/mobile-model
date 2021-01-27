/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-07-03 09:24:18
 * @LastModifyTime 2020-09-25 10:11:12
 */
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)

/**
 * @desc 全局提示
 * @param 'success' | 'error' | 'warn' | 'info'
 * @param msg
 */

class Msg {
    success(msg) {
        if (!msg) {
            return
        }
        Toast.success(msg)
    }

    error(msg) {
        if (!msg) {
            return
        }
        Toast.fail(msg)
    }

    info(msg) {
        if (!msg) {
            return
        }
        Toast(msg)
    }
}

export default new Msg()
