<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import UserPage from './components/pages/UserPage.vue'

export default {
  name: 'app',
  components: {
    UserPage
  }
}
</script>
