<template>
	<div class="container-fluid poster-row px-0 py-3 mb-3">
		<span class="left-arrow" v-on:click="slide('right')">&#8249;</span>
		<span class="right-arrow" v-on:click="slide('left')">&#8250;</span>
		<div class="slider">
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
						transform = this.getComputedStyle(slider).transform === 'none' ?
								'matrix(1, 0, 0, 1, 0, 0)' : this.getComputedStyle(slider).transform;
						// console.log('transform: ' + transform);
						var regex = /matrix\([0-9\-]+, [0-9\-]+, [0-9\-]+, [0-9\-]+, ([0-9\-]+), [0-9\-]+\)/;
						currentLeft = parseInt(transform.match(regex)[1]);
						// console.log('current left: ' + currentLeft);
						newLeft = (currentLeft + this.leftOffset) + 'px';
						// console.log('new left: ' + newLeft);

						slider.style.transform = 'translate3d(' + newLeft + ', 0px, 0px)';
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
			},

			getComputedStyle( dom ) {
        var style;
        var returns = {};
        // FireFox and Chrome way
        if(window.getComputedStyle){
            style = window.getComputedStyle(dom, null);
            for(var i = 0, l = style.length; i < l; i++){
                var prop = style[i];
                var val = style.getPropertyValue(prop);
                returns[prop] = val;
            }
            return returns;
        }
        // IE and Opera way
        if(dom.currentStyle){
            style = dom.currentStyle;
            for(var prop in style){
                returns[prop] = style[prop];
            }
            return returns;
        }
        // Style from style attribute
        if(style = dom.style){
            for(var prop in style){
                if(typeof style[prop] != 'function'){
                    returns[prop] = style[prop];
                }
            }
            return returns;
        }
        return returns;
    	},
		},

		created() {
			Event.listen('posterContainerHover', this.shift);
			Event.listen('posterContainerUnhover', this.unshift);
		}
	}
</script>
