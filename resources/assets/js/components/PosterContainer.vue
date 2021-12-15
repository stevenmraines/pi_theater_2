<template>
	<div
		class="poster-container d-inline-block"
		v-on:mouseover="hover"
		v-on:mouseleave="unhover"
	>
		<div v-if="user && progress >= 0 && duration > 0" class="viewing-progress">
			<div class="viewing-progress" v-bind:style="{ width: progressPercentage + '%' }"></div>
		</div>
		<img v-bind:src="poster" class="img-fluid" />
		<div class="poster-overlay d-flex flex-column justify-content-around">
			<span class="mx-auto px-2">{{ title }}</span>
			<a href="javascript:void(0);" class="mx-auto play text-center" v-on:click="watch">
				&#9658;
			</a>
			<button class="mx-auto btn btn-outline-success" v-on:click="getMedia">
				More Info
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'eventDispatcher',
			'id',
			'media_type',
			'poster',
			'title',
			'user',
		],

		computed: {
			duration: function() {
				// If it's a show, get duration from most recent watched episode
				if(this.media_type === 'show' && this.showHistory && this.showHistory.length > 0) {
					var indexOfMax = this.getIndexOfMostRecentlyWatched(this.showHistory);

					if(indexOfMax >= 0) {
						return this.showHistory[indexOfMax].drive[0].pivot.duration;
					}
				}

				if(
					this.media_type === 'movie'
					&& this.history.drive[0].pivot.duration
					&& this.history.drive[0].pivot.duration > 0
				) {
					return this.history.drive[0].pivot.duration;
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

			progress: function() {
				if(this.media_type === 'movie' && this.history && this.history.pivot.progress > 0) {
					return this.history.pivot.progress;
				}

				if(this.media_type === 'show' && this.showHistory && this.showHistory.length > 0) {
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

			showHistory: function() {
				var history = [];

				if(this.media_type === 'show' && this.user.episode_history && this.user.episode_history.length > 0) {
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

		methods: {
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

			getMedia() {
				Event.trigger('getMedia', this.id);
			},

			/*
			 * Use local event dispatcher on hover and unhover methods
			 * to prevent all posters on all rows from being shifted.
			 */
			hover() {
				if(typeof this.eventDispatcher.$emit === 'function') {
					this.eventDispatcher.$emit('posterContainerHover', { id: this.id });
				}
			},

			unhover() {
				if(typeof this.eventDispatcher.$emit === 'function') {
					this.eventDispatcher.$emit('posterContainerUnhover');
				}
			},

			watch() {
				Event.trigger('posterPlay', this.id);
			},
		},
	}
</script>
