import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger';

import sortOptions from './sortOptions';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
    images: [],
    loading: false,
    fail: false,
    positions: {},
    form: {
        subreddits: 'pics',
        sorting: sortOptions[0].value,
        nsfw: false,
        sortOptions
    }
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