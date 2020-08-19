<movie-modal
    v-bind:id="movieModal.id"
    v-bind:title="movieModal.title"
    v-bind:summary="movieModal.summary"
    v-bind:notes="movieModal.notes"
    v-bind:release="movieModal.release"
    v-bind:paths="paths"
    v-bind:poster="movieModal.poster"
    v-bind:genres="movieModal.genres"
    v-bind:user="user"
    :movie_year="movieModal.movie_year"
></movie-modal>

<!-- TODO bind showModal data like is done with movieModal -->
<show-modal v-bind:paths="paths"></show-modal>

<collection-modal
    v-bind:collection="collection"
    v-bind:paths="paths"
></collection-modal>

<genre-modal
    v-bind:genre="genre"
    v-bind:paths="paths"
></genre-modal>

<fluid-modal
    v-bind:title="fluidModal.title"
    v-bind:contents="fluidModal.contents"
    v-bind:paths="paths"
></fluid-modal>

<search-modal
    v-bind:paths="paths"
    v-bind:keys="algoliaKeys"
></search-modal>

<watchlist-modal
    v-bind:user="user"
    v-bind:paths="paths"
></watchlist-modal>

<video-player v-bind:paths="paths"></video-player>
