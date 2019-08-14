<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    <form>
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm6 md4>
            <v-text-field
              v-model="usernameOrEmail" 
              label="Username or e-mail"
              solo
              required
            ></v-text-field>
            <v-text-field
              v-model="password" 
              label="Password"
              solo
              required
            ></v-text-field>

            <v-btn @click="signIn">Sign In</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
    </div>
</template>

<script>
import store from '../../store/index'
import { authenticationStorageActions, authenticationStorageMutations } from '../../store/modules/authentication'
import { userStorageActions, userStorageMutations } from '../../store/modules/user'

export default {
  name: 'SignInPage',
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
      store.dispatch(authenticationStorageActions.signIn, {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password,
      })
    }
  },
  mounted() {
    store.subscribe((mutation, state) => {
      if (
        mutation.type === authenticationStorageMutations.subscribe.addError ||
        mutation.type === userStorageMutations.subscribe.addError
      ) {
        this.error = state.authentication.error
      }

      if (mutation.type === authenticationStorageMutations.subscribe.addToken) {
        this.localStorage.token = state.authentication.token
        store.dispatch(userStorageActions.getUserFromToken, {
          jwtToken: state.authentication.token,
        })
      }

      if (mutation.type === userStorageMutations.subscribe.addUser) {
        this.localStorage.email = state.user.email
        this.localStorage.username = state.user.username
        this.$router.push('/')
      }
    });
  }
}
</script>

<style></style>
