<template>
  <section class="container-fluid profile-info">
    <v-card>
      <v-tabs
          v-model="tab"
          icons-and-text
          show-arrows>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1">
          Photos
          <v-icon>mdi-image-multiple</v-icon>
        </v-tab>
        <v-tab href="#tab-2">
          Likes
          <v-icon>mdi-heart</v-icon>
        </v-tab>
        <v-tab href="#tab-3">
          Collections
          <v-icon>mdi-layers-triple</v-icon>
        </v-tab>
        <v-tab href="#tab-4">
          Stats
          <v-icon>mdi-chart-bar</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
            v-for="i in 4"
            :key="i"
            :value="'tab-' + i">
          <v-card
              v-if="i === 1"
              flat>
            <div v-if="logInUser.photos.length > 0">
              <v-card-text
                  v-if="logInUser.photos">
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="photo in logInUser.photos"
                    :key="photo.id">
                  <img
                      @click.prevent="downloadPhoto(photo.urls.small)"
                      :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
                      class="profile-img cursor-pointer"
                      alt="user photo">
                </v-col>
              </v-card-text>
            </div>
            <div v-else>
              <v-card-text>
                <v-col cols="12" class="collection-title">
                  {{ noPhotos }}
                </v-col>
              </v-card-text>
            </div>
          </v-card>
          <v-card
              v-else-if="i === 2"
              flat>
            <div v-if="userLikedPhotos.length > 0">
              <v-card-text>
                <v-col
                    v-if="userLikedPhotos"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="photo in userLikedPhotos"
                    :key="photo.id">
                  <img
                      @click.prevent="downloadPhoto(photo.urls.small)"
                      :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
                      class="profile-img cursor-pointer"
                      alt="user photo">
                </v-col>
                <v-col
                    v-else
                    cols="12">
                  <img
                      src="@/assets/images/no-photos.png"
                      class="profile-img"
                      alt="no photos">
                </v-col>
              </v-card-text>
            </div>
            <div v-else>
              <v-card-text>
                <v-col cols="12" class="collection-title">
                  {{ noPhotos }}
                </v-col>
              </v-card-text>
            </div>
          </v-card>
          <v-card
              v-else-if="i === 3"
              flat>
            <div v-if="userCollections.length > 0">
              <v-card-text
                  v-for="item of userCollections"
                  :key="item.id">
                <v-col cols="12" class="collection-title">
                  {{ item.title }}
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="photo in item.preview_photos"
                    :key="photo.id">
                  <img
                      @click.prevent="downloadPhoto(photo.urls.small)"
                      :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
                      class="profile-img cursor-pointer"
                      alt="user photo">
                </v-col>
              </v-card-text>
            </div>
            <div v-else>
              <v-card-text>
                <v-col cols="12" class="collection-title">
                  {{ noPhotos }}
                </v-col>
              </v-card-text>
            </div>
          </v-card>
          <v-card
              v-else-if="i === 4"
              flat>
            <v-card-text>
              <div v-if="logInUser.followers_count"
                   class="profile-info">
                Followers:
                {{ logInUser.followers_count }}
              </div>
              <div v-if="logInUser.following_count"
                   class="profile-info">
                Following:
                {{ logInUser.following_count }}
              </div>
              <div v-if="logInUser.total_likes"
                   class="profile-info">
                Likes:
                {{ logInUser.total_likes }}
              </div>
              <div v-if="logInUser.downloads"
                   class="profile-info">
                Downloads:
                {{ logInUser.downloads }}
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </section>
</template>

<script>
export default {
  name: 'MyProfileInfo',
  props: {
    logInUser: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    tab: null,
    noPhotos: 'Not found any photos!'
  }),
  methods: {
    async downloadPhoto(url) {
      await this.$store.dispatch('downloadPhoto', url)
    }
  },
  computed: {
    userLikedPhotos() {
      return this.$store.getters.userLikedPhotos
    },
    userCollections() {
      return this.$store.getters.userCollections
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchUserLikedPhotos', this.logInUser.username)
    await this.$store.dispatch('fetchUserCollections', this.logInUser.username)
  }
}
</script>
