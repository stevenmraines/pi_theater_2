<template>
    <div>
        <h5 class="mb-5">Now Playing: {{ media.title }}</h5>
        <div class="player-wrapper w-100 mb-5">
            <video ref="video-el" controls>
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
        'media': { type: Object, required: true },
        'offset': { type: Number, default: 0 },
        'paths': { type: Object, required: true },
        'stream': { type: Object, required: true },
    },

    computed: {
        src() {
            const drive = this.media.drive[0];
            const episodeDirectory = this.paths.drivePaths[drive.name].episode_directory;
            const movieDirectory = this.paths.drivePaths[drive.name].movie_directory;
            const directory = this.media.media_type === 'movie' ? movieDirectory : episodeDirectory;
            const filename = this.environment === 'production' ? drive.filename : 'jingle-cats.mp4';
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

    mounted() {
        if (this.src) {
            this.$refs['video-el'].offset = this.offset;
        }
    },

    watch: {
        media(newValue, oldValue) {
            this.$refs['video-el'].src = this.offset;
            this.$refs['video-el'].offset = this.offset;
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
