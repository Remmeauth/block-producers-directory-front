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
                  elevation="18" 
                  outlined
                  style="border-color: #5d80da;"
                >
                  <v-card 
                    flat 
                    class="ma-2 pa-10 pt-0"
                    align="center"
                  >
                    <v-img
                      class="mt-10"
                      height="200px"
                      max-width="300"
                      src="../../assets/email.png"
                    >
                    </v-img>
                    <v-form>
                      <v-card-actions
                        class="justify-center" 
                        style="font-size: 1.1em; font-weight: 400; flex-direction: column;"
                      >
                        Recovery link sent to
                      </v-card-actions>
                      <v-card-actions
                        class="justify-center" 
                        style="font-size: 1.1em; font-weight: 400; padding-top: 0; flex-direction: column; color: #5d80da;"
                      >
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
                          style="cursor: auto;"
                        >
                          Remembered your password?
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
                <v-card
                  v-else
                  elevation="18" 
                  outlined
                  style="border-color: #5d80da;"
                >
                  <div 
                    style="text-align: center; font-size: 1.3em;"
                  ><br>
                    Send a password recover request
                  </div>
                  <br>
                  <v-card-actions 
                    class="ml-12 mr-12 justify-center" 
                    style="font-size: 0.8em; color: #4d70d5;"
                  >
                    Enter the e-mail address of your account to get a recovery link
                  </v-card-actions>
                  <v-card 
                    flat 
                    class="ma-2 pa-10 pt-0"
                  >
                    <v-form>
                      <v-text-field
                        class="mb-4 pl-2 pr-2"
                        v-model="email"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        label="E-mail"
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
                          outlined 
                          color="white" 
                          block 
                          @click="getPasswordRecoveryRequest"
                          style="background-color: #4d70d5;"
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
                          style="cursor: auto;"
                        >
                          Remember your password?
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
.v-card {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

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
