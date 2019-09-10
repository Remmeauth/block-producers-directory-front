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
                <v-text-field 
                  v-model="blockProducer.name" 
                  :error-messages="nameErrors"
                  @input="$v.blockProducer.name.$touch()"
                  @blur="$v.blockProducer.name.$touch()"
                  outlined 
                  clearable 
                  label="Name" 
                  prepend-inner-icon="account_circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="blockProducer.websiteUrl" 
                  :error-messages="websiteUrlErrors"
                  @input="$v.blockProducer.websiteUrl.$touch()"
                  @blur="$v.blockProducer.websiteUrl.$touch()"
                  outlined 
                  clearable 
                  label="Website" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.location"
                  :error-messages="locationUrlErrors"
                  @input="$v.blockProducer.location.$touch()"
                  @blur="$v.blockProducer.location.$touch()" 
                  outlined 
                  clearable 
                  label="Location" 
                  prepend-inner-icon="place"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateDetails">Update details</v-btn>
              </v-col>
              <v-snackbar 
                v-if="this.successMessage" 
                right 
                top 
                v-model="snackBars.updateDetails"
              >
                <span v-html="this.successMessage"></span>
                <v-btn 
                  color="pink" 
                  text 
                  @click="snackBars.updateDetails = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
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
                <v-text-field 
                  v-model="blockProducer.shortDescription"
                  :error-messages="shortDescriptionErrors"
                  @input="$v.blockProducer.shortDescription.$touch()"
                  @blur="$v.blockProducer.shortDescription.$touch()" 
                  outlined 
                  clearable 
                  label="Short description"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-textarea 
                  no-resize 
                  v-model="blockProducer.fullDescription"
                  :error-messages="fullDescriptionErrors"
                  @input="$v.blockProducer.fullDescription.$touch()"
                  @blur="$v.blockProducer.fullDescription.$touch()" 
                  outlined 
                  label="Full description"
                ></v-textarea>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateDescription">Update descriptions</v-btn>
              </v-col>
              <v-snackbar 
                v-if="this.successMessage" 
                right 
                top 
                v-model="snackBars.updateDescription"
              >
                <span v-html="this.successMessage"></span>
                <v-btn 
                  color="pink" 
                  text 
                  @click="snackBars.updateDescription = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
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
                <v-file-input 
                  v-model="logotypeFile" 
                  outlined 
                  label="Select your logotype"
                ></v-file-input>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="submitUploadingBlockProducerLogotype">Update logotype</v-btn>
              </v-col>
              <v-snackbar 
                v-if="this.successMessage" 
                right 
                top 
                v-model="snackBars.submitUploadingBlockProducerLogotype"
              >
                <span v-html="this.successMessage"></span>
                <v-btn 
                  color="pink" 
                  text 
                  @click="snackBars.submitUploadingBlockProducerLogotype = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
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
                <v-text-field 
                  v-model="blockProducer.linkedInUrl"
                  :error-messages="linkedInUrlErrors"
                  @input="$v.blockProducer.linkedInUrl.$touch()"
                  @blur="$v.blockProducer.linkedInUrl.$touch()" 
                  outlined 
                  clearable 
                  label="LinkedIn" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="blockProducer.twitterUrl"
                  :error-messages="twitterUrlErrors"
                  @input="$v.blockProducer.twitterUrl.$touch()"
                  @blur="$v.blockProducer.twitterUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Twitter" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.mediumUrl"
                  :error-messages="mediumUrlErrors"
                  @input="$v.blockProducer.mediumUrl.$touch()"
                  @blur="$v.blockProducer.mediumUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Medium" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="blockProducer.githubUrl"
                  :error-messages="githubUrlErrors"
                  @input="$v.blockProducer.githubUrl.$touch()"
                  @blur="$v.blockProducer.githubUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Github" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.facebookUrl"
                  :error-messages="facebookUrlErrors"
                  @input="$v.blockProducer.facebookUrl.$touch()"
                  @blur="$v.blockProducer.facebookUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Facebook" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="blockProducer.telegramUrl"
                  :error-messages="telegramUrlErrors"
                  @input="$v.blockProducer.telegramUrl.$touch()"
                  @blur="$v.blockProducer.telegramUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Telegram" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.steemitUrl"
                  :error-messages="steemitUrlErrors"
                  @input="$v.blockProducer.steemitUrl.$touch()"
                  @blur="$v.blockProducer.steemitUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Steemit" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="blockProducer.redditUrl"
                  :error-messages="redditUrlErrors"
                  @input="$v.blockProducer.redditUrl.$touch()"
                  @blur="$v.blockProducer.redditUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Reddit" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.slackUrl"
                  :error-messages="slackUrlErrors"
                  @input="$v.blockProducer.slackUrl.$touch()"
                  @blur="$v.blockProducer.slackUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Slack" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="blockProducer.wikipediaUrl"
                  :error-messages="wikipediaUrlErrors"
                  @input="$v.blockProducer.wikipediaUrl.$touch()"
                  @blur="$v.blockProducer.wikipediaUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Wikipedia" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateReferenceLinks">Update links</v-btn>
              </v-col>
              <v-snackbar 
                v-if="this.successMessage" 
                right 
                top 
                v-model="snackBars.updateReferenceLinks"
              >
                <span v-html="this.successMessage"></span>
                <v-btn 
                  color="pink" 
                  text 
                  @click="snackBars.updateReferenceLinks = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
            </v-row>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { editBlockProducerForm } from '../../forms/pages/blockProducer/edit'
