<template>
  <div v-if="blockProducerError.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="blockProducerError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex xs12 sm10 md8 lg8 xl6 offset-sm1 offset-md2 offset-lg2 offset-xl3>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Block producer settings</h3>
                <v-divider class="mb-7"></v-divider>
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
                  label="Name*"
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Description</h3>
                <v-divider class="mb-7"></v-divider>
                <span>Provide a short description and the full description.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-text-field 
                  v-model="blockProducer.shortDescription"
                  :error-messages="shortDescriptionErrors"
                  @input="$v.blockProducer.shortDescription.$touch()"
                  @blur="$v.blockProducer.shortDescription.$touch()" 
                  outlined 
                  clearable 
                  label="Short description*"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <div class="mb-7">
                  <span>Notice that a full description should not exceed 1000 characters.</span>
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Logotype</h3>
                <v-divider class="mb-7"></v-divider>
                <span>Upload block producer logotype.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1" class="pb-0">
                <v-file-input 
                  v-model="logotypeFile" 
                  outlined 
                  label="Select your logotype"
                ></v-file-input>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1" v-if="imageSizeIsTooLarge" class="pt-0">
                <span style="color: red; font-size: 0.9em;">
                  The size of the uploaded image must be no more than 10 MB.
                </span>
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
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Reference links</h3>
                <v-divider class="mb-7"></v-divider>
                <span>Provide links from other platforms.</span>
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
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3" style="color: #cb2431;"> Delete block producer</h3>
                <v-divider class="mb-7"></v-divider>
                <span>Once you delete your block producer, there is no going back. Please be certain.</span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-btn 
                  v-if="blockProducer.user.username === localStorage.username"
                  class="delete-button text-none"
                  @click="deleteBlockProducer"
                  depressed
                  :ripple="false"
                >
                  Delete block producer
                </v-btn>
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
