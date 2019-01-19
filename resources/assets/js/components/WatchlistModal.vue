<template>
  <div class="fluid-modal scrollbar" ref="container">
  <!-- <div class="fluid-modal scrollbar" ref="container" v-on:click.stop="hide"> -->
    <div class="fluid-modal-content">
      <div class="fluid-modal-header mb-2">
        <span class="fluid-modal-title">
          Watchlist
        </span>
        <button
          class="fluid-modal-close close"
          v-on:click="hide"
        >
          <span>&times;</span>
        </button>
      </div>
      <hr class="fluid-modal-hr" />
      <div class="fluid-modal-poster-container">
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
        eventDispatcher: new Vue({}),
      }
    },

    created() {
      Event.listen('showWatchlistModal', this.show);
      Event.listen('removeFromWatchlist', this.remove);
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

      remove(info) {
        for(var i = 0; i < this.contents.length; i++) {
          if(this.contents[i].id == info.id
              && this.contents[i].mediaType == info.mediaType) {
            this.contents.splice(i, 1);
            this.$forceUpdate();
          }
        }
      },
    },
  }
</script>
