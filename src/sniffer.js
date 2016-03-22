/**
 * Copyright (C) 2016 yanni4night.com
 * sniffer.js
 *
 * changelog
 * 2016-03-20[14:29:33]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        totalPages: 0
    },
    mutations: {
        UPDATE_TOTAL_PAGES: (state, totalPages) => {
            state.totalPages = totalPages;
        }
    }
});

const vuex = {
    getters: {
        totalPages: () => store.state.totalPages
    },
    actions: {
        fetchTotalPages: () => {
            setTimeout(() => {
                store.dispatch('UPDATE_TOTAL_PAGES', 10)
            }, 3e3)
        }
    }
};

const app = new Vue({
    el: '#content',
    store,
    vuex
});

vuex.actions.fetchTotalPages();