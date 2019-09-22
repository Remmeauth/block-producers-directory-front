import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const passwordStorageMutations = {
  subscribe: {
    addError: 'password/addError',
    addFieldsErrors: 'password/addFieldsErrors',
    sendNewPasswordToEmail: 'password/sendNewPasswordToEmail',
    receivePasswordRecoveryRequest: 'password/receivePasswordRecoveryRequest',
    changePassword: 'password/changePassword',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    sendNewPasswordToEmail: 'sendNewPasswordToEmail',
    receivePasswordRecoveryRequest: 'receivePasswordRecoveryRequest',
    changePassword: 'changePassword',
  },
}

export const passwordStorageActions = {
  sendNewPasswordToEmail: 'password/sendNewPasswordToEmail',
  getPasswordRecoveryRequest: 'password/getPasswordRecoveryRequest',
  changePassword: 'password/changePassword',
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
    events: {
      isSent: null,
      isReceived: null,
      isChanged: null,
    },
  },
  getters: {
    passwordError: state => state.error,
    passwordFieldsErrors: state => state.fieldsErrors,
    passwordEvents: state => state.events,
  },
  mutations: {
    addError: (state, error) => state.error = error,
    addFieldsErrors: (state, errors) => state.fieldsErrors = errors,
    sendNewPasswordToEmail: (state) => state.events.isSent = Math.random(),
    receivePasswordRecoveryRequest: (state) => state.events.isReceived = Math.random(),
    changePassword: (state) => state.events.isChanged = Math.random(),
  },
  actions: {
    changePassword({ commit }, { username, jwtToken, oldPassword, newPassword }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/users/${username}/password/`, {
          old_password: oldPassword,
          new_password: newPassword,
        }, {
          headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          commit(passwordStorageMutations.commit.changePassword)
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
              errors: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
    getPasswordRecoveryRequest({ commit }, { email }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + '/users/password/recovery/', {
          email: email,
        })
        .then(response => {
          commit(passwordStorageMutations.commit.receivePasswordRecoveryRequest)
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
        .post(process.env.VUE_APP_BACK_END_URL + `/users/password/recovery/${identifier}/`)
        .then(response => {
          commit(passwordStorageMutations.commit.sendNewPassword)
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
