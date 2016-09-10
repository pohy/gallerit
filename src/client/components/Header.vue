<template>
    <div class="container-fluid header">
        <div class="navbar navbar-fixed-top navbar-light bg-faded">
            <router-link class="navbar-brand" :to="'/'">gallerit</router-link>
            <form
                    class="form-inline pull-md-right"
                    @submit.prevent="loadImages"
                    @change="formChanged"
            >
                <input
                        autofocus
                        type="text"
                        placeholder="Subreddits: gifs, pics, gonewild"
                        class="form-control"
                        name="subreddits"
                        :value="form.subreddits"
                        @input="formChanged"
                />
                <select
                        class="form-control"
                        name="sorting"
                >
                    <option
                            v-for="sort in sortOptions"
                            :value="sort.value"
                            v-bind:selected="form.sorting === sort.value"
                    >
                        {{ sort.title }}
                    </option>
                </select>
                <label class="form-check-inline">
                    <input
                            class="form-check-input"
                            type="checkbox"
                            name="nsfw"
                            :value="form.nsfw"
                    >
                    NSFW
                </label>
                <button class="btn btn-primary" type="submit">Search</button>
                <button @click="toggleSlideshow" class="btn btn-success" type="button">
                    {{ slideshow ? 'Stop' : 'Start' }} slideshow
                </button>
                <button @click="toggleFullscreen" class="btn btn-secondary" type="button">
                    Fullscreen
                </button>
            </form>
        </div>
    </div>
</template>
<style>
    .header {
        margin-bottom: 56px;
    }
</style>
<script>
    import {mapActions, mapGetters, mapState} from 'vuex';
    import sortOptions from './sortOptions';
    import screenfull from 'screenfull';

    export default {
        created() {
            this.loadImages();
            if (screenfull.enabled) {
                document.addEventListener(screenfull.raw.fullscreenchange, () => this.toggleFullscreen(screenfull.isFullscreen));
            }
        },
        data: () => ({
            sortOptions
        }),
        computed: {
            ...mapGetters(['form']),
            ...mapState({
                slideshow: (state) => state.slideshow
            })
        },
        methods: {
            ...mapActions(['loadImages', 'updateForm', 'toggleSlideshow', 'toggleFullscreen']),
            formChanged(event) {
                this.updateForm(event);
                const {subreddits, nsfw, sorting} = this.form;
                this.$router.push({path: '/', query: {subreddits, nsfw, sorting}});
                if (event.target.name !== 'subreddits') {
                    this.loadImages();
                }
            }
        }
    }
</script>
