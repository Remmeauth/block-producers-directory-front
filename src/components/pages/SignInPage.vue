<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex class="mt-6 mb-12" xs12 sm8 md4 lg4 xl4 offset-xs offset-sm2 offset-md4 offset-lg4 offset-xl4>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card 
                  elevation="18" 
                  outlined
                  style="border-color: #5d80da;"
                >
                  <div class="mt-10"
                    style="text-align: center; font-size:1.7em;"
                  >
                    Sign in to Directory
                  </div>
                  <v-card flat class="ma-2 pa-10 pt-5">
                    <v-form>
                      <v-text-field
                        class="mb-6 pl-2 pr-2"
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
                        class="justify-center pt-0 pb-0" 
                        style="flex-direction: column;"
                      >
                        <v-btn 
                          class="custom-btn text-none" 
                          :ripple="false"
                          text
                          color="#5d80da" 
                          @click="$router.push({name: 'password-recover'})"
                        >
                          Forgot password?
                        </v-btn>
                        <v-btn  
                          class="custom-btn-second text-none" 
                          :ripple="false"
                          text
                          style="cursor: auto;"
                        >
                          Don't have an account? 
                          <v-btn 
                            class="custom-btn text-none" 
                            :ripple="false" 
                            text
                            color="#5d80da" 
                            @click="$router.push({name: 'sign-up'})"
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
import Error500 from '../../components/ui/Error500'
import signInForm from '../../forms/pages/authentication/signIn'
import { authenticationStorageActions, authenticationStorageMutations } from '../../store/modules/authentication'
import { userStorageActions, userStorageMutations } from '../../store/modules/user'

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
  methods: {
    signIn () {
      this.$v.$touch()
      if (this.$v.$anyError) { return }

      this.$store.dispatch(authenticationStorageActions.signIn, {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password,
      })
    }
  },
  mounted() {
    const unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === authenticationStorageMutations.subscribe.addError) {
        this.error = state.authentication.error
        unsubscribe()
      }

      if (mutation.type === userStorageMutations.subscribe.addError) {
        this.error = state.user.error
        unsubscribe()
      }

      if (mutation.type === authenticationStorageMutations.subscribe.addToken) {
        this.localStorage.token = state.authentication.token
        this.$store.dispatch(userStorageActions.getUserFromToken, {
          jwtToken: state.authentication.token,
        })
      }

      if (mutation.type === userStorageMutations.subscribe.addUser) {
        this.localStorage.email = state.user.email
        this.localStorage.username = state.user.username
        this.$router.push({name: 'index'})
        unsubscribe()
      }
    });
  }
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
