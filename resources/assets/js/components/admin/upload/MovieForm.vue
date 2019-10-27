<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <file-input
                    v-bind:eventDispatcher="eventDispatcher"
                    v-bind:files="files"
                ></file-input>

                <title-input
                    v-bind:eventDispatcher="eventDispatcher"
                    v-bind:default="movies[currentFile].title"
                ></title-input>

                <year-input
                    v-bind:default="movies[currentFile].yearReleased"
                    v-bind:eventDispatcher="eventDispatcher"
                    v-bind:label="'Year Released'"
                ></year-input>

                <summary-input
                    v-bind:eventDispatcher="eventDispatcher"
                ></summary-input>

                <notes-input
                    v-bind:eventDispatcher="eventDispatcher"
                ></notes-input>

                <poster-input
                    v-bind:eventDispatcher="eventDispatcher"
                    v-bind:title="movies[currentFile].title"
                ></poster-input>

                <jumbotron-input></jumbotron-input>

                <genres-input
                    v-bind:allGenres="genres"
                    v-bind:eventDispatcher="eventDispatcher"
                ></genres-input>

                <collections-input
                    v-bind:allCollections="collections"
                    v-bind:eventDispatcher="eventDispatcher"
                ></collections-input>

                <submit-input
                    v-bind:eventDispatcher="eventDispatcher"
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
            this.eventDispatcher.$on('collectionsChange', this.collectionsChange);
            this.eventDispatcher.$on('fileChange', this.fileChange);
            this.eventDispatcher.$on('genresChange', this.genresChange);
            this.eventDispatcher.$on('notesChange', this.notesChange);
            this.eventDispatcher.$on('posterChange', this.posterChange);
            this.eventDispatcher.$on('submit', this.submit);
            this.eventDispatcher.$on('summaryChange', this.summaryChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);
            this.eventDispatcher.$on('yearChange', this.yearChange);

            // Initialize movies array
            for(var i = 0; i < this.files.length; i++) {
                this.movies[this.files[i]] = {
                    collections: [
                        {
                            name: '',
                        },
                    ],
                    file: this.files[i],
                    genres: [
                        {
                            name: '',
                        },
                    ],
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
            collectionsChange(collections) {
                this.movies[this.currentFile].collections = collections;
            },

            fileChange(file) {
                this.currentFile = file;
            },

            genresChange(genres) {
                this.movies[this.currentFile].genres = genres;
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

            notesChange(notes) {
                this.movies[this.currentFile].notes = notes;
            },

            posterChange(poster) {
                this.movies[this.currentFile].poster = poster;
            },

            submit() {
                this.driveEventDispatcher.$emit('movieSubmit');
            },

            summaryChange(summary) {
                this.movies[this.currentFile].summary = summary;
            },

            titleChange(title) {
                this.movies[this.currentFile].title = title;
            },

            yearChange(year) {
                this.movies[this.currentFile].yearReleased = parseInt(year);
            },
        },
    }
</script>

<style scoped>

</style>