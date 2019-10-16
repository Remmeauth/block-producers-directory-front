import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const authenticationStorageMutations = {
  subscribe: {
    addSignInError: 'authentication/addSignInError',
    addSignUpError: 'authentication/addSignUpError',
    addToken: 'authentication/addToken',
    signUp: 'authentication/signUp',
  },
  commit: {
    addSignInError: 'addSignInError',
    addSignUpError: 'addSignUpError',
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
    errorSignIn: {
      message: null,
      statusCode: null,
    },
    errorSignUp: {
      message: null,
      statusCode: null,
    },
    events: {
      signedIn: null,
      signedUp: null,
    },
    entity: {
      token: null,
    }
  },
  getters: {
    authenticationSignInError: state => state.errorSignIn,
    authenticationSignUpError: state => state.errorSignUp,
    authenticationEvents: state => state.events,
    credentials: state => state.entity,
  },
  mutations: {
    addSignInError: (state, error) => state.errorSignIn = error,
    addSignUpError: (state, error) => state.errorSignUp = error,
    addToken: (state, credentials) => {
      state.entity = credentials
      state.events.signedIn = Math.random()
    },
    signUp: (state) => state.events.signedUp = Math.random(),
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
            commit(authenticationStorageMutations.commit.addSignInError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(authenticationStorageMutations.commit.addSignInError, {
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
            commit(authenticationStorageMutations.commit.addSignUpError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(authenticationStorageMutations.commit.addSignUpError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    }
  }
}

export default authentication
