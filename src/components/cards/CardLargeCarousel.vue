<template>
  <carousel class="custom-carousel"
            :paginationEnabled="false"
            :perPage="2">
    <slide v-for="(item,i) in images"
           :key="i">
      <img
          class="carousel-img"
          :src="item.src"
          alt="carousel image">
    </slide>
  </carousel>
</template>

<script>

export default {
  name: 'CardLargeCarousel',
  props: {
    images: Array
  }
}
</script>

<style scoped>

</style>