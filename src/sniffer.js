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

const pageUrls = (imageTag, pageNo) => {
    return `http://m1-forum-mis01.m1.baidu.com:8090/new-spam-mis/imgctltool/imageCtl?action=list&imgTag=${imageTag}&page=${pageNo}`;
};

const store = new Vuex.Store({
    state: {
        totalNums: 0,
        startPage: 1,
        itemsPerPage: 5,
        endPage: 5,
        images: [],
        imgTag: 1
    },
    mutations: {
        UPDATE_TOTAL_PAGES: (state, data) => {
            state.totalNums = data.totalNums;
            state.itemsPerPage = data.itemsPerPage;
        },
        LOAD_NEW_IMAGES: (state, images) => {
            state.images.push(...images);
        },
        CLEAR_IMAGES: (state) => {
            state.images.splice(0);
        },
        SET_START_PAGE: (state, startPage) => {
            state.startPage = startPage;
        },
        SET_END_PAGE: (state, endPage) => {
            state.endPage = endPage;
        },
        ERROR_PAGES: (state) => {
            state.totalPages = null;
        },
        UPDATE_IMG_TAG: (state, imgTag) => {
            state.imgTag = imgTag;
        }
    }
});

const vuex = {
    getters: {
        totalNums: () => store.state.totalNums,
        itemsPerPage: () => store.state.itemsPerPage,
        totalPages: () => Math.ceil(store.state.totalNums / store.state.itemsPerPage),
        startPage: () => store.state.startPage,
        endPage: () => store.state.endPage,
        imgTag: () => store.state.imgTag,
        images: () => store.state.images
    },
    actions: {
        fetchTotalPages: () => {
            const pageNo = 1;
            fetch(pageUrls(store.state.imgTag, pageNo)).then(data => data.text())
                .then(parseDOM)
                .then(doc => {
                    const spans = doc.querySelectorAll('#pager .important');
                    return {
                        totalNums: +spans[0].innerText.trim(),
                        itemsPerPage: +spans[1].innerText.trim()
                    };
                }).then(store.dispatch.bind(store, 'UPDATE_TOTAL_PAGES'), store.dispatch.bind(store, 'ERROR_PAGES'));
        },
        load: () => {
            var startPage = store.state.startPage;
            var endPage = store.state.endPage;
            var totalPages = store.state.totalPages;

            if (startPage < 1) {
                startPage = 1;
            }
            if (endPage > totalPages) {
                endPage = totalPages;
            }

            for (var i = startPage; i <= endPage; ++i) {
                fetch(pageUrls(store.state.imgTag, i)).then(data => data.text())
                    .then(parseDOM)
                    .then(doc => {
                        const images = doc.querySelectorAll('img.BDE_Smiley');
                        return Array.prototype.map.call(images, img => ({
                            src: img.src
                        }));
                    }).then(store.dispatch.bind(store, 'LOAD_NEW_IMAGES'));

            }
        },
        clear: () => {
            store.dispatch('CLEAR_IMAGES');
        }
    }
};

const app = new Vue({
    el: '#content',
    store,
    vuex,
    methods: {
        setStartPage: (e) => {
            store.dispatch('SET_START_PAGE', e.target.value);
        },
        setEndPage: (e) => {
            store.dispatch('SET_END_PAGE', e.target.value);
        },
        updateImgTag: (e) => {
            var imgTag = +e.target.options[e.target.selectedIndex].value;
            store.dispatch('CLEAR_IMAGES');
            store.dispatch('UPDATE_IMG_TAG', imgTag);
            vuex.actions.fetchTotalPages();
        }
    }
});

vuex.actions.fetchTotalPages();