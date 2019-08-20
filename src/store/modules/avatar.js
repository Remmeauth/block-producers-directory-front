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
  uploadAvatar: 'avatar/upload',
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
    upload({ commit }, { jwtToken, username, file }) {
      let formData = new FormData();
      formData.append('file', file);

      axios
        .put(`https://bps-directory-back-staging.herokuapp.com/users/${username}/avatars/`, formData, {
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
