<template>
  <div v-if="authenticationSignUpError.statusCode === 500">
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
                  elevation="18"
                  outlined
                  style="border-color: #5d80da;"
                >
                  <div class="mt-6" 
                    style="text-align: center; font-size: 1.3em;"
                  >
                    Sign up to Directory
                  </div>
                  <v-card flat class="ma-2 pa-10 pt-5">
                    <v-form>
                      <v-text-field class="mb-6 pl-2 pr-2"
                        v-model="email"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        label="E-mail"
                        outlined
                        prepend-inner-icon="email"
                      ></v-text-field>
                      <v-text-field class="mb-6 pl-2 pr-2"
                        v-model="username"
                        :error-messages="usernameErrors"
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                        label="Username"
                        outlined
                        prepend-inner-icon="person"
                      ></v-text-field>
                      <v-text-field class="mb-6 pl-2 pr-2"
                        v-model="password"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        label="Password"
                        outlined
                        prepend-inner-icon="lock"
                        type="password"
                      ></v-text-field>
                      <vue-recaptcha
                        size="normal"
                        class="ml-2"
                        @verify="onVerify"
                        :sitekey="objects.captcha.siteKey"
                        :loadRecaptchaScript="true"
                        style="transform:scale(0.78); transform-origin: 0 0;"
                      >
                      </vue-recaptcha>
                      <v-card-actions
                        v-if="authenticationSignUpError.message"
                        class="justify-center"
                      >
                        <span style="font-size: 0.9em; color: red;">
                          {{ authenticationSignUpError.message }}
                        </span>
                      </v-card-actions>
                      <v-card-actions class="justify-center">
                        <v-btn
                        outlined
                        color="white"
                        block
                        @click="signUp"
                        style="background-color: #4d70d5;"
                      >
                        Sign up
                        </v-btn>
                      </v-card-actions>
                      <v-card-actions
                        class="justify-center"
                        style="padding-top: 0; flex-direction: column;"
                      >
                        <v-btn  
                          class="custom-btn-second text-none" 
                          :ripple="false"
                          text
                          style="cursor: auto;"
                        >
                          Already have an account?
                          <v-btn
                            class="custom-btn text-none"
                            :ripple="false"
                            text
                            color="#5d80da"
                            style="text-decoration: underline;"
                            @click="$router.push({name: 'sign-in'})"
                          >
                            Sign in!
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
import VueRecaptcha from 'vue-recaptcha';

import Error500 from '../../components/ui/Error500'
import signUpForm from '../../forms/pages/authentication/signUp'
import { authenticationStorageActions } from '../../store/modules/authentication'

export default {
  name: 'sign-up',
  mixins: [signUpForm],
  components: {
    Error500, VueRecaptcha,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      objects: {
        captcha: {
          siteKey: "6Ld5MLYUAAAAAGtUcSi8K-HVYU9uwQ8onPIWRkVp",
          isValid: false,
        }
      },
      email: null,
      username: null,
      password: null,
    }
  },
  computed: {
    ...mapGetters('authentication', ['authenticationSignUpError', 'authenticationEvents', 'credentials']),
  },
  watch: {
    'authenticationEvents.signedUp'() {
      if (!this.authenticationEvents.signedUp) return

      this.localStorage.email = this.email
      this.localStorage.username = this.username
      this.localStorage.confirmEmail = this.email

      this.$router.push({name: 'confirm-email'})
    }
  },
  methods: {
    onVerify(response) {
      this.objects.captcha.isValid = response
    },
    signUp () {
      this.$v.$touch()
      if (this.$v.$anyError) { return }

      if (!this.objects.captcha.isValid) { return }

      this.$store.dispatch(authenticationStorageActions.signUp, {
        email: this.email,
        username: this.username,
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
</style>
