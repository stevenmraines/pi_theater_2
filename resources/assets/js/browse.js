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
		genres: [],
		genre_columns: [],
		collections: [],
		recent_movies: [],
		recent_shows: [],
		history: [],
		watchlist: [],
		watchlist_movies: [],
		watchlist_shows: [],
		watchlist_api: '',
		movie_modal: {},
		show_modal: {},
	},

	methods: {
		newGenre: function(genre_id) {
			var self = this;
			axios.get('/api/movie/recentGenre/10/0/' + genre_id)
				.then(function(response) {
					console.log(response.data);
					// self.something = response.data;
				});
		},

		createGenreTable: function() {
			var genre_column_count		= this.genres.length % 5 === 0 ? 5 :
					(this.genres.length % 4 === 0 ? 4 : 3);
			var max_genres_per_column	= Math.ceil(this.genres.length / genre_column_count);
			var genre_columns			= [];
			for(var i = 0; i < this.genres.length; i++) {
				if(i % max_genres_per_column === 0 || i === 0) {
					genre_columns.push([]);  // Add another column
				}
				genre_columns[genre_columns.length - 1].push(this.genres[i]);
			}
			this.genre_columns = genre_columns;
		},

		getWatchlist: function() {
			var self = this;
			axios.get('/user/watchlist/allMedia')
				.then(function(response) {
					console.log(response.data);
					self.watchlist_movies = response.data.movies;
					self.watchlist_shows = response.data.shows;
					self.watchlist = response.data.movies.concat(response.data.shows);
				});
		},
	},

	mounted: function() {
		/*
		 * TODO:
		 * - Get all genres for navbar
		 * - Get recently updated collections
		 * - Get recent movies
		 * - Create genres table dropdown in navbar
		 */
		var self = this;

		axios.get('/api/genre/allGenres')
			.then(function(response) {
				self.genres = response.data;
				self.createGenreTable();
			});

		axios.get('/api/collection/recent/3')
			.then(function(response) {
				self.collections = response.data;
			});

		axios.get('/api/movie/recent/10/0')
			.then(function(response) {
				self.recent_movies = response.data;
			});

		axios.get('/api/show/recent/10/0')
			.then(function(response) {
				self.recent_shows = response.data;
			});
	},
});
