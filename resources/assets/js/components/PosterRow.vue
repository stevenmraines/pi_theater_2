<template>
	<div>
		<h4 class="h4 pl-4">{{ title }}</h4>
		<div class="container-fluid poster-row px-0 py-3 mb-5">
			<span class="left-arrow" v-if="showArrows" v-on:click="scroll('right')">
				&#8249;
			</span>
			<span class="right-arrow" v-if="showArrows" v-on:click="scroll('left')">
				&#8250;
			</span>
			<div class="slider">
                <poster-container
                    ref="posterContainers"
                    v-for="content in contents"
					v-bind:event-dispatcher="eventDispatcher"
					v-bind:id="content.id"
					v-bind:key="content.objectID"
					v-bind:media_type="content.media_type"
					v-bind:poster="paths.posters + '/' + content.poster"
					v-bind:title="content.title"
					v-bind:user="user"
                ></poster-container>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			'contents',
			'paths',
			'title',
			'user',
		],

		data() {
			return {
				eventDispatcher: new Vue({})
			};
		},

		computed: {
			showArrows: function() {
				return this.contents.length > this.getIncrement();
			},
		},

		methods: {
			shift(data) {
				var p = this.$refs.posterContainers;
				var found = false;

				for(var i = 0; i < p.length; i++) {
					if(!found) {
						p[i].$el.classList.add('shift-left');

						if(p[i].id === data.id) {
							found = true;
						}
					}
					else {
						p[i].$el.classList.add('shift-right');
					}
				}
			},

			unshift() {
				var p = this.$refs.posterContainers;

				for(var i = 0; i < p.length; i++) {
					p[i].$el.classList.remove('shift-left');
					p[i].$el.classList.remove('shift-right');
				}
			},

			getIncrement() {
				var width = window.innerWidth;
				var inc = 0;

				while((inc + 1) * 230 < width) {
					inc++;
				}

				return inc - 1;
			},

			scroll(dir) {
				var inc = this.getIncrement();

				if(dir === 'left') {  // Right arrow clicked
					// Take posters from front of row and append them to end
					for(var i = 0; i < inc; i++) {
						var content = this.contents.shift();
						this.contents.push(content);
					}
				}

				if(dir === 'right') {  // Left arrow clicked
					// take posters from end of row and prepend to front
					for(var i = 0; i < inc; i++) {
						var content = this.contents.pop();
						this.contents.unshift(content);
					}
				}
			},
		},

		created() {
			this.eventDispatcher.$on('posterContainerHover', this.shift);
			this.eventDispatcher.$on('posterContainerUnhover', this.unshift);
		}
	}
</script>
