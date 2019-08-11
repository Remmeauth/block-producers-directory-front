import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const ADD_ERROR_MUTATION = 'addError'
export const ADD_TOKEN_MUTATION = 'addToken'

export const AUTHENTICATION_ADD_ERROR_MUTATION = 'authentication/' + ADD_ERROR_MUTATION
export const AUTHENTICATION_ADD_TOKEN_MUTATION = 'authentication/' + ADD_TOKEN_MUTATION

export const AUTHENTICATION_DO_ACTION = 'authentication/do'

export const authentication = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    token: null,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addToken (state, token) {
      state.token = token
    },
  },
  actions: {
    do({ commit }, { usernameOrEmail, password }) {
      axios
        .post(`https://bps-directory-back-staging.herokuapp.com/authentication/token/obtaining`, {
          username_or_email: usernameOrEmail,
          password: password,
        })
        .then(response => {
          commit(ADD_TOKEN_MUTATION, response.data.token)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(ADD_ERROR_MUTATION, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(ADD_ERROR_MUTATION, {
              message: error.response.data.non_field_errors[0],
              statusCode: error.response.status
            })
          }
        })
    }
  }
}

export default authentication
