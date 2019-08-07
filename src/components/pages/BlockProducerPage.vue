<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    {{ blockProducer }}
  </div>
</template>

<script>
import store from '../../store/index'

import {
  BLOCK_PRODUCER_GET_ACTION,
  BLOCK_PRODUCER_ADD_BLOCK_PRODUCER_MUTATION,
  BLOCK_PRODUCER_ADD_ERROR_MUTATION,
} from '../../store/modules/blockProducer'

export default {
  name: 'BlockProducerPage',
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
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
        tweeterUrl: null,
        websiteUrl: null,
        wikipediaUrl: null,
        user: null,
        id: null,
      },
    }
  },
  mounted() {
    store.dispatch(BLOCK_PRODUCER_GET_ACTION, {
      identifier: this.$route.params.identifier,
    })

    store.subscribe((mutation, state) => {
      if (mutation.type === BLOCK_PRODUCER_ADD_ERROR_MUTATION) {
        this.error = state.blockProducer.error
      }

      if (mutation.type === BLOCK_PRODUCER_ADD_BLOCK_PRODUCER_MUTATION) {
        this.blockProducer = state.blockProducer.blockProducer
      }
    });
  }
}
</script>

<style></style>
