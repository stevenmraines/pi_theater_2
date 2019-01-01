<template>
  <div class="fluid-modal scrollbar" ref="container">
    <div id="search-modal-controls">
      <button
        class="fluid-modal-close close d-block"
        v-on:click="hide"
      >
        <span>&times;</span>
      </button>
      <input
        id="search-input"
        v-model:value="query"
        placeholder="Search by Title"
        spellcheck="false"
        ref="input"
        v-on:keyup="keyup"
        v-on:change="keyup"
        v-on:paste="keyup"
        v-on:keydown="keydown"
      />
      <div id="search-modal-count" class="mt-2">
        {{ searchResultsLength }} results found
      </div>
    </div>
    <div id="search-modal-content" class="fluid-modal-content">
      <div>
        <div>
          <div class="fluid-modal-movies-container mx-0 mb-2" v-if="searchResults.movies.length > 0">
            <movie-poster-container
              class="my-3"
              ref="moviePosterContainers"
              v-for="movie in searchResults.movies"
              v-bind:key="movie.id"
              v-bind:id="movie.id"
              v-bind:title="movie.title"
              v-bind:poster="movie.poster"
              v-bind:event-dispatcher="eventDispatcher"
  		      ></movie-poster-container>
          </div>
          <hr class="fluid-modal-hr" v-if="bothFound" />
          <div class="fluid-modal-shows-container mx-0 mt-2" v-if="searchResults.shows.length > 0">
            <show-poster-container
              class="my-3"
              ref="showPosterContainers"
              v-for="show in searchResults.shows"
              v-bind:key="show.id"
              v-bind:id="show.id"
              v-bind:title="show.title"
              v-bind:poster="show.poster"
              v-bind:event-dispatcher="eventDispatcher"
            ></show-poster-container>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['searchResults'],

    data() {
      return {
        query: '',
        typingTimer: {},
        eventDispatcher: new Vue({}),
      }
    },

    computed: {
      searchResultsLength: function() {
        return this.searchResults.movies.length + this.searchResults.shows.length;
      },

      bothFound: function() {
        return this.searchResults.movies.length > 0 &&
            this.searchResults.shows.length > 0;
      },
    },

    created() {
      Event.listen('showSearchModal', this.show);
    },

    methods: {
      keyup() {
          clearTimeout(this.typingTimer);
          this.typingTimer = setTimeout(this.search, 750);
      },

      keydown() {
          clearTimeout(this.typingTimer);
      },

      search() {
          if(this.query === '') {
              return this.searchResults = { movies: [], shows: [] };
          }

          var self = this;

          axios.get('/search', {
              params: {
                  query: this.query
              },
          }).then(function(response) {
              console.log(response.data);

              /*
               * Should probably trigger an event here to be heard by poster
               * containers and update their data with search results
               */
              self.searchResults = { movies: [], shows: [] };

              for(var i = 0; i < response.data.movies.length; i++) {
                  self.searchResults.movies.push(response.data.movies[i]);
              }

              for(var i = 0; i < response.data.shows.length; i++) {
                  self.searchResults.shows.push(response.data.shows[i]);
              }
          });
      },

      show() {
        var self = this;
        $(this.$refs.container).fadeIn();

        setTimeout(function() {
          document.getElementsByTagName('body')[0]
            .classList.add('overflow-hidden');
          self.$refs.input.focus();
        }, 400);
      },

      hide() {
        var self = this;
        $(this.$refs.container).fadeOut();

        setTimeout(function() {
          self.query = '';
          self.searchResults = { movies: [], shows: [] };
          document.getElementsByTagName('body')[0]
            .classList.remove('overflow-hidden');
        }, 400);
      },
    },
  }
</script>
