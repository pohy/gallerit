<template>
    <div class="container-fluid">
        <div class="card-deck images">
            <image-card v-for="image in images" v-bind:image="image"/>
        </div>
        <div v-if="fail" class="jumbotron">
            <h1>Failed</h1>
            <p class="lead">Image loading has failed</p>
        </div>
        <spinner v-show="loading"/>
    </div>
</template>
<style>
    .images {
        justify-content: center;
    }
</style>
<script>
    import ImageCard from './ImageCard.vue';
    import Spinner from './Spinner.vue';

    export default {
        vuex: {
            getters: {
                images: (state) => state.images,
                loading: (state) => state.loading,
                fail: (state) => state.fail
            }
        },
        components: {
            ImageCard,
            Spinner
        }
    };
</script>
