
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
Vue.component('poster-row', require('./components/PosterRow.vue'));
Vue.component('poster-container', require('./components/PosterContainer.vue'));

//Vue.component('example-component', require('./components/ExampleComponent.vue'));
//
//const app = new Vue({
//    el: '#app'
//});
