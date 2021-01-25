export default {
  userAccountById: state => id => state.userAccounts.find(userAccountData => userAccountData.id === id),
  userLikedPhotos: state => state.userLikedPhotos,
  userCollections: state => state.userCollections,
  isAddedToCollection: state => state.isAddedToCollection,
  isLiked: state => state.isLiked
}
