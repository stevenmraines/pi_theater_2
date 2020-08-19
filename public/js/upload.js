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

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(417);


/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

/*
 * SETUP COMPONENTS
 */
Vue.component('collection-input', __webpack_require__(418));
Vue.component('drive-form', __webpack_require__(421));
Vue.component('episode-file-input', __webpack_require__(424));
Vue.component('episode-form', __webpack_require__(427));
Vue.component('episode-number-input', __webpack_require__(430));
Vue.component('genre-input', __webpack_require__(433));
Vue.component('image-file-input', __webpack_require__(436));
Vue.component('image-url-input', __webpack_require__(441));
Vue.component('imdb-search-input', __webpack_require__(444));
Vue.component('jumbotron-input', __webpack_require__(447));
Vue.component('movie-form', __webpack_require__(450));
Vue.component('multi-collection-input', __webpack_require__(453));
Vue.component('multi-genre-input', __webpack_require__(456));
Vue.component('multi-image-input', __webpack_require__(459));
Vue.component('notes-input', __webpack_require__(462));
Vue.component('poster-input', __webpack_require__(465));
Vue.component('season-input', __webpack_require__(468));
Vue.component('show-form', __webpack_require__(471));
Vue.component('shows-input', __webpack_require__(474));
Vue.component('submit-input', __webpack_require__(477));
Vue.component('summary-input', __webpack_require__(482));
Vue.component('title-input', __webpack_require__(485));
Vue.component('video-file-input', __webpack_require__(488));
Vue.component('year-end-input', __webpack_require__(491));
Vue.component('year-input', __webpack_require__(494));
Vue.component('year-released-input', __webpack_require__(497));
Vue.component('year-start-input', __webpack_require__(500));

/*
 * ROOT VUE INSTANCE
 */
