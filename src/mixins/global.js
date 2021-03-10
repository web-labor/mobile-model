export default {
    methods: {
        calculate(n) {
            const htmlFontSize =
                20 * ((document?.documentElement?.clientWidth || 375) / 375)
            return `${n / htmlFontSize}rem`
        }
    },
    computed: {
        userInfo() {
            return this.$store.state?.userInfo
        }
    }
}
