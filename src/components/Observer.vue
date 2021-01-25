<template>
  <div class="observer"/>
</template>

<script>
export default {
  props: ['options'],
  data: () => ({
    observer: null
  }),
  methods: {
    intersectionCallback(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.$emit('intersect')
        }
      })
    }
  },
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(this.intersectionCallback, options)
    this.observer.observe(this.$el)
  },
  destroyed() {
    this.observer.disconnect()
  }
}
</script>
