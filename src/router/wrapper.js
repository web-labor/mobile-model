/**
 * @Author wangbo
 * @Email bo_wb@yunzhijia.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-07-30 10:24:42
 * @LastModifyTime 2020-12-18 13:56:11
 * @desc 路由包装
 */

import { $native } from '@/native'
import qs from 'qs'
import store from '@/store'

const WRAPPER_CONFIG = {
    IS_APP: $native.isApp
}

export default function(fn) {
    const vueRouterPush = fn.push
    const vueRouterGo = fn.go
    const { options } = fn

    function getRoute(item, routermap, list) {
        routermap.forEach(route => {
            if (route.name === item.name || route.path === item.path) {
                list.push(route)
            }
            if (route.children) {
                getRoute(item, route.children, list)
            }
        })
    }

    function jumpPage(argu, options) {
        const match = []
        getRoute(argu, options.routes, match)
        const [target] = match
        if (!target) {
            throw new Error('')
        }
        const baseurl = window.location.href.split('#')[0]
        let url = target.path || ''
        if (argu.params) {
            Object.keys(argu.params).forEach(d => {
                url = url.replace(RegExp(`:${d}`), encodeURI(argu.params[d]))
            })
        }
        const { cb, callbackId } = argu.query
        delete argu.query.cb
        delete argu.query.callbackId
        if (argu.query) {
            url += `?${qs.stringify(argu.query)}`
        }
        $native.goOutlink({ url: `${baseurl}#${url}`, callbackId }, cb)
    }

    /**
     * 重写$route.push方法
     * @method push
     */
    fn.push = (...params) => {
        const argu = params['0']
        argu.name = `app_${argu.name}`
        // 如果为原生环境 并且 query.webview 为 true  则重新打开webview
        if (WRAPPER_CONFIG.IS_APP && argu?.query?.webview) {
            jumpPage(argu, options)
            return
        }
        return vueRouterPush.call(fn, ...params)
    }

    /**
     * 重写$route.go
     * @method go
     */
    fn.go = (...params) => {
        if (store.state.routeHistory.length === 0) {
            $native.closeWebview()
            return
        }
        return vueRouterGo.call(fn, ...params)
    }

    return fn
}
