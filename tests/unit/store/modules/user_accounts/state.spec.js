import state from '@/store/modules/user_accounts/state'

test('user_accounts state', () => {
  const userAccounts = []
  const userLikedPhotos = []
  const userCollections = []
  const isLiked = false
  const isAddedToCollection = false
  expect(JSON.stringify(state.userAccounts)).toBe(JSON.stringify(userAccounts))
  expect(JSON.stringify(state.userLikedPhotos)).toBe(JSON.stringify(userLikedPhotos))
  expect(JSON.stringify(state.userCollections)).toBe(JSON.stringify(userCollections))
  expect(state.isLiked).toBe(isLiked)
  expect(state.isAddedToCollection).toBe(isAddedToCollection)
})
