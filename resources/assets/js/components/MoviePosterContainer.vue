<template>
	<div class="poster-container d-inline-block" v-on:mouseover="hover" v-on:mouseleave="unhover">
		<img v-bind:src="'/img/posters/' + poster" class="img-fluid" />
		<div class="poster-overlay d-flex flex-column justify-content-around">
			<span class="mx-auto px-2">{{ title }}</span>
			<a v-bind:href="'/theater/movie/' + id" class="mx-auto play text-center">&#9658;</a>
			<button class="mx-auto btn btn-outline-success" v-on:click="moreInfo">More Info</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'id',
			'title',
			'poster',
			'eventDispatcher',
		],

		methods: {
			moreInfo() {
				Event.trigger('movieInfo', { id: this.id });  // Global event dispatcher is fine here
			},

			hover() {
				this.eventDispatcher.$emit('posterContainerHover', { id: this.id });
			},

			unhover() {
				this.eventDispatcher.$emit('posterContainerUnhover');
			},
		},
	}
</script>
