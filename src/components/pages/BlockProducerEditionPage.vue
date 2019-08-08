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
            <v-text-field v-model="name" label="name" solo required ></v-text-field>
            <v-text-field v-model="location" label="location" solo ></v-text-field>
            <v-text-field v-model="websiteUrl" label="websiteUrl" solo required ></v-text-field>
            <v-text-field v-model="shortDescription" label="shortDescription" solo required ></v-text-field>
            <v-text-field v-model="fullDescription" label="fullDescription" solo ></v-text-field>
            <v-text-field v-model="logoUrl" label="logoUrl" solo ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="facebookUrl" label="facebookUrl" solo ></v-text-field>
            <v-text-field v-model="githubUrl" label="githubUrl" solo ></v-text-field>
            <v-text-field v-model="linkedInUrl" label="linkedInUrl" solo ></v-text-field>
            <v-text-field v-model="redditUrl" label="redditUrl" solo ></v-text-field>
            <v-text-field v-model="mediumUrl" label="mediumUrl" solo ></v-text-field>
            <v-text-field v-model="steemitUrl" label="steemitUrl" solo ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="telegramUrl" label="telegramUrl" solo ></v-text-field>
            <v-text-field v-model="slackUrl" label="slackUrl" solo ></v-text-field>
            <v-text-field v-model="twitterUrl" label="twitterUrl" solo ></v-text-field>
            <v-text-field v-model="wikipediaUrl" label="wikipediaUrl" solo ></v-text-field>

            <v-btn @click="update">Update</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </div>
</template>

<script>
import store from '../../store/index'

import {
  BLOCK_PRODUCER_EDITION_ADD_ERROR_MUTATION,
  BLOCK_PRODUCER_EDITION_ADD_FIELDS_ERRORS_MUTATION,
  BLOCK_PRODUCER_EDITION_UPDATE_BLOCK_PRODUCER_MUTATION,
  BLOCK_PRODUCER_EDITION_UPDATE_ACTION,
} from '../../store/modules/blockProducerEdition'


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
    }
  },
  methods: {
    update () {
      store.dispatch(BLOCK_PRODUCER_EDITION_UPDATE_ACTION, {
        identifier: this.$route.params.identifier,
        name: this.name,
        location: this.location,
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
        logoUrl: this.logoUrl,
        facebookUrl: this.facebookUrl,
        githubUrl: this.githubUrl,
        linkedInUrl: this.linkedInUrl,
        redditUrl: this.redditUrl,
        mediumUrl: this.mediumUrl,
        steemitUrl: this.steemitUrl,
        telegramUrl: this.telegramUrl,
        slackUrl: this.slackUrl,
        twitterUrl: this.twitterUrl,
        websiteUrl: this.websiteUrl,
        wikipediaUrl: this.wikipediaUrl,
      })
    }
  },
  mounted() {
    store.subscribe((mutation, state) => {
      if (mutation.type === BLOCK_PRODUCER_EDITION_ADD_ERROR_MUTATION) {
        this.error = state.blockProducerEdition.error
      }
      if (mutation.type === BLOCK_PRODUCER_EDITION_ADD_FIELDS_ERRORS_MUTATION) {
        this.fieldsErrors = state.blockProducerEdition.fieldsErrors
      }
      if (mutation.type === BLOCK_PRODUCER_EDITION_UPDATE_BLOCK_PRODUCER_MUTATION) {
        this.successMessage = 'Block producer updated successfully — view your block producer.'
      }
    });
  }
}
</script>

<style></style>
