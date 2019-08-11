<template>
  <div>
    <v-btn @click="logOut">Log out</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logOut () {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')
      window.localStorage.removeItem('email')
      this.$router.push('/')
    }
  },
}
</script>

<style></style>
