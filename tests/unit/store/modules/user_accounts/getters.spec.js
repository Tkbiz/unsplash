import getters from '@/store/modules/user_accounts/getters'

test('getters: logInUser and accessToken', () => {
  const state = {
    userAccounts: JSON.parse(localStorage.getItem('userAccounts') || '[]').map(userAccountData => userAccountData),
    userLikedPhotos: [],
    userCollections: [],
    isLiked: false,
    isAddedToCollection: false
  }
  console.log(getters.userAccountById(state => id => state.userAccounts.find(userAccountData => userAccountData.id === id)))
  console.log(state.userAccounts)
  // userAccountById: state => id => state.userAccounts.find(userAccountData => userAccountData.id === id),
  // expect(getters.userAccountById(state)).toBe(state.userAccounts)
  expect(getters.userLikedPhotos(state)).toBe(state.userLikedPhotos)
  expect(getters.userCollections(state)).toBe(state.userCollections)
  expect(getters.isAddedToCollection(state)).toBe(state.isAddedToCollection)
  expect(getters.isLiked(state)).toBe(state.isLiked)
})
