<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <file-input
                    :eventDispatcher="eventDispatcher"
                    :files="files"
                ></file-input>

                <title-input
                    :eventDispatcher="eventDispatcher"
                    :title="movies[currentFile].title"
                ></title-input>

                <year-input
                    :eventDispatcher="eventDispatcher"
                    :label="'Year Released'"
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

                <poster-input
                    :eventDispatcher="eventDispatcher"
                ></poster-input>

                <jumbotron-input></jumbotron-input>

                <genres-input
                    :allGenres="genres"
                    :eventDispatcher="eventDispatcher"
                    :genres="movies[currentFile].genres"
                ></genres-input>

                <collections-input
                    :allCollections="collections"
                    :collections="movies[currentFile].collections"
                    :eventDispatcher="eventDispatcher"
                ></collections-input>

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
            this.eventDispatcher.$on('collectionsSet', this.collectionsSet);
            this.eventDispatcher.$on('fileChange', this.fileChange);
            this.eventDispatcher.$on('genresAdd', this.genresAdd);
            this.eventDispatcher.$on('genresChange', this.genresChange);
            this.eventDispatcher.$on('genresSet', this.genresSet);
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
            collectionsAdd() {
                this.movies[this.currentFile].collections.push(
                    {
                        name: ''
                    }
                );
            },

            collectionsChange(collections) {
                this.movies[this.currentFile].collections = collections;
            },

            collectionsSet(data) {
                Vue.set(
                    this.movies[this.currentFile].collections,
                    data.index,
                    data.collection
                );
            },

            fileChange(file) {
                this.currentFile = file;
            },

            genresAdd() {
                this.movies[this.currentFile].genres.push(
                    {
                        name: ''
                    }
                );
            },

            genresChange(genres) {
                this.movies[this.currentFile].genres = genres;
            },

            genresSet(data) {
                Vue.set(
                    this.movies[this.currentFile].genres,
                    data.index,
                    data.genre
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