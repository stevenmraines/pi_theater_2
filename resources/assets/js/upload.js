const app = new Vue({
    el: '#app',

    data: {
        collections: window.__INITIAL_STATE__.collections,
        currentDrive: 0,
        drives: window.__INITIAL_STATE__.drives,
        genres: window.__INITIAL_STATE__.genres,
        pending: window.__INITIAL_STATE__.pending,
    },

    computed: {
        newUploadsMessage: function() {
            var newVideos = 0;

            if(this.pending.movies.length > 0) {
                newVideos += this.pending.movies.length;
            }

            if(this.pending.episodes.length > 0) {
                newVideos += this.pending.episodes.length;
            }

            var message = ((newVideos > 0 ? newVideos : 'No')
                + ' New Upload'
                + (newVideos === 1 ? '' : 's'));

            return message;
        },
    },

    created: function() {
        // if(this.drives.length > 0) {
        //     this.currentDrive = drives[0].id;
        // }
    },
});
