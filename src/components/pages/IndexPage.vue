<template>
  <div v-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <form>
      <v-container grid-list-xl fluid>
        <v-layout wrap align-center>
          <v-flex xs12 sm8 md8 xl8 offset-xs1 offset-sm2 offset-md2>
            <v-row no-gutters>
              <v-col cols="9" xs="12" sm="12" md="12">
                <v-card class="pa-2">
                  <v-container grid-list-xl fluid>
                    <v-text-field 
                      prepend-icon="search" 
                      v-model="searchPhrase" 
                      label="Search" 
                      append-icon="clear"
                    ></v-text-field>
                    <v-row>
                      <v-col
                        v-for="(blockProducer, n) in getBlockProducersToRender()"
                        :key="n"
                        class="d-flex child-flex"
                        :lg="4"
                        :md="6"
                        :sm="12"
                        :xs="12"
                        @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})"
                      >
                        <v-card outlined tile class="justify-center" style="text-align:center; border-color:#5d80da;">
                          <v-img
                            src="https://assets.website-files.com/5c9cd8c8d88d003bb6f2f7c6/5caf8a2c585c219feb2b8e0a_remme-protocol-monthly-update-thumb.png"
                            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0)"
                          >
                          </v-img>
                          <v-card-title class="justify-center">
                            <v-btn 
                              class="custom-btn text-capitalize"
                              :ripple="false" 
                              text
                            >
                              <b>{{blockProducer.name}}</b>
                            </v-btn>
                          </v-card-title>
                          <v-spacer></v-spacer>
                          <v-btn text class="custom-btn text-capitalize" :ripple="false" style="cursor:auto;">
                            <v-icon color="deep-purple">location_on</v-icon>
                            <span>{{ blockProducer.location }}</span>
                          </v-btn>
                          <br>
                          <br>
                          <v-bottom-navigation horizontal style="box-shadow:none;"
                          >
                            <v-btn text class="custom-btn" :ripple="false">
                              <span>{{ getBlockProducerCommentsNumber(blockProducer.id) }} comments</span>
                              <v-icon color="deep-purple">comment</v-icon>
                            </v-btn>
                            <v-btn text class="custom-btn" :ripple="false">
                              <span>{{ getBlockProducerLikesNumber(blockProducer.id) }} likes</span>
                              <v-icon color="deep-purple">favorite</v-icon>
                            </v-btn>
                          </v-bottom-navigation>
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
              </v-col>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </div>
</template>

<script>
import Error500 from '../../components/ui/Error500'
import store from '../../store/index'
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
      store.dispatch(blockProducerStorageActions.searchBlockProducers, {
        phrase: this.searchPhrase = searchPhrase,
      })
    }
  },
  mounted() {
    store.dispatch(commentStorageActions.getCommentsNumbers)
    store.dispatch(likeStorageActions.getLikesNumbers)
    store.dispatch(blockProducerStorageActions.getBlockProducers)

    const unsubscribe = store.subscribe((mutation, state) => {
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
