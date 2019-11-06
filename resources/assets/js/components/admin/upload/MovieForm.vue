<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <video-file-input
                    :currentFile="currentFile"
                    :eventDispatcher="eventDispatcher"
                    :files="files"
                ></video-file-input>

                <title-input
                    :eventDispatcher="eventDispatcher"
                    :title="movies[currentFileEscaped].title"
                ></title-input>

                <year-input
                    :eventDispatcher="eventDispatcher"
                    :label="'Year Released'"
                    :search="true"
                    :title="movies[currentFileEscaped].title"
                    :year="movies[currentFileEscaped].yearReleased"
                ></year-input>

                <summary-input
                    :eventDispatcher="eventDispatcher"
                    :required="true"
                    :summary="movies[currentFileEscaped].summary"
                ></summary-input>

                <notes-input
                    :eventDispatcher="eventDispatcher"
                    :notes="movies[currentFileEscaped].notes"
                ></notes-input>

                <poster-input
                    :eventDispatcher="eventDispatcher"
                    :title="movies[currentFileEscaped].title"
                    :value="movies[currentFileEscaped].poster"
                ></poster-input>

                <jumbotron-input
                    :eventDispatcher="eventDispatcher"
                    :value="movies[currentFileEscaped].jumbotron"
                ></jumbotron-input>

                <multi-genre-input
                    :allGenres="genres"
                    :eventDispatcher="eventDispatcher"
                    :genres="movies[currentFileEscaped].genres"
                ></multi-genre-input>

                <multi-collection-input
                    :allCollections="collections"
                    :collections="movies[currentFileEscaped].collections"
                    :eventDispatcher="eventDispatcher"
                ></multi-collection-input>

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

            collectionRemove(index) {
                var newCollections = [''];

                if(this.movies[this.currentFileEscaped].collections.length > 1) {
                    newCollections =
                        this.movies[this.currentFileEscaped]
                            .collections
                            .splice(index, 1);
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
                    newGenres =
                        this.movies[this.currentFileEscaped]
                            .genres
                            .splice(index, 1);
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

            titleChange(title) {
                Vue.set(
                    this.movies[this.currentFileEscaped],
                    'title',
                    title
                );
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
        },
    }
</script>

<style scoped>

</style>