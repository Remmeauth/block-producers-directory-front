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
                  elevation="18" 
                  outlined
                  style="border-color: #5d80da;"
                >
                  <v-card 
                    flat 
                    class="ma-2 pa-10 pt-0"
                    align="center"
                  >
                    <v-card-actions
                      class="pt-8 justify-center"
                      style="font-size: 1.2em; font-weight: 500; flex-direction: column;"
                    >
                      Please confirm your registration!
                    </v-card-actions>
                    <v-img
                      class=""
                      height="150px"
                      max-width="200"
                      src="../../assets/email.png"
                    >
                    </v-img>
                    <v-form>
                      <v-card-actions
                        class="justify-center"
                        style="font-size: 1em; flex-direction: column;"
                      >
                        Confirm registration by clicking on the link sent in your e-mail:
                      </v-card-actions>
                      <v-card-actions
                        class="pt-0 justify-center"
                        style="font-size: 1em; font-weight: 600; flex-direction: column; color: #5d80da;"
                      >
                        {{ email }}
                      </v-card-actions>
                    </v-form>
                    <v-card-actions 
                      class="pb-0 justify-center"
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
      this.successMessage = 'Registration confirmation link sent to the email address — check it.'
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
