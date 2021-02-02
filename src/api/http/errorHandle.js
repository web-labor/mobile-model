/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-10-20 12:17:01
 * @LastModifyTime 2020-12-25 16:38:31
 */
import { Toast } from 'vant'

const StatusMap = {
    status_500: '服务器错误',
    status_404: '接口不存在',
    status_403: '无权限访问',
    default: '未知错误'
}

const resError = res => {
    if (res.data.errorCode === '403') {
        window.location.href = res.data.data
        return
    }
    Toast(res.data.error || res.data.message || '网络超时')
}

const errorHandle = error => {
    const status = error.response ? error.response.status : '600'
    switch (status) {
        case 404:
            return Promise.reject(StatusMap.status_404)
        case 403:
            return Promise.reject(StatusMap.status_403)
        case 500:
            return Promise.reject(StatusMap.status_500)
        default:
            Promise.reject(StatusMap.default)
    }

    if (error.response && error.response.data && error.response.data.error) {
        return Promise.reject(error.response.data.message)
    }
    return Promise.reject(new Error('网络请求失败'))
}

export default (res, error) => {
    if (error) {
        return errorHandle(error)
    }
    return resError(res)
}
