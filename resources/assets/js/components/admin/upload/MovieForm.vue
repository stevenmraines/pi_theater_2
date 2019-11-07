<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <!-- File -->
                <video-file-input
                    :currentFile="currentFile"
                    :eventDispatcher="eventDispatcher"
                    :files="files"
                ></video-file-input>

                <!-- Title -->
                <title-input
                    :eventDispatcher="eventDispatcher"
                    :title="movies[currentFileEscaped].title"
                ></title-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="titleEmpty()">
                    <strong>Error: </strong>The Title is required
                </div>

                <!-- Year Released -->
                <year-input
                    :eventDispatcher="eventDispatcher"
                    :label="'Year Released'"
                    :min="yearMin"
                    :max="yearMax"
                    :search="true"
                    :title="movies[currentFileEscaped].title"
                    :year="movies[currentFileEscaped].yearReleased"
                ></year-input>

                <!-- TODO figure out how to get empty / required warning -->
                <div class="alert alert-danger mb-2" role="alert" v-if="!yearValid()">
                    <strong>Error: </strong>The Year Released is not valid
                </div>

                <!-- Summary -->
                <summary-input
                    :eventDispatcher="eventDispatcher"
                    :required="true"
                    :summary="movies[currentFileEscaped].summary"
                ></summary-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="summaryEmpty()">
                    <strong>Error: </strong>The Summary is required
                </div>

                <!-- Notes -->
                <notes-input
                    :eventDispatcher="eventDispatcher"
                    :notes="movies[currentFileEscaped].notes"
                ></notes-input>

                <!-- Poster -->
                <poster-input
                    :eventDispatcher="eventDispatcher"
                    :title="movies[currentFileEscaped].title"
                    :value="movies[currentFileEscaped].poster"
                ></poster-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="posterEmpty()">
                    <strong>Error: </strong>The Poster Image is required
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
                    :genres="movies[currentFileEscaped].genres"
                ></multi-genre-input>

                <!-- Collections -->
                <multi-collection-input
                    :allCollections="collections"
                    :collections="movies[currentFileEscaped].collections"
                    :eventDispatcher="eventDispatcher"
                ></multi-collection-input>

                <!-- Submit -->
                <submit-input
                    :eventDispatcher="eventDispatcher"
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
            this.eventDispatcher.$on('yearChange', this.yearChange);

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
                    yearReleased: this.yearMax,
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

            videoFileChange(file) {
                this.currentFile = file;
            },

            yearChange(yearReleased) {
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