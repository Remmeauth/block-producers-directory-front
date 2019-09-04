import axios from 'axios'
import HttpStatus from 'http-status-codes'
import Vue from 'vue'

export const authenticationStorageMutations = {
  subscribe: {
    addError: 'authentication/addError',
    addToken: 'authentication/addToken',
    signUp: 'authentication/signUp',
  },
  commit: {
    addError: 'addError',
    addToken: 'addToken',
    signUp: 'signUp',
  },
}

export const authenticationStorageActions = {
  signIn: 'authentication/signIn',
  signUp: 'authentication/signUp',
}

export const authentication = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    events: {
      signedIn: false,
      signedUp: false,
    },
    entity: {
      token: null,
    }
  },
  getters: {
    authenticationError: state => state.error,
    authenticationEvents: state => state.events,
    credentials: state => state.entity,
  },
  mutations: {
    addError: (state, error) => state.error = error,
    addToken: (state, credentials) => {
      state.entity = credentials
      state.events.signedIn = true
    },
    signUp: (state) => state.events.signedUp = true,
  },
  actions: {
    signIn({ commit }, { usernameOrEmail, password }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + '/authentication/token/obtaining/', {
          username_or_email: usernameOrEmail,
          password: password,
        })
        .then(response => {
          commit(authenticationStorageMutations.commit.addToken, {
            token: response.data.token,
          })
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(authenticationStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(authenticationStorageMutations.commit.addError, {
              message: error.response.data.non_field_errors[0],
              statusCode: error.response.status
            })
          }
        })
    },
    signUp({ commit }, { email, username, password }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + '/users/registration/', {
          email: email,
          username: username,
          password: password,
        })
        .then(response => {
          commit(authenticationStorageMutations.commit.signUp)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(authenticationStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(authenticationStorageMutations.commit.addError, {
              message: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    }
  }
}

export default authentication
