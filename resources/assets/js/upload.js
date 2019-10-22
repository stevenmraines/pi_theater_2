/*
 * SETUP COMPONENTS
 */
Vue.component('movie-form', require('./components/admin/upload/MovieForm.vue'));
Vue.component('episode-form', require('./components/admin/upload/EpisodeForm.vue'));
Vue.component('show-form', require('./components/admin/upload/ShowForm.vue'));
Vue.component('collections-input', require('./components/admin/upload/CollectionsInput.vue'));
Vue.component('file-input', require('./components/admin/upload/FileInput.vue'));
Vue.component('genres-input', require('./components/admin/upload/GenresInput.vue'));
Vue.component('poster-input', require('./components/admin/upload/PosterInput.vue'));
Vue.component('summary-input', require('./components/admin/upload/SummaryInput.vue'));
Vue.component('notes-input', require('./components/admin/upload/NotesInput.vue'));
Vue.component('title-input', require('./components/admin/upload/TitleInput.vue'));
Vue.component('year-released-input', require('./components/admin/upload/YearReleasedInput.vue'));

/*
 * ROOT VUE INSTANCE
 */
const app = new Vue({
    el: '#app',

    data: {
        collections: window.__INITIAL_STATE__.collections,
        currentDrive: 0,
        drives: window.__INITIAL_STATE__.drives,
        genres: window.__INITIAL_STATE__.genres,
        pending: window.__INITIAL_STATE__.pending,
        shows: window.__INITIAL_STATE__.shows,
    },

    computed: {
        episodes: function() {
            if(this.currentDrive <= 0
                    || typeof this.pending[this.currentDrive] === 'undefined') {
                return [];
            }

            return this.pending[this.currentDrive].episodes;
        },

        movies: function() {
            if(this.currentDrive <= 0
                    || typeof this.pending[this.currentDrive] === 'undefined') {
                return [];
            }

            return this.pending[this.currentDrive].movies;
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
        }
    },
});
