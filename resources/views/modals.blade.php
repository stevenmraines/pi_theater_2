<movie-modal
    v-bind:id="movieModal.id"
    v-bind:title="movieModal.title"
    v-bind:summary="movieModal.summary"
    v-bind:notes="movieModal.notes"
    v-bind:year_start="movieModal.year_start"
    v-bind:poster="movieModal.poster"
    v-bind:genres="movieModal.genres"
    v-bind:user="user"
></movie-modal>

<show-modal
    v-bind:id="showModal.id"
    v-bind:title="showModal.title"
    v-bind:summary="showModal.summary"
    v-bind:notes="showModal.notes"
    v-bind:year_start="showModal.year_start"
    v-bind:year_end="showModal.year_end"
    v-bind:poster="showModal.poster"
    v-bind:episodes="showModal.episodes"
    v-bind:genres="showModal.genres"
    v-bind:seasons="showModal.seasons"
    v-bind:user="user"
></show-modal>

<collection-modal v-bind:collection="collection"></collection-modal>

<genre-modal v-bind:genre="genre"></genre-modal>

<fluid-modal
    v-bind:title="fluidModal.title"
    v-bind:contents="fluidModal.contents"
></fluid-modal>

<search-modal></search-modal>

<watchlist-modal v-bind:user="user"></watchlist-modal>
