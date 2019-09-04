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
  getUserFromToken: 'user/getFromToken',
}

export const user = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    events: {
      isGotten: false
    },
    entity: {
      email: null,
      username: null,
    },
  },
  getters: {
    userError: state => state.error,
    userEvents: state => state.events,
    user: state => state.entity,
  },
  mutations: {
    addError: (state, error) => state.error = error,
    addUser: (state, user) => {
      state.entity = user
      state.events.isGotten = true
    },
  },
  actions: {
    get({ commit }, { username }) {
      axios
      .get(process.env.VUE_APP_BACK_END_URL + `/users/${username}/`)
      .then(response => {
        commit(userStorageMutations.commit.addUser, {
          email: response.data.result.email,
          username: response.data.result.username,
        })
      })
      .catch(error => {
        if (error.response.status === HttpStatus.NOT_FOUND) {
          commit(userStorageMutations.commit.addError, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }

        if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          commit(userStorageMutations.commit.addError, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }
      })
    },
    getFromToken({ commit }, { jwtToken }) {
      axios
      .get(process.env.VUE_APP_BACK_END_URL + '/users/', {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
      })
      .then(response => {
        commit(userStorageMutations.commit.addUser, {
          email: response.data.result.email,
          username: response.data.result.username,
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
