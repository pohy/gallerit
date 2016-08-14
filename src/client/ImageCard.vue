<template>
    <div class="card image-card">
        <h4 v-if="image.title">{{ image.title }}</h4>
        <img v-bind:src="image.url" v-bind:alt="image.title">
    </div>
</template>
<style lang="scss">
    .image-card {
        position: relative;
        max-width: 320px;
        max-height: 240px;
        margin-bottom: 0.625rem;

        img {
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
        }

        &:hover h4 {
            display: block
        }
    }
</style>
<script>
    export default{
        props: ['image'],
    }
</script>
