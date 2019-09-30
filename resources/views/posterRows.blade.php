<poster-row
	v-if="user && user.history && user.history.length > 0"
	v-bind:title="'Continue Watching'"
	v-bind:contents="user.history"
	v-bind:paths="paths"
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
