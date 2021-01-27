<template>
    <transition name="el-fade-in">
        <div class="w-loading-wrapper" v-show="isShow">
            <van-loading
                class="w-loading"
                color="rgba(0, 145, 255, 1)"
                type="spinner"
            />
        </div>
    </transition>
</template>
<script>
export default {
    name: 'WLoading',
    data() {
        return {
            message: '',
            duration: 3000,
            isShow: false,
            timeout: null
        }
    },
    methods: {
        show() {
            this.isShow = true
        },

        hide() {
            this.isShow = false
        }
    }
}
</script>
<style lang="scss" scoped>
.w-loading-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    z-index: 999;
}
</style>