import Error404 from '../../components/ui/Error404'
import Error500 from '../../components/ui/Error500'
import { avatarStorageActions } from '../../store/modules/avatar'
import { blockProducerStorageActions } from '../../store/modules/blockProducer'

export default {
  name: 'BlockProducerEditionPage',
  mixins: [editBlockProducerForm],
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
      snackBars: {
        updateDetails: null,
        updateDescription: null,
        updateReferenceLinks: null,
        submitUploadingBlockProducerLogotype: null,
      },
      logotypeFile: null,
      successMessage: null,
    }
  },
  computed: {
    ...mapGetters('avatar', ['avatarEvents']),
    ...mapGetters('blockProducer', ['blockProducer', 'blockProducerError', 'blockProducerEvents']),
  },
  watch: {
    'blockProducerEvents.detailsAreUpdated'() {
      this.successMessage =
        "Block producer updated successfully — <a href=\"" +
        `/block-producers/${this.$route.params.identifier}` +
        "\">view your block producer</a>"
    },
    'blockProducerEvents.descriptionsAreUpdated'() {
      this.successMessage =
        "Block producer updated successfully — <a href=\"" +
        `/block-producers/${this.$route.params.identifier}` +
        "\">view your block producer</a>"
    },
    'blockProducerEvents.referenceLinksAreUpdated'() {
      this.successMessage =
        "Block producer updated successfully — <a href=\"" +
        `/block-producers/${this.$route.params.identifier}` +
        "\">view your block producer</a>"
    },
    'avatarEvents.isUploaded'() {
      this.successMessage =
        "Block producer updated successfully — <a href=\"" +
        `/block-producers/${this.$route.params.identifier}` +
        "\">view your block producer</a>"
    },
  },
  methods: {
    updateDetails() {
      if (!this.isDetailsFormValid()) { return }

      this.snackBars.updateDetails = true
      this.$store.dispatch(blockProducerStorageActions.updateDetails, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        name: this.blockProducer.name,
        location: this.blockProducer.location,
        websiteUrl: this.blockProducer.websiteUrl,
      })
    },
    updateDescription () {
      if (!this.isDescriptionFormValid()) { return }

      this.snackBars.updateDescription = true
      this.$store.dispatch(blockProducerStorageActions.updateDescription, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        shortDescription: this.blockProducer.shortDescription,
        fullDescription: this.blockProducer.fullDescription,
      })
    },
    updateReferenceLinks () {
      if (!this.isReferenceLinksFormValid()) { return }

      this.snackBars.updateReferenceLinks = true
      this.$store.dispatch(blockProducerStorageActions.updateReferenceLinks, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        facebookUrl: this.blockProducer.facebookUrl,
        githubUrl: this.blockProducer.githubUrl,
        linkedInUrl: this.blockProducer.linkedInUrl,
        redditUrl: this.blockProducer.redditUrl,
        mediumUrl: this.blockProducer.mediumUrl,
        steemitUrl: this.blockProducer.steemitUrl,
        telegramUrl: this.blockProducer.telegramUrl,
        slackUrl: this.blockProducer.slackUrl,
        twitterUrl: this.blockProducer.twitterUrl,
        wikipediaUrl: this.blockProducer.wikipediaUrl,
      })
    },
    submitUploadingBlockProducerLogotype() {
      this.snackBars.submitUploadingBlockProducerLogotype = true
      this.$store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        file: this.logotypeFile,
      })
    },
  },
  mounted() {
    this.$store.dispatch(blockProducerStorageActions.getBlockProducer, {
        identifier: this.$route.params.identifier,
    })

    // const unsubscribe = this.$store.subscribe((mutation, state) => {

    //   if (
    //     mutation.type === blockProducerStorageMutations.subscribe.updateDetails ||
    //     mutation.type === blockProducerStorageMutations.subscribe.updateDescription ||
    //     mutation.type === blockProducerStorageMutations.subscribe.updateReferenceLinks ||
    //     mutation.type === avatarStorageMutations.subscribe.markAvatarAsUploaded
    //   ) {
    //     this.successMessage =
    //       "Block producer updated successfully — <a href=\"" +
    //       `/block-producers/${this.$route.params.identifier}` +
    //       "\">view your block producer</a>"
    //   }
    // });
  }
}
</script>

<style></style>
