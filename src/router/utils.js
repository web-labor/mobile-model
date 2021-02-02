/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-07-28 19:29:55
 * @LastModifyTime 2020-12-14 17:41:30
 * @desc 路由工具方法
 */

import { $native } from '@/native'
import config from '@/config'
import store from '@/store'
import * as types from '@/store/types'
import qs from 'qs'

const WRAPPER_CONFIG = {
    IS_APP: config.IS_APP
}

const initNativeSetting = () => {
    $native.call('defTitleBar', {
        right: {
            text: '',
            callbackId: '',
            visible: 0
        },
        success: null
    })
}

export const beforeRouter = (to, from, next) => {
    initNativeSetting()
    const title = to.meta.title || config.PROJECT_NAME_ZHCN
    document.title = title
    if (!to.meta.titleBar) {
        $native.setTitle(title)
    } else {
        $native.hideNativeHeader()
    }
    if (to.query._t) {
        next()
    } else {
        to.query._t = new Date().getTime().toString()
        next(to)
    }
}

/**
 * @desc 缓存路由，通过fullpath来判断是go还是push
 */
export const cacheRouteHis = (to, from) => {
    const type =
        !from.query._t || to.query._t - from.query._t > 0 ? 'push' : 'pop'
    if (type === 'pop') {
        store.commit(`routeHistory/${types.ROUTE_POP}`, save)
        return
    }
    const save = {
        query: {
            ...to.query
        },
        fullPath: to.fullPath,
        name: to.name,
        meta: {
            ...to.meta
        }
    }
    store.commit(`routeHistory/${types.ROUTE_PUSH}`, save)
}

/**
 *
 * 给路由数组增加name的前缀
 * @param {Array} list 路由数组
 * @param {String} name 前缀
 */
export const addRoutePrefix = (list, name) => {
    list.forEach(route => {
        if (route.name) {
            route.name = `${name}_${route.name}`
        }
        if (route.path && route.path !== '/') {
            route.path = `/${name}${route.path}`
        }
        if (route.children) {
            addRoutePrefix(route.children, name)
        }
    })
}

export const toNativePage = (
    { path = '', query = {}, callbackId = '' },
    cb = () => {}
) => {
    const href = window.location.href
    const queryString = `${qs.stringify(query)}`
    $native.goOutlink(
        {
            url: `${href.split('#')[0]}#/${
                WRAPPER_CONFIG.IS_APP ? 'app' : 'h5'
            }/${path}?${queryString}`,
            callbackId
        },
        cb
    )
}
