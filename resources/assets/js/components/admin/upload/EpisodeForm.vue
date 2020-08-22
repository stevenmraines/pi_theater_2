<template>
    <div class="row" v-if="drive > 0 && files.length > 0">
        <div class="col">
            <form id="episode-form" method="POST" enctype="multipart/form-data" novalidate>
                <!-- File -->
                <video-file-input
                    :eventDispatcher="eventDispatcher"
                    :files="files"
                    :value="currentFilename"
                ></video-file-input>

                <!-- Show -->
                <shows-input
                    :eventDispatcher="eventDispatcher"
                    :shows="shows"
                    :value="currentShowId"
                ></shows-input>

                <!-- IMDb Search Results -->
                <imdb-search-input
                    :eventDispatcher="eventDispatcher"
                    :results="currentShow.imdb"
                    :value="currentImdbSearchResult"
                ></imdb-search-input>

                <!-- Season -->
                <season-input
                    :eventDispatcher="eventDispatcher"
                    :value="currentEpisode.season"
                ></season-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="!seasonValid()">
                    <strong>Error: </strong>The Season field is not valid
                </div>

                <!-- Episode Number -->
                <episode-number-input
                    :eventDispatcher="eventDispatcher"
                    :value="currentEpisode.episodeNumber"
                ></episode-number-input>

                <div class="alert alert-danger mb-2" role="alert" v-if="!episodeNumberValid()">
                    <strong>Error: </strong>The Episode Number field is not valid
                </div>

                <!-- Title -->
                <title-input
                    :eventDispatcher="eventDispatcher"
                    :search="false"
                    :value="currentEpisode.title"
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
    export default {
        props: [
            'drive',
            'driveEventDispatcher',
            'files',
            'shows',
        ],

        data() {
            return {
                currentFilename: this.files[0] ? this.files[0].filename : '',
                currentImdbSearchResult: null,
                currentShowId: this.shows[0].id,
                episodes: [],
                eventDispatcher: new Vue({})
            };
        },

        computed: {
            currentEpisode() {
                var index = _.findIndex(this.episodes, { 'file': this.currentFilename });

                if(index < 0) {
                    return {};
                }

                return this.episodes[index];
            },

            currentFile() {
                var index = _.findIndex(this.files, { 'filename': this.currentFilename });

                if(index < 0) {
                    return {};
                }

                return this.files[index];
            },

            currentShow() {
                var index = _.findIndex(this.shows, { 'id': this.currentShowId });

                if(index < 0) {
                    return {};
                }

                return this.shows[index];
            },

            submitDisabled() {
                return !this.valid();
            },
        },

        watch: {
            files() {
                // Hack to fix issue of fields not updating when DriveForm deletes the submitted episode
                if(this.files[0]) {
                    this.videoFileChange(this.files[0].filename);
                }
            }
        },

        created() {
            // Register events
            this.eventDispatcher.$on('episodeNumberChange', this.episodeNumberChange);
            this.eventDispatcher.$on('imdbSearchChange', this.imdbSearchChange);
            this.eventDispatcher.$on('seasonChange', this.seasonChange);
            this.eventDispatcher.$on('showChange', this.showChange);
            this.eventDispatcher.$on('submit', this.submit);
            this.eventDispatcher.$on('summaryChange', this.summaryChange);
            this.eventDispatcher.$on('titleChange', this.titleChange);
            this.eventDispatcher.$on('videoFileChange', this.videoFileChange);

            // Initialize episodes array
            for(var i = 0; i < this.files.length; i++) {
                this.episodes.push({
                    drive_id: this.drive,
                    episodeNumber: this.getEpisodeNumberFromFile(this.files[i].filename),
                    file: this.files[i].filename,
                    season: this.getSeasonFromFile(this.files[i].filename),
                    summary: '',
                    title: '',
                });
            }

            /*
                Try to set currentShowId by getting show title from the current file,
                then get IMDb API data for that show.
            */
            this.videoFileChangeUpdateImdb();
        },

        methods: {
            episodeNumberChange(episodeNumber) {
                this.currentEpisode.episodeNumber = parseInt(episodeNumber);
                this.getTitleFromSeasonAndEpisode();
            },

            episodeNumberValid() {
                return this.numberValid(this.currentEpisode.episodeNumber);
            },

            getEpisodeNumberFromFile(filename) {
                return parseInt(filename.replace(/.+_s\d{2}-e([0-9]{2}).+/, '$1'));
            },

            getSeasonFromFile(filename) {
                return parseInt(filename.replace(/.+_s(\d{2})-e.+/, '$1'));
            },

            getTitleFromSeasonAndEpisode() {
                // Get index of current season
                var sIndex = _.findIndex(this.currentShow.imdbSeasons, {
                    'season': this.currentEpisode.season,
                });

                if(sIndex >= 0) {
                    // Get index of current episode
                    var eIndex = _.findIndex(this.currentShow.imdbSeasons[sIndex].episodes, {
                        'episode': this.currentEpisode.episodeNumber
                    });

                    if(eIndex >= 0) {
                        this.currentEpisode.title = this.currentShow.imdbSeasons[sIndex].episodes[eIndex].title;
                        return;
                    }
                }

                // Reset if nothing can be found
                this.currentEpisode.title = '';
            },

            imdbSearchChange(imdbId) {
                this.currentImdbSearchResult = imdbId;
                this.imdbSearchSeasons(imdbId);
            },

            imdbSearchCurrentShow() {
                var url = 'https://imdb8.p.rapidapi.com/title/auto-complete';
                var options = {
                    headers: {
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                        'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                    },
                    params: {
                        'q': this.currentShow.title
                    }
                };

                var self = this;

                axios
                    .get(url, options)
                    .then(function(response) {
                        self.currentShow.imdb = response.data;

                        // Get data on seasons and episodes for currentShow
                        self.imdbSearchSeasons(self.currentShow.imdb.d[0].id);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            imdbSearchSeasons(imdbId) {
                var url = 'https://imdb8.p.rapidapi.com/title/get-seasons';
                var options = {
                    headers: {
                        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
                        'X-RapidAPI-Key': window.__INITIAL_STATE__.imdbKey
                    },
                    params: {
                        'tconst': imdbId
                    }
                };

                var self = this;

                axios
                    .get(url, options)
                    .then(function(response) {
                        self.currentShow.imdbSeasons = response.data;

                        // Set title based on currentFilename
                        self.getTitleFromSeasonAndEpisode();
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            numberValid(number) {
                return number > 0 && !isNaN(number);
            },

            seasonChange(season) {
                this.currentEpisode.season = parseInt(season);
                this.getTitleFromSeasonAndEpisode();
            },

            seasonValid() {
                return this.numberValid(this.currentEpisode.season);
            },

            showChange(showId) {
                this.currentShowId = parseInt(showId);
                this.imdbSearchCurrentShow();
            },

            submit() {
                var self = this;

                var episode = this.currentEpisode;
                episode.media_id = this.currentShowId;

                axios
                    .post('/api/upload/episode', window.getFormData(episode))
                    .then(function(response) {
                        self.driveEventDispatcher.$emit('episodeSubmit', self.currentFilename);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },

            summaryChange(summary) {
                this.currentEpisode.summary = summary;
            },

            titleChange(title) {
                this.currentEpisode.title = title;
            },

            titleEmpty() {
                return !this.currentEpisode.title;
            },

            valid() {
                return (
                    !this.titleEmpty()
                    && this.seasonValid()
                    && this.episodeNumberValid()
                );
            },

            videoFileChange(filename) {
                this.currentFilename = filename;
                this.videoFileChangeUpdateImdb();
            },

            videoFileChangeUpdateImdb() {
                // Find correct show based on the filename
                var index = _.findIndex(this.shows, { 'titleLowercase': this.currentFile.title.toLowerCase() });

                if(index >= 0) {
                    this.currentShowId = this.shows[index].id;
                }

                // Update the IMDb search data
                this.imdbSearchCurrentShow();
            },
        },
    }
</script>