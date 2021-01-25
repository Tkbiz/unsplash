import {unsplash} from '@/store/unsplash'

export default {
  async fetchListCollections() {
    try {
      const response = await unsplash.collections.list({})
      return response.response.results
    } catch (e) {
      console.log(e)
    }
  },
  async fetchCollection({commit}, payload) {
    try {
      const response = await unsplash.collections.getPhotos({
        collectionId: payload.id
      })
      commit('fetchCollection', {
        collection: response.response.results,
        id: payload.id,
        user: payload.user,
        title: payload.title
      })
      return response.response.results
    } catch (e) {
      console.log(e)
    }
  }
}
