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
          v-for="ngif in 11"
          ref="videoPlayer"
          :style="zIndex(ngif - 1)"
          :key="`video-${ngif}`"
          loop
          muted
          autoplay
          playsinline
          class="fullscreen-bg__video">
          <source
            v-if="(ngif-1) === Math.floor(userRate)"
            :key="`source-video-${ngif}`"
            :src="backImageGif(ngif - 1)"
            type="video/mp4">
        </video>
      </div>
    </div>
    <div class="col-6">
      <div class="d-flex justify-content-between numbers p-1">
        <span class="no-bold">Spotify</span>
        <span>{{ spotifyComputedRate }}</span>
      </div>
      <template v-if="pageState == 1">
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
      show: true,
    }
  },
  computed: {
    backImage() {
      return {
        "background-image": `url(data/${this.songData.albumImageFile})`
      };
    },
    spotifyComputedRate() {
      return this.pageState === 0 ? '?' : this.$options.filters.formatNumber(this.songData.danceability);
    }
  },
  watch: {
    pageState() {
      document.querySelectorAll('video').forEach(v=> v.play())
    }
  },
  methods: {
    backImageGif(score) {
        return `data/gifs/${Math.floor(score)}.mp4`
    },
    zIndex(id) {
      const z = (id === Math.floor(this.userRate) ? "1000" : "-1000");
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
