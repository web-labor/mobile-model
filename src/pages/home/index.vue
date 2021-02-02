<template>
    <div class="home" @click="$router.push({ name: 'Test' })">首页</div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {}
    },
    created() {
        console.log('home')
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
