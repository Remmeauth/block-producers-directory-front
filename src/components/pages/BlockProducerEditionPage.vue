<template>
  <div v-if="blockProducerError.statusCode === 404 || blockProducer.user.username !== localStorage.username">
    <Error404/>
  </div>
  <div v-else-if="blockProducerError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else-if="blockProducer.user.username === localStorage.username" style="background-color: #f2f2fa;">
    <v-layout>
      <v-flex xs12 sm10 md8 lg8 xl6 offset-sm1 offset-md2 offset-lg2 offset-xl3
        class="mt-4"
        style="background-color: white; border: 1px solid #e7e7f3; border-radius: 5px;
        box-shadow: 0px 3px 1px -3px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.14)"
      >
        <v-form>
          <v-container>
            <v-row class="pt-3">
              <v-col cols="12" lg="10" offset-lg="1" >
                <h3 class="mb-3 heading">Block producer settings</h3>
                <v-divider class="mb-7"></v-divider>
                <span class="description">
                  Please provide correct information. Only Remme Protocol related projects are permitted.
                </span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.name" 
                  :error-messages="nameErrors"
                  @input="$v.blockProducer.name.$touch()"
                  @blur="$v.blockProducer.name.$touch()"
                  outlined 
                  clearable 
                  label="Name*"
                  color="#364fcc"
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
                  label="Website*"
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-web"
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
                  color="#364fcc"
                  prepend-inner-icon="place"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn 
                  class="text-none white--text"
                  @click="updateDetails"
                  depressed
                  color="#27D086"
                  style="height: 38px; font-family: open sans, OpenSans, sans-serif !important;
                  font-style: normal !important;
                  font-weight: bold !important;
                  font-size: 15px !important;
                  line-height: 21px !important;
                  letter-spacing: -0.01em;"
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Description</h3>
                <v-divider class="mb-7"></v-divider>
                <span class="description">
                  Provide a short description and the full description.
                </span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.shortDescription"
                  :error-messages="shortDescriptionErrors"
                  @input="$v.blockProducer.shortDescription.$touch()"
                  @blur="$v.blockProducer.shortDescription.$touch()" 
                  outlined 
                  clearable
                  color="#364fcc"
                  label="Short description*"
                  prepend-inner-icon="mdi-text"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <div class="mb-7">
                  <span class="description">
                    Notice that a full description should not exceed 10000 characters.
                  </span>
                </div>
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
                      <v-btn
                        class="menubar__button custom-btn text-none pa-0"
                        @click="showImagePrompt(commands.image)"
                        text
                        :ripple="false"
                      >
                        <v-icon >mdi-image</v-icon>
                      </v-btn>
                    </div>
                  </editor-menu-bar>
                  <editor-content class="pa-3" ref="contentEditor" :editor="editor" style="border-top: 1px solid #BEBEBE;" /> 
                </div>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn 
                  class="text-none white--text"
                  @click="updateDescription"
                  depressed
                  color="#27D086"
                  style="height: 38px; font-family: open sans, OpenSans, sans-serif !important;
                  font-style: normal !important;
                  font-weight: bold !important;
                  font-size: 15px !important;
                  line-height: 21px !important;
                  letter-spacing: -0.01em;"
                >
                  Update description
                </v-btn>
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Logotype</h3>
                <v-divider class="mb-7"></v-divider>
                <span class="description">
                  Upload block producer logotype.
                </span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1" class="pb-0">
                <v-file-input 
                  v-model="logotypeFile" 
                  outlined
                  color="#364fcc"
                  label="Select your logotype"
                  prepend-inner-icon="mdi-image"
                ></v-file-input>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1" v-if="imageSizeIsTooLarge" class="pt-0">
                <span class="description" style="color: #FB4444;">
                  The size of the uploaded image must be no more than 10 MB.
                </span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn 
                  class="text-none white--text"
                  @click="submitUploadingBlockProducerLogotype"
                  depressed
                  color="#27D086"
                  style="height: 38px; font-family: open sans, OpenSans, sans-serif !important;
                  font-style: normal !important;
                  font-weight: bold !important;
                  font-size: 15px !important;
                  line-height: 21px !important;
                  letter-spacing: -0.01em;"
                >
                  Update logotype
                </v-btn>
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Reference links</h3>
                <v-divider class="mb-7"></v-divider>
                <span class="description">
                  Provide links from other platforms.
                </span>
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-linkedin-box"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-twitter"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-medium"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-github-circle"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-facebook-box"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-telegram"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-alpha-s-circle"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-reddit"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-slack"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-wikipedia"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn 
                  class="text-none white--text"
                  @click="updateReferenceLinks"
                  depressed
                  color="#27D086"
                  style="height: 38px; font-family: open sans, OpenSans, sans-serif !important;
                  font-style: normal !important;
                  font-weight: bold !important;
                  font-size: 15px !important;
                  line-height: 21px !important;
                  letter-spacing: -0.01em;"
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
        <v-form>
          <v-container>
            <v-row class="pb-4">
              <v-col cols="12" lg="10" offset-lg="1"
                v-if="blockProducer.user.username === localStorage.username"
              >
                <h3 class="mb-3" style="color: #FB4444;"> Delete block producer</h3>
                <v-divider class="mb-7"></v-divider>
                <span class="description">
                  Once you delete your block producer, there is no going back. Please be certain.
                </span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1"
                v-if="blockProducer.user.username === localStorage.username"
              >
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on }">
                    <v-btn
                     v-if="blockProducer.user.username === localStorage.username"
                     v-on="on"
                     class="text-none white--text"
                     depressed
                     color="#FB4444"
                     :ripple="false"
                     style="height: 38px; font-family: open sans, OpenSans, sans-serif !important;
                     font-style: normal !important;
                     font-weight: bold !important;
                     font-size: 15px !important;
                     line-height: 21px !important;
                     letter-spacing: -0.01em;"
                    >Delete block producer</v-btn>
                  </template>
                  <v-card>
                    <v-card-text class="description">
                      Are you sure you want to delete this block producer?
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        class="text-none"
                        depressed
                        color="ml-1 grey lighten-1"
                        :ripple="false"
                        style="font-family: open sans, OpenSans, sans-serif !important;
                        font-style: normal !important;
                        font-weight: bold !important;
                        font-size: 15px !important;
                        line-height: 21px !important;
                        letter-spacing: -0.01em;"
                        @click="dialog = false"
                      >Cancel</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="blockProducer.user.username === localStorage.username"
                        @click="deleteBlockProducer"
                        class="mr-1 text-none white--text"
                        depressed
                        color="#FB4444"
                        :ripple="false"
                        style="font-family: open sans, OpenSans, sans-serif !important;
                        font-style: normal !important;
                        font-weight: bold !important;
                        font-size: 15px !important;
                        line-height: 21px !important;
                        letter-spacing: -0.01em;"
                      >Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
