import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const profileStorageMutations = {
  subscribe: {
    addError: 'profile/addError',
    addFieldsErrors: 'profile/addFieldsErrors',
    addProfile: 'profile/addProfile',
    updateDetails: 'profile/updateDetails',
    updateAdditionalInformation: 'profile/updateAdditionalInformation',
    updateReferenceLinks: 'profile/updateReferenceLinks',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    addProfile: 'addProfile',
    updateDetails: 'updateDetails',
    updateAdditionalInformation: 'updateAdditionalInformation',
    updateReferenceLinks: 'updateReferenceLinks',
  },
}

export const profileStorageActions = {
  getProfile: 'profile/get',
  updateDetails: 'profile/updateDetails',
  updateAdditionalInformation: 'profile/updateAdditionalInformation',
  updateReferenceLinks: 'profile/updateReferenceLinks',
}

export const profile = {
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
      detailsAreUpdated: false,
      additionalInformationIsUpdated: false,
      referenceLinksAreUpdated: false,
    },
    entity: {
      userId: null,
      firstName: null,
      lastName: null,
      additionalInformation: null,
      avatarUrl: null,
      facebookUrl: null,
      githubUrl: null,
      linkedInUrl: null,
      location: null,
      mediumUrl: null,
      steemitUrl: null,
      telegramUrl: null,
      twitterUrl: null,
      websiteUrl: null,
    },
  },
  getters: {
    profileError: state => state.error,
    profileFieldsErrors: state => state.fieldsErrors,
    profileEvents: state => state.events,
    profile: state => state.entity,
  },
  mutations: {
    addError: (state, error) => state.error = error,
    addFieldsErrors: (state, errors) => state.fieldsErrors = errors,
    addProfile: (state, { profile }) => state.entity = profile,
    updateDetails: (state) => state.events.detailsAreUpdated = true,
    updateAdditionalInformation: (state) => state.events.additionalInformationIsUpdated = true,
    updateReferenceLinks: (state) => state.events.referenceLinksAreUpdated = true,
  },
  actions: {
    get({ commit }, { username }) {
      axios
        .get(process.env.VUE_APP_BACK_END_URL + `/users/${username}/profile/`)
        .then(response => {
          commit(profileStorageMutations.commit.addProfile, {
            profile: {
              additionalInformation: response.data.result.additional_information,
              firstName: response.data.result.first_name,
              lastName: response.data.result.last_name,
              avatarUrl: response.data.result.avatar_url,
              facebookUrl: response.data.result.facebook_url,
              githubUrl: response.data.result.github_url,
              linkedInUrl: response.data.result.linkedin_url,
              location: response.data.result.location,
              mediumUrl: response.data.result.medium_url,
              steemitUrl: response.data.result.steemit_url,
              telegramUrl: response.data.result.telegram_url,
              twitterUrl: response.data.result.twitter_url,
              websiteUrl: response.data.result.website_url,
            }
          })
        })
        .catch(error => {
          if (error.response.status === HttpStatus.NOT_FOUND) {
            commit(profileStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(profileStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
    updateDetails({ commit }, {
        jwtToken,
        username,
        firstName,
        lastName,
        location
      }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/users/${username}/profile/`, {
          first_name: firstName,
          last_name: lastName,
          location: location,
        }, {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(profileStorageMutations.commit.updateDetails, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(profileStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(profileStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    updateReferenceLinks({ commit }, {
        jwtToken,
        username,
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
        .post(process.env.VUE_APP_BACK_END_URL + `/users/${username}/profile/`, {
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
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(profileStorageMutations.commit.updateReferenceLinks, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(profileStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(profileStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    updateAdditionalInformation({ commit }, {
        jwtToken,
        username,
        additionalInformation
      }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/users/${username}/profile/`, {
          additional_information: additionalInformation,
        }, {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(profileStorageMutations.commit.updateAdditionalInformation, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(profileStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(profileStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
  }
}

export default profile
