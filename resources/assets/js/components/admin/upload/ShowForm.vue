<template>
    <div class="row">
        <div class="col">
            <form id="show-form" method="POST" enctype="multipart/form-data" novalidate>
                <!-- IMDb Search Results -->
                <imdb-search-input
                    :eventDispatcher="eventDispatcher"
                    :results="show.imdb"
                    :value="currentImdbSearchResult"
                ></imdb-search-input>

                <!-- Title -->
                <title-input
                    :eventDispatcher="eventDispatcher"
                    :value="show.title"
                ></title-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="titleEmpty()">
                    <strong>Error: </strong>The Title field is required
                </div>

                <!-- Year Start -->
                <year-start-input
                    :eventDispatcher="eventDispatcher"
                    :title="show.title"
                    :value="show.yearStart"
                ></year-start-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="!yearStartValid()">
                    <strong>Error: </strong>The Year Start field is not valid
                </div>

                <div class="alert alert-warning mb-2" role="alert" v-if="startGreaterThanEnd()">
                    <strong>Warning: </strong>The Year Start field should be less than the Year End
                </div>

                <!-- Year End -->
                <year-end-input
                    :eventDispatcher="eventDispatcher"
                    :value="show.yearEnd"
                ></year-end-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="!yearEndValid()">
                    <strong>Error: </strong>The Year End field is not valid
                </div>

                <summary-input
                    :eventDispatcher="eventDispatcher"
                    :required="true"
                    :value="show.summary"
                ></summary-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="summaryEmpty()">
                    <strong>Error: </strong>The Summary field is required
                </div>

                <notes-input
                    :eventDispatcher="eventDispatcher"
                    :value="show.notes"
                ></notes-input>

                <!-- Poster Image -->
                <poster-input
                    :eventDispatcher="eventDispatcher"
                    :file="show.poster"
                    :title="show.title"
                    :url="show.posterUrl"
                ></poster-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="posterEmpty()">
                    <strong>Error: </strong>The Poster Image field is required
                </div>

                <!-- Jumbotron Image -->
                <jumbotron-input
                    :eventDispatcher="eventDispatcher"
                    :file="show.jumbotron"
                ></jumbotron-input>

                <!-- Genres -->
                <multi-genre-input
                    :allGenres="genres"
                    :eventDispatcher="eventDispatcher"
                    :value="show.genres"
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
                    :value="show.collections"
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
            'genres',
        ],

        data() {
            return {
                apiTimeout: null,
                currentImdbSearchResult: null,
                eventDispatcher: new Vue({}),
                show: {
                    collections: [''],
                    genres: [''],
                    imdb: {
                        d: []
                    },
                    jumbotron: null,
                    notes: '',
                    poster: null,
                    posterUrl: '',
                    summary: '',
                    title: '',
                    yearStart: 0,
                    yearEnd: 0,
                },
                yearMax: new Date().getFullYear(),
                yearMin: 1900,
            };
        },

        computed: {
            submitDisabled() {
                return !this.valid();
            },
        },

        created() {
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
            this.eventDispatcher.$on('yearEndChange', this.yearEndChange);
            this.eventDispatcher.$on('yearStartChange', this.yearStartChange);

            this.show.yearEnd = this.yearMax;
            this.show.yearStart = this.yearMax;
        },

        methods: {
            collectionAdd() {
                this.show.collections.push('');
            },

            collectionChange(data) {
                Vue.set(
                    this.show.collections,
                    data.index,
                    data.value
                );
            },

            collectionDuplicates() {
                var previousCollections = [];

                for(var i = 0; i < this.show.collections.length; i++) {
                    var currentCollection = this.show.collections[i];

                    if(previousCollections.indexOf(currentCollection) >= 0) {
                        return true;
                    }

                    previousCollections.push(currentCollection);
                }

                return false;
            },

            collectionEmpty() {
                if(this.show.collections.length > 1) {
                    for(var i = 0; i < this.show.collections.length; i++) {
                        if(this.show.collections[i] === '') {
                            return true;
                        }
                    }
                }

                return false;
            },

            collectionRemove(index) {
                var newCollections = [''];

                if(this.show.collections.length > 1) {
                    this.show
                        .collections
                        .splice(index, 1);

                    newCollections = this.show.collections;
                }

                Vue.set(
                    this.show,
                    'collections',
                    newCollections
                );
            },

            genreAdd() {
                this.show.genres.push('');
            },

            genreChange(data) {
                Vue.set(
                    this.show.genres,
                    data.index,
                    data.value
                );
            },

            genreDuplicates() {
                var previousGenres = [];

                for(var i = 0; i < this.show.genres.length; i++) {
                    var currentGenre = this.show.genres[i];

                    if(previousGenres.indexOf(currentGenre) >= 0) {
                        return true;
                    }

                    previousGenres.push(currentGenre);
                }

                return false;
            },

            genreEmpty() {
                for(var i = 0; i < this.show.genres.length; i++) {
                    if(this.show.genres[i] === '') {
                        return true;
                    }
                }

                return false;
            },

            genreRemove(index) {
                var newGenres = [''];

                if(this.show.genres.length > 1) {
                    this.show
                        .genres
                        .splice(index, 1);

                    newGenres = this.show.genres;
                }

                Vue.set(
                    this.show,
                    'genres',
                    newGenres
                );
            },

            imdbSearchChange(imdbId) {
                this.currentImdbSearchResult = imdbId;
                var index = _.findIndex(this.show.imdb.d, { id: imdbId });

                if(index >= 0) {
                    this.show.poster = null;
                    var imdb = this.show.imdb.d[index];
                    this.show.title = imdb.l;
                    this.show.yearStart = imdb.y;
                    
                    if(imdb.yr) {
                        this.show.yearEnd = parseInt(imdb.yr.split('-')[1]);
                    }

                    if(imdb.i) {
                        this.show.posterUrl = imdb.i.imageUrl;
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

                            self.show.genres = genres;

                            // Set the summary
                            var summary = '';

                            if(response.data.plotOutline) {
                                summary = response.data.plotOutline.text;
                            }

                            if(!summary && response.data.plotSummary) {
                                summary = response.data.plotSummary.text;
                            }

                            self.show.summary = summary;
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            },

            jumbotronChange(fileList) {
                this.show.jumbotron = fileList;
            },

            notesChange(notes) {
                this.show.notes = notes;
            },

            posterChange(filelist) {
                this.show.poster = filelist;
            },

            posterEmpty() {
                return !this.show.poster && !this.show.posterUrl;
            },

            posterUrlChange(url) {
                this.show.posterUrl = url;
            },

            reset() {
                this.show.collections = [''];
                this.show.genres = [''];
                this.show.imdb = {
                    d: []
                };
                this.show.jumbotron = null;
                this.show.notes = '';
                this.show.poster = null;
                this.show.posterUrl = '';
                this.show.summary = '';
                this.show.title = '';
                this.show.yearStart = this.yearMax;
                this.show.yearEnd = this.yearMax;
            },

            startGreaterThanEnd() {
                return this.show.yearStart > this.show.yearEnd && this.show.yearEnd > 0;
            },

            submit() {
                var show = this.show;

                // If both inputs are filled with data, default to posterUrl
                if(show.posterUrl) {
                    delete show.poster;
                }

                if(show.poster) {
                    show.poster = show.poster.item(0);
                    delete show.posterUrl;
                }

                if(!show.jumbotron) {
                    delete show.jumbotron;
                }

                if(show.jumbotron) {
                    show.jumbotron = show.jumbotron.item(0);
                }

                var formData = window.getFormData(show);

                var self = this;

                axios.post('/api/upload/show', formData)
                    .then(function(response) {
                        self.reset();
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            summaryChange(summary) {
                this.show.summary = summary;
            },

            summaryEmpty() {
                return this.show.summary === '';
            },

            titleChange(title) {
                this.show.title = title;

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
                                self.show.imdb = response.data;
                                self.currentImdbSearchResult = null;
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }, 1000);
                }
            },

            titleEmpty() {
                return this.show.title === '';
            },

            valid() {
                return (
                    !this.startGreaterThanEnd()
                    && !this.titleEmpty()
                    && this.yearEndValid()
                    && this.yearStartValid()
                    && !this.summaryEmpty()
                    && !this.posterEmpty()
                    && !this.genreEmpty()
                    && !this.genreDuplicates()
                    && !this.collectionDuplicates()
                    && !this.collectionEmpty()
                );
            },

            yearEndChange(yearEnd) {
                this.show.yearEnd = parseInt(yearEnd);
            },

            yearStartChange(yearStart) {
                this.show.yearStart = parseInt(yearStart);
            },

            yearEndValid() {
                return (
                    this.show.yearEnd <= this.yearMax
                    && (this.show.yearEnd >= this.yearMin || this.show.yearEnd == 0)
                    && !isNaN(this.show.yearEnd)
                );
            },

            yearStartValid() {
                return (
                    this.show.yearStart <= this.yearMax
                    && this.show.yearStart >= this.yearMin
                    && !isNaN(this.show.yearStart)
                );
            },
        },
    }
</script>