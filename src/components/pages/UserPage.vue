<template>
  <div v-if="error.statusCode === 404">
    <Error404/>
  </div>
  <div v-else-if="error.statusCode === 500">
    <Error500/>
  </div>
  <div v-else>
    <br>
    <v-layout row wrap>
      <v-flex lg10 offset-lg1>
        <v-spacer></v-spacer>
        <v-layout row wrap>
          <v-flex lg4 offset-lg1>
            <v-flex lg12>
              <v-card
                max-width="344"
                class="mx-auto"
                >
                <v-img v-if="profile.avatarUrl" :src="profile.avatarUrl" height="194"></v-img>
                <v-card-title class="align-start">
                    <span class="headline">{{ profile.firstName }} {{ profile.lastName }}</span>
                </v-card-title>
                <v-card-text>
                  @{{ user.username }}
                </v-card-text>
              </v-card>
            </v-flex>
            <div v-if="user">
              <br v-if="user.username === localStorage.username">
              <v-flex lg12 v-if="user.username === localStorage.username">
                <v-card max-width="344" class="mx-auto">
                  <v-btn @click="$router.push({name: 'settings'})" width="344">Edit profile</v-btn>
                </v-card>
              </v-flex>
            </div>
            <br>
            <v-flex lg12>
              <div v-if="profile.websiteUrl || profile.location">
                <v-card max-width="344" class="mx-auto">
                  <v-list>
                    <v-list-item-group color="primary">
                      <v-list-item v-if="profile.websiteUrl">
                        <v-list-item-icon>
                          <v-icon>link</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title><a v-bind:href="profile.websiteUrl">{{ profile.websiteUrl }}</a></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item v-if="profile.location">
                        <v-list-item-icon>
                          <v-icon>location_on</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{ profile.location }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </div>
              <div v-if="true"></div>
            </v-flex>
            <br>
          </v-flex>
          <v-flex lg6>
            <v-card class="mx-auto overflow-hidden">
              <v-subheader>User's information</v-subheader>
              <div class="pa-4 pt-0 caption">
                <p v-if="profile.additionalInformation" style="text-align: justify;" v-html="profile.additionalInformation"></p>
                <p v-else style="text-align: justify;">No information has been provided.</p>
              </div>
            </v-card>
            <br>
            <v-card v-if="blockProducers && blockProducersByUser(user.username).length > 0">
              <v-list two-line>
                <template v-for="(blockProducer, index) in blockProducersByUser(user.username)">
                  <v-subheader v-if="index === 0">User's block producers</v-subheader>
                  <v-divider v-else-if="index > 0" :inset="true"></v-divider>
                  <v-list-item :to="{name: 'block-producer', params: {identifier: blockProducer.id}}">
                    <v-list-item-avatar>
                      <img src="https://block-producers-directory.s3-us-west-2.amazonaws.com/bps/logos/default-block-producer-logotype.png">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ blockProducer.name }}</v-list-item-title>
                      <v-list-item-subtitle><v-icon>place</v-icon>{{ blockProducer.location }}</v-list-item-subtitle>
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
import Error404 from '../../components/ui/Error404'
import Error500 from '../../components/ui/Error500'
import { blockProducerStorageActions, blockProducerStorageMutations} from '../../store/modules/blockProducer'
import { profileStorageActions, profileStorageMutations} from '../../store/modules/profile'
import { userStorageActions, userStorageMutations } from '../../store/modules/user'

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
        websiteUrl: null,
      },
      blockProducers: null,
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
  mounted() {
    this.$store.dispatch(userStorageActions.getUser, {
      username: this.$route.params.username,
    })

    this.$store.dispatch(profileStorageActions.getProfile, {
      username: this.$route.params.username,
    })

    this.$store.dispatch(blockProducerStorageActions.getBlockProducers)

    const unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === userStorageMutations.subscribe.addError) {
        this.error = state.user.error
        unsubscribe()
      }

      if (mutation.type === profileStorageMutations.subscribe.addError) {
        this.error = state.profile.error
        unsubscribe()
      }

      if (mutation.type === userStorageMutations.subscribe.addUser) {
        this.user.email = state.user.email
        this.user.username = state.user.username
      }

      if (mutation.type === profileStorageMutations.subscribe.addProfile) {
        this.profile.firstName = state.profile.firstName
        this.profile.lastName = state.profile.lastName
        this.profile.additionalInformation = state.profile.additionalInformation
        this.profile.avatarUrl = state.profile.avatarUrl
        this.profile.facebookUrl = state.profile.facebookUrl
        this.profile.githubUrl = state.profile.githubUrl
        this.profile.linkedInUrl = state.profile.linkedInUrl
        this.profile.location = state.profile.location
        this.profile.mediumUrl = state.profile.mediumUrl
        this.profile.steemitUrl = state.profile.steemitUrl
        this.profile.telegramUrl = state.profile.telegramUrl
        this.profile.tweeterUrl = state.profile.tweeterUrl
        this.profile.websiteUrl = state.profile.websiteUrl
      }

      if (mutation.type === blockProducerStorageMutations.subscribe.addBlockProducers) {
        this.blockProducers = state.blockProducer.blockProducers
      }
    });
  },
}
</script>

<style></style>
