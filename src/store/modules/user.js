import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const userStorageMutations = {
  subscribe: {
    addError: 'user/addError',
    addUser: 'user/addUser',
  },
  commit: {
    addError: 'addError',
    addUser: 'addUser',
  },
}

export const userStorageActions = {
  getUser: 'user/get',
}

export const user = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    email: null,
    username: null,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addUser (state, { email, username}) {
      state.email = email
      state.username = username
    },
  },
  actions: {
    get({ commit }, { username }) {
      axios
      .get(`https://bps-directory-back-staging.herokuapp.com/users/${username}/`)
      .then(response => {
        commit(userStorageMutations.commit.addUser, {
          email: response.data.result.email,
          username: response.data.result.username
        })
      })
      .catch(error => {
        if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          commit(userStorageMutations.commit.addError, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }
      })
    },
  }
}

export default user
