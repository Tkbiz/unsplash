<template>
  <div
      v-if="randomPhoto"
      class="container--fluid main-banner">
    <v-row class="justify-end align-center position-relative ma-0">
      <v-container class="banner-block">
        <v-row>
          <v-col
              class="pa-xl-0"
              cols="12"
              md="8"
              lg="5"
              xl="4">
            <h1 v-if="randomPhoto.user"
                class="banner-title col-12 col-lg-10">
              {{ bannerTitle }}
              <br>
              {{ randomPhoto.user.name | truncate(65, '...') }}
            </h1>
            <p v-if="randomPhoto.description"
               class="banner-description col-12 col-md-7 col-lg-8">
              {{ randomPhoto.description | truncate(130, '...') }}
            </p>
            <v-btn
                class="banner-btn"
                depressed>
              explore all
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-col
          cols="12"
          lg="7"
          class="position-relative banner-img">
        <v-img
            v-if="randomPhoto.urls"
            :src="randomPhoto.urls.regular ? randomPhoto.urls.regular : '@/assets/images/no-image.png'">
        </v-img>
      </v-col>
      <SearchNavigation :tags="tags"/>
    </v-row>
  </div>
</template>

<script>
import SearchNavigation from '@/components/SearchNavigation'
import {truncateTextMixin} from "@/mixins/truncateTextMixin"

export default {
  name: 'MainBanner',
  mixins: [truncateTextMixin],
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    bannerTitle: 'Photo of the Day by ',
    randomPhoto: {}
  }),
  components: {
    SearchNavigation
  },
  async mounted() {
   this.randomPhoto = await this.$store.dispatch('fetchRandomPhoto')
  }
}
</script>
