<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <!-- File -->
                <video-file-input
                    :eventDispatcher="eventDispatcher"
                    :files="files"
                    :value="currentFile"
                ></video-file-input>

                <!-- Title -->
                <title-input
                    :eventDispatcher="eventDispatcher"
                    :value="movies[currentFileEscaped].title"
                ></title-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="titleEmpty()">
                    <strong>Error: </strong>The Title field is required
                </div>

                <!-- Year Released -->
                <year-released-input
                    :eventDispatcher="eventDispatcher"
                    :title="movies[currentFileEscaped].title"
                    :value="movies[currentFileEscaped].yearReleased"
                ></year-released-input>

                <!-- TODO figure out how to get empty / required warning -->
                <div class="alert alert-danger mb-2" role="alert" v-if="!yearValid()">
                    <strong>Error: </strong>The Year Released field is not valid
                </div>

                <!-- Summary -->
                <summary-input
                    :eventDispatcher="eventDispatcher"
                    :required="true"
                    :value="movies[currentFileEscaped].summary"
                ></summary-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="summaryEmpty()">
                    <strong>Error: </strong>The Summary field is required
                </div>

                <!-- Notes -->
                <notes-input
                    :eventDispatcher="eventDispatcher"
                    :value="movies[currentFileEscaped].notes"
                ></notes-input>

                <!-- Poster -->
                <poster-input
                    :eventDispatcher="eventDispatcher"
                    :title="movies[currentFileEscaped].title"
                    :value="movies[currentFileEscaped].poster"
                ></poster-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="posterEmpty()">
                    <strong>Error: </strong>The Poster Image field is required
                </div>

                <!-- Jumbotron -->
                <jumbotron-input
                    :eventDispatcher="eventDispatcher"
                    :value="movies[currentFileEscaped].jumbotron"
                ></jumbotron-input>

                <!-- Genres -->
                <multi-genre-input
                    :allGenres="genres"
                    :eventDispatcher="eventDispatcher"
                    :value="movies[currentFileEscaped].genres"
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
                    :value="movies[currentFileEscaped].collections"
                ></multi-collection-input>

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
            'genres',
        ],

        data() {
            return {
                currentFile: this.files[0],
                eventDispatcher: new Vue({}),
                movies: {},
                yearMax: new Date().getFullYear(),
                yearMin: 1900,
            };
        },

        computed: {
            // TODO find a better way to index the files in the movie object
            currentFileEscaped() {
                return this.escapeFile(this.currentFile);
            },

            submitDisabled() {
                return !this.valid();
            },
        },

        created() {
            // Register events
            this.eventDispatcher.$on('collectionAdd', this.collectionAdd);
            this.eventDispatcher.$on('collectionChange', this.collectionChange);
            this.eventDispatcher.$on('collectionRemove', this.collectionRemove);
            this.eventDispatcher.$on('genreAdd', this.genreAdd);
            this.eventDispatcher.$on('genreChange', this.genreChange);
            this.eventDispatcher.$on('genreRemove', this.genreRemove);
            this.eventDispatcher.$on('jumbotronChange', this.jumbotronChange);
            this.eventDispatcher.$on('notesChange', this.notesChange);
            this.eventDispatcher.$on('posterChange', this.posterChange);
            this.eventDispatcher.$on('submit', this.submit);
            this.eventDispatcher.$on('summaryChange', this.summaryChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);
            this.eventDispatcher.$on('videoFileChange', this.videoFileChange);
            this.eventDispatcher.$on('yearReleasedChange', this.yearReleasedChange);

            // Initialize movies array
            for(var i = 0; i < this.files.length; i++) {
                var objectDefaults = {
                    collections: [''],
                    file: this.files[i],
                    genres: [''],
                    jumbotron: null,
                    notes: '',
                    poster: null,
                    summary: '',
                    title: this.getTitleFromFile(this.files[i]),
                    yearReleased: new Date().getFullYear(),
                };

                // Use set function to maintain reactivity
                Vue.set(
                    this.movies,
                    this.escapeFile(this.files[i]),
                    objectDefaults
                );
            }
        },

        methods: {
            collectionAdd() {
                this.movies[this.currentFileEscaped].collections.push('');
            },

            collectionChange(data) {
                Vue.set(
                    this.movies[this.currentFileEscaped].collections,
                    data.index,
                    data.value
                );
            },

            collectionDuplicates() {
                var previousCollections = [];

                for(var i = 0; i < this.movies[this.currentFileEscaped].collections.length; i++) {
                    var currentCollection = this.movies[this.currentFileEscaped].collections[i];

                    if(previousCollections.indexOf(currentCollection) >= 0) {
                        return true;
                    }

                    previousCollections.push(currentCollection);
                }

                return false;
            },

            collectionRemove(index) {
                var newCollections = [''];

                if(this.movies[this.currentFileEscaped].collections.length > 1) {
                    this.movies[this.currentFileEscaped]
                        .collections
                        .splice(index, 1);

                    newCollections = this.movies[this.currentFileEscaped].collections;
                }

                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'collections',
                    newCollections
                );
            },

            escapeFile(file) {
                return file.replace('.', '');
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
                this.movies[this.currentFileEscaped].genres.push('');
            },

            genreChange(data) {
                Vue.set(
                    this.movies[this.currentFileEscaped].genres,
                    data.index,
                    data.value
                );
            },

            genreDuplicates() {
                var previousGenres = [];

                for(var i = 0; i < this.movies[this.currentFileEscaped].genres.length; i++) {
                    var currentGenre = this.movies[this.currentFileEscaped].genres[i];

                    if(previousGenres.indexOf(currentGenre) >= 0) {
                        return true;
                    }

                    previousGenres.push(currentGenre);
                }

                return false;
            },

            genreEmpty() {
                for(var i = 0; i < this.movies[this.currentFileEscaped].genres.length; i++) {
                    if(this.movies[this.currentFileEscaped].genres[i] === '') {
                        return true;
                    }
                }

                return false;
            },

            genreRemove(index) {
                var newGenres = [''];

                if(this.movies[this.currentFileEscaped].genres.length > 1) {
                    this.movies[this.currentFileEscaped]
                        .genres
                        .splice(index, 1);

                    newGenres = this.movies[this.currentFileEscaped].genres;
                }

                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'genres',
                    newGenres
                );
            },

            getTitleFromFile(file) {
                var filename = file.substr(0, file.length - 4);

                var tokens = filename.split('-');

                var exceptions = ['a', 'an', 'for', 'in', 'of', 'on', 'the'];

                for(var i = 0; i < tokens.length; i++) {
                    if(exceptions.indexOf(tokens[i].toLowerCase()) === -1) {
                        tokens[i] = tokens[i].substr(0, 1).toUpperCase() + tokens[i].substr(1);
                    }
                }

                return tokens.join(' ');
            },

            jumbotronChange(fileList) {
                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'jumbotron',
                    // this.fileListToArray(fileList)
                    fileList
                );
            },

            notesChange(notes) {
                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'notes',
                    notes
                );
            },

            posterChange(fileList) {
                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'poster',
                    // this.fileListToArray(fileList)
                    fileList
                );
            },

            posterEmpty() {
                return !this.movies[this.currentFileEscaped].poster;
            },

            submit() {
                this.driveEventDispatcher.$emit('movieSubmit');
            },

            summaryChange(summary) {
                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'summary',
                    summary
                );
            },

            summaryEmpty() {
                return this.movies[this.currentFileEscaped].summary === '';
            },

            titleChange(title) {
                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'title',
                    title
                );
            },

            titleEmpty() {
                return this.movies[this.currentFileEscaped].title === '';
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
                );
            },

            videoFileChange(file) {
                this.currentFile = file;
            },

            yearReleasedChange(yearReleased) {
                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'yearReleased',
                    parseInt(yearReleased)
                );
            },

            yearValid() {
                return (
                    this.movies[this.currentFileEscaped].yearReleased <= this.yearMax
                    && this.movies[this.currentFileEscaped].yearReleased >= this.yearMin
                    && !isNaN(this.movies[this.currentFileEscaped].yearReleased)
                );
            },
        },
    }
</script>