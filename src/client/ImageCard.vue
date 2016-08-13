<template>
    <div class="card">
        <h4 v-if="image.title">{{ image.title }}</h4>
        <img v-bind:src="image.url" v-bind:alt="image.title" width="320" height="240">
    </div>
</template>
<style>
</style>
<script>
    export default{
        props: ['image'],
    }
</script>
