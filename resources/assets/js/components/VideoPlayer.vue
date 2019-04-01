<template>
    <div>
        <div id="movie-container">
            <div class="video-loader" v-if="!loaded"></div>
            <video
                id="video-player"
                v-if="loaded"
                v-on:click="togglePlay"
                controls
                autoplay
            >
                <source v-bind:src="src"></source>
            </video>
        </div>

        <div id="time-range-container" v-if="showTimeRange">
            <input
                id="time-range"
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
            }
        },

        computed: {
            src: function() {
                return '/video/' + this.drive + '/' + this.mediaType + 's/' + this.filename;
            },

            videoType: function() {
                var ext = this.filename.slice(-3);
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

        methods: {
            togglePlay: function() {
                var video = document.getElementById('video-player');

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
