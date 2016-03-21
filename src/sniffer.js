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

const store = new Vuex.Store({
    state: {
        totalPages: 0
    },
    mutations: {
        UPDATE_TOTAL_PAGES: (state, totalPages) => {
            state.totalPages = totalPages;
        }
    },
    actions: {
        fetchTotalPages: (store, pages) => {
            setTimeout(() => {
                store.dispatch('UPDATE_TOTAL_PAGES', pages);
            }, 2e3);
        }
    }
});

new Vue({
    el: '#content',
    data: store.state
});

store.actions.fetchTotalPages(1678);