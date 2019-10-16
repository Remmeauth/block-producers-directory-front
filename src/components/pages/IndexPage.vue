<template>
  <div v-if="blockProducerError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-container fluid style="background-color: #f2f2fa;">
      <v-layout row wrap>
        <v-flex xs12 sm12 md8 lg8 offset-xs offset-sm offset-md2 offset-lg2>
          <v-card 
            class="ma-1"
            outlined
            elevation="1"
            style="border: 1px solid #e7e7f3;"
          >
            <v-container class="pt-0">
              <v-text-field 
                prepend-inner-icon="search"
                v-model="searchPhrase" 
                label="Search"
                color="#364fcc"
                clearable
              ></v-text-field>
              <v-row v-if="getBlockProducersToRender().length === 0 && !searchPhrase">
                <v-flex xs12 sm12 md12 lg12 xl12 style="text-align: center;">
                  <v-alert class="description">
                    :( Block producers not found.
                  </v-alert>
                </v-flex>
              </v-row>
              <v-row
                v-else-if="searchPhrase && Array.isArray(searchedBlockProducers) && !searchedBlockProducers.length"
              >
                <v-flex xs12 sm12 md12 lg12 xl12 style="text-align: center;">
                  <v-alert class="description">
                    :( Sorry, no block producers were found for this request.
                  </v-alert>
                </v-flex>
              </v-row>
              <v-row v-else>
                <v-col cols="12" xs="8" sm="6" md="6" lg="4" xl="3"
                  v-for="(blockProducer, n) in getBlockProducersToRender()"
                  :key="n"
                >
                  <v-card
                    v-if="blockProducer"
                    outlined
                    elevation="3"
                    align="center"
                    style="height: 345px; cursor: pointer; border: 1px solid #e7e7f3;"
                    :ripple="false"
                  >
                    <div></div>
                    <v-img class="mt-4 mb-2 all-bp"
                      v-if="blockProducer.logo_url" 
                      :src="blockProducer.logo_url + `?${Math.random()}`"
                      @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})"
                    ></v-img>
                    <v-divider></v-divider>
                    <v-card-text
                      class="layout justify-center pb-0"
                      @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})"
                    >
                      <h5 class="bp-info">
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
                    <v-card-text 
                      class="pt-1 pb-0 description"
                      color="#8e8ea8"
                      @click="$router.push({name: 'block-producer', params: {identifier: blockProducer.id }})"
                    >
                      {{ blockProducer.short_description }}
                    </v-card-text>
                  </v-card>
                </v-col>
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
.custom-btn::before {
  color: transparent;
}

.all-bp {
  display: inline-block;
  max-width: 140px;
  height: 140px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.v-card__text {
  color: #343747 !important;
}
</style>
