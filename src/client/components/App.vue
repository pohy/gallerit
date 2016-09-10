<template>
    <div id="app">
        <header-component/>
        <router-view/>
        <analytics v-if="isProduction"/>
    </div>
</template>
<script>
    import Header from './Header.vue';

    export default {
        components: {
            headerComponent: Header
        },
        data: () => ({
            isProduction: process.env.NODE_ENV === 'production'
        })
    }
</script>
