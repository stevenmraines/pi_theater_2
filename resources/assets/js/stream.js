Vue.component('video-player', require('./components/VideoPlayer.vue'));
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

	data: {
		environment: window.__INITIAL_STATE__.environment,

        paths: window.__INITIAL_STATE__.paths,

        streamId: parseInt(window.__INITIAL_STATE__.streamId),
        
        streams: window.__INITIAL_STATE__.streams,

		user: window.__INITIAL_STATE__.user,

		video: {
			drive: '',
			episode_id: 0,
			filename: '',
			media_id: 0,
			mediaType: '',
			progress: 0,
		},
	},

	mounted: function() {
		console.log(this.streams[0].media[0].media.drive[0].pivot.filename)
	},

	created: function() {
		// Event.listen('addToWatchlist', this.addToWatchlist);
	},

	methods: {
		
	},
});
