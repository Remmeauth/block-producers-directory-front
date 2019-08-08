import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const ADD_ERROR_MUTATION = 'addError'
export const ADD_FIELDS_ERRORS_MUTATION = 'addFieldsErrors'
export const UPDATE_BLOCK_PRODUCER_MUTATION = 'updateBlockProducer'
export const BLOCK_PRODUCER_EDITION_ADD_ERROR_MUTATION = 'blockProducerEdition/' + ADD_ERROR_MUTATION
export const BLOCK_PRODUCER_EDITION_ADD_FIELDS_ERRORS_MUTATION = 'blockProducerEdition/' + ADD_FIELDS_ERRORS_MUTATION
export const BLOCK_PRODUCER_EDITION_UPDATE_BLOCK_PRODUCER_MUTATION = 'blockProducerEdition/' + UPDATE_BLOCK_PRODUCER_MUTATION
export const BLOCK_PRODUCER_EDITION_UPDATE_ACTION = 'blockProducerEdition/update'


export const  blockProducerEdition = {
  namespaced: true,
  error: {
    message: null,
    statusCode: null,
  },
  fieldsErrors: {
    errors: null,
    statusCode: null,
  },
  isUpdated: false,
  state: {
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
    updateBlockProducer (state, isUpdated) {      
      state.isUpdated = isUpdated
    },
  },
  actions: {
    update({ commit }, {
      identifier, 
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
      axios
        .post(`https://bps-directory-back-staging.herokuapp.com/block-producers/${identifier}/`, {
          name: name,
          location: location,
          short_description: shortDescription,
          full_description: fullDescription,
          logo_url: logoUrl,
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
            'Authorization': `JWT ${window.localStorage.token.slice(1, -1)}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          commit(UPDATE_BLOCK_PRODUCER_MUTATION, true)
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

export default blockProducerEdition
