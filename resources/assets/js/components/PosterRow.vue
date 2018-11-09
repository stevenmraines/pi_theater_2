<template>
	<div class="container-fluid poster-row px-0 py-3 mb-3">
		<span class="left-arrow" v-on:click="slide('right')">&#8249;</span>
		<span class="right-arrow" v-on:click="slide('left')">&#8250;</span>
		<poster-container
				ref="posterContainers"
				v-for="content in contents"
				v-bind:key="content.id"
				v-bind:media-id="content.id"
				v-bind:media-type="'movie'"
				v-bind:title="content.title"
				v-bind:poster="content.poster"
		></poster-container>
	</div>
</template>

<script>
	export default {
		props: ['contents'],

		data() {
			return {
				offset:	10,
				leftOffset: 0
			};
		},

		methods: {
			// Keep a running total for offset, starting at 10
			slide(dir) {
				var inc = this.getIncrement();
				if(dir === 'left') {
					var self = this;
					$.get('/api/movie/recent/' + inc + '/' + this.offset, function(response) {
						for(var i = 0; i < response.length; i++) {
							self.contents.push(response[i]);
						}
						self.offset += inc;
						self.doSlide(dir, inc);
					});
				}else {
					this.doSlide(dir, inc);
				}
			},

			doSlide(dir, inc) {
				var row = $(this.$el);
				// console.log(row);
				// console.log($('.poster-container', row));
				this.leftOffset += dir === 'right' ? 230 * inc : -230 * inc;
				var currentLeft = $('.poster-container:first-of-type', row).css('left');
				currentLeft = parseInt(currentLeft);
				var newLeft = (currentLeft + this.leftOffset) + 'px';
				Event.trigger('slide', { newLeft: newLeft });
				// $('.poster-container', row).css('left', newLeft);
				// var p = this.$refs.posterContainers;
				// var currentLeft = p[0].$el.style.left === '' ? '0px' :
				// 		p[0].$el.style.left;
				// for(var i = 0; i < p.length; i++) {
					// Need to check here before actually sliding if any blank space is about to show on the screen
					// p[i].$el.style.left = newLeft;

				// }
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
						if(p[i].mediaId === data.id) {
							found = true;
						}
					}else {
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
			}
		},

		created() {
			Event.listen('posterContainerHover', this.shift);
			Event.listen('posterContainerUnhover', this.unshift);
		}
	}
</script>
