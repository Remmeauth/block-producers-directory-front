import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import indexPage from './modules/indexPage'
import userPage from './modules/userPage'

const store = new Vuex.Store({
  modules: {
    indexPage: indexPage,
    userPage: userPage
  }
})

export default store
