<template>
  <div>
    <MyProfile
        v-if="logInUser"
        :logInUser="logInUser"/>
  </div>
</template>

<script>
import MyProfile from '@/components/me/MyProfile'

export default {
  name: 'Profile',
  components: {
    MyProfile
  },
  computed: {
    accessToken() {
      return this.$store.getters.accessToken
    },
    logInUser() {
      return this.$store.getters.logInUser
    }
  }
}
</script>
