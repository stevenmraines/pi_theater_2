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

/***/ 4:
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
Vue.component('episode-form', __webpack_require__(426));
Vue.component('episode-number-input', __webpack_require__(431));
Vue.component('genre-input', __webpack_require__(436));
Vue.component('image-file-input', __webpack_require__(439));
Vue.component('jumbotron-input', __webpack_require__(444));
Vue.component('movie-form', __webpack_require__(447));
Vue.component('multi-collection-input', __webpack_require__(450));
Vue.component('multi-genre-input', __webpack_require__(455));
Vue.component('notes-input', __webpack_require__(458));
Vue.component('poster-input', __webpack_require__(463));
Vue.component('season-input', __webpack_require__(466));
Vue.component('show-form', __webpack_require__(471));
Vue.component('shows-input', __webpack_require__(476));
Vue.component('submit-input', __webpack_require__(481));
Vue.component('summary-input', __webpack_require__(484));
Vue.component('title-input', __webpack_require__(487));
Vue.component('video-file-input', __webpack_require__(490));
Vue.component('year-input', __webpack_require__(495));

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
Component.options.__file = "resources/assets/js/components/admin/upload/CollectionInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-97301a16", Component.options)
  } else {
    hotAPI.reload("data-v-97301a16", Component.options)
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['allCollections', 'collection', 'eventDispatcher', 'index'],

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
  return _c("div", [
    _c("div", { staticClass: "input-group mb-3" }, [
      _c("div", { staticClass: "input-group-prepend" }, [
        _c("div", { staticClass: "dropdown" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-primary dropdown-toggle",
              attrs: { type: "button", "data-toggle": "dropdown" }
            },
            [_vm._v("\n                    Options\n                ")]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "dropdown-menu" },
            _vm._l(_vm.allCollections, function(c) {
              return _c(
                "a",
                {
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
                    "\n                        " +
                      _vm._s(c) +
                      "\n                    "
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
        domProps: { value: _vm.collection },
        on: { change: _vm.collectionChange }
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
          [_vm._v("\n                +\n            ")]
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
          [_vm._v("\n                x\n            ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-97301a16", module.exports)
  }
}

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(422)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(424)
/* template */
var __vue_template__ = __webpack_require__(425)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6d962752"
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
Component.options.__file = "resources/assets/js/components/admin/upload/DriveForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d962752", Component.options)
  } else {
    hotAPI.reload("data-v-6d962752", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(423);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("065fc016", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d962752\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./DriveForm.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6d962752\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./DriveForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 424:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['initialState'],

    data: function data() {
        return {
            currentDrive: 0,
            drives: this.initialState.drives,
            eventDispatcher: new Vue({}),
            pending: this.initialState.pending,
            shows: this.initialState.shows
        };
    },


    computed: {
        collections: function collections() {
            var collections = [];

            for (var i = 0; i < this.initialState.collections.length; i++) {
                collections.push(this.initialState.collections[i].name);
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

            for (var i = 0; i < this.initialState.genres.length; i++) {
                genres.push(this.initialState.genres[i].name);
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
            this.eventDispatcher.$on('showSubmit', this.showSubmit);
        }
    },


    methods: {
        movieSubmit: function movieSubmit() {},
        episodeSubmit: function episodeSubmit() {},
        showSubmit: function showSubmit() {}
    }
});

/***/ }),

/***/ 425:
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
                        "\n                                " +
                          _vm._s(drive.name) +
                          "\n                            "
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
                    "\n                            " +
                      _vm._s(_vm.newUploadsMessage) +
                      "\n                        "
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
                      href: "#movie-form",
                      role: "tab"
                    }
                  },
                  [
                    _vm._v(
                      "\n                        Add Movies (" +
                        _vm._s(_vm.movies.length) +
                        " pending)\n                    "
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("movie-form", {
                staticClass: "card-body collapse",
                attrs: {
                  id: "movie-form",
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
          _c("div", { staticClass: "card", attrs: { role: "tablist" } }, [
            _c("h5", { staticClass: "card-header mb-0" }, [
              _c(
                "a",
                {
                  attrs: {
                    "data-toggle": "collapse",
                    href: "#episode-form",
                    role: "tab"
                  }
                },
                [
                  _vm._v(
                    "\n                        Add Episodes (" +
                      _vm._s(_vm.episodes.length) +
                      " pending)\n                    "
                  )
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _vm._m(0)
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card", attrs: { role: "tablist" } }, [
      _c("h5", { staticClass: "card-header mb-0" }, [
        _c(
          "a",
          {
            attrs: {
              "data-toggle": "collapse",
              href: "#show-form",
              role: "tab"
            }
          },
          [_vm._v("\n                        Add Shows\n                    ")]
        )
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6d962752", module.exports)
  }
}

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(427)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(429)
/* template */
var __vue_template__ = __webpack_require__(430)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-78177f88"
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
Component.options.__file = "resources/assets/js/components/admin/upload/EpisodeForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78177f88", Component.options)
  } else {
    hotAPI.reload("data-v-78177f88", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(428);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("5228e100", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-78177f88\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./EpisodeForm.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-78177f88\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./EpisodeForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 429:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['drive', 'files', 'shows']
});

/***/ }),

/***/ 430:
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
            { attrs: { novalidate: "" } },
            [
              _c("file-input", { attrs: { files: _vm.files } }),
              _vm._v(" "),
              _c("shows-input", { attrs: { shows: _vm.shows } }),
              _vm._v(" "),
              _c("season-input"),
              _vm._v(" "),
              _c("episode-number-input"),
              _vm._v(" "),
              _c("episode-title-input"),
              _vm._v(" "),
              _c("summary-input"),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "form-group d-flex justify-content-around mt-3 mb-0"
                },
                [
                  true
                    ? _c("button", { staticClass: "btn btn-success" }, [
                        _vm._v("\n                    Submit\n                ")
                      ])
                    : _vm._e()
                ]
              )
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
    require("vue-hot-reload-api")      .rerender("data-v-78177f88", module.exports)
  }
}

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(432)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(434)
/* template */
var __vue_template__ = __webpack_require__(435)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-48729f26"
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
Component.options.__file = "resources/assets/js/components/admin/upload/EpisodeNumberInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48729f26", Component.options)
  } else {
    hotAPI.reload("data-v-48729f26", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(433);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("9abea17c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48729f26\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./EpisodeNumberInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48729f26\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./EpisodeNumberInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-48729f26", module.exports)
  }
}

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(437)
/* template */
var __vue_template__ = __webpack_require__(438)
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
Component.options.__file = "resources/assets/js/components/admin/upload/GenreInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-947f8424", Component.options)
  } else {
    hotAPI.reload("data-v-947f8424", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 437:
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
    props: ['allGenres', 'genre', 'eventDispatcher', 'index'],

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

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "input-group mb-3" }, [
      _c("div", { staticClass: "input-group-prepend" }, [
        _c("div", { staticClass: "dropdown" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-primary dropdown-toggle",
              attrs: { type: "button", "data-toggle": "dropdown" }
            },
            [_vm._v("\n                    Options\n                ")]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "dropdown-menu" },
            _vm._l(_vm.allGenres, function(g) {
              return _c(
                "a",
                {
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
                    "\n                        " +
                      _vm._s(g) +
                      "\n                    "
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
        domProps: { value: _vm.genre },
        on: { change: _vm.genreChange }
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
          [_vm._v("\n                +\n            ")]
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
          [_vm._v("\n                x\n            ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-947f8424", module.exports)
  }
}

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(440)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(442)
/* template */
var __vue_template__ = __webpack_require__(443)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-46368cfa"
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
Component.options.__file = "resources/assets/js/components/admin/upload/ImageFileInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46368cfa", Component.options)
  } else {
    hotAPI.reload("data-v-46368cfa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(441);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("2e323d3d", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-46368cfa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageFileInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-46368cfa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ImageFileInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\ninput[type=\"file\"][data-v-46368cfa] {\n    display: none;\n}\n.file-drop[data-v-46368cfa] {\n    outline-style: dashed;\n    background-color: rgba(200,220,255,0.7);\n    text-align: center;\n    cursor: pointer;\n}\n.drag[data-v-46368cfa] {\n    outline-color: blue;\n    background-color: rgba(170,190,235,0.7);\n}\n", ""]);

// exports


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

// TODO implement optional search with title
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['event', 'eventDispatcher', 'label', 'required', 'search', 'title', 'value'],

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
            this.eventDispatcher.$emit(this.event, dataTransfer.files);
        },
        triggerFileClick: function triggerFileClick() {
            this.$refs.fileInput.click();
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
    _c("label", { attrs: { for: "file-upload" } }, [
      _vm.required ? _c("span", [_vm._v("* ")]) : _vm._e(),
      _vm._v("\n        " + _vm._s(_vm.label) + "\n        "),
      _vm.search
        ? _c(
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
            [_vm._v(" (search)")]
          )
        : _vm._e()
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "file-drop p-5",
        class: { drag: _vm.isDrag },
        attrs: { id: "file-upload" },
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
    require("vue-hot-reload-api")      .rerender("data-v-46368cfa", module.exports)
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
Component.options.__file = "resources/assets/js/components/admin/upload/JumbotronInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ab48bf36", Component.options)
  } else {
    hotAPI.reload("data-v-ab48bf36", Component.options)
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'value']
});

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("image-file-input", {
    attrs: {
      event: "jumbotronChange",
      eventDispatcher: _vm.eventDispatcher,
      label: "Jumbotron Image",
      required: false,
      search: false,
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
    require("vue-hot-reload-api")      .rerender("data-v-ab48bf36", module.exports)
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
Component.options.__file = "resources/assets/js/components/admin/upload/MovieForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c9d8bfd", Component.options)
  } else {
    hotAPI.reload("data-v-3c9d8bfd", Component.options)
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            currentFile: this.files[0],
            eventDispatcher: new Vue({}),
            movies: {},
            yearMax: new Date().getFullYear(),
            yearMin: 1900
        };
    },


    computed: {
        // TODO find a better way to index the files in the movie object
        currentFileEscaped: function currentFileEscaped() {
            return this.escapeFile(this.currentFile);
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
        this.eventDispatcher.$on('jumbotronChange', this.jumbotronChange);
        this.eventDispatcher.$on('notesChange', this.notesChange);
        this.eventDispatcher.$on('posterChange', this.posterChange);
        this.eventDispatcher.$on('submit', this.submit);
        this.eventDispatcher.$on('summaryChange', this.summaryChange);
        this.eventDispatcher.$on('titleChange', this.titleChange);
        this.eventDispatcher.$on('videoFileChange', this.videoFileChange);
        this.eventDispatcher.$on('yearChange', this.yearChange);

        // Initialize movies array
        for (var i = 0; i < this.files.length; i++) {
            var objectDefaults = {
                collections: [''],
                file: this.files[i],
                genres: [''],
                jumbotron: null,
                notes: '',
                poster: null,
                summary: '',
                title: this.getTitleFromFile(this.files[i]),
                yearReleased: this.yearMax
            };

            // Use set function to maintain reactivity
            Vue.set(this.movies, this.escapeFile(this.files[i]), objectDefaults);
        }
    },


    methods: {
        collectionAdd: function collectionAdd() {
            this.movies[this.currentFileEscaped].collections.push('');
        },
        collectionChange: function collectionChange(data) {
            Vue.set(this.movies[this.currentFileEscaped].collections, data.index, data.value);
        },
        collectionRemove: function collectionRemove(index) {
            var newCollections = [''];

            if (this.movies[this.currentFileEscaped].collections.length > 1) {
                this.movies[this.currentFileEscaped].collections.splice(index, 1);

                newCollections = this.movies[this.currentFileEscaped].collections;
            }

            Vue.set(this.movies[this.currentFileEscaped], 'collections', newCollections);
        },
        escapeFile: function escapeFile(file) {
            return file.replace('.', '');
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
            this.movies[this.currentFileEscaped].genres.push('');
        },
        genreChange: function genreChange(data) {
            Vue.set(this.movies[this.currentFileEscaped].genres, data.index, data.value);
        },
        genreEmpty: function genreEmpty() {
            var empty = true;

            for (var i = 0; i < this.movies[this.currentFileEscaped].genres.length; i++) {
                if (this.movies[this.currentFileEscaped].genres[i] !== '') {
                    empty = false;
                }
            }

            return empty;
        },
        genreRemove: function genreRemove(index) {
            var newGenres = [''];

            if (this.movies[this.currentFileEscaped].genres.length > 1) {
                this.movies[this.currentFileEscaped].genres.splice(index, 1);

                newGenres = this.movies[this.currentFileEscaped].genres;
            }

            Vue.set(this.movies[this.currentFileEscaped], 'genres', newGenres);
        },
        getTitleFromFile: function getTitleFromFile(file) {
            var filename = file.substr(0, file.length - 4);

            var tokens = filename.split('-');

            var exceptions = ['a', 'an', 'for', 'in', 'of', 'on', 'the'];

            for (var i = 0; i < tokens.length; i++) {
                if (exceptions.indexOf(tokens[i].toLowerCase()) === -1) {
                    tokens[i] = tokens[i].substr(0, 1).toUpperCase() + tokens[i].substr(1);
                }
            }

            return tokens.join(' ');
        },
        jumbotronChange: function jumbotronChange(fileList) {
            Vue.set(this.movies[this.currentFileEscaped], 'jumbotron',
            // this.fileListToArray(fileList)
            fileList);
        },
        notesChange: function notesChange(notes) {
            Vue.set(this.movies[this.currentFileEscaped], 'notes', notes);
        },
        posterChange: function posterChange(fileList) {
            Vue.set(this.movies[this.currentFileEscaped], 'poster',
            // this.fileListToArray(fileList)
            fileList);
        },
        posterEmpty: function posterEmpty() {
            return !this.movies[this.currentFileEscaped].poster;
        },
        submit: function submit() {
            this.driveEventDispatcher.$emit('movieSubmit');
        },
        summaryChange: function summaryChange(summary) {
            Vue.set(this.movies[this.currentFileEscaped], 'summary', summary);
        },
        summaryEmpty: function summaryEmpty() {
            return this.movies[this.currentFileEscaped].summary === '';
        },
        titleChange: function titleChange(title) {
            Vue.set(this.movies[this.currentFileEscaped], 'title', title);
        },
        titleEmpty: function titleEmpty() {
            return this.movies[this.currentFileEscaped].title === '';
        },
        valid: function valid() {
            return !this.titleEmpty() && this.yearValid() && !this.summaryEmpty() && !this.posterEmpty() && !this.genreEmpty();
        },
        videoFileChange: function videoFileChange(file) {
            this.currentFile = file;
        },
        yearChange: function yearChange(yearReleased) {
            Vue.set(this.movies[this.currentFileEscaped], 'yearReleased', parseInt(yearReleased));
        },
        yearValid: function yearValid() {
            return this.movies[this.currentFileEscaped].yearReleased <= this.yearMax && this.movies[this.currentFileEscaped].yearReleased >= this.yearMin && !isNaN(this.movies[this.currentFileEscaped].yearReleased);
        }
    }
});

/***/ }),

/***/ 449:
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
            { attrs: { novalidate: "" } },
            [
              _c("video-file-input", {
                attrs: {
                  currentFile: _vm.currentFile,
                  eventDispatcher: _vm.eventDispatcher,
                  files: _vm.files
                }
              }),
              _vm._v(" "),
              _c("title-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  title: _vm.movies[_vm.currentFileEscaped].title
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
                      _vm._v("The Title is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("year-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  label: "Year Released",
                  min: _vm.yearMin,
                  max: _vm.yearMax,
                  search: true,
                  title: _vm.movies[_vm.currentFileEscaped].title,
                  year: _vm.movies[_vm.currentFileEscaped].yearReleased
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
                      _vm._v("The Year Released is not valid\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("summary-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  required: true,
                  summary: _vm.movies[_vm.currentFileEscaped].summary
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
                      _vm._v("The Summary is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("notes-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  notes: _vm.movies[_vm.currentFileEscaped].notes
                }
              }),
              _vm._v(" "),
              _c("poster-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  title: _vm.movies[_vm.currentFileEscaped].title,
                  value: _vm.movies[_vm.currentFileEscaped].poster
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
                      _vm._v("The Poster Image is required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("jumbotron-input", {
                attrs: {
                  eventDispatcher: _vm.eventDispatcher,
                  value: _vm.movies[_vm.currentFileEscaped].jumbotron
                }
              }),
              _vm._v(" "),
              _c("multi-genre-input", {
                attrs: {
                  allGenres: _vm.genres,
                  eventDispatcher: _vm.eventDispatcher,
                  genres: _vm.movies[_vm.currentFileEscaped].genres
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
                      _vm._v("The Genres are required\n            ")
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("multi-collection-input", {
                attrs: {
                  allCollections: _vm.collections,
                  collections: _vm.movies[_vm.currentFileEscaped].collections,
                  eventDispatcher: _vm.eventDispatcher
                }
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
    require("vue-hot-reload-api")      .rerender("data-v-3c9d8bfd", module.exports)
  }
}

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(451)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(453)
/* template */
var __vue_template__ = __webpack_require__(454)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-53e4be7a"
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
Component.options.__file = "resources/assets/js/components/admin/upload/MultiCollectionInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53e4be7a", Component.options)
  } else {
    hotAPI.reload("data-v-53e4be7a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(452);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("703066cc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-53e4be7a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MultiCollectionInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-53e4be7a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MultiCollectionInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 453:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['allCollections', 'collections', 'eventDispatcher']
});

/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("label", { attrs: { for: "collections" } }, [_vm._v("Collections")]),
    _vm._v(" "),
    _c(
      "div",
      { attrs: { id: "collections" } },
      _vm._l(_vm.collections, function(collection, index) {
        return _c("collection-input", {
          key: index,
          attrs: {
            allCollections: _vm.allCollections,
            collection: collection,
            eventDispatcher: _vm.eventDispatcher,
            index: index
          }
        })
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
    require("vue-hot-reload-api")      .rerender("data-v-53e4be7a", module.exports)
  }
}

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(456)
/* template */
var __vue_template__ = __webpack_require__(457)
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
Component.options.__file = "resources/assets/js/components/admin/upload/MultiGenreInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d199349", Component.options)
  } else {
    hotAPI.reload("data-v-6d199349", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 456:
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

// TODO implement required warning
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['allGenres', 'eventDispatcher', 'genres']
});

/***/ }),

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "genres" } }, [_vm._v("* Genres")]),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "genres" } },
        _vm._l(_vm.genres, function(genre, index) {
          return _c("genre-input", {
            key: index,
            attrs: {
              allGenres: _vm.allGenres,
              eventDispatcher: _vm.eventDispatcher,
              genre: genre,
              index: index
            }
          })
        })
      )
    ]),
    _vm._v(" "),
    false
      ? _c("div", { staticClass: "text-danger mb-3" }, [
          _vm._v("\n        The genres are required\n    ")
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6d199349", module.exports)
  }
}

