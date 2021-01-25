<template>
  <v-col v-if="userData"
         cols="12"
         class="py-0 mb-9">
    <v-row
        align="center">
      <v-avatar size="84">
        <img
            :src="userData.profile_image.large ? userData.profile_image.large : '@/assets/images/no-image.png'"
            alt="John">
      </v-avatar>
      <div>
        <div v-if="userData.name"
             class="avatar-title">
          {{ userData.name }}
        </div>
      </div>
    </v-row>
  </v-col>
</template>

<script>

export default {
  name: 'UserInfo',
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
}
</script>
