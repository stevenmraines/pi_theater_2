import axios from 'axios';
import InstantSearch from 'vue-instantsearch';

require('./bootstrap');

window.axios = require('axios');
window.Vue = require('vue');

Vue.use(InstantSearch);

Vue.component('ais-poster-row', require('./components/AisPosterRow.vue'));
Vue.component('collection-modal', require('./components/CollectionModal.vue'));
Vue.component('genre-modal', require('./components/GenreModal.vue'));
Vue.component('login-modal', require('./components/LoginModal.vue'));
Vue.component('movie-modal', require('./components/MovieModal.vue'));
Vue.component('poster-container', require('./components/PosterContainer.vue'));
Vue.component('poster-row', require('./components/PosterRow.vue'));
Vue.component('registration-modal', require('./components/RegistrationModal.vue'));
Vue.component('search-modal', require('./components/SearchModal.vue'));
Vue.component('show-modal', require('./components/ShowModal.vue'));
Vue.component('watchlist-modal', require('./components/WatchlistModal.vue'));
