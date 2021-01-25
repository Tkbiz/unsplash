import mutations from '@/store/modules/my_profile/mutations'

describe('mutations my_profile', () => {
  test('loginUser mutates state.user', () => {
    const state = {
      user: {}
    }
    const user = {}
    mutations.loginUser(state, user)
    expect(state.user).toBe(user)
  })

  test('setAccessToken mutates state.accessToken', () => {
    const state = {
      accessToken: null
    }
    const accessToken = null
    mutations.setAccessToken(state, accessToken)
    expect(state.accessToken).toBe(accessToken)

    localStorage.setItem('accessToken', state.accessToken)
    expect(localStorage.getItem('accessToken')).toBeTruthy()
  })

  test('logout mutates state.accessToken', () => {
    const state = {
      accessToken: null
    }
    mutations.logout(state)
    expect(state.accessToken).toBeUndefined()
  })
})
