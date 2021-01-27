export default store => {
    const list = ['userInfo']
    list.forEach(d => {
        const tt = `${d}/${d.toLocaleUpperCase()}_INIT`
        const dd = `vuex-${d}`
        const res = window.localStorage.getItem(dd)
        if (res) {
            store.commit(tt, JSON.parse(res))
        }
    })
    store.subscribe((mutation, state) => {
        const { type } = mutation
        list.forEach(d => {
            const tt = `${d}/`
            const dd = `vuex-${d}`
            if (type.indexOf(tt) !== -1) {
                window.localStorage.setItem(dd, JSON.stringify(state[d]))
            }
        })
    })
}
