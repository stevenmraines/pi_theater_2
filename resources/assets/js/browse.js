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
		collection: {},
		collections: window.__INITIAL_STATE__.collections,

		genre: {},
		genres: window.__INITIAL_STATE__.genres,
		genreColumns: [],

		movieModal: {
			id: 0,
			title: '',
			summary: '',
			notes: null,
			year_start: 0,
			poster: 'missing-poster.jpg',
			genres: [],
		},

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
		},
	},

	computed: {

	},

	methods: {
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
	},

	mounted: function() {
		this.createGenreTable();
	},

	created: function() {
		Event.listen('getMedia', this.getMedia);
	},
});
