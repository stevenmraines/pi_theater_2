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
				<ais-index
					app-id="JUG06PFXKY"
					api-key="713be18b5c43b5766349f0a144622559"
					v-bind:index-name="index"
					v-bind:query-parameters="queryParams"
				>
					<div>
						<ais-results ref="results">
							<template slot-scope="{ result }">
								<poster-container
									v-bind:key="result.objectID"
									v-bind:id="result.id"
									v-bind:title="result.title"
									v-bind:poster="result.poster"
									v-bind:event-dispatcher="eventDispatcher"
								></poster-container>
							</template>
						</ais-results>
					</div>
				</ais-index>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'index', 'queryParams'],

		data() {
			return {
				eventDispatcher: new Vue({})
			};
		},

		computed: {
			showArrows: function() {
				return true;
				return this.$refs.results.$children.length > this.getIncrement();
			},
		},

		methods: {
			shift(data) {
				var p = this.$refs.results.$children;
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
				var p = this.$refs.results.$children;

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
				return;
				if(dir === 'left') {  // Right arrow clicked
					// Take posters from front of row and append them to end
					for(var i = 0; i < inc; i++) {
						var content = this.$refs.results.$children.shift();
						this.$refs.results.$children.push(content);
					}
				}

				if(dir === 'right') {  // Left arrow clicked
					// take posters from end of row and prepend to front
					for(var i = 0; i < inc; i++) {
						var content = this.$refs.results.$children.pop();
						this.$refs.results.$children.unshift(content);
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
