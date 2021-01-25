<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else>
      <MainBanner
          :tags="tags"
          class="pb-md-16"/>
      <section
          v-if="showErrorMessage"
          class="container error-block">
        <v-row justify="center">
          <h2 class="error-message">
            {{ errorMessage }}
          </h2>
        </v-row>
      </section>
      <Cards
          :userName="logInUser.username"
          :photosList="photosList"/>
    </div>
  </div>
</template>

<script>
import MainBanner from '@/components/MainBanner'
import Cards from '@/components/cards/Cards'
import {bus} from '@/bus'

export default {
  name: 'Home',
  components: {
    MainBanner,
    Cards
  },
  data: () => ({
    showErrorMessage: false,
    photos: [],
    tags: [
      'nature',
      'travel',
      'animals',
      'food',
      'health',
      'technology',
      'events'
    ],
    page: 1,
    loading: true,
    errorMessage: 'Please fill in the correct tag name!'
  }),
  methods: {
    setNewPhotos() {
      bus.$on('change-photos', data => {
        !data.length ? this.showErrorMessage = true : this.showErrorMessage = false
        this.photosList = data
      })
    }
  },
  computed: {
    photosList: {
      get: function () {
        return this.photos
      },
      set: function (newPhotos) {
        this.photos = newPhotos
      }
    },
    accessToken() {
      return this.$store.getters.accessToken
    },
    logInUser() {
      return this.$store.getters.logInUser
    }
  },
  async mounted() {
    const tagsLength = this.tags.length
    let tagName = this.tags[Math.floor(Math.random() * tagsLength)]
    this.photos = await this.$store.dispatch('searchPhotos', {
      tagName: tagName,
      page: this.page
    })
    this.loading = false
    this.$store.commit('fetchTagName', tagName)
    this.setNewPhotos()
  }
}
</script>

<style scoped lang="scss">
.error-block {
  .error-message {
    color: #100e0b;
    font: 36px 'helvetica';
    letter-spacing: 0.15px;
  }
}
</style>
