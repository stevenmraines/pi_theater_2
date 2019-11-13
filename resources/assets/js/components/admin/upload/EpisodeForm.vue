<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form id="episode-form" method="POST" enctype="multipart/form-data" novalidate>
                <!-- File -->
                <video-file-input
                    :eventDispatcher="eventDispatcher"
                    :files="files"
                    :value="currentFile"
                ></video-file-input>

                <!-- Show -->
                <shows-input
                    :eventDispatcher="eventDispatcher"
                    :shows="shows"
                    :value="episodes[currentFileEscaped].media_id"
                ></shows-input>

                <!-- Season -->
                <season-input
                    :eventDispatcher="eventDispatcher"
                    :value="episodes[currentFileEscaped].season"
                ></season-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="!seasonValid()">
                    <strong>Error: </strong>The Season field is not valid
                </div>

                <!-- Episode Number -->
                <episode-number-input
                    :eventDispatcher="eventDispatcher"
                    :value="episodes[currentFileEscaped].episodeNumber"
                ></episode-number-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="!episodeNumberValid()">
                    <strong>Error: </strong>The Episode Number field is not valid
                </div>

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
            this.eventDispatcher.$on('episodeNumberChange', this.episodeNumberChange);
            this.eventDispatcher.$on('seasonChange', this.seasonChange);
            this.eventDispatcher.$on('showChange', this.showChange);
            this.eventDispatcher.$on('submit', this.submit);
            this.eventDispatcher.$on('summaryChange', this.summaryChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);
            this.eventDispatcher.$on('videoFileChange', this.videoFileChange);

            // Initialize movies array
            for(var i = 0; i < this.files.length; i++) {
                var objectDefaults = {
                    episodeNumber: this.getEpisodeNumberFromFile(this.files[i]),
                    file: this.files[i],
                    season: this.getSeasonFromFile(this.files[i]),
                    media_id: this.getShowFromFile(this.files[i]),
                    summary: '',
                    title: '',
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
            episodeNumberChange(episodeNumber) {
                Vue.set(
                    this.episodes[this.currentFileEscaped],
                    'episodeNumber',
                    parseInt(episodeNumber)
                );
            },

            episodeNumberValid() {
                return this.numberValid(this.episodes[this.currentFileEscaped].episodeNumber);
            },

            escapeFile(file) {
                return file.replace('.', '');
            },

            getEpisodeNumberFromFile(file) {
                return parseInt(file.replace(/.+_s\d{2}-e([0-9]{2}).+/, '$1'));
            },

            getSeasonFromFile(file) {
                return parseInt(file.replace(/.+_s(\d{2})-e.+/, '$1'));
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

            numberValid(number) {
                return number > 0 && !isNaN(number);
            },

            seasonChange(season) {
                Vue.set(
                    this.episodes[this.currentFileEscaped],
                    'season',
                    parseInt(season)
                );
            },

            seasonValid() {
                return this.numberValid(this.episodes[this.currentFileEscaped].season);
            },

            showChange(show) {
                Vue.set(
                    this.episodes[this.currentFileEscaped],
                    'media_id',
                    show
                );
            },

            submit() {
                this.driveEventDispatcher.$emit(
                    'episodeSubmit',
                    this.episodes[this.currentFileEscaped]
                );
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
                return (
                    !this.titleEmpty()
                    && this.seasonValid()
                    && this.episodeNumberValid()
                );
            },

            videoFileChange(file) {
                this.currentFile = file;
            },
        },
    }
</script>