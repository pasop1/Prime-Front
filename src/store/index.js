import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    getTestAction({commit}){
    axios('http://localhost:3000/test').then(res => {
     
      commit('getTest', res.data)
    })
  },
  },
  modules: {
  }
})
