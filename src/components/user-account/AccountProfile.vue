<template>
  <div>
    <section class="container profile">
      <v-row>
        <v-col cols="12"
               class="py-0 mb-9">
          <v-row
              class="mb-7"
              align="start"
              justify="center">
            <v-avatar
                v-if="userAccountId.profile_image"
                size="128">
              <img
                  :src="userAccountId.profile_image.large ? userAccountId.profile_image.large : '@/assets/images/no-image.png'"
                  alt="John">
            </v-avatar>
            <div>
              <h2 v-if="userAccountId.name"
                  class="profile-title">
                {{ userAccountId.name }}
              </h2>
              <div v-if="userAccountId.location"
                   class="profile-info">
                {{ userAccountId.location }}
              </div>
              <v-list-item
                  v-if="twitterUrl"
                  :href="twitterUrl"
                  class="profile-info"
                  target="_blank">
                {{ twitterUrl }}
              </v-list-item>
              <v-list-item
                  v-if="instagramUrl"
                  :href="instagramUrl"
                  class="profile-info"
                  target="_blank">
                {{ instagramUrl }}
              </v-list-item>
            </div>
          </v-row>
          <div v-if="userAccountId.bio"
               class="col-12 col-md-9 col-lg-6 profile-description">
            {{ userAccountId.bio }}
          </div>
        </v-col>
      </v-row>
    </section>
    <AccountProfileInfo
        :userAccountId="userAccountId"/>
  </div>
</template>

<script>
import AccountProfileInfo from '@/components/user-account/AccountProfileInfo'

export default {
  name: 'AccountProfile',
  props: {
    userAccountId: {
      type: Object,
      required: true
    }
  },
  components: {
    AccountProfileInfo
  },
  computed: {
    twitterUrl() {
      if (this.userAccountId.twitter_username) {
        return process.env.VUE_APP_UNSPLASH_TWITTER_URL + this.userAccountId.twitter_username
      }
    },
    instagramUrl() {
      if (this.userAccountId.instagram_username) {
        return process.env.VUE_APP_UNSPLASH_INSTAGRAM_URL + this.userAccountId.instagram_username
      }
    }
  }
}
</script>
