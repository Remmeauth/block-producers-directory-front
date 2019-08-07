<template>
  <div>
    <BlockProducers />
      {{ error.message }}
      {{ error.statusCode }}

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
      blockProducers: null
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
    });
  },
}
</script>

<style></style>
