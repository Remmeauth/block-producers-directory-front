import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import userPage from './modules/userPage'
import authentication from './modules/authentication'

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    userPage: userPage,
  }
})

export default store
