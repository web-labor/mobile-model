/**
 * @desc 缓存组件，keepalive
 */
import { mapGetters } from 'vuex'

export default {
    created() {
        this.vnodeCache = new Map()
    },
    render() {
        const defaultSlot = this.$slots.default
        if (!defaultSlot) {
            return ''
        }
        // 获取key
        const { key } = this.currentRoute || {}
        if (key && this.vnodeCache.has(key)) {
            return this.vnodeCache.get(key)
        }
        const vnode = defaultSlot ? this.$slots.default[0] : ''
        if (`${this.$route?.name}_${this.$route?.query?._t}` === key) {
            vnode.data.keepAlive = true
            this.vnodeCache.set(key, vnode)
        }
        return vnode
    },
    computed: {
        ...mapGetters({ currentRoute: 'routeHistory/currentRoute' })
    }
}
