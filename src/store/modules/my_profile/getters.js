export default {
  logInUser: state => state.user,
  accessToken: state => !!state.accessToken
}
