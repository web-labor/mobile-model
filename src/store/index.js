import Vue from 'vue'
import Vuex from 'vuex'
import local from './plugins/local'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const modules = []
const modulesList = require.context('./modules', false, /\.js$/)
modulesList.keys().forEach(key => {
    const name = key.replace(/\.\/([a-zA-Z]+)\.js/, '$1')
    modules[name] = modulesList(key).default
})

export default new Vuex.Store({
    modules,
    plugins: [local],
    strict: debug
})
