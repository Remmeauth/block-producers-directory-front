<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import BlockProducerPage from './components/pages/BlockProducerPage.vue'
import BlockProducerCreationPage from './components/pages/BlockProducerCreationPage.vue'
import Header from './components/common/Header'
import IndexPage from './components/pages/IndexPage.vue'
import UserPage from './components/pages/UserPage.vue'

export default {
  name: 'app',
  components: {
    BlockProducerPage,
    BlockProducerCreationPage,
    Header,
    IndexPage,
    UserPage
  }
}
</script>
