import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutationTypes';

Vue.use(Vuex);

const state = {
    images: [],
    loading: false,
    fail: false
};

const mutations = {
    [types.LOAD_IMAGES_START](state) {
        state.images = [];
        state.loading = true;
        state.fail = false;
    },
    [types.LOAD_IMAGES_SUCCESS](state, images) {
        state.images = images;
        state.loading = false;
        state.fail = false;
    },
    [types.LOAD_IMAGES_FAIL](state) {
        state.loading = false;
        state.fail = true;
    }
};

export default new Vuex.Store({
    state,
    mutations
})