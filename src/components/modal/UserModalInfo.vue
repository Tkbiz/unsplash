<template>
  <v-col cols="12"
         class="py-0 mb-9">
    <v-row
        v-if="userCard"
        align="center">
      <v-avatar
          v-if="userCard.profile_image"
          @click.prevent="openUserProfile(userCard.id)"
          size="84">
        <img
            :src="userCard.profile_image.large ? userCard.profile_image.large : '@/assets/images/no-image.png'"
            alt="John">
      </v-avatar>
      <div>
        <div v-if="userCard.name"
             @click.prevent="openUserProfile(userCard.id)"
             class="avatar-title">
          {{ userCard.name }}
        </div>
        <div v-if="userCard.location"
             class="avatar-nick">
          {{ userCard.location }}
        </div>
      </div>
    </v-row>
  </v-col>
</template>

<script>

export default {
  name: 'UserModalInfo',
  props: {
    userCard: {
      type: Object,
      required: true
    }
  },
  methods: {
    async openUserProfile(id) {
      if (this.userCard.username) {
        await this.$store.dispatch('fetchUserInfo', this.userCard.username)
        await this.$router.push(`/user-account/${id}`)
      }
    }
  }
}
</script>
