/*
 * SETUP VARIABLES
 */
var genre_column_count		= genres.length % 5 === 0 ? 5 :
		(genres.length % 4 === 0 ? 4 : 3);
var max_genres_per_column	= Math.ceil(genres.length / genre_column_count);
var genre_columns			= [];
for(var i = 0; i < genres.length; i++) {
	if(i % max_genres_per_column === 0 || i === 0) {
		genre_columns.push([]);  // Add another column
	}
	genre_columns[genre_columns.length - 1].push(genres[i]);
}

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
		genres: genres,
		genre_columns: genre_columns,
		collections: collections,
		recent_movies: recent_movies,
		recent_shows: [],
		history: [],
		movie_modal: {},
		show_modal: {}
	}
});
