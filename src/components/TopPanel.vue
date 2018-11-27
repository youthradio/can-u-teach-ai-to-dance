<template>
  <div class="row">
    <div class="col-12 mx-auto">
      <div
        class="text-center box">
        <div
          :style="backImage"
          class="boxx"/>
        <div class="progress-number numbers">
          <h3>{{ progress }}</h3>
        </div>
        <vue-plyr
          ref="audioPlayer"
          :options="playerOptions"
          :emit="['play']"
          class="overlay"
          @play="onAudioPlay">
          <audio>
            <source
              :src="require(`../assets/data/${songData.trackFile}`)"
              type="audio/mp3">
          </audio>
        </vue-plyr>
      </div>
    </div>
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
    pageState: {
      type: Number,
      default: 0,
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
      playerVolume: 1.0
    }
  },
  computed: {
    playerOptions() {
      return {
        hideYouTubeDOMError: true,
        iconUrl: process.env.BASE_URL + 'plyr.svg',
        'volume': 1,
        'fullscreen': false,
        'loop': { active: false },
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
        "background-image": 'url(' + require(`../assets/data/${this.songData.albumImageFile}`) + ')'
      };
    }
  },
  watch: {
    playerVolume(){
      this.$refs.audioPlayer.player.volume = this.playerVolume
    },
    songData() {
      this.fade("out");
    }
  },
  methods: {
    onAudioPlay() {
      this.playerVolume = 0.0
      this.fade("in")
    },
    fade(mode) {
      setTimeout(() => {
        const inc = (mode === "out" ? -0.1 : 0.1);
        this.playerVolume += inc
        if(this.playerVolume > 0.0 && this.playerVolume  < 1.0) {
          return this.fade(mode);
        } else {
          if(mode === "out"){
            this.$refs.audioPlayer.player.media.load();
          }
          this.playerVolume = 1.0;
          return
        }
      }, 100)
   }
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
  z-index: 2000;
}
.box {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
}

.boxx {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1500;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-bottom: 100%;
}
.row > div {
    -webkit-transition: all 0.6s ease-in-out;
    -moz-transition: all 0.6s ease-in-out;
    -o-transition: all 0.6s ease-in-out;
    transition: all 0.6s ease-in-out;

}
</style>
