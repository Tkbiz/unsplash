<template>
  <div class="custom-navbar">
    <v-navigation-drawer
        v-model="sidebar"
        app
        class="hidden-md-and-up">
      <v-list>
        <v-list-item
            to="/">
          <v-list-item-content>
            Home
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            to="/collections-list">
          <v-list-item-content>
            Featured collections
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-if="isLoggedIn"
            to="/profile">
          <v-list-item-content>
            My profile
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
          class="d-block"
          icon>
        <v-img
            class="search-icon"
            src="@/assets/images/icons/search.svg">
        </v-img>
      </v-btn>
      <v-btn
          class="d-block"
          icon>
        <v-img
            class="login-icon"
            src="@/assets/images/icons/login.svg">
        </v-img>
      </v-btn>
    </v-navigation-drawer>
    <v-app-bar class="white"
               height="100"
               app>
      <v-container>
        <v-row class="align-center hidden-md-and-up">
          <v-app-bar-nav-icon
              @click="sidebar = !sidebar">
          </v-app-bar-nav-icon>
        </v-row>
        <v-row class="align-center hidden-sm-and-down">
          <v-spacer></v-spacer>
          <v-list>
            <v-list-item
                to="/">
              <v-list-item-content>
                Home
              </v-list-item-content>
            </v-list-item>
            <v-list-item
                to="/collections-list">
              <v-list-item-content>
                Featured collections
              </v-list-item-content>
            </v-list-item>
            <v-list-item
                v-if="isLoggedIn"
                to="/profile">
              <v-list-item-content>
                My profile
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <a
              v-if="!isLoggedIn"
              :href="loginUrl"
              class="v-btn v-btn--flat v-btn--icon v-btn--round theme--light">
            <v-img
                class="login-icon"
                src="@/assets/images/icons/login.svg">
            </v-img>
          </a>
          <span
              v-else
              @click.prevent="logout"
              class="v-btn v-btn--flat v-btn--icon v-btn--round theme--light cursor-pointer">
            <v-img
                class="login-icon"
                src="@/assets/images/icons/logout.svg">
            </v-img>
          </span>
          <v-btn icon>
            <v-img
                class="search-icon"
                src="@/assets/images/icons/search.svg">
            </v-img>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    sidebar: false
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      if (this.$route.path !== '/') {
        await this.$router.push('/')
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.accessToken
    },
    loginUrl() {
      return (`${process.env.VUE_APP_UNSPLASH_AUTH}?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${process.env.VUE_APP_UNSPLASH_REDIRECT_URI}&response_type=${process.env.VUE_APP_UNSPLASH_RESPONSE_TYPE}&scope=${process.env.VUE_APP_UNSPLASH_SCOPE}`)
    }
  },
  async mounted() {
    if (this.$route.query.code) {
      await this.$store.dispatch('login', this.$route.query.code)
      await this.$router.push('/')
    }
  }
}
</script>
