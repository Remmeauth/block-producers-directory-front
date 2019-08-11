import BlockProducerPage from './components/pages/BlockProducerPage.vue'
import BlockProducerCreationPage from './components/pages/BlockProducerCreationPage.vue'
import BlockProducerEditionPage from './components/pages/BlockProducerEditionPage.vue'
import IndexPage from './components/pages/IndexPage.vue'
import LoginPage from './components/pages/LoginPage.vue'
import UserPage from './components/pages/UserPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    name: 'index'
  },
  {
    path: '/login/',
    component: LoginPage,
    name: 'login'
  },
  {
    path: '/users/:username/',
    component: UserPage,
    name: 'user'
  },
  {
    path: '/block-producers/new/',
    component: BlockProducerCreationPage,
    name: 'blockProducerCreation'
  },
  {
    path: '/block-producers/:identifier/edit/',
    component: BlockProducerEditionPage,
    name: 'blockProducerEdition'
  },
  {
    path: '/block-producers/:identifier/',
    component: BlockProducerPage,
    name: 'blockProducer'
  },
]

export default routes
