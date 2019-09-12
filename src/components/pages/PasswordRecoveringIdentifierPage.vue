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
                        class="justify-center" 
                        style="flex-direction: row;"
                      >
                      <v-img
                        class="mt-10"
                        max-width="100"
                        style="width: 20%"
                        src="../../assets/key.png"
                      >
                      </v-img>
                      <v-img
                        class="mt-10 mb-10"
                        min-width="200"
                        style="width:35%"
                        src="../../assets/email_to.png"
                      >
                      </v-img>
                    </v-card-actions>
                    <v-form class="align-justify">
                      Please check <b style="color:#5d80da;">
                        {{ this.localStorage.recoveryEmail }}
                      </b> email address for a message with your new password.
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
import { passwordStorageActions } from '../../store/modules/password'

export default {
  name: 'password-recovering-identifier',
  components: {
    Error500,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
    }
  },
  computed: {
    ...mapGetters('password', ['passwordError']),
  },
  mounted() {
    this.$store.dispatch(passwordStorageActions.sendNewPasswordToEmail, {
      identifier: this.$route.params.identifier,
    })
  }
}
</script>

<style>
.v-card {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
