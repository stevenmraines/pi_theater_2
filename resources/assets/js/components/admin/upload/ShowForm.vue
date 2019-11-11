<template>
    <div class="row" v-if="drive > 0">
        <div class="col">
            <form novalidate>
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
                    :title="show.title"
                    :value="show.poster"
                ></poster-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="posterEmpty()">
                    <strong>Error: </strong>The Poster Image field is required
                </div>

                <!-- Jumbotron Image -->
                <jumbotron-input
                    :eventDispatcher="eventDispatcher"
                    :value="show.jumbotron"
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
                eventDispatcher: new Vue({}),
                show: {
                    collections: [''],
                    genres: [''],
                    jumbotron: null,
                    notes: '',
                    poster: null,
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
            this.eventDispatcher.$on('jumbotronChange', this.jumbotronChange);
            this.eventDispatcher.$on('notesChange', this.notesChange);
            this.eventDispatcher.$on('posterChange', this.posterChange);
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
                return !this.show.poster;
            },

            startGreaterThanEnd() {
                return this.show.yearStart > this.show.yearEnd;
            },

            summaryChange(summary) {
                this.show.summary = summary;
            },

            summaryEmpty() {
                return this.show.summary === '';
            },

            titleChange(title) {
                this.show.title = title;
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
                );
            },

            yearEndChange(yearEnd) {
                this.show.yearEnd = parseInt(yearEnd);
            },

            yearStartChange(yearStart) {
                this.show.yearStart = parseInt(yearStart);
            },

            yearEndValid() {
                return this.yearValid(this.show.yearEnd);
            },

            yearStartValid() {
                return this.yearValid(this.show.yearStart);
            },

            yearValid(year) {
                return (
                    year <= this.yearMax
                    && year >= this.yearMin
                    && !isNaN(year)
                );
            },
        },
    }
</script>