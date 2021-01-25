export default {
  fetchUserInfo(state, userAccountData) {
    state.userAccounts.push(userAccountData)
    localStorage.setItem('userAccounts', JSON.stringify(state.userAccounts))
  },
  fetchUserLikedPhotos(state, userLikedPhotos) {
    state.userLikedPhotos = userLikedPhotos
  },
  fetchUserCollections(state, userCollections) {
    state.userCollections = userCollections
  },
  addLike(state, isLiked) {
    state.isLiked = isLiked
  },
  addToCollection(state, isAddedToCollection) {
    state.isAddedToCollection = isAddedToCollection
  }
}
