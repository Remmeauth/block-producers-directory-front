<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
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
                  v-model="user.username"
                  disabled 
                  outlined 
                  clearable 
                  label="Username" 
                  prepend-inner-icon="alternate_email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="user.email"
                  :error-messages="emailErrors"
                  @input="$v.user.email.$touch()"
                  @blur="$v.user.email.$touch()"
                  disabled 
                  outlined 
                  clearable 
                  label="E-mail address" 
                  prepend-inner-icon="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="profile.firstName"
                  :error-messages="firstNameErrors"
                  @input="$v.profile.firstName.$touch()"
                  @blur="$v.profile.firstName.$touch()"
                  outlined 
                  clearable 
                  label="First name" 
                  prepend-inner-icon="account_circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="profile.lastName"
                  :error-messages="lastNameErrors"
                  @input="$v.profile.lastName.$touch()"
                  @blur="$v.profile.lastName.$touch()"
                  outlined 
                  clearable 
                  label="Last name" 
                  prepend-inner-icon="account_circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field 
                  v-model="profile.location"
                  :error-messages="locationErrors"
                  @input="$v.profile.location.$touch()"
                  @blur="$v.profile.location.$touch()"
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
                  v-model="profile.additionalInformation"
                  :error-messages="additionalInformationErrors"
                  @input="$v.profile.additionalInformation.$touch()"
                  @blur="$v.profile.additionalInformation.$touch()"
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
                  v-model="avatarFile"
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
                  v-model="profile.websiteUrl"
                  :error-messages="websiteUrlErrors"
                  @input="$v.profile.websiteUrl.$touch()"
                  @blur="$v.profile.websiteUrl.$touch()"
                  outlined
                  clearable
                  label="Web-site address"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="profile.linkedInUrl"
                  :error-messages="linkedInUrlErrors"
                  @input="$v.profile.linkedInUrl.$touch()"
                  @blur="$v.profile.linkedInUrl.$touch()"
                  outlined
                  clearable
                  label="LinkedIn"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="profile.twitterUrl"
                  :error-messages="twitterUrlErrors"
                  @input="$v.profile.twitterUrl.$touch()"
                  @blur="$v.profile.twitterUrl.$touch()"
                  outlined
                  clearable
                  label="Twitter"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="profile.mediumUrl"
                  :error-messages="mediumUrlErrors"
                  @input="$v.profile.mediumUrl.$touch()"
                  @blur="$v.profile.mediumUrl.$touch()"
                  outlined
                  clearable
                  label="Medium"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="profile.githubUrl"
                  :error-messages="githubUrlErrors"
                  @input="$v.profile.githubUrl.$touch()"
                  @blur="$v.profile.githubUrl.$touch()"
                  outlined
                  clearable
                  label="Github"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="profile.facebookUrl"
                  :error-messages="facebookUrlErrors"
                  @input="$v.profile.facebookUrl.$touch()"
                  @blur="$v.profile.facebookUrl.$touch()"
                  outlined
                  clearable
                  label="Facebook"
                  prepend-inner-icon="link"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="profile.telegramUrl"
                  :error-messages="telegramUrlErrors"
                  @input="$v.profile.telegramUrl.$touch()"
                  @blur="$v.profile.telegramUrl.$touch()"
                  outlined
                  clearable
                  label="Telegram"
                  prepend-inner-icon="link"
                  ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field
                  v-model="profile.steemitUrl"
                  :error-messages="steemitUrlErrors"
                  @input="$v.profile.steemitUrl.$touch()"
                  @blur="$v.profile.steemitUrl.$touch()"
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
import { mapGetters } from 'vuex'

import Error500 from '../../components/ui/Error500'
import { userSettingsForm } from "../../forms/pages/user/settings"
import { avatarStorageActions } from '../../store/modules/avatar'
import { userStorageActions } from '../../store/modules/user'
import { profileStorageActions } from '../../store/modules/profile'

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
      avatarFile: null,
      successMessage: null,
    }
  },
  computed: {
    ...mapGetters('user', ['userError', 'user']),
    ...mapGetters('profile', ['profileError', 'profileFieldsErrors', 'profile']),
  },
  methods: {
    updateDetails() {
      if (!this.isDetailsFormValid()) { return }

      this.snackBars.updateDetails = true
      this.$store.dispatch(profileStorageActions.updateDetails, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        location: this.profile.location,
      })
    },
    updateReferenceLinks() {
      if (!this.isReferenceLinksFormValid()) { return }

      this.snackBars.updateReferenceLinks = true
      this.$store.dispatch(profileStorageActions.updateReferenceLinks, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        websiteUrl: this.profile.websiteUrl,
        linkedInUrl: this.profile.linkedInUrl,
        twitterUrl: this.profile.twitterUrl,
        mediumUrl: this.profile.mediumUrl,
        githubUrl: this.profile.githubUrl,
        facebookUrl: this.profile.facebookUrl,
        telegramUrl: this.profile.telegramUrl,
        steemitUrl: this.profile.steemitUrl,
      })
    },
    updateAdditionalInformation() {
      if (!this.isAdditionalInformationFormValid()) { return }

      this.snackBars.updateAdditionalInformation = true
      this.$store.dispatch(profileStorageActions.updateAdditionalInformation, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        additionalInformation: this.profile.additionalInformation,
      })
    },
    submitUploadingProfileAvatar() {
      this.snackBars.submitUploadingProfileAvatar = true
      this.$store.dispatch(avatarStorageActions.uploadUserAvatarForUser, {
        jwtToken: this.localStorage.token,
        username: this.localStorage.username,
        file: this.avatarFile, 
      })
    },
  },
  mounted() {
    this.successMessage =
      "Profile updated successfully — <a href=\"" +
      `/users/${this.localStorage.username}` +
      "\">view your profile</a>"

    if (!this.localStorage.username) {
      this.$router.push({name: 'index'})
    }
    
    this.$store.dispatch(userStorageActions.getUser, {
        username: this.localStorage.username,
    })

    this.$store.dispatch(profileStorageActions.getProfile, {
        username: this.localStorage.username,
    })
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
