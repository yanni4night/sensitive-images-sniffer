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
        },
        ERROR_PAGES: (state) => {
            state.totalPages = null;
        }
    }
});

const vuex = {
    getters: {
        totalPages: () => store.state.totalPages
    },
    actions: {
        fetchTotalPages: () => {
            //parseDOM
            fetch('http://m1-forum-mis01.m1.baidu.com:8090/new-spam-mis/imgctltool/imageCtl?action=list&imgTag=0').then(data => data.text())
            .then(parseDOM)
            .then(doc => {
                const spans = doc.querySelectorAll('#pager .important');
                return Math.ceil(+spans[0].innerText.trim()/+spans[1].innerText.trim());
            }).then(store.dispatch.bind(store, 'UPDATE_TOTAL_PAGES'), store.dispatch.bind(store, 'ERROR_PAGES'));
        }
    }
};

const app = new Vue({
    el: '#content',
    store,
    vuex
});

vuex.actions.fetchTotalPages();