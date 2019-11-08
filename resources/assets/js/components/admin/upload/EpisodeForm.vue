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

                <shows-input
                    :eventDispatcher="eventDispatcher"
                    :shows="shows"
                    :value="episodes[currentFileEscaped].show"
                ></shows-input>

<!--                <season-input></season-input>-->

<!--                <episode-number-input></episode-number-input>-->

                <!-- Title -->
                <title-input
                    :eventDispatcher="eventDispatcher"
                    :value="episodes[currentFileEscaped].title"
                ></title-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="titleEmpty()">
                    <strong>Error: </strong>The Title field is required
                </div>

                <!-- Summary -->
                <summary-input
                    :eventDispatcher="eventDispatcher"
                    :required="false"
                ></summary-input>

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
    // TODO abstract EpisodeForm and MovieForm into generic component
    export default {
        props: [
            'drive',
            'driveEventDispatcher',
            'files',
            'shows',
        ],

        data() {
            return {
                currentFile: this.files[0],
                eventDispatcher: new Vue({}),
                episodes: {},
                yearMax: new Date().getFullYear(),
                yearMin: 1900,
            };
        },

        computed: {
            currentFileEscaped() {
                return this.escapeFile(this.currentFile);
            },

            submitDisabled() {
                return !this.valid();
            },
        },

        created() {
            // Register events
            this.eventDispatcher.$on('submit', this.submit);
            this.eventDispatcher.$on('showChange', this.showChange);
            this.eventDispatcher.$on('summaryChange', this.summaryChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);
            this.eventDispatcher.$on('videoFileChange', this.videoFileChange);
            // this.eventDispatcher.$on('yearChange', this.yearChange);

            // Initialize movies array
            for(var i = 0; i < this.files.length; i++) {
                var objectDefaults = {
                    file: this.files[i],
                    show: this.getShowFromFile(this.files[i]),
                    season: 1,
                    episodeNumber: 1,
                    summary: '',
                    title: '',
                    yearStart: this.yearMax,
                    yearEnd: this.yearMax,
                };

                // Use set function to maintain reactivity
                Vue.set(
                    this.episodes,
                    this.escapeFile(this.files[i]),
                    objectDefaults
                );
            }
        },

        methods: {
            escapeFile(file) {
                return file.replace('.', '');
            },

            getEpisodeNumberFromFile(file) {

            },

            getSeasonFromFile(file) {

            },

            getShowFromFile(file) {
                var fileShow = file.replace(/(.+)_(.+)/, '$1').replace(/-/g, ' ');

                for(var i = 0; i < this.shows.length; i++) {
                    // TODO strip out things like - : ' from show title
                    if(fileShow.toLowerCase().localeCompare(this.shows[i].title.toLowerCase()) === 0) {
                        return this.shows[i].id;
                    }
                }

                return this.shows[0].id;
            },

            showChange(show) {
                Vue.set(
                    this.episodes[this.currentFileEscaped],
                    'show',
                    show
                );
            },

            submit() {
                this.driveEventDispatcher.$emit('episodeSubmit');
            },

            summaryChange(summary) {
                Vue.set(
                    this.episodes[this.currentFileEscaped],
                    'summary',
                    summary
                );
            },

            titleChange(title) {
                Vue.set(
                    this.episodes[this.currentFileEscaped],
                    'title',
                    title
                );
            },

            titleEmpty() {
                return this.episodes[this.currentFileEscaped].title === '';
            },

            valid() {
                return !this.titleEmpty();
            },

            videoFileChange(file) {
                this.currentFile = file;
            },
        },
    }
</script>