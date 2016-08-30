import Vue from 'vue'
import {sync} from 'vuex-router-sync';

import App from './components/App.vue'
import store from './vuex/store';
import router from './router';

sync(store, router);

import 'bootstrap/scss/bootstrap-flex.scss';
import 'bootstrap/dist/js/bootstrap';

Vue.config.debug = true;

new Vue({
    router,
    store,
    ...App
}).$mount('#app');
