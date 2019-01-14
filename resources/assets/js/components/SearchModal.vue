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
      keyup() {
          clearTimeout(this.typingTimer);
          this.typingTimer = setTimeout(this.search, 750);
      },

      keydown() {
          clearTimeout(this.typingTimer);
      },

      search() {
          if(this.query === '') {
              this.contents.movies.splice(0, this.contents.movies.length);
              this.contents.shows.splice(0, this.contents.shows.length);
              return true;
          }

          var self = this;

          axios.get('/search', {
              params: {
                  query: this.query
              },
          }).then(function(response) {
              self.contents.movies.splice(0, self.contents.movies.length);
              self.contents.shows.splice(0, self.contents.shows.length);

              for(var i = 0; i < response.data.movies.length; i++) {
                  self.contents.movies.push(response.data.movies[i]);
              }

              for(var i = 0; i < response.data.shows.length; i++) {
                  self.contents.shows.push(response.data.shows[i]);
              }
          });
      },

      clearResults() {
          // this.contents.movies.splice(0, this.contents.movies.length);
          // this.contents.shows.splice(0, this.contents.shows.length);
          // this.contents.episodes.splice(0, this.contents.episodes.length);
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
          self.contents.movies.splice(0, self.contents.movies.length);
          self.contents.shows.splice(0, self.contents.shows.length);
          document.getElementsByTagName('body')[0]
            .classList.remove('overflow-hidden');
        }, 400);
      },
    },
  }
</script>
