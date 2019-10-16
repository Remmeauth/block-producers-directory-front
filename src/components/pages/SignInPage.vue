<template>
  <div v-if="authenticationSignInError.statusCode === 500 || userError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex class="mt-6 mb-12" xs12 sm8 md6 lg4 xl4 offset-xs offset-sm2 offset-md3 offset-lg4 offset-xl4>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card 
                  outlined
                  elevation="2"
                  style="border: 1px solid #e7e7f3;"
                >
                  <h3 class="mt-6 heading"
                    style="text-align: center;"
                  >
                    Sign in to Directory
                  </h3>
                  <v-card flat class="ma-2 pa-10 pt-5 pb-5">
                    <v-form>
                      <v-text-field
                        class="mb-6 pl-2 pr-2"
                        v-model="usernameOrEmail"
                        :error-messages="usernameOrEmailErrors"
                        @input="$v.usernameOrEmail.$touch()"
                        @blur="$v.usernameOrEmail.$touch()"
                        label="Username or e-mail"
                        color="#364fcc"
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
                        color="#364fcc"
                        outlined
                        prepend-inner-icon="lock"
                        type="password"
                      ></v-text-field>
                      <v-card-actions
                        v-if="authenticationSignInError.message"
                        class="justify-center pt-0"
                      >
                        <span style="font-size: 0.9em; color: red;">
                          {{ authenticationSignInError.message }}
                        </span>
                      </v-card-actions>
                      <v-card-actions class="justify-center">
                        <v-btn
                          class="text-none white--text"
                          outlined
                          block
                          depressed
                          @click="signIn"
                          style="background-color: #364FCC;
                            height: 38px;
                            font-family: open sans, OpenSans, sans-serif !important;
                            font-style: normal !important;
                            font-weight: bold !important;
                            font-size: 15px !important;
                            line-height: 21px !important;
                            letter-spacing: -0.01em;"
                        >
                          Sign in
                        </v-btn>
                      </v-card-actions>
                      <v-card-actions
                        class="justify-center pt-0 pb-0"
                        style="flex-direction: column;"
                      >
                        <v-btn
                          class="custom-btn text-none"
                          :ripple="false"
                          text
                          @click="$router.push({name: 'password-recover'})"
                          style="cursor: pointer;
                            font-family: open sans, OpenSans, sans-serif !important;
                            font-style: normal !important;
                            font-weight: bold !important;
                            font-size: 15px !important;
                            line-height: 21px !important;
                            letter-spacing: -0.01em; color: #364fcc;"
                        >
                          Forgot password?
                        </v-btn>
                        <v-btn
                          class="custom-btn-second text-none"
                          :ripple="false"
                          text
                          style="cursor: auto; font-family: open sans, OpenSans, sans-serif !important;
                            font-style: normal !important;
                            font-weight: bold !important;
                            font-size: 15px !important;
                            line-height: 21px !important;
                            letter-spacing: -0.01em; color: #343747;"
                        >
                          Don't have an account?
                          <v-btn
                            class="custom-btn text-none pl-1"
                            :ripple="false"
                            text
                            @click="$router.push({name: 'sign-up'})"
                            style="cursor: pointer;
                              font-family: open sans, OpenSans, sans-serif !important;
                              font-style: normal !important;
                              font-weight: bold !important;
                              font-size: 15px !important;
                              line-height: 21px !important;
                              letter-spacing: -0.01em; color: #364fcc;"
                          >
                            Sign up!
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
    ...mapGetters('authentication', ['authenticationSignInError', 'authenticationEvents', 'credentials']),
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
.custom-btn::before {
  color: transparent;
}

.custom-btn-second::before {
  color: transparent;
}

.custom-btn:hover {
  text-decoration: underline;
}
</style>
