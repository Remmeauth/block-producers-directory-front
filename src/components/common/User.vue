<template><div></div></template>

<script>
import axios from 'axios'
import store from '../../store/index'
import HttpStatus from 'http-status-codes'

import {
  USER_PAGE_ADD_ERROR_MUTATION,
  USER_PAGE_ADD_PROFILE_MUTATION,
  USER_PAGE_ADD_USER_MUTATION
} from '../../store/modules/userPage'

export default {
  name: 'User',
  props: ['username'],
  mounted() {
    axios
      .get(`https://bps-directory-back-staging.herokuapp.com/users/${this.username}/`)
      .then(response => {
        store.commit(USER_PAGE_ADD_USER_MUTATION, {
          email: response.data.result.email,
          username: response.data.result.username
        })
      })
      .catch(error => {
        if (error.response.status === HttpStatus.NOT_FOUND || error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          store.commit(USER_PAGE_ADD_ERROR_MUTATION, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }
      })

    axios
      .get(`https://bps-directory-back-staging.herokuapp.com/users/${this.username}/profile/`)
      .then(response => {
        store.commit(USER_PAGE_ADD_PROFILE_MUTATION, {
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
         tweeterUrl: response.data.result.twitter_url
        })
      })
      .catch(error => {
        if (error.response.status === HttpStatus.NOT_FOUND || error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          store.commit(USER_PAGE_ADD_ERROR_MUTATION, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }
      })
  }
}
</script>

<style></style>
