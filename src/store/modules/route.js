import * as types from '../types'

const caches = []

const mutations = {
    [types.ROUTE_UPDATE](state, { name, route }) {
        if (
            !state.some((v, index) => {
                if (v.name === name) {
                    route ? state.splice(index, 1, v) : state.splice(index, 1)
                }
                return name === v.name
            })
        ) {
            return route ? state.push(route) : ''
        }
    }
}
const actions = {}
const getters = {}

export default {
    namespaced: true,
    state: caches,
    getters,
    mutations,
    actions
}
