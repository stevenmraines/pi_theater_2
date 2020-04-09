<div
	id="jumbotron-carousel"
	class="carousel carousel-fade slide mb-5"
	data-ride="carousel"
>
	<ol class="carousel-indicators">
		<li
			data-target="#jumbotron-carousel"
			v-bind:class="{ active: index === 0 }"
			v-bind:data-slide-to="index"
			v-for="(media, index) in recentSpotlight"
		></li>
	</ol>
	<div class="carousel-inner" role="listbox">
		<div
			class="carousel-item"
			v-bind:class="{ active: index === 0 }"
			v-for="(media, index) in recentSpotlight"
		>
			<div class="jumbo-carousel-overlay">
				<div class="jumbo-carousel-info">
					<button
						class="btn btn-outline-primary jumbo-carousel-button mr-5"
						data-placement="top"
						data-toggle="tooltip"
						title="Play"
						v-on:click="setVideo({ 'id' : media.id })"
					>
						<i class="mdi mdi-arrow-right-drop-circle-outline"></i> PLAY
					</button>
					@if(!auth()->check())
						<a
							class="btn btn-outline-success jumbo-carousel-button"
							data-placement="top"
							data-toggle="tooltip"
							href="/login"
							title="Add to Watchlist"
						>
							<i class="mdi mdi-plus-circle-outline"></i> WATCHLIST
						</a>
					@else
						<button
							class="btn btn-outline-success jumbo-carousel-button"
							data-placement="top"
							data-toggle="tooltip"
							title="Add to Watchlist"
							v-if="user !== null && !checkInWatchlist(media.id)"
							v-on:click="addToWatchlist(media.id)"
						>
							<i class="mdi mdi-plus-circle-outline"></i> WATCHLIST
						</button>
					@endif
					<button
						class="btn btn-outline-warning jumbo-carousel-button"
						data-placement="top"
						data-toggle="tooltip"
						title="Remove from Watchlist"
						v-if="user !== null && checkInWatchlist(media.id)"
						v-on:click="removeFromWatchlist(media.id)"
					>
						<i class="mdi mdi-minus-circle-outline"></i> WATCHLIST
					</button>
				</div>
			</div>
			<img
				class="jumbo-carousel-img d-none d-lg-inline"
				v-bind:src="paths.jumbotron + '/' + media.jumbotron"
			/>
		</div>
	</div>
</div>