/***/ }),

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(459)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(461)
/* template */
var __vue_template__ = __webpack_require__(462)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2e7ffe70"
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
Component.options.__file = "resources/assets/js/components/admin/upload/NotesInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e7ffe70", Component.options)
  } else {
    hotAPI.reload("data-v-2e7ffe70", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 459:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(460);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("1c5c6c0c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e7ffe70\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NotesInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e7ffe70\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NotesInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 461:
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

// TODO figure out how to do labels without IDs
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'notes']
});

/***/ }),

/***/ 462:
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
      domProps: { value: _vm.notes },
      on: {
        change: function($event) {
          _vm.eventDispatcher.$emit("notesChange", $event.target.value)
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2e7ffe70", module.exports)
  }
}

/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(464)
/* template */
var __vue_template__ = __webpack_require__(465)
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
Component.options.__file = "resources/assets/js/components/admin/upload/PosterInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d6b2acb4", Component.options)
  } else {
    hotAPI.reload("data-v-d6b2acb4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 464:
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
    props: ['eventDispatcher', 'title', 'value']
});

/***/ }),

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("image-file-input", {
    attrs: {
      event: "posterChange",
      eventDispatcher: _vm.eventDispatcher,
      label: "Poster Image",
      required: true,
      search: true,
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
    require("vue-hot-reload-api")      .rerender("data-v-d6b2acb4", module.exports)
  }
}

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(467)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(469)
/* template */
var __vue_template__ = __webpack_require__(470)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-027024d0"
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
Component.options.__file = "resources/assets/js/components/admin/upload/SeasonInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-027024d0", Component.options)
  } else {
    hotAPI.reload("data-v-027024d0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(468);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("57840cba", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-027024d0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SeasonInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-027024d0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SeasonInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-027024d0", module.exports)
  }
}

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(472)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(474)
/* template */
var __vue_template__ = __webpack_require__(475)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7d332608"
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
Component.options.__file = "resources/assets/js/components/admin/upload/ShowForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d332608", Component.options)
  } else {
    hotAPI.reload("data-v-7d332608", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(473);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("6d20c86b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7d332608\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowForm.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7d332608\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7d332608", module.exports)
  }
}

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(477)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(479)
/* template */
var __vue_template__ = __webpack_require__(480)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-63dc17bb"
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
Component.options.__file = "resources/assets/js/components/admin/upload/ShowsInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-63dc17bb", Component.options)
  } else {
    hotAPI.reload("data-v-63dc17bb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(478);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("7af930b4", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-63dc17bb\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowsInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-63dc17bb\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowsInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 479:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['shows'],

    data: function data() {
        return {
            show: this.sortedShows[0]
        };
    },


    computed: {
        sortedShows: function sortedShows() {
            return this.shows.sort(function (a, b) {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            });
        }
    }
});

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "show" } }, [_vm._v("Show")]),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.show,
            expression: "show"
          }
        ],
        staticClass: "form-control",
        attrs: { id: "show" },
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
            _vm.show = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
          }
        }
      },
      _vm._l(_vm.sortedShows, function(s) {
        return _c("option", { key: s.id, domProps: { value: s.id } }, [
          _vm._v(_vm._s(s.title))
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
    require("vue-hot-reload-api")      .rerender("data-v-63dc17bb", module.exports)
  }
}

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(482)
/* template */
var __vue_template__ = __webpack_require__(483)
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
Component.options.__file = "resources/assets/js/components/admin/upload/SubmitInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d025b3b", Component.options)
  } else {
    hotAPI.reload("data-v-1d025b3b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 482:
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
    props: ['disabled', 'eventDispatcher']
});

