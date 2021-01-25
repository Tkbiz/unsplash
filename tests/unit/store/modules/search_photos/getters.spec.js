import getters from '@/store/modules/search_photos/getters'

test('getters: photos and tagName', () => {
  const state = {
    tagName: '',
    photos: []
  }
  expect(getters.tagName(state)).toBe(state.tagName)
  expect(getters.photos(state)).toBe(state.photos)
})
