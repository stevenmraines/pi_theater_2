<template>
	<div class="poster-container d-inline-block" v-on:mouseover="hover" v-on:mouseleave="unhover">
		<img v-bind:src="'/img/posters/' + poster" class="img-fluid" />
		<div class="poster-overlay d-flex flex-column justify-content-around">
			<span class="mx-auto">{{ title }}</span>
			<a v-bind:href="'/theater/' + mediaType + '/' + mediaId" class="mx-auto play text-center">&#9658;</a>
			<button class="mx-auto btn btn-outline-success" v-on:click="moreInfo">More Info</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'mediaId',
			'mediaType',
			'title',
			'poster',
			'eventDispatcher',
		],

		methods: {
			moreInfo() {
				var e = this.mediaType === 'movie' ? 'movieinfo' : 'showinfo';
				Event.trigger(e, { id: this.mediaId });  // Global event dispatcher is fine here
			},

			hover() {
				this.eventDispatcher.$emit('posterContainerHover', { id: this.mediaId });
			},

			unhover() {
				this.eventDispatcher.$emit('posterContainerUnhover');
			},
		},
	}
</script>
