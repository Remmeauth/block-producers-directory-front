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
                <h2>Personal details</h2>
                <br>
                <span>All provided information is optional and shown on your profile page. E-mail is never shown publicly.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="details.username" disabled outlined clearable label="Username" prepend-inner-icon="alternate_email"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="details.email" disabled outlined clearable label="E-mail address" prepend-inner-icon="email"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="details.firstName" outlined clearable label="First name" prepend-inner-icon="account_circle"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="details.lastName" outlined clearable label="Last name" prepend-inner-icon="account_circle"></v-text-field>
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
                <h2>Additional information</h2>
                <br>
                <span>Tell some words about yourself.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-textarea no-resize v-model="other.additionalInformation" outlined label="Additional information"></v-textarea>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateAdditionalInformation">Update information</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Profile picture</h2>
                <br>
                <span>Upload your picture or avatar.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-file-input outlined label="Select your picture" id="file" ref="file" @change="handleFileUpload"></v-file-input>
                <v-btn @click="submitUploadingProfileAvatar">Upload picture</v-btn>
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
                <v-text-field v-model="referenceLinks.websiteUrl" outlined clearable label="Web-site address" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.linkedInUrl" outlined clearable label="LinkedIn" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.twitterUrl" outlined clearable label="Twitter" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.mediumUrl" outlined clearable label="Medium" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.githubUrl" outlined clearable label="Github" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.facebookUrl" outlined clearable label="Facebook" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field v-model="referenceLinks.telegramUrl" outlined clearable label="Telegram" prepend-inner-icon="link"></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field v-model="referenceLinks.steemitUrl" outlined clearable label="Steemit" prepend-inner-icon="link"></v-text-field>
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
import store from '../../store/index'
import { avatarStorageActions, avatarStorageMutations } from '../../store/modules/avatar'
import { settingsStorageActions, settingsStorageMutations } from '../../store/modules/settings'
import { userStorageActions, userStorageMutations } from '../../store/modules/user'
import { profileStorageActions, profileStorageMutations } from '../../store/modules/profile'

export default {
  name: 'SettingsPage',
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
        email: null,
        username: null,
        firstName: null,
        lastName: null,
        location: null,
      },
      referenceLinks: {
        websiteUrl: null,
        linkedInUrl: null,
        twitterUrl: null,
        mediumUrl: null,
        githubUrl: null,
        facebookUrl: null,
        telegramUrl: null,
        steemitUrl: null,
      },
      other: {
        additionalInformation: null,
        avatarFile: null,
      }
    }
  },
  methods: {
    updateDetails() {
      store.dispatch(settingsStorageActions.updateDetails, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        firstName: this.details.firstName,
        lastName: this.details.lastName,
        location: this.details.location,
      })
    },
    updateReferenceLinks() {
      store.dispatch(settingsStorageActions.updateReferenceLinks, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        websiteUrl: this.referenceLinks.websiteUrl,
        linkedInUrl: this.referenceLinks.linkedInUrl,
        twitterUrl: this.referenceLinks.twitterUrl,
        mediumUrl: this.referenceLinks.mediumUrl,
        githubUrl: this.referenceLinks.githubUrl,
        facebookUrl: this.referenceLinks.facebookUrl,
        telegramUrl: this.referenceLinks.telegramUrl,
        steemitUrl: this.referenceLinks.steemitUrl,
      })
    },
    updateAdditionalInformation() {
      store.dispatch(settingsStorageActions.updateAdditionalInformation, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        additionalInformation: this.other.additionalInformation,
      })
    },
    handleFileUpload() {
      this.other.avatarFile = this.$refs.file
    },
    submitUploadingProfileAvatar() {
      store.dispatch(avatarStorageActions.uploadUserAvatarForUser, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        file: this.other.avatarFile,
      })
    },
  },
  mounted() {
    store.dispatch(userStorageActions.getUser, {
        username: this.localStorage.username,
    })

    store.dispatch(profileStorageActions.getProfile, {
        username: this.localStorage.username,
    })

    store.subscribe((mutation, state) => {
      if (mutation.type === settingsStorageMutations.subscribe.addError) {
        this.error = state.settings.error
      }

      if (mutation.type === settingsStorageMutations.subscribe.addFieldsErrors) {
        this.fieldsErrors = state.settings.fieldsErrors
      }

      if (mutation.type === userStorageMutations.subscribe.addUser) {
        this.details.email = state.user.email
        this.details.username = state.user.username
      }

      if (mutation.type === profileStorageMutations.subscribe.addProfile) {
        this.details.firstName = state.profile.firstName
        this.details.lastName = state.profile.lastName
        this.details.location = state.profile.location
        this.other.additionalInformation = state.profile.additionalInformation
        this.other.avatarUrl = state.profile.avatarUrl
        this.referenceLinks.facebookUrl = state.profile.facebookUrl
        this.referenceLinks.githubUrl = state.profile.githubUrl
        this.referenceLinks.linkedInUrl = state.profile.linkedInUrl
        this.referenceLinks.mediumUrl = state.profile.mediumUrl
        this.referenceLinks.steemitUrl = state.profile.steemitUrl
        this.referenceLinks.telegramUrl = state.profile.telegramUrl
        this.referenceLinks.twitterUrl = state.profile.twitterUrl
        this.referenceLinks.websiteUrl = state.profile.websiteUrl
      }

      if (
        mutation.type === settingsStorageMutations.subscribe.updateReferenceLinks ||
        mutation.type === settingsStorageMutations.subscribe.updateAdditionalInformation ||
        mutation.type === settingsStorageMutations.subscribe.updateDetails
      ) {
        this.successMessage = 'Profile updated successfully — view your profile.'
      }

      if (mutation.type === avatarStorageMutations.subscribe.markAvatarAsUploaded) {
        this.successMessage = 'Profile picture has been uploaded successfully — view your profile.'
      }
    });
  }
}
</script>

<style>
.v-text-field {
  height: 60px;
}

.v-textarea {
  height: 120px;
}

.v-file-input {
  height: 86px;
}
</style>
