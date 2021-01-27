/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-07-03 09:24:18
 * @LastModifyTime 2020-12-24 13:43:26
 * @desc http默认配置
 */

import { isFormData } from '@/service/utils.service'

export default {
    timeout: 1000 * 30,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json, image/jpeg'
    },
    transformRequest: [
        data => {
            if (isFormData(data)) {
                return data
            }
            return JSON.stringify(data)
        }
    ]
}
