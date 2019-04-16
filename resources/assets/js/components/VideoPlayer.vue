<template>
    <div>
        <div id="movie-container">
            <div
                class="video-loader top-most"
                v-if="showVideoPlayer && !loaded"
            ></div>
            <video
                id="video-player"
                ref="video"
                v-if="showVideoPlayer && src !== ''"
                class="top-most"
                v-bind:class="{ hidden: !loaded }"
                v-on:click="togglePlay"
                controls
                autoplay
            >
                <source v-bind:src="src" v-bind:type="videoType"></source>
            </video>
        </div>

        <div id="time-range-container" v-if="showTimeRange">
            <input
                id="time-range"
                ref="timeRange"
                type="range"
                min="0"
                v-bind:max="duration"
                step="30"
                v-model:value="currentTime"
            />
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'drive',
            'filename',
            'mediaType',
        ],

        data() {
            return {
                currentTime: 0,
                duration: 0,
                loaded: false,
                showTimeRange: false,
                showVideoPlayer: false,
            }
        },

        computed: {
            src: function() {
                if(this.filename !== '') {
                    return (
                        '/video/' + this.drive +
                        '/' + this.mediaType +
                        's/' + this.filename
                    );
                }

                return '';
            },

            videoType: function() {
                var ext = this.filename.split('.')[1];
                var type = '';

                switch(ext) {
                    case 'mk4':
                    case 'm4v':
                        type = 'webm';
                        break;
                    case 'avi':
                        type = 'ogg';
                        break;
                    default:
                        type = ext;
                }

                return 'video/' + type;
            },
        },

        created() {
            Event.listen('displayVideoPlayer', this.display);
        },

        methods: {
            display: function() {
                if(this.src === '') {
                    return;
                }

                this.showVideoPlayer = true;
                this.loaded = false;

                var self = this;

                setTimeout(function() {
                    var interval = setInterval(function() {
                        var video = self.$refs.video;
                        if(video.readyState > 0) {
                            self.loaded = true;
                            self.duration = Math.round(video.duration);
                            self.currentTime = video.currentTime;
                            clearInterval(interval);
                        }
                    }, 500);
                }, 800);
            },

            togglePlay: function() {
                var video = this.$refs.video;

                if(video.paused) {
                    video.play();
                }

                if(!video.paused) {
                    video.pause();
                }
            },
        },
    }
</script>
