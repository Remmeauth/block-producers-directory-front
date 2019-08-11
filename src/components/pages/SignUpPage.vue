<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    <form>
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm6 md4>
            <v-text-field
              v-model="email"
              label="E-mail"
              solo
              required
            ></v-text-field>
            <v-text-field
              v-model="username"
              label="Username"
              solo
              required
            ></v-text-field>
            <v-text-field
              v-model="password" 
              label="Password"
              solo
              required
            ></v-text-field>

            <v-btn @click="signUp">Sign Up</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
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

      if (mutation.type === authenticationStorageMutations.subscribe.markAsSignedUp) {
        window.localStorage.email = this.email
        window.localStorage.username = this.username
        this.$router.push('/')
      }
    });
  }
}
</script>

<style></style>
