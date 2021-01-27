<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>
<style lang="scss" scoped>
@import '@/style/app.base.scss';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    @include font;
}

// 按钮回显
.echoes {
    &:active {
        opacity: 0.7;
    }
}
</style>
