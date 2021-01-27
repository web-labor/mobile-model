import Vue from 'vue'
import App from './App.vue'
import Api from '@/api/index'
import router from './router'
import './plugins/vant.js'
import store from './store'
import config from '@/config'
import { addVonsole } from './service/debug.service'
import globalMixins from './mixins/global'
import { $native } from './native'
import * as types from '@/store/types'
import Msg from './service/message.service'
import { getHashParameters } from '@/service/utils.service'
import '@/components/install'
import 'normalize.css/normalize.css'

const hashQuery = location.hash.slice(location.hash.indexOf('?'))
if (!$native.isApp && hashQuery.indexOf('from=wait') !== -1) {
    window.location.replace(
        `${location.origin}/teamwork-web/${location.search}#/matterDetail${hashQuery}`
    )
}

Vue.config.productionTip = false

// 判断是否开启vconsole
if (config.V_CONSOLE && process.env.NODE_ENV === 'development') {
    addVonsole()
}

$native.call('setBounce', {
    enable: 0
})

$native.on('keyboardChange', res => {
    store.commit(`deviceInfo/${types.DEVICEINFO_UPDATE}`, {
        keyboardHeight: res.height
    })
})

// 通过路径获取参数
const search = new URLSearchParams(window.location.search)
const searchArr = [...search.keys()]
const query = {}
searchArr.forEach(v => {
    query[v] = search.get(v)
})

store.commit(`userInfo/${types.USERINFO_UPDATE}`, query)
store.dispatch(`userInfo/${types.USERINFO_ACTION_UPDATE}`, query)

const hashParams = getHashParameters()
if (hashParams.ticket) {
    store.commit(`userInfo/${types.USERINFO_UPDATE}`, {
        ticket: hashParams.ticket || '',
        appid: hashParams.appid || ''
    })
}

if (hashParams.appid) {
    store.commit(`userInfo/${types.USERINFO_UPDATE}`, {
        appid: hashParams.appid
    })
}

Vue.prototype.$api = Api
Vue.prototype.$config = config
Vue.prototype.$native = $native
Vue.prototype.$msg = Msg

Vue.mixin(globalMixins)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
