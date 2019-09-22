import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const emailStorageMutations = {
  subscribe: {
    addError: 'email/addError',
    addFieldsErrors: 'email/addFieldsErrors',
    changeEmail: 'email/changeEmail',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    changeEmail: 'changeEmail',
  },
}

export const emailStorageActions = {
  changeEmail: 'email/changeEmail',
} 


export const email = {
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
      isChanged: null,
    },
  },
  getters: {
    emailError: state => state.error,
    emailFieldsErrors: state => state.fieldsErrors,
    emailEvents: state => state.events,
  },
  mutations: {
    addError: (state, error) => state.error = error,
    addFieldsErrors: (state, errors) => state.fieldsErrors = errors,
    changeEmail: (state) => state.events.isChanged = Math.random(),
  },
  actions: {
    changeEmail({ commit }, { username, jwtToken, newEmail }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/users/${username}/email/`, {
          new_email: newEmail,
        }, {
          headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          commit(emailStorageMutations.commit.changeEmail)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(emailStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(emailStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
  },
}

export default email
