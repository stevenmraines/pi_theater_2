Vue.component('stream-player', require('./components/streams/StreamPlayer.vue'));
Vue.component('timeline', require('./components/streams/Timeline.vue'));
Vue.component('timeline-stream', require('./components/streams/TimelineStream.vue'));
Vue.component('stream-media', require('./components/streams/StreamMedia.vue'));

/*
 * EVENT DISPATCHER
 */
window.Event = new class {
	constructor() {
		this.vue = new Vue();
	}

	trigger(event, data = null) {
		this.vue.$emit(event, data);
	}

	listen(event, callback) {
		this.vue.$on(event, callback);
	}
};

/*
 * REGISTER KEYBOARD EVENTS
 */
$(document).keyup(function(event) {
	switch(event.which) {
		case 38:  // Up arrow
			Event.trigger('togglePlay');
			break;
		case 40:  // Down arrow
			Event.trigger('toggleTimeRange');
			break;
		case 70:  // F key
			Event.trigger('fullscreen');
	}
});

/*
 * ROOT VUE INSTANCE
 */
const app = new Vue({
	el: '#vue-wrapper',

	data() {
		return {
			currentMedia: {},

			currentStream: {},

			environment: window.__INITIAL_STATE__.environment,

			offset: 0,

			paths: window.__INITIAL_STATE__.paths,

			streamId: parseInt(window.__INITIAL_STATE__.streamId),
			
			streams: window.__INITIAL_STATE__.streams,
		};
	},

	created() {
		this.currentStream = this.streams.find((s) => s.id === this.streamId);
		this.setCurrentMedia();
	},

	methods: {
		onCurrentMediaEnded() {
			this.setCurrentMedia();
		},

		setCurrentMedia() {
			const now = new Date();
			const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
			let start = 0;
			let current = null;
			let offset = 0;

			for (const item of this.currentStream.media) {
				const duration = item.media.drive[0].pivot.duration;
				const end = start + duration;

				if (secondsSinceMidnight < end) {
					current = item.media;
					offset = secondsSinceMidnight - start;
					break;
				}

				start = end;
			}

			this.currentMedia = current;
			this.offset = offset;
		},
	},
});
