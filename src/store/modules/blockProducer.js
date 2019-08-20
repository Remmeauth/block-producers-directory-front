import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const blockProducerStorageMutations = {
  subscribe: {
    addError: 'blockProducer/addError',
    addFieldsErrors: 'blockProducer/addFieldsErrors',
    getBlockProducer: 'blockProducer/getBlockProducer',
    getBlockProducers: 'blockProducer/getBlockProducers',
    updateDetails: 'blockProducer/updateDetails',
    updateDescription: 'blockProducer/updateDescription',
    updateReferenceLinks: 'blockProducer/updateReferenceLinks',
    searchBlockProducers: 'blockProducer/searchBlockProducers',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    getBlockProducer: 'getBlockProducer',
    getBlockProducers: 'getBlockProducers',
    updateDetails: 'updateDetails',
    updateDescription: 'updateDescription',
    updateReferenceLinks: 'updateReferenceLinks',
    searchBlockProducers: 'searchBlockProducers',
  },
}

export const blockProducerStorageActions = {
  getBlockProducer: 'blockProducer/get',
  getBlockProducers: 'blockProducer/getAll',
  updateDetails: 'blockProducer/updateDetails',
  updateDescription: 'blockProducer/updateDescription',
  updateReferenceLinks: 'blockProducer/updateReferenceLinks',
  searchBlockProducers: 'blockProducer/searchBlockProducers',
}

export const blockProducer = {
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
    blockProducers: null,
    searchedBlockProducers: null,
    name: null,
    location: null,
    shortDescription: null,
    fullDescription: null,
    logoUrl: null,
    facebookUrl: null,
    githubUrl: null,
    linkedInUrl: null,
    redditUrl: null,
    mediumUrl: null,
    steemitUrl: null,
    telegramUrl: null,
    slackUrl: null,
    twitterUrl: null,
    websiteUrl: null,
    wikipediaUrl: null,
    user: null,
    id: null,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addFieldsErrors (state, errors) {
      state.fieldsErrors = errors
    },
    getBlockProducer (state, {
      user,
      id,
      name,
      location,
      shortDescription,
      fullDescription,
      logoUrl,
      facebookUrl,
      githubUrl,
      linkedInUrl,
      redditUrl,
      mediumUrl,
      steemitUrl,
      telegramUrl,
      slackUrl,
      twitterUrl,
      websiteUrl,
      wikipediaUrl,
    }) {
      state.user = user
      state.id = id
      state.name = name
      state.location = location
      state.shortDescription = shortDescription
      state.fullDescription = fullDescription
      state.logoUrl = logoUrl
      state.facebookUrl = facebookUrl
      state.githubUrl = githubUrl
      state.linkedInUrl = linkedInUrl
      state.redditUrl = redditUrl
      state.mediumUrl = mediumUrl
      state.steemitUrl = steemitUrl
      state.telegramUrl = telegramUrl
      state.slackUrl = slackUrl
      state.twitterUrl = twitterUrl
      state.websiteUrl = websiteUrl
      state.wikipediaUrl = wikipediaUrl
    },
    getBlockProducers (state, blockProducers) {
      state.blockProducers = blockProducers.blockProducers
    },
    updateDetails (state, isUpdated) {
      state.isUpdated = isUpdated
    },
    updateDescription (state, isUpdated) {
      state.isUpdated = isUpdated
    },
    updateReferenceLinks (state, isUpdated) {
      state.isUpdated = isUpdated
    },
    searchBlockProducers (state, searchedBlockProducers) {
      state.searchedBlockProducers = searchedBlockProducers
    },
  },
  actions: {
    get({ commit }, { identifier }) {
      axios
        .get(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/`)
        .then(response => {
          commit(blockProducerStorageMutations.commit.getBlockProducer, {
            user: response.data.result.user,
            name: response.data.result.name,
            location: response.data.result.location,
            shortDescription: response.data.result.short_description,
            fullDescription: response.data.result.full_description,
            logoUrl: response.data.result.logo_url,
            facebookUrl: response.data.result.facebook_url,
            githubUrl: response.data.result.github_url,
            linkedInUrl: response.data.result.linkedin_url,
            redditUrl: response.data.result.reddit_url,
            mediumUrl: response.data.result.medium_url,
            steemitUrl: response.data.result.steemit_url,
            telegramUrl: response.data.result.telegram_url,
            slackUrl: response.data.result.slack_url,
            twitterUrl: response.data.result.twitter_url,
            websiteUrl: response.data.result.website_url,
            wikipediaUrl: response.data.result.wikipedia_url,
            id: response.data.result.id,
          })
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.NOT_FOUND) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
    getAll({ commit }) {
      axios
        .get(process.env.VUE_APP_BACK_END_URL + `/block-producers/`)
        .then(response => {
          commit('getBlockProducers', {
            blockProducers: response.data.result,
          })
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
    updateDetails({ commit }, {
      jwtToken,
      identifier, 
      name, 
      location,
    }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/`, {
          name: name,
          location: location,
        }, {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(blockProducerStorageMutations.commit.updateDetails, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(blockProducerStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    updateDescription({ commit }, {
      jwtToken,
      identifier, 
      shortDescription, 
      fullDescription, 
    }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/`, {
          short_description: shortDescription,
          full_description: fullDescription,
        }, {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(blockProducerStorageMutations.commit.updateDescription, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(blockProducerStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    updateReferenceLinks({ commit }, {
        jwtToken,
        identifier, 
        facebookUrl,
        githubUrl,
        linkedInUrl,
        redditUrl,
        mediumUrl,
        steemitUrl,
        telegramUrl,
        slackUrl,
        twitterUrl,
        websiteUrl,
        wikipediaUrl,
      }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/`, {
          facebook_url: facebookUrl,
          github_url: githubUrl,
          linkedin_url: linkedInUrl,
          reddit_url: redditUrl,
          medium_url: mediumUrl,
          steemit_url: steemitUrl,
          telegram_url: telegramUrl,
          slack_url: slackUrl,
          twitter_url: twitterUrl,
          website_url: websiteUrl,
          wikipedia_url: wikipediaUrl,
        }, {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(blockProducerStorageMutations.commit.updateReferenceLinks, true)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(blockProducerStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    searchBlockProducers({ commit }, { phrase }) {
      axios
        .get(process.env.VUE_APP_BACK_END_URL + `/block-producers/search/?phrase=${phrase}/`)
        .then(response => {
          commit(blockProducerStorageMutations.commit.searchBlockProducers, response.data.result)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(blockProducerStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
  }
}

export default blockProducer
