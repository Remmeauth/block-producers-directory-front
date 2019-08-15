<template>
  <div>
    <BlockProducers />
      {{ error.message }}
      {{ error.statusCode }}

        <form>
        <v-container grid-list-xl fluid>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="searchPhrase" label="phrase" solo required ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </form>

      {{ searchedBlockProducers }} <br><br>

      {{ blockProducers }} <br><br>

      {{ likesNumbers }} <br><br>

      {{ commentsNumbers }}

    </div>
</template>

<script>
import store from '../../store/index'
import BlockProducers from '../common/BlockProducers'
import {
  INDEX_PAGE_ADD_BLOCK_PRODUCERS_MUTATION,
  INDEX_PAGE_ADD_ERROR_MUTATION
} from '../../store/modules/indexPage'

import { blockProducerStorageActions, blockProducerStorageMutations } from '../../store/modules/blockProducer'
import { commentStorageActions, commentStorageMutations } from '../../store/modules/comment'
import { likeStorageActions, likeStorageMutations } from '../../store/modules/like'

export default {
  name: 'IndexPage',
  components: {
    BlockProducers
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

    store.subscribe((mutation, state) => {
      if (mutation.type === INDEX_PAGE_ADD_ERROR_MUTATION) {
        this.error = state.indexPage.error
      }

      if (mutation.type === INDEX_PAGE_ADD_BLOCK_PRODUCERS_MUTATION) {
        this.blockProducers = state.indexPage.blockProducers
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.addError) {
        this.error = state.blockProducer.error
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.searchBlockProducers) {
        this.searchedBlockProducers = state.blockProducer.searchedBlockProducers
      }

      if (mutation.type === commentStorageMutations.subscribe.addError) {
        this.error = state.comment.error
      }

      if (mutation.type === commentStorageMutations.subscribe.addCommentsNumbers) {
        this.commentsNumbers = state.comment.commentsNumbers
      }

      if (mutation.type === likeStorageMutations.subscribe.addError) {
        this.error = state.like.error
      }

      if (mutation.type === likeStorageMutations.subscribe.addLikesNumbers) {
        this.likesNumbers = state.like.likesNumbers
      }
    });
  },
}
</script>

<style></style>
