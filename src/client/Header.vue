<template>
    <div class="container-fluid">
        <div class="navbar navbar-light bg-faded">
            <a class="navbar-brand" href="#">gallerit</a>
            <form class="form-inline pull-md-right">
                <input type="text" placeholder="Subreddits: gifs, pics, gonewild" class="form-control"/>
                <button class="btn btn-primary">Search</button>
                <select class="form-control">
                    <option v-for="order in ['Hot', 'New', 'Top']">{{ order }}</option>
                </select>
                <button disabled class="btn btn-success">Start slideshow</button>
            </form>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return{
            }
        }
    }
</script>
