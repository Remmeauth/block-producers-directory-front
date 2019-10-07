<template>
  <div v-if="profileError.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="profileError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>

    <!--<div class="user" style="background-image: url('https://qph.fs.quoracdn.net/main-qimg-3eb22fdc92d3b21cf4ba3d18f585fa74');"></div>-->
    <!--<div class="user" style="background-image: url('https://aldroenergia.com/blog/wp-content/uploads/2017/08/aldro-portugal.jpg');"></div>-->
    <!--<div class="user" style="background-image: url('https://pbs.twimg.com/profile_images/1135566911184527360/wPmso1yc.png');"></div>-->

    <v-layout class="mb-12 mt-4" row wrap>
      <v-flex xs10 sm10 md10 lg10 xl6 offset-xs1 offset-sm1 offset-md1 offset-lg1 offset-xl3>
        <v-layout row wrap>
            <v-flex xs12 sm8 md4 lg4 xl4 offset-sm2 offset-md1 offset-lg1 offset-xl1>
              <v-card 
                v-if="this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'"
                class="mx-auto mb-6"
                align="center"
                outlined
                style="position: -webkit-sticky; position: sticky;"
              >
                <div></div>
                <v-img class="mt-4 mb-2 user"
                  v-if="profile.avatarUrl" 
                  :src="profile.avatarUrl + `?${Math.random()}`"
                ></v-img>
                <v-divider></v-divider>
                <h3 class="mt-3">
                  <span class="headline">
                    {{ profile.firstName }} {{ profile.lastName }}
                  </span>
                </h3>
                <v-card-text 
                  class="pt-1 pb-0"
                >
                  <v-form>
                    <b style="color: #5d80da;"> @{{ user.username }} </b>
                  </v-form>
                </v-card-text>
                <v-card-text 
                  class="pt-1 pb-2" 
                  v-if="profile.location"
                >
                  <v-icon>location_on</v-icon>
                  {{ profile.location }}
                </v-card-text>
                <v-card-text 
                  class="pt-1 pb-2"
                  v-else
                >
                </v-card-text>
                <v-card-text 
                  class="pt-0"
                  v-if="profile.websiteUrl"
                >
                  <a :href="profile.websiteUrl" style="text-decoration: none; color: black;">
                    <v-icon color="#5d80da">mdi-web</v-icon>
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
                <v-card-actions v-if="user" class="justify-center">
                  <v-btn 
                    v-if="user.username === localStorage.username" 
                    @click="$router.push({name: 'settings'})"
                    class="edit-button"
                    block
                    :ripple="false"
                    depressed
                  >
                    Edit profile
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card 
                v-if="
                  this.$vuetify.breakpoint.name === 'md' ||
                  this.$vuetify.breakpoint.name === 'lg' ||
                  this.$vuetify.breakpoint.name === 'xl'" 
                class="mx-auto mr-6 mb-6"
                align="center"
                outlined
                >
                <div></div>
                <v-img class="mt-4 mb-2 user"
                  v-if="profile.avatarUrl" 
                  :src="profile.avatarUrl + `?${Math.random()}`"
                ></v-img>
                <v-divider></v-divider>
                <h3 class="mt-3">
                  <span class="headline">
                    {{ profile.firstName }} {{ profile.lastName }}
                  </span>
                </h3>
                <v-card-text 
                  class="pt-1 pb-0"
                >
                  <v-form>
                    <b style="color: #5d80da;"> @{{ user.username }} </b>
                  </v-form>
                </v-card-text>
                <v-card-text 
                  class="pt-1 pb-2"
                  v-if="profile.location"
                >
                  <v-icon>location_on</v-icon>
                  {{ profile.location }}
                </v-card-text>
                <v-card-text 
                  class="pt-1 pb-2"
                  v-else
                >
                </v-card-text>
                <v-card-text 
                  class="pt-0"
                  v-if="profile.websiteUrl"
                >
                  <a :href="profile.websiteUrl" style="text-decoration: none; color: black;">
                    <v-icon color="#5d80da">mdi-web</v-icon>
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
                <v-card-actions v-if="user" class="justify-center">
                  <v-btn 
                    v-if="user.username === localStorage.username" 
                    @click="$router.push({name: 'settings'})"
                    class="edit-button"
                    block
                    :ripple="false"
                    depressed
                  >
                    Edit profile
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 md6 lg6 offset-sm2 offset-md0 offset-lg0 offset-xl0>
              <v-card 
                class="mx-auto"
                align="center"
                outlined
              >
                <v-subheader>User's information</v-subheader>
                <div class="pa-4 pt-0 caption">
                  <p 
                    v-if="profile.additionalInformation" 
                    style="text-align: justify; word-wrap: break-word;"
                    v-html="profile.additionalInformation"
                  ></p>
                  <p 
                    v-else 
                    style="text-align: justify;"
                  >
                    No information has been provided.
                  </p>
                </div>
              </v-card>
              <v-card 
                v-if="blockProducers && blockProducersByUser(user.username).length > 0"
                class="mt-6"
                outlined
              >
                <v-list two-line>
                  <template 
                    v-for="(blockProducer, index) in blockProducersByUser(user.username) "
                  >
                    <v-subheader 
                      v-if="index === 0"
                    >User's block producers</v-subheader>
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
                        class="mt-2 mb-2 mr-5 pa-1" 
                        style="max-width: 15%; border-radius: 50%;"
                        :src="blockProducer.logo_url + `?${Math.random()}`"
                      >
                      <v-list-item-content>
                        <v-list-item-title 
                          class="mb-1" 
                          style="font-weight: 500; display:inline-block;"
                        >
                          {{ blockProducer.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle 
                          style="font-size: 0.8em;"
                          v-if="blockProducer.location"
                        >
                          <v-icon>location_on</v-icon> 
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
                        class="mt-2 mb-2 mr-5 pa-1" 
                        style="max-width: 15%; border-radius: 50%;"
                        :src="blockProducer.logo_url + `?${Math.random()}`"
                      >
                      <v-list-item-content>
                        <v-list-item-title 
                          class="mb-1" 
                          style="font-weight: 500; display:inline-block;"
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
                          style="font-size: 0.8em;"
                          v-if="blockProducer.location"
                        >
                          <v-icon>location_on</v-icon> 
                          {{ blockProducer.location }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card>
            </v-flex>
        </v-layout>
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
</style>
