import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const passwordStorageMutations = {
  subscribe: {
    addError: 'password/addError',
    addFieldsErrors: 'password/addFieldsErrors',
    sendNewPasswordToEmail: 'password/sendNewPasswordToEmail',
    receivePasswordRecoveryRequest: 'password/receivePasswordRecoveryRequest',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    sendNewPasswordToEmail: 'sendNewPasswordToEmail',
    receivePasswordRecoveryRequest: 'receivePasswordRecoveryRequest',
  },
}

export const passwordStorageActions = {
  sendNewPasswordToEmail: 'password/sendNewPasswordToEmail',
  getPasswordRecoveryRequest: 'password/getPasswordRecoveryRequest',
}


export const password = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    fieldsErrors: {
      errors: null,
      statusCode: null,
    },
    isSent: null,
    isReceived: null,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addFieldsErrors (state, errors) {
      state.fieldsErrors = errors
    },
    sendNewPasswordToEmail (state, isSent) {
      state.isSent = isSent
    },
    receivePasswordRecoveryRequest (state, isReceived) {
      state.isReceived = isReceived
    },
  },
  actions: {
    getPasswordRecoveryRequest({ commit }, { email }) {
      axios
        .post(`https://bps-directory-back-staging.herokuapp.com/users/password/recovery/`, {
          email: email,
        })
        .then(response => {
          commit(passwordStorageMutations.commit.receivePasswordRecoveryRequest, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(passwordStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(passwordStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    sendNewPasswordToEmail({ commit }, { identifier }) {
      axios
        .post(`https://bps-directory-back-staging.herokuapp.com/users/password/recovery/${identifier}/`)
        .then(response => {
          commit(passwordStorageMutations.commit.sendNewPassword, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(passwordStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
  },
}

export default password
