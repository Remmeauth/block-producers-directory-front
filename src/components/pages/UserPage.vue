<template>
  <div v-if="profileError.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="profileError.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <v-layout class="mb-12 mt-12" row wrap>
      <v-flex xs10 sm10 md10 lg10 xl8 offset-xs1 offset-sm3 offset-md2 offset-lg1 offset-xl2>
        <v-layout row wrap>
            <v-flex xs12 sm8 md4 lg4 xl3 offset-lg1>
              <v-card 
                v-if="this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'"
                class="mx-auto mb-6"
                align="center"
                elevation="10" 
                outlined
                style="border-color: #5d80da;"
                >
                <v-img class="mt-2 mb-2"
                  v-if="profile.avatarUrl" 
                  :src="profile.avatarUrl"
                  style="max-width: 35%; border-radius: 50%;"
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
                  class="pt-1 pl-2 pb-2" 
                >
                  <v-icon>location_on</v-icon>
                  {{ profile.location }}
                </v-card-text>
                <v-card-text 
                  class="pt-0 pl-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="profile.websiteUrl" style="text-decoration: none; color: black;">
                    {{ profile.websiteUrl }} 
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text 
                  class="pt-4 pl-2 pb-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="profile.twitterUrl" style="text-decoration: none; color: black;">
                    {{ profile.twitterUrl }} 
                  </a>
                </v-card-text>
                <v-card-text 
                  class="pt-0 pl-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="profile.githubUrl" style="text-decoration: none; color: black;">
                    {{ profile.githubUrl }} 
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn 
                    v-if="user.username === localStorage.username" 
                    @click="$router.push({name: 'settings'})"
                    outlined 
                    color="white" 
                    block 
                    style="background-color: #4d70d5; border: 2px solid #2962FF;"
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
                elevation="10" 
                outlined
                style="border-color: #5d80da;"
                >
                <v-img class="mt-2 mb-2"
                  v-if="profile.avatarUrl" 
                  :src="profile.avatarUrl"
                  style="max-width: 50%; border-radius: 50%;"
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
                >
                  <v-icon>location_on</v-icon>
                  {{ profile.location }}
                </v-card-text>
                <v-card-text 
                  class="pt-0"
                >
                  <v-icon>link</v-icon>
                  <a :href="profile.websiteUrl" style="text-decoration: none; color: black;">
                    {{ profile.websiteUrl }} 
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text 
                  class="pt-4 pl-2 pb-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="profile.twitterUrl" style="text-decoration: none; color: black;">
                    {{ profile.twitterUrl }} 
                  </a>
                </v-card-text>
                <v-card-text 
                  class="pt-0 pl-2"
                >
                  <v-icon>link</v-icon>
                  <a :href="profile.githubUrl" style="text-decoration: none; color: black;">
                    {{ profile.githubUrl }} 
                  </a>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn 
                    v-if="user.username === localStorage.username" 
                    @click="$router.push({name: 'settings'})"
                    outlined 
                    color="white" 
                    block 
                    style="background-color: #4d70d5; border: 1px solid #304FFE; cursor: pointer;"
                  >
                    Edit profile
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 sm8 md6 lg6>
              <v-card 
                class="mx-auto"
                align="center"
                elevation="10" 
                outlined
                style="border-color: #5d80da;"
              >
                <v-subheader>User's information</v-subheader>
                <div class="pa-4 pt-0 caption">
                  <p 
                    v-if="profile.additionalInformation" 
                    style="text-align: justify;" 
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
                elevation="10" 
                outlined
                style="border-color: #5d80da;"
              >
                <v-list two-line>
                  <template 
                    v-for="(blockProducer, index) in blockProducersByUser(user.username) "
                  >
                    <v-subheader 
                      v-if="index === 0"
                    >User's block producers</v-subheader>
                    <v-divider 
                      v-else-if="index > 0" 
                    ></v-divider>
                    <v-list-item :to="{name: 'block-producer', params: {identifier: blockProducer.id}}">
                      <img 
                        class="mt-2 mb-2 mr-5 pa-1" 
                        style="max-width:12%;border-radius: 50%;"
                        :src="blockProducer.logo_url"
                      >
                      <v-list-item-content>
                        <v-list-item-title 
                          class="mb-1" 
                          style="font-weight: 500"
                        >{{ blockProducer.name }}</v-list-item-title>
                        <v-list-item-subtitle 
                          style="font-size: 0.8em;"
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
.custom-btn::before {
  color: transparent;
}
.custom-btn {
  color: rgba(0, 0, 0, 0.54);
}
a:link {
  text-decoration: none;
}
.v-icon.v-icon {
  font-size: 19px;
}
</style>
