export default function auth({next, store}) {
  if (!store.getters.accessToken) {
    return next({
      name: 'Home'
    })
  }
  return next()
}
