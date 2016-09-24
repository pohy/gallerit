import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';
import Image from './components/Image.vue';
import About from './components/About.vue';

export default new VueRouter({
    mode: 'history',
    strict: true,
    routes: [
        {path: '/', component: Home, name: 'home'},
        {path: '/image', component: Image, name: 'image'},
        {path: '/about', component: About, name: 'about'}
    ]
});