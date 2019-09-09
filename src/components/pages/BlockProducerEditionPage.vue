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
      <v-flex xs12 sm10 md8 lg8 xl6 offset-sm1 offset-md2 offset-lg2 offset-xl3 style="box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px #5d80da">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Block producer</h2>
                <br>
                <span>Please provide correct information. Only Remme Protocol related projects are permitted.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="details.name" 
                  :error-messages="nameErrors"
                  @input="$v.details.name.$touch()"
                  @blur="$v.details.name.$touch()"
                  outlined 
                  clearable 
                  label="Name" 
                  prepend-inner-icon="account_circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="details.websiteUrl" 
                  :error-messages="websiteUrlErrors"
                  @input="$v.details.websiteUrl.$touch()"
                  @blur="$v.details.websiteUrl.$touch()"
                  outlined 
                  clearable 
                  label="Website" 
                  prepend-inner-icon="mdi mdi-web"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field 
                  v-model="details.location"
                  :error-messages="locationUrlErrors"
                  @input="$v.details.location.$touch()"
                  @blur="$v.details.location.$touch()" 
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
                  v-model="descriptions.shortDescription"
                  :error-messages="shortDescriptionErrors"
                  @input="$v.descriptions.shortDescription.$touch()"
                  @blur="$v.descriptions.shortDescription.$touch()" 
                  outlined 
                  clearable 
                  label="Short description"
                ></v-text-field>
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
                  @click="updateDescription"
                  style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
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
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Logotype</h2>
                <br>
                <span>Upload block producer logotype.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-file-input 
                  v-model="other.logotypeFile" 
                  outlined 
                  label="Select your logotype"
                ></v-file-input>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn 
                  class="text-none white--text"
                  @click="submitUploadingBlockProducerLogotype"
                  style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
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
              <v-col cols="12" lg="12" offset-lg="1">
                <h2>Reference links</h2>
                <br>
                <span>Provide your profiles from other platforms.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.linkedInUrl"
                  :error-messages="linkedInUrlErrors"
                  @input="$v.referenceLinks.linkedInUrl.$touch()"
                  @blur="$v.referenceLinks.linkedInUrl.$touch()" 
                  outlined 
                  clearable 
                  label="LinkedIn" 
                  prepend-inner-icon="mdi mdi-linkedin-box"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.twitterUrl"
                  :error-messages="twitterUrlErrors"
                  @input="$v.referenceLinks.twitterUrl.$touch()"
                  @blur="$v.referenceLinks.twitterUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Twitter" 
                  prepend-inner-icon="mdi mdi-twitter"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.mediumUrl"
                  :error-messages="mediumUrlErrors"
                  @input="$v.referenceLinks.mediumUrl.$touch()"
                  @blur="$v.referenceLinks.mediumUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Medium" 
                  prepend-inner-icon="mdi mdi-medium"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.githubUrl"
                  :error-messages="githubUrlErrors"
                  @input="$v.referenceLinks.githubUrl.$touch()"
                  @blur="$v.referenceLinks.githubUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Github" 
                  prepend-inner-icon="mdi mdi-github-circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.facebookUrl"
                  :error-messages="facebookUrlErrors"
                  @input="$v.referenceLinks.facebookUrl.$touch()"
                  @blur="$v.referenceLinks.facebookUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Facebook" 
                  prepend-inner-icon="mdi mdi-facebook-box"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.telegramUrl"
                  :error-messages="telegramUrlErrors"
                  @input="$v.referenceLinks.telegramUrl.$touch()"
                  @blur="$v.referenceLinks.telegramUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Telegram" 
                  prepend-inner-icon="mdi mdi-telegram"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.steemitUrl"
                  :error-messages="steemitUrlErrors"
                  @input="$v.referenceLinks.steemitUrl.$touch()"
                  @blur="$v.referenceLinks.steemitUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Steemit" 
                  prepend-inner-icon="mdi mdi-alpha-s-circle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.redditUrl"
                  :error-messages="redditUrlErrors"
                  @input="$v.referenceLinks.redditUrl.$touch()"
                  @blur="$v.referenceLinks.redditUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Reddit" 
                  prepend-inner-icon="mdi mdi-reddit"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field 
                  v-model="referenceLinks.slackUrl"
                  :error-messages="slackUrlErrors"
                  @input="$v.referenceLinks.slackUrl.$touch()"
                  @blur="$v.referenceLinks.slackUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Slack" 
                  prepend-inner-icon="mdi mdi-slack"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5">
                <v-text-field 
                  v-model="referenceLinks.wikipediaUrl"
                  :error-messages="wikipediaUrlErrors"
                  @input="$v.referenceLinks.wikipediaUrl.$touch()"
                  @blur="$v.referenceLinks.wikipediaUrl.$touch()" 
                  outlined 
                  clearable 
                  label="Wikipedia" 
                  prepend-inner-icon="mdi mdi-wikipedia"
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
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
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
import { avatarStorageActions, avatarStorageMutations } from '../../store/modules/avatar'
import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'

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
      html: '',
      editor: new Editor({
        onUpdate: ({ getHTML }) => {
          this.html=getHTML();
          if (this.html === '<p></p>') this.descriptions.fullDescription = '';
          else this.descriptions.fullDescription = this.html;
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
  methods: {
    updateDetails() {
      this.$v.$touch()
      if (this.$v.details.$anyError) { return }

      this.snackBars.updateDetails = true
      this.$store.dispatch(blockProducerStorageActions.updateDetails, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        name: this.details.name,
        location: this.details.location,
        websiteUrl: this.details.websiteUrl,
      })
    },
    updateDescription () {
      this.$v.$touch()
      if (this.$v.descriptions.$anyError) { return }

      this.snackBars.updateDescription = true
      this.$store.dispatch(blockProducerStorageActions.updateDescription, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        shortDescription: this.descriptions.shortDescription,
        fullDescription: this.descriptions.fullDescription,
      })
    },
    updateReferenceLinks () {
      this.$v.$touch()
      if (this.$v.details.$anyError) { return }

      this.snackBars.updateReferenceLinks = true
      this.$store.dispatch(blockProducerStorageActions.updateReferenceLinks, {
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
    submitUploadingBlockProducerLogotype() {
      this.snackBars.submitUploadingBlockProducerLogotype = true
      this.$store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
        jwtToken: this.localStorage.token,
        identifier: this.$route.params.identifier,
        file: this.other.logotypeFile,
      })
    },
  },
  mounted() {
    this.$store.dispatch(blockProducerStorageActions.getBlockProducer, {
        identifier: this.$route.params.identifier,
    })

    const unsubscribe = this.$store.subscribe((mutation, state) => {
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
        
        this.editor.setContent(this.descriptions.fullDescription)
      }

      if (
        mutation.type === blockProducerStorageMutations.subscribe.updateDetails ||
        mutation.type === blockProducerStorageMutations.subscribe.updateDescription ||
        mutation.type === blockProducerStorageMutations.subscribe.updateReferenceLinks ||
        mutation.type === avatarStorageMutations.subscribe.markAvatarAsUploaded
      ) {
        this.successMessage =
          "Block producer updated successfully — <a href=\"" +
          `/block-producers/${this.$route.params.identifier}` +
          "\">view your block producer</a>"
      }
    });
  }
}
</script>

<style></style>
