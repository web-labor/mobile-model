import * as types from '../types'
const state = {
    keyboardHeight: 0
}
const mutations = {
    [types.DEVICEINFO_UPDATE](state, payload) {
        Object.assign(state, payload)
    }
}

const actions = {}
const getters = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
