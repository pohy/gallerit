<template>
    <div id="app">
        <header-component/>
        <image-list/>
        <load-more/>
    </div>
</template>
<script>
    import Header from './Header.vue';
    import ImageList from './ImageList.vue';
    import LoadMore from './LoadMore.vue';

    export default {
        components: {
            headerComponent: Header,
            ImageList,
            LoadMore
        }
    }
</script>
