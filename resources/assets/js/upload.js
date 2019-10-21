const app = new Vue({
    el: '#app',

    data: {
        collections: window.__INITIAL_STATE__.collections,
        currentDrive: 0,
        currentMovie: {
            collections: [window.__INITIAL_STATE__.collections[0]],
            filename: '',
            genres: [window.__INITIAL_STATE__.genres[0]],
            notes: null,
            poster: '',
            summary: '',
            title: '',
            yearReleased: new Date().getFullYear(),
        },
        drives: window.__INITIAL_STATE__.drives,
        genres: window.__INITIAL_STATE__.genres,
        pending: window.__INITIAL_STATE__.pending,
    },

    computed: {
        movieCount: function() {
            if(this.currentDrive <= 0
                || typeof this.pending[this.currentDrive] === 'undefined') {
                return 0;
            }

            return this.pending[this.currentDrive].movies.length;
        },

        newUploadsMessage: function() {
            if(this.currentDrive <= 0
                    || typeof this.pending[this.currentDrive] === 'undefined') {
                return '';
            }

            var newVideos = 0;

            if(this.pending[this.currentDrive].movies.length > 0) {
                newVideos += this.pending[this.currentDrive].movies.length;
            }

            if(this.pending[this.currentDrive].episodes.length > 0) {
                newVideos += this.pending[this.currentDrive].episodes.length;
            }

            var message = (newVideos > 0 ? newVideos : 'No')
                + ' New Upload'
                + (newVideos === 1 ? '' : 's');

            return message;
        },
    },

    created: function() {
        if(this.drives.length > 0) {
            // Set the currentDrive
            this.currentDrive = this.drives[0].id;

            // Set the current movie filename and title (if there are any new movies)
            if(typeof this.pending[this.currentDrive] !== 'undefined'
                    && this.pending[this.currentDrive].movies.length > 0) {
                // Set filename
                this.currentMovie.filename = this.pending[this.currentDrive].movies[0];

                // Set title

            }
        }
    },
});
