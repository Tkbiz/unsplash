import {unsplash} from '@/store/unsplash'

export default {
  async searchPhotos({commit}, payload) {
    try {
      const response = await unsplash.search.getPhotos({
        query: payload.tagName,
        page: payload.page,
        perPage: 10,
        orientation: payload.orientation
      })
      commit('updatePhotos', response.response.results)
      return response.response.results
    } catch (e) {
      console.log(e)
    }
  },
  async fetchPhotoStats({commit}, id) {
    try {
      const response = await unsplash.photos.getStats({
        photoId: id
      })
      return response.response
    } catch (e) {
      console.log(e)
    }
  }
}
