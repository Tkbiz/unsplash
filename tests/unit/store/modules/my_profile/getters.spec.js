import getters from '@/store/modules/my_profile/getters'

test('getters: logInUser and accessToken', () => {
  const state = {
    user: {},
    accessToken: false
  }
  expect(getters.logInUser(state)).toBe(state.user)
  expect(getters.accessToken(state)).toBe(!!state.accessToken)
})
