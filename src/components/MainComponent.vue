<template>
  <div class="row">
    <div class="col">
      <template v-if="!isLoading">
        {{ startData }}
      </template>
      <template v-else>
        Loading...
      </template>

      <AlbumInfo/>
      <RatingSlider/>
      <div class="float-right">
        <div class="d-flex align-items-center pointer">
          <div>
            Next Song
          </div>
          <div
            class="icon-arrow-right arrow pulse ml-3"
            @click="nextQuestion" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'
import RatingSlider from './RatingSlider.vue'
import AlbumInfo from './AlbumInfo.vue'

export default {
  name: 'MainComponent',
  components: {
    RatingSlider,
    AlbumInfo
  },
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

.arrow {
    color: $sky-blue;
    font-size: 2rem;
}
</style>
