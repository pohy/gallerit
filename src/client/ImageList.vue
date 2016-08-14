<template>
    <div class="container-fluid">
        <div class="card-deck images">
            <image-card v-for="image in images" v-bind:image="image"/>
        </div>
    </div>
</template>
<style>
    .images {
        justify-content: center;
    }
</style>
<script>
    import ImageCard from './ImageCard.vue';

    export default {
        created() {
            const self = this;
            fetch('http://localhost:3000/')
                    .then((res) => res.json())
                    .then((images) => self.images = images)
                    .catch((err) => console.error(err));
        },
        data() {
            return {
                images: []
            };
        },
        components: {
            ImageCard
        }
    };
</script>
