import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const ADD_ERROR_MUTATION = 'addError'
export const ADD_FIELDS_ERRORS_MUTATION = 'addFieldsErrors'
export const CREATE_BLOCK_PRODUCER_MUTATION = 'createBlockProducer'
export const BLOCK_PRODUCER_CREATION_ADD_ERROR_MUTATION = 'blockProducerCreation/' + ADD_ERROR_MUTATION
export const BLOCK_PRODUCER_CREATION_ADD_FIELDS_ERRORS_MUTATION = 'blockProducerCreation/' + ADD_FIELDS_ERRORS_MUTATION
export const BLOCK_PRODUCER_CREATION_CREATE_BLOCK_PRODUCER_MUTATION = 'blockProducerCreation/' + CREATE_BLOCK_PRODUCER_MUTATION
export const BLOCK_PRODUCER_CREATION_CREATE_ACTION = 'blockProducerCreation/create'


export const blockProducerCreation = {
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
    isCreated: false,
    id: null,
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
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addFieldsErrors (state, errors) {
      state.fieldsErrors = errors
    },
    createBlockProducer (state, blockProducerIdentifier) {
      state.id = blockProducerIdentifier
      state.isCreated = true
    },
  },
  actions: {
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
        .put(`https://bps-directory-back-staging.herokuapp.com/block-producers/`, {
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
          commit(CREATE_BLOCK_PRODUCER_MUTATION, response.data.result.id)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(ADD_ERROR_MUTATION, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(ADD_FIELDS_ERRORS_MUTATION, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    }
  }
}

export default blockProducerCreation