import { mapGetters } from 'vuex'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  Image,
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

import editBlockProducerForm from '../../forms/pages/blockProducer/edit'
import Error404 from '../../components/ui/Error404'
import Error500 from '../../components/ui/Error500'
import { avatarStorageActions } from '../../store/modules/avatar'
import { blockProducerStorageActions } from '../../store/modules/blockProducer'

export default {
  name: 'BlockProducerEditionPage',
  mixins: [editBlockProducerForm],
  components: {
    EditorContent,
    EditorMenuBar,
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
      dialog: false,
      logotypeFile: null,
      imageSizeIsTooLarge: false,
      successMessage: null,
      html: '',
      editor: new Editor({
        onUpdate: ({ getHTML }) => {
          this.html=getHTML();
          if (this.html === '<p></p>') this.blockProducer.fullDescription = '';
          else this.blockProducer.fullDescription = this.html;
        },
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Image(),
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
    ...mapGetters('avatar', ['avatarEvents']),
    ...mapGetters('blockProducer', ['blockProducer', 'blockProducerError', 'blockProducerEvents', 'blockProducerFieldsErrors']),
  },
  watch: {
    'blockProducerEvents.isGotten'() {
      this.editor.setContent(this.blockProducer.fullDescription)
    },
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
    'blockProducerEvents.isDeleted'() {
      this.$router.push({name: 'index'})
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
      if (this.logotypeFile.size > 10000000) {
        this.imageSizeIsTooLarge = true
        return
      }

      this.snackBars.submitUploadingBlockProducerLogotype = true
      this.$store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        file: this.logotypeFile,
      })
    },
    deleteBlockProducer () {
      this.$store.dispatch(blockProducerStorageActions.deleteBlockProducer, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
      })
    },
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
  },
  mounted() {
    this.$store.dispatch(blockProducerStorageActions.getBlockProducer, {
        identifier: this.$route.params.identifier,
    })
  }
}
</script>

<style>
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

.delete-button:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  border: 1px solid rgba(27,31,35,.2);
  color: #cb2431;
  font-size: 0.9em;
  font-weight: 600;
  background-color: #eff3f6; 
  background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
}

.delete-button:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  background-color: #E6EBF2; 
  border: 1px solid #9FA3A9;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
</style>
