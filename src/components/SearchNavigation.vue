<template>
  <v-container class="search-position pa-xl-0">
    <v-col cols="12"
           class="search-nav">
      <v-row>
        <v-text-field
            v-model="search"
            @change="searchPhotos"
            class="custom-input"
            hide-details
            label="Search for high-resolution photos">
          <v-img
              @click="searchPhotos"
              class="search-icon"
              slot="append"
              src="@/assets/images/icons/search.svg">
          </v-img>
        </v-text-field>
        <div class="trending">
          Trending
        </div>
        <v-chip-group
            active-class="primary--text"
            column>
          <v-chip
              v-for="(tag, index) in tags"
              :key="tag + index"
              @click="searchCollectionPhotos(tag)">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import {bus} from '@/bus'

export default {
  name: 'SearchNavigation',
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    search: null,
    page: 1
  }),
  methods: {
    async searchPhotos() {
      let tagName = this.search
      await this.$store.dispatch('searchPhotos', {
        tagName: tagName,
        page: this.page
      })
      bus.$emit('change-photos', this.photosNewList)
      this.$store.commit('fetchTagName', tagName)
      this.search = null
    },
    async searchCollectionPhotos(tag) {
      await this.$store.dispatch('searchPhotos', {
        tagName: tag,
        page: this.page
      })
      bus.$emit('change-photos', this.photosNewList)
      this.$store.commit('fetchTagName', tag)
    }
  },
  computed: {
    photosNewList() {
      return this.$store.getters.photos
    }
  }
}
</script>