/***/ }),

/***/ 483:
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
          staticClass: "btn",
          class: {
            "btn-secondary": _vm.disabled,
            "btn-success": !_vm.disabled
          },
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
    require("vue-hot-reload-api")      .rerender("data-v-1d025b3b", module.exports)
  }
}

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(485)
/* template */
var __vue_template__ = __webpack_require__(486)
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
Component.options.__file = "resources/assets/js/components/admin/upload/SummaryInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d885f6b", Component.options)
  } else {
    hotAPI.reload("data-v-5d885f6b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 485:
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

// TODO figure out how to do labels without IDs
/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'required', 'summary']
});

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "summary" } }, [
      _vm.required ? _c("span", [_vm._v("* ")]) : _vm._e(),
      _vm._v("Summary\n    ")
    ]),
    _vm._v(" "),
    _c("textarea", {
      staticClass: "form-control",
      attrs: { id: "summary", rows: "4" },
      domProps: { value: _vm.summary },
      on: {
        change: function($event) {
          _vm.eventDispatcher.$emit("summaryChange", $event.target.value)
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5d885f6b", module.exports)
  }
}

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(488)
/* template */
var __vue_template__ = __webpack_require__(489)
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
Component.options.__file = "resources/assets/js/components/admin/upload/TitleInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ce45768e", Component.options)
  } else {
    hotAPI.reload("data-v-ce45768e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 488:
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
    props: ['eventDispatcher', 'title']
});

