<poster-row
	v-if="user && user.history"
	v-bind:title="'Continue Watching'"
	v-bind:contents="user.history"
></poster-row>

<poster-row
	v-if="user && user.watchlist"
	v-bind:title="'Watchlist'"
	v-bind:contents="user.watchlist"
></poster-row>

<poster-row
	v-bind:title="'New Movies'"
	v-bind:contents="recentMovies"
></poster-row>

<poster-row
	v-bind:title="'New TV Shows'"
	v-bind:contents="recentShows"
></poster-row>

<poster-row
	v-bind:title="'New Episodes'"
	v-bind:contents="recentEpisodes"
></poster-row>
