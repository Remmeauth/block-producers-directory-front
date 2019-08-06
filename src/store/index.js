import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import userPage from './modules/userPage'

const store = new Vuex.Store({
  modules: {
    userPage: userPage
  }
})

export default store
