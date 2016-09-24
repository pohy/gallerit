<template>
    <div class="info-overlay" v-if="notification">
        <span class="text">
            {{ notification }}
        </span>
    </div>
</template>
<style lang="scss">
    .info-overlay {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 50px;
        text-align: center;

        .text {
            color: white;
            font-size: 56px;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 0.1em 0.2em;
            border-radius: 0.1em;
        }
    }
</style>
<script>
    import {mapState} from 'vuex';

    export default {
        name: 'NotificationOverlay',
        computed: {
            ...mapState(['notification'])
        }
    }
</script>