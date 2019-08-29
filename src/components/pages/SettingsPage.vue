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
                <h2>Personal details</h2>
                <br>
                <span>All provided information is optional and shown on your profile page. E-mail is never shown publicly.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="details.username" 
                  disabled 
                  outlined 
                  clearable 
                  label="Username" 
                  prepend-inner-icon="alternate_email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="details.email"
                  :error-messages="emailErrors"
                  @input="$v.details.email.$touch()"
                  @blur="$v.details.email.$touch()" 
                  disabled 
                  outlined 
                  clearable 
                  label="E-mail address" 
                  prepend-inner-icon="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="details.firstName" 
                  :error-messages="firstNameErrors"
                  @input="$v.details.firstName.$touch()"
                  @blur="$v.details.firstName.$touch()" 
                  outlined 
                  clearable 
                  label="First name" 
                  prepend-inner-icon="account_circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="details.lastName"
                  :error-messages="lastNameErrors"
                  @input="$v.details.lastName.$touch()"
                  @blur="$v.details.lastName.$touch()"  
                  outlined 
                  clearable 
                  label="Last name" 
                  prepend-inner-icon="account_circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field 
                  v-model="details.location"
                  :error-messages="locationErrors"
                  @input="$v.details.location.$touch()"
                  @blur="$v.details.location.$touch()"  
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
                <v-btn color="pink" text @click="snackBars.updateDetails = false">
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
                <h2>Additional information</h2>
                <br>
                <span>Tell some words about yourself.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-textarea  
                  v-model="other.additionalInformation" 
                  :error-messages="additionalInformationErrors"
                  @input="$v.other.additionalInformation.$touch()"
                  @blur="$v.other.additionalInformation.$touch()"
                  no-resize
                  outlined 
                  label="Additional information"
                ></v-textarea>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn @click="updateAdditionalInformation">Update information</v-btn>
              </v-col>
              <v-snackbar 
                v-if="this.successMessage" 
                right 
                top 
                v-model="snackBars.updateAdditionalInformation"
              >
                <span v-html="this.successMessage"></span>
                <v-btn color="pink" text @click="snackBars.updateAdditionalInformation = false">
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
                <h2>Profile picture</h2>
                <br>
                <span>Upload your picture or avatar.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-file-input 
                  v-model="other.avatarFile" 
                  outlined 
                  label="Select your picture"
                ></v-file-input>
                <v-btn @click="submitUploadingProfileAvatar">Upload picture</v-btn>
              </v-col>
              <v-snackbar 
                v-if="this.successMessage" 
                right 
                top 
                v-model="snackBars.submitUploadingProfileAvatar"
              >
                <span v-html="this.successMessage"></span>
                <v-btn color="pink" text @click="snackBars.submitUploadingProfileAvatar = false">
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
                  v-model="referenceLinks.websiteUrl"
                  :error-messages="websiteUrlErrors"
                  @input="$v.referenceLinks.websiteUrl.$touch()"
                  @blur="$v.referenceLinks.websiteUrl.$touch()" 
                  outlined
                  clearable 
                  label="Web-site address" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.linkedInUrl" 
                  :error-messages="linkedInUrlErrors"
                  @input="$v.referenceLinks.linkedInUrl.$touch()"
                  @blur="$v.referenceLinks.linkedInUrl.$touch()"
                  outlined 
                  clearable 
                  label="LinkedIn" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.twitterUrl"
                  :error-messages="twitterUrlErrors"
                  @input="$v.referenceLinks.twitterUrl.$touch()"
                  @blur="$v.referenceLinks.twitterUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Twitter" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.mediumUrl"
                  :error-messages="mediumUrlErrors"
                  @input="$v.referenceLinks.mediumUrl.$touch()"
                  @blur="$v.referenceLinks.mediumUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Medium" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.githubUrl"
                  :error-messages="githubUrlErrors"
                  @input="$v.referenceLinks.githubUrl.$touch()"
                  @blur="$v.referenceLinks.githubUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Github" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.facebookUrl"
                  :error-messages="facebookUrlErrors"
                  @input="$v.referenceLinks.facebookUrl.$touch()"
                  @blur="$v.referenceLinks.facebookUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Facebook" 
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.telegramUrl"
                  :error-messages="telegramUrlErrors"
                  @input="$v.referenceLinks.telegramUrl.$touch()"
                  @blur="$v.referenceLinks.telegramUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Telegram" 
                  prepend-inner-icon="link"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.steemitUrl"
                  :error-messages="steemitUrlErrors"
                  @input="$v.referenceLinks.steemitUrl.$touch()"
                  @blur="$v.referenceLinks.steemitUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Steemit" 
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
                <v-btn color="pink" text @click="snackBars.updateReferenceLinks = false">
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
import Error500 from '../../components/ui/Error500'
import store from '../../store/index'
import userSettingsForm from '../../forms/pages/user/settings'
import { avatarStorageActions, avatarStorageMutations } from '../../store/modules/avatar'
import { settingsStorageActions, settingsStorageMutations } from '../../store/modules/settings'
import { userStorageActions, userStorageMutations } from '../../store/modules/user'
import { profileStorageActions, profileStorageMutations } from '../../store/modules/profile'

export default {
  name: 'SettingsPage',
  mixins: [userSettingsForm],
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
      snackBars: {
        updateDetails: null,
        updateReferenceLinks: null,
        updateAdditionalInformation: null,
        submitUploadingProfileAvatar: null,
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
      this.$v.$touch()
      if (this.$v.details.$anyError) { return }

      this.snackBars.updateDetails = true
      store.dispatch(settingsStorageActions.updateDetails, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        firstName: this.details.firstName,
        lastName: this.details.lastName,
        location: this.details.location,
      })
    },
    updateReferenceLinks() {
      this.$v.$touch()
      if (this.$v.referenceLinks.$anyError) { return }

      this.snackBars.updateReferenceLinks = true
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
      this.$v.$touch()
      if (this.$v.other.$anyError) { return }

      this.snackBars.updateAdditionalInformation = true
      store.dispatch(settingsStorageActions.updateAdditionalInformation, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        additionalInformation: this.other.additionalInformation,
      })
    },
    submitUploadingProfileAvatar() {
    this.snackBars.submitUploadingProfileAvatar = true
      store.dispatch(avatarStorageActions.uploadUserAvatarForUser, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        file: this.other.avatarFile,
      })
    },
  },
  mounted() {
    if (!this.localStorage.username) {
      this.$router.push({name: 'index'})
    }
    
    store.dispatch(userStorageActions.getUser, {
        username: this.localStorage.username,
    })

    store.dispatch(profileStorageActions.getProfile, {
        username: this.localStorage.username,
    })

    const unsubscribe = store.subscribe((mutation, state) => {
      if (mutation.type === settingsStorageMutations.subscribe.addError) {
        this.error = state.settings.error
        unsubscribe()
      }

      if (mutation.type === settingsStorageMutations.subscribe.addFieldsErrors) {
        this.fieldsErrors = state.settings.fieldsErrors
        unsubscribe()
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
        mutation.type === settingsStorageMutations.subscribe.updateDetails ||
        mutation.type === avatarStorageMutations.subscribe.markAvatarAsUploaded
      ) {
      this.successMessage =
          "Profile updated successfully — <a href=\"" +
          `/users/${this.localStorage.username}` +
          "\">view your profile</a>"
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
