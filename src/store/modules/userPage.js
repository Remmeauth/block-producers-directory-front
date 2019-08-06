export const USER_PAGE_ADD_ERROR_MUTATION = 'userPage/addError'
export const USER_PAGE_ADD_PROFILE_MUTATION = 'userPage/addProfile'
export const USER_PAGE_ADD_USER_MUTATION = 'userPage/addUser'

export const userPage = {
  namespaced: true,
  state: {
    error: {
      message: null,
      statusCode: null,
    },
    user: {
      email: null,
      username: null,
    },
    profile: {
      firstName: null,
      lastName: null,
      additionalInformation: null,
      avatarUrl: null,
      facebookUrl: null,
      githubUrl: null,
      linkedInUrl: null,
      location: null,
      mediumUrl: null,
      steemitUrl: null,
      telegramUrl: null,
      tweeterUrl: null,
    }
  },
  mutations: {
    addError (state, error) {
      state.error = error
    },
    addUser (state, user) {
      state.user = user
    },
    addProfile (state, profile) {
      state.profile = profile
    },
  }
}

export default userPage
