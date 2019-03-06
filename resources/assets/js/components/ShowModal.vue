<template>
    <div class="modal fade" id="show-modal">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="show-modal-title" class="modal-title">
                        {{ title }}
                        <small class="ml-2 text-muted text-nowrap d-inline-block">
                            ({{ year_start }} - {{ year_end > 0 ? year_end : 'Present' }})
                        </small>
                    </h5>

                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="d-flex flex-column flex-lg-row align-items-center p-2 pb-4">
                        <img
                            id="show-modal-poster"
                            class="modal-poster mx-auto"
                            v-bind:src="'/img/posters/' + poster"
                        />

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
                                <div v-for="(episode, index) in currentSeasonEpisodes">
                                    <hr class="fluid-modal-hr my-1" v-if="index > 0" />

                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                        v-bind:class="episodeListStyles(index)"
                                    >
                                        <span class="pr-2">
                                        {{ episode.episode_number < 10 ? 0 : '' }}{{ episode.episode_number }}
                                        - {{ episode.title }}
                                        </span>

                                        <button class="btn btn-success">WATCH NOW</button>
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
                            <button
                                class="btn btn-success mx-auto ml-sm-0 mr-sm-auto btn-watchlist"
                                v-if="!inWatchlist"
                                v-on:click="addToWatchlist"
                            >ADD TO WATCHLIST</button>
                            <button
                                class="btn btn-warning mx-auto ml-sm-0 mr-sm-auto btn-watchlist"
                                v-if="inWatchlist"
                                v-on:click="removeFromWatchlist"
                            >REMOVE FROM WATCHLIST</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'id',
            'title',
            'summary',
            'notes',
            'year_start',
            'year_end',
            'poster',
            'episodes',
            'genres',
            'user',
        ],

        data() {
            return {
                currentSeason: 1,
            };
        },

        computed: {
            inWatchlist: function() {
                for(var i = 0; i < this.user.watchlist.length; i++) {
                    if(this.id == this.user.watchlist[i].id) {
                        return true;
                    }
                }

                return false;
            },

            currentSeasonEpisodes: function() {
                var self = this;
                return this.episodes.filter(function(episode) {
                    return episode.season == self.currentSeason;
                });
            },

            seasons: function() {
                var seasons = [];

                for(var i = 0; i < this.episodes.length; i++) {
                    if(seasons.indexOf(this.episodes[i].season) < 0) {
                        seasons.push(this.episodes[i].season);
                    }
                }

                return seasons;
            },
        },

		created() {
			Event.listen('displayShowModal', this.display);
		},

      	methods: {
      		display() {
                this.currentSeason = this.getMinSeason();
      			$('#show-modal').modal('show');
      		},

            addToWatchlist() {
				Event.trigger('addToWatchlist', this.id);
			},

			removeFromWatchlist() {
				Event.trigger('removeFromWatchlist', this.id);
			},

            getMinSeason: function() {
                var min = 1;

                for(var i = 0; i < this.episodes.length; i++) {
                    if(this.episodes[i].season <= min) {
                        min = this.episodes[i].season;
                    }
                }

                return min;
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
        },
    }
</script>
