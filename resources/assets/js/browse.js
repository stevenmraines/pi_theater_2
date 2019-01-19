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
 * ROOT VUE INSTANCE
 */
const app = new Vue({
	el: '#vue-wrapper',

	data: {
		collections: [],
		collectionResults: {
			movies: [],
			shows: [],
			// episodes: [],
			logo: '',
		},

		displayNewHorror: false,
		displayNewSciFi: false,
		displayNewEpisodes: false,

		genres: [],
		genreColumns: [],
		genreResults: {
			movies: [],
			shows: [],
		},

		history: {
			movies: [],
			shows: [],
		},

		movieModal: {},

		newEpisodes: {
			shows: [],
		},
		newHorror: {
			movies: [],
			shows: [],
		},
		newSciFi: {
			movies: [],
			shows: [],
		},

		recentCollections: [],
		recentMovies: {
			movies: [],
		},
		recentShows: {
			shows: [],
		},

		showModal: {},

		watchlist: {
			movies: [],
			shows: [],
		},
	},

	computed: {
		collectionResultsPrepared: function() {
			return this.prepare(this.collectionResults);
		},

		historyPrepared: function() {
			return this.prepare(this.history);
		},

		newEpisodesPrepared: function() {
			return this.prepare(this.newEpisodes);
		},

		newHorrorPrepared: function() {
			return this.prepare(this.newHorror);
		},

		newSciFiPrepared: function() {
			return this.prepare(this.newSciFi);
		},

		recentMoviesPrepared: function() {
			return this.prepare(this.recentMovies);
		},

		recentShowsPrepared: function() {
			return this.prepare(this.recentShows);
		},

		watchlistPrepared: function() {
			return this.prepare(this.watchlist);
		},
	},

	methods: {
		prepare: function(contents) {
			var prepared = [];

			if(contents.movies) {
				contents.movies.forEach(function(movie) {
					prepared.push({
						id: movie.id,
						title: movie.title,
						poster: movie.poster,
						mediaType: 'movie',
					});
				});
			}

			if(contents.shows) {
				contents.shows.forEach(function(show) {
					prepared.push({
						id: show.id,
						title: show.title,
						poster: show.poster,
						mediaType: 'show',
					});
				});
			}

			return prepared;
		},

		newGenre: function(genre_id) {
			var self = this;

			axios.get('/api/movie/recentGenre/10/0/' + genre_id)
				.then(function(response) {
					// self.something = response.data;
				});
		},

		getNewEpisodes: function() {
			var self = this;

			axios.get('/api/show/newEpisodes/10/0').then(function(response) {
				self.newEpisodes.shows = response.data;
				self.displayNewEpisodes = true;
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

		getGenre: function(id) {
			var self = this;

			axios.get('/api/genre/allMedia/' + id)
				.then(function(response) {
					console.log(response.data);
					self.genreResults.movies = response.data.movies;
					self.genreResults.shows = response.data.shows;
				});
		},

		getCollection: function(id) {
			var self = this;

			axios.get('/api/collection/allMedia/' + id)
				.then(function(response) {
					self.collectionResults = response.data;
					Event.trigger('showCollectionModal');
				});
		},

		getWatchlist: function() {
			var self = this;

			axios.get('/user/watchlist/allMedia')
				.then(function(response) {
					self.watchlist.movies = response.data.movies;
					self.watchlist.shows = response.data.shows;
					Event.trigger('showWatchlistModal');
				});
		},

		showSearchModal: function() {
			Event.trigger('showSearchModal');
		},
	},

	mounted: function() {
		var self = this;

		axios.get('/api/genre/allGenres')
			.then(function(response) {
				self.genres = response.data;
				self.createGenreTable();
			});

		axios.get('/api/collection/allCollections')
			.then(function(response) {
				self.collections = response.data;
			});

		axios.get('/api/collection/recent/3')
			.then(function(response) {
				self.recentCollections = response.data;
			});

		axios.get('/api/movie/recent/10/0')
			.then(function(response) {
				self.recentMovies.movies = response.data;
			});

		axios.get('/api/show/recent/10/0')
			.then(function(response) {
				self.recentShows.shows = response.data;
			});
	},
});
