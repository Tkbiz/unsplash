<template>
  <v-container
      class="collections">
    <h2 class="collection-title">
      {{ collectionData.title }}
    </h2>
    <UserInfo
        :userData="collectionData.user"/>
    <v-row>
      <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="photo in collectionData.collection"
          :key="photo.id">
        <img
            :src="photo.urls.small ? photo.urls.small : '@/assets/images/no-image.png'"
            class="collection-img"
            alt="collection photo">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserInfo from '@/components/collections/UserInfo'

export default {
  name: 'CollectionData',
  props: {
    collectionData: {
      type: Object,
      required: true
    }
  },
  components: {
    UserInfo
  }
}
</script>
