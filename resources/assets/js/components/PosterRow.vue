<template>
	<div class="container-fluid poster-row px-0 py-3 mb-5">
		<span
			class="left-arrow"
			v-on:click="slide('right')"
			v-bind:class="{ hidden: leftOffset >= 0 }"
		>&#8249;</span>
		<span class="right-arrow" v-on:click="slide('left')">&#8250;</span>
		<div class="slider">
			<poster-container
				ref="posterContainers"
				v-for="content in contents"
				v-bind:key="content.mediaType + '_' + content.id"
				v-bind:id="content.id"
				v-bind:title="content.title"
				v-bind:poster="content.poster"
				v-bind:mediaType="content.mediaType"
				v-bind:eventDispatcher="eventDispatcher"
			></poster-container>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['contents', 'api'],

		/*
		 * Using a non-global event dispatcher here because the global one was causing an
		 * issue where when one poster was hovered, ALL poster rows listened and responded.
		 */
		data() {
			return {
				offset:	10,
				leftOffset: 0,
				eventDispatcher: new Vue({}),
			};
		},

		methods: {
			slide(dir) {
				var inc = this.getIncrement();
				var self = this;

				if(dir === 'left') {  // Right arrow clicked
					if(this.api !== '') {
						axios
						.get(this.api + inc + '/' + this.offset)
						.then(function(response) {
							for(var i = 0; i < response.data.length; i++) {
								self.contents.push(response.data[i]);
							}

							self.$forceUpdate();
						})
						.catch(function(error) {
							console.log(error);
						});
					}

					self.offset += inc;
					return self.doSlide(dir, inc);
				}

				if(dir === 'right') {  // Left arrow clicked
					return this.doSlide(dir, inc);
				}
			},

			doSlide(dir, inc) {
				var row = this.$el;
				var children = row.children;
				var slider = null;
				var transform = '';
				var currentLeft = 0;
				var newLeft = 0;

				for(var i = 0; i < children.length; i++) {
					if(children[i].classList.value == 'slider') {
						slider = children[i];
						this.leftOffset += dir === 'right' ? 230 * inc : -230 * inc;

						if(this.leftOffset > 0 && dir === 'right') {
							this.leftOffset = 0;
						}

						newLeft = this.leftOffset > 0 && dir === 'right' ? 0 : this.leftOffset;
						slider.style.transform = 'matrix(1, 0, 0, 1, ' + newLeft + ', 0)';
					}
				}
			},

			getIncrement() {
				var width = window.innerWidth;
				var inc = 0;

				while((inc + 1) * 230 < width) {
					inc++;
				}

				return inc;
			},

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
		},

		created() {
			this.eventDispatcher.$on('posterContainerHover', this.shift);
			this.eventDispatcher.$on('posterContainerUnhover', this.unshift);
		},
	}
</script>
