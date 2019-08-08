import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const settingsStorageMutations = {
  subscribe: {
    addError: 'settings/addError',
    addFieldsErrors: 'settings/addFieldsErrors',
    updateDetails: 'settings/updateDetails',
    updateReferenceLinks: 'settings/updateReferenceLinks',
    updateAdditionalInformation: 'settings/updateAdditionalInformation',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    updateDetails: 'updateDetails',
    updateReferenceLinks: 'updateReferenceLinks',
    updateAdditionalInformation: 'updateAdditionalInformation',
  },
}

export const settingsStorageActions = {
  updateDetails: 'settings/updateDetails',
  updateReferenceLinks: 'settings/updateReferenceLinks',
  updateAdditionalInformation: 'settings/updateAdditionalInformation',
}


export const settings = {
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
    isUpdated: false,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addFieldsErrors (state, errors) {
      state.fieldsErrors = errors
    },
    updateDetails (state, isUpdated) {
      state.isUpdated = isUpdated
    },
    updateReferenceLinks (state, isUpdated) {
      state.isUpdated = isUpdated
    },
    updateAdditionalInformation (state, isUpdated) {
      state.isUpdated = isUpdated
    },
  },
  actions: {
    updateDetails({ commit }, {
        firstName,
        lastName,
        location
      }) {
      axios
        .post(`https://bps-directory-back-staging.herokuapp.com/users/${window.localStorage.username}/profile/`, {
          first_name: firstName,
          last_name: lastName,
          location: location,
        }, {
            headers: {
                'Authorization': `JWT ${window.localStorage.token.slice(1, -1)}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(settingsStorageMutations.commit.updateDetails, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(settingsStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(settingsStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    updateReferenceLinks({ commit }, {
        websiteUrl,
        linkedInUrl,
        twitterUrl,
        mediumUrl,
        githubUrl,
        facebookUrl,
        telegramUrl,
        steemitUrl
      }) {
      axios
        .post(`https://bps-directory-back-staging.herokuapp.com/users/${window.localStorage.username}/profile/`, {
          website_url: websiteUrl,
          linkedin_url: linkedInUrl,
          twitter_url: twitterUrl,
          medium_url: mediumUrl,
          github_url: githubUrl,
          facebook_url: facebookUrl,
          telegram_url: telegramUrl,
          steemit_url: steemitUrl,
        }, {
            headers: {
                'Authorization': `JWT ${window.localStorage.token.slice(1, -1)}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(settingsStorageMutations.commit.updateReferenceLinks, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(settingsStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(settingsStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    updateAdditionalInformation({ commit }, {
        additionalInformation
      }) {
      axios
        .post(`https://bps-directory-back-staging.herokuapp.com/users/${window.localStorage.username}/profile/`, {
          additional_information: additionalInformation,
        }, {
            headers: {
                'Authorization': `JWT ${window.localStorage.token.slice(1, -1)}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(settingsStorageMutations.commit.updateAdditionalInformation, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(settingsStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(settingsStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
  }
}

export default settings
