<template>
  <div class="account-profile">
    <AccountProfile
        :userAccountId="userAccountId"/>
  </div>
</template>

<script>
import AccountProfile from '@/components/user-account/AccountProfile'

export default {
  name: 'UserAccount',
  components: {
    AccountProfile
  },
  computed: {
    userAccountId() {
      return this.$store.getters.userAccountById(this.$route.params.id)
    }
  }
}
</script>
