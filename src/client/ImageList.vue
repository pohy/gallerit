<template>
    <div class="container-fluid">
        <div class="card-deck images">
            <image-card v-for="image in images" v-bind:image="image"/>
        </div>

        <div v-if="fail" class="jumbotron">
            <h1>Failed</h1>
            <p class="lead">Image loading has failed</p>
            <hr>
            <button class="btn btn-lg btn-primary" @click="loadImages">Try again</button>
        </div>

        <div v-if="!fail && !loading && !images.length" class="jumbotron">
            <h1>No pictures found</h1>
            <p class="lead">Maybe you requested images from non-existent subreddits?</p>
            <span v-if="!nsfw">
                <hr>
                <p class="lead">NSFW posts are currently disabled. Try enabling them.</p>
                <button class="btn btn-lg btn-warning" @click="enableNsfw">Get turned on by NSFW</button>
            </span>
        </div>
        <spinner v-show="loading"/>
    </div>
</template>
<style>
    /*.images {*/
        /*justify-content: center;*/
    /*}*/
</style>
<script>
    import {loadImages, updateForm} from './actions';
    import ImageCard from './ImageCard.vue';
    import Spinner from './Spinner.vue';

    export default {
        vuex: {
            actions: {
                loadImages,
                updateForm
            },
            getters: {
                images: (state) => state.images,
                loading: (state) => state.loading,
                fail: (state) => state.fail,
                nsfw: (state) => state.form.nsfw
            }
        },
        components: {
            ImageCard,
            Spinner
        },
        methods: {
            enableNsfw() {
                this.updateForm({target: {name: 'nsfw', value: true}});
                this.loadImages();
            }
        }
    };
</script>
