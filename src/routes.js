import BlockProducerPage from './components/pages/BlockProducerPage.vue'
import BlockProducerCreationPage from './components/pages/BlockProducerCreationPage.vue'
import BlockProducerEditionPage from './components/pages/BlockProducerEditionPage.vue'
import IndexPage from './components/pages/IndexPage.vue'
import SignInPage from './components/pages/SignInPage.vue'
import SignUpPage from './components/pages/SignUpPage.vue'
import SettingsPage from './components/pages/SettingsPage.vue'
import UserPage from './components/pages/UserPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    name: 'index'
  },
  {
    path: '/sign-in/',
    component: SignInPage,
    name: 'sign-in'
  },
  {
    path: '/sign-up/',
    component: SignUpPage,
    name: 'sign-up'
  },
  {
    path: '/settings/',
    component: SettingsPage,
    name: 'settings'
  },
  {
    path: '/users/:username/',
    component: UserPage,
    name: 'user'
  },
  {
    path: '/block-producers/new/',
    component: BlockProducerCreationPage,
    name: 'block-producer-creation'
  },
  {
    path: '/block-producers/:identifier/edit/',
    component: BlockProducerEditionPage,
    name: 'block-producer-edition'
  },
  {
    path: '/block-producers/:identifier/',
    component: BlockProducerPage,
    name: 'block-producer'
  },
]

export default routes
