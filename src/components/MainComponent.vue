<template>
  <div class="row">
    <div class="col-12 col-md-6 mx-auto">
      <div class="text-center my-2">
        <h1>How Dancible is
          <span class="song-title">{{ currentSongData.songName }}</span>
          by
          <span class="song-title">{{ currentSongData.artistName }}</span>
        </h1>
      </div>
      <AlbumInfo
        :song-data="currentSongData"
        class="my-4" />
      <div class="text-center my-4">
        <h3>Listen to the song and rate it here</h3>
      </div>
      <RatingSlider 
        class="my-4" 
        @hasChanged="sliderHasChanged"/>
      <ResultPanel
        :user-rate="sliderValue"
        :song-data="currentSongData"
        class="my-4" />
      <div class="float-right">
        <div
          v-if="hasVoted"
          class="d-flex align-items-center pointer">
          <div>
            Compare with what's spotify think?
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
import ResultPanel from './ResultPanel.vue'

export default {
  name: 'MainComponent',
  components: {
    RatingSlider,
    AlbumInfo,
    ResultPanel
  },
  mixins: [
    CommonUtils,
  ],
  data() {
    return {
      currentSong: 0,
      hasVoted: false,
      sliderValue: 0,
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
    sliderHasChanged(value) {
      this.sliderValue = Number(value);
      this.hasVoted = true;
    },
    nextQuestion(){

    },
    compareResult(){

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

.arrow {
    color: $sky-blue;
    font-size: 2rem;
}
.song-title{
  font-weight: 800;
  color: $green;
}
</style>
