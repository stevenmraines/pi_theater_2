<movie-modal
    v-bind:id="movieModal.id"
    v-bind:title="movieModal.title"
    v-bind:summary="movieModal.summary"
    v-bind:notes="movieModal.notes"
    v-bind:release="movieModal.release"
    v-bind:poster="movieModal.poster"
    v-bind:genres="movieModal.genres"
    v-bind:user="user"
></movie-modal>

<show-modal></show-modal>

<collection-modal v-bind:collection="collection"></collection-modal>

<genre-modal v-bind:genre="genre"></genre-modal>

<fluid-modal
    v-bind:title="fluidModal.title"
    v-bind:contents="fluidModal.contents"
></fluid-modal>

<search-modal></search-modal>

<watchlist-modal v-bind:user="user"></watchlist-modal>

<video-player></video-player>
