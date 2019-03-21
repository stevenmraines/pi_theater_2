const app = new Vue({
    el: '#app',

    data: {
        collections: window.__INITIAL_STATE__.collections,
        genres: window.__INITIAL_STATE__.genres,
        pending: window.__INITIAL_STATE__.pending,
    },

    created: function() {
        
    },
});
