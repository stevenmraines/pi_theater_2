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
                v-model:value="progress"
            />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                drive: '',
                duration: 0,
                episode_id: 0,
                filename: '',
                loaded: false,
                media_id: 0,
                media_type: '',
                progress: 0,
                showTimeRange: false,
                showVideoPlayer: false,
                step: 10,
                timeSync: {},
                updateHistory: {},
                userLoggedIn: false
            }
        },

        computed: {
            src: function() {
                if(this.filename !== '') {
                    return (
                        '/video/' + this.drive +
                        '/' + this.media_type +
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
            Event.listen('fullscreen', this.toggleFullscreen);
            Event.listen('togglePlay', this.togglePlay);
            Event.listen('toggleTimeRange', this.toggleTimeRange);
            Event.listen('rewind', this.rewind);
            Event.listen('fastForward', this.fastForward);
        },

        methods: {
            checkIfLoaded: function() {
                var self = this;

                var interval = setInterval(function() {
                    var video = self.$refs.video;

                    if(video.readyState > 0) {
                        self.loaded = true;
                        self.duration = Math.round(video.duration);

                        if(self.progress > 0) {
                            video.currentTime = self.progress;
                        }

                        clearInterval(interval);
                    }
                }, 500);
            },

            exitFullscreen: function() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if(document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            },

            fastForward: function() {
                var video = this.$refs.video;
                video.currentTime = video.currentTime + this.step;
                this.progress = video.currentTime;
            },

            hide: function() {
                this.setSrc({
                    drive: '',
                    filename: '',
                    media_type: '',
                });

                clearInterval(this.timeSync);
                clearInterval(this.updateHistory);

                this.showVideoPlayer = false;
                this.loaded = false;
            },

            requestFullscreen: function() {
                var video = this.$refs.video;

                if(video.requestFullscreen) {
                    video.requestFullscreen();
                } else if(video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if(video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if(video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            },

            rewind: function() {
                var video = this.$refs.video;
                video.currentTime = video.currentTime - this.step;
                this.progress = video.currentTime;
            },

            setSrc: function(video) {
                this.drive = video.drive;
                this.episode_id = video.episode_id;
                this.filename = video.filename;
                this.media_id = video.media_id;
                this.media_type = video.mediaType;

                if(video.progress > 0) {
                    this.progress = video.progress;
                }
            },

            show: function(data) {
                if(this.src === '') {
                    return;
                }

                this.showVideoPlayer = true;
                this.loaded = false;
                this.userLoggedIn = data.userLoggedIn;

                var self = this;

                setTimeout(function() {
                    self.checkIfLoaded();
                }, 800);

                this.startTimeSync();

                if(this.userLoggedIn) {
                    this.startUpdatingHistory();
                }
            },

            startTimeSync: function() {
                var self = this;
                // Why does this update so infrequently????
                this.timeSync = setInterval(function() {
                    var video = self.$refs.video;

                    if(!video.paused) {
                        self.progress = video.currentTime;
                        self.duration = video.duration;
                    }
                }, 1000);
            },

            startUpdatingHistory: function() {
                var self = this;

                this.updateHistory = setInterval(function() {
                    var video = self.$refs.video;

                    if(!video.paused) {
                        Event.trigger('updateHistory', {
                            media_id: self.media_id,
                            episode_id: self.episode_id,
                            progress: self.progress
                        });
                    }
                }, 3000);
            },

            toggleFullscreen: function() {
                if(this.showVideoPlayer) {
                    if(document.fullscreenElement) {
                        return this.exitFullscreen();
                    }

                    return this.requestFullscreen();
                }
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
