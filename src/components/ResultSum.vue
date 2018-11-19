<template>
  <div class="row">
    <div class="col-12">
      <div class="text-center">
        <h3>
          <span class="song-title">{{ scorePage.title }}</span>
        </h3>
      </div>

      <p>
        {{ scorePage.description }}
      </p>

      <div class="row">
        <div class="col-12 mx-auto">
          <div
            class="text-center box">
            <video
              loop
              muted
              autoplay
              playsinline
              class="fullscreen-bg__video">
              <source
                :src="backImage"
                type="video/mp4">
            </video>
          </div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Song</th>
            <th scope="col">Spotify</th>
            <th scope="col">You</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(song, ind) in songsData"
            :key="`tb-${song.songName}`">
            <td>
              <strong>{{ song.songName }}</strong>
              by
              <strong>{{ song.artistName }}</strong>
            </td>
            <td>{{ song.danceability | formatNumber }}</td>
            <td>{{ userRates[ind]/10 | formatNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CommonUtils from '../mixins/CommonUtils'

export default {
  name: 'ResultSum',
  mixins: [
    CommonUtils,
  ],
  props: {
    songsData: {
      type: Array,
      default: null,
      require: true,
    },
    userRates: {
      type: Array,
      default: null,
      require: true,
    }
  },
  data() {
    return {
      startData: "HELLO"
    }
  },
  computed: {
    totalScore(){
      //sum total score abs(user - spotify)
      return this.songsData.reduce((acc, e, ind) => acc + Math.abs(e.danceability*10 - this.userRates[ind]), 0)/this.songsData.length;
    },
    scorePage() {
       if (!this.isLoading) {
         return this.$store.state.scoreData.find(score => {
           const range = score.scoreRange
                              .split('-')
                              .map(e => parseFloat(e))
           return this.totalScore >= range[0] && this.totalScore <= range[1];
         })
       }
     },
     backImage() {
       return `data/score/${this.scorePage.gif}.mp4`
     },
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/styles/variables';

.slider {
    width: 100%;
}
.overlay{
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.box {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
}
.fullscreen-bg__video {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    transform-origin: center;
    transform: translateX(-50%);
}
</style>
