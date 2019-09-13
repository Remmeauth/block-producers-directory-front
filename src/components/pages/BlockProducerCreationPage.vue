<template>
  <div v-if="blockProducerError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout>
      <v-flex xs12 sm10 md8 lg8 xl6 offset-sm1 offset-md2 offset-lg2 offset-xl3>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Block producer</h2>
                <v-divider class="mb-7"></v-divider>
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
                  prepend-inner-icon="place"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Description</h2>
                <v-divider class="mb-7"></v-divider>
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
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Logotype</h2>
                <v-divider class="mb-7"></v-divider>
                <span>Upload block producer logotype.</span>
              </v-col>
              <v-col cols="12" lg="10" offset-lg="1">
                <v-file-input v-model="logotypeFile" outlined label="Select your logotype"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" lg="10" offset-lg="1">
                <h2 class="mb-3">Reference links</h2>
                <v-divider class="mb-7"></v-divider>
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
                  prepend-inner-icon="mdi mdi-wikipedia"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-col cols="12" lg="4" offset-lg="5">
              <v-btn 
                class="text-none white--text"
                @click="create"
                style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
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

      if (this.logotypeFile) {
        this.$store.dispatch(avatarStorageActions.uploadBlockProducerAvatar, {
          jwtToken: this.localStorage.token,
          identifier: this.createdBlockProducerIdentifier,
          file: this.logotypeFile,
        })
      } else {
        this.$router.push({name: 'block-producer', params: {identifier: this.createdBlockProducerIdentifier }})
      }

    },
    'avatarEvents.isUploaded'() {
      this.$router.push({name: 'block-producer', params: {identifier: this.createdBlockProducerIdentifier }})
    }
  },
  methods: {
    create () {
      if (!this.isFormValid()) { return }

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
</style>
