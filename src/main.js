import reactiveStorage from "vue-reactive-storage";
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './routes'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueRouter)

Vue.use(reactiveStorage, {
    'token': null,
});

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
