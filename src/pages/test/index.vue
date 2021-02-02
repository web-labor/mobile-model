<template>
    <div class="test" @click="$router.push({ name: 'Page2' })">测试</div>
</template>
<script>
export default {
    name: 'Test',
    data() {
        return {}
    },
    created() {
        console.log('test created')
    }
}
</script>
