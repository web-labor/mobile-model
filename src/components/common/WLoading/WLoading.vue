<template>
    <transition name="el-fade-in">
        <div class="w-loading-wrapper" v-show="isShow">
            <van-loading
                v-if="type === 'spinner'"
                color="rgba(0, 145, 255, 1)"
                type="spinner"
                vertical
            >
                {{ message }}
            </van-loading>
            <div class="w-loading" v-if="type === 'ripple'"></div>
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
            timeout: null,
            type: ''
        }
    },
    props: {
        wtype: {
            type: String,
            default: 'spinner'
        }
    },
    created() {
        if (!this.type) {
            this.type = this.wtype
        }
    },
    methods: {
        open() {
            this.isShow = true
        },

        close() {
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
    .w-loading {
        width: 50px;
        height: 50px;
        transform: scale(0);
        border-radius: 50%;
        animation: ripple 0.6s ease-out infinite;
        background-color: #409eff;
    }
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
}
</style>
