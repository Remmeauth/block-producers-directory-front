<template>
  <v-app>
    <v-content>
      <Header/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/common/Header'

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>
