import Vue from 'vue'
import Router from 'vue-router'
import { beforeRouter, addRoutePrefix, cacheRouteHis } from './utils'
import wrapper from './wrapper'

Vue.use(Router)

const getPageConfig = (prefix = 'app') => {
    const routes = [
        // 自定义
    ]

    // 动态引入pages 必须是Page结尾的路由名称
    const pageModule = require.context('./pages', true, /\Pages.js$/)
    pageModule.keys().forEach(key => {
        routes.push(...pageModule(key).default)
    })
    addRoutePrefix(routes, prefix)
    return routes
}

const routers = new Router({
    mode: 'hash',
    routes: [
        /** ************************* 首页及其相关页路由 ***************************************** **/
        { path: '/', redirect: '/app/home' },
        ...getPageConfig()
    ]
})

routers.beforeEach((to, from, next) => {
    beforeRouter(to, from, next)
    cacheRouteHis(to, from)
})

export default wrapper(routers)
