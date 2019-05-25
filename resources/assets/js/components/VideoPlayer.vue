<template>
    <div>
        <div class="fluid-modal scrollbar d-block" v-if="showVideoPlayer">
            <div class="fluid-modal-content">
                <div class="fluid-modal-header">
                    <!-- Empty element just to have close button floated to the right -->
                    <span></span>
                    <button
                        class="fluid-modal-close close topmost"
                        v-on:click="hide"
                    >
                        <span>&times;</span>
                    </button>
                </div>
                <div
                    class="video-loader"
                    v-if="showVideoPlayer && !loaded"
                ></div>
                <video
                    class="fluid-modal-centered"
                    ref="video"
                    v-if="showVideoPlayer && src !== ''"
                    v-bind:class="{ hidden: !loaded }"
                    controls
                    autoplay
                >
                    <source v-bind:src="src" v-bind:type="videoType"></source>
                </video>
            </div>
        </div>

        <div id="time-range-container" v-if="showTimeRange">
            <input
                id="time-range"
                ref="timeRange"
                type="range"
                min="0"
                v-bind:max="duration"
                v-bind:step="step"
                v-model:value="currentTime"
            />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentTime: 0,
                drive: '',
                duration: 0,
                filename: '',
                loaded: false,
                mediaType: '',
                showTimeRange: false,
                showVideoPlayer: false,
                step: 15,
                timeRangeSync: {}
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
            Event.listen('hideModal', this.hide);
            Event.listen('hideVideoPlayer', this.hide);
            Event.listen('showVideoPlayer', this.show);
            Event.listen('setVideoPlayerSrc', this.setSrc);
            Event.listen('togglePlay', this.togglePlay);
            Event.listen('toggleTimeRange', this.toggleTimeRange);
            Event.listen('rewind', this.rewind);
            Event.listen('fastForward', this.fastForward);
        },

        methods: {
            fastForward: function() {
                var video = this.$refs.video;

                video.currentTime = video.currentTime + this.step;

                this.currentTime = video.currentTime;
            },

            hide: function() {
                this.setSrc({
                    drive: '',
                    filename: '',
                    mediaType: '',
                });

                clearInterval(this.timeRangeSync);

                this.showVideoPlayer = false;
                this.loaded = false;
            },

            rewind: function() {
                var video = this.$refs.video;

                video.currentTime = video.currentTime - this.step;

                this.currentTime = video.currentTime;
            },

            setSrc: function(video) {
                this.drive = video.drive;
                this.filename = video.filename;
                this.mediaType = video.mediaType;
            },

            show: function() {
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

                // Why does this update so infrequently????
                this.timeRangeSync = setInterval(function() {
                    var video = self.$refs.video;
                    self.currentTime = video.currentTime;
                }, 100);
            },

            togglePlay: function() {
                var video = this.$refs.video;

                if(video.paused) {
                    video.play();
                    return;
                }

                if(!video.paused) {
                    video.pause();
                    return;
                }
            },

            toggleTimeRange: function() {
                this.showTimeRange = !this.showTimeRange;
            },
        },
    }
</script>
