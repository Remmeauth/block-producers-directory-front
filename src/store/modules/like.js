import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const likeStorageMutations = {
  subscribe: {
    addError: 'like/addError',
    markAsLiked: 'like/markAsLiked',
    addLikes: 'like/addLikes',
    addLikesNumbers: 'like/addLikesNumbers',
    markAsIsLikedByUser: 'like/markAsIsLikedByUser',
  },
  commit: {
    addError: 'addError',
    markAsLiked: 'markAsLiked',
    addLikes: 'addLikes',
    addLikesNumbers: 'addLikesNumbers',
    markAsIsLikedByUser: 'markAsIsLikedByUser',
  },
}

export const likeStorageActions = {
  putLike: 'like/put',
  getLikes: 'like/getAll',
  getLikesNumbers: 'like/getNumbers',
  isLikedByUser: 'like/isLikedByUser',
}

export const like = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    isLiked: false,
    likesNumber: null,
    likesNumbers: null,
    likes: [],
    isLikedByUser: false,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    markAsLiked (state) {
      state.isLiked = true
    },
    addLikes (state, { likes }) {
      state.likes = likes
      state.likesNumber = likes.length
    },
    addLikesNumbers (state, likesNumbers) {
      state.likesNumbers = likesNumbers
    },
    markAsIsLikedByUser (state, IsLikedByUser) {
      state.isLikedByUser = IsLikedByUser
    },
  },
  actions: {
    put({ commit }, { jwtToken, blockProducerIdentifier }) {
      axios
        .put(process.env.VUE_APP_BACK_END_URL + `/block-producers/${blockProducerIdentifier}/likes/`, {}, {
            headers: {
                'Authorization': `JWT ${jwtToken}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
          commit(likeStorageMutations.commit.markAsLiked)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(likeStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
    getAll({ commit }, { blockProducerIdentifier }) {
      axios
      .get(process.env.VUE_APP_BACK_END_URL + `/block-producers/${blockProducerIdentifier}/likes/`)
      .then(response => {
        commit(likeStorageMutations.commit.addLikes, {
          likes: response.data.result,
        })
      })
      .catch(error => {
        if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          commit(likeStorageMutations.commit.addError, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }
      })
    },
    isLikedByUser({ commit }, { blockProducerIdentifier, username }) {
      axios
      .get(process.env.VUE_APP_BACK_END_URL + `/block-producers/${blockProducerIdentifier}/likes/`)
      .then(response => {
        if (!response.data.result) {
          commit(likeStorageMutations.commit.markAsIsLikedByUser, false)
        }

        response.data.result.forEach(function (like) {
          if (username === like.user.username) {
            commit(likeStorageMutations.commit.markAsIsLikedByUser, true)
          }
        });
      })
      .catch(error => {
        if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          commit(likeStorageMutations.commit.addError, {
            message: error.response.data.error,
            statusCode: error.response.status
          })
        }
      })
    },
    getNumbers({ commit }) {
      axios
        .get(process.env.VUE_APP_BACK_END_URL + '/block-producers/likes/numbers/')
        .then(response => {
          commit(likeStorageMutations.commit.addLikesNumbers, response.data.result)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(likeStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
  }
}

export default like
