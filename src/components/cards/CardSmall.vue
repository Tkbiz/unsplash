<template>
  <v-col
      v-if="card"
      class="custom-card pa-0">
    <img @click.prevent="openModal(card)"
         class="card-img"
         :src="card.urls.small ? card.urls.small : '@/assets/images/no-image.png'"
         alt="card image">
    <div @click.prevent="openModal(card)"
         class="card-body">
      <div v-if="card.user.name"
           :class="{'mb-6': !card.user.location && !card.description}"
           class="card-title">
        {{ card.user.name }}
      </div>
      <div v-if="card.user.location"
           :class="{'mb-6': !card.description}"
           class="card-subtitle">
        {{ card.user.location }}
      </div>
      <div v-if="card.description"
           class="card-text">
        {{card.description | truncate(140, '...')}}
      </div>
    </div>
    <div class="card-footer">
      <div class="ml-n2">
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
</template>

<script>
import Modal from '@/components/modal/Modal'
import {truncateTextMixin} from '@/mixins/truncateTextMixin'

export default {
  name: 'CardSmall',
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
