export default {
  fetchCollection(state, collection) {
    state.collections.push(collection)
    localStorage.setItem('collections', JSON.stringify(state.collections))
  }
}
