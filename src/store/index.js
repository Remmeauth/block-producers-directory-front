import Vuex from 'vuex'
import Vue from 'vue'

import authentication from './modules/authentication'
import blockProducer from './modules/blockProducer'
import blockProducerCreation from './modules/blockProducerCreation'
import comment from './modules/comment'
import indexPage from './modules/indexPage'
import like from './modules/like'
import profile from './modules/profile'
import settings from './modules/settings'
import user from './modules/user'
import userPage from './modules/userPage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    blockProducer: blockProducer,
    blockProducerCreation: blockProducerCreation,
    comment: comment,
    indexPage: indexPage,
    like: like,
    profile: profile,
    settings: settings,
    user: user,
    userPage: userPage
  }
})

export default store
