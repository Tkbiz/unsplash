<template>
  <v-row v-if="card"
         class="card-large">
    <img @click.prevent="openModal()"
         class="col-12 col-sm-6 img-block"
         :src="card.urls.small ? card.urls.small : '@/assets/images/no-image.png'"
         alt="card image">
    <v-col
        cols="12"
        sm="6"
        class="py-0 custom-card">
      <div @click.prevent="openModal()"
           class="card-body">
        <div v-if="card.user.name"
             class="card-title">
          {{ card.user.name }}
        </div>
        <div v-if="card.alt_description" class="card-subtitle">
          {{ card.alt_description }}
        </div>
        <div v-if="card.description"
             class="card-text">
          {{card.description | truncate(140, '...')}}
        </div>
        <CardLargeCarousel
            :images="card.images"/>
        <div class="btn-group">
          <v-btn
              class="btn-order"
              outlined>
            order now
          </v-btn>
          <v-btn
              class="btn-menu"
              outlined>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-footer">
        <div class="ml-lg-n6">
          <v-btn
              @click.prevent="downloadPhoto(card.urls.small)"
              icon>
            <v-icon>
              mdi-bookmark-outline
            </v-icon>
          </v-btn>
        </div>
        <div>
          <div>
          <span class="mr-5">
            <v-btn
                @click.prevent="setLike"
                icon>
              <v-icon>
                mdi-heart-outline
              </v-icon>
            </v-btn>
            <span class="numbers">
              {{ card.likes }}
            </span>
          </span>
            <span>
            <v-btn
                @click.prevent="setComment"
                icon>
              <v-icon>
                mdi-message-outline
              </v-icon>
            </v-btn>
            <span class="numbers">
              {{ card.downloads }}
            </span>
          </span>
          </div>
        </div>
      </div>
      <Modal
          v-if="modal"
          :photoStats="photoStats"
          :tagName="tagName"
          :samePhotos="samePhotos"
          :card="card"
          :userName="userName"
          :visibleModal="modal"
          @close="closeModal"/>
    </v-col>
  </v-row>
</template>

<script>
import CardLargeCarousel from '@/components/cards/CardLargeCarousel'
import Modal from '@/components/modal/Modal'
import {truncateTextMixin} from '@/mixins/truncateTextMixin'

export default {
  name: 'CardLarge',
  mixins: [truncateTextMixin],
  props: {
    card: {
      type: Object,
      required: true
    },
    userName: {
      required: true
    }
  },
  components: {
    CardLargeCarousel,
    Modal
  },
  data: () => ({
    modal: false,
    tagName: '',
    samePhotos: [],
    photoStats: {},
    page: 1
  }),
  methods: {
    async openModal() {
      this.modal = true
      this.card.tags.forEach(tag => this.tagName = tag.title)
      this.samePhotos = await this.$store.dispatch('searchPhotos', {
        tagName: this.tagName,
        page: this.page
      })
      this.photoStats = await this.$store.dispatch('fetchPhotoStats', this.card.id)
    },
    closeModal() {
      this.modal = false
    },
    setLike() {
      console.log('was liked!')
    },
    setComment() {
      console.log('comment was written!')
    },
    async downloadPhoto(url) {
      await this.$store.dispatch('downloadPhoto', url)
    }
  }
}
</script>

<style scoped>

</style>
