import config from '@/config'

export default store => {
    const list = ['userInfo']
    list.forEach(d => {
        const tt = `${d}/${d.toLocaleUpperCase()}_INIT`
        const dd = `${config.PROJECT_NAME_EN}-vuex-${d}`
        const res = window.localStorage.getItem(dd)
        if (res) {
            store.commit(tt, JSON.parse(unescape(res)))
        }
    })
    store.subscribe((mutation, state) => {
        const { type } = mutation
        list.forEach(d => {
            const tt = `${d}/`
            const dd = `${config.PROJECT_NAME_EN}-vuex-${d}`
            if (type.indexOf(tt) !== -1) {
                window.localStorage.setItem(
                    dd,
                    escape(JSON.stringify(state[d]))
                )
            }
        })
    })
}
