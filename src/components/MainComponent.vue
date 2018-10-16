<template>
  <div class="row">
    <div class="col-12 col-md-6 mx-auto">
      <div class="text-center my-2">
        <h2>How Dancible is
          <span class="song-title">{{ currentSongData.songName }}</span>
          by
          <span class="song-title">{{ currentSongData.artistName }}</span>
        </h2>
      </div>
      <template v-if="!seeResult">
        <TopPanel
          :song-data="currentSongData"
          :user-rate="sliderValue"
          :has-voted="hasVoted"
          class="my-4" />
        <div class="text-center my-4">
          <h3>Listen to the song and rate it here</h3>
        </div>
        <RatingSlider
          :show-helper="showHelper"
          class="my-4"
          @hasChanged="sliderHasChanged" />
      </template>
      <template v-else>
        <ResultPanel
          :user-rate="sliderValue"
          :song-data="currentSongData"
          class="my-4" />
      </template>
      <template v-if="hasVoted">
        <div class="float-right">
          <div
            class="d-flex align-items-center pointer"
            @click="nextButton">
            <template v-if="pageState === 0">
              Compare with what's spotify think?
            </template>
            <template v-else-if="pageState === 1">
              Next Song
            </template>
            <template v-else-if="pageState === 2">
              See Overall Results
            </template>
            <div class="icon-arrow-right arrow pulse ml-3"/>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'
import RatingSlider from './RatingSlider.vue'
import TopPanel from './TopPanel.vue'
import ResultPanel from './ResultPanel.vue'

export default {
  name: 'MainComponent',
  components: {
    RatingSlider,
    TopPanel,
    ResultPanel
  },
  mixins: [
    CommonUtils,
  ],
  data() {
    return {
      pageState: 0,
      currentSong: 0,
      hasVoted: false,
      sliderValue: 0,
      seeResult: false,
      userRates: [],
      showHelper: true,
    }
  },
  computed: {
    spotifyData() {
      return this.$store.state.spotifyData;
    },
    currentSongData() {
      return this.spotifyData[this.currentSong];
    }
  },
  methods: {
    sliderHasChanged(value) {
      this.sliderValue = Number(value);
      this.hasVoted = true;
      this.showHelper = false;
    },
    nextButton() {
      switch(this.pageState){
        case 0:
          this.seeResult = true;
          this.userRates.push(this.sliderValue);
          this.pageState = 1
          if(this.currentSong >= this.spotifyData.length - 1){
            this.pageState = 2
          }
          break;
        case 1:
          this.seeResult = false;
          this.hasVoted = false
          this.currentSong++;
          this.pageState = 0
          break;
        case 2:
          alert("OVERALL");
          break;
      }
    },
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
.song-title {
    font-weight: 800;
    color: $green;
}
</style>
