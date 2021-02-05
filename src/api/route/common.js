/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2021-01-06 13:48:45
 * @LastModifyTime 2021-01-06 13:50:51
 */
import api from '../http'
import { withLoading } from '@/decorate'

const SERVICE_NAME = '/journal-service'

export class CommonApi {
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

export default CommonApi
