import mutations from '@/store/modules/search_photos/mutations'

describe('mutations search_photos', () => {
  test('updatePhotos mutates state.photos', () => {
    const state = {
      photos: []
    }
    const photos = [{}, {}]
    mutations.updatePhotos(state, photos)
    expect(state.photos).toBe(photos)
  })

  test('fetchTagName mutates state.tagName', () => {
    const state = {
      tagName: 'love'
    }
    const tagName = 'love'
    mutations.updatePhotos(state, tagName)
    expect(state.tagName).toBe(tagName)
  })

})
