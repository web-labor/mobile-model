/**
 * @desc 工具方法
 */
import qs from 'qs'
import { $native } from '@/native'
import Vue from 'vue'

/**
 * @desc 判断是否为FormData
 * @param {*} param
 */
export const isFormData = param => {
    return Object.prototype.toString.call(param) === '[object FormData]'
}

/**
 * @desc 判断数组对象里面，是否存在键值为key的值相等
 */
export const valueOfKeyInArray = (arr, key, value) => {
    return arr.some(v => {
        return v[key] === value
    })
}

/**
 * @desc 中国标准时间-{yy-MM-dd HH:mm:ss}日期格式转换
 */
export const format = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month > 9 ? month : `0${month}`}-${
        day > 9 ? day : `0${day}`
    } 00:00:00`
}

/**
 *   获取类型
 *   @method getType
 *   @param {Any} obj 用于判断类型的对象
 *   @return {String} 参数类型
 **/
export const getType = obj => {
    return Object.prototype.toString
        .call(obj)
        .replace(/\[object|\]|\s/g, '')
        .toLocaleLowerCase()
}

/**
 *
 * 判断是否为空字符串
 * @param {*} obj
 * @returns Boolean
 * @memberof Util
 */
export const isNUllObject = obj => {
    return getType(obj) === 'object' && JSON.stringify(obj) === '{}'
}

/**
 *   新增script
 *   @method addScript
 *   @param {String} url scr
 *   @return {Number} 返回最大值
 **/
export const addScript = (url, cb) => {
    const script = document.createElement('script')
    script.src = url
    if (script.readyState) {
        // IE
        script.onreadystatechange = () => {
            if (
                script.readyState === 'loaded' ||
                script.readyState === 'complete'
            ) {
                script.onreadystatechange = null
                cb()
            }
        }
    } else {
        // 其他浏览器
        script.onload = () => {
            cb()
        }
    }
    document.body.appendChild(script)
}

/**
 * @desc 打开新页面
 * @param {String} url
 */
export const goOutLink = url => {
    window.location.href = url
}

export const isWeekend = date => {
    return [0, 6].includes((date || new Date()).getDay())
}

export const routerPush = ({ path, query, params }) => {
    const baseurl = window.location.href.split('#')[0]
    let url = path
    if (params) {
        Object.keys(params).forEach(d => {
            url = url.replace(RegExp(`:${d}`), encodeURI(params[d]))
        })
    }
    if (query) {
        url += `?${qs.stringify(query)}`
    }
    $native.goOutlink({ url: `${baseurl}#${url}` })
}

export const throttle = (fn, delay = 300) => {
    let timeout = null
    return (...params) => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        timeout = setTimeout(() => {
            fn.apply(fn, params)
        }, delay)
    }
}

export const debounce = (fn, wait) => {
    let timeout = null
    console.log(timeout)
    return function(...args) {
        if (timeout) clearTimeout(timeout)
        const callNow = !timeout
        timeout = setTimeout(() => {
            timeout = null
        }, wait)
        if (callNow) fn.apply(fn, args)
    }
}

export const getHashParameters = () => {
    const hash = (location.hash || '').split('?')
    const arr = hash.length > 1 ? hash[1].split('&') : []
    const params = {}
    for (const i of arr) {
        const data = i.split('=')
        if (data.length === 2) {
            params[data[0]] = data[1]
        }
    }
    return params
}

// 返回传递给他的任意对象的类
function isClass(o) {
    if (o === null) return 'Null'
    if (o === undefined) return 'Undefined'
    return Object.prototype.toString.call(o).slice(8, -1)
}

// 深度克隆
export const deepClone = obj => {
    let result
    const oClass = isClass(obj)
    // 确定result的类型
    if (oClass === 'Object') {
        result = {}
    } else if (oClass === 'Array') {
        result = []
    } else {
        return obj
    }
    for (const key in obj) {
        const copy = obj[key]
        if (isClass(copy) === 'Object') {
            result[key] = deepClone(copy) // 递归调用
        } else if (isClass(copy) === 'Array') {
            result[key] = deepClone(copy)
        } else {
            result[key] = obj[key]
        }
    }
    return result
}

export const eventBus = new Vue({})
