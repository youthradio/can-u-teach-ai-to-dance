<template>
  <div class="row">
    <div class="col">
      <div class="text-center my-2">
        <h1>How Dancible is X by Y</h1>
      </div>
      <AlbumInfo 
        :song-data="currentSongData" 
        class="my-4" />
      <div class="text-center my-4">
        <h2>Rate the song here</h2>
      </div>
      <RatingSlider class="my-4"/>
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
      currentSong: 0,
    }
  },
  computed: {
    spotifyData(){
      return this.$store.state.spotifyData;
    },
    currentSongData(){
      return this.spotifyData[this.currentSong];
    }
  },
  methods: {
    nextQuestion(){

    }
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
