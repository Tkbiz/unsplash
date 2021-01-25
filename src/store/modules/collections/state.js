export default {
  collections: JSON.parse(localStorage.getItem('collections') || '[]').map(collection => collection)
}
