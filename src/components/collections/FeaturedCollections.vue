<template>
  <v-container class="collections">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="collection-title">
          Featured Collections
        </h1>
      </v-card-title>
      <v-tabs
          v-model="tab"
          background-color="transparent"
          grow>
        <v-tab
            v-for="(tab, index) in tabs"
            :key="index">
          {{ tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
            v-for="item in listCollections"
            :key="item.id">
          <v-card flat>
            <v-card-text
                v-if="item.preview_photos">
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  v-for="photo in item.preview_photos"
                  :key="photo.id"
                  @click.prevent="openCollection(item.id, item.user, item.title)">
                <img
                    :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
                    class="collection-img clickable-img"
                    alt="collection photo">
              </v-col>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'FeaturedCollections',
  data: () => ({
    listCollections: [],
    tab: null
  }),
  methods: {
    async openCollection(id, user, title) {
      await this.$store.dispatch('fetchCollection', {
        id,
        user,
        title
      })
      await this.$router.push(`/collection/${id}`)
    }
  },
  computed: {
    tabs() {
      return this.listCollections.map(tab => tab.title)
    }
  },
  async mounted() {
    this.listCollections = await this.$store.dispatch('fetchListCollections')
  }
}
</script>