/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "title" } }, [_vm._v("* Title")]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      domProps: { value: _vm.title },
      on: {
        change: function($event) {
          _vm.eventDispatcher.$emit("titleChange", $event.target.value)
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ce45768e", module.exports)
  }
}

/***/ }),

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(491)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(493)
/* template */
var __vue_template__ = __webpack_require__(494)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7abf944c"
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
Component.options.__file = "resources/assets/js/components/admin/upload/VideoFileInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7abf944c", Component.options)
  } else {
    hotAPI.reload("data-v-7abf944c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 491:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(492);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("40dc8e8a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7abf944c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VideoFileInput.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7abf944c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VideoFileInput.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 493:
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
    props: ['currentFile', 'eventDispatcher', 'files']
});

/***/ }),

/***/ 494:
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
        domProps: { value: _vm.currentFile },
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
    require("vue-hot-reload-api")      .rerender("data-v-7abf944c", module.exports)
  }
}

/***/ }),

/***/ 495:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(496)
/* template */
var __vue_template__ = __webpack_require__(497)
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
Component.options.__file = "resources/assets/js/components/admin/upload/YearInput.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-88840614", Component.options)
  } else {
    hotAPI.reload("data-v-88840614", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 496:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['eventDispatcher', 'label', 'min', 'max', 'search', 'title', 'year']
});

/***/ }),

/***/ 497:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("label", { attrs: { for: "year" } }, [
      _vm._v("\n        * " + _vm._s(_vm.label) + "\n        "),
      _vm.search
        ? _c(
            "a",
            {
              attrs: {
                href:
                  "https://www.google.com/search?q=" +
                  _vm.title +
                  "+year+released",
                target: "_blank"
              }
            },
            [_vm._v("(search)")]
          )
        : _vm._e()
    ]),
    _vm._v(" "),
    _c("input", {
      staticClass: "form-control",
      attrs: { type: "number", id: "year", min: _vm.min, max: _vm.max },
      domProps: { value: _vm.year },
      on: {
        change: function($event) {
          _vm.eventDispatcher.$emit("yearChange", $event.target.value)
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-88840614", module.exports)
  }
}

/***/ }),

/***/ 7:
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