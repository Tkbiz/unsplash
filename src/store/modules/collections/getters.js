export default {
  collectionById: state => id => state.collections.find(collection => collection.id === id)
}
