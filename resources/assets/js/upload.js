/*
 * SETUP COMPONENTS
 */
Vue.component('collection-input', require('./components/admin/upload/CollectionInput.vue'));
Vue.component('drive-form', require('./components/admin/upload/DriveForm.vue'));
Vue.component('episode-file-input', require('./components/admin/upload/EpisodeFileInput.vue'));
Vue.component('episode-form', require('./components/admin/upload/EpisodeForm.vue'));
Vue.component('episode-number-input', require('./components/admin/upload/EpisodeNumberInput.vue'));
Vue.component('genre-input', require('./components/admin/upload/GenreInput.vue'));
Vue.component('image-file-input', require('./components/admin/upload/ImageFileInput.vue'));
Vue.component('imdb-search-input', require('./components/admin/upload/IMDbSearchInput.vue'));
Vue.component('jumbotron-input', require('./components/admin/upload/JumbotronInput.vue'));
Vue.component('movie-form', require('./components/admin/upload/MovieForm.vue'));
Vue.component('multi-collection-input', require('./components/admin/upload/MultiCollectionInput.vue'));
Vue.component('multi-genre-input', require('./components/admin/upload/MultiGenreInput.vue'));
Vue.component('notes-input', require('./components/admin/upload/NotesInput.vue'));
Vue.component('poster-input', require('./components/admin/upload/PosterInput.vue'));
Vue.component('poster-url-input', require('./components/admin/upload/PosterUrlInput.vue'));
Vue.component('season-input', require('./components/admin/upload/SeasonInput.vue'));
Vue.component('show-form', require('./components/admin/upload/ShowForm.vue'));
Vue.component('shows-input', require('./components/admin/upload/ShowsInput.vue'));
Vue.component('submit-input', require('./components/admin/upload/SubmitInput.vue'));
Vue.component('summary-input', require('./components/admin/upload/SummaryInput.vue'));
Vue.component('title-input', require('./components/admin/upload/TitleInput.vue'));
Vue.component('video-file-input', require('./components/admin/upload/VideoFileInput.vue'));
Vue.component('year-end-input', require('./components/admin/upload/YearEndInput.vue'));
Vue.component('year-input', require('./components/admin/upload/YearInput.vue'));
Vue.component('year-released-input', require('./components/admin/upload/YearReleasedInput.vue'));
Vue.component('year-start-input', require('./components/admin/upload/YearStartInput.vue'));

/*
 * ROOT VUE INSTANCE
 */
const app = new Vue({
    el: '#app',

    data: {
        initialState: window.__INITIAL_STATE__,
    },
});
