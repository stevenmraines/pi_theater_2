<template>
  <div :class="{'d-flex': true, active: isActive}">
    <div class="channel-cell">
      <h4>{{ stream.name }}</h4>
    </div>

    <div class="track" :style="{ width: 24 * pxPerHour + 'px' }">
      <div
        v-for="item in scheduled"
        :key="stream.id + '-' + item.media.id"
        class="slot"
        :style="item.style"
      >
        <stream-media
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
    isActive: { type: Boolean, default: false },
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
  flex: 0 0 225px;
  position: sticky;
  left: 0;
  z-index: 2;
  background: #777;
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