<template>
  <div
    :style="!hasVoted? backImage: backImageGif(userRate)"
    class="text-center box">
      <div class="progress-number numbers">
        <h3>{{progress}}</h3>
      </div>
    <vue-plyr
      ref="audioPlayer"
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
          'pip', // Picture-in-picture (currently Safari only)
          'airplay' // Airplay (currently Safari only)
          // 'settings' // Settings menu
        ]
      }
    },
    backImage() {
      return {
        "background-image": `url(data/${this.songData.albumImageFile})`
      };
    },
  },
  watch: {
    songData() {
      this.$refs.audioPlayer.player.media.load()
    }
  },
  methods: {
    backImageGif(score) {
      return {
        "background-image": `url(data/gifs/${Math.floor(score)}.gif)`
      };
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
}
</style>
