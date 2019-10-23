<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex class="mt-8 mb-12" xs12 sm8 md4 lg4 xl4 offset-xs offset-sm2 offset-md4 offset-lg4 offset-xl4>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card
                  v-if="successMessage"
                  elevation="2"
                  outlined
                  style="border: 1px solid #e7e7f3;"
                >
                  <v-card 
                    flat 
                    class="ma-2 pa-10 pt-0 pb-5"
                    align="center"
                  >
                    <v-img
                      class="mt-5"
                      height="150px"
                      max-width="200"
                      src="../../assets/email.png"
                    >
                    </v-img>
                    <v-form>
                      <v-card-actions
                        class="justify-center pb-0"
                        style="flex-direction: column;"
                      >
                        <h3 class="heading">
                        Recovery link sent to
                        </h3>
                      </v-card-actions>
                      <v-card-actions
                        class="justify-center pt-0"
                        style="flex-direction: column;"
                      >
                        <h4 class="heading" style="color: #364fcc;">
                          dev@gmail.com
                        </h4>
                        {{ email }}
                      </v-card-actions>
                      <v-card-actions 
                        class="justify-center" 
                        style="padding-top: 0; flex-direction: column;"
                      >
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
                          Remember your password?
                          <v-btn 
                            class="custom-btn text-none pl-1"
                            :ripple="false" 
                            text
                            @click="$router.push({name: 'sign-in'})"
                            style="cursor: pointer;
                              font-family: open sans, OpenSans, sans-serif !important;
                              font-style: normal !important;
                              font-weight: bold !important;
                              font-size: 15px !important;
                              line-height: 21px !important;
                              letter-spacing: -0.01em; color: #364fcc;"
                          >
                            Sign in!
                          </v-btn>
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-card>
                <v-card
                  v-else
                  elevation="2"
                  outlined
                  style="border: 1px solid #e7e7f3;"
                >
                  <h3
                    class="mb-4 heading"
                    style="text-align: center;"
                  ><br>
                    Send a password recover request
                  </h3>
                  <v-card-actions
                    class="pl-8 pr-8 justify-center"
                    style="font-size: 0.8em; color: #364fcc; font-family: open sans, OpenSans, sans-serif !important;"
                  >
                    Enter the e-mail of your account to get a recovery link
                  </v-card-actions>
                  <v-card 
                    flat 
                    class="ma-2 pr-3 pl-3 pt-0 pb-5"
                  >
                    <v-form>
                      <v-text-field
                        class="mb-4 pl-2 pr-2"
                        v-model="email"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        label="E-mail"
                        color="#364fcc"
                        outlined 
                        prepend-inner-icon="email"
                      ></v-text-field>
                      <v-card-actions
                        v-if="passwordFieldsErrors.errors"
                        class="justify-center pt-0"
                      >
                        <span style="font-size: 0.9em; color: red;">
                          {{ passwordFieldsErrors.errors }}
                        </span>
                      </v-card-actions>
                      <v-card-actions 
                        class="justify-center"
                      >
                        <v-btn
                          class="text-none white--text"
                          outlined
                          depressed
                          block
                          @click="getPasswordRecoveryRequest"
                          style="background-color: #364FCC;
                            height: 38px;
                            font-family: open sans, OpenSans, sans-serif !important;
                            font-style: normal !important;
                            font-weight: bold !important;
                            font-size: 15px !important;
                            line-height: 21px !important;
                            letter-spacing: -0.01em;"
                        >
                          Get recovery link
                        </v-btn>
                      </v-card-actions>
                      <v-card-actions 
                        class="justify-center pt-0 pb-0" 
                        style="padding-top: 0; flex-direction: column;"
                      >
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
                          Remember your password?
                          <v-btn 
                            class="custom-btn text-none pl-1"
                            :ripple="false" 
                            text
                            @click="$router.push({name: 'sign-in'})"
                            style="cursor: pointer;
                              font-family: open sans, OpenSans, sans-serif !important;
                              font-style: normal !important;
                              font-weight: bold !important;
                              font-size: 15px !important;
                              line-height: 21px !important;
                              letter-spacing: -0.01em; color: #364fcc;"
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

import Error500 from '../../components/ui/Error500'
import passwordRecoveryRequestForm from '../../forms/pages/authentication/passwordRecovery'
import { passwordStorageActions } from '../../store/modules/password'

export default {
  name: 'password-recover',
  mixins: [passwordRecoveryRequestForm],
  components: {
    Error500,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      fieldsErrors: {
        errors: null,
        statusCode: null,
      },
      email: null,
      successMessage: null,
    }
  },
  computed: {
    ...mapGetters('password', ['passwordError', 'passwordFieldsErrors', 'passwordEvents']),
  },
  watch: {
    'passwordEvents.isReceived'() {
      this.successMessage = `Recovery link sent to the email address — check it.`
      this.localStorage.recoveryEmail = this.email
    }
  },
  methods: {
    getPasswordRecoveryRequest () {
      this.$v.$touch()
      if (this.$v.$anyError) { return }

      this.$store.dispatch(passwordStorageActions.getPasswordRecoveryRequest, {
        email: this.email,
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
