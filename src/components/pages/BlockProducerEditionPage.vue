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
                <v-text-field v-model="details.name" outlined clearable label="Name" prepend-inner-icon="account_circle"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="details.websiteUrl" outlined clearable label="Website" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field v-model="details.location" outlined clearable label="Location" prepend-inner-icon="place"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateDetails">Update details</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Description</h2>
                <br>
                <span>Provide a short description and the full description. For a full description you can use HTML formatting.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field v-model="descriptions.shortDescription" outlined clearable label="Short description"></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-textarea no-resize v-model="descriptions.fullDescription" outlined label="Full description"></v-textarea>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateDescription">Update descriptions</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Logotype</h2>
                <br>
                <span>Upload block producer logotype.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-file-input outlined label="Select your logotype" id="file" ref="file" @change="handleFileUpload"></v-file-input>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="submitUploadingBlockProducerLogotype">Update logotype</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Reference links</h2>
                <br>
                <span>Provide your profiles from other platforms.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.linkedInUrl" outlined clearable label="LinkedIn" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.twitterUrl" outlined clearable label="Twitter" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.mediumUrl" outlined clearable label="Medium" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.githubUrl" outlined clearable label="Github" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.facebookUrl" outlined clearable label="Facebook" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.telegramUrl" outlined clearable label="Telegram" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.steemitUrl" outlined clearable label="Steemit" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.redditUrl" outlined clearable label="Reddit" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.slackUrl" outlined clearable label="Slack" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.wikipediaUrl" outlined clearable label="Wikipedia" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateReferenceLinks">Update links</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
    <br>
  </div>
</template>

<script>
import Error404 from '../../components/ui/Error404'
import Error500 from '../../components/ui/Error500'
import store from '../../store/index'
import { avatarStorageActions, avatarStorageMutations } from '../../store/modules/avatar'
import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'

export default {
  name: 'BlockProducerEditionPage',
  components: {
    Error404,
    Error500,
  },
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
        websiteUrl: null,
      },
      descriptions: {
        shortDescription: null,
        fullDescription: null,
      },
      referenceLinks: {
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
        logotypeFile: null,
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
        websiteUrl: this.details.websiteUrl,
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
        wikipediaUrl: this.referenceLinks.wikipediaUrl,
      })
    },
    handleFileUpload() {
      this.other.logotypeFile = this.$refs.file
    },
    submitUploadingBlockProducerLogotype() {
      store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        file: this.other.logotypeFile,
      })
    },
  },
  mounted() {
    store.dispatch(blockProducerStorageActions.getBlockProducer, {
        identifier: this.$route.params.identifier,
    })

    const unsubscribe = store.subscribe((mutation, state) => {
      if (mutation.type === blockProducerStorageMutations.subscribe.addError) {
        this.error = state.blockProducer.error
        unsubscribe()
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.addFieldsErrors) {
        this.fieldsErrors = state.blockProducer.fieldsErrors
        unsubscribe()
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.getBlockProducer) {
        this.details.name = state.blockProducer.name
        this.details.location = state.blockProducer.location
        this.details.websiteUrl = state.blockProducer.websiteUrl
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
        this.referenceLinks.wikipediaUrl = state.blockProducer.wikipediaUrl
      }

      if (
        mutation.type === blockProducerStorageMutations.subscribe.updateDetails ||
        mutation.type === blockProducerStorageMutations.subscribe.updateDescription ||
        mutation.type === blockProducerStorageMutations.subscribe.updateReferenceLinks ||
        mutation.type === avatarStorageMutations.subscribe.markAvatarAsUploaded
      ) {
        this.successMessage = 'Block producer updated successfully — view your block producer.'
      }
    });
  }
}
</script>

<style></style>
