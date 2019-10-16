<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex class="mt-8 mb-12" xs12 sm6 md4 lg4 xl2 offset-xs offset-sm3 offset-md4 offset-lg4 offset-xl5>
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
                    class="ma-2 pa-10 pt-0 pb-5"
                    align="center"
                  >
                    <v-img
                      class="mt-7 mb-4"
                      height="135px"
                      max-width="135"
                      src="../../assets/success_registration.png"
                    >
                    </v-img>
                    <v-form>
                      <v-card-actions
                        class="heading justify-center"
                        style="flex-direction: column;"
                      >
                        <b class="heading">Congratulations!</b>
                        Your registration is confirmed!
                      </v-card-actions>
                    </v-form>
                    <v-card-actions class="pb-0 justify-center">
                      <v-btn
                        class="text-none white--text"
                        outlined
                        block
                        @click="$router.push({name: 'sign-in'})"
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
  name: 'confirm-registration',
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
  mounted() {
    this.$store.dispatch(emailStorageActions.confirmRegistration, {
      identifier: this.$route.params.identifier,
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
