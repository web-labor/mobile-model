import * as types from '../types'

const routeStack = []

const mutations = {
    [types.ROUTE_PUSH](state, payload) {
        state.push({
            ...payload,
            key: `${payload.name}_${new Date().getTime()}`
        })
    },
    [types.ROUTE_POP](state) {
        state.pop()
    }
}
const actions = {}
const getters = {
    currentRoute: state => {
        const len = state ? state.length : 0
        return len > 0 ? state[len - 1] : null
    }
}

export default {
    namespaced: true,
    state: routeStack,
    getters,
    mutations,
    actions
}