var app = new Vue({
    el: '#app',

    data: {
        initialState: window.__INITIAL_STATE__
    }
});

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(419)
/* template */
var __vue_template__ = __webpack_require__(420)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\CollectionInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ee320d5", Component.options)
  } else {
    hotAPI.reload("data-v-1ee320d5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO abstract this and GenreInput to another more generic component that handles both
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['allCollections', 'eventDispatcher', 'index', 'value'],

    methods: {
        collectionChange: function collectionChange(event) {
            this.change(event.target.value);
        },

        collectionSet: function collectionSet(collection) {
            this.change(collection);
        },

        change: function change(value) {
            this.eventDispatcher.$emit('collectionChange', {
                index: this.index,
                value: value
            });
        }
    }
});

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "input-group mb-3" }, [
    _c("div", { staticClass: "input-group-prepend" }, [
      _c("div", { staticClass: "dropdown" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-primary dropdown-toggle",
            attrs: { type: "button", "data-toggle": "dropdown" }
          },
          [_vm._v("\n                Options\n            ")]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "dropdown-menu" },
          _vm._l(_vm.allCollections, function(c, index) {
            return _c(
              "a",
              {
                key: index,
                staticClass: "dropdown-item",
                attrs: { href: "javascript:void(0);" },
                on: {
                  click: function($event) {
                    _vm.collectionSet(c)
                  }
                }
              },
              [
                _vm._v(
                  "\n                    " + _vm._s(c) + "\n                "
                )
              ]
            )
          })
        )
      ])
    ]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      domProps: { value: _vm.value },
      on: { change: _vm.collectionChange, input: _vm.collectionChange }
    }),
    _vm._v(" "),
    _c("div", { staticClass: "input-group-append" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-primary",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              _vm.eventDispatcher.$emit("collectionAdd")
            }
          }
        },
        [_vm._v("\n            +\n        ")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-danger",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              _vm.eventDispatcher.$emit("collectionRemove", _vm.index)
            }
          }
        },
        [_vm._v("\n            x\n        ")]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1ee320d5", module.exports)
  }
}

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(422)
/* template */
var __vue_template__ = __webpack_require__(423)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\DriveForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78bffb92", Component.options)
  } else {
    hotAPI.reload("data-v-78bffb92", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            currentDrive: 0,
            drives: window.__INITIAL_STATE__.drives,
            eventDispatcher: new Vue({}),
            pending: window.__INITIAL_STATE__.pending,
            shows: this.sortShows(window.__INITIAL_STATE__.shows)
        };
    },


    computed: {
        collections: function collections() {
            var collections = [];

            for (var i = 0; i < window.__INITIAL_STATE__.collections.length; i++) {
                collections.push(window.__INITIAL_STATE__.collections[i].name);
            }

            return collections;
        },

        episodes: function episodes() {
            if (this.currentDrive <= 0 || typeof this.pending[this.currentDrive] === 'undefined') {
                return [];
            }

            return this.pending[this.currentDrive].episodes;
        },

        genres: function genres() {
            var genres = [];

            for (var i = 0; i < window.__INITIAL_STATE__.genres.length; i++) {
                genres.push(window.__INITIAL_STATE__.genres[i].name);
            }

            return genres;
        },

        movies: function movies() {
            if (this.currentDrive <= 0 || typeof this.pending[this.currentDrive] === 'undefined') {
                return [];
            }

            return this.pending[this.currentDrive].movies;
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

            // Listen for child form events
            this.eventDispatcher.$on('movieSubmit', this.movieSubmit);
            this.eventDispatcher.$on('episodeSubmit', this.episodeSubmit);
        }
    },


    methods: {
        episodeSubmit: function episodeSubmit(file) {
            var index = this.pending[this.currentDrive].episodes.indexOf(file);
            this.pending[this.currentDrive].episodes.splice(index, 1);
        },
        movieSubmit: function movieSubmit(movie) {
            var index = _.findIndex(this.pending[this.currentDrive].movies, { filename: movie.filename });
            if (index >= 0) {
                this.pending[this.currentDrive].movies.splice(index, 1);
            }
        },
        sortShows: function sortShows(shows) {
            return shows.sort(function (a, b) {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            });
        }
    }
});

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col" }, [
        _c("form", { staticClass: "form-inline", attrs: { novalidate: "" } }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "drive" } }, [_vm._v("Hard drive")]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.currentDrive,
                    expression: "currentDrive"
                  }
                ],
                staticClass: "form-control ml-3",
                attrs: { id: "drive" },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.currentDrive = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  }
                }
              },
              [
                _c(
                  "option",
                  { key: 0, attrs: { selected: "" }, domProps: { value: 0 } },
                  [_vm._v("Please Select...")]
                ),
                _vm._v(" "),
                _vm._l(_vm.drives, function(drive) {
                  return _c(
                    "option",
                    { key: drive.id, domProps: { value: drive.id } },
                    [
                      _vm._v(
                        "\n                            " +
                          _vm._s(drive.name) +
                          "\n                        "
                      )
                    ]
                  )
                })
              ],
              2
            ),
            _vm._v(" "),
            _vm.currentDrive > 0
              ? _c("h3", { staticClass: "d-inline mb-0 ml-3" }, [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.newUploadsMessage) +
                      "\n                    "
                  )
                ])
              : _vm._e()
          ])
        ]),
        _c("hr")
      ])
    ]),
    _vm._v(" "),
    _vm.currentDrive > 0
      ? _c("div", [
          _c(
            "div",
            { staticClass: "card", attrs: { role: "tablist" } },
            [
              _c("h5", { staticClass: "card-header mb-0" }, [
                _c(
                  "a",
                  {
                    attrs: {
                      "data-toggle": "collapse",
                      href: "#movie-form-container",
                      role: "tab"
                    }
                  },
                  [
                    _vm._v(
                      "\n                    Add Movies (" +
                        _vm._s(_vm.movies.length) +
                        " pending)\n                "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("movie-form", {
                staticClass: "card-body collapse",
                attrs: {
                  id: "movie-form-container",
                  role: "tabpanel",
                  collections: _vm.collections,
                  drive: _vm.currentDrive,
                  driveEventDispatcher: _vm.eventDispatcher,
                  files: _vm.movies,
                  genres: _vm.genres
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "card", attrs: { role: "tablist" } },
            [
              _c("h5", { staticClass: "card-header mb-0" }, [
                _c(
                  "a",
                  {
                    attrs: {
                      "data-toggle": "collapse",
                      href: "#episode-form-container",
                      role: "tab"
                    }
                  },
                  [
                    _vm._v(
                      "\n                    Add Episodes (" +
                        _vm._s(_vm.episodes.length) +
                        " pending)\n                "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("episode-form", {
                staticClass: "card-body collapse",
                attrs: {
                  id: "episode-form-container",
                  role: "tabpanel",
                  drive: _vm.currentDrive,
                  driveEventDispatcher: _vm.eventDispatcher,
                  files: _vm.episodes,
                  shows: _vm.shows
                }
              })
            ],
            1
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "card", attrs: { role: "tablist" } },
      [
        _vm._m(0),
        _vm._v(" "),
        _c("show-form", {
          staticClass: "card-body collapse",
          attrs: {
            id: "show-form-container",
            role: "tabpanel",
            collections: _vm.collections,
            drive: _vm.currentDrive,
            driveEventDispatcher: _vm.eventDispatcher,
            genres: _vm.genres
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h5", { staticClass: "card-header mb-0" }, [
      _c(
        "a",
        {
          attrs: {
            "data-toggle": "collapse",
            href: "#show-form-container",
            role: "tab"
          }
        },
        [_vm._v("\n                Add Shows\n            ")]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-78bffb92", module.exports)
  }
}

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(425)
/* template */
var __vue_template__ = __webpack_require__(426)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\EpisodeFileInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9b3c1a8c", Component.options)
  } else {
    hotAPI.reload("data-v-9b3c1a8c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO figure out how to do bootstrap labels without ID
// TODO can probably get rid of this component and just have videofileinput once I add IMDb API support on episodes
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'files', 'value']
});

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "file" } }, [_vm._v("File")]),
    _vm._v(" "),
    _c(
      "select",
      {
        staticClass: "form-control",
        attrs: { id: "file" },
        domProps: { value: _vm.value },
        on: {
          change: function($event) {
            _vm.eventDispatcher.$emit("videoFileChange", $event.target.value)
          }
        }
      },
      _vm._l(_vm.files, function(f) {
        return _c("option", { key: f, domProps: { value: f } }, [
          _vm._v("\n            " + _vm._s(f) + "\n        ")
        ])
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9b3c1a8c", module.exports)
  }
}

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(428)
/* template */
var __vue_template__ = __webpack_require__(429)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\EpisodeForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f7d6c530", Component.options)
  } else {
    hotAPI.reload("data-v-f7d6c530", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO abstract EpisodeForm and MovieForm into generic component
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['drive', 'driveEventDispatcher', 'files', 'shows'],

    data: function data() {
        return {
            currentFile: this.files[0],
            eventDispatcher: new Vue({}),
            episodes: {}
        };
    },


    computed: {
        currentFileEscaped: function currentFileEscaped() {
            return this.escapeFile(this.currentFile);
        },
        submitDisabled: function submitDisabled() {
            return !this.valid();
        }
    },

    created: function created() {
        // Register events
        this.eventDispatcher.$on('episodeNumberChange', this.episodeNumberChange);
        this.eventDispatcher.$on('seasonChange', this.seasonChange);
        this.eventDispatcher.$on('showChange', this.showChange);
        this.eventDispatcher.$on('submit', this.submit);
        this.eventDispatcher.$on('summaryChange', this.summaryChange);
        this.eventDispatcher.$on('titleChange', this.titleChange);
        this.eventDispatcher.$on('videoFileChange', this.videoFileChange);

        // Initialize movies array
        for (var i = 0; i < this.files.length; i++) {
            var objectDefaults = {
                drive_id: this.drive,
                episodeNumber: this.getEpisodeNumberFromFile(this.files[i]),
                file: this.files[i],
                season: this.getSeasonFromFile(this.files[i]),
                media_id: this.getShowFromFile(this.files[i]),
                summary: '',
                title: ''
            };

            // Use set function to maintain reactivity
            Vue.set(this.episodes, this.escapeFile(this.files[i]), objectDefaults);
        }
    },


    methods: {
        episodeNumberChange: function episodeNumberChange(episodeNumber) {
            Vue.set(this.episodes[this.currentFileEscaped], 'episodeNumber', parseInt(episodeNumber));
        },
        episodeNumberValid: function episodeNumberValid() {
            return this.numberValid(this.episodes[this.currentFileEscaped].episodeNumber);
        },
        escapeFile: function escapeFile(file) {
            return file.replace('.', '');
        },
        getEpisodeNumberFromFile: function getEpisodeNumberFromFile(file) {
            return parseInt(file.replace(/.+_s\d{2}-e([0-9]{2}).+/, '$1'));
        },
        getSeasonFromFile: function getSeasonFromFile(file) {
            return parseInt(file.replace(/.+_s(\d{2})-e.+/, '$1'));
        },
        getShowFromFile: function getShowFromFile(file) {
            var fileShow = file.replace(/(.+)_(.+)/, '$1').replace(/-/g, ' ');

            for (var i = 0; i < this.shows.length; i++) {
                // TODO strip out things like - : ' from show title
                if (fileShow.toLowerCase().localeCompare(this.shows[i].title.toLowerCase()) === 0) {
                    return this.shows[i].id;
                }
            }

            return this.shows[0].id;
        },
        numberValid: function numberValid(number) {
            return number > 0 && !isNaN(number);
        },
        seasonChange: function seasonChange(season) {
            Vue.set(this.episodes[this.currentFileEscaped], 'season', parseInt(season));
        },
        seasonValid: function seasonValid() {
            return this.numberValid(this.episodes[this.currentFileEscaped].season);
        },
        showChange: function showChange(show) {
            Vue.set(this.episodes[this.currentFileEscaped], 'media_id', show);
        },
        submit: function submit() {
            var episode = this.episodes[this.currentFileEscaped];

            var formData = window.getFormData(episode);

            var self = this;

            axios.post('/api/upload/episode', formData).then(function (response) {
                console.log(response);
                self.driveEventDispatcher.$emit('episodeSubmit', self.currentFile);
            }).catch(function (error) {
                console.log(error);
            });
        },
        summaryChange: function summaryChange(summary) {
            Vue.set(this.episodes[this.currentFileEscaped], 'summary', summary);
        },
        titleChange: function titleChange(title) {
            Vue.set(this.episodes[this.currentFileEscaped], 'title', title);
        },
        titleEmpty: function titleEmpty() {
            return this.episodes[this.currentFileEscaped].title === '';
        },
        valid: function valid() {
            return !this.titleEmpty() && this.seasonValid() && this.episodeNumberValid();
        },
        videoFileChange: function videoFileChange(file) {
            this.currentFile = file;
        }
    }
});

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.drive > 0 && _vm.files.length > 0
    ? _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col" }, [
          _c(
            "form",
            {
              attrs: {
                id: "episode-form",
                method: "POST",
                enctype: "multipart/form-data",
                novalidate: ""
              }
            },
            [
              _c("episode-file-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  files: _vm.files,
                  value: _vm.currentFile
                }
              }),
              _vm._v(" "),
              _c("shows-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  shows: _vm.shows,
                  value: _vm.episodes[_vm.currentFileEscaped].media_id
                }
              }),
              _vm._v(" "),
              _c("season-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.episodes[_vm.currentFileEscaped].season
                }
              }),
              _vm._v(" "),
              !_vm.seasonValid()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v("The Season field is not valid\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("episode-number-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.episodes[_vm.currentFileEscaped].episodeNumber
                }
              }),
              _vm._v(" "),
              !_vm.episodeNumberValid()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v(
                        "The Episode Number field is not valid\n            "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("title-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.episodes[_vm.currentFileEscaped].title
                }
              }),
              _vm._v(" "),
              _vm.titleEmpty()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v("The Title field is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("summary-input", {
                attrs: { eventDispatcher: _vm.eventDispatcher, required: false }
              }),
              _vm._v(" "),
              _c("submit-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  disabled: _vm.submitDisabled
                }
              })
            ],
            1
          )
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f7d6c530", module.exports)
  }
}

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(431)
/* template */
var __vue_template__ = __webpack_require__(432)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\EpisodeNumberInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3046368d", Component.options)
  } else {
    hotAPI.reload("data-v-3046368d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value'],

    methods: {
        episodeNumberChange: function episodeNumberChange(event) {
            this.eventDispatcher.$emit('episodeNumberChange', event.target.value);
        }
    }
});

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "episode-number" } }, [
      _vm._v("* Episode Number")
    ]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      attrs: { type: "number", id: "episode-number", min: "1" },
      domProps: { value: _vm.value },
      on: { change: _vm.episodeNumberChange, input: _vm.episodeNumberChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3046368d", module.exports)
  }
}

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(434)
/* template */
var __vue_template__ = __webpack_require__(435)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\GenreInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-08b7e40e", Component.options)
  } else {
    hotAPI.reload("data-v-08b7e40e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['allGenres', 'eventDispatcher', 'index', 'value'],

    methods: {
        genreChange: function genreChange(event) {
            this.change(event.target.value);
        },

        genreSet: function genreSet(genre) {
            this.change(genre);
        },

        change: function change(value) {
            this.eventDispatcher.$emit('genreChange', {
                index: this.index,
                value: value
            });
        }
    }
});

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "input-group mb-3" }, [
    _c("div", { staticClass: "input-group-prepend" }, [
      _c("div", { staticClass: "dropdown" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-primary dropdown-toggle",
            attrs: { type: "button", "data-toggle": "dropdown" }
          },
          [_vm._v("\n                Options\n            ")]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "dropdown-menu" },
          _vm._l(_vm.allGenres, function(g, index) {
            return _c(
              "a",
              {
                key: index,
                staticClass: "dropdown-item",
                attrs: { href: "javascript:void(0);" },
                on: {
                  click: function($event) {
                    _vm.genreSet(g)
                  }
                }
              },
              [
                _vm._v(
                  "\n                    " + _vm._s(g) + "\n                "
                )
              ]
            )
          })
        )
      ])
    ]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      domProps: { value: _vm.value },
      on: { change: _vm.genreChange, input: _vm.genreChange }
    }),
    _vm._v(" "),
    _c("div", { staticClass: "input-group-append" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-primary",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              _vm.eventDispatcher.$emit("genreAdd")
            }
          }
        },
        [_vm._v("\n            +\n        ")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-danger",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              _vm.eventDispatcher.$emit("genreRemove", _vm.index)
            }
          }
        },
        [_vm._v("\n            x\n        ")]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-08b7e40e", module.exports)
  }
}

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(437)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(439)
/* template */
var __vue_template__ = __webpack_require__(440)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6aae231a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\ImageFileInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6aae231a", Component.options)
  } else {
    hotAPI.reload("data-v-6aae231a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(438);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(62)("56c27c5c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aae231a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageFileInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aae231a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageFileInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\ninput[type=\"file\"][data-v-6aae231a] {\n    display: none;\n}\n.file-drop[data-v-6aae231a] {\n    outline-style: dashed;\n    background-color: rgba(200,220,255,0.7);\n    text-align: center;\n    cursor: pointer;\n}\n.drag[data-v-6aae231a] {\n    outline-color: blue;\n    background-color: rgba(170,190,235,0.7);\n}\n", ""]);

// exports


/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO fix bug where escaping from file selection without picking anything still sets a FileList to value
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value'],

    data: function data() {
        return {
            isDrag: false
        };
    },


    computed: {
        message: function message() {
            if (!this.value || this.value.length === 0) {
                return 'Select a File';
            }

            if (this.value.length === 1) {
                return 'Selected File: ' + this.value.item(0).name;
            }
        }
    },

    methods: {
        fileChange: function fileChange(event) {
            this.isDrag = false;
            var dataTransfer = event.dataTransfer || event.target;
            this.eventDispatcher.$emit('imageFileChange', dataTransfer.files);
        },
        triggerFileClick: function triggerFileClick() {
            this.$refs.fileInput.click();
        }
    }
});

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c(
      "div",
      {
        staticClass: "file-drop p-5",
        class: { drag: _vm.isDrag },
        on: {
          dragenter: function($event) {
            $event.preventDefault()
            $event.stopPropagation()
            _vm.isDrag = true
          },
          dragover: function($event) {
            $event.preventDefault()
            $event.stopPropagation()
            _vm.isDrag = true
          },
          dragleave: function($event) {
            $event.preventDefault()
            $event.stopPropagation()
            _vm.isDrag = false
          },
          drop: function($event) {
            $event.preventDefault()
            $event.stopPropagation()
            return _vm.fileChange($event)
          },
          click: _vm.triggerFileClick
        }
      },
      [
        _c(
          "button",
          { staticClass: "btn btn-primary", attrs: { type: "button" } },
          [_vm._v("\n            Upload\n        ")]
        )
      ]
    ),
    _vm._v(" "),
    _c("span", [_vm._v("\n        " + _vm._s(_vm.message) + "\n    ")]),
    _vm._v(" "),
    _c("input", {
      ref: "fileInput",
      attrs: { type: "file", accept: "image/*" },
      on: { change: _vm.fileChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6aae231a", module.exports)
  }
}

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(442)
/* template */
var __vue_template__ = __webpack_require__(443)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\ImageUrlInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e3fb4b42", Component.options)
  } else {
    hotAPI.reload("data-v-e3fb4b42", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value'],

    data: function data() {
        return {
            id: null,
            image: null,
            imageLoaded: false
        };
    },
    mounted: function mounted() {
        this.id = this._uid;
        /*
            Reapply src here so that the preview button is correctly enabled or
            disabled when switching between image URL or file for poster input.
        */
        this.image.src = this.value;
    },
    created: function created() {
        this.image = new Image();
        this.image.onload = this.onload;
        this.image.onerror = this.onerror;
    },


    watch: {
        /*
            Watch for changes in value prop so that imageLoaded will
            be updated when value is set in MovieForm or ShowForm.
        */
        value: function value(newValue) {
            this.image.src = newValue;
        }
    },

    methods: {
        onerror: function onerror() {
            this.imageLoaded = false;
        },
        onload: function onload() {
            this.imageLoaded = true;
        },
        urlChange: function urlChange(event) {
            this.image.src = event.target.value;
            this.eventDispatcher.$emit('imageUrlChange', event.target.value);
        }
    }
});

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("div", { staticClass: "input-group" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-primary input-group-prepend",
          attrs: {
            "data-toggle": "modal",
            "data-target": "#" + _vm.id,
            disabled: !_vm.imageLoaded,
            type: "button"
          }
        },
        [_vm._v("\n            Preview\n        ")]
      ),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { placeholder: "https://www.example.com/images/picture.jpg" },
        domProps: { value: _vm.value },
        on: { change: _vm.urlChange, input: _vm.urlChange }
      })
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal",
        attrs: { id: _vm.id, tabindex: "-1", role: "dialog" }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog", attrs: { role: "document" } },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c("img", {
                  staticStyle: { width: "100%", height: "auto" },
                  attrs: { src: _vm.value }
                })
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c("h5", { staticClass: "modal-title" }, [_vm._v("Preview")]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: { type: "button", "data-dismiss": "modal" }
        },
        [_c("span", [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e3fb4b42", module.exports)
  }
}

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(445)
/* template */
var __vue_template__ = __webpack_require__(446)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\IMDbSearchInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8ab31fee", Component.options)
  } else {
    hotAPI.reload("data-v-8ab31fee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'results', 'value'],

    data: function data() {
        return {
            id: null
        };
    },
    mounted: function mounted() {
        this.id = this._uid;
    }
});

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: _vm.id } }, [_vm._v("IMDb Search")]),
    _vm._v(" "),
    _c(
      "select",
      {
        staticClass: "form-control",
        attrs: { id: _vm.id },
        domProps: { value: _vm.value },
        on: {
          change: function($event) {
            _vm.eventDispatcher.$emit("imdbSearchChange", $event.target.value)
          }
        }
      },
      _vm._l(_vm.results.d, function(result) {
        return _c(
          "option",
          { key: result.id, domProps: { value: result.id } },
          [
            _vm._v(
              "\n            " +
                _vm._s(result.l) +
                " (" +
                _vm._s(result.yr ? result.yr : result.y) +
                ")\n        "
            )
          ]
        )
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8ab31fee", module.exports)
  }
}

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(448)
/* template */
var __vue_template__ = __webpack_require__(449)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\JumbotronInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-625992f6", Component.options)
  } else {
    hotAPI.reload("data-v-625992f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'file'],

    data: function data() {
        return {
            id: null,
            localEventDispatcher: new Vue({})
        };
    },
    created: function created() {
        var _this = this;

        this.localEventDispatcher.$on('imageFileChange', function (event) {
            return _this.eventDispatcher.$emit('jumbotronChange', event);
        });
    },
    mounted: function mounted() {
        this.id = this._uid;
    }
});

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: _vm.id } }, [
      _vm._v("\n        Jumbotron Image\n    ")
    ]),
    _vm._v(" "),
    _c(
      "div",
      { attrs: { id: _vm.id } },
      [
        _c("image-file-input", {
          attrs: { eventDispatcher: _vm.localEventDispatcher, value: _vm.file }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-625992f6", module.exports)
  }
}

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(451)
/* template */
var __vue_template__ = __webpack_require__(452)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\MovieForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3708a1dd", Component.options)
  } else {
    hotAPI.reload("data-v-3708a1dd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['collections', 'drive', 'driveEventDispatcher', 'files', 'genres'],

    data: function data() {
        return {
            apiTimeout: null,
            currentFile: this.files[0],
            currentImdbSearchResult: null,
            eventDispatcher: new Vue({}),
            movies: [],
            yearMax: new Date().getFullYear(),
            yearMin: 1900
        };
    },


    computed: {
        currentMovie: function currentMovie() {
            var index = _.findIndex(this.movies, { 'file': this.currentFile.filename });

            if (index < 0) {
                return {};
            }

            return this.movies[index];
        },
        submitDisabled: function submitDisabled() {
            return !this.valid();
        }
    },

    created: function created() {
        // Register events
        this.eventDispatcher.$on('collectionAdd', this.collectionAdd);
        this.eventDispatcher.$on('collectionChange', this.collectionChange);
        this.eventDispatcher.$on('collectionRemove', this.collectionRemove);
        this.eventDispatcher.$on('genreAdd', this.genreAdd);
        this.eventDispatcher.$on('genreChange', this.genreChange);
        this.eventDispatcher.$on('genreRemove', this.genreRemove);
        this.eventDispatcher.$on('imdbSearchChange', this.imdbSearchChange);
        this.eventDispatcher.$on('jumbotronChange', this.jumbotronChange);
        this.eventDispatcher.$on('notesChange', this.notesChange);
        this.eventDispatcher.$on('posterChange', this.posterChange);
        this.eventDispatcher.$on('posterUrlChange', this.posterUrlChange);
        this.eventDispatcher.$on('submit', this.submit);
        this.eventDispatcher.$on('summaryChange', this.summaryChange);
        this.eventDispatcher.$on('titleChange', this.titleChange);
        this.eventDispatcher.$on('videoFileChange', this.videoFileChange);
        this.eventDispatcher.$on('yearReleasedChange', this.yearReleasedChange);

        // Initialize movies array
        for (var i = 0; i < this.files.length; i++) {
            this.movies.push({
                collections: [''],
                drive_id: this.drive,
                file: this.files[i].filename,
                genres: [''],
                imdb: this.files[i].imdb,
                jumbotron: null,
                notes: '',
                poster: null,
                posterUrl: '',
                summary: '',
                title: this.files[i].title,
                yearReleased: new Date().getFullYear()
            });
        }
    },


    methods: {
        collectionAdd: function collectionAdd() {
            this.currentMovie.collections.push('');
        },
        collectionChange: function collectionChange(data) {
            Vue.set(this.currentMovie.collections, data.index, data.value);
        },
        collectionDuplicates: function collectionDuplicates() {
            var previousCollections = [];

            for (var i = 0; i < this.currentMovie.collections.length; i++) {
                var currentCollection = this.currentMovie.collections[i];

                if (previousCollections.indexOf(currentCollection) >= 0) {
                    return true;
                }

                previousCollections.push(currentCollection);
            }

            return false;
        },
        collectionEmpty: function collectionEmpty() {
            var collections = this.currentMovie.collections;

            if (collections.length > 1) {
                for (var i = 0; i < collections.length; i++) {
                    if (collections[i] === '') {
                        return true;
                    }
                }
            }

            return false;
        },
        collectionRemove: function collectionRemove(index) {
            var newCollections = [''];

            if (this.currentMovie.collections.length > 1) {
                this.currentMovie.collections.splice(index, 1);
                newCollections = this.currentMovie.collections;
            }

            Vue.set(this.currentMovie, 'collections', newCollections);
        },
        fileListToArray: function fileListToArray(fileList) {
            var files = [];

            for (var i = 0; i < fileList.length; i++) {
                if (typeof fileList.item(i) !== 'undefined') {
                    files.push(fileList.item(i));
                }
            }

            return files;
        },
        genreAdd: function genreAdd() {
            this.currentMovie.genres.push('');
        },
        genreChange: function genreChange(data) {
            this.currentMovie.genres[data.index] = data.value;
        },
        genreDuplicates: function genreDuplicates() {
            var previousGenres = [];

            for (var i = 0; i < this.currentMovie.genres.length; i++) {
                var currentGenre = this.currentMovie.genres[i];

                if (previousGenres.indexOf(currentGenre) >= 0) {
                    return true;
                }

                previousGenres.push(currentGenre);
            }

            return false;
        },
        genreEmpty: function genreEmpty() {
            for (var i = 0; i < this.currentMovie.genres.length; i++) {
                if (this.currentMovie.genres[i] === '') {
                    return true;
                }
            }

            return false;
        },
        genreRemove: function genreRemove(index) {
            var newGenres = [''];

            if (this.currentMovie.genres.length > 1) {
                this.currentMovie.genres.splice(index, 1);
                newGenres = this.currentMovie.genres;
            }

            this.currentMovie.genres = newGenres;
        },
        imdbSearchChange: function imdbSearchChange(imdbId) {
            this.currentImdbSearchResult = imdbId;
            var index = _.findIndex(this.currentMovie.imdb.d, { id: imdbId });

            if (index >= 0) {
                this.currentMovie.poster = null;
                var imdb = this.currentMovie.imdb.d[index];
                this.currentMovie.title = imdb.l;
                this.currentMovie.yearReleased = imdb.y;

                if (imdb.i) {
                    this.currentMovie.posterUrl = imdb.i.imageUrl;
                }

                // Call to API to get more details
                var url = 'https://imdb8.p.rapidapi.com/title/get-overview-details';
                var options = {
                    headers: {
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                        'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                    },
                    params: {
                        'tconst': imdbId
                    }
                };

                var self = this;

                axios.get(url, options).then(function (response) {
                    // Set the genres
                    var genres = [''];

                    if (response.data.genres) {
                        genres = response.data.genres;
                    }

                    self.currentMovie.genres = genres;

                    // Set the summary
                    var summary = '';

                    if (response.data.plotOutline) {
                        summary = response.data.plotOutline.text;
                    }

                    if (!summary && response.data.plotSummary) {
                        summary = response.data.plotSummary.text;
                    }

                    self.currentMovie.summary = summary;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        jumbotronChange: function jumbotronChange(fileList) {
            this.currentMovie.jumbotron = fileList;
        },
        notesChange: function notesChange(notes) {
            this.currentMovie.notes = notes;
        },
        posterChange: function posterChange(fileList) {
            this.currentMovie.poster = fileList;
        },
        posterEmpty: function posterEmpty() {
            return !this.currentMovie.poster && !this.currentMovie.posterUrl;
        },
        posterUrlChange: function posterUrlChange(url) {
            this.currentMovie.posterUrl = url;
        },
        submit: function submit() {
            var movie = this.currentMovie;

            // If both inputs are filled with data, default to posterUrl
            if (movie.posterUrl) {
                delete movie.poster;
            }

            if (movie.poster) {
                movie.poster = movie.poster.item(0);
                delete movie.posterUrl;
            }

            if (!movie.jumbotron) {
                delete movie.jumbotron;
            }

            if (movie.jumbotron) {
                movie.jumbotron = movie.jumbotron.item(0);
            }

            var formData = window.getFormData(movie);

            var self = this;

            axios.post('/api/upload/movie', formData).then(function (response) {
                self.driveEventDispatcher.$emit('movieSubmit', self.currentFile);
            }).catch(function (error) {
                console.log(error);
            });
        },
        summaryChange: function summaryChange(summary) {
            this.currentMovie.summary = summary;
        },
        summaryEmpty: function summaryEmpty() {
            return this.currentMovie.summary === '';
        },
        titleChange: function titleChange(title) {
            this.currentMovie.title = title;

            // Update IMDb API search results
            if (title !== '') {
                // Don't overload API with requests
                clearTimeout(this.apiTimeout);

                var self = this;

                this.apiTimeout = setTimeout(function () {
                    var url = 'https://imdb8.p.rapidapi.com/title/auto-complete';
                    var options = {
                        headers: {
                            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                            'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                        },
                        params: {
                            'q': title
                        }
                    };

                    axios.get(url, options).then(function (response) {
                        self.currentMovie.imdb = response.data;
                        self.currentImdbSearchResult = null;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }, 1000);
            }
        },
        titleEmpty: function titleEmpty() {
            return this.currentMovie.title === '';
        },
        valid: function valid() {
            return !this.titleEmpty() && this.yearValid() && !this.summaryEmpty() && !this.posterEmpty() && !this.genreEmpty() && !this.genreDuplicates() && !this.collectionDuplicates() && !this.collectionEmpty();
        },
        videoFileChange: function videoFileChange(file) {
            this.currentFile = file;
        },
        yearReleasedChange: function yearReleasedChange(yearReleased) {
            this.currentMovie.yearReleased = parseInt(yearReleased);
        },
        yearValid: function yearValid() {
            return this.currentMovie.yearReleased <= this.yearMax && this.currentMovie.yearReleased >= this.yearMin && !isNaN(this.currentMovie.yearReleased);
        }
    }
});

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.drive > 0 && _vm.files.length > 0
    ? _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col" }, [
          _c(
            "form",
            {
              attrs: {
                id: "movie-form",
                method: "POST",
                enctype: "multipart/form-data",
                novalidate: ""
              }
            },
            [
              _c("video-file-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  files: _vm.files,
                  value: _vm.currentFile.filename
                }
              }),
              _vm._v(" "),
              _c("imdb-search-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  results: _vm.currentMovie.imdb,
                  value: _vm.currentImdbSearchResult
                }
              }),
              _vm._v(" "),
              _c("title-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.currentMovie.title
                }
              }),
              _vm._v(" "),
              _vm.titleEmpty()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v("The Title field is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("year-released-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  title: _vm.currentMovie.title,
                  value: _vm.currentMovie.yearReleased
                }
              }),
              _vm._v(" "),
              !_vm.yearValid()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v(
                        "The Year Released field is not valid\n            "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("summary-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  required: true,
                  value: _vm.currentMovie.summary
                }
              }),
              _vm._v(" "),
              _vm.summaryEmpty()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v("The Summary field is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("notes-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.currentMovie.notes
                }
              }),
              _vm._v(" "),
              _c("poster-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  file: _vm.currentMovie.poster,
                  title: _vm.currentMovie.title,
                  url: _vm.currentMovie.posterUrl
                }
              }),
              _vm._v(" "),
              _vm.posterEmpty()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v("The Poster Image field is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("jumbotron-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  file: _vm.currentMovie.jumbotron,
                  url: _vm.currentMovie.jumbotronUrl
                }
              }),
              _vm._v(" "),
              _c("multi-genre-input", {
                attrs: {
                  allGenres: _vm.genres,
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.currentMovie.genres
                }
              }),
              _vm._v(" "),
              _vm.genreEmpty()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v("The Genres field is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.genreDuplicates()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v(
                        "There are duplicate values in the Genre fields\n            "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("multi-collection-input", {
                attrs: {
                  allCollections: _vm.collections,
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.currentMovie.collections
                }
              }),
              _vm._v(" "),
              _vm.collectionEmpty()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v(
                        "There are empty values in the Collection fields\n            "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.collectionDuplicates()
                ? _c(
                    "div",
                    {
                      staticClass: "alert alert-danger mb-2",
                      attrs: { role: "alert" }
                    },
                    [
                      _c("strong", [_vm._v("Error: ")]),
                      _vm._v(
                        "There are duplicate values in the Collection fields\n            "
                      )
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("submit-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  disabled: _vm.submitDisabled
                }
              })
            ],
            1
          )
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3708a1dd", module.exports)
  }
}

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(454)
/* template */
var __vue_template__ = __webpack_require__(455)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\MultiCollectionInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2c986cc", Component.options)
  } else {
    hotAPI.reload("data-v-f2c986cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['allCollections', 'eventDispatcher', 'value']
});

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group" },
    [
      _c("label", { attrs: { for: "collections" } }, [_vm._v("Collections")]),
      _vm._v(" "),
      _vm._l(_vm.value, function(collection, index) {
        return _c("collection-input", {
          key: index,
          attrs: {
            id: "collections",
            allCollections: _vm.allCollections,
            eventDispatcher: _vm.eventDispatcher,
            index: index,
            value: collection
          }
        })
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f2c986cc", module.exports)
  }
}

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(457)
/* template */
var __vue_template__ = __webpack_require__(458)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\MultiGenreInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50d67dae", Component.options)
  } else {
    hotAPI.reload("data-v-50d67dae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['allGenres', 'eventDispatcher', 'value']
});

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group" },
    [
      _c("label", { attrs: { for: "genres" } }, [_vm._v("* Genres")]),
      _vm._v(" "),
      _vm._l(_vm.value, function(genre, index) {
        return _c("genre-input", {
          key: index,
          attrs: {
            id: "genres",
            allGenres: _vm.allGenres,
            eventDispatcher: _vm.eventDispatcher,
            index: index,
            value: genre
          }
        })
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-50d67dae", module.exports)
  }
}

/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(460)
/* template */
var __vue_template__ = __webpack_require__(461)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\MultiImageInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-458f7451", Component.options)
  } else {
    hotAPI.reload("data-v-458f7451", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'file', 'url'],

    computed: {
        fileClasses: function fileClasses() {
            return {
                'btn-primary': this.inputType === 'file',
                'btn-outline-primary': this.inputType !== 'file'
            };
        },
        urlClasses: function urlClasses() {
            return {
                'btn-primary': this.inputType === 'url',
                'btn-outline-primary': this.inputType !== 'url'
            };
        }
    },

    data: function data() {
        return {
            inputType: 'url'
        };
    }
});

