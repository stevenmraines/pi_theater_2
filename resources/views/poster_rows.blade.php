<div v-if="recentMoviesPrepared.length > 0">
	<h4 class="h4 pl-4">Recent Movies</h4>
	<poster-row v-bind:contents="recentMoviesPrepared"></poster-row>
</div>

<div v-if="recentShowsPrepared.length > 0">
	<h4 class="h4 pl-4">Recent Shows</h4>
	<poster-row v-bind:contents="recentShowsPrepared"></poster-row>
</div>

<div v-if="displayNewHorror">
	<h4 class="h4 pl-4">New in Horror</h4>
	<poster-row v-bind:contents="newHorrorPrepared">
	</poster-row>
</div>

<div v-if="displayNewSciFi">
	<h4 class="h4 pl-4">New in Sci-Fi</h4>
	<poster-row v-bind:contents="newSciFiPrepared">
	</poster-row>
</div>

<div v-if="displayNewEpisodes">
	<h4 class="h4 pl-4">New Episodes</h4>
	<poster-row v-bind:contents="newEpisodesPrepared"></poster-row>
</div>

@if($user)
<div v-if="historyPrepared.length > 0">
	<h4 class="h4 pl-4">Recently Viewed</h4>
	<poster-row v-bind:contents="historyPrepared">
	</poster-row>
</div>
@endif
