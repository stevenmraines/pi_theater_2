<poster-row
	v-if="user && user.history_media.length > 0"
	v-bind:contents="user.history_media"
	v-bind:paths="paths"
	v-bind:title="'Continue Watching'"
	v-bind:user="user"
></poster-row>

<poster-row
	v-if="user && user.watchlist && user.watchlist.length > 0"
	v-bind:title="'Watchlist'"
	v-bind:contents="user.watchlist"
	v-bind:paths="paths"
></poster-row>

<poster-row
	v-bind:title="'New Movies'"
	v-bind:contents="recentMovies"
	v-bind:paths="paths"
></poster-row>

<poster-row
	v-bind:title="'New TV Shows'"
	v-bind:contents="recentShows"
	v-bind:paths="paths"
></poster-row>

<poster-row
	v-bind:title="'New Episodes'"
	v-bind:contents="recentEpisodes"
	v-bind:paths="paths"
></poster-row>