/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "d-flex justify-content-center mb-3" }, [
        _c(
          "button",
          {
            staticClass: "btn",
            class: _vm.urlClasses,
            attrs: { type: "button" },
            on: {
              click: function($event) {
                _vm.inputType = "url"
              }
            }
          },
          [_vm._v("Image URL")]
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn",
            class: _vm.fileClasses,
            attrs: { type: "button" },
            on: {
              click: function($event) {
                _vm.inputType = "file"
              }
            }
          },
          [_vm._v("Image File")]
        )
      ]),
      _vm._v(" "),
      _vm.inputType == "file"
        ? _c("image-file-input", {
            attrs: { eventDispatcher: _vm.eventDispatcher, value: _vm.file }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.inputType == "url"
        ? _c("image-url-input", {
            attrs: { eventDispatcher: _vm.eventDispatcher, value: _vm.url }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-458f7451", module.exports)
  }
}

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(463)
/* template */
var __vue_template__ = __webpack_require__(464)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\NotesInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fd10b6e0", Component.options)
  } else {
    hotAPI.reload("data-v-fd10b6e0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO figure out how to do labels without IDs
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value'],

    methods: {
        notesChange: function notesChange(event) {
            this.eventDispatcher.$emit('notesChange', event.target.value);
        }
    }
});

/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "notes" } }, [_vm._v("Notes")]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control font-italic",
      attrs: { id: "notes" },
      domProps: { value: _vm.value },
      on: { change: _vm.notesChange, input: _vm.notesChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fd10b6e0", module.exports)
  }
}

