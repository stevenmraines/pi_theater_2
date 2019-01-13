<div v-if="recent_movies.length > 0">
	<h4 class="h4 pl-4">Recent Movies</h4>
	<movie-poster-row v-bind:contents="recent_movies"></movie-poster-row>
</div>

<div v-if="recent_shows.length > 0">
	<h4 class="h4 pl-4">Recent Shows</h4>
	<show-poster-row v-bind:contents="recent_shows"></show-poster-row>
</div>

<div v-if="false">
	<h4 class="h4 pl-4">New in Horror</h4>
	<mixed-poster-row v-bind:contents="newHorror"></mixed-poster-row>
</div>

<div v-if="false">
	<h4 class="h4 pl-4">New in Sci-Fi</h4>
	<mixed-poster-row v-bind:contents="newSciFi"></mixed-poster-row>
</div>

<div v-if="showNewEpisodes">
	<h4 class="h4 pl-4">New Episodes</h4>
	<show-poster-row v-bind:contents="newEpisodes"></show-poster-row>
</div>

@if($user)
<div v-if="history.length > 0">
	<h4 class="h4 pl-4">Recently Viewed</h4>
	<mixed-poster-row v-bind:contents="history"></mixed-poster-row>
</div>
@endif
