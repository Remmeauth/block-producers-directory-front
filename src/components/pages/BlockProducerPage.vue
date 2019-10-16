<template>
  <div v-if="blockProducerError.statusCode === 404 || blockProducerCommentError.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="blockProducerError.statusCode === 500 || blockProducerCommentError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout row wrap style="background-color: #f2f2fa;">
      <v-flex xs12 sm10 md10 lg10 xl10 offset-xs offset-sm1 offset-md1 offset-lg1 offset-xl1>
        <v-container fluid grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm8 md4 lg4 xl3 offset-xs offset-sm2 offset-md1 offset-lg1 offset-xl2 class="pb-0">
              <v-card
                class="mx-auto mt-1 mb-2"
                align="center"
                outlined
                elevation="2"
                style="border: 1px solid #e7e7f3;"
              >
                <div></div>
                <v-img class="mt-4 mb-2 user"
                  v-if="blockProducer.logoUrl"
                  :src="blockProducer.logoUrl + `?${Math.random()}`"
                ></v-img>
                <v-divider></v-divider>
                <v-form
                  v-if="blockProducer.user.username === localStorage.username && blockProducer.status === 'active'" align="center">
                  <v-tooltip right color="green lighten-1">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="pt-2"
                        color="green lighten-1"
                        v-on="on"
                        style="font-size: 30px; border: 1px solid #66BB6A; border-radius: 50%; border-width: medium;"
                      >mdi-account-check</v-icon>
                    </template>
                    <span>active</span>
                  </v-tooltip>
                </v-form>
                <v-form class="pt-3"
                  v-else-if="blockProducer.user.username === localStorage.username && blockProducer.status === 'moderation'" align="center">
                  <v-tooltip right color="grey lighten-1">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="pa-1 "
                        color="grey lighten-1"
                        v-on="on"
                        style="font-size: 30px; border: 1px solid #BDBDBD; border-radius: 50%; border-width: medium;"
                      >mdi-account-check</v-icon>
                    </template>
                    <span>on moderation</span>
                  </v-tooltip>
                </v-form>
                <v-form
                  v-else-if="blockProducer.user.username === localStorage.username && blockProducer.status === 'declined'" align="center">
                  <v-tooltip right color="red lighten-1">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        class="pt-2"
                        color="red lighten-1"
                        v-on="on"
                        style="font-size: 30px; border: 1px solid #EF5350; border-radius: 50%; border-width: medium;"
                      >mdi-account-check</v-icon>
                    </template>
                    <span>rejected</span>
                  </v-tooltip>
                </v-form>
                <v-card-text class="layout justify-center pt-2 pb-0">
                  <h5 class="bp-info pl-2">
                    <span>
                      {{ blockProducer.name }}
                    </span>
                  </h5>
                </v-card-text>
                <v-card-text
                  v-if="blockProducer.user"
                  class="pt-0 pb-0"
                  @click="$router.push({name: 'user', params: {username: blockProducer.user.username }})"
                  style="cursor: pointer;"
                >
                  <v-form class="description">
                    by <b style="color: #364fcc; cursor: pointer;"> @{{ blockProducer.user.username }} </b>
                  </v-form>
                </v-card-text>
                <v-card-text class="pt-0 pb-0">
                  <p class="mb-0 description">
                    {{ blockProducer.shortDescription }}
                  </p>
                </v-card-text>
                <v-card-text
                  class="pt-0 pb-0"
                  v-if="blockProducer.location"
                >
                  <p class="mb-0 location">
                    {{ blockProducer.location }}
                  </p>
                </v-card-text>
                <v-card-text
                  class="pt-1"
                  v-if="blockProducer.websiteUrl"
                >
                  <a :href="blockProducer.websiteUrl" class="website" style="color: #343747;">
                    <v-icon color="#364fcc">mdi-web</v-icon>
                    {{ blockProducer.websiteUrl }}
                  </a>
                </v-card-text>
                <v-divider
                  v-if="blockProducer.linkedInUrl || blockProducer.twitterUrl || blockProducer.githubUrl ||
                        blockProducer.facebookUrl || blockProducer.mediumUrl || blockProducer.telegramUrl ||
                        blockProducer.redditUrl || blockProducer.slackUrl || blockProducer.steemitUrl ||
                        blockProducer.wikipediaUrl"
                ></v-divider>
                <v-card-text
                  v-if="blockProducer.linkedInUrl || blockProducer.twitterUrl || blockProducer.githubUrl ||
                        blockProducer.facebookUrl || blockProducer.mediumUrl || blockProducer.telegramUrl ||
                        blockProducer.redditUrl || blockProducer.slackUrl || blockProducer.steemitUrl ||
                        blockProducer.wikipediaUrl"
                  class="pt-3 pb-3"
                >
                  <a v-if="blockProducer.linkedInUrl" :href="blockProducer.linkedInUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#0077b5">mdi-linkedin-box</v-icon>
                  </a>
                  <a v-if="blockProducer.twitterUrl" :href="blockProducer.twitterUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#1da1f2">mdi-twitter</v-icon>
                  </a>
                  <a v-if="blockProducer.githubUrl" :href="blockProducer.githubUrl" style="text-decoration: none;">
                    <v-icon class="links" color="black">mdi-github-circle</v-icon>
                  </a>
                  <a v-if="blockProducer.facebookUrl" :href="blockProducer.facebookUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#3578E5">mdi-facebook-box</v-icon>
                  </a>
                  <a v-if="blockProducer.mediumUrl" :href="blockProducer.mediumUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#03a87c">mdi-medium</v-icon>
                  </a>
                  <a v-if="blockProducer.telegramUrl" :href="blockProducer.telegramUrl" style="text-decoration: none;">
                    <v-icon class="links" color="black">mdi-telegram</v-icon>
                  </a>
                  <a v-if="blockProducer.redditUrl" :href="blockProducer.redditUrl" style="text-decoration: none;">
                    <v-icon class="links" color="rgb(255, 69, 0)">mdi-reddit</v-icon>
                  </a>
                  <a v-if="blockProducer.slackUrl" :href="blockProducer.slackUrl" style="text-decoration: none;">
                    <v-icon class="links" color="black">mdi-slack</v-icon>
                  </a>
                  <a v-if="blockProducer.steemitUrl" :href="blockProducer.steemitUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#06D6A9">mdi-alpha-s-circle</v-icon>
                  </a>
                  <a v-if="blockProducer.wikipediaUrl" :href="blockProducer.wikipediaUrl" style="text-decoration: none;">
                    <v-icon class="links" color="black">mdi-wikipedia</v-icon>
                  </a>
                </v-card-text>
                <v-divider
                  v-if="blockProducer.user.username === localStorage.username"
                ></v-divider>
                <v-card-actions
                  v-if="blockProducer.user && blockProducer.user.username === localStorage.username"
                  class="justify-center"
                >
                  <v-btn
                    v-if="blockProducer.user.username === localStorage.username"
                    @click="$router.push({name: 'block-producer-edition', params: {identifier: blockProducer.id }})"
                    class="edit-button text-none"
                    :ripple="false"
                    block
                    depressed
                  >
                    Edit block producer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 md6 lg6 xl5 offset-sm2 offset-md0 offset-lg0 offset-xl0>
              <v-card
                class="mx-auto mt-1 mb-6"
                outlined
                elevation="2"
                style="border: 1px solid #e7e7f3;"
              >
                <v-card-text class="layout mt-1 ml-0">
                  <h5 class="bp-info">
                    <span>
                      Block producer's information
                    </span>
                  </h5>
                </v-card-text>
                <div class="pa-4 pt-0">
                  <p
                    v-if="blockProducer.fullDescription"
                    class="description"
                    style="text-align: justify; word-wrap: break-word;"
                    v-html="blockProducer.fullDescription"
                  ></p>
                  <p
                    v-else
                    class="description"
                  >
                    No information has been provided.
                  </p>
                </div>
              </v-card>

                <v-card
                  class="mx-auto mb-6"
                  outlined
                  elevation="2"
                  style="border: 1px solid #e7e7f3; border-radius: 4px;"
                >
                <div
                  v-if="comments && comments.length > 0"
                >
                  <v-card-text
                    class="description pb-0"
                    v-if="!localStorage.username"
                    style="color: #343747;"
                  >
                    Already have an account?
                    <b class="custom-btn"
                       @click="$router.push({name: 'sign-in'})"
                       style="color: #364fcc; cursor: pointer;">
                      Sign in
                    </b>
                    to comment.
                  </v-card-text>
                  <v-list two-line>
                    <template v-for="(comment, index) in comments">
                      <v-card-text
                        v-if="index === 0"
                        class="layout mt-0 ml-0"
                      >
                        <h5 class="bp-info">
                          <span>
                            Comments
                          </span>
                        </h5>
                      </v-card-text>
                      <v-divider v-else-if="index > 0" :inset="true" class="divider"></v-divider>
                      <v-list-item v-if="blockProducer.user">
                        <img
                          class="mt-2 mb-2 mr-5 pa-1 users-bp"
                          :src="comment.profile_avatar_url + `?${Math.random()}`"
                          @click="$router.push({name: 'user', params: { username: comment.user.username }})"
                          style="cursor: pointer;"
                        >
                        <v-list-item-content
                          style="cursor: pointer; text-align: justify;"
                          @click="$router.push({name: 'user', params: { username: comment.user.username }})"
                        >
                          <v-list-item-title
                            class="mb-1 description"
                            style="font-weight: 600; font-size:0.9em; color:#343747;"
                          >
                            {{ comment.user.username }}
                            {{ new Date(comment.created_at * 1000).toLocaleDateString("en-US", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }}
                          </v-list-item-title>
                          <div class="mt-2">
                            <p
                              class="description"
                              style="text-align: justify; word-wrap: break-word; font-size: 0.9em;"
                              v-html="comment.text"
                            ></p>
                          </div>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list>
                </div>
                <div
                  v-else
                >
                  <v-card-text
                    class="description pb-0"
                    v-if="!localStorage.username"
                    style="color: #343747;"
                  >
                    Already have an account?
                    <a class="custom-btn" @click="$router.push({name: 'sign-in'})">
                      Sign in
                    </a>
                    to comment.
                  </v-card-text>
                  <v-card-text
                    class="layout mt-0 ml-0"
                  >
                    <h5 class="bp-info">
                      <span>
                        Comments
                      </span>
                    </h5>
                  </v-card-text>
                  <div class="pa-4 pt-0">
                    <p class="description" style="word-wrap: break-word;">
                      No comments.
                    </p>
                  </div>
                </div>
              </v-card>
              <v-card
                v-if="localStorage.username"
                class="mx-auto"
                align="center"
                outlined
                elevation="2"
                style="border: 1px solid #e7e7f3;"
              >
                <v-card-text class="layout mt-1 pb-0" >
                  <h5 class="bp-info">
                    <span>
                      Leave a comment
                    </span>
                  </h5>
                </v-card-text>
                <form>
                  <v-textarea
                    v-model="comment"
                    no-resize
                    placeholder="Enter comment here..."
                    class="custom-textarea description mt-0 mb-2 pa-4"
                    style="background-color: white;"
                  ></v-textarea>

                </form>
              </v-card>
              <v-flex xs3 sm3 md3 lg3 xl3
                v-if="localStorage.username"
                class="pl-1"
              >
                <v-btn
                  v-if="comment && comment.replace(/\s/g, '').length"
                  class="create-comment-btn white--text text-none"
                  @click="createComment"
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
                  Post
                </v-btn>
                <v-btn
                  v-else
                  class="create-comment-btn-disabled white--text text-none"
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
                  Post
                </v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Error404 from '../../components/ui/Error404'
import Error500 from '../../components/ui/Error500'
import { blockProducerStorageActions } from '../../store/modules/blockProducer'
import { blockProducerCommentStorageActions } from '../../store/modules/blockProducerComment'
import { profileStorageActions } from '../../store/modules/profile'

export default {
  name: 'BlockProducerPage',
  components: {
    Error404,
    Error500,
  },
  data() {
    return {
      comment: null,
    }
  },
  computed: {
    ...mapGetters('blockProducer', ['blockProducer', 'blockProducerError', 'blockProducerEvents']),
    ...mapGetters('blockProducerComment', ['comments', 'blockProducerCommentError']),
    ...mapGetters('profile', ['profile', 'profileError']),
  },
  watch: {
    'blockProducerEvents.isSent'() {
      this.localStorage.statusDescription = this.blockProducer.status_description
    }
  },
  methods: {
    createComment() {
      this.$store.dispatch(blockProducerCommentStorageActions.createComment, {
        jwtToken: this.localStorage.token,
        blockProducerIdentifier: this.$route.params.identifier,
        text: this.comment,
      })

      this.comments.unshift({
        profile_avatar_url: this.profile.avatarUrl,
        user: {
          username: this.localStorage.username,
        },
        text: this.comment,
        created_at: (+new Date() / 1000),
      })

      this.comment = ''
    },
  },
  mounted() {
    if (this.localStorage.username) {
      this.$store.dispatch(profileStorageActions.getProfile, {
        username: this.localStorage.username,
      })
    }

    this.$store.dispatch(blockProducerStorageActions.getBlockProducer, {
      identifier: this.$route.params.identifier,
    })

    this.$store.dispatch(blockProducerCommentStorageActions.getComments, {
      blockProducerIdentifier: this.$route.params.identifier,
    })

    if (this.blockProducer.status_description &&
            this.blockProducer.status_description !== this.localStorage.statusDescription) {

      this.$store.dispatch(blockProducerStorageActions.sendStatusDescriptionToEmail, {
        identifier: this.$route.params.identifier,
        email: this.localStorage.email,
      })
    }
  }
}
</script>

<style>
/*.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {*/
    /*background-color: rgba(0, 0, 0, 0.0) !important;*/
/*}*/

.btn-background-none::before {
  color: transparent;
}

/*.v-btn.create-comment-btn:not(.v-btn--round).v-size--default {*/
  /*height: 35px;*/
  /*min-width: 110px;*/
/*}*/

.edit-button:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  /*border: 1px solid rgba(27,31,35,.2);*/
  /*color: #24292e;*/
  /*font-size: 0.8em;*/
  /*font-weight: 600;*/
  color: #364FCC;
  height: 38px;
  font-family: open sans, OpenSans, sans-serif !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 15px !important;
  line-height: 21px !important;
  background-color: #DBE0F8 !important;

  letter-spacing: -0.01em;
  /*background-color: #eff3f6; */
  /*background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);*/
}

.h3name {
  position: absolute;

  font-family: Avenir Next;
  font-size: 28px;
  line-height: 39px;
  /* identical to box height, or 139% */

  letter-spacing: -0.02em;

  /* black */

  color: #343747;
}

.theme--light.v-divider {
  border-color: #e7e7f3;
}

.custom-textarea.v-text-field>.v-input__control>.v-input__slot:before {
  border-style: none;
}
.custom-textarea.v-text-field>.v-input__control>.v-input__slot:after {
  border-style: none;
}

.description {
  font-family: open sans, OpenSans, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;

  color: #343747;
}

.location {
  font-family: open sans, OpenSans, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;

  color: #343747;
}
.website {
  font-family: open sans, OpenSans, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  text-decoration: none;

  color: #343747;
}

.bp-info {
  font-family: Avenir Next;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;

  color: #343747;
}

.v-textarea.v-input.custom-textarea.description {
  height: 70px;
}
</style>
