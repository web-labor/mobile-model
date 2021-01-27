/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-07-13 17:01:44
 * @LastModifyTime 2021-01-25 17:52:52
 * @desc 默认拦截器文件
 */

import { isFormData } from '@/service/utils.service'
import errorHandle from './errorHandle'
import store from '@/store'
// import Axios from 'axios';

const NO_ERROR_HANDLER = [{ method: 'exportReportDetail' }]

// const CancelToken = Axios.CancelToken
// 存放正在请求中的请求
let reqQueue = []

/**
 * @desc 拦截处理请求
 * @param {*} config 请求对象
 */
function handleReq(
    config = {
        url: '',
        method: '',
        data: '',
        params: ''
    }
) {
    const { url, method, data, params } = config
    const strData = JSON.stringify(data)
    const strParams = JSON.stringify(params)
    const reqPending = reqQueue.some(
        v =>
            v.url === url &&
            v.method === method &&
            v.data === strData &&
            v.params === strParams
    )
    if (reqPending) {
        console.log(reqPending)
        // config.cancelToken = new CancelToken(v => v(`重复请求拦截: ${url} + ${method} + ${strData} + ${strParams}`))
    } else {
        reqQueue.push({
            url,
            method,
            params: strParams,
            data: strData
        })
    }
}

function handleRes(config) {
    const { url, method, data, params } = config
    reqQueue = reqQueue.filter(
        v =>
            !(
                v.url === url &&
                v.method === method &&
                JSON.stringify(v.data) === data &&
                JSON.stringify(v.params) === params
            )
    )
}

/**
 *
 * @param res 请求返回实体
 * @returns {boolean} 是否需要通用error处理
 */
function isNotErrorhandle(res) {
    const method = res.config.url
    const code = res.data.code
    return NO_ERROR_HANDLER.some(v => {
        return (
            method.indexOf(v.method) !== -1 && (!code || v.code.includes(code))
        )
    })
}

/*
 * 根据请求的类型获取对应的数据字段
 */
function getRqDataKey(method) {
    if (['post', 'put'].includes(method)) {
        return 'data'
    }
    if (['get', 'delete'].includes(method)) {
        return 'params'
    }
    return ''
}

// 默认请求的拦截器
const reqestHandle = config => {
    const method = config.method.toLowerCase()
    const paramKey = getRqDataKey(method)
    const params = config[paramKey]
    const httpStore = store.state.userInfo
    if (isFormData(params)) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        return config
    }
    // 所有请求加入ticket 和 appid 参数 （加到路径上）
    if (httpStore.ticket && httpStore.client_id) {
        config.url += `${config.url.indexOf('?') !== -1 ? '&' : '?'}ticket=${
            httpStore.ticket
        }&appId=${httpStore.client_id}`
    }
    if (Array.isArray(params)) {
        config[paramKey] = params
    }
    handleReq(config)
    return config
}

// 默认请求的错误拦截器
const errorRqHandle = error => Promise.reject(error)

// 默认响应的拦截器
const responseHandle = res => {
    if (!res?.data?.responseBody) {
        if (!res.data.success && !isNotErrorhandle(res)) {
            errorHandle(res)
            return Promise.reject(res)
        }
        return res
    }
    handleRes(res.config)
    const newRes = Object.assign({}, res, {
        data: res.data.responseBody
    })
    if (!newRes.data.success) {
        if (isNotErrorhandle(newRes)) {
            return newRes
        }
        errorHandle(newRes)
        return Promise.reject(newRes)
    }
    return newRes.data
}

// 默认响应的错误拦截器
const errorResandle = error => {
    return errorHandle(error.response, error)
}

export default {
    request: [reqestHandle, errorRqHandle],
    response: [responseHandle, errorResandle]
}
