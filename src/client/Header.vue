<template>
    <div class="navbar navbar-light bg-faded">
        <a class="navbar-brand" href="#">galerrit</a>
        <form class="form-inline pull-md-right">
            <input type="text" class="form-control"/>
            <button class="btn btn-primary">Search</button>
            <select class="form-control">
                <option v-for="order in ['Hot', 'New', 'Top']">{{ order }}</option>
            </select>
            <button disabled class="btn btn-success">Start slideshow</button>
        </form>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
