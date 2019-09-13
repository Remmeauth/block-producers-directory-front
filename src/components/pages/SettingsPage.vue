<template>
  <div v-if="profileError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex xs12 sm10 md8 lg8 xl6 offset-sm1 offset-md2 offset-lg2 offset-xl3>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Personal details</h2>
                <v-divider class="mb-7"></v-divider>
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
                <v-btn
                  class="text-none white--text"
                  @click="updateDetails"
                  style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
                >
                  Update details
                </v-btn>
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Additional information</h2>
                <v-divider class="mb-7"></v-divider>
                <span>Tell some words about yourself.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <div class="editor" style="border:1px solid #BEBEBE; border-radius: 4px;">
                  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div class="menubar">
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-bold</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-italic</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.strike() }"
                        @click="commands.strike"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-strikethrough-variant</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.underline() }"
                        @click="commands.underline"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-underline</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-code-tags</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-header-1</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-header-2</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-header-3</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-list-bulleted</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-format-list-numbered</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        @click="commands.undo"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-undo</v-icon>
                      </v-btn>
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        @click="commands.redo"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-redo</v-icon>
                      </v-btn>
                    </div>
                  </editor-menu-bar>
                  <editor-content class="pa-3" ref="contentEditor" :editor="editor" style="border-top: 1px solid #BEBEBE;" /> 
                </div>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn
                  class="text-none white--text"
                  @click="updateAdditionalInformation"
                  style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
                >
                  Update information
                </v-btn>
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Profile picture</h2>
                <v-divider class="mb-7"></v-divider>
                <span>Upload your picture or avatar.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-file-input
                  v-model="avatarFile"
                  outlined
                  label="Select your picture"
                ></v-file-input>
                <v-btn 
                  class="text-none white--text"
                  @click="submitUploadingProfileAvatar"
                  style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
                >
                  Upload picture
                </v-btn>
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Reference links</h2>
                <v-divider class="mb-7"></v-divider>
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
                  label="Web-site" 
                  prepend-inner-icon="mdi mdi-web"
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
                  prepend-inner-icon="mdi mdi-linkedin-box"
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
                  prepend-inner-icon="mdi mdi-twitter"
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
                  prepend-inner-icon="mdi mdi-medium"
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
                  prepend-inner-icon="mdi mdi-github-circle"
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
                  prepend-inner-icon="mdi mdi-facebook-box"
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
                  prepend-inner-icon="mdi mdi-telegram"
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
                  prepend-inner-icon="mdi mdi-alpha-s-circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn 
                  class="text-none white--text"
                  @click="updateReferenceLinks"
                  style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
                >
                  Update links
                </v-btn>
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
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

import Error500 from '../../components/ui/Error500'
import { userSettingsForm } from "../../forms/pages/user/settings"
import { avatarStorageActions } from '../../store/modules/avatar'
import { userStorageActions } from '../../store/modules/user'
import { profileStorageActions } from '../../store/modules/profile'
import { truncate } from 'fs';

export default {
  name: 'SettingsPage',
  mixins: [userSettingsForm],
  components: {
    EditorContent,
    EditorMenuBar,
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
      html: '',
      editor: new Editor({
        onUpdate: ({ getHTML }) => {
          this.html = getHTML();
          if (this.html === '<p></p>') this.profile.additionalInformation = '';
          else this.profile.additionalInformation = this.html;
        },
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
      }),
    }
  },
  computed: {
    ...mapGetters('user', ['userError', 'user']),
    ...mapGetters('profile', ['profileError', 'profileFieldsErrors', 'profile', 'profileEvents']),
  },
  watch: {
    'profileEvents.isGotten'() {
      this.editor.setContent(this.profile.additionalInformation)
    },
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
  },
  beforeDestroy() {
    this.editor.destroy()
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

.custom-btn::before {
  color: transparent;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 30px;
  min-width: 40px;
}

.editor:hover {
  border-color: black;
}

.ProseMirror-focused {
  outline: none;
}

.menubar {
	 transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}

.menubar.is-hidden {
	 visibility: hidden;
	 opacity: 0;
}

.menubar.is-focused {
	 visibility: visible;
	 opacity: 1;
	 transition: visibility 0.2s, opacity 0.2s;
}

.menubar__button:hover {
	 background-color: rgba(0, 0, 0, 0.05);
}

.menubar__button.is-active {
	 background-color: rgba(0, 0, 0, 0.1);
}
</style>
