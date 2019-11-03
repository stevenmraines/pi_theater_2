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
                    <a data-toggle="collapse" href="#movie-form" role="tab">
                        Add Movies ({{ movies.length }} pending)
                    </a>
                </h5>
                <movie-form
                    id="movie-form"
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
                    <a data-toggle="collapse" href="#episode-form" role="tab">
                        Add Episodes ({{ episodes.length }} pending)
                    </a>
                </h5>
<!--                <episode-form-->
<!--                    id="episode-form"-->
<!--                    class="card-body collapse"-->
<!--                    role="tabpanel"-->
<!--                    :drive="currentDrive"-->
<!--                    :files="episodes"-->
<!--                    :shows="shows"-->
<!--                ></episode-form>-->
            </div>

            <div class="card" role="tablist">
                <h5 class="card-header mb-0">
                    <a data-toggle="collapse" href="#show-form" role="tab">
                        Add Shows
                    </a>
                </h5>
            </div>
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
                shows: this.initialState.shows,
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
            movieSubmit() {

            },

            episodeSubmit() {

            },

            showSubmit() {

            },
        },
    }
</script>

<style scoped>

</style>