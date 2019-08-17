<template>
  <div v-if="error.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <br>
    <v-layout row wrap>
      <v-flex lg10 offset-lg1>
        <v-spacer></v-spacer>
        <v-layout row wrap>
          <v-flex lg4 offset-lg1>
            <v-flex lg12>
              <v-card
                max-width="344"
                class="mx-auto"
                >
                <v-img
                  src="https://block-producers-directory.s3-us-west-2.amazonaws.com/bps/logos/default-block-producer-logotype.png"
                  height="194"
                  ></v-img>
                <v-card-title class="align-start">
                  <div>
                    <span class="headline">{{ blockProducer.name }}</span>
                  </div>
                </v-card-title>
                <v-card-text>
                  {{ blockProducer.shortDescription }}
                </v-card-text>
                <v-bottom-navigation
                  color="deep-purple"
                  horizontal
                  style="box-shadow: none"
                  >
                  <v-btn disabled>
                    <span>{{ commentsNumber }} comments</span>
                    <v-icon>comment</v-icon>
                  </v-btn>
                  <v-btn class="custom-btn" v-if="isLikedByUser" @click="like">
                    <span>{{ likesNumber }} likes</span>
                    <v-icon>favorite</v-icon>
                  </v-btn>
                  <v-btn class="custom-btn" v-else @click="like">
                    <span>{{ likesNumber }} likes</span>
                    <v-icon>favorite_border</v-icon>
                  </v-btn>
                </v-bottom-navigation>
              </v-card>
            </v-flex>
            <br>
            <v-flex lg 12>
              <v-card max-width="344" class="mx-auto">
                <v-list disabled>
                  <v-list-item-group color="primary">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>link</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title><a v-bind:href="blockProducer.websiteUrl">{{ blockProducer.websiteUrl }}</a></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>location_on</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ blockProducer.location }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-flex>
            <br>
          </v-flex>
          <v-flex lg6>
            <v-card
              class="mx-auto overflow-hidden"
              >
              <v-divider></v-divider>
              <br>
              <div class="pa-4 pt-0 caption">
                <p style="text-align: justify;" v-html="blockProducer.fullDescription"></p>
              </div>
            </v-card>
            <br>
            <v-card>
              <v-list two-line>
                <template v-for="(comment, index) in comments">
                  <v-subheader v-if="index === 0">Comments</v-subheader>
                  <v-divider v-else-if="index > 0" :inset="true"></v-divider>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img src="https://block-producers-directory.s3-us-west-2.amazonaws.com/user/avatars/default-user-logotype.png">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ comment.user.username }} {{ new Date(comment.created_at * 1000).toLocaleDateString("en-US", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }}</v-list-item-title>
                      <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
            <br>
            <v-flex lg12>
              <h2>Leave a comment</h2>
              <br>
              <form>
                <v-textarea
                  v-model="comment"
                  solo
                  required
                  ></v-textarea>
                <v-btn @click="createComment">Send</v-btn>
              </form>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Error404 from '../../components/ui/Error404'
import Error500 from '../../components/ui/Error500'
import store from '../../store/index'

import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'
import { commentStorageActions, commentStorageMutations } from '../../store/modules/comment'
import { likeStorageActions, likeStorageMutations } from '../../store/modules/like'

export default {
  name: 'BlockProducerPage',
  components: {
    Error404,
    Error500,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      blockProducer: {
        name: null,
        location: null,
        shortDescription: null,
        fullDescription: null,
        logoUrl: null,
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
        user: null,
        id: null,
      },
      comment: null,
      comments: null,
      commentsNumber: null,
      successMessage: null,
      blockProducerLikes: null,
      likesNumber: null,
      isLikedByUser: false,
    }
  },
  methods: {
    createComment () {
      store.dispatch(commentStorageActions.createComment, {
        jwtToken: this.localStorage.token,
        blockProducerIdentifier: this.$route.params.identifier,
        text: this.comment,
      })

    this.comments.unshift({
      user: {
        username: this.localStorage.username,
      },
      text: this.comment,
      created_at: (+ new Date() / 1000),
    })

    this.comment = ''
    },
    like () {
      this.isLikedByUser = !this.isLikedByUser
      if (this.isLikedByUser) { this.likesNumber++ } else { this.likesNumber-- }

      store.dispatch(likeStorageActions.putLike, {
        jwtToken: this.localStorage.token,
        blockProducerIdentifier: this.$route.params.identifier
      })

      store.subscribe((mutation, state) => {
        if (mutation.type === likeStorageMutations.subscribe.addError) {
          this.error = state.like.error
        }

        if (mutation.type === likeStorageMutations.subscribe.putLike) {}
      });
    },
  },
  mounted() {
    store.dispatch(blockProducerStorageActions.getBlockProducer, {
      identifier: this.$route.params.identifier,
    })

    store.dispatch(commentStorageActions.getComments, {
      blockProducerIdentifier: this.$route.params.identifier,
    })

    store.dispatch(likeStorageActions.getLikes, {
      blockProducerIdentifier: this.$route.params.identifier,
    })

    store.dispatch(likeStorageActions.isLikedByUser, {
      username: this.localStorage.username,
      blockProducerIdentifier: this.$route.params.identifier,
    })

    const unsubscribe = store.subscribe((mutation, state) => {

      if (mutation.type === blockProducerStorageMutations.subscribe.addError) {
        this.error = state.blockProducer.error
        unsubscribe()
      }

      if (mutation.type === likeStorageMutations.subscribe.addLikes) {
        this.blockProducerLikes = state.like.likes
        this.likesNumber = state.like.likesNumber
      }

      if (mutation.type === likeStorageMutations.subscribe.markAsIsLikedByUser) {
        this.isLikedByUser = state.like.isLikedByUser
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.getBlockProducer) {
        this.blockProducer.user = state.blockProducer.user
        this.blockProducer.name = state.blockProducer.name
        this.blockProducer.location = state.blockProducer.location
        this.blockProducer.shortDescription = state.blockProducer.shortDescription
        this.blockProducer.fullDescription = state.blockProducer.fullDescription
        this.blockProducer.logoUrl = state.blockProducer.logoUrl
        this.blockProducer.facebookUrl = state.blockProducer.facebookUrl
        this.blockProducer.githubUrl = state.blockProducer.githubUrl
        this.blockProducer.linkedInUrl = state.blockProducer.linkedInUrl
        this.blockProducer.redditUrl = state.blockProducer.redditUrl
        this.blockProducer.mediumUrl = state.blockProducer.mediumUrl
        this.blockProducer.steemitUrl = state.blockProducer.steemitUrl
        this.blockProducer.telegramUrl = state.blockProducer.telegramUrl
        this.blockProducer.slackUrl = state.blockProducer.slackUrl
        this.blockProducer.twitterUrl = state.blockProducer.twitterUrl
        this.blockProducer.websiteUrl = state.blockProducer.websiteUrl
        this.blockProducer.wikipediaUrl = state.blockProducer.wikipediaUrl
      }

      if (mutation.type === commentStorageMutations.subscribe.addError) {
        this.error = state.comment.error
      }

      if (mutation.type === commentStorageMutations.subscribe.fieldsErrors) {
        this.fieldsErrors = state.comment.fieldsErrors
      }

      if (mutation.type === commentStorageMutations.subscribe.createComment) {
        this.successMessage = 'Comment created successfully — view your block producer.'
      }
      
      if (mutation.type === commentStorageMutations.subscribe.addComments) {
        this.comments = state.comment.comments
        this.commentsNumber = state.comment.commentsNumber
      }
    });
  }
}
</script>

<style>
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgba(0, 0, 0, 0.0) !important;
}

  .custom-btn::before {
    color: transparent
}

</style>
