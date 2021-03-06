<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form id="movie-form" method="POST" enctype="multipart/form-data" novalidate>
                <!-- File -->
                <video-file-input
                    :eventDispatcher="eventDispatcher"
                    :files="files"
                    :value="currentFilename"
                ></video-file-input>

                <!-- IMDb Search Results -->
                <imdb-search-input
                    :eventDispatcher="eventDispatcher"
                    :results="currentMovie.imdb"
                    :value="currentImdbSearchResult"
                ></imdb-search-input>

                <!-- Title -->
                <title-input
                    :eventDispatcher="eventDispatcher"
                    :search="true"
                    :value="currentMovie.title"
                ></title-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="titleEmpty()">
                    <strong>Error: </strong>The Title field is required
                </div>

                <!-- Year Released -->
                <year-released-input
                    :eventDispatcher="eventDispatcher"
                    :title="currentMovie.title"
                    :value="currentMovie.yearReleased"
                ></year-released-input>

                <!-- TODO figure out how to get empty / required warning -->
                <div class="alert alert-danger mb-2" role="alert" v-if="!yearValid()">
                    <strong>Error: </strong>The Year Released field is not valid
                </div>

                <!-- Summary -->
                <summary-input
                    :eventDispatcher="eventDispatcher"
                    :required="true"
                    :value="currentMovie.summary"
                ></summary-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="summaryEmpty()">
                    <strong>Error: </strong>The Summary field is required
                </div>

                <!-- Notes -->
                <notes-input
                    :eventDispatcher="eventDispatcher"
                    :value="currentMovie.notes"
                ></notes-input>

                <!-- Poster -->
                <poster-input
                    :eventDispatcher="eventDispatcher"
                    :file="currentMovie.poster"
                    :title="currentMovie.title"
                    :url="currentMovie.posterUrl"
                ></poster-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="posterEmpty()">
                    <strong>Error: </strong>The Poster Image field is required
                </div>

                <!-- Jumbotron -->
                <jumbotron-input
                    :eventDispatcher="eventDispatcher"
                    :file="currentMovie.jumbotron"
                    :url="currentMovie.jumbotronUrl"
                ></jumbotron-input>

                <!-- Genres -->
                <multi-genre-input
                    :allGenres="genres"
                    :eventDispatcher="eventDispatcher"
                    :value="currentMovie.genres"
                ></multi-genre-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="genreEmpty()">
                    <strong>Error: </strong>The Genres field is required
                </div>

                <div class="alert alert-danger mb-2" role="alert" v-if="genreDuplicates()">
                    <strong>Error: </strong>There are duplicate values in the Genre fields
                </div>

                <!-- Collections -->
                <multi-collection-input
                    :allCollections="collections"
                    :eventDispatcher="eventDispatcher"
                    :value="currentMovie.collections"
                ></multi-collection-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="collectionEmpty()">
                    <strong>Error: </strong>There are empty values in the Collection fields
                </div>

                <div class="alert alert-danger mb-2" role="alert" v-if="collectionDuplicates()">
                    <strong>Error: </strong>There are duplicate values in the Collection fields
                </div>

                <!-- Submit -->
                <submit-input
                    :eventDispatcher="eventDispatcher"
                    :disabled="submitDisabled"
                ></submit-input>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'collections',
            'drive',
            'driveEventDispatcher',
            'files',
            'genres'
        ],

        data() {
            return {
                apiTimeout: null,
                currentFilename: this.files[0] ? this.files[0].filename : '',
                currentImdbSearchResult: null,
                eventDispatcher: new Vue({}),
                movies: [],
                yearMax: new Date().getFullYear(),
                yearMin: 1900,
            };
        },

        computed: {
            currentMovie() {
                var index = _.findIndex(this.movies, { 'file': this.currentFilename });
                
                if(index < 0) {
                    return {};
                }
                
                return this.movies[index];
            },

            submitDisabled() {
                return !this.valid();
            },
        },

        watch: {
            files() {
                // Hack to fix issue of fields not updating when DriveForm deletes the submitted movie
                if(this.files[0]) {
                    this.videoFileChange(this.files[0].filename);
                }
            }
        },

        created() {
            // Register events
            this.eventDispatcher.$on('collectionAdd', this.collectionAdd);
            this.eventDispatcher.$on('collectionChange', this.collectionChange);
            this.eventDispatcher.$on('collectionRemove', this.collectionRemove);
            this.eventDispatcher.$on('genreAdd', this.genreAdd);
            this.eventDispatcher.$on('genreChange', this.genreChange);
            this.eventDispatcher.$on('genreRemove', this.genreRemove);
            this.eventDispatcher.$on('imdbSearchChange', this.imdbSearchChange);
            this.eventDispatcher.$on('jumbotronChange', this.jumbotronChange);
            this.eventDispatcher.$on('notesChange', this.notesChange);
            this.eventDispatcher.$on('posterChange', this.posterChange);
            this.eventDispatcher.$on('posterUrlChange', this.posterUrlChange);
            this.eventDispatcher.$on('submit', this.submit);
            this.eventDispatcher.$on('summaryChange', this.summaryChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);
            this.eventDispatcher.$on('videoFileChange', this.videoFileChange);
            this.eventDispatcher.$on('yearReleasedChange', this.yearReleasedChange);

            // Initialize movies array
            for(var i = 0; i < this.files.length; i++) {
                this.movies.push({
                    collections: [''],
                    drive_id: this.drive,
                    file: this.files[i].filename,
                    genres: [''],
                    imdb: this.files[i].imdb,
                    jumbotron: null,
                    notes: '',
                    poster: null,
                    posterUrl: '',
                    summary: '',
                    title: this.files[i].title,
                    yearReleased: new Date().getFullYear(),
                });
            }
        },

        methods: {
            collectionAdd() {
                this.currentMovie.collections.push('');
            },

            collectionChange(data) {
                Vue.set(
                    this.currentMovie.collections,
                    data.index,
                    data.value
                );
            },

            collectionDuplicates() {
                var previousCollections = [];

                for(var i = 0; i < this.currentMovie.collections.length; i++) {
                    var currentCollection = this.currentMovie.collections[i];

                    if(previousCollections.indexOf(currentCollection) >= 0) {
                        return true;
                    }

                    previousCollections.push(currentCollection);
                }

                return false;
            },

            collectionEmpty() {
                var collections = this.currentMovie.collections;

                if(collections.length > 1) {
                    for(var i = 0; i < collections.length; i++) {
                        if(collections[i] === '') {
                            return true;
                        }
                    }
                }

                return false;
            },

            collectionRemove(index) {
                var newCollections = [''];

                if(this.currentMovie.collections.length > 1) {
                    this.currentMovie.collections.splice(index, 1);
                    newCollections = this.currentMovie.collections;
                }

                Vue.set(
                    this.currentMovie,
                    'collections',
                    newCollections
                );
            },

            fileListToArray(fileList) {
                var files = [];

                for(var i = 0; i < fileList.length; i++) {
                    if(typeof fileList.item(i) !== 'undefined') {
                        files.push(fileList.item(i));
                    }
                }

                return files;
            },

            genreAdd() {
                this.currentMovie.genres.push('');
            },

            genreChange(data) {
                Vue.set(
                    this.currentMovie.genres,
                    data.index,
                    data.value
                );
            },

            genreDuplicates() {
                var previousGenres = [];

                for(var i = 0; i < this.currentMovie.genres.length; i++) {
                    var currentGenre = this.currentMovie.genres[i];

                    if(previousGenres.indexOf(currentGenre) >= 0) {
                        return true;
                    }

                    previousGenres.push(currentGenre);
                }

                return false;
            },

            genreEmpty() {
                for(var i = 0; i < this.currentMovie.genres.length; i++) {
                    if(this.currentMovie.genres[i] === '') {
                        return true;
                    }
                }

                return false;
            },

            genreRemove(index) {
                var newGenres = [''];

                if(this.currentMovie.genres.length > 1) {
                    this.currentMovie.genres.splice(index, 1);
                    newGenres = this.currentMovie.genres;
                }

                this.currentMovie.genres = newGenres;
            },

            imdbSearchChange(imdbId) {
                this.currentImdbSearchResult = imdbId;
                var index = _.findIndex(this.currentMovie.imdb.d, { id: imdbId });

                if(index >= 0) {
                    this.currentMovie.poster = null;
                    var imdb = this.currentMovie.imdb.d[index];
                    this.currentMovie.title = imdb.l;
                    this.currentMovie.yearReleased = imdb.y;

                    if(imdb.i) {
                        this.currentMovie.posterUrl = imdb.i.imageUrl;
                    }

                    // Call to API to get more details
                    var url = 'https://imdb8.p.rapidapi.com/title/get-overview-details';
                    var options = {
                        headers: {
                            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                            'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                        },
                        params: {
                            'tconst': imdbId
                        }
                    };

                    var self = this;

                    axios.get(url, options)
                        .then(function(response) {
                            // Set the genres
                            var genres = [''];

                            if(response.data.genres) {
                                genres = response.data.genres;
                            }

                            self.currentMovie.genres = genres;

                            // Set the summary
                            var summary = '';

                            if(response.data.plotOutline) {
                                summary = response.data.plotOutline.text;
                            }

                            if(!summary && response.data.plotSummary) {
                                summary = response.data.plotSummary.text;
                            }

                            self.currentMovie.summary = summary;
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            },

            jumbotronChange(fileList) {
                this.currentMovie.jumbotron = fileList;
            },

            notesChange(notes) {
                this.currentMovie.notes = notes;
            },

            posterChange(fileList) {
                this.currentMovie.poster = fileList;
            },

            posterEmpty() {
                return !this.currentMovie.poster && !this.currentMovie.posterUrl;
            },

            posterUrlChange(url) {
                this.currentMovie.posterUrl = url;
            },

            submit() {
                var movie = this.currentMovie;

                // If both inputs are filled with data, default to posterUrl
                if(movie.posterUrl) {
                    delete movie.poster;
                }

                if(movie.poster) {
                    movie.poster = movie.poster.item(0);
                    delete movie.posterUrl;
                }

                if(!movie.jumbotron) {
                    delete movie.jumbotron;
                }

                if(movie.jumbotron) {
                    movie.jumbotron = movie.jumbotron.item(0);
                }

                var formData = window.getFormData(movie);

                var self = this;

                axios.post('/api/upload/movie', formData)
                    .then(function(response) {
                        self.driveEventDispatcher.$emit('movieSubmit', self.currentFilename);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            summaryChange(summary) {
                this.currentMovie.summary = summary;
            },

            summaryEmpty() {
                return this.currentMovie.summary === '';
            },

            titleChange(title) {
                this.currentMovie.title = title;

                // Update IMDb API search results
                if(title !== '') {
                    // Don't overload API with requests
                    clearTimeout(this.apiTimeout);

                    var self = this;

                    this.apiTimeout = setTimeout(function() {
                        var url = 'https://imdb8.p.rapidapi.com/title/auto-complete';
                        var options = {
                            headers: {
                                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                                'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                            },
                            params: {
                                'q': title
                            }
                        };

                        axios.get(url, options)
                            .then(function(response) {
                                self.currentMovie.imdb = response.data;
                                self.currentImdbSearchResult = null;
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }, 1000);
                }
            },

            titleEmpty() {
                return this.currentMovie.title === '';
            },

            valid() {
                return (
                    !this.titleEmpty()
                    && this.yearValid()
                    && !this.summaryEmpty()
                    && !this.posterEmpty()
                    && !this.genreEmpty()
                    && !this.genreDuplicates()
                    && !this.collectionDuplicates()
                    && !this.collectionEmpty()
                );
            },

            videoFileChange(filename) {
                this.currentFilename = filename;
            },

            yearReleasedChange(yearReleased) {
                this.currentMovie.yearReleased = parseInt(yearReleased);
            },

            yearValid() {
                return (
                    this.currentMovie.yearReleased <= this.yearMax
                    && this.currentMovie.yearReleased >= this.yearMin
                    && !isNaN(this.currentMovie.yearReleased)
                );
            },
        },
    }
</script>