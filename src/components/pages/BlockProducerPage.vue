<template>
  <div v-if="blockProducerError.statusCode === 404 || blockProducerCommentError.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="blockProducerError.statusCode === 500 || blockProducerCommentError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout class="mb-12 mt-12" row wrap>
      <v-flex xs10 sm10 md10 lg10 xl8 offset-xs1 offset-sm3 offset-md2 offset-lg1 offset-xl2>
        <v-layout row wrap>
            <v-flex xs12 sm8 md4 lg4 xl3 offset-lg1>
              <v-card
                v-if="
                  this.$vuetify.breakpoint.name === 'xs' ||
                  this.$vuetify.breakpoint.name === 'sm'"
                class="mx-auto mb-6"
                align="center"
                elevation="10"
                outlined
                style="border-color: #5d80da;"
                >
                <v-img class="mt-2 mb-2"
                  v-if="blockProducer.logoUrl"
                  :src="blockProducer.logoUrl"
                  style="max-width: 35%; border-radius: 50%;"
                ></v-img>
                <v-divider></v-divider>
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
                  class="pt-1 pl-2 pb-2"
                >
                  <v-icon>location_on</v-icon>
                  {{ blockProducer.location }}
                </v-card-text>
                <v-card-text
                  class="pt-0 pl-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="blockProducer.websiteUrl" style="text-decoration: none; color: black;">
                    {{ blockProducer.websiteUrl }}
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text
                  class="pt-4 pl-2 pb-2"
                  v-if="blockProducer.twitterUrl"
                >
                  <v-icon>link</v-icon>
                  <a :href="blockProducer.twitterUrl" style="text-decoration: none; color: black;">
                    {{ blockProducer.twitterUrl }}
                  </a>
                </v-card-text>
                <v-card-text
                  class="pt-0 pl-2"
                  v-if="blockProducer.githubUrl"
                >
                  <v-icon>link</v-icon>
                  <a :href="blockProducer.githubUrl" style="text-decoration: none; color: black;">
                    {{ blockProducer.githubUrl }}
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions v-if="blockProducer.user">
                  <v-btn
                    v-if="blockProducer.user.username === localStorage.username"
                    @click="$router.push({name: 'block-producer-edition', params: {identifier: blockProducer.id }})"
                    outlined
                    color="white"
                    block
                    style="background-color: #4d70d5; border: 2px solid #2962FF;"
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
                elevation="10"
                outlined
                style="border-color: #5d80da;"
                >
                <v-img class="mt-2 mb-2"
                  v-if="blockProducer.logoUrl"
                  :src="blockProducer.logoUrl"
                  style="max-width: 50%; border-radius: 50%;"
                ></v-img>
                <v-divider></v-divider>
                <h3 class="mt-3">
                  <span class="headline">
                    <!--{{ blockProducer.name }}-->
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
                  class="pt-1 pl-2 pb-2"
                >
                  <v-icon>location_on</v-icon>
                  {{ blockProducer.location }}
                </v-card-text>
                <v-card-text
                  class="pt-0 pl-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="blockProducer.websiteUrl" style="text-decoration: none; color: black;">
                    {{ blockProducer.websiteUrl }}
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text
                  v-if="blockProducer.twitterUrl"
                  class="pt-4 pl-2 pb-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="blockProducer.twitterUrl" style="text-decoration: none; color: black;">
                    {{ blockProducer.twitterUrl }}
                  </a>
                </v-card-text>
                <v-card-text
                  v-if="blockProducer.githubUrl"
                  class="pt-0 pl-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="blockProducer.githubUrl" style="text-decoration: none; color: black;">
                    {{ blockProducer.githubUrl }}
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions v-if="blockProducer.user">
                  <v-btn
                    v-if="blockProducer.user.username === localStorage.username"
                    @click="$router.push({name: 'block-producer-edition', params: {identifier: blockProducer.id }})"
                    outlined
                    color="white"
                    block
                    style="background-color: #4d70d5; border: 1px solid #304FFE; cursor: pointer;"
                  >
                    Edit a block producer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 md6 lg6>
              <v-card
                class="mx-auto"
                align="center"
                elevation="10"
                outlined
                style="border-color: #5d80da;"
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
                <v-list two-line>
                  <template v-for="(comment, index) in comments">
                    <v-subheader v-if="index === 0">Comments</v-subheader>
                    <v-divider v-else-if="index > 0" :inset="true"></v-divider>
                    <v-list-item v-if="blockProducer.user">
                      <img
                        class="mt-2 mb-2 mr-5 pa-1"
                        style="max-width: 10%; border-radius: 50%; cursor: pointer;"
                        :src="comment.profile_avatar_url"
                        @click="$router.push({name: 'user', params: {username: blockProducer.user.username }})"
                      >
                      <v-list-item-content
                        style="cursor: pointer;"
                        @click="$router.push({name: 'user', params: {username: blockProducer.user.username }})"
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
                align="center"
                elevation="10"
                outlined
                style="border-color: #5d80da;"
              >
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
                  <v-flex xs3 sm3 md3 lg3>
                    <v-btn
                      outlined
                      color="white"
                      block
                      style="background-color: #43A047; border: 1px solid green; cursor: pointer;"
                      @click="createComment">Post</v-btn>
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
  color: transparent
}
</style>
