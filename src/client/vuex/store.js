import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger';

import defaultForm from './defaultForm';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
    images: [],
    loading: false,
    fail: false,
    positions: {},
    form: defaultForm,
    slideshow: false
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: true,
    plugins: [
        createLogger()
    ]
})