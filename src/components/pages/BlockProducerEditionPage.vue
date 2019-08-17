<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    {{ fieldsErrors.errors }}
    {{ fieldsErrors.statusCode }}

    {{ successMessage }}

    <form>
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="details.name" label="name" solo required ></v-text-field>
            <v-text-field v-model="details.location" label="location" solo ></v-text-field>

            <v-btn @click="updateDetails">Update details</v-btn>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="descriptions.shortDescription" label="shortDescription" solo required ></v-text-field>
            <v-textarea v-model="descriptions.fullDescription" label="fullDescription" solo ></v-textarea>

            <v-btn @click="updateDescription">Update description</v-btn>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="referenceLinks.websiteUrl" label="websiteUrl" solo required ></v-text-field>
            <v-text-field v-model="referenceLinks.facebookUrl" label="facebookUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.githubUrl" label="githubUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.linkedInUrl" label="linkedInUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.redditUrl" label="redditUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.mediumUrl" label="mediumUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.steemitUrl" label="steemitUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.telegramUrl" label="telegramUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.slackUrl" label="slackUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.twitterUrl" label="twitterUrl" solo ></v-text-field>
            <v-text-field v-model="referenceLinks.wikipediaUrl" label="wikipediaUrl" solo ></v-text-field>

            <v-btn @click="updateReferenceLinks">Update links</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </form>

    {{ other.logoUrl }}

  </div>
</template>

<script>
import store from '../../store/index'

import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'


export default {
  name: 'BlockProducerEditionPage',
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      fieldsErrors: {
        errors: null,
        statusCode: null,
      },
      successMessage: null,
      details: {
        name: null,
        location: null,
      },
      descriptions: {
        shortDescription: null,
        fullDescription: null,
      },
      referenceLinks: {
        websiteUrl: null,
        facebookUrl: null,
        githubUrl: null,
        linkedInUrl: null,
        redditUrl: null,
        mediumUrl: null,
        steemitUrl: null,
        telegramUrl: null,
        slackUrl: null,
        twitterUrl: null,
        wikipediaUrl: null,
      },
      other: {
        logoUrl: null,  
      },
    }
  },
  methods: {
    updateDetails() {
      store.dispatch(blockProducerStorageActions.updateDetails, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        name: this.details.name,
        location: this.details.location,
      })
    },
    updateDescription () {
      store.dispatch(blockProducerStorageActions.updateDescription, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        shortDescription: this.descriptions.shortDescription,
        fullDescription: this.descriptions.fullDescription,
      })
    },
    updateReferenceLinks () {
      store.dispatch(blockProducerStorageActions.updateReferenceLinks, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        facebookUrl: this.referenceLinks.facebookUrl,
        githubUrl: this.referenceLinks.githubUrl,
        linkedInUrl: this.referenceLinks.linkedInUrl,
        redditUrl: this.referenceLinks.redditUrl,
        mediumUrl: this.referenceLinks.mediumUrl,
        steemitUrl: this.referenceLinks.steemitUrl,
        telegramUrl: this.referenceLinks.telegramUrl,
        slackUrl: this.referenceLinks.slackUrl,
        twitterUrl: this.referenceLinks.twitterUrl,
        websiteUrl: this.referenceLinks.websiteUrl,
        wikipediaUrl: this.referenceLinks.wikipediaUrl,
      })
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

      if (mutation.type === blockProducerStorageMutations.subscribe.addFieldsErrors) {
        this.fieldsErrors = state.blockProducer.fieldsErrors
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.getBlockProducer) {
        this.details.name = state.blockProducer.name
        this.details.location = state.blockProducer.location
        this.descriptions.shortDescription = state.blockProducer.shortDescription
        this.descriptions.fullDescription = state.blockProducer.fullDescription
        this.other.logoUrl = state.blockProducer.logoUrl
        this.referenceLinks.facebookUrl = state.blockProducer.facebookUrl
        this.referenceLinks.githubUrl = state.blockProducer.githubUrl
        this.referenceLinks.linkedInUrl = state.blockProducer.linkedInUrl
        this.referenceLinks.redditUrl = state.blockProducer.redditUrl
        this.referenceLinks.mediumUrl = state.blockProducer.mediumUrl
        this.referenceLinks.steemitUrl = state.blockProducer.steemitUrl
        this.referenceLinks.telegramUrl = state.blockProducer.telegramUrl
        this.referenceLinks.slackUrl = state.blockProducer.slackUrl
        this.referenceLinks.twitterUrl = state.blockProducer.twitterUrl
        this.referenceLinks.websiteUrl = state.blockProducer.websiteUrl
        this.referenceLinks.wikipediaUrl = state.blockProducer.wikipediaUrl
      }

      if (
        mutation.type === blockProducerStorageMutations.subscribe.updateDetails ||
        mutation.type === blockProducerStorageMutations.subscribe.updateDescription ||
        mutation.type === blockProducerStorageMutations.subscribe.updateReferenceLinks
      ) {
        this.successMessage = 'Block producer updated successfully — view your block producer.'
      }
    });
  }
}
</script>

<style></style>
