<template>
    <div :id="stream.id + '-' + episode.id" class="stream-media" :class="{ active: isActive }" @click="onStreamEpisodeClick">
        <h6>
            {{ `s${episode.season} e${episode.episode_number} - ${episode.title}` }}
        </h6>
        <p :title="episode.summary">{{ episode.summary }}</p>
        <em>{{ runtimeString }}</em>
    </div>
</template>

<script>
export default {
    name: 'StreamEpisode',

    props: {
        episode: { type: Object, default: () => ({}) },
        isActive: { type: Boolean, default: false },
        stream: { type: Object, required: true },
    },

    computed: {
        runtimeString() {
            const secs = this.episode.drive[0].pivot.duration;
            const hours = parseInt(secs / (60 * 60));
            const mins = parseInt(((secs / (60 * 60)) - hours) * 60);
            return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
        },
    },

    methods: {
        onStreamEpisodeClick() {
            window.location = `/stream/${this.stream.id}`;
        },
    },
}
</script>

<style scoped>
.stream-media {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  border-right: 1px solid #ccc;
}

.stream-media p {
/*    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 440px;
    max-height: 70px;*/
}

.active {
    background-color: rgba(237, 178, 31, 0.1);
    border: 1px solid rgb(237,178,31);
}
</style>
