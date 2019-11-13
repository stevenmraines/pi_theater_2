<template>
    <div>
        <div class="row">
            <div class="col">
                <form class="form-inline" novalidate>
                    <div class="form-group">
                        <label for="drive">Hard drive</label>
                        <select id="drive" class="form-control ml-3" v-model="currentDrive">
                            <option :key="0" :value="0" selected>Please Select...</option>
                            <option v-for="drive in drives" :key="drive.id" :value="drive.id">
                                {{ drive.name }}
                            </option>
                        </select>
                        <h3 class="d-inline mb-0 ml-3" v-if="currentDrive > 0">
                            {{ newUploadsMessage }}
                        </h3>
                    </div>
                </form><hr />
            </div>
        </div>

        <div v-if="currentDrive > 0">
            <div class="card" role="tablist">
                <h5 class="card-header mb-0">
                    <a data-toggle="collapse" href="#movie-form-container" role="tab">
                        Add Movies ({{ movies.length }} pending)
                    </a>
                </h5>
                <movie-form
                    id="movie-form-container"
                    class="card-body collapse"
                    role="tabpanel"
                    :collections="collections"
                    :drive="currentDrive"
                    :driveEventDispatcher="eventDispatcher"
                    :files="movies"
                    :genres="genres"
                ></movie-form>
            </div>

            <div class="card" role="tablist">
                <h5 class="card-header mb-0">
                    <a data-toggle="collapse" href="#episode-form-container" role="tab">
                        Add Episodes ({{ episodes.length }} pending)
                    </a>
                </h5>
                <episode-form
                    id="episode-form-container"
                    class="card-body collapse"
                    role="tabpanel"
                    :drive="currentDrive"
                    :driveEventDispatcher="eventDispatcher"
                    :files="episodes"
                    :shows="shows"
                ></episode-form>
            </div>
        </div>

        <div class="card" role="tablist">
            <h5 class="card-header mb-0">
                <a data-toggle="collapse" href="#show-form-container" role="tab">
                    Add Shows
                </a>
            </h5>
            <show-form
                id="show-form-container"
                class="card-body collapse"
                role="tabpanel"
                :collections="collections"
                :drive="currentDrive"
                :driveEventDispatcher="eventDispatcher"
                :genres="genres"
            ></show-form>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'initialState',
        ],

        data() {
            return {
                currentDrive: 0,
                drives: this.initialState.drives,
                eventDispatcher: new Vue({}),
                pending: this.initialState.pending,
                shows: this.sortShows(this.initialState.shows),
            };
        },

        computed: {
            collections: function() {
                var collections = [];

                for(var i = 0; i < this.initialState.collections.length; i++) {
                    collections.push(
                        this.initialState.collections[i].name
                    );
                }

                return collections;
            },

            episodes: function() {
                if(this.currentDrive <= 0
                        || typeof this.pending[this.currentDrive] === 'undefined') {
                    return [];
                }

                return this.pending[this.currentDrive].episodes;
            },

            genres: function() {
                var genres = [];

                for(var i = 0; i < this.initialState.genres.length; i++) {
                    genres.push(
                        this.initialState.genres[i].name
                    );
                }

                return genres;
            },

            movies: function() {
                if(this.currentDrive <= 0
                        || typeof this.pending[this.currentDrive] === 'undefined') {
                    return [];
                }

                return this.pending[this.currentDrive].movies;
            },

            newUploadsMessage: function() {
                if(this.currentDrive <= 0
                        || typeof this.pending[this.currentDrive] === 'undefined') {
                    return '';
                }

                var newVideos = 0;

                if(this.pending[this.currentDrive].movies.length > 0) {
                    newVideos += this.pending[this.currentDrive].movies.length;
                }

                if(this.pending[this.currentDrive].episodes.length > 0) {
                    newVideos += this.pending[this.currentDrive].episodes.length;
                }

                var message = (newVideos > 0 ? newVideos : 'No')
                    + ' New Upload'
                    + (newVideos === 1 ? '' : 's');

                return message;
            },
        },

        created() {
            if(this.drives.length > 0) {
                // Set the currentDrive
                this.currentDrive = this.drives[0].id;

                // Listen for child form events
                this.eventDispatcher.$on('movieSubmit', this.movieSubmit);
                this.eventDispatcher.$on('episodeSubmit', this.episodeSubmit);
                this.eventDispatcher.$on('showSubmit', this.showSubmit);
            }
        },

        methods: {
            episodeSubmit(episode) {
                episode._token = this.initialState.csrfToken;

                var formData = this.getFormData(episode);

                axios.post('/api/upload/episode', formData)
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            getFormData(data) {
                var formData = new FormData();

                for(var prop in data) {
                    if(data.hasOwnProperty(prop)) {
                        // If the value is an array, we need to treat it as such
                        if(Array.isArray(data[prop])) {
                            for(var i = 0; i < data[prop].length; i++) {
                                formData.append(prop + '[]', data[prop][i]);
                            }

                            continue;
                        }

                        formData.append(prop, data[prop]);
                    }
                }

                return formData;
            },

            movieSubmit(movie) {
                movie._token = this.initialState.csrfToken;
                movie.poster = movie.poster.item(0);

                if(movie.jumbotron) {
                    movie.jumbotron = movie.jumbotron.item(0);
                }

                var formData = this.getFormData(movie);

                axios.post('/api/upload/movie', formData)
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            showSubmit(show) {
                show._token = this.initialState.csrfToken;
                show.poster = show.poster.item(0);

                if(show.jumbotron) {
                    show.jumbotron = show.jumbotron.item(0);
                }

                var formData = this.getFormData(show);

                axios.post('/api/upload/show', formData)
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            sortShows(shows) {
                return shows.sort(function(a, b) {
                    return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                });
            },
        },
    }
</script>