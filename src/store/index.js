import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import authentication from './modules/authentication'
import blockProducer from './modules/blockProducer'
import blockProducerCreation from './modules/blockProducerCreation'
import indexPage from './modules/indexPage'
import userPage from './modules/userPage'

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    blockProducer: blockProducer,
    blockProducerCreation: blockProducerCreation,
    indexPage: indexPage,
    userPage: userPage
  }
})

export default store
