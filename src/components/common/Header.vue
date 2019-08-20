<template>
    <v-card tile>
      <v-toolbar style="background-color: rgb(242, 243, 244);">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>DIRECTORY</v-toolbar-title>
        <v-spacer></v-spacer>

        <template v-if="localStorage.token">
          <v-btn outlined color="#5d80da">Submit</v-btn>

          <v-menu offset-y :nudge-width="150" style="margin-top: 20px">

            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="mx-2" :ripple="false" color="#424242" text>
                <v-avatar tile size="36">
                  <img src="https://block-producers-directory.s3-us-west-2.amazonaws.com/user/avatars/default-user-logotype.png" alt="avatar">
                </v-avatar>
              </v-btn>
            </template>

             <v-list>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Signed in as</v-list-item-title>
                      <v-list-item-subtitle>@{{ localStorage.username }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item :to="{name: 'user', params: {username: localStorage.username}}">
                    <v-list-item-content>
                      <v-list-item-title>Your profile</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item :to="{name: 'settings'}">
                    <v-list-item-content>
                      <v-list-item-title>Your settings</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item @click="signOut">
                    <v-list-item-content>
                      <v-list-item-title>Sign Out</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
            </v-list>

          </v-menu>
        </template>

        <template v-else>
          <v-btn outlined color="#5d80da" style="margin-right: 20px;" @click="$router.push('/sign-in/')">Sign In</v-btn>
          <v-btn outlined color="#5d80da" style="margin-right: 2px;" @click="$router.push('/sign-up/')">Sign Up</v-btn>
        </template>
      </v-toolbar>

    </v-card>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    signOut () {
      this.localStorage.token = ''
      this.localStorage.username = ''
      this.localStorage.email = ''
      this.$router.push('/')
    }
  },
}
</script>

<style></style>