/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(466)
/* template */
var __vue_template__ = __webpack_require__(467)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\PosterInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-beb870f4", Component.options)
  } else {
    hotAPI.reload("data-v-beb870f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'file', 'title', 'url'],

    data: function data() {
        return {
            id: null,
            localEventDispatcher: new Vue({})
        };
    },
    created: function created() {
        var _this = this;

        this.localEventDispatcher.$on('imageFileChange', function (event) {
            return _this.eventDispatcher.$emit('posterChange', event);
        });
        this.localEventDispatcher.$on('imageUrlChange', function (event) {
            return _this.eventDispatcher.$emit('posterUrlChange', event);
        });
    },
    mounted: function mounted() {
        this.id = this._uid;
    }
});

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: _vm.id } }, [
      _vm._v("\n        * Poster Image\n        "),
      _c(
        "a",
        {
          attrs: {
            href:
              "https://www.google.com/search?q=" +
              _vm.title +
              "+poster&tbm=isch",
            target: "_blank"
          }
        },
        [_vm._v(" (Google)")]
      ),
      _vm._v(" "),
      _c(
        "a",
        {
          attrs: {
            href:
              "https://www.impawards.com/search.php?search_data=" + _vm.title,
            target: "_blank"
          }
        },
        [_vm._v(" (IMP Awards)")]
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { attrs: { id: _vm.id } },
      [
        _c("multi-image-input", {
          attrs: {
            eventDispatcher: _vm.localEventDispatcher,
            file: _vm.file,
            url: _vm.url
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-beb870f4", module.exports)
  }
}

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(469)
/* template */
var __vue_template__ = __webpack_require__(470)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\SeasonInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e6d42b0", Component.options)
  } else {
    hotAPI.reload("data-v-0e6d42b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value'],

    methods: {
        seasonChange: function seasonChange(event) {
            this.eventDispatcher.$emit('seasonChange', event.target.value);
        }
    }
});

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "season" } }, [_vm._v("* Season")]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      attrs: { type: "number", id: "season", min: "1" },
      domProps: { value: _vm.value },
      on: { change: _vm.seasonChange, input: _vm.seasonChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0e6d42b0", module.exports)
  }
}

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(472)
/* template */
var __vue_template__ = __webpack_require__(473)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\ShowForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fc457b0", Component.options)
  } else {
    hotAPI.reload("data-v-3fc457b0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['collections', 'drive', 'driveEventDispatcher', 'genres'],

    data: function data() {
        return {
            apiTimeout: null,
            currentImdbSearchResult: null,
            eventDispatcher: new Vue({}),
            show: {
                collections: [''],
                genres: [''],
                imdb: {
                    d: []
                },
                jumbotron: null,
                notes: '',
                poster: null,
                posterUrl: '',
                summary: '',
                title: '',
                yearStart: 0,
                yearEnd: 0
            },
            yearMax: new Date().getFullYear(),
            yearMin: 1900
        };
    },


    computed: {
        submitDisabled: function submitDisabled() {
            return !this.valid();
        }
    },

    created: function created() {
        this.eventDispatcher.$on('collectionAdd', this.collectionAdd);
        this.eventDispatcher.$on('collectionChange', this.collectionChange);
        this.eventDispatcher.$on('collectionRemove', this.collectionRemove);
        this.eventDispatcher.$on('genreAdd', this.genreAdd);
        this.eventDispatcher.$on('genreChange', this.genreChange);
        this.eventDispatcher.$on('genreRemove', this.genreRemove);
        this.eventDispatcher.$on('imdbSearchChange', this.imdbSearchChange);
        this.eventDispatcher.$on('jumbotronChange', this.jumbotronChange);
        this.eventDispatcher.$on('notesChange', this.notesChange);
        this.eventDispatcher.$on('posterChange', this.posterChange);
        this.eventDispatcher.$on('posterUrlChange', this.posterUrlChange);
        this.eventDispatcher.$on('submit', this.submit);
        this.eventDispatcher.$on('summaryChange', this.summaryChange);
        this.eventDispatcher.$on('titleChange', this.titleChange);
        this.eventDispatcher.$on('yearEndChange', this.yearEndChange);
        this.eventDispatcher.$on('yearStartChange', this.yearStartChange);

        this.show.yearEnd = this.yearMax;
        this.show.yearStart = this.yearMax;
    },


    methods: {
        collectionAdd: function collectionAdd() {
            this.show.collections.push('');
        },
        collectionChange: function collectionChange(data) {
            Vue.set(this.show.collections, data.index, data.value);
        },
        collectionDuplicates: function collectionDuplicates() {
            var previousCollections = [];

            for (var i = 0; i < this.show.collections.length; i++) {
                var currentCollection = this.show.collections[i];

                if (previousCollections.indexOf(currentCollection) >= 0) {
                    return true;
                }

                previousCollections.push(currentCollection);
            }

            return false;
        },
        collectionEmpty: function collectionEmpty() {
            if (this.show.collections.length > 1) {
                for (var i = 0; i < this.show.collections.length; i++) {
                    if (this.show.collections[i] === '') {
                        return true;
                    }
                }
            }

            return false;
        },
        collectionRemove: function collectionRemove(index) {
            var newCollections = [''];

            if (this.show.collections.length > 1) {
                this.show.collections.splice(index, 1);

                newCollections = this.show.collections;
            }

            Vue.set(this.show, 'collections', newCollections);
        },
        genreAdd: function genreAdd() {
            this.show.genres.push('');
        },
        genreChange: function genreChange(data) {
            Vue.set(this.show.genres, data.index, data.value);
        },
        genreDuplicates: function genreDuplicates() {
            var previousGenres = [];

            for (var i = 0; i < this.show.genres.length; i++) {
                var currentGenre = this.show.genres[i];

                if (previousGenres.indexOf(currentGenre) >= 0) {
                    return true;
                }

                previousGenres.push(currentGenre);
            }

            return false;
        },
        genreEmpty: function genreEmpty() {
            for (var i = 0; i < this.show.genres.length; i++) {
                if (this.show.genres[i] === '') {
                    return true;
                }
            }

            return false;
        },
        genreRemove: function genreRemove(index) {
            var newGenres = [''];

            if (this.show.genres.length > 1) {
                this.show.genres.splice(index, 1);

                newGenres = this.show.genres;
            }

            Vue.set(this.show, 'genres', newGenres);
        },
        imdbSearchChange: function imdbSearchChange(imdbId) {
            this.currentImdbSearchResult = imdbId;
            var index = _.findIndex(this.show.imdb.d, { id: imdbId });

            if (index >= 0) {
                this.show.poster = null;
                var imdb = this.show.imdb.d[index];
                this.show.title = imdb.l;
                this.show.yearStart = imdb.y;

                if (imdb.yr) {
                    this.show.yearEnd = parseInt(imdb.yr.split('-')[1]);
                }

                if (imdb.i) {
                    this.show.posterUrl = imdb.i.imageUrl;
                }

                // Call to API to get more details
                var url = 'https://imdb8.p.rapidapi.com/title/get-overview-details';
                var options = {
                    headers: {
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                        'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                    },
                    params: {
                        'tconst': imdbId
                    }
                };

                var self = this;

                axios.get(url, options).then(function (response) {
                    // Set the genres
                    var genres = [''];

                    if (response.data.genres) {
                        genres = response.data.genres;
                    }

                    self.show.genres = genres;

                    // Set the summary
                    var summary = '';

                    if (response.data.plotOutline) {
                        summary = response.data.plotOutline.text;
                    }

                    if (!summary && response.data.plotSummary) {
                        summary = response.data.plotSummary.text;
                    }

                    self.show.summary = summary;
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        jumbotronChange: function jumbotronChange(fileList) {
            this.show.jumbotron = fileList;
        },
        notesChange: function notesChange(notes) {
            this.show.notes = notes;
        },
        posterChange: function posterChange(filelist) {
            this.show.poster = filelist;
        },
        posterEmpty: function posterEmpty() {
            return !this.show.poster && !this.show.posterUrl;
        },
        posterUrlChange: function posterUrlChange(url) {
            this.show.posterUrl = url;
        },
        reset: function reset() {
            this.show.collections = [''];
            this.show.genres = [''];
            this.show.imdb = {
                d: []
            };
            this.show.jumbotron = null;
            this.show.notes = '';
            this.show.poster = null;
            this.show.posterUrl = '';
            this.show.summary = '';
            this.show.title = '';
            this.show.yearStart = this.yearMax;
            this.show.yearEnd = this.yearMax;
        },
        startGreaterThanEnd: function startGreaterThanEnd() {
            return this.show.yearStart > this.show.yearEnd && this.show.yearEnd > 0;
        },
        submit: function submit() {
            var show = this.show;

            // If both inputs are filled with data, default to posterUrl
            if (show.posterUrl) {
                delete show.poster;
            }

            if (show.poster) {
                show.poster = show.poster.item(0);
                delete show.posterUrl;
            }

            if (!show.jumbotron) {
                delete show.jumbotron;
            }

            if (show.jumbotron) {
                show.jumbotron = show.jumbotron.item(0);
            }

            var formData = window.getFormData(show);

            var self = this;

            axios.post('/api/upload/show', formData).then(function (response) {
                self.reset();
            }).catch(function (error) {
                console.log(error);
            });
        },
        summaryChange: function summaryChange(summary) {
            this.show.summary = summary;
        },
        summaryEmpty: function summaryEmpty() {
            return this.show.summary === '';
        },
        titleChange: function titleChange(title) {
            this.show.title = title;

            // Update IMDb API search results
            if (title !== '') {
                // Don't overload API with requests
                clearTimeout(this.apiTimeout);

                var self = this;

                this.apiTimeout = setTimeout(function () {
                    var url = 'https://imdb8.p.rapidapi.com/title/auto-complete';
                    var options = {
                        headers: {
                            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                            'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                        },
                        params: {
                            'q': title
                        }
                    };

                    axios.get(url, options).then(function (response) {
                        self.show.imdb = response.data;
                        self.currentImdbSearchResult = null;
                    }).catch(function (error) {
                        console.log(error);
                    });
                }, 1000);
            }
        },
        titleEmpty: function titleEmpty() {
            return this.show.title === '';
        },
        valid: function valid() {
            return !this.startGreaterThanEnd() && !this.titleEmpty() && this.yearEndValid() && this.yearStartValid() && !this.summaryEmpty() && !this.posterEmpty() && !this.genreEmpty() && !this.genreDuplicates() && !this.collectionDuplicates() && !this.collectionEmpty();
        },
        yearEndChange: function yearEndChange(yearEnd) {
            this.show.yearEnd = parseInt(yearEnd);
        },
        yearStartChange: function yearStartChange(yearStart) {
            this.show.yearStart = parseInt(yearStart);
        },
        yearEndValid: function yearEndValid() {
            return this.show.yearEnd <= this.yearMax && (this.show.yearEnd >= this.yearMin || this.show.yearEnd == 0) && !isNaN(this.show.yearEnd);
        },
        yearStartValid: function yearStartValid() {
            return this.show.yearStart <= this.yearMax && this.show.yearStart >= this.yearMin && !isNaN(this.show.yearStart);
        }
    }
});

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col" }, [
      _c(
        "form",
        {
          attrs: {
            id: "show-form",
            method: "POST",
            enctype: "multipart/form-data",
            novalidate: ""
          }
        },
        [
          _c("imdb-search-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              results: _vm.show.imdb,
              value: _vm.currentImdbSearchResult
            }
          }),
          _vm._v(" "),
          _c("title-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              value: _vm.show.title
            }
          }),
          _vm._v(" "),
          _vm.titleEmpty()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v("The Title field is required\n            ")
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("year-start-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              title: _vm.show.title,
              value: _vm.show.yearStart
            }
          }),
          _vm._v(" "),
          !_vm.yearStartValid()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v("The Year Start field is not valid\n            ")
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.startGreaterThanEnd()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-warning mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Warning: ")]),
                  _vm._v(
                    "The Year Start field should be less than the Year End\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("year-end-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              value: _vm.show.yearEnd
            }
          }),
          _vm._v(" "),
          !_vm.yearEndValid()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v("The Year End field is not valid\n            ")
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("summary-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              required: true,
              value: _vm.show.summary
            }
          }),
          _vm._v(" "),
          _vm.summaryEmpty()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v("The Summary field is required\n            ")
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("notes-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              value: _vm.show.notes
            }
          }),
          _vm._v(" "),
          _c("poster-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              file: _vm.show.poster,
              title: _vm.show.title,
              url: _vm.show.posterUrl
            }
          }),
          _vm._v(" "),
          _vm.posterEmpty()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v("The Poster Image field is required\n            ")
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("jumbotron-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              file: _vm.show.jumbotron
            }
          }),
          _vm._v(" "),
          _c("multi-genre-input", {
            attrs: {
              allGenres: _vm.genres,
              eventDispatcher: _vm.eventDispatcher,
              value: _vm.show.genres
            }
          }),
          _vm._v(" "),
          _vm.genreEmpty()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v("The Genres field is required\n            ")
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.genreDuplicates()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v(
                    "There are duplicate values in the Genre fields\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("multi-collection-input", {
            attrs: {
              allCollections: _vm.collections,
              eventDispatcher: _vm.eventDispatcher,
              value: _vm.show.collections
            }
          }),
          _vm._v(" "),
          _vm.collectionEmpty()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v(
                    "There are empty values in the Collection fields\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.collectionDuplicates()
            ? _c(
                "div",
                {
                  staticClass: "alert alert-danger mb-2",
                  attrs: { role: "alert" }
                },
                [
                  _c("strong", [_vm._v("Error: ")]),
                  _vm._v(
                    "There are duplicate values in the Collection fields\n            "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("submit-input", {
            attrs: {
              eventDispatcher: _vm.eventDispatcher,
              disabled: _vm.submitDisabled
            }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3fc457b0", module.exports)
  }
}

/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(475)
/* template */
var __vue_template__ = __webpack_require__(476)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\ShowsInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9258844a", Component.options)
  } else {
    hotAPI.reload("data-v-9258844a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'shows', 'value']
});

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "show" } }, [_vm._v("* Show")]),
    _vm._v(" "),
    _c(
      "select",
      {
        staticClass: "form-control",
        attrs: { id: "show" },
        domProps: { value: _vm.value },
        on: {
          change: function($event) {
            _vm.eventDispatcher.$emit("showChange", $event.target.value)
          }
        }
      },
      _vm._l(_vm.shows, function(s) {
        return _c("option", { domProps: { value: s.id } }, [
          _vm._v("\n            " + _vm._s(s.title) + "\n        ")
        ])
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9258844a", module.exports)
  }
}

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(478)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(480)
/* template */
var __vue_template__ = __webpack_require__(481)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-28ff791b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\SubmitInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28ff791b", Component.options)
  } else {
    hotAPI.reload("data-v-28ff791b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(479);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(62)("00acbb09", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-28ff791b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SubmitInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-28ff791b\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SubmitInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(43)(false);
// imports


// module
exports.push([module.i, "\n.btn-disabled[data-v-28ff791b] {\n    cursor: not-allowed;\n}\n", ""]);

// exports


/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['disabled', 'eventDispatcher']
});

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group d-flex justify-content-around mt-3 mb-0" },
    [
      _c(
        "button",
        {
          staticClass: "btn btn-success",
          class: { "btn-disabled": _vm.disabled },
          attrs: { disabled: _vm.disabled },
          on: {
            click: function($event) {
              $event.preventDefault()
              $event.stopPropagation()
              _vm.eventDispatcher.$emit("submit")
            }
          }
        },
        [_vm._v("\n        Submit\n    ")]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-28ff791b", module.exports)
  }
}

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(483)
/* template */
var __vue_template__ = __webpack_require__(484)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\SummaryInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5da204ea", Component.options)
  } else {
    hotAPI.reload("data-v-5da204ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO figure out how to do labels without IDs
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'required', 'value'],

    data: function data() {
        return {
            id: null
        };
    },
    mounted: function mounted() {
        this.id = this._uid;
    },


    methods: {
        summaryChange: function summaryChange(event) {
            this.eventDispatcher.$emit('summaryChange', event.target.value);
        }
    }
});

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: _vm.id } }, [
      _vm.required ? _c("span", [_vm._v("* ")]) : _vm._e(),
      _vm._v("Summary\n    ")
    ]),
    _vm._v(" "),
    _c("textarea", {
      staticClass: "form-control",
      attrs: { id: _vm.id, rows: "4" },
      domProps: { value: _vm.value },
      on: { change: _vm.summaryChange, input: _vm.summaryChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5da204ea", module.exports)
  }
}

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(486)
/* template */
var __vue_template__ = __webpack_require__(487)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\TitleInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28562a4e", Component.options)
  } else {
    hotAPI.reload("data-v-28562a4e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO add optional search for episode title
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value'],

    methods: {
        titleChange: function titleChange(event) {
            this.eventDispatcher.$emit('titleChange', event.target.value);
        }
    }
});

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "title" } }, [_vm._v("* Title")]),
    _vm._v(" "),
    _c(
      "a",
      {
        attrs: {
          href: "https://www.imdb.com/find?q=" + _vm.value,
          target: "_blank"
        }
      },
      [_vm._v("(IMDb Search)")]
    ),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      attrs: { id: "title" },
      domProps: { value: _vm.value },
      on: { change: _vm.titleChange, input: _vm.titleChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-28562a4e", module.exports)
  }
}

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(489)
/* template */
var __vue_template__ = __webpack_require__(490)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\VideoFileInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31d0680c", Component.options)
  } else {
    hotAPI.reload("data-v-31d0680c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// TODO figure out how to do bootstrap labels without ID
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'files', 'value']
});

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "file" } }, [_vm._v("File")]),
    _vm._v(" "),
    _c(
      "select",
      {
        staticClass: "form-control",
        attrs: { id: "file" },
        domProps: { value: _vm.value },
        on: {
          change: function($event) {
            _vm.eventDispatcher.$emit("videoFileChange", $event.target.value)
          }
        }
      },
      _vm._l(_vm.files, function(f) {
        return _c(
          "option",
          { key: f.filename, domProps: { value: f.filename } },
          [_vm._v("\n            " + _vm._s(f.filename) + "\n        ")]
        )
      })
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-31d0680c", module.exports)
  }
}

