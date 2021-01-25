import mutations from '@/store/modules/user_accounts/mutations'

describe('mutations user_accounts', () => {
  test('fetchUserInfo mutates state.userAccounts', () => {
    const state = {
      userAccounts: JSON.parse(localStorage.getItem('userAccounts') || '[]')
    }
    const userAccountData = {}
    mutations.fetchUserInfo(state, userAccountData)
    state.userAccounts.push(userAccountData)
    localStorage.setItem('userAccounts', JSON.stringify(state.userAccounts))
  })

  test('fetchUserLikedPhotos mutates state.userLikedPhotos', () => {
    const state = {
      userLikedPhotos: []
    }
    const userLikedPhotos = []
    mutations.fetchUserLikedPhotos(state, userLikedPhotos)
    expect(state.userLikedPhotos).toBe(userLikedPhotos)
  })

  test('fetchUserCollections mutates state.userCollections', () => {
    const state = {
      userCollections: []
    }
    const userCollections = []
    mutations.fetchUserCollections(state, userCollections)
    expect(state.userCollections).toBe(userCollections)
  })

  test('addLike mutates state.isLiked', () => {
    const state = {
      isLiked: false
    }
    const isLiked = false
    mutations.addLike(state, isLiked)
    expect(state.isLiked).toBe(isLiked)
  })

  test('addToCollection mutates state.isAddedToCollection', () => {
    const state = {
      isAddedToCollection: false
    }
    const isAddedToCollection = false
    mutations.addToCollection(state, isAddedToCollection)
    expect(state.isAddedToCollection).toBe(isAddedToCollection)
  })
})
