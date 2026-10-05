<template>
  <div class="timeline">
    <div class="timeline-inner" :style="{ width: totalWidth + 'px' }">
      <!-- time header -->
      <div class="d-flex header">
        <div class="channel-cell-header pl-3">Channel</div>
        <div class="track" :style="{ width: trackWidth + 'px' }">
          <div
            v-for="(n, index) in [12,1,2,3,4,5,6,7,8,9,10,11]"
            :key="index + 'AM'"
            :id="n + '-am'"
            class="hour"
            :style="{ left: index * pxPerHour + 'px', width: pxPerHour + 'px' }"
          >
            {{ (n.toString().length === 1 ? '0' : '') + n }}:00 AM
          </div>
          <div
            v-for="(n, index) in [12,1,2,3,4,5,6,7,8,9,10,11,12,1]"
            :key="index + 'PM'"
            :id="n + ((n === 12 || n === 1) && index !== 0 && index !== 1 ? '-am' : '-pm')"
            class="hour"
            :style="{ left: (index + 12) * pxPerHour + 'px', width: pxPerHour + 'px' }"
          >
            {{ (n.toString().length === 1 ? '0' : '') + n }}:00
            {{ (n === 12 || n === 1) && index !== 0 && index !== 1 ? 'AM' : 'PM' }}
          </div>
        </div>
      </div>

      <div v-for="stream in streams" :key="stream.id">
        <timeline-stream
          v-if="stream.type !== 'show'"
          :current-media="currentMedia"
          :is-active="stream.id === streamId"
          :paths="paths"
          :px-per-hour="pxPerHour"
          :stream="stream"
        ></timeline-stream>
        
        <timeline-show-stream
          v-else
          :current-episode="currentEpisode"
          :is-active="stream.id === streamId"
          :paths="paths"
          :px-per-hour="pxPerHour"
          :stream="stream"
        ></timeline-show-stream>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',

  props: {
    currentEpisode: { type: Object, default: () => ({}) },
    currentMedia: { type: Object, default: () => ({}) },
    streamId: { type: Number, required: true },
    streams: { type: Array, default: () => [] },
    paths: { type: Object, required: true },
    pxPerHour: { type: Number, default: 300 },
  },

  data() {
    return {
      channelWidth: 150, // keep in sync with .channel-cell in the CSS
    };
  },

  computed: {
    trackWidth() {
      return 26 * this.pxPerHour;
    },
    totalWidth() {
      return this.channelWidth + this.trackWidth;
    },
  },
};
</script>

<style scoped>
.timeline {
  overflow: auto;
  /* max-height: 400px; */
}
.timeline-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}
.header {
    position: sticky;
    top: 0;
    color: black;
    background-color: #999;
    z-index: 3;
}
.channel-cell-header {
  flex: 0 0 220px;
}
.track {
  position: relative;
  flex: 0 0 auto;
}
.hour {
  position: absolute;
  top: 0;
  box-sizing: border-box;
  border-left: 2px solid black;
  padding-left: 4px;
}
</style>