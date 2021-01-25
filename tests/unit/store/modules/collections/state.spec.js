import state from '@/store/modules/collections/state'

test('collections state', () => {
  const collections = []
  expect(JSON.stringify(state.collections)).toBe(JSON.stringify(collections))
})
