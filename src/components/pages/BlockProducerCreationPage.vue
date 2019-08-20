<template>
  <div v-if="error.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <br>
    <v-layout>
      <v-flex lg8 offset-lg2 style="box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Project</h2>
                <br>
                <span>Please provide correct information. Only Remme Protocol related projects are permitted.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="name" outlined clearable label="Name" prepend-inner-icon="account_circle"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="websiteUrl" outlined clearable label="Website" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field v-model="location" outlined clearable label="Location" prepend-inner-icon="place"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Description</h2>
                <br>
                <span>Provide a short description and the full description. For a full description you can use HTML formatting.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field v-model="shortDescription" outlined clearable label="Short description"></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-textarea v-model="fullDescription" outlined label="Full description"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Logotype</h2>
                <br>
                <span>Upload block producer logotype.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-file-input outlined label="Select your picture" id="file" ref="file" @change="handleFileUpload"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Reference links</h2>
                <br>
                <span>Provide your profiles from other platforms.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="linkedInUrl" outlined clearable label="LinkedIn" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="twitterUrl" outlined clearable label="Twitter" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="mediumUrl" outlined clearable label="Medium" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="githubUrl" outlined clearable label="Github" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="facebookUrl" outlined clearable label="Facebook" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="telegramUrl" outlined clearable label="Telegram" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="steemitUrl" outlined clearable label="Steemit" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="redditUrl" outlined clearable label="Reddit" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="slackUrl" outlined clearable label="Slack" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="wikipediaUrl" outlined clearable label="Wikipedia" prepend-inner-icon="link"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-col cols="12" lg="4" offset-lg="5">
              <v-btn @click="create">Submit</v-btn>
            </v-col>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
    <br>
  </div>
</template>

<script>
import store from '../../store/index'
import { avatarStorageActions, avatarStorageMutations } from '../../store/modules/avatar'
import {
  BLOCK_PRODUCER_CREATION_ADD_ERROR_MUTATION,
  BLOCK_PRODUCER_CREATION_ADD_FIELDS_ERRORS_MUTATION,
  BLOCK_PRODUCER_CREATION_CREATE_ACTION,
  BLOCK_PRODUCER_CREATION_CREATE_BLOCK_PRODUCER_MUTATION,
} from '../../store/modules/blockProducerCreation'


export default {
  name: 'BlockProducerCreationPage',
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
      logotypeFile: null,
      successMessage: null,
      name: null,
      location: null,
      shortDescription: null,
      fullDescription: null,
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
    create () {
      store.dispatch(BLOCK_PRODUCER_CREATION_CREATE_ACTION, {
        jwtToken: this.localStorage.token,
        name: this.name,
        location: this.location,
        shortDescription: this.shortDescription,
        fullDescription: this.fullDescription,
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
    },
    handleFileUpload() {
      this.logotypeFile = this.$refs.file
    },
  },
  mounted() {
    store.subscribe((mutation, state) => {
      if (mutation.type === BLOCK_PRODUCER_CREATION_ADD_ERROR_MUTATION) {
        this.error = state.blockProducerCreation.error
      }

      if (mutation.type === BLOCK_PRODUCER_CREATION_ADD_FIELDS_ERRORS_MUTATION) {
        this.fieldsErrors = state.blockProducerCreation.fieldsErrors
      }

      if (mutation.type === BLOCK_PRODUCER_CREATION_CREATE_BLOCK_PRODUCER_MUTATION) {
        const createdBlockProducerIdentifier = state.blockProducerCreation.id

        store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
          jwtToken: this.localStorage.token,
          identifier: createdBlockProducerIdentifier,
          file: this.logotypeFile,
        })
      }

      if (mutation.type === avatarStorageMutations.subscribe.markAvatarAsUploaded) {
        this.successMessage = 'Block producer created successfully — view your block producer.'
      }
    });
  }
}
</script>
