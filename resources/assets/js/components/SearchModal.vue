<template>
  <div id="search-modal-container" class="fluid-modal scrollbar" ref="container">
    <div id="search-modal-controls">
      <button
        class="fluid-modal-close close d-block"
        onclick="$('#search-modal-container').hide()"
      >
        <span>&times;</span>
      </button>
      <input
        id="search-input"
        placeholder="Search by Title"
        spellcheck="false"
        v-model:value="query"
      />
      <!-- <div id="search-modal-count" class="mt-2">
        {{ contents.length }} results found
      </div> -->
    </div>
    <div id="search-modal-content" class="fluid-modal-content">
      <div>
        <div
          class="fluid-modal-inner-poster-container mx-0"
        >
        <ais-index
          app-id="JUG06PFXKY"
          api-key="713be18b5c43b5766349f0a144622559"
          index-name="movies"
          :query="query"
        >
            <ais-results inline-template>
                <div>
                    <div
                        class="poster-container d-inline-block"
                        v-for="result in results" :key="result.objectID"
                    >
                        <img v-bind:src="'/img/posters/' + result.poster" class="img-fluid" />
                        <div class="poster-overlay d-flex flex-column justify-content-around">
                            <span class="mx-auto px-2">@{{ result.title }}</span>
                            <a v-bind:href="'/theater/movie/' + result.objectId" class="mx-auto play text-center">
                                &#9658;
                            </a>
                            <button class="mx-auto btn btn-outline-success">
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </ais-results>
        </ais-index>
        <ais-index
          app-id="JUG06PFXKY"
          api-key="713be18b5c43b5766349f0a144622559"
          index-name="shows"
          :query="query"
        >
            <ais-results inline-template>
                <div>
                    <div
                        class="poster-container d-inline-block"
                        v-for="result in results" :key="result.objectID"
                    >
                        <img v-bind:src="'/img/posters/' + result.poster" class="img-fluid" />
                        <div class="poster-overlay d-flex flex-column justify-content-around">
                            <span class="mx-auto px-2">@{{ result.title }}</span>
                            <a v-bind:href="'/theater/movie/' + result.objectId" class="mx-auto play text-center">
                                &#9658;
                            </a>
                            <button class="mx-auto btn btn-outline-success">
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </ais-results>
        </ais-index>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // props: ['contents'],

    data() {
      return {
        query: '',
        // typingTimer: {},
        // eventDispatcher: new Vue({}),
      }
    },

    // created() {
    //   Event.listen('showSearchModal', this.show);
    // },

    // methods: {
    //   prepare(searchResults) {
    //     var prepared = [];
    //
  	// 		if(searchResults.movies) {
  	// 			searchResults.movies.forEach(function(movie) {
  	// 				prepared.push({
  	// 					id: movie.id,
  	// 					title: movie.title,
  	// 					poster: movie.poster,
  	// 					mediaType: 'movie',
  	// 				});
  	// 			});
  	// 		}
    //
  	// 		if(searchResults.shows) {
  	// 			searchResults.shows.forEach(function(show) {
  	// 				prepared.push({
  	// 					id: show.id,
  	// 					title: show.title,
  	// 					poster: show.poster,
  	// 					mediaType: 'show',
  	// 				});
  	// 			});
  	// 		}
    //
  	// 		return prepared;
    //   },
    //
    //   keyup() {
    //       clearTimeout(this.typingTimer);
    //       this.typingTimer = setTimeout(this.search, 750);
    //   },
    //
    //   keydown() {
    //       clearTimeout(this.typingTimer);
    //   },
    //
    //   search() {
    //       if(this.query === '') {
    //           this.contents.splice(0, this.contents.length);
    //           this.$forceUpdate();
    //       }
    //
    //       if(this.query !== '') {
    //         var self = this;
    //
    //         axios.get('/search', {
    //             params: {
    //                 query: this.query
    //             },
    //         }).then(function(response) {
    //             var searchResults = self.prepare(response.data);
    //             self.contents.splice(0, self.contents.length);
    //
    //             for(var i = 0; i < searchResults.length; i++) {
    //               self.contents.push(searchResults[i]);
    //             }
    //
    //             self.$forceUpdate();
    //         });
    //       }
    //   },
    //
    //   show() {
    //     var self = this;
    //     document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
    //     $(this.$refs.container).fadeIn();
    //
    //     setTimeout(function() {
    //       self.$refs.input.focus();
    //     }, 400);
    //   },
    //
    //   hide() {
    //     var self = this;
    //     $(this.$refs.container).fadeOut();
    //
    //     setTimeout(function() {
    //       self.query = '';
    //       self.contents.splice(0, self.contents.length);
    //       document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    //     }, 400);
    //   },
    // },
  }
</script>
