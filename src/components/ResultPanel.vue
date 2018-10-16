<template>
  <div class="row">
    <div class="col-6">
      <div
        :style="backImageGif(userRate)"
        class="text-center box"/>
      <div class="d-flex justify-content-between numbers p-2">
        <span>You</span>
        <span>{{ userRate }}</span>
      </div>
    </div>
    <div class="col-6">
      <div
        :style="backImageGif(10*songData.danceability)"
        class="text-center box"/>
      <div class="d-flex justify-content-between numbers p-2">
        <span>Spotify</span>
        <span>{{ songData.danceability | formatNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'

export default {
  name: 'ResultPanel',
  filters: {
    formatNumber(number) {
      return (number*10).toFixed(2);
    }
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
.box {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-bottom: 100%;
  position: relative;
}
.numbers {
  font: 900 1.1rem/1.05 "Days Sans Black", sans-serif;
  letter-spacing: 0.64px;
  text-transform: uppercase;
  color: $white;
  background-color: $dusk;
}
</style>
