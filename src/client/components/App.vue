<template>
    <div id="app">
        <header-component/>
        <router-view/>
    </div>
</template>
<script>
    import Header from './Header.vue';

    export default {
        components: {
            headerComponent: Header,
        }
    }
</script>
