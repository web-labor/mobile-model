import * as types from '../types'
import api from '@/api/index'
// 初始化这些字段，避免watch 不到，
const state = {
    ticket: '',
    client_id: '',
    appId: '',
    userName: '',
    department: '',
    openId: '',
    name: '',
    type: '',
    photoUrl: '',
    networkid: '',
    logo: ''
}
const mutations = {
    [types.USERINFO_INIT](state, payload) {
        Object.keys(state).forEach(key => {
            if (payload[key]) state[key] = payload[key]
        })
    },
    [types.USERINFO_UPDATE](state, payload) {
        Object.assign(state, payload)
    },
    [types.USERINFO_RESET](state) {
        Object.keys(state).forEach(key => {
            state[key] = ''
        })
    }
}
const actions = {
    async [types.USERINFO_ACTION_UPDATE]({ commit }, payload) {
        // 请求
        const {
            data: { data }
        } = await api.getUserInfo(payload)
        commit(types.USERINFO_UPDATE, data)
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
