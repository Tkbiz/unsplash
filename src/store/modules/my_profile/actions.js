import axios from 'axios'

export default {
  async login({commit, dispatch}, authorizationCode) {
    try {
      const response = await axios.post(`${process.env.VUE_APP_UNSPLASH_AUTH_TOKEN}?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}&client_secret=${process.env.VUE_APP_UNSPLASH_SECRET_KEY}&redirect_uri=${process.env.VUE_APP_UNSPLASH_REDIRECT_URI}&code=${authorizationCode}&grant_type=${process.env.VUE_APP_UNSPLASH_GRANT_TYPE}`)
      commit('setAccessToken', response.data.access_token)
      await dispatch('fetchUser', response.data.access_token)
    } catch (e) {
      console.log(e)
    }
  },
  logout({commit}) {
    commit('logout')
  },
  async fetchUser({commit}, token) {
    try {
      if (token) {
        const response = await axios.get(`${process.env.VUE_APP_UNSPLASH_BASE_API}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        commit('loginUser', response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
