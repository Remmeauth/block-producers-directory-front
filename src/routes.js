import UserPage from './components/pages/UserPage.vue'

const routes = [
  {
    path: '/users/:username/',
    component: UserPage,
    name: 'userPage'
  },
]

export default routes
