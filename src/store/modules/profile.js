import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const profileStorageMutations = {
  subscribe: {
    addError: 'profile/addError',
    addProfile: 'profile/addProfile',
  },
  commit: {
    addError: 'addError',
    addProfile: 'addProfile',
  },
}

export const profileStorageActions = {
  getProfile: 'profile/get',
}

export const profile = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
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
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addProfile (state, {
      firstName,
      lastName,
      additionalInformation,
      avatarUrl,
      facebookUrl,
      githubUrl,
      linkedInUrl,
      location,
      mediumUrl,
      steemitUrl,
      telegramUrl,
      twitterUrl,
      websiteUrl,
    }) {
      state.firstName = firstName
      state.lastName = lastName
      state.additionalInformation = additionalInformation
      state.avatarUrl = avatarUrl
      state.facebookUrl = facebookUrl
      state.githubUrl = githubUrl
      state.linkedInUrl = linkedInUrl
      state.location = location
      state.mediumUrl = mediumUrl
      state.steemitUrl = steemitUrl
      state.telegramUrl = telegramUrl
      state.twitterUrl = twitterUrl
      state.websiteUrl = websiteUrl
    },
  },
  actions: {
    get({ commit }, { username }) {
    axios
      .get(process.env.VUE_APP_BACK_END_URL + `/users/${username}/profile/`)
      .then(response => {
        commit(profileStorageMutations.commit.addProfile, {
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
  }
}

export default profile
