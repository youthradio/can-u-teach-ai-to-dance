<template>
  <div class="row">
    <div class="col-6">
      <div class="d-flex justify-content-between numbers p-1">
        <span class="no-bold">You</span>
        <span>{{ userRate }}</span>
      </div>
      <div
        class="text-center box">
        <video
          v-for="(gif, i) in gifsState"
          ref="videoPlayer"
          :style="zIndex(i)"
          :key="`video-${i}`"
          loop
          muted
          autoplay
          playsinline
          class="fullscreen-bg__video">
          <source
            v-if="gif.enable"
            :src="gif.url"
            type="video/mp4">
        </video>
      </div>
    </div>
    <div class="col-6">
      <div class="d-flex justify-content-between numbers p-1">
        <span class="no-bold">Spotify</span>
        <span>{{ spotifyComputedRate }}</span>
      </div>
      <template v-if="pageState == 1 || pageState == 2">
        <div
          class="text-center box">
          <video
            loop
            muted
            autoplay
            playsinline
            class="fullscreen-bg__video">
            <source
              :src="backImageGif(10*songData.danceability)"
              type="video/mp4">
          </video>
        </div>
      </template>
      <template v-else>
        <div class="d-flex justify-content-center align-items-center h-100">
          <span class="question-mark numbers">?</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'

export default {
  name: 'ResultPanel',
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
    pageState: {
      type: Number,
      default: 0,
      require: true,
    }
  },
  data() {
    return {
      startData: "HELLO",
      gifsState: null,
    }
  },
  computed: {
    backImage() {
      return {
        "background-image": 'url(' + require(`../assets/data/${this.songData.albumImageFile}`) + ')'
      };
    },
    userRateChange() {
      return Math.floor(this.userRate);
    },
    spotifyComputedRate() {
      return this.pageState === 0 ? '?' : this.$options.filters.formatNumber(this.songData.danceability);
    }
  },
  watch: {
    userRateChange() {
      this.gifsState[this.userRateChange].enable = true;
    },
    pageState() {
      document.querySelectorAll('video').forEach(v=> v.play())
    }
  },
  created() {
    this.gifsState = new Array(11).fill()
      .map((e,i) => ({
        enable: i > 0? false: true,
        url: this.backImageGif(i)
      })
    )
  },
  methods: {
    backImageGif(score) {
        return require(`../assets/data/gifs/${Math.floor(score)}.mp4`)
    },
    zIndex(id) {
      const z = (id === this.userRateChange ? "1000" : "-1000");
      return {
        "z-index": z
      }
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
}
.no-bold{
  font-size: 0.8rem;
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
.question-mark {
  color: $sky-blue;
  font-size: 5rem;

}
</style>
