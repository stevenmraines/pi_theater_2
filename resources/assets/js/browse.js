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
	if(event.which == 27) {  // Esc
		Event.trigger('hideModal');
	}

	if(event.which == 38) {  // Up arrow
		Event.trigger('togglePlay');
	}

	if(event.which == 40) {  // Down arrow
		Event.trigger('toggleTimeRange');
	}

	if(event.which == 83 && event.shiftKey && event.ctrlKey) {  // Shift + Ctrl + s
		Event.trigger('showSearchModal');
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
			year_start: 0,
			poster: 'missing-poster.jpg',
			genres: [],
		},

		recentCollections: window.__INITIAL_STATE__.recentCollections,
		recentEpisodes: window.__INITIAL_STATE__.recentEpisodes,
		recentMovies: window.__INITIAL_STATE__.recentMovies,
		recentShows: window.__INITIAL_STATE__.recentShows,

		showModal: {
			id: 0,
            title: '',
            summary: '',
            notes: null,
            year_start: 0,
            year_end: 0,
            poster: 'missing-poster.jpg',
            episodes: [],
            genres: [],
			seasons: [],
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
				for(var key in response.data) {
					if(self[modal].hasOwnProperty(key)) {
						self[modal][key] = response.data[key];
					}
				}

				// Display the modal
				var event = 'display' + modal.charAt(0).toUpperCase() + modal.substring(1);
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

		setVideo: function() {
			// Get the drive, filename, and mediaType
			this.video.drive = 'hdd1';
			this.video.filename = 'game-of-thrones_s01e04.mp4';
			this.video.mediaType = 'show';

			// Hide all modals and trigger the display of the video player
			Event.trigger('hideModal');
			Event.trigger('setVideoPlayerSrc', this.video);
			Event.trigger('showVideoPlayer');
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