/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(492)
/* template */
var __vue_template__ = __webpack_require__(493)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\YearEndInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5a0610d3", Component.options)
  } else {
    hotAPI.reload("data-v-5a0610d3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value'],

    data: function data() {
        return {
            max: new Date().getFullYear(),
            min: 0
        };
    }
});

/***/ }),

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("year-input", {
    attrs: {
      event: "yearEndChange",
      eventDispatcher: _vm.eventDispatcher,
      label: "Year End",
      max: _vm.max,
      min: _vm.min,
      value: _vm.value
    }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5a0610d3", module.exports)
  }
}

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(495)
/* template */
var __vue_template__ = __webpack_require__(496)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\YearInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-93adda54", Component.options)
  } else {
    hotAPI.reload("data-v-93adda54", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['event', 'eventDispatcher', 'label', 'max', 'min', 'title', 'value'],

    methods: {
        yearChange: function yearChange(event) {
            this.eventDispatcher.$emit(this.event, event.target.value);
        }
    }
});

/***/ }),

/***/ 496:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "year" } }, [
      _vm._v("\n        * " + _vm._s(_vm.label) + "\n    ")
    ]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      attrs: { type: "number", id: "year", min: _vm.min, max: _vm.max },
      domProps: { value: _vm.value },
      on: { change: _vm.yearChange, input: _vm.yearChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-93adda54", module.exports)
  }
}

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(498)
/* template */
var __vue_template__ = __webpack_require__(499)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\YearReleasedInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-41f0ba19", Component.options)
  } else {
    hotAPI.reload("data-v-41f0ba19", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'title', 'value'],

    data: function data() {
        return {
            max: new Date().getFullYear(),
            min: 1900
        };
    }
});

/***/ }),

/***/ 499:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("year-input", {
    attrs: {
      event: "yearReleasedChange",
      eventDispatcher: _vm.eventDispatcher,
      label: "Year Released",
      max: _vm.max,
      min: _vm.min,
      title: _vm.title,
      value: _vm.value
    }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-41f0ba19", module.exports)
  }
}

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(501)
/* template */
var __vue_template__ = __webpack_require__(502)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\admin\\upload\\YearStartInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d60aeba8", Component.options)
  } else {
    hotAPI.reload("data-v-d60aeba8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'title', 'value'],

    data: function data() {
        return {
            max: new Date().getFullYear(),
            min: 1900
        };
    }
});

/***/ }),

/***/ 502:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("year-input", {
    attrs: {
      event: "yearStartChange",
      eventDispatcher: _vm.eventDispatcher,
      label: "Year Start",
      max: _vm.max,
      min: _vm.min,
      title: _vm.title,
      value: _vm.value
    }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d60aeba8", module.exports)
  }
}

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(91)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 91:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })

/******/ });