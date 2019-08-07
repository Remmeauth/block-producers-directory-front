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
]

export default routes
