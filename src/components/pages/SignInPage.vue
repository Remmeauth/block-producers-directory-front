<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex xs12 sm8 md4 lg4 xl4 offset-xs offset-sm2 offset-md4 offset-lg4 offset-xl4 style="margin-top:100px;">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card 
                  elevation="18" 
                  outlined
                  style="border-color: #5d80da;"
                >
                  <div 
                    style="text-align: center; font-size:1.7em;"
                  ><br>
                    Sign in to Directory
                  </div>
                  <v-card flat class="ma-2 pa-10">
                    <v-form>
                      <v-text-field
                        class="mb-4 pl-2 pr-2"
                        v-model="usernameOrEmail"
                        :error-messages="usernameOrEmailErrors"
                        @input="$v.usernameOrEmail.$touch()"
                        @blur="$v.usernameOrEmail.$touch()"
                        label="Username or e-mail"
                        outlined 
                        prepend-inner-icon="person"
                      ></v-text-field>
                      <v-text-field
                        class="mb-4 pl-2 pr-2"
                        v-model="password"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        label="Password" 
                        outlined 
                        prepend-inner-icon="lock" 
                        type="password"
                      ></v-text-field>
                      <v-card-actions class="justify-center">
                        <v-btn 
                        outlined 
                        color="white" 
                        block 
                        @click="signIn"
                        style="background-color: #4d70d5;"
                      >
                        Sign in
                      </v-btn>
                      </v-card-actions>
                      <v-card-actions 
                        class="justify-center" 
                        style="padding-top: 0; flex-direction: column;"
                      >
                        <v-btn 
                          class="custom-btn text-none" 
                          :ripple="false"
                          text
                          color="#5d80da" 
                          style="text-decoration: underline;"
                          @click="$router.push({name: 'password-recover'})"
                        >
                          Forgot password?
                        </v-btn>
                        <v-btn  
                          class="custom-btn text-none" 
                          :ripple="false"
                          text
                        >
                          Don't have an account? 
                          <v-btn 
                            class="custom-btn text-none" 
                            :ripple="false" 
                            text
                            color="#5d80da" 
                            style="text-decoration: underline;"
                            @click="$router.push({name: 'sign-up'})"
                          >
                            Sign up
                          </v-btn>
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Error500 from '../../components/ui/Error500'
import signInForm from '../../forms/pages/authentication/signIn'
import { authenticationStorageActions } from '../../store/modules/authentication'
import { userStorageActions } from '../../store/modules/user'

export default {
  name: 'SignInPage',
  mixins: [signInForm],
  components: {
    Error500,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      usernameOrEmail: null,
      password: null,
    }
  },
  computed: {
    ...mapGetters('user', ['userError', 'userEvents', 'user']),
    ...mapGetters('authentication', ['authenticationError', 'authenticationEvents', 'credentials']),
  },
  watch: {
    'userEvents.isGotten'() {
      if (!this.user.email && !this.user.username) return

      this.localStorage.email = this.user.email
      this.localStorage.username = this.user.username
      this.$router.push({name: 'index'})
    },
    'authenticationEvents.signedIn'() {
      if (!this.credentials.token) return

      this.localStorage.token = this.credentials.token
      this.$store.dispatch(userStorageActions.getUserFromToken, {
        jwtToken: this.credentials.token,
      })
    }
  },
  methods: {
    signIn () {
      this.$v.$touch()
      if (this.$v.$anyError) return

      this.$store.dispatch(authenticationStorageActions.signIn, {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password,
      })
    }
  },
}
</script>

<style>
.v-card {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.custom-btn::before {
  color: transparent;
}
</style>
