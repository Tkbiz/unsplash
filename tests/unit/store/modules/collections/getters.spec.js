import getters from '@/store/modules/collections/getters'

test('getter collectionById', () => {
  const state = {
    collections: JSON.parse(localStorage.getItem('collections') || '[]').map(collection => collection)
  }
  const func = state => id => state.collections.find(collection => collection.id === id)
  // expect(getters.collectionById(getters.collectionById(func(state)))).toBe(state.collections)
})
