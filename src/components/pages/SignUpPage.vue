<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    <v-layout>
      <v-flex xs12 sm8 md4 lg4 xl4 offset-xs offset-sm2 offset-md4 offset-lg4 offset-xl4 style="margin-top: 90px;">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card 
                  elevation="18" 
                  outlined
                  style="border-color: #5d80da;"
                >
                  <div 
                    style="text-align: center; font-size:1.7em;"
                  ><br>
                    Sign up to Directory
                  </div>
                  <v-card flat class="ma-2 pa-10">
                    <v-form>
                      <v-text-field class="mb-4 pl-2 pr-2" 
                        v-model="email"
                        label="E-mail"
                        outlined 
                        prepend-inner-icon="email"
                        required
                      ></v-text-field>
                      <v-text-field class="mb-4 pl-2 pr-2"
                        v-model="username"
                        label="Username"
                        outlined 
                        prepend-inner-icon="person"
                        required
                      ></v-text-field>
                      <v-text-field class="mb-4 pl-2 pr-2"
                        v-model="password" 
                        label="Password" 
                        outlined 
                        prepend-inner-icon="lock" 
                        type="password" 
                        required
                      ></v-text-field>
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
                          class="custom-btn text-none" 
                          :ripple="false"
                          text
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
                            Sign in
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
import store from '../../store/index'
import { authenticationStorageActions, authenticationStorageMutations } from '../../store/modules/authentication'

export default {
  name: 'SinUpPage',
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      email: null,
      username: null,
      password: null,
    }
  },
  methods: {
    signUp () {
      store.dispatch(authenticationStorageActions.signUp, {
        email: this.email,
        username: this.username,
        password: this.password,
      })
    }
  },
  mounted() {
    store.subscribe((mutation, state) => {
      if (mutation.type === authenticationStorageMutations.subscribe.addError) {
        this.error = state.authentication.error
      }

      if (mutation.type === authenticationStorageMutations.subscribe.addFieldsErrors) {
        this.fieldsErrors = state.authentication.fieldsErrors
      }

      if (mutation.type === authenticationStorageMutations.subscribe.addToken) {
        this.localStorage.token = state.authentication.token
        this.$router.push('/')
      }

      if (mutation.type === authenticationStorageMutations.subscribe.markAsSignedUp) {
        this.localStorage.email = this.email
        this.localStorage.username = this.username

        store.dispatch(authenticationStorageActions.signIn, {
          usernameOrEmail: this.email,
          password: this.password,
        })
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
</style>
