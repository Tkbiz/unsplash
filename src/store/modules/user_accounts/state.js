export default {
  userAccounts: JSON.parse(localStorage.getItem('userAccounts') || '[]').map(userAccountData => userAccountData),
  userLikedPhotos: [],
  userCollections: [],
  isLiked: false,
  isAddedToCollection: false
}
