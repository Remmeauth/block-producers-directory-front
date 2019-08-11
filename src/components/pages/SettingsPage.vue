<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    {{ fieldsErrors.errors }}
    {{ fieldsErrors.statusCode }}

    {{ successMessage }}

    <form>
      <v-text-field
        v-model="referenceLinks.websiteUrl"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="referenceLinks.linkedInUrl"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="referenceLinks.twitterUrl"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="referenceLinks.mediumUrl"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="referenceLinks.githubUrl"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="referenceLinks.facebookUrl"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="referenceLinks.telegramUrl"
        solo
        required
      ></v-text-field>
      <v-text-field
        v-model="referenceLinks.steemitUrl"
        solo
        required
      ></v-text-field>

      <v-btn @click="updateReferenceLinks">Update links</v-btn>
    </form>

    <form>
      <v-textarea
        v-model="other.additionalInformation"
        solo
        required
      ></v-textarea>

      <v-btn @click="updateAdditionalInformation">Update information</v-btn>
    </form>

    <form>
      <v-text-field
        v-model="details.email"
        solo
        required
        disabled
      ></v-text-field>

      <v-text-field
        v-model="details.username"
        solo
        required
        disabled
      ></v-text-field>

      <v-text-field
        v-model="details.firstName"
        solo
        required
      ></v-text-field>

      <v-text-field
        v-model="details.lastName"
        solo
        required
      ></v-text-field>

      <v-text-field
        v-model="details.location"
        solo
        required
      ></v-text-field>
      <v-btn @click="updateDetails">Update details</v-btn>
    </form>

    {{ other.avatarUrl }}

    </div>
</template>

<script>
import store from '../../store/index'
import { settingsStorageMutations, settingsStorageActions } from '../../store/modules/settings'
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
        avatarUrl: null,
      }
    }
  },
  methods: {
    updateDetails() {
      store.dispatch(settingsStorageActions.updateDetails, {
        firstName: this.details.firstName,
        lastName: this.details.lastName,
        location: this.details.location,
      })
    },
    updateReferenceLinks () {
      store.dispatch(settingsStorageActions.updateReferenceLinks, {
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
    updateAdditionalInformation () {
      store.dispatch(settingsStorageActions.updateAdditionalInformation, {
        additionalInformation: this.other.additionalInformation,
      })
    }
  },
  mounted() {
    store.dispatch(userStorageActions.getUser, {
        username: window.localStorage.username,
    })

    store.dispatch(profileStorageActions.getProfile, {
        username: window.localStorage.username,
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
    });
  }
}
</script>

<style></style>
