<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    {{ blockProducer }}
  </div>
</template>

<script>
import store from '../../store/index'

import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'


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
        twitterUrl: null,
        websiteUrl: null,
        wikipediaUrl: null,
        user: null,
        id: null,
      },
    }
  },
  mounted() {
    store.dispatch(blockProducerStorageActions.getBlockProducer, {
      identifier: this.$route.params.identifier,
    })

    store.subscribe((mutation, state) => {
      if (mutation.type === blockProducerStorageMutations.subscribe.addError) {
        this.error = state.blockProducer.error
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.getBlockProducer) {
        this.blockProducer.name = state.blockProducer.name
        this.blockProducer.location = state.blockProducer.location
        this.blockProducer.shortDescription = state.blockProducer.shortDescription
        this.blockProducer.fullDescription = state.blockProducer.fullDescription
        this.blockProducer.logoUrl = state.blockProducer.logoUrl
        this.blockProducer.facebookUrl = state.blockProducer.facebookUrl
        this.blockProducer.githubUrl = state.blockProducer.githubUrl
        this.blockProducer.linkedInUrl = state.blockProducer.linkedInUrl
        this.blockProducer.redditUrl = state.blockProducer.redditUrl
        this.blockProducer.mediumUrl = state.blockProducer.mediumUrl
        this.blockProducer.steemitUrl = state.blockProducer.steemitUrl
        this.blockProducer.telegramUrl = state.blockProducer.telegramUrl
        this.blockProducer.slackUrl = state.blockProducer.slackUrl
        this.blockProducer.twitterUrl = state.blockProducer.twitterUrl
        this.blockProducer.websiteUrl = state.blockProducer.websiteUrl
        this.blockProducer.wikipediaUrl = state.blockProducer.wikipediaUrl
      }
    });
  }
}
</script>

<style></style>
