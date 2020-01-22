import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fresh: true
  },
  getters: {
    Fresh (state) { return state.fresh}
  },
  mutations: {
    setFresh (state, fresh) {
      state.fresh = fresh
    }
  }
})
