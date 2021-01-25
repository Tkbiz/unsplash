<template>
  <div>
    <CollectionData
        :collectionData="collectionData"/>
  </div>
</template>

<script>
import CollectionData from '@/components/collections/CollectionData'

export default {
  name: 'Collection',
  props: ['item'],
  components: {
    CollectionData
  },
  computed: {
    collectionData() {
      return this.$store.getters.collectionById(this.$route.params.id)
    }
  }
}
</script>
