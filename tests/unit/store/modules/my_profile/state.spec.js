import state from '@/store/modules/my_profile/state'

describe('my_profile state', () => {
  test('user state', () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    expect(JSON.stringify(state.user)).toBe(JSON.stringify(user))
  })

  test('accessToken state', () => {
    const accessToken = null
    expect(state.accessToken).toBe(accessToken)
  })
})
