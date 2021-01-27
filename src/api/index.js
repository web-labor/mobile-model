/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-10-20 12:17:01
 * @LastModifyTime 2021-01-25 18:05:28
 */
import api from './http'
import { withLoading } from '@/decorate'
const SERVICE_NAME = '/journal-service'

export class Api {
    /* 文件上传接口 */
    @withLoading()
    uploadFile(data) {
        const formData = new window.FormData()
        formData.append('file', data.file)
        formData.append('networkId', undefined)
        formData.append('bizkey', 'crm')
        return api.post('/docrest/file/uploadfile', formData)
    }

    // 获取用户信息
    @withLoading()
    getUserInfo() {
        return api.get(`${SERVICE_NAME}/user/index`)
    }
}

export default new Api()
