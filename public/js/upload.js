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
/******/ 	return __webpack_require__(__webpack_require__.s = 416);
/******/ })
/************************************************************************/
/******/ ({

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(417);


/***/ }),

/***/ 417:
/***/ (function(module, exports) {

var app = new Vue({
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
            yearReleased: new Date().getFullYear()
        },
        drives: window.__INITIAL_STATE__.drives,
        genres: window.__INITIAL_STATE__.genres,
        pending: window.__INITIAL_STATE__.pending
    },

    computed: {
        movieCount: function movieCount() {
            if (this.currentDrive <= 0 || typeof this.pending[this.currentDrive] === 'undefined') {
                return 0;
            }

            return this.pending[this.currentDrive].movies.length;
        },

        newUploadsMessage: function newUploadsMessage() {
            if (this.currentDrive <= 0 || typeof this.pending[this.currentDrive] === 'undefined') {
                return '';
            }

            var newVideos = 0;

            if (this.pending[this.currentDrive].movies.length > 0) {
                newVideos += this.pending[this.currentDrive].movies.length;
            }

            if (this.pending[this.currentDrive].episodes.length > 0) {
                newVideos += this.pending[this.currentDrive].episodes.length;
            }

            var message = (newVideos > 0 ? newVideos : 'No') + ' New Upload' + (newVideos === 1 ? '' : 's');

            return message;
        }
    },

    created: function created() {
        if (this.drives.length > 0) {
            // Set the currentDrive
            this.currentDrive = this.drives[0].id;

            // Set the current movie filename and title (if there are any new movies)
            if (typeof this.pending[this.currentDrive] !== 'undefined' && this.pending[this.currentDrive].movies.length > 0) {
                // Set filename
                this.currentMovie.filename = this.pending[this.currentDrive].movies[0];

                // Set title
            }
        }
    }
});

/***/ })

/******/ });