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
                  elevation="2"
                  outlined
                  style="border: 1px solid #e7e7f3;"
                >
                  <v-card 
                    flat 
                    class="ma-2 pa-10 pt-3 pb-5"
                    align="center"
                  >
                    <v-card-actions
                      class="justify-center"
                      style="flex-direction: column;"
                    >
                      <h3 class="heading"
                      >
                        Please confirm your registration!
                      </h3>
                    </v-card-actions>
                    <v-img
                      height="150px"
                      max-width="200"
                      src="../../assets/email.png"
                    >
                    </v-img>
                    <v-form>
                      <v-card-actions
                        class="description pb-0 justify-center"
                        style="flex-direction: column;"
                      >
                        Confirm registration by clicking on the link sent in your e-mail:
                      </v-card-actions>
                      <v-card-actions
                        class="description pt-0 justify-center"
                        style="flex-direction: column; color: #364fcc;"
                      >
                        <b style="color: #364fcc;"> {{ email }} </b>
                      </v-card-actions>
                    </v-form>
                    <v-card-actions 
                      class="description pb-0 justify-center"
                      style="flex-direction: column; font-size: 0.7em;"
                    >
                      If you don’t receive a confirmation e-mail within the next minutes,
                      please also check your junk mail.
                    </v-card-actions>
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
import { emailStorageActions } from '../../store/modules/email'

export default {
  name: 'confirm-email',
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
    ...mapGetters('email', ['emailError', 'emailFieldsErrors', 'emailEvents']),
  },
  watch: {
    'emailEvents.isSent'() {
      this.successMessage = 'Registration confirmation link sent to the email address.'
      this.email = this.localStorage.confirmEmail
    }
  },
  mounted() {
    this.$store.dispatch(emailStorageActions.getConfirmEmailRequest, {
      email: this.localStorage.confirmEmail,
    })
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
