const app = new Vue({
    el: '#app',

    data: {
        collections: window.__INITIAL_STATE__.collections,
        currentDrive: '',
        drives: window.__INITIAL_STATE__.drives,
        genres: window.__INITIAL_STATE__.genres,
        pending: window.__INITIAL_STATE__.pending,
    },

    computed: {
        newUploadsMessage: function() {
            return
                (this.pending.length > 0 ? this.pending.length : 'No')
                + ' New Upload'
                + (this.pending.length === 1 ? '' : 's');
        },
    },

    created: function() {

    },
});
