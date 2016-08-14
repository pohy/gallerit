<template>
    <div class="container-fluid load-more">
        <button
                class="btn btn-lg btn-secondary"
                v-bind:disabled="loading || fail"
                @click="loadMore"
        >
            Load more...
        </button>
    </div>
</template>
<style>
    .load-more {
        text-align: center;
    }
</style>
<script>
    import {loadMore} from './actions';
    import debounce from 'debounce';

    export default {
        vuex: {
            actions: {
                loadMore
            },
            getters: {
                loading: (state) => state.loading,
                fail: (state) => state.fail,
                hasImages: (state) => !!state.images.length
            }
        },
        created() {
            window.addEventListener('scroll', this.startFetching);
        },
        methods: {
            startFetching: debounce(function() {
                if (
                        document.querySelector('.load-more').offsetTop - 1000 < window.scrollY + window.innerHeight
                        && !this.loading && this.hasImages && !this.fail
                ) {
                    this.loadMore();
                }
            }, 250)
        },
        watch: {
            loading() {
                if (!this.fail) {
                    this.startFetching();
                }
            }
        }
    }
</script>
