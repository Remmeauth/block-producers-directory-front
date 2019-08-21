import axios from 'axios'
import HttpStatus from 'http-status-codes'

export const avatarStorageMutations = {
  subscribe: {
    addError: 'avatar/addError',
    markAvatarAsUploaded: 'avatar/markAvatarAsUploaded',
  },
  commit: {
    addError: 'addError',
    markAvatarAsUploaded: 'markAvatarAsUploaded',
  },
}

export const avatarStorageActions = {
  uploadUserAvatarForUser: 'avatar/uploadForUser',
  uploadBlockProducerAvatar: 'avatar/uploadForBlockProducer',
}


export const avatar = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    isUploaded: null,
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    markAvatarAsUploaded (state) {
      state.isUploaded = true
    },
  },
  actions: {
    uploadForUser({ commit }, { jwtToken, username, file }) {
      let formData = new FormData();
      formData.append('file', file);

      axios
        .put(process.env.VUE_APP_BACK_END_URL + `/users/${username}/avatars/`, formData, {
          headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          commit(avatarStorageMutations.commit.markAvatarAsUploaded)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(avatarStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    },
    uploadForBlockProducer({ commit }, { jwtToken, identifier, file }) {
      let formData = new FormData();
      formData.append('file', file);

      axios
        .put(process.env.VUE_APP_BACK_END_URL + `/block-producers/${identifier}/avatars/`, formData, {
          headers: {
            'Authorization': `JWT ${jwtToken}`,
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
          commit(avatarStorageMutations.commit.markAvatarAsUploaded)
        })
        .catch(error => {
          if (error.response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            commit(avatarStorageMutations.commit.addError, {
              message: error.response.data.error,
              statusCode: error.response.status
            })
          }
        })
    }
  }
}

export default avatar
