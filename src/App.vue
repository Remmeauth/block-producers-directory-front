<template>
  <v-app>
    <v-content>
      <Header/>
      <transition name="view" mode="out-in" appear>
        <router-view :key="$route.fullPath"></router-view>
      </transition>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/common/Footer'
import Header from './components/common/Header'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>
