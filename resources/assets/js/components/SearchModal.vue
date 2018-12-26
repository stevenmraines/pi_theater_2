<template>
  <div id="search-modal" class="modal fade px-3">
    <div>
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
      />
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

      },

      show() {
        console.log('fdsa');
        $('#search-modal').modal('show');
        document.getElementById('search-input').focus();
      },

      hide() {
        console.log('fdsafdsa');
        this.query = '';
        $('#search-modal').modal('hide');
      },
    },
  }
</script>
