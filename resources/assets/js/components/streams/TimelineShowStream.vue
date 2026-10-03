<template>
  <div :id="`stream-${stream.id}`" :class="{'d-flex': true, active: isActive}">
    <div class="channel-cell">
        <div style="position: relative;" class="w-100 h-100">
            <h4 v-if="! stream.menu_image">{{ stream.name }}</h4>
            <img v-else :src="paths.logos + '/' + stream.menu_image" />
        </div>
    </div>

    <div class="track" :style="{ width: 24 * pxPerHour + 'px' }">
      <div
        v-for="item in scheduled"
        :key="stream.id + '-' + item.episode.id"
        class="slot"
        :style="item.style"
      >
        <stream-episode
          :episode="item.episode"
          :is-active="item.episode.id === currentEpisode.id"
          :stream="stream"
        ></stream-episode>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineShowStream',

  props: {
    currentEpisode: { type: Object, default: () => ({}) },
    isActive: { type: Boolean, default: false },
    paths: { type: Object, required: true },
    pxPerHour: { type: Number, default: 300 },
    stream: { type: Object, required: true },
  },

  computed: {
    scheduled() {
      let cursor = this.stream.start_offset || 0;
      return this.stream.stream_episodes.map(se => {
        const duration = se.episode.drive[0].pivot.duration;
        const style = {
          left: (cursor / 3600) * this.pxPerHour + 'px',
          width: (duration / 3600) * this.pxPerHour + 'px',
        };
        cursor += duration;
        return { episode: se.episode, style };
      });
    },
  },
};
</script>

<style scoped>
.channel-cell {
  flex: 0 0 400px;
  position: sticky;
  left: 0;
  z-index: 2;
  background: linear-gradient(0.25turn, black, black, black, transparent);
}
.channel-cell img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.track {
  position: relative;
  flex: 0 0 auto;
  height: 150px;
}
.active {
    border: 1px solid #ccc;
    background: #1f1f1f;
}
.slot {
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 2px;
}
</style>