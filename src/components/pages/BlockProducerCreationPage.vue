<template>
  <div v-if="error.statusCode === 500">
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
                  v-model="name"
                  :error-messages="nameErrors"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  outlined
                  clearable
                  label="Name"
                  prepend-inner-icon="account_circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="websiteUrl"
                  :error-messages="websiteUrlErrors"
                  @input="$v.websiteUrl.$touch()"
                  @blur="$v.websiteUrl.$touch()"
                  outlined
                  clearable
                  label="Website"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field
                  v-model="location"
                  :error-messages="locationErrors"
                  required
                  @input="$v.location.$touch()"
                  @blur="$v.location.$touch()"
                  outlined
                  clearable
                  label="Location"
                  prepend-inner-icon="place"
                ></v-text-field>
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
                <v-text-field
                  v-model="shortDescription"
                  :error-messages="shortDescriptionErrors"
                  @input="$v.shortDescription.$touch()"
                  @blur="$v.shortDescription.$touch()"
                  outlined
                  clearable
                  label="Short description"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-textarea
                  v-model="fullDescription"
                  :error-messages="fullDescriptionErrors"
                  @input="$v.fullDescription.$touch()"
                  @blur="$v.fullDescription.$touch()"
                  outlined
                  clearable
                  label="Full description"
                ></v-textarea>
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
                <v-file-input v-model="logotypeFile" outlined label="Select your logotype"></v-file-input>
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
                <v-text-field
                  v-model="linkedInUrl"
                  :error-messages="linkedInUrlErrors"
                  @input="$v.linkedInUrl.$touch()"
                  @blur="$v.linkedInUrl.$touch()"
                  outlined
                  clearable
                  label="LinkedIn"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="twitterUrl"
                  :error-messages="twitterUrlErrors"
                  @input="$v.twitterUrl.$touch()"
                  @blur="$v.twitterUrl.$touch()"
                  outlined
                  clearable
                  label="Twitter"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="mediumUrl"
                  :error-messages="mediumUrlErrors"
                  @input="$v.mediumUrl.$touch()"
                  @blur="$v.mediumUrl.$touch()"
                  outlined
                  clearable
                  label="Medium"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="githubUrl"
                  :error-messages="githubUrlErrors"
                  @input="$v.githubUrl.$touch()"
                  @blur="$v.githubUrl.$touch()"
                  outlined
                  clearable
                  label="Github"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="facebookUrl"
                  :error-messages="facebookUrlErrors"
                  @input="$v.facebookUrl.$touch()"
                  @blur="$v.facebookUrl.$touch()"
                  outlined
                  clearable
                  label="Facebook"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="telegramUrl"
                  :error-messages="telegramUrlErrors"
                  @input="$v.telegramUrl.$touch()"
                  @blur="$v.telegramUrl.$touch()"
                  outlined
                  clearable
                  label="Telegram"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="steemitUrl"
                  :error-messages="steemitUrlErrors"
                  @input="$v.steemitUrl.$touch()"
                  @blur="$v.steemitUrl.$touch()"
                  outlined
                  clearable
                  label="Steemit"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="redditUrl"
                  :error-messages="redditUrlErrors"
                  @input="$v.redditUrl.$touch()"
                  @blur="$v.redditUrl.$touch()"
                  outlined
                  clearable
                  label="Reddit"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="slackUrl"
                  :error-messages="slackUrlErrors"
                  @input="$v.slackUrl.$touch()"
                  @blur="$v.slackUrl.$touch()"
                  outlined
                  clearable
                  label="Slack"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="wikipediaUrl"
                  :error-messages="wikipediaUrlErrors"
                  @input="$v.wikipediaUrl.$touch()"
                  @blur="$v.wikipediaUrl.$touch()"
                  outlined
                  clearable
                  label="Wikipedia"
                  prepend-inner-icon="link"
                ></v-text-field>
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
import submitBlockProducerForm from '../../forms/pages/blockProducer/submit'
import Error500 from '../../components/ui/Error500'
import store from '../../store/index'
import { avatarStorageActions, avatarStorageMutations } from '../../store/modules/avatar'
import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'

export default {
  name: 'BlockProducerCreationPage',
  mixins: [submitBlockProducerForm],
  components: {
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
      createdBlockProducerIdentifier: null,
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
      this.$v.$touch()
      if (this.$v.$anyError) { return }

      store.dispatch(blockProducerStorageActions.createBlockProducer, {
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
  },
  mounted() {
    const unsubscribe = store.subscribe((mutation, state) => {
      if (mutation.type === blockProducerStorageMutations.subscribe.addError) {
        this.error = state.blockProducer.error
        unsubscribe()
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.addFieldsErrors) {
        this.fieldsErrors = state.blockProducer.fieldsErrors
        unsubscribe()
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.createBlockProducer) {
        this.createdBlockProducerIdentifier = state.blockProducer.id

        if (this.logotypeFile) {
          store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
            jwtToken: this.localStorage.token,
            identifier: this.createdBlockProducerIdentifier,
            file: this.logotypeFile,
          })
        } else {
          this.$router.push({name: 'block-producer', params: {identifier: this.createdBlockProducerIdentifier }})
        }
      }

      if (mutation.type === avatarStorageMutations.subscribe.markAvatarAsUploaded) {
         this.$router.push({name: 'block-producer', params: {identifier: this.createdBlockProducerIdentifier }})
      }
    });
  }
}
</script>
