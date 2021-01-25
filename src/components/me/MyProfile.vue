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
                v-if="logInUser.profile_image"
                size="128">
              <img
                  :src="logInUser.profile_image.large ? logInUser.profile_image.large : '@/assets/images/no-image.png'"
                  alt="John">
            </v-avatar>
            <div>
              <h2 v-if="logInUser.name"
                  class="profile-title">
                {{ logInUser.name }}
              </h2>
              <div v-if="logInUser.location"
                   class="profile-info">
                {{ logInUser.location }}
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
          <div v-if="logInUser.bio"
               class="col-12 col-md-9 col-lg-6 profile-description">
            {{ logInUser.bio }}
          </div>
        </v-col>
      </v-row>
    </section>
    <MyProfileInfo
        :logInUser="logInUser"/>
  </div>
</template>

<script>
import MyProfileInfo from '@/components/me/MyProfileInfo'

export default {
  name: 'MyProfile',
  props: {
    logInUser: {
      type: Object,
      required: true
    }
  },
  components: {
    MyProfileInfo
  },
  computed: {
    twitterUrl() {
      if (this.logInUser.twitter_username) {
        return process.env.VUE_APP_UNSPLASH_TWITTER_URL + this.logInUser.twitter_username
      }
    },
    instagramUrl() {
      if (this.logInUser.instagram_username) {
        return process.env.VUE_APP_UNSPLASH_INSTAGRAM_URL + this.logInUser.instagram_username
      }
    }
  }
}
</script>
