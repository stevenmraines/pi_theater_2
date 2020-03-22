<template>
	<div
		class="poster-container d-inline-block"
		v-on:mouseover="hover"
		v-on:mouseleave="unhover"
	>
		<img v-bind:src="poster" class="img-fluid" />
		<div class="poster-overlay d-flex flex-column justify-content-around">
			<span class="mx-auto px-2">{{ title }}</span>
			<a href="javascript:void(0);" class="mx-auto play text-center">
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
			'poster',
			'title',
			'user',
		],

		computed: {
			progress: function() {
				if(user.history_movie) {
					for(var i = 0; i < user.history_movie.length; i++) {
						if(user.history_movie[i].id === this.id) {
							return user.history_movie[i].pivot.progress;
						}
					}
				}

				if(user.episode_history) {

				}
			}
		},

		methods: {
			getMedia() {
				Event.trigger('getMedia', this.id);
			},

			/*
			 * Use local event dispatcher for hover and unhover to
			 * prevent all posters on all rows from being shifted.
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
		},
	}
</script>
