<template>
    <div id="app">
        <header-component/>
        <router-view/>
        <analytics v-if="isProduction"/>
    </div>
</template>
<script>
    import Header from './Header.vue';
    import Analytics from './Analytics.vue';

    export default {
        components: {
            headerComponent: Header,
            Analytics
        },
        data: () => ({
            isProduction: env.process.NODE_ENV === 'production'
        })
    }
</script>
