import {unsplash} from '@/store/unsplash'

export default {
  async fetchRandomPhoto() {
    try {
      const response = await unsplash.photos.getRandom({})
      return response.response
    } catch (e) {
      console.log(e)
    }
  }
}
