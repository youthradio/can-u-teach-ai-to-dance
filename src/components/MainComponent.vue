<template>
  <div class="row">
    <div class="col-12 col-md-6 mx-auto">
      <div
        v-if="pageState < 3"
        class="text-center my-2">
        <h3>How danceable is
          <span class="song-title">{{ currentSongData.songName }}</span>
          by
          <span class="song-title">{{ currentSongData.artistName }}</span>
        </h3>
      </div>
      <template v-if="pageState < 3">
        <TopPanel
          :progress="getProgress"
          :song-data="currentSongData"
          :user-rate="sliderValue"
          :has-voted="hasVoted"
          :page-state="pageState"
          class="my-1" />
      </template>
      <template v-if="pageState === 0">
        <transition name="fade">
          <template v-if="!hasVoted">
            <div class="text-center">
              <h4>Play the song and rate it</h4>
            </div>
          </template>
        </transition>
        <RatingSlider
          :show-helper="showHelper"
          class="my-4 mx-3"
          @hasChanged="sliderHasChanged" />
      </template>
      <template v-if="hasVoted && pageState < 3">
        <ResultPanel
          :user-rate="sliderValue"
          :song-data="currentSongData"
          :page-state="pageState"/>
        <div
          v-if="pageState === 0"
          class="float-right">
          <div
            class="button-next d-flex align-items-center pointer"
            @click="nextButton">
            Compare to Spotify
            <div class="icon-arrow-right arrow pulse ml-3"/>
          </div>
        </div>
        <div
          v-if="pageState === 1"
          class="float-right">
          <div
            class="button-next d-flex align-items-center pointer"
            @click="nextButton">
            Next track
            <div class="icon-arrow-right arrow pulse ml-3"/>
          </div>
        </div>
        <div
          v-if="pageState === 2"
          class="float-right">
          <div
            class="button-next d-flex align-items-center pointer"
            @click="nextButton">
            Results
            <div class="icon-arrow-right arrow pulse ml-3"/>
          </div>
        </div>
      </template>
      <template v-else-if="pageState === 3">
        <ResultSum
          :user-rates="userRates"
          :songs-data="spotifyData"/>
        <div class="float-left">
          <div
            class="button-next d-flex align-items-center pointer"
            @click="nextButton">
            <div class="icon-arrow-left arrow pulse-left mx-1"/>
            Try Again
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
import ResultSum from './ResultSum.vue'

export default {
  name: 'MainComponent',
  components: {
    RatingSlider,
    TopPanel,
    ResultSum,
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
      userRates: [],
      showHelper: false,
    }
  },
  computed: {
    spotifyData() {
      return this.$store.state.spotifyData;
    },
    currentSongData() {
      return this.spotifyData[this.currentSong];
    },
    getProgress(){
      return `${this.currentSong + 1}/${this.spotifyData.length}`;
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
        case 0: //start
          this.userRates.push(this.sliderValue);
          this.pageState = 1
          if(this.currentSong >= this.spotifyData.length - 1){
            this.pageState = 2
          }
          break;
        case 1://show spotify data / compare
          this.hasVoted = false
          this.currentSong++;
          this.pageState = 0
          break;
        case 2://results
          this.pageState = 3;
          break;
        case 3://results
          this.pageState = 0;
          this.currentSong = 0;
          this.hasVoted = false;
          this.userRates = [];
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
}
.song-title {
    font-weight: 800;
    color: $green;
}
.button-next {
  background-color: #fff;
  border: 0.15rem solid $dark;
  border-radius: 10px;
  padding: .5rem .5rem;
  margin: 1rem;
  font-size: 1rem !important;
  box-shadow: 0.25rem 0.25rem #00cec3;
}
.button-next:hover {
    box-shadow: 0.1rem 0.1rem $dark;
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.0;
}
</style>
