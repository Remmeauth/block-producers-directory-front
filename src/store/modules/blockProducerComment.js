import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const blockProducerCommentStorageMutations = {
  subscribe: {
    addError: 'blockProducerComment/addError',
    addFieldsErrors: 'blockProducerComment/addFieldsErrors',
    addComments: 'blockProducerComment/addComments',
    commentIsCreated: 'blockProducerComment/commentIsCreated',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    addComments: 'addComments',
    commentIsCreated: 'commentIsCreated',
  },
}

export const blockProducerCommentStorageActions = {
  getComments: 'blockProducerComment/getAll',
  createComment: 'blockProducerComment/create',
}

export const blockProducerComment = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    fieldsErrors: {
      errors: null,
      statusCode: null,
    },
    events: {
      isCreated: false,
    },
    entities: null,
  },
  getters: {
    blockProducerCommentError: state => state.error,
    blockProducerCommentFieldsErrors: state => state.fieldsErrors,
    comments: state => state.entities,
    commentIsCreated: state => state.events.isCreated,
  },
  mutations: {
    addError: (state, error) => state.error = error,
    addFieldsErrors: (state, errors) => state.fieldsErrors = errors,
    addComments: (state, { comments }) => state.entities = comments,
    commentIsCreated: (state) => state.events.isCreated = true,
  },
  actions: {
    getAll({ commit }, { blockProducerIdentifier }) {
      axios
        .get(process.env.VUE_APP_BACK_END_URL + `/block-producers/${blockProducerIdentifier}/comments`)
        .then(response => {
          commit(blockProducerCommentStorageMutations.commit.addComments, {
            comments: response.data.result,
          })
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerCommentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.NOT_FOUND) {
            commit(blockProducerCommentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(blockProducerCommentStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    create({ commit }, { jwtToken, blockProducerIdentifier, text }) {
      axios
        .put(process.env.VUE_APP_BACK_END_URL + `/block-producers/${blockProducerIdentifier}/comments/`, {
          text: text,
        }, {
          headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          commit(blockProducerCommentStorageMutations.commit.commentIsCreated)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(blockProducerCommentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
  
          if (error.response.status === HttpStatus.NOT_FOUND) {
            commit(blockProducerCommentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
  
          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(blockProducerCommentStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
  }
}

export default blockProducerComment
