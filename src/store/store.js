import Vue from 'vue'
import Vuex from 'vuex'

import mlb from './modules/mlb'

Vue.use(Vuex)

export default new Vuex.Store({
  strict : process.env.NODE_ENV !== 'production',
  modules: {
    mlb
  }
})