import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import blockProducerEdition from './modules/blockProducerEdition'
import indexPage from './modules/indexPage'
import userPage from './modules/userPage'
import authentication from './modules/authentication'

const store = new Vuex.Store({
  modules: {
    authentication: authentication,
    blockProducerEdition: blockProducerEdition,
    indexPage: indexPage,
    userPage: userPage
  }
})

export default store
