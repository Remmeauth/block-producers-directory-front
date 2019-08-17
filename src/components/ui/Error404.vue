<template>
  <v-container fill-height style="height: calc(100vh - 58px);">
    <v-layout align-center>
      <v-flex sm12 md12 id="error" text-center>
        <img id="error404Logo" alt="Error 404 logo" src="../../assets/icon-sad-face.png">
        <br><br>
        <h1 class="display-3 grey-darken-4--text" >404</h1>
        <h1 class="display-1 grey-darken-4--text">Page not found</h1>
        <br>
        <p>The page you are looking for doesn't exist.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Error404',
  }
</script>

<style>
#error {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#error404Logo { 
  max-width: 20%;
}
</style>
