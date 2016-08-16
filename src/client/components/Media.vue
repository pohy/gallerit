<template>
    <div>
        <img v-if="type === 'image'" v-bind:src="url" v-bind:alt="title">
        <video v-if="type === 'video'" loop="loop" autoplay="autoplay" muted="muted">
            <source v-bind:src="url" type="video/mp4">
        </video>
    </div>
</template>
<script>
    export default {
        props: ['type', 'url', 'title']
    };
</script>