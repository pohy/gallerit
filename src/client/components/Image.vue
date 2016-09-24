<template>
    <div class="container-fluid image">
        <div class="row">
            <div class="image-full col-md-12" :class="{fullscreen}">
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
            <div class="image-nav left">
                <router-link
                        v-if="nav.previous"
                        class="button"
                        :to="{name: 'image', query: {url: nav.previous.url}}"
                >
                    <span>
                        &lt;
                    </span>
                </router-link>
            </div>
            <div class="image-nav right">
                <router-link
                        v-if="nav.next"
                        class="button"
                        :to="{name: 'image', query: {url: nav.next.url}}"
                >
                    <span>
                        &gt;
                    </span>
                </router-link>
            </div>
            <info-overlay/>
        </div>
    </div>
</template>
<style lang="scss">
    .image-full.fullscreen {
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image-nav {
        position: fixed;
        width: 150px;
        height: 100%;

        &:hover .button {
            display: flex;
        }

        &.left {
            left: 0;
        }

        &.right {
            right: 0;
        }

        .button {
            display: flex;
            width: 100%;
            height: 100%;
            font-size: 56px;
            color: white;
            text-decoration: none;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }

        .hide {
            display: none;
        }
    }
</style>
<script>
    import {mapGetters, mapActions, mapState} from 'vuex';
    import Media from './Media.vue';
    import Spinner from './Spinner.vue';

    import screenfull from 'screenfull';
    import hotkey from 'keymaster';

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
            setTimeout(this.hideNavigation, 1500);

            this.bindHotkeys();
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
                if (this.nav.next) {
                    this.$router.push({path: '/image', query: {url: this.nav.next.url}});
                }
            },
            previousImage() {
                if (this.nav.previous) {
                    this.$router.push({path: '/image', query: {url: this.nav.previous.url}});
                }
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
            },
            hideNavigation() {
                const buttonEls = document.querySelectorAll('.image-nav .button');
                if (buttonEls.length) {
                    buttonEls.forEach((el) => el.classList.add('hide'));
                }
            },
            bindHotkeys() {
                // TODO: unbind when not in preview mode
                hotkey('left', this.previousImage);
                hotkey('right', this.nextImage);
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
                if (screenfull.enabled) {
                    this.updateImageSize();
                    if (fullscreen) {
                        document.body.style.backgroundColor = 'black';
                    } else {
                        document.body.style.backgroundColor = 'white';
                    }
                    const imageFullEl = document.querySelector('.image-full');
                    screenfull.toggle(imageFullEl);
                }
            }
        },
        components: {
            mediaComponent: Media,
            Spinner
        }
    }
</script>
