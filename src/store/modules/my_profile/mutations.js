export default {
  loginUser(state, user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    localStorage.setItem('accessToken', accessToken)
  },
  logout(state) {
    state.accessToken = JSON.stringify(localStorage.removeItem('accessToken'))
  }
}
