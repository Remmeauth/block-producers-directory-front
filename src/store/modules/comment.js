import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const commentStorageMutations = {
  subscribe: {
    addError: 'comment/addError',
    addFieldsErrors: 'comment/addFieldsErrors',
    addComments: 'comment/addComments',
    createComment: 'comment/createComment',
  },
  commit: {
    addError: 'addError',
    addFieldsErrors: 'addFieldsErrors',
    addComments: 'addComments',
    createComment: 'createComment',
  },
}

export const commentStorageActions = {
  getComments: 'comment/get',
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
    createComment (state, isCreated) {
      state.isCreated = isCreated
    },
  },
  actions: {
    get({ commit }, { identifier }) {
      axios
        .get(`https://bps-directory-back-staging.herokuapp.com/block-producers/${identifier}/comments/`)
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
    create({ commit }, { identifier, text }) {
      axios
        .put(`https://bps-directory-back-staging.herokuapp.com/block-producers/${identifier}/comments/`, {
          text: text,
        }, {
          headers: {
            'Authorization': `JWT ${window.localStorage.token.slice(1, -1)}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          commit(commentStorageMutations.commit.createComment, true)
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
  }
}

export default comment
