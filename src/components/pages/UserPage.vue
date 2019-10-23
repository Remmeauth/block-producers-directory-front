<template>
  <div v-if="profileError.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="profileError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout row wrap>
      <v-flex xs12 sm10 md10 lg10 xl10 offset-xs offset-sm1 offset-md1 offset-lg1 offset-xl1>
        <v-container fluid grid-list-xl>
          <v-layout row wrap>
            <v-flex xs12 sm8 md4 lg4 xl3 offset-sm2 offset-md1 offset-lg1 offset-xl2 class="pb-0">
              <v-card
                class="mx-auto mt-1 mb-4"
                align="center"
                outlined
                elevation="1"
                style="border: 1px solid #e7e7f3;"
                >
                <div></div>
                <v-img class="mt-4 mb-2 user"
                  v-if="profile.avatarUrl" 
                  :src="profile.avatarUrl + `?${Math.random()}`"
                ></v-img>
                <v-divider></v-divider>
                <v-card-text class="layout justify-center pt-2 pb-0">
                  <h5 class="bp-info pl-2">
                    <span>
                       {{ profile.firstName }} {{ profile.lastName }}
                    </span>
                  </h5>
                </v-card-text>
                <v-card-text
                  v-if="profile.firstName || profile.location || profile.websiteUrl"
                  class="pt-0 pb-0"
                >
                  <v-form class="description">
                    <b style="color: #364fcc; cursor: pointer;"> @{{ user.username }} </b>
                  </v-form>
                </v-card-text>
                <v-card-text
                  v-if="!profile.firstName && !profile.location && !profile.websiteUrl"
                  class="pt-1 pb-2"
                >
                  <v-form class="description">
                    <b style="color: #364fcc; cursor: pointer;"> @{{ user.username }} </b>
                  </v-form>
                </v-card-text>
                <v-card-text
                  class="pt-0 pb-0"
                  v-if="profile.location"
                >
                  <p class="mb-0 location">
                    {{ profile.location }}
                  </p>
                </v-card-text>
                <v-card-text 
                  class="pt-1 pb-2"
                  v-if="profile.websiteUrl"
                >
                  <a :href="profile.websiteUrl" class="website" style="text-decoration: none; color: #343747;">
                    <v-icon color="#364fcc">mdi-web</v-icon>
                    {{ profile.websiteUrl }} 
                  </a>
                </v-card-text>
                <v-divider 
                  v-if="profile.linkedInUrl || profile.twitterUrl || profile.githubUrl || 
                        profile.facebookUrl || profile.mediumUrl || profile.telegramUrl || profile.steemitUrl"
                ></v-divider>
                <v-card-text
                  v-if="profile.linkedInUrl || profile.twitterUrl || profile.githubUrl || 
                        profile.facebookUrl || profile.mediumUrl || profile.telegramUrl || profile.steemitUrl"
                  class="pt-3 pb-3"
                >
                  <a v-if="profile.linkedInUrl" :href="profile.linkedInUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#0077b5">mdi-linkedin-box</v-icon>
                  </a>
                  <a v-if="profile.twitterUrl" :href="profile.twitterUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#1da1f2">mdi-twitter</v-icon>
                  </a>
                  <a v-if="profile.githubUrl" :href="profile.githubUrl" style="text-decoration: none;">
                    <v-icon class="links" color="black">mdi-github-circle</v-icon>
                  </a>
                  <a v-if="profile.facebookUrl" :href="profile.facebookUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#3578E5">mdi-facebook-box</v-icon>
                  </a>
                  <a v-if="profile.mediumUrl" :href="profile.mediumUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#03a87c">mdi-medium</v-icon>
                  </a>
                  <a v-if="profile.telegramUrl" :href="profile.telegramUrl" style="text-decoration: none;">
                    <v-icon class="links" color="black">mdi-telegram</v-icon>
                  </a>
                  <a v-if="profile.steemitUrl" :href="profile.steemitUrl" style="text-decoration: none;">
                    <v-icon class="links" color="#06D6A9">mdi-alpha-s-circle</v-icon>
                  </a>
                </v-card-text>
                <v-divider v-if="user.username === localStorage.username"></v-divider>
                <v-card-actions v-if="user.username === localStorage.username && user" class="justify-center">
                  <v-btn 
                    v-if="user.username === localStorage.username" 
                    @click="$router.push({name: 'settings'})"
                    class="edit-button text-none"
                    block
                    :ripple="false"
                    depressed
                  >
                    Edit profile
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 md6 lg6 xl5 offset-sm2 offset-md0 offset-lg0 offset-xl0>
              <v-card 
                class="mx-auto mt-1 mb-6"
                align="center"
                outlined
                elevation="1"
                style="border: 1px solid #e7e7f3;"
              >
                <v-card-text class="layout">
                  <h3 class="bp-info pt-3">
                    <span>
                      User's information
                    </span>
                  </h3>
                </v-card-text>
                <div class="pa-4 pt-0">
                  <p 
                    v-if="profile.additionalInformation"
                    class="description"
                    style="text-align: justify; word-wrap: break-word;"
                    v-html="profile.additionalInformation"
                  ></p>
                  <p 
                    v-else
                    class="description"
                    style="text-align: justify;"
                  >
                    No information has been provided.
                  </p>
                </div>
              </v-card>
              <v-card 
                v-if="blockProducers && blockProducersByUser(user.username).length > 0"
                class="mt-6 mb-2"
                outlined
                elevation="1"
                style="border: 1px solid #e7e7f3;"
              >
                <v-list two-line class="pt-0 pb-0">
                  <template 
                    v-for="(blockProducer, index) in blockProducersByUser(user.username) "
                  >
                    <v-card-text v-if="index === 0" class="layout mt-0 ml-0">
                      <h5 class="bp-info">
                        <span>
                          User's block producers
                        </span>
                      </h5>
                    </v-card-text>
                    <v-divider 
                      v-else-if="index > 0 && blockProducer.status === 'active' &&
                      $route.params.username !== localStorage.username"
                    ></v-divider>
                    <v-divider 
                      v-else-if="index > 0 && $route.params.username === localStorage.username"
                    ></v-divider>
                    <v-list-item 
                      v-if="blockProducer.status === 'active' && $route.params.username !== localStorage.username"
                      :to="{name: 'block-producer', params: {identifier: blockProducer.id}}"
                      :ripple="false"
                    >
                      <img 
                        class="mt-2 mb-2 mr-5 pa-1 users-bp"
                        :src="blockProducer.logo_url + `?${Math.random()}`"
                      >
                      <v-list-item-content>
                        <v-list-item-title 
                          class="mb-1 description"
                          style="font-weight: 600; display: inline-block;"
                        >
                          {{ blockProducer.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle 
                          class="location"
                          v-if="blockProducer.location"
                        >
                          {{ blockProducer.location }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item 
                      v-else-if="$route.params.username === localStorage.username"  
                      :to="{name: 'block-producer', params: {identifier: blockProducer.id}}"
                      :ripple="false"
                    >
                      <img 
                        class="mt-2 mb-2 mr-5 pa-1 users-bp"
                        :src="blockProducer.logo_url + `?${Math.random()}`"
                      >
                      <v-list-item-content>
                        <v-list-item-title 
                          class="mb-1 description"
                          style="font-weight: 600; display:inline-block;"
                        >
                          {{ blockProducer.name }}
                          <v-tooltip 
                            v-if="blockProducer.status === 'active'"  
                            right 
                            color="green lighten-1"
                          >
                            <template v-slot:activator="{ on }">
                              <v-icon 
                                class="pb-1" 
                                color="green lighten-1"  
                                v-on="on"
                              >
                                mdi-account-check
                              </v-icon> 
                            </template>
                            <span>active</span>
                          </v-tooltip>
                          <v-tooltip 
                            v-else-if="blockProducer.status === 'moderation'" 
                            right 
                            color="grey lighten-1"
                          >
                            <template v-slot:activator="{ on }">
                              <v-icon 
                                class="pb-1" 
                                color="grey lighten-1" 
                                v-on="on"
                              >
                                mdi-account-check
                              </v-icon> 
                            </template>
                            <span>on moderation</span>
                          </v-tooltip>
                          <v-tooltip 
                            v-else-if="blockProducer.status === 'declined'" 
                            right 
                            color="red lighten-1"
                          >
                            <template v-slot:activator="{ on }">
                              <v-icon 
                                class="pb-1" 
                                color="red lighten-1" 
                                v-on="on"
                              >
                                mdi-account-check
                              </v-icon> 
                            </template>
                            <span>rejected</span>
                          </v-tooltip>
                        </v-list-item-title>
                        <v-list-item-subtitle 
                          class="location"
                          v-if="blockProducer.location"
                        >
                          {{ blockProducer.location }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <div></div>
                  </template>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Error404 from '../../components/ui/Error404'
import Error500 from '../../components/ui/Error500'
import { blockProducerStorageActions } from '../../store/modules/blockProducer'
import { profileStorageActions } from '../../store/modules/profile'
import { userStorageActions } from '../../store/modules/user'

export default {
  name: 'UserPage',
  components: {
    Error404,
    Error500,
  },
  data() {
    return {
      error: {
        message: null,
        statusCode: null,
      },
      blockProducersByUser: function (username) {
        var filteredBlockProducersByUser = []

        this.blockProducers.forEach(function(blockProducer) {
          if (blockProducer.user.username === username) {
            filteredBlockProducersByUser.push(blockProducer)
          }
        })

        return filteredBlockProducersByUser
      },
    }
  },
  computed: {
    ...mapGetters('user', ['userError', 'user']),
    ...mapGetters('profile', ['profile', 'profileError']),
    ...mapGetters('blockProducer', ['blockProducers']), 
  },
  mounted() {
    this.$store.dispatch(userStorageActions.getUser, {
      username: this.$route.params.username,
    })

    this.$store.dispatch(profileStorageActions.getProfile, {
      username: this.$route.params.username,
    })

    this.$store.dispatch(blockProducerStorageActions.getBlockProducers)
  },
}
</script>

<style>
a:link {
  text-decoration: none;
}
.v-icon.v-icon {
  font-size: 19px;
}
.v-icon.links {
  font-size: 35px;
}

.user {
  display: inline-block;
  max-width: 200px;
  height: 200px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.users-bp {
  display: inline-block;
  max-width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.v-content__wrap {
  background-color: #f2f2fa;
}
</style>
