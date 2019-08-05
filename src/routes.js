import IndexPage from './components/pages/IndexPage.vue'
import UserPage from './components/pages/UserPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    name: 'indexPage'
  },
  {
    path: '/users/:username/',
    component: UserPage,
    name: 'userPage'
  },
]

export default routes
