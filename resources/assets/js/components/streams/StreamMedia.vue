<template>
    <div class="stream-media" @click="onStreamMediaClick">
        <h6>{{ media.title }} ({{ media.movie_year.year_released }})</h6>
        <p :title="media.summary">{{ media.summary }}</p>
        <em>{{ runtimeString }}</em>
    </div>
</template>

<script>
export default {
    name: 'StreamMedia',

    props: [
        'media',
        'stream',
    ],

    data() {
        return {

        };
    },

    computed: {
        runtimeString() {
            const secs = this.media.drive[0].pivot.duration;
            const hours = parseInt(secs / (60 * 60));
            const mins = parseInt(((secs / (60 * 60)) - hours) * 60);
            return `${hours}h ${mins}m`;
        },
    },

    methods: {
        onStreamMediaClick() {
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
    text-overflow: ellipsis;
}
</style>
