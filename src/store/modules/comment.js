import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const commentStorageMutations = {
  subscribe: {
    addError: 'comment/addError',
    addFieldsErrors: 'comment/addFieldsErrors',
    addComments: 'comment/addComments',
    addCommentsNumbers: 'comment/addCommentsNumbers',
    createComment: 'comment/createComment',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    addComments: 'addComments',
    addCommentsNumbers: 'addCommentsNumbers',
    createComment: 'createComment',
  },
}

export const commentStorageActions = {
  getComments: 'comment/get',
  getCommentsNumbers: 'comment/getNumbers',
  createComment: 'comment/create',
}


export const comment = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    comments: null,
    commentsNumber: null,
    commentsNumbers: null,
    isCreated: null,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addFieldsErrors (state, errors) {
      state.fieldsErrors = errors
    },
    addComments (state, comments) {
      state.comments = comments
      state.commentsNumber = comments.length
    },
    addCommentsNumbers (state, commentsNumbers) {
      state.commentsNumbers = commentsNumbers
    },
    createComment (state, isCreated) {
      state.isCreated = isCreated
    },
  },
  actions: {
    get({ commit }, { blockProducerIdentifier }) {
      axios
        .get(`https://bps-directory-back-staging.herokuapp.com/block-producers/${blockProducerIdentifier}/comments/`)
        .then(response => {
          commit(commentStorageMutations.commit.addComments, response.data.result)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(commentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.NOT_FOUND) {
            commit(commentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }

          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(commentStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    create({ commit }, { jwtToken, blockProducerIdentifier, text }) {
      axios
        .put(`https://bps-directory-back-staging.herokuapp.com/block-producers/${blockProducerIdentifier}/comments/`, {
          text: text,
        }, {
          headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          commit(commentStorageMutations.commit.createComment, true)
        })
        .catch(error => {
          console.log(error)
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(commentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
  
          if (error.response.status === HttpStatus.NOT_FOUND) {
            commit(commentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
  
          if (error.response.status === HttpStatus.BAD_REQUEST) {
            commit(commentStorageMutations.commit.addFieldsErrors, {
              errors: error.response.data.errors,
              statusCode: error.response.status
            })
          }
        })
    },
    getNumbers({ commit }) {
      axios
        .get(`https://bps-directory-back-staging.herokuapp.com/block-producers/comments/numbers/`)
        .then(response => {
          commit(commentStorageMutations.commit.addCommentsNumbers, response.data.result)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(commentStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
  }
}

export default comment
