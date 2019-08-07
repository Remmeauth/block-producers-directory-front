<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    <form>
      <v-text-field
        v-model="usernameOrEmail"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        solo
        required
      ></v-text-field>

      <v-btn @click="signIn">Sign In</v-btn>
    </form>
    </div>
</template>

<script>
import store from '../../store/index'

import {
  AUTHENTICATION_ADD_ERROR_MUTATION,
  AUTHENTICATION_ADD_TOKEN_MUTATION,
  AUTHENTICATION_DO_ACTION,
} from '../../store/modules/authentication'

export default {
  name: 'LoginPage',
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
      store.dispatch(AUTHENTICATION_DO_ACTION, {
        usernameOrEmail: this.usernameOrEmail,
        password: this.password,
      })
    }
  },
  mounted() {
    store.subscribe((mutation, state) => {
      if (mutation.type === AUTHENTICATION_ADD_ERROR_MUTATION) {
        this.error = state.authentication.error
      }

      if (mutation.type === AUTHENTICATION_ADD_TOKEN_MUTATION) {
        this.localStorage.token = state.authentication.token
        this.$router.push('/')
      }
    });
  }
}
</script>

<style></style>
