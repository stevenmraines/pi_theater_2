<template>
	<div class="modal fade" id="movie-modal">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 id="movie-modal-title" class="modal-title">
						{{ title }}
						<small class="ml-2 text-muted" v-if="movie_year.year_released">
							({{ movie_year.year_released }})
						</small>
					</h5>
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="d-flex flex-column flex-lg-row p-2 pb-4">
						<span class="modal-poster-container mx-auto">
							<div v-if="user && progress >= 0 && duration > 0" class="viewing-progress">
								<div class="viewing-progress" v-bind:style="{ width: progressPercentage + '%' }"></div>
							</div>
							<img v-bind:src="paths.posters + '/' + poster" />
						</span>
						<span id="movie-modal-info" class="card mt-4 mt-lg-0 ml-lg-4">
							<div class="card-body">
								<div id="movie-modal-summary" class="mb-2">{{ summary }}</div>
								<div id="movie-modal-extras" class="font-italic mb-2" v-if="notes">
									{{ notes }}
								</div>
								<span class="font-weight-bold">Genres:</span>
								<ul id="movie-modal-genres" class="d-inline-block list-inline mb-2">
									<li class="list-inline-item" v-for="(genre, i) in genres" :key="i">
										{{ genre.name }}{{ i !== genres.length - 1 ? ',' : '' }}
									</li>
								</ul>
							</div>
						</span>
					</div>
					<div class="modal-footer">
						<div style="width: 100%;">
							<button
								class="btn btn-success d-block d-lg-inline-block float-lg-left mb-3 mb-lg-0 align-items-center"
								data-placement="top"
								data-toggle="tooltip"
								title="Add to Watchlist"
								v-if="user && !inWatchlist"
								v-on:click="addToWatchlist"
							>
								<i class="mdi mdi-plus-circle-outline"></i> WATCHLIST
							</button>

							<button
								class="btn btn-warning d-block d-lg-inline-block float-lg-left mb-3 mb-lg-0 align-items-center"
								data-placement="top"
								data-toggle="tooltip"
								title="Remove from Watchlist"
								v-if="user && inWatchlist"
								v-on:click="removeFromWatchlist"
							>
								<i class="mdi mdi-minus-circle-outline"></i> WATCHLIST
							</button>

							<button
								class="btn btn-primary d-block d-lg-inline-block float-lg-right mb-3 mb-lg-0 ml-lg-3 align-items-center"
								data-placement="top"
								data-toggle="tooltip"
								title="Continue"
								v-if="user && history"
								v-on:click="watch(progress)"
							>
								<i class="mdi mdi-arrow-right-drop-circle-outline"></i> CONTINUE
							</button>

							<button
								class="btn btn-primary d-block d-md-inline-block float-lg-right align-items-center"
								data-placement="top"
								data-toggle="tooltip"
								v-bind:title="user && history ? 'Restart' : 'Play'"
								v-on:click="watch(0)"
							>
								<i
									class="mdi"
									v-bind:class="{
										'mdi-sync' : user && history,
										'mdi-arrow-right-drop-circle-outline' : !user || !history
									}"
								></i> {{ user && history ? 'RESTART' : 'PLAY' }}
							</button>
						</div>
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
			'movie_year',
			'paths',
			'poster',
			'genres',
			'user',
		],

		computed: {
			// TODO DRY up some of these methods as they're repeated in PosterContainer and ShowModal
			duration: function() {
				if(this.history && this.history.drive[0].pivot.duration > 0) {
					return this.history.drive[0].pivot.duration;
				}

				return 0;
			},

			history: function() {
				/*
				 * History_media will contain progress for movies and
				 * progress for the most recently watched episode of any shows.
				 */
				if(this.user.history_media && this.user.history_media.length > 0) {
					for(var i = 0; i < this.user.history_media.length; i++) {
						if(this.user.history_media[i].id == this.id) {
							return this.user.history_media[i];
						}
					}
				}

				return null;
			},

			inWatchlist: function() {
				for(var i = 0; i < this.user.watchlist.length; i++) {
					if(this.id == this.user.watchlist[i].id) {
						return true;
					}
				}

				return false;
			},

			progress: function() {
				if(this.history && this.history.pivot.progress > 0) {
					return this.history.pivot.progress;
				}

				return 0;
			},

			progressPercentage: function() {
				if(this.progress > 0 && this.duration > 0) {
					return ( this.progress / this.duration ) * 100;
				}

				return 0;
			},
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

			watch(progress) {
				Event.trigger('setVideo', { id : this.id, progress : progress });
			},
		},
	}
</script>
