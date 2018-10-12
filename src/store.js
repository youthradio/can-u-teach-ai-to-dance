import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  isLoading: false,
  spotifyData: null,
}
const actions = {
  fetchData ({ commit }) {
    commit('SPOTIFY_DATA');
  }
}
const mutations = {
  async SPOTIFY_DATA(state){
    state.isLoading = true;
    state.spotifyData = require('./assets/data.json')
    state.isLoading = false;
  },
}
export default new Vuex.Store({
  mutations,
  state,
  actions
})
//
// const QUERY = (id) => `
// query {
//   quiz: getQuizById( id: "${id}" ){
//     id
//     description
//     featureImage
//     questions {
//       id
//       questionOrder
//       questionText
//       featureImage
//       options{
//         id
//         optionText
//         resultText
//         correctOption
//       }
//     }
//   }
// }
// `
