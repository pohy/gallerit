<template>
    <div class="container-fluid">
        <div class="navbar navbar-light bg-faded">
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
                <button class="btn btn-primary">Search</button>
                <button disabled class="btn btn-success">Start slideshow</button>
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
    import {mapActions, mapGetters} from 'vuex';
    import sortOptions from './sortOptions';

    export default {
        created() {
            this.loadImages();
        },
        data: () => ({
            sortOptions
        }),
        computed: mapGetters(['form']),
        methods: {
            ...mapActions(['loadImages', 'updateForm']),
            formChanged(event) {
                this.updateForm(event);
                const {subreddits, nsfw, sorting} = this.form;
                this.$router.push({query: {subreddits, nsfw, sorting}});
                if (event.target.name !== 'subreddits') {
                    this.loadImages();
                }
            }
        }
    }
</script>
