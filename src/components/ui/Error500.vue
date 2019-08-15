<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-layout align-center>
      <v-flex sm12 md12 id="error" text-center>
        <img id="error500Logo" alt="Error 500 logo" src="../../assets/icon-sad-face.png">
        <br><br>
        <h1 class="display-3 grey-darken-4--text" >500</h1>
        <h1 class="display-1 grey-darken-4--text">Internal server error</h1>
        <br>
        <p>Please try to refresh this page later or feel free to contact us if the problem persists.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Error500',
  }
</script>

<style>
#error {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#error500Logo {
  max-width: 20%;
}
</style>
