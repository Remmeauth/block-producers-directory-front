<template>
  <div v-if="blockProducerError.statusCode === 404 || blockProducerCommentError.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="blockProducerError.statusCode === 500 || blockProducerCommentError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout class="mb-12 mt-4" row wrap>
      <v-flex xs10 sm10 md10 lg10 xl6 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl3>
        <v-layout row wrap>
            <v-flex xs12 sm8 md4 lg4 xl4 offset-sm2 offset-md1 offset-lg1 offset-xl1>
              <v-card
                v-if="
                  this.$vuetify.breakpoint.name === 'xs' ||
                  this.$vuetify.breakpoint.name === 'sm'"
                class="mx-auto mb-6"
                align="center"
                outlined
              >
                <v-img class="mt-2 mb-2"
                  v-if="blockProducer.logoUrl"
                  :src="blockProducer.logoUrl"
                  style="max-width: 35%; border-radius: 50%;"
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
                        style="font-size: 30px;"
                      >mdi-account-check</v-icon> 
                    </template>
                    <span>active</span>
                  </v-tooltip>
                </v-form>
                <v-form 
                  v-else-if="blockProducer.user.username === localStorage.username && blockProducer.status === 'moderation'" align="center">
                  <v-tooltip right color="grey lighten-1">
                    <template v-slot:activator="{ on }">
                      <v-icon 
                        class="pt-2" 
                        color="grey lighten-1" 
                        v-on="on" 
                        style="font-size: 30px;"
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
                        style="font-size: 30px;"
                      >mdi-account-check</v-icon> 
                    </template>
                    <span>rejected</span>
                  </v-tooltip>
                </v-form>
                <h3 class="mt-3">
                  <span class="headline">
                    {{ blockProducer.name }}
                  </span>
                </h3>
                <v-card-text class="pt-2 pb-0">
                  {{ blockProducer.shortDescription }}
                </v-card-text>
                <v-card-text
                  v-if="blockProducer.user"
                  class="pt-1 pb-0"
                  @click="$router.push({name: 'user', params: {username: blockProducer.user.username }})"
                  style="cursor: pointer;"
                >
                  <v-form>
                    by <b style="color: #5d80da;"> @{{ blockProducer.user.username }} </b>
                  </v-form>
                </v-card-text>
                <v-card-text 
                  class="pt-1 pb-2"
                  v-if="blockProducer.location"
                >
                  <v-icon>location_on</v-icon>
                  {{ blockProducer.location }}
                </v-card-text>
                <v-card-text
                  class="pt-0"
                  v-if="blockProducer.websiteUrl"
                >
                  <a :href="blockProducer.websiteUrl" style="text-decoration: none; color: black;">
                    <v-icon color="#5d80da">mdi-web</v-icon>
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
                <v-divider v-if="blockProducer.user.username === localStorage.username"></v-divider>
                <v-card-actions 
                  v-if="blockProducer.user" 
                  class="justify-center"
                >
                  <v-btn
                    v-if="blockProducer.user.username === localStorage.username"
                    @click="$router.push({name: 'block-producer-edition', params: {identifier: blockProducer.id }})"
                    class="edit-button"
                    block
                    :ripple="false"
                    depressed
                  >
                    Edit a block producer
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card
                v-if="
                  this.$vuetify.breakpoint.name === 'md' ||
                  this.$vuetify.breakpoint.name === 'lg' ||
                  this.$vuetify.breakpoint.name === 'xl'"
                class="mx-auto mr-6 mb-6"
                align="center"
                outlined
                >
                <v-img class="mt-2 mb-2"
                  v-if="blockProducer.logoUrl"
                  :src="blockProducer.logoUrl"
                  style="max-width: 50%; border-radius: 50%;"
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
                        style="font-size: 30px;"
                      >mdi-account-check</v-icon> 
                    </template>
                    <span>active</span>
                  </v-tooltip>
                </v-form>
                <v-form 
                  v-else-if="blockProducer.user.username === localStorage.username && blockProducer.status === 'moderation'" align="center">
                  <v-tooltip right color="grey lighten-1">
                    <template v-slot:activator="{ on }">
                      <v-icon 
                        class="pt-2" 
                        color="grey lighten-1" 
                        v-on="on" 
                        style="font-size: 30px;"
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
                        style="font-size: 30px;"
                      >mdi-account-check</v-icon> 
                    </template>
                    <span>rejected</span>
                  </v-tooltip>
                </v-form>
                <h3 class="mt-3">
                  <span class="headline">
                    {{ blockProducer.name }}
                  </span>
                </h3>
                <v-card-text class="pt-2 pb-0">
                  {{ blockProducer.shortDescription }}
                </v-card-text>
                <v-card-text
                  v-if="blockProducer.user"
                  class="pt-1 pb-0"
                  @click="$router.push({name: 'user', params: {username: blockProducer.user.username }})"
                  style="cursor: pointer;"
                >
                  <v-form>
                    by <b style="color: #5d80da;"> @{{ blockProducer.user.username }} </b>
                  </v-form>
                </v-card-text>
                <v-card-text 
                  class="pt-1 pb-2"
                  v-if="blockProducer.location"
                >
                  <v-icon>location_on</v-icon>
                  {{ blockProducer.location }}
                </v-card-text>
                <v-card-text 
                  class="pt-0"
                  v-if="blockProducer.websiteUrl"
                >
                  <a :href="blockProducer.websiteUrl" style="text-decoration: none; color: black;">
                    <v-icon color="#5d80da">mdi-web</v-icon>
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
                  class="pt-3 pb-3"
                  v-if="blockProducer.linkedInUrl || blockProducer.twitterUrl"
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
                <v-divider v-if="blockProducer.user.username === localStorage.username"></v-divider>
                <v-card-actions v-if="blockProducer.user" class="justify-center">
                  <v-btn
                    v-if="blockProducer.user.username === localStorage.username"
                    @click="$router.push({name: 'block-producer-edition', params: {identifier: blockProducer.id }})"
                    class="edit-button"
                    block
                    :ripple="false"
                    depressed
                  >
                    Edit a block producer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 md6 lg6 offset-sm2 offset-md0 offset-lg0 offset-xl0>
              <v-card
                class="mx-auto"
                align="center"
                outlined
              >
                <v-subheader>Block producer's information</v-subheader>
                <div class="pa-4 pt-0 caption">
                  <p
                    v-if="blockProducer.fullDescription"
                    style="text-align: justify;"
                    v-html="blockProducer.fullDescription"
                  ></p>
                  <p
                    v-else
                    style="text-align: justify;"
                  >
                    No information has been provided.
                  </p>
                </div>
              </v-card>
              <v-card
                v-if="comments && comments.length > 0"
                class="mt-6"
                outlined
              >
                <v-card-text class="pb-0 black--text" v-if="!localStorage.username">
                  Already have an account?
                  <a class="custom-btn" @click="$router.push({name: 'sign-in'})">
                    Sign in
                  </a>
                  to comment.
                </v-card-text>
                <v-list two-line>
                  <template v-for="(comment, index) in comments">
                    <v-subheader v-if="index === 0">Comments</v-subheader>
                    <v-divider v-else-if="index > 0" :inset="true"></v-divider>
                    <v-list-item v-if="blockProducer.user">
                      <img
                        class="mt-2 mb-2 mr-5 pa-1"
                        style="max-width: 10%; border-radius: 50%; cursor: pointer; border: 1px solid grey"
                        :src="comment.profile_avatar_url"
                        @click="$router.push({name: 'user', params: { username: comment.user.username }})"
                      >
                      <v-list-item-content
                        style="cursor: pointer;"
                        @click="$router.push({name: 'user', params: { username: comment.user.username }})"
                      >
                        <v-list-item-title
                          class="mb-1"
                          style="font-weight: 500; font-size:0.9em;"
                        >
                          {{ comment.user.username }}
                          {{ new Date(comment.created_at * 1000).toLocaleDateString("en-US", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
              <v-card
                v-else
                class="mt-6"
                outlined
              >
                <v-card-text class="pb-0 black--text" v-if="!localStorage.username">
                  Already have an account?
                  <a class="custom-btn" @click="$router.push({name: 'sign-in'})">
                    Sign in
                  </a>
                  to comment.
                </v-card-text>
                <v-subheader>Comments.</v-subheader>
                <div class="pa-4 pt-0 caption">
                  <p style="text-align: justify;">No comments.</p>
                </div>
              </v-card>
              <v-flex class="mt-4" v-if="localStorage.username">
                <h3 class="mb-2">Leave a comment</h3>
                <form>
                  <v-textarea
                    outlined
                    v-model="comment"
                    solo
                    no-resize
                    class="mt-0 mb-2"
                  ></v-textarea>
                  <v-flex xs3 sm3 md3 lg3 xl3>
                    <v-btn
                      v-if="comment"
                      class="create-comment-btn white--text"
                      @click="createComment"
                      style="background-color: #28a745; border: 1px solid rgba(27,31,35,.2); font-size: 0.8em; font-weight: 600; background-image: linear-gradient(-180deg, #34d058, #28a745 90%);" 
                    >
                      Post
                    </v-btn>
                    <v-btn
                      v-else
                      class="create-comment-btn-disabled white--text"
                      style="height: 35px; min-width: 110px; font-size: 0.8em; font-weight: 600; background-color: #94d3a2; border: 1px solid rgba(27,31,35,.2);" 
                    >
                      Post
                    </v-btn>
                  </v-flex>
                </form>
              </v-flex>
            </v-flex>
        </v-layout>
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
    ...mapGetters('blockProducer', ['blockProducer', 'blockProducerError']),
    ...mapGetters('blockProducerComment', ['comments', 'blockProducerCommentError']),
    ...mapGetters('profile', ['profile', 'profileError']),
  },
  methods: {
    createComment() {
      console.log(this.blockProducer)
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
        created_at: (+ new Date() / 1000),
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
  }
}
</script>

<style>
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgba(0, 0, 0, 0.0) !important;
}

.btn-background-none::before {
  color: transparent;
}

.v-btn.create-comment-btn:not(.v-btn--round).v-size--default {
  height: 35px;
  min-width: 110px;
}

.edit-button:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  border: 1px solid rgba(27,31,35,.2);
  color: #24292e;
  font-size: 0.8em;
  font-weight: 600;
  background-color: #eff3f6; 
  background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
}

.edit-button:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined):hover {
  background-color: #E6EBF2; 
  border: 1px solid #9FA3A9;
}

</style>
