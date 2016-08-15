import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/Home.vue';

export default new VueRouter({
    mode: 'history',
    strict: true,
    routes: [
        {path: '/*', component: Home},
    ]
});