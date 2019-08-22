import Vuex from 'vuex'
import Vue from 'vue'

import authentication from './modules/authentication'
import avatar from './modules/avatar'
import blockProducer from './modules/blockProducer'
import comment from './modules/comment'
import like from './modules/like'
import password from './modules/password'
import profile from './modules/profile'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    avatar: avatar,
    blockProducer: blockProducer,
    comment: comment,
    like: like,
    password: password,
    profile: profile,
    settings: settings,
    user: user,
  }
})

export default store
