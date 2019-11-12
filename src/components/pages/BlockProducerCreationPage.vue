<template>
  <div v-if="blockProducerError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else style="background-color: #f2f2fa;">
    <v-layout>
      <v-flex xs12 sm10 md8 lg8 xl6 offset-sm1 offset-md2 offset-lg2 offset-xl3
        class="mt-4"
        style="background-color: white; border: 1px solid #e7e7f3; border-radius: 5px;
        box-shadow: 0px 3px 1px -3px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.14)"
      >
        <v-form>
          <v-container>
            <v-row class="pt-3">
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Block producer creation</h3>
                <v-divider class="mb-7"></v-divider>
                <span class="description">
                  Please provide correct information. Only Remme Protocol related projects are permitted.
                </span>
              </v-col>
              <v-col cols="12" lg="5" offset-lg="1">
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  outlined
                  clearable
                  label="Name*"
                  color="#364fcc"
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
                  label="Website*"
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-web"
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
                  color="#364fcc"
                  prepend-inner-icon="place"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
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
                  v-model="shortDescription"
                  :error-messages="shortDescriptionErrors"
                  @input="$v.shortDescription.$touch()"
                  @blur="$v.shortDescription.$touch()"
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
                        <v-icon>mdi-format-bold</v-icon>
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
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Logotype</h3>
                <v-divider class="mb-7"></v-divider>
                <span class="description">
                  Upload block producer logotype. If you do not provide a logotype image, the default image will be set.
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
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h3 class="mb-3 heading">Reference links</h3>
                <v-divider class="mb-7"></v-divider>
                <spann class="description">
                  Provide links from other platforms.
                </spann>
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-linkedin-box"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-twitter"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-medium"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-github-circle"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-facebook-box"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-telegram"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-alpha-s-circle"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-reddit"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-slack"
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
                  color="#364fcc"
                  prepend-inner-icon="mdi mdi-wikipedia"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-col cols="12" xs="4" sm="4" md="2" lg="2" offset-sm="4" offset-md="5" offset-lg="5" class="mb-4">
              <v-btn 
                class="text-none white--text"
                @click="create"
                depressed
                block
                color="#27D086"
                style="height: 38px; font-family: open sans, OpenSans, sans-serif !important;
                font-style: normal !important;
                font-weight: bold !important;
                font-size: 15px !important;
                line-height: 21px !important;
                letter-spacing: -0.01em;"
              >
                Submit
              </v-btn>
            </v-col>
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

import { submitBlockProducerForm } from '../../forms/pages/blockProducer/submit'
import Error500 from '../../components/ui/Error500'
import { avatarStorageActions } from '../../store/modules/avatar'
import { blockProducerStorageActions } from '../../store/modules/blockProducer'

export default {
  name: 'BlockProducerCreationPage',
  mixins: [submitBlockProducerForm],
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
      imageSizeIsTooLarge: false,
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
      html: '',
      editor: new Editor({
        onUpdate: ({ getHTML }) => {
          this.html=getHTML();
          if (this.html === '<p></p>') this.fullDescription = '';
          else this.fullDescription = this.html;
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
    ...mapGetters('avatar', ['avatarError', 'avatarEvents']),
    ...mapGetters('blockProducer', ['blockProducer', 'blockProducerError', 'blockProducerEvents']),
  },
  watch: {
    'blockProducerEvents.isCreated'() {
      this.createdBlockProducerIdentifier = this.blockProducer.id

      if (!this.logotypeFile) { 
        this.$router.push({name: 'block-producer', params: {identifier: this.createdBlockProducerIdentifier }})
        return
      }

      this.$store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
        jwtToken: this.localStorage.token,
        identifier: this.createdBlockProducerIdentifier,
        file: this.logotypeFile,
      })
    },
    'avatarEvents.isUploaded'() {
      this.$router.push({name: 'block-producer', params: {identifier: this.createdBlockProducerIdentifier }})
    }
  },
  methods: {
    create () {
      if (!this.isFormValid()) { return }

      if (this.logotypeFile) {
        if (this.logotypeFile.size > 10000000) {
          this.imageSizeIsTooLarge = true
          return
        }
      }

      this.$store.dispatch(blockProducerStorageActions.createBlockProducer, {
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
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style>
.custom-btn::before {
  color: transparent;
}

/* .v-btn:not(.v-btn--round).v-size--default {
  height: 30px;
  min-width: 40px;
} */

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

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}

.heading {
  color: #343747;
  font-family: Open Sans,sans-serif;
}
</style>
