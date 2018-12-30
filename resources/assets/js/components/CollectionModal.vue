<template>
  <div class="fluid-modal scrollbar" ref="container">
  <!-- <div class="fluid-modal scrollbar" ref="container" v-on:click.stop="hide"> -->
    <div class="fluid-modal-content">
      <div class="d-flex justify-content-between align-items-start pt-3 px-3">
        <img v-bind:src="'/img/logos/' + contents.logo" v-if="contents.logo !== ''" />
        <button
          class="fluid-modal-close close"
          v-on:click="hide"
        >
          <span>&times;</span>
        </button>
      </div>
      <div class="fluid-modal-poster-container">
        <div class="fluid-modal-movies-container mx-0 mb-2">
          <movie-poster-container
            class="my-3"
            ref="moviePosterContainers"
            v-for="movie in contents.movies"
            v-bind:key="movie.id"
            v-bind:id="movie.id"
            v-bind:title="movie.title"
            v-bind:poster="movie.poster"
            v-bind:event-dispatcher="eventDispatcher"
			    ></movie-poster-container>
        </div>
        <hr class="fluid-modal-hr" v-if="contents.shows.length > 0" />
        <div class="fluid-modal-shows-container mx-0 mt-2">
          <show-poster-container
            class="my-3"
            ref="showPosterContainers"
            v-for="show in contents.shows"
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
</template>

<script>
  export default {
    props: ['contents'],

    data() {
      return {
        eventDispatcher: new Vue({}),
      }
    },

    created() {
      Event.listen('showCollectionModal', this.show);
    },

    methods: {
      show() {
        document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
        $(this.$refs.container).fadeIn();
      },

      hide() {
        $(this.$refs.container).fadeOut();
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
      },
    },
  }
</script>
