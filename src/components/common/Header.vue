<template>
  <div v-if="profileError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout row wrap>
      <v-flex v-if="localStorage.token" xs12 sm12 md8 lg8 offset-xs offset-sm offset-md2 offset-lg2>
        <v-container class="pa-0">
          <v-row>
            <p 
              class="mt-2 ml-7 mb-0" 
              style="color: #160d1d; font-size: 1.5em; font-weight: 600;"
            >
              Block Producer Directory
            </p>
            <v-col cols="12" lg="12" class="pa-0">
              <v-card-actions 
                class="ml-4 mt-2"
                style="flex-direction: row;"
              >
                <template v-if="this.$vuetify.breakpoint.name !== 'xs'">
                  <img 
                    v-if="profile.avatarUrl"
                    class="mt-0 mb-0 mr-2 ml-0 pa-1" 
                    style="max-width: 6%; border-radius: 50%; cursor: pointer;" 
                    :src="profile.avatarUrl"
                    @click="$router.push({name: 'user', params: {username: localStorage.username}})"
                  >
                  <v-form class="mr-1" style="font-size: 1em;">
                    Signed in as 
                    <b
                      style="color: #5d80da; cursor: pointer;" 
                      @click="$router.push({name: 'user', params: {username: localStorage.username}})"
                    >
                      @{{ localStorage.username }}
                    </b>
                  </v-form>
                </template>
                <v-layout align-end justify-end>
                  <v-flex class="mr-2" xs2 sm2 md3 lg2 xl2>
                    <v-btn
                      class="text-none" 
                      block
                      outlined 
                      style="font-weight: 600;" 
                      color="#5d80da" 
                      @click="$router.push({name: 'index'})"
                    >
                      Home
                    </v-btn>
                  </v-flex>
                  <v-flex class="mr-2" xs2 sm2 md3 lg2 xl2>
                    <v-btn 
                      class="text-none"
                      block
                      outlined 
                      style="font-weight: 600;" 
                      color="#5d80da" 
                      @click="$router.push({name: 'block-producer-creation'})"
                    >
                      Submit
                    </v-btn>
                  </v-flex>
                  <v-flex class="mr-2" xs2 sm2 md3 lg2 xl2>
                    <v-btn
                      class="text-none"
                      block
                      outlined 
                      style="font-weight: 600;" 
                      color="#5d80da" 
                      @click="$router.push({name: 'user', params: {username: localStorage.username}})"
                    >
                      Profile
                    </v-btn>
                  </v-flex>
                  <v-flex class="mr-2" xs2 sm2 md3 lg2 xl2>
                    <v-btn
                      class="text-none" 
                      block
                      outlined 
                      style="font-weight: 600;" 
                      color="#5d80da" 
                      @click="$router.push({name: 'settings'})"
                    >
                      Settings
                    </v-btn>
                  </v-flex>
                  <v-flex class="mr-5" xs2 sm2 md3 lg2 xl2>
                    <v-btn
                      class="text-none"
                      block 
                      outlined 
                      style="font-weight: 600;" 
                      color="grey darken-2" 
                      @click="signOut"
                    >
                      Sign out
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
      <v-flex v-else xs12 sm12 md8 lg8 offset-xs offset-sm offset-md2 offset-lg2>
        <v-container class="pa-0">
          <v-row class="justify-center">
            <p 
              class="mt-2 mb-0" 
              style="color: #160d1d; font-size: 1.5em; font-weight: 600;"
            >
              Block Producer Directory
            </p>
            <v-col cols="12" lg="12" class="pa-0">
              <v-card-actions 
                class="ml-4 mt-2"
                style="flex-direction: row;"
              >
                <v-layout align-center justify-center>
                  <v-btn 
                    class="mr-1" 
                    outlined 
                    style="font-weight: 600;" 
                    color="#5d80da" 
                    @click="$router.push({name: 'sign-in'})"
                  >
                    Sign In
                  </v-btn>
                  <v-btn 
                    class="mr-4" 
                    outlined 
                    style="font-weight: 600;" 
                    color="#5d80da" 
                    @click="$router.push({name: 'sign-up'})"
                  >
                    Sign Up
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
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
  computed: {
    ...mapGetters('profile', ['profile', 'profileError']),
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

<style></style>
