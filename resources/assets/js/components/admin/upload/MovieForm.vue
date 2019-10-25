<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form novalidate>
                <file-input
                    v-bind:files="files"
                    v-bind:eventDispatcher="eventDispatcher"
                ></file-input>

                <movie-title-input
                    v-bind:file="currentFile"
                    v-bind:eventDispatcher="eventDispatcher"
                ></movie-title-input>

                <year-released-input></year-released-input>

                <summary-input></summary-input>

                <notes-input></notes-input>

                <poster-input></poster-input>

                <jumbotron-input></jumbotron-input>

                <genres-input
                    v-bind:allGenres="genres"
                ></genres-input>

                <collections-input
                    v-bind:allCollections="collections"
                ></collections-input>

                <div class="form-group d-flex justify-content-around mt-3 mb-0">
                    <button class="btn btn-success" v-if="true" v-on:click="submit">
                        Submit
                    </button>
                </div>
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
                movies: [],
            };
        },

        created() {
            // Register events
            this.eventDispatcher.$on('fileChange', this.fileChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);

            // Initialize movies array
            for(var i = 0; i < this.files.length; i++) {
                this.movies[this.files[i]] = {
                    collections: [],
                    file: this.files[i],
                    genres: [],
                    jumbotron: '',
                    notes: '',
                    poster: '',
                    summary: '',
                    title: '',
                    yearReleased: 0,
                };
            }
        },

        methods: {
            fileChange(file) {
                this.currentFile = file;
            },

            submit() {
                driveEventDispatcher.$emit('movieSubmit');
            },

            titleChange(title) {
                this.movies[this.currentFile].title = title;
            },
        },
    }
</script>

<style scoped>

</style>