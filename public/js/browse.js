/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ({

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(58);


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * EVENT DISPATCHER
 */
window.Event = new (function () {
	function _class() {
		_classCallCheck(this, _class);

		this.vue = new Vue();
	}

	_createClass(_class, [{
		key: 'trigger',
		value: function trigger(event) {
			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			this.vue.$emit(event, data);
		}
	}, {
		key: 'listen',
		value: function listen(event, callback) {
			this.vue.$on(event, callback);
		}
	}]);

	return _class;
}())();

/*
 * ROOT VUE INSTANCE
 */
var app = new Vue({
	el: '#vue-wrapper',
	data: {
		genres: [],
		genre_columns: [],
		collections: [],
		recent_movies: [],
		recent_shows: [],
		history: [],
		movie_modal: {},
		show_modal: {}
	},
	methods: {
		newGenre: function newGenre(genre_id) {
			axios.get('/api/movie/recentGenre/10/0/' + genre_id).then(function (response) {
				console.log(response.data);
			});
		},
		createGenreTable: function createGenreTable() {
			var genre_column_count = this.genres.length % 5 === 0 ? 5 : this.genres.length % 4 === 0 ? 4 : 3;
			var max_genres_per_column = Math.ceil(this.genres.length / genre_column_count);
			var genre_columns = [];
			for (var i = 0; i < this.genres.length; i++) {
				if (i % max_genres_per_column === 0 || i === 0) {
					genre_columns.push([]); // Add another column
				}
				genre_columns[genre_columns.length - 1].push(this.genres[i]);
			}
			this.genre_columns = genre_columns;
		},
		getWatchlist: function getWatchlist() {
			axios.get('/user/watchlist/allMedia').then(function (response) {
				console.log(response.data);
			});
		}
	},
	mounted: function mounted() {
		/*
   * TODO:
   * - Get all genres for navbar
   * - Get recently updated collections
   * - Get recent movies
   * - Create genres table dropdown in navbar
   */
		var self = this;
		axios.get('/api/genre/allGenres').then(function (response) {
			self.genres = response.data;
			self.createGenreTable();
		});
		axios.get('/api/collection/recent/3').then(function (response) {
			self.collections = response.data;
		});
		axios.get('/api/movie/recent/10/0').then(function (response) {
			self.recent_movies = response.data;
		});
	}
});

/***/ })

/******/ });