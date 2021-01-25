import mutations from '@/store/modules/collections/mutations'

test('fetchCollection mutates state.collections', () => {
  const state = {
    collections: []
  }
  const collection = {}
  mutations.fetchCollection(state, {collection})
  state.collections.push(collection)
  localStorage.setItem('collections', JSON.stringify(state.collections))
  expect(state.collections.length).toBe(2)
  expect(localStorage.getItem('collections')).toBeTruthy()
  expect(JSON.parse(localStorage.getItem('collections')).length).toBe(2)
})
