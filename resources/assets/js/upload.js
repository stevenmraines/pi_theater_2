/*
 * SETUP COMPONENTS
 */
Vue.component('drive-form', require('./components/admin/upload/DriveForm.vue'));
Vue.component('movie-form', require('./components/admin/upload/MovieForm.vue'));
Vue.component('episode-form', require('./components/admin/upload/EpisodeForm.vue'));
Vue.component('show-form', require('./components/admin/upload/ShowForm.vue'));
Vue.component('collections-input', require('./components/admin/upload/CollectionsInput.vue'));
Vue.component('file-input', require('./components/admin/upload/FileInput.vue'));
Vue.component('genres-input', require('./components/admin/upload/GenresInput.vue'));
Vue.component('poster-input', require('./components/admin/upload/PosterInput.vue'));
Vue.component('summary-input', require('./components/admin/upload/SummaryInput.vue'));
Vue.component('notes-input', require('./components/admin/upload/NotesInput.vue'));
Vue.component('year-input', require('./components/admin/upload/YearInput.vue'));
Vue.component('jumbotron-input', require('./components/admin/upload/JumbotronInput.vue'));
Vue.component('season-input', require('./components/admin/upload/SeasonInput.vue'));
Vue.component('episode-number-input', require('./components/admin/upload/EpisodeNumberInput.vue'));
Vue.component('shows-input', require('./components/admin/upload/ShowsInput.vue'));
Vue.component('submit-input', require('./components/admin/upload/SubmitInput.vue'));
Vue.component('title-input', require('./components/admin/upload/TitleInput.vue'));

/*
 * ROOT VUE INSTANCE
 */
const app = new Vue({
    el: '#app',

    data: {
        initialState: window.__INITIAL_STATE__,
    },
});
