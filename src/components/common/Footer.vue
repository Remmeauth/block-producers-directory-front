<template>
    <v-footer
      dark
      padless
      color="#160d1d"
    >
    <v-layout>
      <v-flex xs12 sm10 md8 lg8 xl8 offset-sm1 offset-md2 offset-lg2 offset-xl2>
        <v-card
          flat
          tile
          class="white--text text-center"
          color="#160d1d"
        >
          <v-card-actions 
            class="justify-center mt-8 mb-8" 
            style="flex-direction: row;"
          >
            <a href="https://twitter.com/remme_io" target="_blank">
              <v-img
                class="mr-5"
                max-width="24.16"
                style="width: auto;height:20px;"
                v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5af87d3e4d23b2ca2bc4077a_twitter_white.svg'"
              >
              </v-img>
            </a>
            <a href="https://linkedin.com/company/remme" target="_blank">
              <v-img
                class="mr-5"
                max-width="20"
                style="width: auto;height:20px;"
                v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5c6c55e8087104c16193ca55_linkedin.svg'"
              >
              </v-img>
            </a>
            <a href="https://www.facebook.com/remme.io/" target="_blank">
              <v-img
                class="mr-5"
                max-width="10"
                style="width: auto;height:20px;"
                v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5af87d3e4d23b2fe53c40776_fb_white.svg'"
              >
              </v-img>
            </a>
            <a href="https://www.reddit.com/r/remme/" target="_blank">
              <v-img
                class="mr-5"
                max-width="22.5"
                style="width: auto;height:20px;"
                v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5af87d3e4d23b271e2c40777_reddit_white.svg'"
              >
              </v-img>
            </a>
            <a href="https://github.com/Remmeauth" target="_blank">
              <v-img
                class="mr-5"
                max-width="20"
                style="width: auto;height:20px;"
                v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5c6c55fe08710487e393cb2e_github-logo-2.svg'"
              >
              </v-img>
            </a>
            <a href="https://t.me/remme" target="_blank">
              <v-img
                class="mr-5"
                max-width="24"
                style="width: auto;height:20px;"
                v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5af90a12147ee39e7a3d620d_telegram_white.svg'"
              >
              </v-img>
            </a>
            <a href="https://gitter.im/REMME-Tech" target="_blank">
              <v-img
                class="mr-5"
                max-width="14"
                style="width: auto;height:20px;"
                v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5c4209cc3b33ddfcdb89dd58_gitter.png'"
              >
              </v-img>
            </a>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions 
            v-if="this.$vuetify.breakpoint.xs"
            class="justify-center mt-5 mb-5" 
            style="flex-direction: column;"
          >
            <v-img
              class="mr-2 mb-5"
              style="width: 102px;height:29.36px;"
              v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5c6c48f3167df70b9ac8675b_remme-on-dark.svg'"
            >
            </v-img>
            <v-form class="align-justify" style="font-size:0.9em; color:#636e86;">
              © {{ new Date().getFullYear() }} REMME CAPITAL LTD. All rights reserved.
            </v-form>
          </v-card-actions>
          <v-card-actions
            v-else
            class="justify-center mt-5 mb-5" 
            style="flex-direction: row;"
          >
            <v-img
              class="mr-2"
              max-width="102"
              style="width: 20%;height:29.36px;"
              v-bind:src="'https://assets.website-files.com/5933fd4773e44b4d95d597e8/5c6c48f3167df70b9ac8675b_remme-on-dark.svg'"
            >
            </v-img>
            <v-form 
              class="align-justify" 
              style="font-size:0.9em; color:#636e86;"
            >
              © {{ new Date().getFullYear() }} REMME CAPITAL LTD. All rights reserved.
            </v-form>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
.v-card {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.custom-btn::before {
  color: transparent;
}
</style>
