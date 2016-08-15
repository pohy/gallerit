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
    import {mapActions, mapGetters} from 'vuex';
    import debounce from 'debounce';

    export default {
        created() {
            window.addEventListener('scroll', this.startFetching);
        },
        computed: {
            ...mapGetters(['loading', 'fail', 'hasImages'])
        },
        methods: {
            ...mapActions(['loadMore']),
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
