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

      {{ searchedBlockProducers }}

      <br><br>

      {{ blockProducers }}

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
    });
  },
}
</script>

<style></style>
