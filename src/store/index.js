import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import indexPage from './modules/indexPage'
import userPage from './modules/userPage'
import authentication from './modules/authentication'

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    indexPage: indexPage,
    userPage: userPage
  }
})

export default store
