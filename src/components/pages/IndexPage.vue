<template>
  <div v-if="blockProducerError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-container fluid class="pt-0">
      <v-layout row wrap>
        <v-flex xs12 sm12 md8 lg8 offset-xs offset-sm offset-md2 offset-lg2>
          <v-card 
            class="mb-4"
            outlined
          >
            <v-container>
              <v-text-field 
                prepend-icon="search" 
                v-model="searchPhrase" 
                label="Search" 
                clearable
              ></v-text-field>
              <v-row>
                <v-col cols="12" xs="8" sm="6" md="6" lg="4" xl="3"
                  v-for="(blockProducer, n) in getBlockProducersToRender()"
                  :key="n"
                >
                  <v-card 
                    outlined 
                    align="center" 
                    style="height: 300px; cursor: pointer;"
                    :ripple="false"
                  >
                    <v-img class="mt-2 mb-2"
                      v-if="blockProducer.logo_url" 
                      :src="blockProducer.logo_url + `?${Math.random()}`"
                      style="max-width: 35%; border-radius: 50%;"
                      @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})"
                    ></v-img>
                    <v-divider></v-divider>
                    <h3 class="mt-4" @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})">
                      <span style="font-size: 1.1em; font-weight: 500;">
                        {{ blockProducer.name }}
                      </span>
                    </h3>
                    <v-card-text
                      v-if="blockProducer.user" 
                      class="pt-1 pb-0"
                      @click="$router.push({name: 'user', params: {username: blockProducer.user.username}})"
                    >
                      <v-form>
                        by <b style="color: #5d80da;"> @{{ blockProducer.user.username }} </b>
                      </v-form>
                    </v-card-text>
                    <v-card-text 
                      class="pt-2 pb-0" @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})"
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
import { mapGetters } from 'vuex'

import Error500 from '../../components/ui/Error500'
import { blockProducerStorageActions } from '../../store/modules/blockProducer'

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
      commentsNumbers: null,
      likesNumbers: null,
      searchPhrase: null,
      getBlockProducersToRender: function() {
        if (this.searchPhrase) {
          return this.searchedBlockProducers.filter(
            blockProducer => { if (blockProducer.status === 'active') return blockProducer}
          );
        }

        const filteredBlockProducers = this.blockProducers.filter(
          blockProducer => { if (blockProducer.status === 'active') return blockProducer}
        );

        return filteredBlockProducers
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
  computed: {
    ...mapGetters('blockProducer', ['blockProducers', 'searchedBlockProducers', 'blockProducerError'])
  },
  watch: {
    searchPhrase: function (searchPhrase) {
      this.$store.dispatch(blockProducerStorageActions.searchBlockProducers, {
        phrase: this.searchPhrase = searchPhrase,
      })
    }
  },
  mounted() {
    this.$store.dispatch(blockProducerStorageActions.getBlockProducers)
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
