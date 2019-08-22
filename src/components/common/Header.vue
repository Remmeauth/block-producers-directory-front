<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-card tile>
      <v-toolbar style="background-color: rgb(242, 243, 244);">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>DIRECTORY</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="localStorage.token">
          <v-btn outlined color="#5d80da" @click="$router.push({name: 'block-producer-creation'})">Submit</v-btn>
          <v-menu offset-y :nudge-width="150" style="margin-top: 20px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="mx-2" :ripple="false" color="#424242" text>
                <v-avatar tile size="36">
                  <img v-if="profile.avatarUrl" :src="profile.avatarUrl" alt="avatar">
                  <img v-else src="https://block-producers-directory.s3-us-west-2.amazonaws.com/users/avatars/default-user-logotype.png" alt="avatar">
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
          <v-btn outlined color="#5d80da" style="margin-right: 20px;" @click="$router.push({name: 'sign-in'})">Sign In</v-btn>
          <v-btn outlined color="#5d80da" style="margin-right: 2px;" @click="$router.push({name: 'sign-up'})">Sign Up</v-btn>
        </template>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import Error500 from '../../components/ui/Error500'
import store from '../../store/index'
import { profileStorageActions, profileStorageMutations} from '../../store/modules/profile'

export default {
  name: 'Header',
  components: {
    Error500,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      profile: {
        firstName: null,
        lastName: null,
        additionalInformation: null,
        avatarUrl: null,
        facebookUrl: null,
        githubUrl: null,
        linkedInUrl: null,
        location: null,
        mediumUrl: null,
        steemitUrl: null,
        telegramUrl: null,
        tweeterUrl: null,
        websiteUrl: null,
      },
    }
  },
  methods: {
    signOut () {
      this.localStorage.token = ''
      this.localStorage.username = ''
      this.localStorage.email = ''
      this.$router.push({name: 'index'})
    }
  },
  mounted() {
    if (!this.localStorage.username) {
      return
    }

    store.dispatch(profileStorageActions.getProfile, {
      username: this.localStorage.username,
    })

    const unsubscribe = store.subscribe((mutation, state) => {
      if (mutation.type === profileStorageMutations.subscribe.addError) {
        this.error = state.profile.error
        unsubscribe()
      }

      if (mutation.type === profileStorageMutations.subscribe.addProfile) {
        this.profile.firstName = state.profile.firstName
        this.profile.lastName = state.profile.lastName
        this.profile.additionalInformation = state.profile.additionalInformation
        this.profile.avatarUrl = state.profile.avatarUrl
        this.profile.facebookUrl = state.profile.facebookUrl
        this.profile.githubUrl = state.profile.githubUrl
        this.profile.linkedInUrl = state.profile.linkedInUrl
        this.profile.location = state.profile.location
        this.profile.mediumUrl = state.profile.mediumUrl
        this.profile.steemitUrl = state.profile.steemitUrl
        this.profile.telegramUrl = state.profile.telegramUrl
        this.profile.tweeterUrl = state.profile.tweeterUrl
        this.profile.websiteUrl = state.profile.websiteUrl
      }
    });
  },
}
</script>

<style></style>
