import state from '@/store/modules/search_photos/state'

test('search_photos state', () => {
  const tagName = ''
  const photos = []
  expect(JSON.stringify(state.tagName)).toBe(JSON.stringify(tagName))
  expect(JSON.stringify(state.photos)).toBe(JSON.stringify(photos))
})
