/*
 * EVENT DISPATCHER
 */
window.Event = new class {
	constructor() {
		this.vue = new Vue();
	}

	trigger(event, data = null) {
		this.vue.$emit(event, data);
	}

	listen(event, callback) {
		this.vue.$on(event, callback);
	}
};

/*
 * REGISTER KEYBOARD EVENTS
 */
$(document).keyup(function(event) {
	switch(event.which) {
		case 27:  // Esc
			Event.trigger('hideModal');
			break;
		case 37:  // Left arrow
			Event.trigger('rewind');
			break;
		case 32:  // Space
		case 38:  // Up arrow
			Event.trigger('togglePlay');
			break;
		case 39:  // Right arrow
			Event.trigger('fastForward');
			break;
		case 40:  // Down arrow
			Event.trigger('toggleTimeRange');
			break;
		case 83:  // S key
			if(event.shiftKey && event.ctrlKey) {
				Event.trigger('showSearchModal');
			}
			break;
	}
});

/*
 * ROOT VUE INSTANCE
 */
const app = new Vue({
	el: '#vue-wrapper',

	data: {
		collection: {},
		collections: window.__INITIAL_STATE__.collections,

		fluidModal: {
			title: '',
			contents: [],
		},

		genre: {},
		genres: window.__INITIAL_STATE__.genres,
		genreColumns: [],

		history: {},

		movieModal: {
			id: 0,
			title: '',
			summary: '',
			notes: null,
			poster: 'missing-poster.jpg',
			genres: [],
			release: [],
		},

		recentCollections: window.__INITIAL_STATE__.recentCollections,
		recentEpisodes: window.__INITIAL_STATE__.recentEpisodes,
		recentMovies: window.__INITIAL_STATE__.recentMovies,
		recentShows: window.__INITIAL_STATE__.recentShows,
		recentSpotlight: window.__INITIAL_STATE__.recentSpotlight,

		showModal: {
			id: 0,
            title: '',
            summary: '',
            notes: null,
            poster: 'missing-poster.jpg',
            episodes: [],
            genres: [],
			seasons: [],
			release: [],
		},

		user: window.__INITIAL_STATE__.user,

		video: {
			drive: '',
			filename: '',
			mediaType: '',
		},
	},

	mounted: function() {
		this.createGenreTable();
	},

	created: function() {
		Event.listen('addToWatchlist', this.addToWatchlist);
		Event.listen('getMedia', this.getMedia);
		Event.listen('removeFromWatchlist', this.removeFromWatchlist);
		Event.listen('setVideo', this.setVideo);
	},

	methods: {
		addToWatchlist: function(mediaId) {
			var self = this;

			axios.post('/api/watchlist/add/' + this.user.id + '/' + mediaId)
			.then(function (response) {
				self.user.watchlist = response.data.watchlist;
				self.watchlist.user = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
		},

		checkInWatchlist: function(id) {
			if(
				this.user &&
				this.user.watchlist &&
				this.user.watchlist.length > 0
			){
				for(var i = 0; i < this.user.watchlist.length; i++) {
					if(this.user.watchlist[i].id == id) {
						return true;
					}
				}
			}

			return false;
		},

		createGenreTable: function() {
			var genre_column_count = this.genres.length % 5 === 0 ? 5 :
				(this.genres.length % 4 === 0 ? 4 : 3);
			var max_genres_per_column	= Math.ceil(this.genres.length / genre_column_count);
			var genreColumns = [];

			for(var i = 0; i < this.genres.length; i++) {
				if(i % max_genres_per_column === 0 || i === 0) {
					genreColumns.push([]);  // Add another column
				}

				genreColumns[genreColumns.length - 1].push(this.genres[i]);
			}

			this.genreColumns = genreColumns;
		},

		findEpisode: function(episode_id) {
			return function(episode) {
				return episode.id == episode_id;
			};
		},

		finishHistory: function(mediaId) {
			var self = this;

			axios.post('/api/history/finish' + this.user.id + '/' + mediaId)
			.then(function(response) {
				self.user = response.data;
				self.watchlist.user = response.data;
			})
			.catch(function(error) {
				console.log(error);
			});
		},

		fluidModalRecentEpisodes: function() {
			this.fluidModal.title = 'New Episodes';
			this.fluidModal.contents = this.recentEpisodes;
			Event.trigger('showFluidModal');
		},

		fluidModalRecentGenre: function(id) {
			var self = this;

			axios.get('/api/genre/' + id).then(function(response) {
				self.fluidModal.title = 'New in ' + response.data.name;

				// Sort media by created_at date
				response.data.media.sort(function(a, b) {
					return new Date(b['created_at']) - new Date(a['created_at']);
				});

				self.fluidModal.contents = response.data.media;
				Event.trigger('showFluidModal');
			}).catch(function(error) {
				console.log(error);
			});
		},

		fluidModalRecentMovies: function() {
			this.fluidModal.title = 'New Movies';
			this.fluidModal.contents = this.recentMovies;
			Event.trigger('showFluidModal');
		},

		fluidModalRecentShows: function() {
			this.fluidModal.title = 'New Shows';
			this.fluidModal.contents = this.recentShows;
			Event.trigger('showFluidModal');
		},

		getCollection: function(id) {
			var self = this;

			axios.get('/api/collection/' + id).then(function(response) {
				self.collection = response.data;
				Event.trigger('showCollectionModal');
			}).catch(function(error) {
				console.log(error);
			});
		},

		getGenre: function(id) {
			var self = this;

			axios.get('/api/genre/' + id).then(function(response) {
				self.genre = response.data;
				Event.trigger('showGenreModal');
			}).catch(function(error) {
				console.log(error);
			});
		},

		getMedia: function(id) {
			var self = this;

			axios.get('/api/media/' + id).then(function(response) {
				// Update modal props
				var modal = response.data.media_type + 'Modal';

				if(response.data.media_type === 'movie') {
					self.movieModal.id = response.data.id;
					self.movieModal.title = response.data.title;
					self.movieModal.summary = response.data.summary;
					self.movieModal.notes = response.data.notes;
					self.movieModal.poster = response.data.poster;
					self.movieModal.release = response.data.release;
					self.movieModal.genres = response.data.genres;
				}

				if(response.data.media_type === 'show') {
					self.showModal.id = response.data.id;
					self.showModal.title = response.data.title;
					self.showModal.summary = response.data.summary;
					self.showModal.notes = response.data.notes;
					self.showModal.poster = response.data.poster;
					self.showModal.episodes = response.data.episodes;
					self.showModal.genres = response.data.genres;
					self.showModal.seasons = response.data.seasons;
					self.showModal.release = response.data.release;
				}

				// Display the modal
				var event = 'display' + modal.charAt(0).toUpperCase() + modal.substring(1);
				if(response.data.media_type === 'show') {
					response.data.user = self.user;
					Event.trigger('setShow', response.data);
				}
				Event.trigger(event, response.data);
			}).catch(function(error) {
				console.log(error);
			});
		},

		removeFromWatchlist: function(mediaId) {
			var self = this;

			axios.post('/api/watchlist/remove/' + this.user.id + '/' + mediaId)
			.then(function (response) {
				self.user.watchlist = response.data.watchlist;
				self.watchlist.user = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
		},

		showWatchlist: function() {
			if(this.user) {
				Event.trigger('showWatchlistModal');
			}
		},

		search: function() {
			Event.trigger('showSearchModal');
		},

		setVideo: function(data) {
			var self = this;
			var id = data.id;

			if(data.episode_id) {
				var episode_id = data.episode_id;
			}

			axios
				.get('/api/media/' + id)
				.then(function (response) {
				  	// Get the drive, filename, and mediaType
				  	self.video.mediaType = response.data.media_type;
					console.log(response.data);
				  	if(response.data.media_type === 'movie') {
				  		self.video.drive = response.data.drive[0].name;
				  		self.video.filename = response.data.drive[0].pivot.filename;
				  	}

				  	if(response.data.media_type === 'show' && episode_id) {
				  		var filtered_episodes =
							response
								.data
								.episodes
								.filter(self.findEpisode(episode_id));

						var episode = filtered_episodes[0];
				  		self.video.drive = episode.drive[0].name;
				  		self.video.filename = episode.drive[0].pivot.filename;
				  	}

				  	// Hide all modals and trigger the display of the video player
				  	Event.trigger('hideModal');
				  	Event.trigger('setVideoPlayerSrc', self.video);
				  	Event.trigger('showVideoPlayer');
				})
				.catch(function (error) {
					console.log(error);
				});
		},

		updateHistory: function(mediaId, progress) {
			var self = this;

			axios.post(
				'/api/history/update/' +
				this.user.id + '/' +
				mediaId + '/' +
				progress
			).then(function(response) {
				self.user = response.data;
				self.watchlist.user = response.data;
			})
			.catch(function(error) {
				console.log(error);
			});
		},
	},
});
