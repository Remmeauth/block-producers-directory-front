import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const ADD_ERROR_MUTATION = 'addError'
export const ADD_BLOCK_PRODUCER_MUTATION = 'addBlockProducer'
export const BLOCK_PRODUCER_ADD_ERROR_MUTATION = 'blockProducer/' + ADD_ERROR_MUTATION
export const BLOCK_PRODUCER_ADD_BLOCK_PRODUCER_MUTATION = 'blockProducer/' + ADD_BLOCK_PRODUCER_MUTATION
export const BLOCK_PRODUCER_GET_ACTION = 'blockProducer/get'


export const blockProducer = {
  namespaced: true,
  state: {
    blockProducer: {
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
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addBlockProducer (state, blockProducer) {
      state.blockProducer = blockProducer
    },
  },
  actions: {
    get({ commit }, { identifier }) {
      axios
        .get(`https://bps-directory-back-staging.herokuapp.com/block-producers/${identifier}/`)
        .then(response => {
          commit(ADD_BLOCK_PRODUCER_MUTATION, {
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
            user: response.data.result.user,
            id: response.data.result.id,
          })
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(ADD_ERROR_MUTATION, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.NOT_FOUND) {
            commit(ADD_ERROR_MUTATION, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    }
  }
}

export default blockProducer
