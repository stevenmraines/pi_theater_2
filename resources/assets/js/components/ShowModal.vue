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
                      Season {{ current_season }}
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
                  <div v-for="episode in currentEpisodes">
                    <hr />
                    <div class="d-flex justify-content-between align-items-center">
    									<span class="pr-2">
                        {{ episode.episode < 10 ? 0 : '' }}{{ episode.episode }}
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
    				  <div v-if="logged">
      					<div class="modal-footer">
      						<button
                    class="btn btn-success mx-auto ml-sm-0 mr-sm-auto btn-watchlist"
                    v-if="!inWatchlist"
                    v-on:click="addShow()"
                  >ADD TO WATCHLIST</button>
      						<button
                    class="btn btn-warning mx-auto ml-sm-0 mr-sm-auto btn-watchlist"
                    v-if="!inWatchlist"
                    v-on:click="removeShow()"
                  >REMOVE FROM WATCHLIST</button>
      						<!--<a href="</?= SHOW_PATH ?>/@{{ show_modal.id }}/@{{ show_modal.current_season }}/@{{ show_modal.current_episode }}" class="btn btn-info">WATCH NOW</a>-->
      					</div>
    				  </div>
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script>
  export default {
    data() {
			return {
				id:		0,
				title:			'',
				summary:		'',
				notes:			null,
				year_start:			0,
				year_end:			0,
				poster:			'missing-poster.jpg',
        seasons: [],
        current_season: 0,
        episodes: [],
				genres:			[],
				inWatchlist:	false,
        logged: false,
			};
		},

    computed: {
      currentEpisodes() {
        var self = this;
        return this.episodes.filter(function(ep) {
          return ep.season = self.current_season;
        });
      }
    },

		created() {
			Event.listen('showInfo', this.load);
		},

  	methods: {
  		load(data) {
  			var self = this;
  			axios.get('/show/info/' + data.id)
          .then(function(response) {
    				self.id		          = response.data.id;
    				self.title			    = response.data.title;
    				self.summary		    = response.data.summary;
    				self.notes			    = response.data.notes;
    				self.year_start     = response.data.year_start;
    				self.year_end       = response.data.year_end;
            self.seasons        = response.data.seasons;
            self.current_season = response.data.seasons[0];
            self.episodes       = response.data.episodes;
    				self.poster			    = response.data.poster;
    				self.genres			    = response.data.genres;
    				self.logged     	  = response.data.logged;
    				self.inWatchlist	  = response.data.inWatchlist;
            document.getElementById('show-modal-episodes').scrollTop = 0;  // Why doesn't this work when it works in changeSeason?
    				$('#show-modal').modal('show');
    			});
  		},

      addShow() {
        var self = this;
				axios.get('/user/watchlist/addShow/' + this.id)
					.then(function(response) {
						if(typeof response.data.success !== null && response.data.success) {
							self.inWatchlist = true;
						}
					});
      },

      removeShow() {
        var self = this;
				axios.get('/user/watchlist/removeShow/' + this.id)
					.then(function(response) {
						if(typeof response.data.success !== null && response.data.success) {
							self.inWatchlist = false;
						}
					});
      },

      changeSeason(season) {
        var self = this;
        axios.get('/show/episodes/' + this.id + '/' + season)
          .then(function(response) {
            self.current_season = season;
            self.episodes.concat(response.data);  // Need to make sure I don't add same season twice
            document.getElementById('show-modal-episodes').scrollTop = 0;
          });
      },
    },
  }
</script>
