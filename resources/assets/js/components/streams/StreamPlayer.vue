<template>
    <div>
        <h5 class="mb-5">
            Now Playing:
            {{ Object.keys(this.media).length ? media.title : episode.show.title + ' - ' + episode.title }}
        </h5>
        <div class="player-wrapper w-100 mb-5">
            <video ref="video-el" @loadedmetadata="onVideoLoadedMetaData" @ended="$emit('ended')" muted controls>
                <source :src="src" :type="videoType" />
            </video>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StreamPlayer',

    props: {
        'environment': { type: String, default: 'production' },
        'episode': { type: Object, required: true },
        'media': { type: Object, required: true },
        'offset': { type: Number, default: 0 },
        'paths': { type: Object, required: true },
        'stream': { type: Object, required: true },
    },

    data() {
        return {
            startOffset: this.offset,
        };
    },

    computed: {
        src() {
            let drive;
            
            if (Object.keys(this.media).length) {
                drive = this.media.drive[0];
            } else {
                drive = this.episode.drive[0];
            }

            const episodeDirectory = this.paths.drivePaths[drive.name].episode_directory;
            const movieDirectory = this.paths.drivePaths[drive.name].movie_directory;
            // jingle-cats.mp4 is only in the testing/movies directory
            const directory = this.media.media_type === 'movie' || this.environment !== 'production' ? movieDirectory : episodeDirectory;
            const filename = this.environment === 'production' ? drive.pivot.filename : 'jingle-cats.mp4';
            
            return `/${directory}/${filename}`;
        },

        videoType() {
            if (this.environment !== 'production') {
                return 'video/mp4';
            }
            
            var ext = this.src.split('.')[1];
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
        Event.listen('toggleFullscreen', () => {
            if (! document.fullscreenElement) {
                this.$refs['video-el'].requestFullscreen();
            } else {
                document.exitFullscreen()
            }
        });
        
        Event.listen('toggleMute', () => this.$refs['video-el'].muted = ! this.$refs['video-el'].muted);
        
        Event.listen('togglePlay', () => {
            if (this.$refs['video-el'].paused) {
                this.$refs['video-el'].play();
            } else {
                this.$refs['video-el'].pause();
            }
        });
    },

    methods: {
        onVideoLoadedMetaData() {
            console.log('onVideoLoadedMetaData');
            const video = this.$refs['video-el'];
            video.currentTime = this.startOffset;
            this.startOffset = 0; // Don't apply offset to next video that is played when first video finishes
            video.play().catch(() => {});
            video.muted = false;
        },
    },

    watch: {
        'episode.id'() {
            this.$nextTick(() => {
                this.$refs['video-el'].load();
            });
        },

        'media.id'() {
            this.$nextTick(() => {
                this.$refs['video-el'].load();
            });
        },
    },
}
</script>

<style scoped>
.player-wrapper {
    position: relative;
    min-height: 300px;
}

.player-wrapper video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: 100%;
}
</style>
