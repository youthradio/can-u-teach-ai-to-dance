import Vue from 'vue'
import Vuex from 'vuex'
import { csvParse } from 'd3-dsv'

Vue.use(Vuex)

const state = {
  isLoading: false,
  spotifyData: null,
  scoreData: null,
}
const actions = {
  fetchData ({ commit }) {
    commit('SPOTIFY_DATA');
  }
}
const mutations = {
  async SPOTIFY_DATA(state){
    state.isLoading = true;
    state.spotifyData = require('./assets/data.json');
    state.spotifyData.sort(() => 0.5 - Math.random()); //shuffle array
    state.scoreData =  await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTZDw_gJOKY1yHVXH7blg-xbsfJJVw-3wUzoUE5rv0tcwSuDWxmIjnvivVd6vRumReiKlOTJamj6TLA/pub?gid=578222043&single=true&output=csv`)
    .then(res => res.text())
    .then(res => csvParse(res));
    state.isLoading = false;
  },
}
export default new Vuex.Store({
  mutations,
  state,
  actions
})
