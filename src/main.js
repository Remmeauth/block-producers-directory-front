import reactiveStorage from "vue-reactive-storage";
import Vue from 'vue'
import VueRouter from 'vue-router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'
import routes from './routes'
import vuetify from './plugins/vuetify';

import store  from './store/index';

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.use(reactiveStorage, {
    'token': null,
    'username': null,
    'email': null,
    'recoveryEmail': null,
});

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
