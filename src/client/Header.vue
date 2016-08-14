<template>
    <div class="container-fluid">
        <div class="navbar navbar-light bg-faded">
            <a class="navbar-brand" href="#">gallerit</a>
            <form
                    class="form-inline pull-md-right"
                    @submit.prevent="submitForm"
            >
                <input
                        autofocus
                        type="text"
                        placeholder="Subreddits: gifs, pics, gonewild"
                        class="form-control"
                        v-model="subreddits"
                />
                <select
                        class="form-control"
                        v-model="sorting"
                        @change="submitForm"
                >
                    <option v-for="sort in sortOptions" :value="sort.value">
                        {{ sort.title }}
                    </option>
                </select>
                <label class="form-check-inline">
                    <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="nsfw"
                            @change="submitForm"
                    >
                    NSFW
                </label>
                <button class="btn btn-primary">Search</button>
                <button disabled class="btn btn-success">Start slideshow</button>
            </form>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import {loadImages} from './actions';

    export default {
        data() {
            return {
                subreddits: 'pics',
                sorting: 'hot',
                nsfw: false,
                sortOptions: [{
                    title: 'Hot',
                    value: 'hot'
                }, {
                    title: 'New',
                    value: 'new'
                }, {
                    title: 'Top',
                    value: 'top'
                }]
            };
        },
        vuex: {
            actions: {
                loadImages
            }
        },
        created() {
            this.submitForm();
        },
        methods: {
            submitForm() {
                this.loadImages(this.subreddits, this.sorting, this.nsfw)
            }
        }
    }
</script>
