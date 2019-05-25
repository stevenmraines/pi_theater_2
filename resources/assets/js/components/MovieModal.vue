<template>
	<div class="modal fade" id="movie-modal">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 id="movie-modal-title" class="modal-title">
						{{ title }}
						<small class="ml-2 text-muted" v-if="release.year_released">
							({{ release.year_released }})
						</small>
					</h5>
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="d-flex flex-column flex-lg-row p-2 pb-4">
						<img
							id="movie-modal-poster"
							class="modal-poster mx-auto"
							v-bind:src="'/img/posters/' + poster"
						/>
						<span id="movie-modal-info" class="card mt-4 mt-lg-0 ml-lg-4">
							<div class="card-body">
								<div id="movie-modal-summary" class="mb-2">{{ summary }}</div>
								<div id="movie-modal-extras" class="font-italic mb-2" v-if="notes">
									{{ notes }}
								</div>
								<span class="font-weight-bold">Genres:</span>
								<ul id="movie-modal-genres" class="d-inline-block list-inline mb-2">
									<li class="list-inline-item" v-for="(genre, i) in genres">
										{{ genre.name }}{{ i !== genres.length - 1 ? ',' : '' }}
									</li>
								</ul>
							</div>
						</span>
					</div>
					<div class="modal-footer d-flex justify-content-between flex-column-reverse flex-sm-row">
						<div v-if="user">
							<button
								class="btn btn-success btn-watchlist"
								v-if="!inWatchlist"
								v-on:click="addToWatchlist"
							>
								+ WATCHLIST
							</button>
							<button
								class="btn btn-warning btn-watchlist"
								v-if="inWatchlist"
								v-on:click="removeFromWatchlist"
							>
								&minus; WATCHLIST
							</button>
						</div>
						<button
							class="btn btn-primary ml-sm-auto ml-0 mb-4 mb-sm-0 btn-watchlist"
							v-on:click="watch"
						>
							WATCH NOW
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'id',
			'title',
			'summary',
			'notes',
			'release',
			'poster',
			'genres',
			'user',
		],

		computed: {
			inWatchlist: function() {
				for(var i = 0; i < this.user.watchlist.length; i++) {
					if(this.id == this.user.watchlist[i].id) {
						return true;
					}
				}

				return false;
			}
		},

		created() {
			Event.listen('displayMovieModal', this.display);
			Event.listen('hideMovieModal', this.hide);
			Event.listen('hideModal', this.hide);
		},

		methods: {
			display() {
				$('#movie-modal').modal('show');
			},

			hide() {
				$('#movie-modal').modal('hide');
			},

			addToWatchlist() {
				Event.trigger('addToWatchlist', this.id);
			},

			removeFromWatchlist() {
				Event.trigger('removeFromWatchlist', this.id);
			},

			watch() {
				Event.trigger('setVideo', { 'id' : this.id });
			},
		},
	}
</script>
