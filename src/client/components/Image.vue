<template>
    <div class="container-fluid image">
        <div class="row">
            <div class="col-md-1">
                <router-link
                        v-if="nav.previous"
                        class="btn btn-secondary"
                        :to="`/image?url=${nav.previous.url}`"
                >
                    Previous
                </router-link>
            </div>
            <div class="col-md-10 image-full">
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
                        class="btn btn-secondary"
                        :to="`/image?url=${nav.next.url}`"
                >
                    Next
                </router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .image {
        text-align: center;
        vertical-align: middle;
    }
</style>
<script>
    import {mapGetters, mapActions, mapState} from 'vuex';
    import Media from './Media.vue';
    import Spinner from './Spinner.vue';

    export default {
        name: 'Image',
        created() {
            if (!this.nav.current) {
                this.loadImages();
            } else if (!this.nav.next) {
                this.loadMore();
            }
        },
        data: () => ({
            image: {},
            navigation: {
                previous: '',
                next: ''
            },
            nextImageDelay: 3247,
            interval: null
        }),
        computed: {
            ...mapState({
                slideshow: (state) => state.slideshow
            }),
            ...mapGetters({
                nav: 'imageNavigation'
            }),
            maxImageHeight() {
                return window.innerHeight - document.querySelector('.header').offsetTop;
            },
            maxImageWidth() {
                return document.querySelector('.image-full').offsetWidth;
            }
        },
        methods: {
            ...mapActions(['loadImages', 'loadMore', 'toggleSlideshow']),
            nextImage() {
                this.$router.push({query: {url: this.nav.next.url}});
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
            }
        },
        components: {
            mediaComponent: Media,
            Spinner
        }
    }
</script>
