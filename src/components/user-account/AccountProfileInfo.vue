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
            <div v-if="userAccountId.photos.length > 0">
              <v-card-text
                  v-if="userAccountId.photos">
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="photo in userAccountId.photos"
                    :key="photo.id">
                  <img
                      :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
                      class="profile-img"
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
                      :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
                      class="profile-img"
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
                  :key="item.id"
                  :class="{'d-none': !item.preview_photos}">
                <v-col v-if="item.preview_photos"
                       cols="12"
                       class="collection-title">
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
                      :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
                      class="profile-img"
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
              <div v-if="userAccountId.followers_count"
                   class="profile-info">
                Followers:
                {{ userAccountId.followers_count }}
              </div>
              <div v-if="userAccountId.following_count"
                   class="profile-info">
                Following:
                {{ userAccountId.following_count }}
              </div>
              <div v-if="userAccountId.total_likes"
                   class="profile-info">
                Likes:
                {{ userAccountId.total_likes }}
              </div>
              <div v-if="userAccountId.downloads"
                   class="profile-info">
                Downloads:
                {{ userAccountId.downloads }}
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
  name: 'AccountProfileInfo',
  props: {
    userAccountId: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    tab: null,
    noPhotos: 'Not found any photos!'
  }),
  computed: {
    userLikedPhotos() {
      return this.$store.getters.userLikedPhotos
    },
    userCollections() {
      return this.$store.getters.userCollections
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchUserLikedPhotos', this.userAccountId.username)
    await this.$store.dispatch('fetchUserCollections', this.userAccountId.username)
  }
}
</script>
