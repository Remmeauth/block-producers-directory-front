import Vuex from 'vuex'
import Vue from 'vue'

import authentication from './modules/authentication'
import avatar from './modules/avatar'
import blockProducer from './modules/blockProducer'
import blockProducerCreation from './modules/blockProducerCreation'
import comment from './modules/comment'
import indexPage from './modules/indexPage'
import like from './modules/like'
import password from './modules/password'
import profile from './modules/profile'
import settings from './modules/settings'
import user from './modules/user'
import userPage from './modules/userPage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    avatar: avatar,
    blockProducer: blockProducer,
    blockProducerCreation: blockProducerCreation,
    comment: comment,
    indexPage: indexPage,
    like: like,
    password: password,
    profile: profile,
    settings: settings,
    user: user,
    userPage: userPage
  }
})

export default store
