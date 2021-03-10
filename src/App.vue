<template>
    <div id="app">
        <w-keep-alive>
            <router-view />
        </w-keep-alive>
    </div>
</template>

<script>
import WKeepAlive from '@/components/common/WKeepAlive'
export default {
    name: 'app',
    components: {
        WKeepAlive
    },
    created() {}
}
</script>
<style lang="scss" scoped>
@import '@/style/app.base.scss';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #f8f9fb;
    @include font;
}

</style>
<style>
/* 按钮回显 */
.echoes:active {
    opacity: 0.7;
}
</style>
