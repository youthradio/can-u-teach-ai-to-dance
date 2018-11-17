<template>
  <div
    :style="backImage"
    class="text-center box">
    <video
      v-for="ngif in 11"
      ref="videoPlayer"
      :style="zIndex(ngif - 1)"
      :key="`video-${ngif}`"
      :hidden="!hasVoted"
      loop
      muted
      autoplay
      playsinline
      class="fullscreen-bg__video">
      <source
        :src="backImageGif(ngif - 1)"
        type="video/mp4">
    </video>
    <div class="progress-number numbers">
      <h3>{{ progress }}</h3>
    </div>
    <vue-plyr
      :options="playerOptions"
      class="overlay">
      <audio>
        <source
          :src="`data/${songData.trackFile}`"
          type="audio/mp3">
      </audio>
    </vue-plyr>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'
import VuePlyr from './VuePlyr.vue'

export default {
  name: 'TopPanel',
  components: {
    VuePlyr
  },
  mixins: [
    CommonUtils,
  ],
  props: {
    songData: {
      type: Object,
      default: null,
      require: true,
    },
    userRate: {
      type: Number,
      default: 0,
      require: true,
    },
    hasVoted: {
      type: Boolean,
      default: false,
      require: true,
    },
    progress: {
      type: String,
      default: '0/0',
      require: true,
    }
  },
  data() {
    return {
      startData: "HELLO"
    }
  },
  computed: {
    playerOptions() {
      return {
        hideYouTubeDOMError: true,
        iconUrl: process.env.BASE_URL + 'plyr.svg',
        'volume': 1,
        'fullscreen': false,
        'loop': { active: true },
        controls:
        [
          // 'play-large', // The large play button in the center
          // 'restart', // Restart playback
          // 'rewind', // Rewind by the seek time (default 10 seconds)
          'play', // Play/pause playback
          // 'fast-forward', // Fast forward by the seek time (default 10 seconds)
          // 'progress', // The progress bar and scrubber for playback and buffering
          // 'current-time', // The current time of playback
          // 'duration', // The full duration of the media
          // 'mute', // Toggle mute
          // 'volume', // Volume control
          // 'pip', // Picture-in-picture (currently Safari only)
          // 'airplay' // Airplay (currently Safari only)
          // 'settings' // Settings menu
        ]
      }
    },
    backImage() {
      return {
        "background-image": `url(data/${this.songData.albumImageFile})`
      };
    },
    posterImage() {
      return `data/${this.songData.albumImageFile}`
    },
  },
  watch: {
    songData() {
      this.$refs.audioPlayer.player.media.load()
    }
  },
  methods: {
    backImageGif(id) {
      return `data/gifs/${id}.mp4`
    },
    zIndex(id) {
      const z = (id === Math.floor(this.userRate) ? "1000" : "0");
      return {
        "z-index": z
      }
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

.slider {
    width: 100%;
}
.overlay{
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 2000;
}
.progress-number {
  position: absolute;
  top: 2%;
  right: 2%;
  color: $white;
  text-shadow: 1px 1px 1px $dark;
}
.box {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
}
.fullscreen-bg__video {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    transform-origin: center;
    transform: translateX(-50%);
}
</style>
