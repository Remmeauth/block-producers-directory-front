import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const blockProducerStorageMutations = {
  subscribe: {
    addError: 'blockProducer/addError',
    addFieldsErrors: 'blockProducer/addFieldsErrors',
    addBlockProducer: 'blockProducer/addBlockProducer',
    addBlockProducers: 'blockProducer/addBlockProducers',
    addSearchedBlockProducers: 'blockProducer/addSearchedBlockProducers',
    updateDetails: 'blockProducer/updateDetails',
    updateDescription: 'blockProducer/updateDescription',
    updateReferenceLinks: 'blockProducer/updateReferenceLinks',
    createBlockProducer: 'blockProducer/createBlockProducer',
    deleteBlockProducer: 'blockProducer/deleteBlockProducer',
    sendStatusDescriptionToEmail: 'blockProducer/sendStatusDescriptionToEmail',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    addBlockProducer: 'addBlockProducer',
    addBlockProducers: 'addBlockProducers',
    addSearchedBlockProducers: 'addSearchedBlockProducers',
    updateDetails: 'updateDetails',
    updateDescription: 'updateDescription',
    updateReferenceLinks: 'updateReferenceLinks',
    createBlockProducer: 'createBlockProducer',
    deleteBlockProducer: 'deleteBlockProducer',
    sendStatusDescriptionToEmail: 'sendStatusDescriptionToEmail',
  },
}

export const blockProducerStorageActions = {
  getBlockProducer: 'blockProducer/get',
  getBlockProducers: 'blockProducer/getAll',
  searchBlockProducers: 'blockProducer/searchBlockProducers',
  updateDetails: 'blockProducer/updateDetails',
  updateDescription: 'blockProducer/updateDescription',
  updateReferenceLinks: 'blockProducer/updateReferenceLinks',
  createBlockProducer: 'blockProducer/create',
  deleteBlockProducer: 'blockProducer/delete',
  sendStatusDescriptionToEmail: 'blockProducer/sendStatusDescriptionToEmail',
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
    events: {
      detailsAreUpdated: null,
      descriptionsAreUpdated: null,
      referenceLinksAreUpdated: null,
      isCreated: null,
      isGotten: null,
      isDeleted: null,
      isSent: false,
    },
    entity: {
      name: null,
      status: null,
      status_description: null,
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
    entities: null,
    searchedEntities: null,
    searchedBlockProducers: null,
  },
  getters: {
    blockProducerError: state => state.error,
    blockProducerFieldsErrors: state => state.fieldsErrors,
    blockProducer: state => state.entity,
    blockProducers: state => state.entities,
    searchedBlockProducers: state => state.searchedEntities,
    blockProducerEvents: state => state.events,
  },
  mutations: {
    addError: (state, error) => state.error = error,
    addFieldsErrors: (state, errors) => state.fieldsErrors = errors,
    addBlockProducer: (state, { blockProducer }) => {
      state.entity = blockProducer
      state.events.isGotten = Math.random()
    },
    addBlockProducers: (state, { blockProducers }) => state.entities = blockProducers,
    addSearchedBlockProducers: (state, { searchedBlockProducers }) => state.searchedEntities = searchedBlockProducers,
    updateDetails: (state) => state.events.detailsAreUpdated = Math.random(),
    updateDescription: (state) => state.events.descriptionsAreUpdated = Math.random(),
    updateReferenceLinks: (state) => state.events.referenceLinksAreUpdated = Math.random(),
    createBlockProducer: (state, blockProducerIdentifier) => {
      state.entity.id = blockProducerIdentifier
      state.events.isCreated = Math.random()
    },
    deleteBlockProducer: (state) => state.events.isDeleted = Math.random(),
    sendStatusDescriptionToEmail: (state) => state.events.isSent = true,
  },
  actions: {
    get({ commit }, { identifier }) {
      axios
        .get(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/`)
        .then(response => {
          commit(blockProducerStorageMutations.commit.addBlockProducer, {
            blockProducer: {
              user: response.data.result.user,
              status: response.data.result.status,
              status_description: response.data.result.status_description,
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
            },
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
          commit(blockProducerStorageMutations.commit.addBlockProducers, {
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
      websiteUrl,
    }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/`, {
          name: name,
          location: location,
          website_url: websiteUrl,
        }, {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(blockProducerStorageMutations.commit.updateDetails)
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
          commit(blockProducerStorageMutations.commit.updateDescription)
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
          commit(blockProducerStorageMutations.commit.updateReferenceLinks)
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
          commit(blockProducerStorageMutations.commit.addSearchedBlockProducers, {
            searchedBlockProducers: response.data.result,
          })
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
    create({ commit }, {
      jwtToken,
      name,
      location,
      shortDescription,
      fullDescription,
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
        .put(process.env.VUE_APP_BACK_END_URL + '/block-producers/', {
          name: name,
          location: location,
          short_description: shortDescription,
          full_description: fullDescription,
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
          commit(blockProducerStorageMutations.commit.createBlockProducer, response.data.result.id)
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
    delete({ commit }, { jwtToken, identifier }) {
      axios
        .delete(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/`, {
          headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          commit(blockProducerStorageMutations.commit.deleteBlockProducer)
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
              errors: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
    sendStatusDescriptionToEmail({ commit }, { email, identifier }) {
      axios
        .post(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/description/`, {
          email: email,
        })
        .then(response => { console.log(response.data.result)
          commit(blockProducerStorageMutations.commit.sendStatusDescriptionToEmail)
        })
        .catch(error => { console.log(error.response.data)
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST || error.response.status === HttpStatus.NOT_FOUND) {
            commit(blockProducerStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    }
  }
}

export default blockProducer
