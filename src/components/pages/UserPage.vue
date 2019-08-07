<template>
  <div>
    <User :username="$route.params.username" />
      {{ error.message }}
      {{ error.statusCode }}

      {{ user.email }}
      {{ user.username }}

      {{ profile.firstName }}
      {{ profile.lastName }}
      {{ profile.additionalInformation }}
      {{ profile.avatarUrl }}
      {{ profile.facebookUrl }}
      {{ profile.githubUrl }}
      {{ profile.linkedInUrl }}
      {{ profile.location }}
      {{ profile.mediumUrl }}
      {{ profile.steemitUrl }}
      {{ profile.telegramUrl }}
      {{ profile.tweeterUrl }}
    </div>
</template>

<script>
import store from '../../store/index'
import User from '../common/User'
import {
  USER_PAGE_ADD_ERROR_MUTATION,
  USER_PAGE_ADD_PROFILE_MUTATION,
  USER_PAGE_ADD_USER_MUTATION
} from '../../store/modules/userPage'

export default {
  name: 'UserPage',
  components: {
    User
  },
  data() {
    return {
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
    }
  },
  mounted() {
    store.subscribe((mutation, state) => {
      if (mutation.type === USER_PAGE_ADD_ERROR_MUTATION) {
        this.error = state.userPage.error
      }

      if (mutation.type === USER_PAGE_ADD_USER_MUTATION) {
        this.user = state.userPage.user
      }

      if (mutation.type === USER_PAGE_ADD_PROFILE_MUTATION) {
        this.profile = state.userPage.profile
      }
    });
  },
}
</script>

<style></style>
