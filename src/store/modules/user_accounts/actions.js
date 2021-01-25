import {unsplash} from '@/store/unsplash'
import axios from 'axios'

const accessToken = localStorage.getItem('accessToken')

export default {
  async fetchUserInfo({commit}, username) {
    try {
      const response = await unsplash.users.get({
        username
      })
      commit('fetchUserInfo', response.response)
      return response.response
    } catch (e) {
      console.log(e)
    }
  },
  async fetchUserLikedPhotos({commit}, username) {
    try {
      const response = await unsplash.users.getLikes({
        username
      })
      commit('fetchUserLikedPhotos', response.response.results)
      return response.response.results
    } catch (e) {
      console.log(e)
    }
  },
  async fetchUserCollections({commit}, username) {
    try {
      const response = await unsplash.users.getCollections({
        username
      })
      commit('fetchUserCollections', response.response.results)
      return response.response.results
    } catch (e) {
      console.log(e)
    }
  },
  async addLike({commit}, id) {
    try {
      const response = await axios.post(`${process.env.VUE_APP_UNSPLASH_BASE_API}/photos/${id}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      commit('addLike', response.data.photo.liked_by_user)
      return response.data
    } catch (e) {
      console.log(e)
    }
  },
  async addToCollection({commit}, payload) {
    try {
      const response = await axios.post(`${process.env.VUE_APP_UNSPLASH_BASE_API}/collections/${payload.collectionId}/add`, {photo_id: payload.photoId}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
