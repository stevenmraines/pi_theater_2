<template>
    <div class="modal fade" id="show-modal">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="show-modal-title" class="modal-title">
                        {{ title }}
                        <small
                            class="ml-2 text-muted text-nowrap d-inline-block"
                            v-if="release.year_start"
                        >
                            ({{ release.year_start }} - {{ (release.year_end) ? release.year_end : 'Present' }})
                        </small>
                    </h5>

                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="d-flex flex-column flex-lg-row align-items-center p-2 pb-4">
						<span class="modal-poster-container mx-auto">
							<div v-if="user && progress > 0" class="viewing-progress">
								<div class="viewing-progress" v-bind:style="{ width: progressPercentage + '%' }"></div>
							</div>
							<img v-bind:src="paths.posters + '/' + poster" />
						</span>

                        <span id="show-modal-info" class="card mt-4 mt-lg-0 ml-lg-4">
                            <div class="card-header">
                                <div class="d-flex justify-content-between" style="min-height: 100%">
                                    <span class="my-auto font-weight-bold">
                                        Season {{ currentSeason }}
                                    </span>

                                    <div class="btn-group dropdown">
                                        <button
                                            type="button"
                                            class="btn btn-primary dropdown-toggle"
                                            data-toggle="dropdown"
                                        >Seasons</button>

                                        <div class="dropdown-menu seasons-dropdown" x-placement="right-start">
                                            <button
                                                class="dropdown-item"
                                                v-for="season in seasons"
                                                v-on:click="changeSeason(season)"
                                            >Season {{ season }}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body py-1">
                                <div id="show-modal-summary">{{ summary }}</div>
                            </div>

                            <div id="show-modal-episodes" class="card-body py-1 scrollbar">
                                <div
                                    v-for="(episode, index) in currentSeasonEpisodes"
                                    v-bind:class="{ 'pb-3': user && getEpisodeHistory(episode) }"
                                    style="position: relative;"
                                >
                                    <hr class="fluid-modal-hr my-1" v-if="index > 0" />

                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                        v-bind:class="episodeListStyles(index)"
                                    >
                                        <span class="pr-2">
                                            {{ episode.episode_number < 10 ? 0 : '' }}{{ episode.episode_number }}
                                            - {{ episode.title }}
                                        </span>

                                        <button
                                            class="btn btn-primary"
                                            v-on:click="watch(episode.id)"
                                        >
                                            WATCH NOW
                                        </button>
                                    </div>

                                    <div v-if="user && getEpisodeHistory(episode)" class="viewing-progress viewing-progress-sm">
                                        <div
                                            class="viewing-progress"
                                            v-bind:style="{ width: getEpisodeProgressPercentage(episode) + '%' }"
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div class="card-footer py-1">
                                <span class="font-weight-bold">Genres:</span>

                                <ul id="show-modal-genres" class="d-inline-block list-inline mb-2">
                                    <li class="list-inline-item" v-for="(genre, i) in genres">
                                        {{ genre.name }}{{ i !== genres.length - 1 ? ',' : '' }}
                                    </li>
                                </ul>
                            </div>
                        </span>
                    </div>

                    <div v-if="user">
                        <div class="modal-footer">
                            <div style="width: 100%;">
                                <button
                                    class="btn btn-success d-block d-md-inline-block float-lg-left"
                                    v-if="user && !inWatchlist"
                                    v-on:click="addToWatchlist"
                                >
                                    + WATCHLIST
                                </button>
                                <button
                                    class="btn btn-warning d-block d-md-inline-block float-lg-left"
                                    v-if="user && inWatchlist"
                                    v-on:click="removeFromWatchlist"
                                >
                                    &minus; WATCHLIST
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['paths'],

        data() {
            return {
                currentSeason: 1,
                episodes: [],
                genres: [],
                id: 0,
                notes: null,
                poster: 'missing-poster.jpg',
                release: [],
                summary: '',
                title: '',
                user: {},
            };
        },

        computed: {
            currentSeasonEpisodes: function() {
                var self = this;
                return this.episodes.filter(function(episode) {
                    return episode.season == self.currentSeason;
                });
            },

            duration: function() {
                if(this.showHistory && this.showHistory.length > 0) {
                    var indexOfMax = this.getIndexOfMostRecentlyWatched(this.showHistory);

                    if(indexOfMax >= 0) {
                        return this.showHistory[indexOfMax].drive[0].pivot.duration;
                    }
                }

                return 0;
            },

            history: function() {
                /*
                 * History_media will contain progress for movies and
                 * progress for the most recently watched episode of any shows.
                 */
                if(this.user && this.user.history_media.length > 0) {
                    for(var i = 0; i < this.user.history_media.length; i++) {
                        if(this.user.history_media[i].id == this.id) {
                            return this.user.history_media[i];
                        }
                    }
                }

                return null;
            },

            inWatchlist: function() {
                if(this.user && this.user.watchlist) {
                    for(var i = 0; i < this.user.watchlist.length; i++) {
                        if(this.id == this.user.watchlist[i].id) {
                            return true;
                        }
                    }
                }

                return false;
            },

            minSeason: function() {
                return this.seasons.length > 0 ? this.seasons[0] : 0;
            },

            progress: function() {
                if(this.showHistory && this.showHistory.length > 0) {
                    var indexOfMax = this.getIndexOfMostRecentlyWatched(this.showHistory);

                    if(indexOfMax >= 0) {
                        return this.showHistory[indexOfMax].pivot.progress;
                    }
                }

                return 0;
            },

            progressPercentage: function() {
                if(this.progress > 0 && this.duration > 0) {
                    return ( this.progress / this.duration ) * 100;
                }

                return 0;
            },

            seasons: function() {
                var seasons = [];

                for(var i = 0; i < this.episodes.length; i++) {
                    if(seasons.indexOf(this.episodes[i].season) < 0) {
                        seasons.push(this.episodes[i].season);
                    }
                }

                seasons.sort(function(a, b) {
                    return a - b;
                });

                return seasons;
            },

            showHistory: function() {
                var history = [];

                if(this.user && this.user.episode_history && this.user.episode_history.length > 0) {
                    for(var i = 0; i < this.user.episode_history.length; i++) {
                        if(this.user.episode_history[i].media_id == this.id
                                && history.indexOf(this.user.episode_history[i]) < 0) {
                            history.push(this.user.episode_history[i]);
                        }
                    }
                }

                return history.length > 0 ? history : null;
            },
        },

		created() {
			Event.listen('displayShowModal', this.display);
            Event.listen('hideShowModal', this.hide);
            Event.listen('hideModal', this.hide);
            Event.listen('setShow', this.setShow);
		},

      	methods: {
            display() {
                this.changeSeason(this.minSeason);
      			$('#show-modal').modal('show');
      		},

            getEpisodeHistory(episode) {
                if(this.user && this.showHistory) {
                    for(var i = 0; i < this.showHistory.length; i++) {
                        if(this.showHistory[i].id === episode.id) {
                            return this.showHistory[i];
                        }
                    }
                }

                return null;
            },

            getEpisodeProgressPercentage(episode) {
                var history = this.getEpisodeHistory(episode);

                if(history) {
                    return ( history.pivot.progress / history.drive[0].pivot.duration ) * 100;
                }

                return 0;
            },

            getIndexOfMostRecentlyWatched(episodes) {
                var max = new Date('1970-01-01 00:00:00');
                var indexOfMax = -1;

                for(var i = 0; i < episodes.length; i++) {
                    var current = new Date(episodes[i].updated_at);

                    if(current > max) {
                        max = current;
                        indexOfMax = i;
                    }
                }

                return indexOfMax;
            },

            hide() {
                $('#show-modal').modal('hide');
            },

            addToWatchlist() {
				Event.trigger('addToWatchlist', this.id);
			},

			removeFromWatchlist() {
				Event.trigger('removeFromWatchlist', this.id);
			},

            changeSeason(season) {
                this.currentSeason = season;
            },

            episodeListStyles(index) {
                return {
                    'mt-1': index === 0,
                    'mb-1': index === this.currentSeasonEpisodes.length - 1,
                };
            },

            setShow(data) {
                this.id = data.id;
                this.title = data.title;
                this.poster = data.poster;
                this.summary = data.summary;
                this.notes = data.notes;
                this.release = data.release;
                this.genres = data.genres;
                this.user = data.user;
                this.episodes = data.episodes;
            },

            watch(episode_id) {
                Event.trigger('setVideo', {
                    'id' : this.id,
                    'episode_id' : episode_id
                });
            },
        },
    }
</script>
