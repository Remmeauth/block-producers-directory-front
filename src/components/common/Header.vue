<template>
  <div v-if="profileError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-toolbar
      dark
      color="#24292e"
      flat
      class="mb-4"
    >
      <v-spacer></v-spacer>
      <v-toolbar-title style="font-weight: 600">Block Producer Directory</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-tabs 
        dark
        v-if="localStorage.token"
        slot="extension"
        centered
        class="tabs-btn white--text"
        background-color="transparent"
        slider-color="#24292e"
      >
        <div class="flex-grow-2"></div>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'md' || 
            this.$vuetify.breakpoint.name == 'lg' ||
            this.$vuetify.breakpoint.name == 'xl'" 
          class="white--text" 
          :ripple="false"
          disabled
        >
          <v-form class="text-none" style="font-size: 1em;">
            Signed in as 
            <b
              style="color: yellow; cursor: pointer;" 
            >
              @{{ localStorage.username }}
            </b>
          </v-form>
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'" 
          class="tab-btn pa-0" 
          :ripple="false" 
          @click="$router.push({name: 'index'})"
        >
          Home
        </v-tab>
        <v-tab 
          v-else 
          :ripple="false" 
          @click="$router.push({name: 'index'})"
        >
          Home
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'" 
          class="tab-btn pl-2 pr-2" 
          :ripple="false" 
          @click="$router.push({name: 'block-producer-creation'})"
        >
          Submit
        </v-tab>
        <v-tab
          v-else 
          :ripple="false" 
          @click="$router.push({name: 'block-producer-creation'})"
        >
          Submit
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'"  
          class="tab-btn pl-2 pr-2" 
          :ripple="false" 
          @click="$router.push({name: 'user', params: {username: localStorage.username}})"
        >
          Profile
        </v-tab>
        <v-tab 
          v-else 
          :ripple="false" 
          @click="$router.push({name: 'user', params: {username: localStorage.username}})"
        >
          Profile
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'"  
          class="tab-btn pl-2 pr-2" 
          :ripple="false" 
          @click="$router.push({name: 'settings'})"
        >
          Settings
        </v-tab>
        <v-tab 
          v-else 
          :ripple="false" 
          @click="$router.push({name: 'settings'})"
        >
          Settings
        </v-tab>
        <v-tab 
          v-if="this.$vuetify.breakpoint.name == 'xs'" 
          class="tab-btn pl-2 pr-2" 
          :ripple="false" 
          @click="signOut"
        >
          Sign out
        </v-tab>
        <v-tab 
          v-else 
          :ripple="false" 
          @click="signOut"
        >
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
          @click="$router.push({name: 'index'})"
        >
          Home
        </v-tab>
        <v-tab 
          :ripple="false" 
          @click="$router.push({name: 'sign-in'})"
        >
          Sign In
        </v-tab>
        <v-tab 
          :ripple="false" 
          @click="$router.push({name: 'sign-up'})"
        >
          Sign Up
        </v-tab>
      </v-tabs>
    </v-toolbar>
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
  min-width: 60px;
  font-size: 12px;
}
</style>
