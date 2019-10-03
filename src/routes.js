import BlockProducerPage from './components/pages/BlockProducerPage.vue'
import BlockProducerCreationPage from './components/pages/BlockProducerCreationPage.vue'
import BlockProducerEditionPage from './components/pages/BlockProducerEditionPage.vue'
import ConfirmRegistrationPage from './components/pages/ConfirmRegistrationPage.vue'
import ConfirmEmailPage from './components/pages/ConfirmEmailPage.vue'
import IndexPage from './components/pages/IndexPage.vue'
import PasswordRecoverPage from './components/pages/PasswordRecoverPage.vue'
import PasswordRecoveringIdentifierPage from './components/pages/PasswordRecoveringIdentifierPage.vue'
import SignInPage from './components/pages/SignInPage.vue'
import SignUpPage from './components/pages/SignUpPage.vue'
import SettingsPage from './components/pages/SettingsPage.vue'
import UserPage from './components/pages/UserPage.vue'
import Error404 from './components/ui/Error404.vue'

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
    path: '/password/recover/',
    component: PasswordRecoverPage,
    name: 'password-recover'
  },
  {
    path: '/users/password/recovering/:identifier/',
    component: PasswordRecoveringIdentifierPage,
    name: 'password-recovering-identifier'
  },
  {
    path: '/email/confirm/',
    component: ConfirmEmailPage,
    name: 'confirm-email'
  },
  {
    path: '/users/email/confirm/:identifier/',
    component: ConfirmRegistrationPage,
    name: 'confirm-registration'
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
  {
    path: '*',
    component: Error404,
    name: 'not-found-routes'
  },
]

export default routes
