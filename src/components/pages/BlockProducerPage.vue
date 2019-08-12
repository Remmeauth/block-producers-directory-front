<template>
  <div>
    {{ error.message }}
    {{ error.statusCode }}

    {{ blockProducer }} <br><br>

    <form>
      <v-container grid-list-xl fluid>
        <v-layout row>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="text" label="Write a comment.." solo required ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-btn @click="create">Add comment</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </form>

    {{ successMessage }} <br><br>
    {{ comments }} <br><br>
    {{ 'comments number: ' + commentsNumber }} <br><br>

    <v-btn @click="like">Like or unlike</v-btn>

    {{ isLikedByUser }}
    {{ likesNumber }}
    {{ blockProducerLikes }}
  </div>
</template>

<script>
import store from '../../store/index'

import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'
import { commentStorageActions, commentStorageMutations } from '../../store/modules/comment'
import { likeStorageActions, likeStorageMutations } from '../../store/modules/like'

export default {
  name: 'BlockProducerPage',
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
      comments: null,
      commentsNumber: null,
      successMessage: null,
      text: null,
      blockProducerLikes: null,
      likesNumber: null,
      isLikedByUser: false,
    }
  },
  methods: {
    create () {
      store.dispatch(commentStorageActions.createComment, {
        blockProducerIdentifier: this.$route.params.identifier,
        text: this.text,
      })
    },
    like () {
      store.dispatch(likeStorageActions.putLike, {
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
      username: window.localStorage.username,
      blockProducerIdentifier: this.$route.params.identifier,
    })

    store.subscribe((mutation, state) => {
      if (mutation.type === blockProducerStorageMutations.subscribe.addError) {
        this.error = state.blockProducer.error
      }

      if (mutation.type === likeStorageMutations.subscribe.addLikes) {
        this.blockProducerLikes = state.like.likes
        this.likesNumber = state.like.likesNumber
      }

      if (mutation.type === likeStorageMutations.subscribe.markAsIsLikedByUser) {
        this.isLikedByUser = state.like.isLikedByUser
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.getBlockProducer) {
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

<style></style>
