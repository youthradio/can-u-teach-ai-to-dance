<template>
  <div>
    <div class="slidecontainer">
      <div class="d-flex no-wrap justify-content-between numbers">
        <div
          v-for="num in values"
          :key="num"
          :style="numberStyle(num)"
          v-html="num"/>
      </div>
      <div class="position-relative mt-3 text-center">
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
        <div>Hard to Dance</div>
        <div>Easy to Dance</div>
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
      values: [0,1,2,3,4,5,6,7,8,9,10]
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
.numbers {
  font: 900 1rem/1.05 "Days Sans Black", sans-serif;
  letter-spacing: 0.64px;
  text-transform: uppercase;
  // div {
  //   width: 100%;
  //   text-align: center;
  // }
}
input[type=range] {
  -webkit-appearance: none;
  background: transparent;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: $sky-blue;
  height: 2.5rem;
  width: 0.8rem;
  margin-top: calc(-2.5rem/2);
  border-radius: 99px;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 300px;
  height: 4px;
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
