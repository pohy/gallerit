<template>
    <div>
        <img
                v-if="type === 'image'"
                :src="url"
                :alt="title"
                :width="width"
                :height="height"
                :style="{maxHeight, maxWidth}"
        >
        <video
                v-if="type === 'video'"
                loop="loop"
                autoplay="autoplay"
                muted="muted"
                :width="width"
                :height="height"
        >
            <source :src="url" type="video/mp4">
        </video>
    </div>
</template>
<script>
    const requiredString = () => ({type: String, required: true});

    export default {
        props: {
            type: {
                validator: (value) => ['image', 'video'].indexOf(value) > -1
            },
            url: requiredString(),
            title: requiredString(),
            height: String,
            width: String,
            maxHeight: String,
            maxWidth: String
        }
    };
</script>