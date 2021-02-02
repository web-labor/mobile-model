/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-07-27 17:34:15
 * @LastModifyTime 2020-09-14 13:23:31
 * @desc debug相关服务
 */

import { addScript } from './utils.service'
import config from '@/config'

/**
 * 添加vconsole
 * @method addVonsole
 */
export const addVonsole = () => {
    addScript(config.V_CONSOLE_URL, () => {
        console.log('初始化vconsole')
        new window.VConsole()
    })
}
