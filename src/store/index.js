import Vuex from 'vuex'
import Vue from 'vue'

import authentication from './modules/authentication'
import indexPage from './modules/indexPage'
import profile from './modules/profile'
import settings from './modules/settings'
import user from './modules/user'
import userPage from './modules/userPage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    indexPage: indexPage,
    profile: profile,
    settings: settings,
    user: user,
    userPage: userPage
  }
})

export default store
