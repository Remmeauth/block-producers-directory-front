import Vuex from 'vuex'
import Vue from 'vue'

import authentication from './modules/authentication'
import avatar from './modules/avatar'
import blockProducer from './modules/blockProducer'
import blockProducerComment from './modules/blockProducerComment'
import email from './modules/email'
import password from './modules/password'
import profile from './modules/profile'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    avatar: avatar,
    blockProducer: blockProducer,
    blockProducerComment: blockProducerComment,
    email: email,
    password: password,
    profile: profile,
    user: user,
  }
})

export default store
