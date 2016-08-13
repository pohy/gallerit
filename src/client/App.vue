<template>
  <div id="app" class="container">
    <header-component/>
    <image-list/>
  </div>
</template>

<script>
import Header from './Header.vue';
import ImageList from './ImageList.vue';

export default {
  components: {
    headerComponent: Header,
    ImageList
  },
  data () {
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
