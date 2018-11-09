<div v-if="recent_movies.length > 0">
	<h4 class="h4 pl-4">Recent Movies</h4>
	<poster-row id="recent-movies" v-bind:contents="recent_movies"></poster-row>
</div>

<div v-if="recent_shows.length > 0">
	<h4 class="h4 pl-4">Recent Shows</h4>
	<poster-row id="recent-shows" v-bind:contents="recent_shows"></poster-row>
</div>

@if($user)
<div v-if="history.length > 0">
	<h4 class="h4 pl-4">Recently Viewed</h4>
	<poster-row id="history"></poster-row>
</div>
@endif
