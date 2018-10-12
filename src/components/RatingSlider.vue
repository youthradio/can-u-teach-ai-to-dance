<template>
  <div>
    <div class="slidecontainer">
      <input 
        id="myRange" 
        type="range" 
        min="1" 
        max="100" 
        value="50" 
        class="slider">
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
      startData: "HELLO"
    }
  },
  computed: {

  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

.slider{
  width: 100%;
}
</style>
