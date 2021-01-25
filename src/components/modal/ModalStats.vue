<template>
  <v-col cols="12"
         class="py-0 stats-block">
    <v-row>
      <h3 class="stats-title">
        Photo's statistic:
      </h3>
      <div v-if="photoStats.downloads"
           class="col-12 stats-info">
        Download:
        {{ photoStats.downloads.total }}
      </div>
      <div v-if="photoStats.likes"
           class="col-12 stats-info">
        Likes:
        {{ photoStats.likes.total }}
      </div>
      <div v-if="photoStats.views"
           class="col-12 stats-info">
        View:
        {{ photoStats.views.total }}
      </div>
      <div v-if="tags"
           class="col-12 stats-info">
        Tags:
        <span v-for="tag in tags"
              :key="tag.title">
                {{ tag.title }}
              </span>
      </div>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'ModalStats',
  props: {
    photoStats: {
      type: Object,
      required: true
    },
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
