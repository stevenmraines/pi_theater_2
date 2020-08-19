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
        data() {
            return {
                currentDrive: 0,
                drives: window.__INITIAL_STATE__.drives,
                eventDispatcher: new Vue({}),
                pending: window.__INITIAL_STATE__.pending,
                shows: this.sortShows(window.__INITIAL_STATE__.shows),
            };
        },

        computed: {
            collections: function() {
                var collections = [];

                for(var i = 0; i < window.__INITIAL_STATE__.collections.length; i++) {
                    collections.push(
                        window.__INITIAL_STATE__.collections[i].name
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

                for(var i = 0; i < window.__INITIAL_STATE__.genres.length; i++) {
                    genres.push(
                        window.__INITIAL_STATE__.genres[i].name
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
            }
        },

        methods: {
            episodeSubmit(file) {
                var index = this.pending[this.currentDrive].episodes.indexOf(file);
                this.pending[this.currentDrive].episodes.splice(index, 1);
            },

            movieSubmit(movie) {
                var index = _.findIndex(this.pending[this.currentDrive].movies, { filename: movie.filename });
                if(index >= 0) {
                    this.pending[this.currentDrive].movies.splice(index, 1);
                }
            },

            sortShows(shows) {
                return shows.sort(function(a, b) {
                    return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                });
            },
        },
    }
</script>