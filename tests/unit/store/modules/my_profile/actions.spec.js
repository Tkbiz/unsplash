import actions from '@/store/modules/my_profile/actions'
import mockAxios from 'axios'

jest.mock('axios')

describe('my_profile actions', () => {
  test('login user by api method', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const authorizationCode = 'code'

    mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {access_token: 'token'}
        })
    )

    await actions.login({commit, dispatch}, authorizationCode)
    expect(commit).toHaveBeenCalledWith('setAccessToken', 'token')
    expect(dispatch).toHaveBeenCalledWith('fetchUser', 'token')
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(
        `${process.env.VUE_APP_UNSPLASH_AUTH_TOKEN}?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}&client_secret=${process.env.VUE_APP_UNSPLASH_SECRET_KEY}&redirect_uri=${process.env.VUE_APP_UNSPLASH_REDIRECT_URI}&code=${authorizationCode}&grant_type=${process.env.VUE_APP_UNSPLASH_GRANT_TYPE}`
    )
  })

  test('logout user', () => {
    const commit = jest.fn()
    actions.logout({commit})
    expect(commit).toHaveBeenCalledWith('logout')
  })

  test('fetch user by api method', async () => {
    const commit = jest.fn()
    const token = 'token'

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {}
        })
    )

    await actions.fetchUser({commit}, token)
    expect(commit).toHaveBeenCalledWith('loginUser', {})
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledWith(
        `${process.env.VUE_APP_UNSPLASH_BASE_API}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
    )
  })
})
