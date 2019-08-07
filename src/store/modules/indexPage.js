export const INDEX_PAGE_ADD_BLOCK_PRODUCERS_MUTATION = 'indexPage/addBlockProducers'
export const INDEX_PAGE_ADD_ERROR_MUTATION = 'indexPage/addError'

export const indexPage = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    blockProducers: null
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addBlockProducers (state, blockProducers) {
      state.blockProducers = blockProducers
    },
  }
}

export default indexPage
