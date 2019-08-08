<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import BlockProducerEditionPage from './components/pages/BlockProducerEditionPage.vue'
import IndexPage from './components/pages/IndexPage.vue'
import UserPage from './components/pages/UserPage.vue'

export default {
  name: 'app',
  components: {
    BlockProducerEditionPage,
    IndexPage,
    UserPage
  }
}
</script>
