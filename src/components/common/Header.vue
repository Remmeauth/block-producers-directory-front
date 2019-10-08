<template>
  <div v-if="profileError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-toolbar
      dark
      color="#f2f2fa"
      flat
    >
      <v-spacer></v-spacer>
      <h2 v-if="this.$vuetify.breakpoint.name !== 'xs'"
        style="color: #343747; font-family: Open Sans,sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -.02em;"
      >
        Block Producer Directory
      </h2>
      <h2
        v-else
        style="color: #343747; font-family: Open Sans,sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -.02em;"
      >
        Block Producer Directory
      </h2>

      <div class="flex-grow-1"></div>

      <v-tabs 
        light
        v-if="localStorage.token"
        slot="extension"
        centered
        class="tabs-btn"
        color="#364fcc"
        background-color="transparent"
        slider-color="#364fcc"
      >
        <div class="flex-grow-2"></div>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'md' || 
            this.$vuetify.breakpoint.name == 'lg' ||
            this.$vuetify.breakpoint.name == 'xl'"
          class="font-weight-bold"
          :ripple="false"
          style="pointer-events: none;"
        >
          <v-form class="text-none" style="font-size: 1em;">
            Signed in as 
            <b
              style="color: #364fcc; cursor: pointer;"
            >
              @{{ localStorage.username }}
            </b>
          </v-form>
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'" 
          class="tab-btn pa-0 noHover"
          :ripple="false"
          @click="$router.push({name: 'index'})"
        >
          <v-icon>mdi-home</v-icon>
        </v-tab>
        <v-tab
          v-else
          class="noHover font-weight-bold"
          :ripple="false" 
          @click="$router.push({name: 'index'})"
        >
          <v-icon left>mdi-home</v-icon>
          Home
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'" 
          class="tab-btn pl-2 pr-2 noHover"
          :ripple="false" 
          @click="$router.push({name: 'block-producer-creation'})"
        >
          <v-icon>mdi-bank-plus</v-icon>
        </v-tab>
        <v-tab
          v-else
          class="noHover font-weight-bold"
          :ripple="false" 
          @click="$router.push({name: 'block-producer-creation'})"
        >
          <v-icon left>mdi-bank-plus</v-icon>
          Submit
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'"  
          class="tab-btn pl-2 pr-2 noHover"
          :ripple="false" 
          @click="$router.push({name: 'user', params: {username: localStorage.username}})"
        >
          <v-icon>mdi-account</v-icon>
        </v-tab>
        <v-tab 
          v-else
          class="noHover font-weight-bold"
          :ripple="false" 
          @click="$router.push({name: 'user', params: {username: localStorage.username}})"
        >
          <v-icon left>mdi-account</v-icon>
          Profile
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'"  
          class="tab-btn pl-2 pr-2 noHover"
          :ripple="false" 
          @click="$router.push({name: 'settings'})"
        >
          <v-icon>mdi-settings</v-icon>
        </v-tab>
        <v-tab 
          v-else
          class="noHover font-weight-bold"
          :ripple="false" 
          @click="$router.push({name: 'settings'})"
        >
          <v-icon left>mdi-settings</v-icon>
          Settings
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'" 
          class="tab-btn pl-2 pr-2 noHover"
          :ripple="false" 
          @click="signOut"
        >
          <v-icon>mdi-logout</v-icon>
        </v-tab>
        <v-tab 
          v-else
          class="noHover font-weight-bold"
          :ripple="false" 
          @click="signOut"
        >
          <v-icon left>mdi-logout</v-icon>
          Sign out
        </v-tab>
      </v-tabs>

      <v-tabs
        v-else
        slot="extension"
        centered
        background-color="transparent"
        slider-color="#24292e"
      >
        <div class="flex-grow-2"></div>
        <v-tab
          :ripple="false"
          class="noHover font-weight-bold"
          @click="$router.push({name: 'index'})"
        >
          <v-icon left>mdi-home</v-icon>
          Home
        </v-tab>
        <v-tab
          :ripple="false"
          class="noHover font-weight-bold"
          @click="$router.push({name: 'sign-in'})"
        >
          <v-icon left>mdi-login</v-icon>
          Sign In
        </v-tab>
        <v-tab 
          :ripple="false"
          class="noHover font-weight-bold"
          @click="$router.push({name: 'sign-up'})"
        >
          <v-icon left>mdi-account-plus</v-icon>
          Sign Up
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Error500 from '../../components/ui/Error500'
import { profileStorageActions } from '../../store/modules/profile'

export default {
  name: 'Header',
  components: {
    Error500,
  },
  data () {
    return {
      username: this.$route.params.username,
    }
  },
  computed: {
    ...mapGetters('profile', ['profile', 'profileError', 'profileEvents']),
  },
  beforeRouteUpdate(to, from, next) {
    this.username = to.params.username
    next()
  },
  methods: {
    signOut () {
      this.localStorage.token = ''
      this.localStorage.username = ''
      this.localStorage.email = ''
      this.localStorage.recoveryEmail = ''
      this.localStorage.confirmEmail = ''
      this.localStorage.statusDescription = ''

      this.$router.push({name: 'index'})
    }
  },
  mounted() {
    if (!this.localStorage.username) return
    this.$store.dispatch(profileStorageActions.getProfile, { username: this.localStorage.username })
  },
}
</script>

<style>
.theme--dark.v-tabs.v-tab--active:hover::before, .theme--dark.v-tabs.v-tab--active::before {
  opacity: 0;
}

.theme--dark.v-tabs.v-tab:hover::before {
  opacity: 0;
}

.v-tab--active.v-tab:not(:focus)::before {
  opacity: 0;
}

.v-tab.tab-btn {
  min-width: 70px;
  font-size: 14px;
}

.v-tab.noHover::before {
  color: transparent;
}

.v-tab.noHover:hover {
  color: unset !important;
}

/*.v-tab.noHover:active {*/
  /*font-weight: 600;*/
/*}*/

.v-tab.noHover:visited {
  font-weight: 600;
}

v-icon.noHover::before {
  color: transparent;
}

v-icon.noHover:hover {
  color: unset !important;
}
</style>
