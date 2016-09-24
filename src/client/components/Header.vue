<template>
    <div class="container-fluid header">
        <div class="navbar navbar-fixed-top navbar-light bg-faded">
            <router-link
                    class="navbar-brand"
                    :to="{name: 'home'}"
            >
                gallerit
            </router-link>
            <ul class="nav navbar-nav">
                <router-link
                        class="nav-item"
                        :to="{name: 'home'}"
                        active-class="active"
                        tag="li"
                        exact
                >
                    <a class="nav-link">Home</a>
                </router-link>
                <router-link
                        class="nav-item"
                        :to="{name: 'about'}"
                        active-class="active"
                        tag="li"
                >
                    <a class="nav-link">About</a>
                </router-link>
            </ul>
            <form
                    class="form-inline pull-md-right"
                    @submit.prevent="loadImages"
                    @change="formChanged"
            >
                <span v-if="!imageNavigation.current">
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
                </span>
                <span v-if="imageNavigation.current">
                    <button @click="closePreview" class="btn btn-danger" type="button">
                        Close preview
                    </button>
                    <button
                            @click="toggleSlideshow"
                            class="btn btn-success"
                            type="button"
                    >
                        {{ slideshow ? 'Stop' : 'Start' }} slideshow
                    </button>
                    <button
                            @click="toggleFullscreen"
                            class="btn btn-secondary"
                            type="button"
                    >
                        Fullscreen
                    </button>
                </span>
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
    import sortOptions from '../data/sortOptions';

    import screenfull from 'screenfull';
    import debounce from 'debounce';
    import hotkey from 'keymaster';

    export default {
        created() {
            this.loadImages();
            if (screenfull.enabled) {
                document.addEventListener(screenfull.raw.fullscreenchange, () => this.toggleFullscreen(screenfull.isFullscreen));
            }
            window.addEventListener('scroll', this.updateScrollPosition);
            this.bindHotkeys();
        },
        data: () => ({
            sortOptions,
            scrollPosition: 0
        }),
        computed: {
            ...mapGetters(['form', 'imageNavigation']),
            ...mapState({
                slideshow: (state) => state.slideshow,
                route: (state) => state.route
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
            },
            closePreview() {
                this.toggleSlideshow(false);
                this.toggleFullscreen(false);
                const {subreddits, nsfw, sorting} = this.form;
                this.$router.push({path: '/', query: {subreddits, nsfw, sorting}}, () => console.log('done'));
                //TODO: handle in a better way
                setTimeout(() => window.scrollTo(0, this.scrollPosition), 50);
            },
            updateScrollPosition: debounce(function() {
                if (!this.imageNavigation.current) {
                    this.scrollPosition = window.scrollY;
                }
            }),
            bindHotkeys() {
                hotkey('space', () => {
                    if (this.route.name === 'image') {
                        this.toggleSlideshow();
                        return false;
                    }
                });
                hotkey('f', this.toggleFullscreen);
                hotkey('esc', this.closePreview);
            }
        }
    }
</script>
