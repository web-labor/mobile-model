/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-07-27 17:28:02
 * @LastModifyTime 2020-12-23 16:48:18
 */

import REG from './reg'
import SELECT from './select'
const {
    zh_name: PROJECT_NAME_ZHCN,
    name: PROJECT_NAME_EN
} = require('../../package.json')

const getOrigin = () => {
    let origin = window.location.origin
    if (!window.location.origin) {
        origin =
            window.location.protocol +
            '//' +
            window.location.hostname +
            (window.location.port ? ':' + window.location.port : '')
    }
    return origin
}

const config = {
    BASE_URL: getOrigin(),
    ORIGIN: getOrigin(),
    // 项目中文名称
    PROJECT_NAME_ZHCN,
    // 项目英文名称
    PROJECT_NAME_EN,
    // 是否开启vconsole
    V_CONSOLE: false,
    // vconsole 路径
    V_CONSOLE_URL: './static/js/vconsole.min.js',
    // 正则
    REG: REG,
    // 选择
    SELECT: SELECT
}

export default config
