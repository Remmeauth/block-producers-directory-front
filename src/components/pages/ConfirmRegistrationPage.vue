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
                    <v-img
                      class="mt-10"
                      height="200px"
                      max-width="300"
                      src="../../assets/success.png"
                    >
                    </v-img>
                    <v-form>
                      <v-card-actions
                        class="justify-center" 
                        style="font-size: 1.1em; font-weight: 400; flex-direction: column;"
                      >
                        Congratulations! <br>
                        Your registration is confirmed!
                      </v-card-actions>
                      <v-card-actions
                        class="justify-center" 
                        style="font-size: 1.1em; font-weight: 400; padding-top: 0; flex-direction: column; color: #5d80da;"
                      >
                        {{ email }}
                      </v-card-actions>
                    </v-form>
                    <v-card-actions class="justify-center">
                      <!-- <v-btn 
                        outlined 
                        color="white" 
                        block 
                        @click="$router.push({name: 'sign-in'})"
                        style="background-color: #4d70d5;"
                      >
                        Sign in
                      </v-btn> -->
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
// import passwordRecoveryRequestForm from '../../forms/pages/authentication/passwordRecovery'
import { emailStorageActions } from '../../store/modules/email'

export default {
  name: 'email-confirm',
  // mixins: [passwordRecoveryRequestForm],
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
    'emailEvents.isConfirmed'() {
      this.successMessage = `Registration is confirmed by the specified identifier.`
    }
  },
  // methods: {
  //   getConfirmEmailRequest () {
  //     this.$v.$touch()
  //     if (this.$v.$anyError) { return }

  //     this.$store.dispatch(emailStorageActions.getConfirmEmailRequest, {
  //       email: this.email,
  //     })
  //   }
  // },
  mounted() {
    this.$store.dispatch(emailStorageActions.confirmRegistration, {
      identifier: this.$route.params.identifier,
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
