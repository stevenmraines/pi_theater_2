<template>
  <div id="search-modal" class="modal fade px-3">
    <div class="modal-dialog m-0">
        <div class="modal-content d-block">
          <div class="mb-5">
            <button
              id="search-modal-hide"
              type="button"
              class="close d-block"
              v-on:click="hide"
            >
              <span>&times;</span>
            </button>
            <input
              id="search-input"
              v-model:value="query"
              placeholder="Search by Title"
              spellcheck="false"
              v-on:keyup="keyup"
              v-on:change="keyup"
              v-on:paste="keyup"
              v-on:keydown="keydown"
            />
          </div>
          <div id="search-modal-count" class="mt-2">
              {{ searchResults.length }} results found
          </div>
          <div v-if="searchResults.length > 0">
            <div id="search-modal-movies" class="p-5 d-flex flex-wrap flex-row">
              <movie-poster-container
                class="mx-auto my-3"
                ref="moviePosterContainers"
                v-for="movie in searchResults"
                v-bind:key="movie.id"
                v-bind:id="movie.id"
                v-bind:title="movie.title"
                v-bind:poster="movie.poster"
                v-bind:event-dispatcher="eventDispatcher"
    			    ></movie-poster-container>
            </div><hr />
            <div id="search-modal-shows" v-if="false">
              <show-poster-container></show-poster-container>
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

    created() {
      Event.listen('showSearchModal', this.show);
    },

    methods: {
      keyup() {
          clearTimeout(this.typingTimer);
          this.typingTimer = setTimeout(this.search, 1000);
      },

      keydown() {
          clearTimeout(this.typingTimer);
      },

      search() {
          if(this.query === '') {
              return this.searchResults = [];
          }

          var self = this;

          axios.get('/movie/search', {
              params: {
                  query: this.query
              },
          }).then(function(response) {
              console.log(response.data);
              self.searchResults.splice(0, self.searchResults.length);

              for(var i = 0; i < response.data.length; i++) {
                  self.searchResults.push(response.data[i]);
              }
          });
      },

      show() {
        $('#search-modal').modal('show');
        // document.getElementById('search-input').focus();
      },

      hide() {
        this.query = '';
        this.searchResults = [];
        $('#search-modal').modal('hide');
      },
    },
  }
</script>
