<template>
  <div>
    <img 
      class="img-fluid" 
      src="data/Frank_Ocean.jpg">
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'

export default {
  name: 'AlbumInfo',
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
