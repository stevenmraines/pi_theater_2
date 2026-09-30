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
		case 70:  // F key
			Event.trigger('toggleFullscreen');
			break;
		case 77:  // M key
			Event.trigger('toggleMute');
			break;
		case 80:  // P key
			Event.trigger('togglePlay');
			break;
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
			console.log('onCurrentMediaEnded');
			this.setCurrentMedia();
		},

		setCurrentMedia() {
			const now = new Date();
			const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
			let start = 0;
			let current = {};
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

			console.log(`Setting currentMedia to ${current.title} (${current.id})`);

			
			this.offset = offset;
			this.currentMedia = current;
			
			// Set this in the URL so that the timeline scrollbar will jump to the current hour position
			let hour = now.getHours(); // 0-23
			const minutes = now.getMinutes();
			
			if (minutes >= 50 && hour < 23) {
				hour++;
			}
			
			const amOrPm = hour < 12 ? 'am' : 'pm';
			const timelineHourElementId = (hour === 0 ? 12 : (hour >= 13 ? hour - 12 : hour)) + '-' + amOrPm;
			
			window.location.hash = timelineHourElementId;

			this.$nextTick(function() {
				const element = document.getElementById(timelineHourElementId);
				
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
				}
			});
		},
	},
});
