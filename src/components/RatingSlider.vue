<template>
  <div>
    <div class="slidecontainer">
      <div class="d-flex no-wrap justify-content-between numbers">
        <div
          v-for="num in 11"
          :key="num"
          :style="numberStyle(num - 1)"
          v-html="num - 1"/>
      </div>
      <div class="position-relative mt-4 text-center">
        <input
          v-model="sliderValue"
          type="range"
          min="0"
          step="0.01"
          max="10"
          class="slider"
          @mousedown="click()"
          @touchstart="click()">
        <div
          v-if="!hasCliked && showHelper"
          class="thumb-tooltip">
          <div class="icon-arrow-right pulse-long"/>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <div>Um...No.</div>
        <div>Go crazy!</div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'

export default {
  name: 'RatingSlider',
  mixins: [
    CommonUtils,
  ],
  props: {
    showHelper: {
      type: Boolean,
      default: true,
      require: true,
    },
  },
  data() {
    return {
      sliderValue: 0.0,
      hasCliked: false,
    }
  },
  computed: {

  },
  watch: {
    sliderValue(){
      this.$emit('hasChanged', this.sliderValue);
    }
  },
  mounted() {
    //do something after mounting vue instance

  },
  methods: {
    click(){
      this.hasCliked = true;
    },
    numberStyle (value){
      const v = 1 + 2*Math.exp(-2*Math.abs(this.sliderValue - value))
      return {
        transform: `scale(${v})`,
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

.slider{
  width: 100%;
  z-index: 1000;
}
input[type=range] {
  -webkit-appearance: none;
  background: transparent;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: transparent;
}
//webkit
input[type=range]::-webkit-slider-thumb {
  cursor: pointer;
  -webkit-appearance: none;
  background: $sky-blue;
  height: 3.5rem;
  width: 1.5rem;
  margin-top: calc(-3.5rem/2);
  border-radius: 50px;
  border-width: 0px;
}
//firefox
input[type=range]::-moz-range-thumb {
  cursor: pointer;
  background: $sky-blue;
  height: 3.5rem;
  width: 1.5rem;
  margin-top: calc(-3.5rem/2);
  border-radius: 50px;
  border-width: 0px;
}
//ie
input[type=range]::-ms-thumb {
  cursor: pointer;
  background: $sky-blue;
  height: 3.5rem;
  width: 1.5rem;
  margin-top: calc(-3.5rem/2);
  border-radius: 50px;
  border-width: 0px;
}

input[type=range]::-webkit-slider-runnable-track {
  height: 5px;
  background: $dark;
  cursor: pointer;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: $dark;
}

input[type=range]::-moz-range-track {
  height: 5px;
  background: $dark;
  cursor: pointer;
}

input[type=range]::-ms-track {
  height: 5px;
  background: $dark;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-upper {
  background: $dark;
}
.thumb-tooltip {
  z-index: 0;
  font-size: 2rem;
  display: flex;
  position: absolute;
  top: -1px;
  left: 5%;
  color: $red;
}
</style>
