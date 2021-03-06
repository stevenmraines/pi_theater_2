<template>
    <div class="modal fade" id="show-modal">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="show-modal-title" class="modal-title">
                        {{ title }}
                        <small
                            class="ml-2 text-muted text-nowrap d-inline-block"
                            v-if="show_year.year_start"
                        >
                            ({{ show_year.year_start }} - {{ (show_year.year_end) ? show_year.year_end : 'Present' }})
                        </small>
                    </h5>

                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="d-flex flex-column flex-lg-row align-items-center p-2 pb-4">
						<span class="modal-poster-container mx-auto">
							<div v-if="user && progress >= 0 && duration > 0" class="viewing-progress">
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
                                                v-for="(season, index) in seasons"
                                                v-on:click="changeSeason(season)"
                                                :key="index"
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
                                    style="position: relative;"
                                    v-bind:class="{ 'pb-3': user && getEpisodeHistory(episode) }"
                                    v-bind:ref="getRef(episode)"
                                    v-for="(episode, index) in currentSeasonEpisodes"
                                    :key="index"
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

                                        <span>
                                            <button
                                                class="btn btn-primary"
                                                data-placement="top"
                                                data-toggle="tooltip"
                                                v-bind:title="!getEpisodeHistory(episode) ? 'Play' : 'Restart'"
                                                v-on:click="watch(episode.id, true)"
                                            >
                                                <i
                                                    class="mdi"
                                                    v-bind:class="{
                                                        'mdi-sync' : getEpisodeHistory(episode),
                                                        'mdi-arrow-right-drop-circle-outline' : !getEpisodeHistory(episode)
                                                    }"
                                                ></i>
                                            </button>

                                            <button
                                                class="btn btn-primary"
                                                data-placement="top"
                                                data-toggle="tooltip"
                                                title="Continue"
                                                v-if="getEpisodeHistory(episode)"
                                                v-on:click="watch(episode.id, false)"
                                            >
                                                <i class="mdi mdi-arrow-right-drop-circle-outline"></i>
                                            </button>
                                        </span>
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
                                    <li class="list-inline-item" v-for="(genre, i) in genres" :key="i">
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
                                    class="btn btn-success d-block d-lg-inline-block float-lg-left align-items-center"
                                    data-placement="top"
                                    data-toggle="tooltip"
                                    title="Add to Watchlist"
                                    v-if="user && !inWatchlist"
                                    v-on:click="addToWatchlist"
                                >
                                    <i class="mdi mdi-plus-circle-outline"></i> WATCHLIST
                                </button>

                                <button
                                    class="btn btn-warning d-block d-lg-inline-block float-lg-left align-items-center"
                                    data-placement="top"
                                    data-toggle="tooltip"
                                    title="Remove from Watchlist"
                                    v-if="user && inWatchlist"
                                    v-on:click="removeFromWatchlist"
                                >
                                    <i class="mdi mdi-minus-circle-outline"></i> WATCHLIST
                                </button>

                                <button
                                    class="btn btn-primary d-block d-lg-inline-block float-lg-right align-items-center"
                                    data-placement="top"
                                    data-toggle="tooltip"
                                    title="Continue Episode"
                                    v-if="mostRecentEpisode && !mostRecentIsComplete"
                                    v-on:click="watch(mostRecentEpisode.id, false)"
                                >
                                    <i class="mdi mdi-arrow-right-drop-circle-outline"></i> CONTINUE
                                    S{{ formattedNumber(mostRecentEpisode.season) }}
                                    E{{ formattedNumber(mostRecentEpisode.episode_number) }}
                                </button>

                                <button
                                    class="btn btn-primary d-block d-lg-inline-block float-lg-right align-items-center"
                                    data-placement="top"
                                    data-toggle="tooltip"
                                    title="Play Next Episode"
                                    v-if="mostRecentIsComplete && nextEpisode"
                                    v-on:click="watch(nextEpisode.id, true)"
                                >
                                    <i class="mdi mdi-arrow-right-drop-circle-outline"></i> PLAY
                                    S{{ formattedNumber(nextEpisode.season) }}
                                    E{{ formattedNumber(nextEpisode.episode_number) }}
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
                show_year: [],
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
                if(this.mostRecentEpisode) {
                    return this.mostRecentEpisode.drive[0].pivot.duration;
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

            mostRecentEpisode: function() {
                if(this.user && this.showHistory && this.showHistory.length > 0) {
                    var indexOfMax = this.getIndexOfMostRecentlyWatched(this.showHistory);

                    if(indexOfMax >= 0) {
                        return this.showHistory[indexOfMax];
                    }
                }

                return null;
            },

            mostRecentIsComplete: function() {
                return (
                    this.mostRecentEpisode
                    && this.mostRecentEpisode.drive[0].pivot.duration > 0
                    && this.mostRecentEpisode.pivot.progress / this.mostRecentEpisode.drive[0].pivot.duration >= 0.95
                );
            },

            nextEpisode: function() {
                if(this.mostRecentEpisode) {
                    // Try to get next episode of current season
                    let nextEpisode = this.mostRecentEpisode.episode_number + 1;

                    for(let i = 0; i < this.episodes.length; i++) {
                        if(this.episodes[i].season == this.mostRecentEpisode.season
                                && this.episodes[i].episode_number == nextEpisode) {
                            return this.episodes[i];
                        }
                    }

                    // Try to start next season
                    nextEpisode = 1;
                    let nextSeason = this.mostRecentEpisode.season + 1;

                    for(let i = 0; i < this.episodes.length; i++) {
                        if(this.episodes[i].season == nextSeason && this.episodes[i].episode_number == 1) {
                            return this.episodes[i];
                        }
                    }
                }

                return null;
            },

            progress: function() {
                if(this.mostRecentEpisode) {
                    return this.mostRecentEpisode.pivot.progress;
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
                this.changeSeason(this.mostRecentEpisode ? this.mostRecentEpisode.season : this.minSeason);

                if(this.mostRecentEpisode) {
                    // $('#show-modal-episodes').scrollTop(
                    //     $(this.$refs[this.getRef(this.mostRecentEpisode)][0]).offset().top
                    // );
                }

                $('#show-modal').modal('show');
      		},

            formattedNumber(number) {
                return number >= 10 ? number : '0' + number;
            },

            getEpisodeHistory(episode) {
                if(this.showHistory && this.showHistory.length > 0) {
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

            getRef(episode) {
                if(episode.season && episode.episode_number) {
                    return 'episode_s'
                        + this.formattedNumber(episode.season) + '-e'
                        + this.formattedNumber(episode.episode_number);
                }

                return '';
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
                this.show_year = data.show_year;
                this.genres = data.genres;
                this.user = data.user;
                this.episodes = data.episodes;
            },

            watch(episode_id, restart) {
                var progress = 0;

                if(!restart && this.showHistory) {
                    for(var i = 0; i < this.showHistory.length; i++) {
                        if(this.showHistory[i].id == episode_id) {
                            progress = this.showHistory[i].pivot.progress;
                            break;
                        }
                    }
                }

                Event.trigger('setVideo', {
                    episode_id : episode_id,
                    id : this.id,
                    progress: progress,
                });
            },
        },
    }
</script>
