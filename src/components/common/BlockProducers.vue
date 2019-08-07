<template><div></div></template>

<script>
import axios from 'axios'
import store from '../../store/index'
import HttpStatus from 'http-status-codes'

import {
  INDEX_PAGE_ADD_BLOCK_PRODUCERS_MUTATION,
  INDEX_PAGE_ADD_ERROR_MUTATION
} from '../../store/modules/indexPage'

export default {
  name: 'BlockProducers',
  mounted() {
    axios
      .get('https://bps-directory-back-staging.herokuapp.com/block-producers/')
      .then(response => {
        store.commit(INDEX_PAGE_ADD_BLOCK_PRODUCERS_MUTATION, response.data.result)
      })
      .catch(error => {
        if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          store.commit(INDEX_PAGE_ADD_ERROR_MUTATION, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }
      })
  }
}
</script>

<style></style>
