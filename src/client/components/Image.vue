<template>
    <div class="container-fluid image">
        <div class="row">
            <div class="col-md-1">
                <router-link
                        v-if="nav.previous"
                        class="btn btn-secondary navigation"
                        :to="`/image?url=${nav.previous.url}`"
                >
                    Previous
                </router-link>
            </div>
            <div class="image-full" :class="{'col-md-10': !fullscreen, 'col-md-12': fullscreen, fullscreen}">
                <media-component
                        v-if="nav.current"
                        :type="nav.current.type"
                        :url="nav.current.url"
                        :title="nav.current.title"
                        :maxHeight="`${maxImageHeight}px`"
                        :maxWidth="`${maxImageWidth}px`"
                />
                <spinner v-else />
            </div>
            <div class="col-md-1">
                <router-link
                        v-if="nav.next"
                        class="btn btn-secondary navigation"
                        :to="`/image?url=${nav.next.url}`"
                >
                    Next
                </router-link>
            </div>
        </div>
    </div>
</template>
<style>
    .image-full.fullscreen {
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navigation {
        margin-top: 1em;
    }
</style>
<script>
    import {mapGetters, mapActions, mapState} from 'vuex';
    import Media from './Media.vue';
    import Spinner from './Spinner.vue';
    import screenfull from 'screenfull';

    export default {
        name: 'Image',
        created() {
            if (!this.nav.current) {
                this.loadImages();
            } else if (!this.nav.next) {
                this.loadMore();
            }
            // TODO; this should be called in a ready/attached lifecycle hook, although, they don't seem to work
            setTimeout(this.updateImageSize, 500);
        },
        data: () => ({
            image: {},
            navigation: {
                previous: '',
                next: ''
            },
            nextImageDelay: 3247,
            interval: null,
            maxImageWidth: 0,
            maxImageHeight: 0
        }),
        computed: {
            ...mapState(['slideshow', 'fullscreen']),
            ...mapGetters({
                nav: 'imageNavigation'
            })
        },
        methods: {
            ...mapActions(['loadImages', 'loadMore', 'toggleSlideshow']),
            nextImage() {
                this.$router.push({path: '/image', query: {url: this.nav.next.url}});
            },
            getMaxImageHeight() {
                const headerEl = document.querySelector('.header');
                return window.innerHeight - (headerEl ? headerEl.offsetTop : 0);
            },
            getMaxImageWidth() {
                const imageFullEl = document.querySelector('.image-full');
                return imageFullEl ? imageFullEl.offsetWidth : 0;
            },
            updateImageSize() {
                this.$data.maxImageWidth = this.getMaxImageWidth();
                this.$data.maxImageHeight = this.getMaxImageHeight();
            }
        },
        watch: {
            slideshow(running) {
                if (running) {
                    this.interval = setInterval(() => this.nextImage(), this.nextImageDelay);
                } else {
                    clearInterval(this.interval);
                    this.interval = null;
                }
            },
            nav(nav) {
                if (nav.current && !nav.next) {
                    this.loadMore();
                }
                if (!nav.current && nav.next) {
                    this.nextImage(/* instant */ true);
                }
            },
            fullscreen(fullscreen) {
                this.updateImageSize();
                if (fullscreen) {
                    const imageFullEl = document.querySelector('.image-full');
                    if (screenfull.enabled) {
                        screenfull.request(imageFullEl);
                    }
                    document.body.style.backgroundColor = 'black';
                } else {
                    document.body.style.backgroundColor = 'white';
                }
            }
        },
        components: {
            mediaComponent: Media,
            Spinner
        }
    }
</script>
