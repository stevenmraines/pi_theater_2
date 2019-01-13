<template>
	<div class="modal fade" id="movie-modal">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 id="movie-modal-title" class="modal-title">
						{{ title }}
						<small class="ml-2 text-muted">({{ year }})</small>
					</h5>
					<button type="button" class="close" data-dismiss="modal">
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="d-flex flex-column flex-lg-row p-2 pb-4">
						<img v-bind:src="'/img/posters/' + poster" id="movie-modal-poster" class="modal-poster mx-auto" />
						<span id="movie-modal-info" class="card mt-4 mt-lg-0 ml-lg-4">
							<div class="card-body">
								<div id="movie-modal-summary" class="mb-2">{{ summary }}</div>
								<div id="movie-modal-extras" class="font-italic mb-2" v-if="notes !== null">
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
						<div v-if="logged">
							<button class="btn btn-success btn-watchlist" v-if="!inWatchlist" v-on:click="addMovie()">
								ADD TO WATCHLIST
							</button>
							<button class="btn btn-warning btn-watchlist" v-if="inWatchlist" v-on:click="removeMovie()">
								REMOVE FROM WATCHLIST
							</button>
						</div>
						<a v-bind:href="'/theater/movie/' + id"
								class="btn btn-primary ml-sm-auto ml-0 mb-4 mb-sm-0 btn-watchlist">
							WATCH NOW
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id:		0,
				title:			'',
				summary:		'',
				notes:			null,
				year:			0,
				poster:			'missing-poster.jpg',
				genres:			[],
				inWatchlist:	false,
				logged:			false
			};
		},

		created() {
			Event.listen('movieInfo', this.load);
		},

		methods: {
			load(data) {
				var self = this;
				axios.get('/movie/info/' + data.id)
					.then(function(response) {
						self.id		= response.data.id;
						self.title			= response.data.title;
						self.summary		= response.data.summary;
						self.notes			= response.data.notes;
						self.year			= response.data.year;
						self.poster			= response.data.poster;
						self.genres			= response.data.genres;
						self.logged			= response.data.logged;
						self.inWatchlist	= response.data.inWatchlist;
						$('#movie-modal').modal('show');
					});
			},

			addMovie() {
				var self = this;
				axios.get('/user/watchlist/addMovie/' + this.id)
					.then(function(response) {
						if(typeof response.data.success !== null && response.data.success) {
							self.inWatchlist = true;
						}
					});
			},

			removeMovie() {
				var self = this;
				axios.get('/user/watchlist/removeMovie/' + this.id)
					.then(function(response) {
						if(typeof response.data.success !== null && response.data.success) {
							self.inWatchlist = false;
							Event.trigger('removeFromWatchlist', {
								id: self.id,
								mediaType: 'movies',
							});
						}
					});
			},
		},
	}
</script>
