<template>
    <div class="container-fluid">
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
            <div class="col-md-10">
                <media-component
                        v-if="nav.current"
                        :type="nav.current.type"
                        :url="nav.current.url"
                        :title="nav.current.title"
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
<style>
</style>
<script>
    import {mapGetters, mapActions, mapState} from 'vuex';
    import Media from './Media.vue';
    import Spinner from './Spinner.vue';

    export default {
        created() {
            if (!this.nav.current) {
                this.loadImages();
            } else if (!this.nav.next) {
                this.loadMore();
            }
            this.toggleSlideshow(this.slideshow);
        },
        ready() {
            console.log('ready')
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
            })
        },
        methods: {
            ...mapActions(['loadImages', 'loadMore']),
            nextImage: (vm) => vm.$router.push({query: {url: vm.nav.next.url}}),
            toggleSlideshow(slideshow) {
                const vm = this;
                clearInterval(vm.interval);
                vm.interval = null;
                if (slideshow) {
                    vm.interval = setInterval(() => vm.nextImage(vm), vm.nextImageDelay);
                }
            }
        },
        watch: {
            slideshow: this.toggleSlideshow,
            nav(nav) {
                if (nav.current && !nav.next) {
                    this.loadMore();
                }
                if (!nav.current && nav.next) {
                    this.nextImage(/* instant */ true, this);
                }
            }
        },
        components: {
            mediaComponent: Media,
            Spinner
        }
    }
</script>
