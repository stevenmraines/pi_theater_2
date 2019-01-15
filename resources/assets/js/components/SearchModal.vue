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
        {{ contents.length }} results found
      </div>
    </div>
    <div id="search-modal-content" class="fluid-modal-content">
      <div>
        <div
          class="fluid-modal-inner-poster-container mx-0"
          v-if="contents.length > 0"
        >
          <poster-container
            class="my-3"
            ref="posterContainers"
            v-for="content in contents"
            v-bind:key="content.mediaType + '_' + content.id"
            v-bind:id="content.id"
            v-bind:title="content.title"
            v-bind:poster="content.poster"
            v-bind:mediaType="content.mediaType"
            v-bind:event-dispatcher="eventDispatcher"
			    ></poster-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['contents'],

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
      prepare(searchResults) {
        var prepared = [];

  			if(searchResults.movies) {
  				searchResults.movies.forEach(function(movie) {
  					prepared.push({
  						id: movie.id,
  						title: movie.title,
  						poster: movie.poster,
  						mediaType: 'movie',
  					});
  				});
  			}

  			if(searchResults.shows) {
  				searchResults.shows.forEach(function(show) {
  					prepared.push({
  						id: show.id,
  						title: show.title,
  						poster: show.poster,
  						mediaType: 'show',
  					});
  				});
  			}

  			return prepared;
      },

      keyup() {
          clearTimeout(this.typingTimer);
          this.typingTimer = setTimeout(this.search, 750);
      },

      keydown() {
          clearTimeout(this.typingTimer);
      },

      search() {
          if(this.query === '') {
              this.contents.splice(0, this.contents.length);
              this.$forceUpdate();
          }

          if(this.query !== '') {
            var self = this;

            axios.get('/search', {
                params: {
                    query: this.query
                },
            }).then(function(response) {
                var searchResults = self.prepare(response.data);
                self.contents.splice(0, self.contents.length);

                for(var i = 0; i < searchResults.length; i++) {
                  self.contents.push(searchResults[i]);
                }

                self.$forceUpdate();
            });
          }
      },

      show() {
        var self = this;
        document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
        $(this.$refs.container).fadeIn();

        setTimeout(function() {
          self.$refs.input.focus();
        }, 400);
      },

      hide() {
        var self = this;
        $(this.$refs.container).fadeOut();

        setTimeout(function() {
          self.query = '';
          self.contents.splice(0, self.contents.length);
          document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
        }, 400);
      },
    },
  }
</script>
