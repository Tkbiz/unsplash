<template>
  <v-layout
      row
      justify-center>
    <v-dialog
        content-class="custom-dialog"
        persistent
        v-model="showModal">
      <v-btn
          class="btn-close"
          icon
          @click.prevent="closeModal">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <div class="dialog-body">
        <v-col class="image-block">
          <v-img
              v-if="card.urls"
              class="main-img"
              :src="card.urls.regular ? card.urls.regular : '@/assets/images/no-image.png'">
          </v-img>
          <v-col class="action-block">
            <v-btn
                class="mr-2 btn-like"
                :class="{'btn-active': isLiked}"
                icon
                @click.prevent="addLike(card.id)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn
                class="btn-add"
                :class="{'btn-active': isAddedToCollection}"
                icon
                @click.prevent="openCollectionsList">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-alert
                class="custom-alert"
                v-if="showMessage"
                type="warning">
              Please log in to do it!
            </v-alert>
            <v-alert
                class="collections-alert"
                v-model="showCollectionsList"
                text>
              <v-card>
                <v-card-title
                    v-for="collection in userCollections"
                    :key="collection.id"
                    @click.prevent="addToCollection(collection.id, card.id)"
                    class="headline cursor-pointer">
                  {{ collection.title }}
                </v-card-title>
              </v-card>
            </v-alert>
          </v-col>
        </v-col>
        <v-col v-if="card.description"
               cols="12"
               class="py-0 stats-block">
          <v-row>
            <div class="col-12 stats-info stats-description">
              {{ card.description }}
            </div>
          </v-row>
        </v-col>
        <UserModalInfo
            :userCard="card.user"/>
        <ModalStats
            :photoStats="photoStats"
            :tags="card.tags"/>
        <v-col cols="12 mb-6">
          <v-row>
            <div v-if="photoStats.views">
              <ViewsChart
                  :photoViews="photoStats.views"/>
            </div>
            <div v-if="photoStats.likes">
              <LikesChart
                  :photoLikes="photoStats.likes"/>
            </div>
          </v-row>
        </v-col>
        <v-col v-if="samePhotos"
               cols="12"
               class="pa-0">
          <v-row justify="start">
            <div class="block-img"
                 v-for="item in samePhotos"
                 :key="item.id">
              <img
                  class="image"
                  :src="item.urls.thumb ? item.urls.thumb : '@/assets/images/no-image.png'"
                  alt="card image">
            </div>
          </v-row>
        </v-col>
        <Loader v-if="loading"/>
        <v-col v-if="sameNewPhotos"
               cols="12"
               class="py-0">
          <v-row
              justify="center">
            <v-btn
                icon
                @click.prevent="showMoreImages">
              <v-icon
                  class="dots">
                mdi-dots-horizontal
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </div>
    </v-dialog>
  </v-layout>
</template>

<script>
import ViewsChart from '@/components/charts/ViewsChart'
import LikesChart from '@/components/charts/LikesChart'
import ModalStats from '@/components/modal/ModalStats'
import UserModalInfo from '@/components/modal/UserModalInfo'

export default {
  name: 'Modal',
  props: {
    visibleModal: {
      type: Boolean,
      required: true
    },
    card: {
      type: Object,
      required: true
    },
    samePhotos: {
      type: Array,
      required: true
    },
    tagName: {
      type: String,
      required: true
    },
    photoStats: {
      type: Object,
      required: true
    },
    userName: {
      type: String
    }
  },
  components: {
    UserModalInfo,
    ModalStats,
    ViewsChart,
    LikesChart
  },
  data: () => ({
    page: 1,
    sameNewPhotos: [],
    loading: false,
    showMessage: false,
    showCollectionsList: false
  }),
  methods: {
    closeModal() {
      this.showModal = false
    },
    async showMoreImages() {
      this.loading = true
      this.page++
      this.sameNewPhotos = await this.$store.dispatch('searchPhotos', {
        tagName: this.tagName,
        page: this.page
      })
      this.sameNewPhotos.map(newPhoto => this.samePhotos.push(newPhoto))
      this.loading = false
    },
    async addLike(id) {
      if (this.isLoggedIn) {
        if (this.isLiked !== true) {
          await this.$store.dispatch('addLike', id)
        }
      } else {
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 2000)
      }
    },
    async openCollectionsList() {
      if (this.isLoggedIn) {
        this.showCollectionsList = true
        await this.$store.dispatch('fetchUserCollections', this.userName)
      } else {
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 2000)
      }
    },
    async addToCollection(collectionId, photoId) {
      await this.$store.dispatch('addToCollection', {collectionId, photoId})
      this.showCollectionsList = false
    }
  },
  computed: {
    showModal: {
      get() {
        return this.visibleModal
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    },
    isLoggedIn() {
      return this.$store.getters.accessToken
    },
    userCollections() {
      return this.$store.getters.userCollections
    },
    isAddedToCollection() {
      return this.$store.getters.isAddedToCollection
    },
    isLiked() {
      return this.$store.getters.isLiked
    }
  }
}
</script>
