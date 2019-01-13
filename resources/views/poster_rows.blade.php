<div v-if="recent_movies.length > 0">
	<h4 class="h4 pl-4">Recent Movies</h4>
	<movie-poster-row id="recent-movies" v-bind:contents="recent_movies"></movie-poster-row>
</div>

<div v-if="recent_shows.length > 0">
	<h4 class="h4 pl-4">Recent Shows</h4>
	<show-poster-row id="recent-shows" v-bind:contents="recent_shows"></show-poster-row>
</div>

@if($user)
<div v-if="history.length > 0">
	<h4 class="h4 pl-4">Recently Viewed</h4>
	<mixed-poster-row id="history"></mixed-poster-row>
</div>
@endif
