import * as types from '../types'

const routeStack = []

const mutations = {
    [types.ROUTE_PUSH](state, payload) {
        state.push(payload)
    },
    [types.ROUTE_POP](state) {
        state.pop()
    }
}
const actions = {}
const getters = {}

export default {
    namespaced: true,
    state: routeStack,
    getters,
    mutations,
    actions
}
