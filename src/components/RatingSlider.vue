<template>
  <div>
    <div class="slidecontainer">
      <div class="d-flex no-wrap numbers justify-content-between">
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
          v-if="!hasCliked"
          class="thumb-tooltip">
          <div class="icon-arrow-left pulse-left px-3"/>
          <div class="icon-arrow-right pulse px-3"/>
        </div>
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
  data() {
    return {
      sliderValue: 4.94,
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
      const v = Math.exp(1/(1 + Math.abs(this.sliderValue - value)))/Math.exp(1/11)
      return {
        transform: `scale(${v})`,
        opacity: `${v/2}`,
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
  font: 900 1.5rem/1.05 "Days Sans Black", sans-serif;
  letter-spacing: 0.64px;
  text-transform: uppercase;
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
  display: flex;
  position: absolute;
  left: 43%;
  top: 90%;
}
</style>
