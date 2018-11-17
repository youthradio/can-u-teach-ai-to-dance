<template>
  <div class="row">
    <div class="col-6">
      <div
        class="text-center box">
        <video
          loop
          muted
          autoplay
          playsinline
          class="fullscreen-bg__video">
          <source
            :src="backImageGif(userRate)"
            type="video/mp4">
        </video>
      </div>
      <div class="d-flex justify-content-between numbers p-2">
        <span class="no-bold">You</span>
        <span>{{ userRate }}</span>
      </div>
    </div>
    <div class="col-6">
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
      <div class="d-flex justify-content-between numbers p-2">
        <span class="no-bold">Spotify</span>
        <span>{{ songData.danceability | formatNumber }}</span>
      </div>
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
    }
  },
  data() {
    return {
      startData: "HELLO"
    }
  },
  computed: {
    backImage() {
      return {
        "background-image": `url(data/${this.songData.albumImageFile})`
      };
    },
  },
  methods: {
    backImageGif(score) {
        return `data/gifs/${Math.floor(score)}.mp4`
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
</style>
