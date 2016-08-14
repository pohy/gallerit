import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutationTypes';
import sortOptions from './sortOptions';

Vue.use(Vuex);

const state = {
    images: [],
    loading: false,
    fail: false,
    form: {
        subreddits: 'pics',
        sorting: sortOptions[0].value,
        nsfw: false,
        sortOptions
    }
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
    },
    [types.UPDATE_FORM](state, name, value) {

        state.form[name] = value;
    }
};

export default new Vuex.Store({
    state,
    mutations
})