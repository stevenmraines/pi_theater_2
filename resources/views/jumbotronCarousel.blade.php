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
					<h1 class="">@{{ media.title }}</h1>
					<button
						class="btn btn-outline-primary jumbo-carousel-button mr-3"
						v-on:click="setVideo(media.id)"
					>
						Watch Now
					</button>
					@if(auth()->check())
						<button
							v-if="!checkInWatchlist(media.id)"
							class="btn btn-outline-success jumbo-carousel-button mr-3"
							v-on:click="addToWatchlist(media.id)"
						>
							Add to Watchlist
						</button>
						<button
							v-if="checkInWatchlist(media.id)"
							class="btn btn-outline-warning jumbo-carousel-button"
							v-on:click="removeFromWatchlist(media.id)"
						>
							Remove from Watchlist
						</button>
					@endif
				</div>
			</div>
			<img
				class="jumbo-carousel-img d-none d-lg-inline"
				v-bind:src="'/img/jumbo/' + media.jumbotron"
			/>
		</div>
	</div>
</div>
