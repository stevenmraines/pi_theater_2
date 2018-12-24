
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import axios from 'axios';

require('./bootstrap');

window.axios	= require('axios');
window.Vue		= require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('login-modal', require('./components/LoginModal.vue'));
Vue.component('registration-modal', require('./components/RegistrationModal.vue'));
Vue.component('movie-modal', require('./components/MovieModal.vue'));
Vue.component('show-modal', require('./components/ShowModal.vue'));
Vue.component('movie-poster-row', require('./components/MoviePosterRow.vue'));
Vue.component('movie-poster-container', require('./components/MoviePosterContainer.vue'));
Vue.component('show-poster-row', require('./components/ShowPosterRow.vue'));
Vue.component('show-poster-container', require('./components/ShowPosterContainer.vue'));
Vue.component('mixed-poster-row', require('./components/MixedPosterRow.vue'));

//Vue.component('example-component', require('./components/ExampleComponent.vue'));
//
//const app = new Vue({
//    el: '#app'
//});
