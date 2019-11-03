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
                    :title="movies[currentFile].title"
                ></title-input>

                <year-input
                    :eventDispatcher="eventDispatcher"
                    :label="'Year Released'"
                    :search="true"
                    :title="movies[currentFile].title"
                    :year="movies[currentFile].yearReleased"
                ></year-input>

                <summary-input
                    :eventDispatcher="eventDispatcher"
                    :required="true"
                    :summary="movies[currentFile].summary"
                ></summary-input>

                <notes-input
                    :eventDispatcher="eventDispatcher"
                    :notes="movies[currentFile].notes"
                ></notes-input>

                <!--<poster-input
                    :eventDispatcher="eventDispatcher"
                    :poster="movies[currentFile].poster"
                    :title="movies[currentFile].title"
                ></poster-input>

                <jumbotron-input
                    :eventDispatcher="eventDispatcher"
                    :jumbotron="movies[currentFile].jumbotron"
                ></jumbotron-input>-->

                <multi-genre-input
                    :allGenres="genres"
                    :eventDispatcher="eventDispatcher"
                    :genres="movies[currentFile].genres"
                ></multi-genre-input>

                <multi-collection-input
                    :allCollections="collections"
                    :collections="movies[currentFile].collections"
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

        created() {
            // Register events
            this.eventDispatcher.$on('collectionsAdd', this.collectionsAdd);
            this.eventDispatcher.$on('collectionsChange', this.collectionsChange);
            this.eventDispatcher.$on('videoFileChange', this.videoFileChange);
            this.eventDispatcher.$on('genresAdd', this.genresAdd);
            this.eventDispatcher.$on('genresChange', this.genresChange);
            this.eventDispatcher.$on('jumbotronChange', this.jumbotronChange);
            this.eventDispatcher.$on('notesChange', this.notesChange);
            this.eventDispatcher.$on('posterChange', this.posterChange);
            this.eventDispatcher.$on('removeCollection', this.removeCollection);
            this.eventDispatcher.$on('removeGenre', this.removeGenre);
            this.eventDispatcher.$on('submit', this.submit);
            this.eventDispatcher.$on('summaryChange', this.summaryChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);
            this.eventDispatcher.$on('yearChange', this.yearChange);

            // Initialize movies array
            for(var i = 0; i < this.files.length; i++) {
                this.movies[this.files[i]] = {
                    collections: [''],
                    file: this.files[i],
                    genres: [''],
                    jumbotron: '',
                    notes: '',
                    poster: '',
                    summary: '',
                    title: this.getTitleFromFile(this.files[i]),
                    yearReleased: new Date().getFullYear(),
                };
            }
        },

        methods: {
            collectionsAdd() {
                this.movies[this.currentFile].collections.push('');
            },

            collectionsChange(data) {
                Vue.set(
                    this.movies[this.currentFile].collections,
                    data.index,
                    data.value
                );
            },

            genresAdd() {
                this.movies[this.currentFile].genres.push('');
            },

            genresChange(data) {
                Vue.set(
                    this.movies[this.currentFile].genres,
                    data.index,
                    data.value
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

            jumbotronChange(jumbotron) {
                Vue.set(
                    this.movies[this.currentFile],
                    'jumbotron',
                    jumbotron
                );
            },

            notesChange(notes) {
                Vue.set(
                    this.movies[this.currentFile],
                    'notes',
                    notes
                );
            },

            posterChange(poster) {
                Vue.set(
                    this.movies[this.currentFile],
                    'poster',
                    poster
                );
            },

            removeCollection(index) {
                var newCollections =
                    this.movies[this.currentFile]
                        .collections
                        .splice(index, 1);

                if(this.movies[this.currentFile].collections.length === 1 && index === 0) {
                    newCollections = [''];
                }

                Vue.set(
                    this.movies[this.currentFile],
                    'collections',
                    newCollections
                );
            },

            removeGenre(index) {
                var newGenres =
                    this.movies[this.currentFile]
                        .genres
                        .splice(index, 1);

                if(this.movies[this.currentFile].genres.length === 1 && index === 0) {
                    newGenres = [''];
                }

                Vue.set(
                    this.movies[this.currentFile],
                    'genres',
                    newGenres
                );
            },

            submit() {
                this.driveEventDispatcher.$emit('movieSubmit');
            },

            summaryChange(summary) {
                Vue.set(
                    this.movies[this.currentFile],
                    'summary',
                    summary
                );
            },

            titleChange(title) {
                Vue.set(
                    this.movies[this.currentFile],
                    'title',
                    title
                );
            },

            videoFileChange(file) {
                this.currentFile = file;
            },

            yearChange(yearReleased) {
                Vue.set(
                    this.movies[this.currentFile],
                    'yearReleased',
                    parseInt(yearReleased)
                );
            },
        },
    }
</script>

<style scoped>

</style>