import Vue from 'vue'
import Vuex from 'vuex'
import local from './plugins/local'
import userInfo from './modules/userInfo'
import deviceInfo from './modules/deviceInfo'
import routeHistory from './modules/routeHistory'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        userInfo,
        deviceInfo,
        routeHistory
    },
    plugins: [local],
    strict: debug
})
