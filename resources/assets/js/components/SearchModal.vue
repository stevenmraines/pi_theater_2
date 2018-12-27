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
                v-on:keyup="search"
                v-on:change="search"
                v-on:paste="search"
              />
          </div>
          <div>
            <movie-poster-container></movie-poster-container>
          </div><hr />
          <div>
            <show-poster-container></show-poster-container>
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
      }
    },

    created() {
      Event.listen('showSearchModal', this.show);
    },

    methods: {
      search() {
          if(this.query !== '') {
              axios.get('/api/movie/search', { fart: this.query })
                .then(function(response) {
                    console.log(response.data);
                });
          }
      },

      show() {
        $('#search-modal').modal('show');
        // document.getElementById('search-input').focus();
      },

      hide() {
        this.query = '';
        $('#search-modal').modal('hide');
      },
    },
  }
</script>
