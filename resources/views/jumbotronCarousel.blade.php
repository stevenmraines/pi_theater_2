<div
	id="jumbotron-carousel"
	class="carousel carousel-fade slide mb-5"
	data-ride="carousel"
>
	<ol class="carousel-indicators">
		<li
			v-for="(media, index) in recentSpotlight"
			v-bind:class="{ active: index === 0 }"
			data-target="#jumbotron-carousel"
			v-bind:data-slide-to="index"
		></li>
	</ol>
	<div class="carousel-inner" role="listbox">
		<div
			class="carousel-item"
			v-for="(media, index) in recentSpotlight"
			v-bind:class="{ active: index === 0 }"
		>
			<div class="jumbo-carousel-overlay">
				<div class="jumbo-carousel-info">
					<button
						class="btn btn-outline-primary jumbo-carousel-button mr-5"
						v-on:click="setVideo({ 'id' : media.id })"
					>
						Watch Now
					</button>
					@if(!auth()->check())
						<a
							href="/login"
							class="btn btn-outline-success jumbo-carousel-button"
						>
							+ Watchlist
						</a>
					@else
						<button
							v-if="user !== null && !checkInWatchlist(media.id)"
							class="btn btn-outline-success jumbo-carousel-button"
							v-on:click="addToWatchlist(media.id)"
						>
							+ Watchlist
						</button>
					@endif
					<button
						v-if="user !== null && checkInWatchlist(media.id)"
						class="btn btn-outline-warning jumbo-carousel-button"
						v-on:click="removeFromWatchlist(media.id)"
					>
						&minus; Watchlist
					</button>
				</div>
			</div>
			<img
				class="jumbo-carousel-img d-none d-lg-inline"
				v-bind:src="'/img/jumbotron/' + media.jumbotron"
			/>
		</div>
	</div>
</div>
