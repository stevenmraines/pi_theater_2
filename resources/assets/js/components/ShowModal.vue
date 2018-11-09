<template>
    <div class="modal fade" id="show-modal">
    	<div class="modal-dialog modal-dialog-centered modal-lg">
    		<div class="modal-content">
    			<div class="modal-header">
    				<h5 id="show-modal-title" class="modal-title">
    					@{{ show_modal.title }}
    					<small class="ml-2 text-muted text-nowrap d-inline-block">
    						(@{{ show_modal.year_start }} - @{{ show_modal.year_end > 0 ? show_modal.year_end : 'Present' }})
    					</small>
    				</h5>
    				<button type="button" class="close" data-dismiss="modal">
    					<span>&times;</span>
    				</button>
    			</div>
    			<div class="modal-body">
    				<div class="d-flex flex-column flex-lg-row p-2 pb-4">
    					<img v-bind:src="'/img/posters/' + show_modal.poster" id="show-modal-poster" class="modal-poster mx-auto" />
    					<span id="show-modal-info" class="card mt-4 mt-lg-0 ml-lg-4">
    						<div class="card-header">
    							<div class="d-flex justify-content-between" style="min-height: 100%">
    								<span class="my-auto font-weight-bold">Season @{{ show_modal.current_season }}</span>
    								<div class="btn-group dropdown">
    									<button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">Seasons</button>
    									<div class="dropdown-menu seasons-dropdown" x-placement="right-start">
    										<button class="dropdown-item" v-for="(number, episodes, i) in show_modal.seasons">Season @{{ number }}</button>
    									</div>
    								</div>
    							</div>
    						</div>
    						<div class="card-body py-1">
    							<div id="show-modal-summary">@{{ show_modal.summary }}</div>
    						</div>
    						<div id="show-modal-episodes" class="card-body py-1">
    							<ul class="list-unstyled">
    								<li v-for="episode_info in show_modal.seasons[show_modal.current_season]">
    									@{{ episode_info.episode < 10 ? 0 : '' }}@{{ episode_info.episode }} - @{{ episode_info.title }}
    									<button class="btn btn-info">WATCH NOW</button> <!-- making this invisible instead of using ng-show should keep button height -->
    								</li>
    							</ul>
    						</div>
    						<div class="card-footer py-1">
    							<span class="font-weight-bold">Genres:</span>
    							<ul id="show-modal-genres" class="d-inline-block list-inline mb-2">
    								<li class="list-inline-item" v-for="(genre, i) in show_modal.genres">
    									@{{ genre }}@{{ i !== show_modal.genres.length - 1 ? ',' : '' }}
    								</li>
    							</ul>
    						</div>
    					</span>
    				</div>
    				@if($user)
    					<div class="modal-footer">
    						<button class="btn btn-success mx-auto ml-sm-0 mr-sm-auto btn-watchlist" v-if="!show_modal.in_watchlist">ADD TO WATCHLIST</button>
    						<button class="btn btn-warning mx-auto ml-sm-0 mr-sm-auto btn-watchlist" v-if="show_modal.in_watchlist">REMOVE FROM WATCHLIST</button>
    						<!--<a href="</?= SHOW_PATH ?>/@{{ show_modal.id }}/@{{ show_modal.current_season }}/@{{ show_modal.current_episode }}" class="btn btn-info">WATCH NOW</a>-->
    					</div>
    				@endif
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script>
    export default {
        // data() {
		// 	return {
		// 		mediaId:		0,
		// 		title:			'',
		// 		summary:		'',
		// 		notes:			null,
		// 		year:			0,
		// 		poster:			'missing-poster.jpg',
		// 		genres:			[],
		// 		inWatchlist:	false
		// 	};
		// },
        //
		// created() {
		// 	Event.listen('movieinfo', this.load);
		// },
        //
		// methods: {
		// 	load(data) {
		// 		var self = this;
		// 		$.get('/api/movie/info/' + data.id, function(response) {
		// 			self.mediaId		= response.id;
		// 			self.title			= response.title;
		// 			self.summary		= response.summary;
		// 			self.notes			= response.notes;
		// 			self.year			= response.year;
		// 			self.poster			= response.poster;
		// 			self.genres			= response.genres;
		// 			self.inWatchlist	= false;
		// 			$('#movie-modal').modal('show');
		// 		});
		// 	}
		// }
    }
</script>
