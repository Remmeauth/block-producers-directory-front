<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm12 md8 lg8 offset-xs offset-sm offset-md2 offset-lg2>
          <v-card class="mt-4 mb-4"
            elevation="10" 
            outlined
            style="border-color: #5d80da;"
          >
            <v-container>
              <v-text-field 
                prepend-icon="search" 
                v-model="searchPhrase" 
                label="Search" 
                append-icon="clear"
              ></v-text-field>
              <v-row>
                <v-col cols="12" xs="8" sm="6" md="6" lg="4" xl="3"
                  v-for="(blockProducer, n) in getBlockProducersToRender()"
                  :key="n"
                  @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})"
                >
                  <v-card 
                    outlined 
                    align="center" 
                    style="height: 300px; border-color: #5d80da; background-color: #EBF5FB; cursor: pointer;"
                  >
                    <v-img class="mt-2 mb-2"
                      v-if="blockProducer.logo_url" 
                      :src="blockProducer.logo_url"
                      style="width: 150px; max-width: 35%; border-radius: 50%;"
                    ></v-img>
                    <v-divider></v-divider>
                    <h3 class="mt-4">
                      <span style="font-size: 1.1em; font-weight: 500; cursor: pointer;">
                        {{ blockProducer.name }}
                      </span>
                    </h3>
                    <v-card-text
                      v-if="blockProducer.user" 
                      class="pt-1 pb-0"
                      @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id}})"
                      style="cursor: pointer;"
                    >
                      <v-form>
                        by <b style="color: #5d80da;"> @{{ blockProducer.user.username }} </b>
                      </v-form>
                    </v-card-text>
                    <v-card-text 
                      class="pt-2 pb-0" 
                      style="cursor: pointer;"
                      >
                      {{ blockProducer.short_description }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="searchPhrase && Array.isArray(searchedBlockProducers) && !searchedBlockProducers.length">
                <v-flex xs12 sm12 md12 lg12 xl12 style="text-align:center;">
                  <v-alert>:( Sorry, no results were found for this request.</v-alert>
                </v-flex>
              </v-row>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Error500 from '../../components/ui/Error500'
import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'
import { commentStorageActions, commentStorageMutations } from '../../store/modules/comment'
import { likeStorageActions, likeStorageMutations } from '../../store/modules/like'

export default {
  name: 'IndexPage',
  components: {
    Error500,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      blockProducers: null,
      commentsNumbers: null,
      likesNumbers: null,
      searchedBlockProducers: null,
      searchPhrase: null,
      getBlockProducersToRender: function() {
        if (this.searchPhrase) {
          return this.searchedBlockProducers
        }

        return this.blockProducers
      },
      getBlockProducerCommentsNumber: function(blockProducerIdentifier) {
        var commentsNumber = 0

        this.commentsNumbers.forEach(function(commentNumber) {
          if (commentNumber.block_producer_id === blockProducerIdentifier) {
            commentsNumber = commentNumber.comments
          }
        });

        return commentsNumber
      },
      getBlockProducerLikesNumber: function(blockProducerIdentifier) {
        var likesNumber = 0

        this.likesNumbers.forEach(function(likeNumber) {
          if (likeNumber.block_producer_id === blockProducerIdentifier) {
            likesNumber = likeNumber.likes
          }
        });

        return likesNumber
      }
    }
  },
  watch: {
    searchPhrase: function (searchPhrase) {
      this.$store.dispatch(blockProducerStorageActions.searchBlockProducers, {
        phrase: this.searchPhrase = searchPhrase,
      })
    }
  },
  mounted() {
    this.$store.dispatch(commentStorageActions.getCommentsNumbers)
    this.$store.dispatch(likeStorageActions.getLikesNumbers)
    this.$store.dispatch(blockProducerStorageActions.getBlockProducers)

    const unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === blockProducerStorageMutations.subscribe.addError) {
        this.error = state.blockProducer.error
        unsubscribe()
      }

      if (mutation.type === commentStorageMutations.subscribe.addError) {
        this.error = state.comment.error
        unsubscribe()
      }

      if (mutation.type === likeStorageMutations.subscribe.addError) {
        this.error = state.like.error
        unsubscribe()
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.addBlockProducers) {
        this.blockProducers = state.blockProducer.blockProducers
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.searchBlockProducers) {
        this.searchedBlockProducers = state.blockProducer.searchedBlockProducers
      }

      if (mutation.type === commentStorageMutations.subscribe.addCommentsNumbers) {
        this.commentsNumbers = state.comment.commentsNumbers
      }

      if (mutation.type === likeStorageMutations.subscribe.addLikesNumbers) {
        this.likesNumbers = state.like.likesNumbers
      }
    });
  },
}
</script>

<style>
.v-card {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.custom-btn::before {
  color: transparent;
}
</style>
