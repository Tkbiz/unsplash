<template>
  <v-app>
    <Navbar app/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "assets/fonts/fonts.css";
@import "assets/scss/main.scss";
</style>
