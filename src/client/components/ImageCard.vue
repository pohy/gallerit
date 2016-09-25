<template>
    <router-link :to="{name: 'image', query: {url: image.url}}">
        <div class="card image-card">
            <h4 v-if="image.title">{{ image.title }}</h4>
            <media-component :type="image.type" :url="image.thumbnail" :title="image.title"/>
        </div>
    </router-link>
</template>
<style lang="scss">
    .image-card {
        position: relative;
        max-width: 320px;
        max-height: 240px;
        margin: 0.625rem !important;
        text-align: center;

        img, video {
            max-width: 320px;
            max-height: 240px;
        }

        h4 {
            position: absolute;
            display: none;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 35%, transparent);
            bottom: -8px;
            padding: 5px;
            color: white;
            width: 100%;
            text-align: left;
        }

        &:hover h4 {
            display: block
        }
    }
</style>
<script>
    import Media from './Media.vue';

    export default{
        props: ['image'],
        components: {
            mediaComponent: Media
        }
    }
</script>
