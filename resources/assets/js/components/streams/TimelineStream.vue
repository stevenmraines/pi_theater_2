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
        :key="stream.id + '-' + item.media.id"
        class="slot"
        :style="item.style"
      >
        <stream-media
          :is-active="item.media.id === currentMedia.id"
          :media="item.media"
          :stream="stream"
        ></stream-media>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineStream',

  props: {
    currentMedia: { type: Object, default: () => ({}) },
    isActive: { type: Boolean, default: false },
    paths: { type: Object, required: true },
    pxPerHour: { type: Number, default: 300 },
    stream: { type: Object, required: true },
  },

  computed: {
    // Lay movies out back-to-back, starting at midnight
    // (or at stream.start_offset, in seconds since midnight, if you add one).
    scheduled() {
      let cursor = this.stream.start_offset || 0; // seconds
      return this.stream.media.map(sm => {
        const duration = sm.media.drive[0].pivot.duration; // seconds
        const style = {
          left: (cursor / 3600) * this.pxPerHour + 'px',
          width: (duration / 3600) * this.pxPerHour + 'px',
        };
        cursor += duration;
        return { media: sm.media, style };
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