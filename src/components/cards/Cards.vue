<template>
  <v-container class="px-xl-0">
    <v-row class="mx-xl-n4">
      <v-col
          class="d-flex px-xl-4 py-0 mb-8"
          cols="12"
          sm="6"
          md="3"
          lg="3">
        <v-select
            class="custom-select"
            v-model="selectOrientation"
            @change="searchByOrientation"
            :items="items"
            label="Any orientation"
            outlined>
        </v-select>
      </v-col>
    </v-row>
    <v-row class="mx-xl-n4">
      <v-col
          cols="12"
          v-for="(card, index) of photosList"
          :key="card.id + index"
          class="d-flex px-xl-4 py-0 mb-8"
          :class="card.height < 4000 ? 'col-sm-6 col-lg-3': 'col-sm-12 col-lg-6'">
        <CardSmall
            v-if="card.height < 4000"
            :card="card"
            :userName="userName"/>
        <CardLarge
            v-else
            :card="card"
            :userName="userName"/>
      </v-col>
      <Loader v-if="loading"/>
      <Observer
          @intersect="showNewPhotos"
          :options="{root, threshold}"/>
    </v-row>
  </v-container>
</template>

<script>
import CardSmall from '@/components/cards/CardSmall'
import CardLarge from '@/components/cards/CardLarge'
import Observer from '@/components/Observer'
import {bus} from '@/bus'

export default {
  name: 'Cards',
  components: {
    CardSmall,
    CardLarge,
    Observer
  },
  props: {
    photosList: {
      type: Array,
      required: true
    },
    userName: {
      required: true
    }
  },
  data: () => ({
    page: 1,
    newPhotos: [],
    root: null,
    threshold: 0.5,
    loading: false,
    items: ['landscape', 'portrait', 'squarish'],
    selectOrientation: null
  }),
  methods: {
    async showNewPhotos() {
      this.loading = true
      this.page++
      this.newPhotos = await this.$store.dispatch('searchPhotos', {
        tagName: this.tagName,
        page: this.page
      })
      this.newPhotos.map(newPhoto => this.photosList.push(newPhoto))
      this.loading = false
    },
    async searchByOrientation() {
      await this.$store.dispatch('searchPhotos', {
        tagName: this.tagName,
        page: this.page,
        orientation: this.selectOrientation
      })
      bus.$emit('change-photos', this.photosListByOrientation)
    }
  },
  computed: {
    tagName() {
      return this.$store.getters.tagName
    },
    photosListByOrientation() {
      return this.$store.getters.photos
    }
  }
}
</script>
