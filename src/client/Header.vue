<template>
    <div class="container-fluid">
        <div class="navbar navbar-light bg-faded">
            <a class="navbar-brand" href="#">gallerit</a>
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
                />
                <select
                        class="form-control"
                        name="sorting"
                        v-model="form.sorting"
                >
                    <option v-for="sort in form.sortOptions" :value="sort.value">
                        {{ sort.title }}
                    </option>
                </select>
                <label class="form-check-inline">
                    <input
                            class="form-check-input"
                            type="checkbox"
                            name="nsfw"
                            v-model="form.nsfw"
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
    import {loadImages, updateForm} from './actions';

    export default {
        vuex: {
            actions: {
                loadImages,
                updateForm
            },
            getters: {
                form: (state) => state.form
            }
        },
        created() {
            this.loadImages();
        },
        methods: {
            formChanged(event) {
                this.updateForm(event);
                if (event.target.name !== 'subreddits') {
                    this.loadImages();
                }
            }
        }
    }
</script>
