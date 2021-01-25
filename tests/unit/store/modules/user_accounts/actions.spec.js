import actions from '@/store/modules/user_accounts/actions'
import mockAxios from 'axios'
import {unsplash} from '@/store/unsplash'

jest.mock('axios')
jest.mock('@/store/unsplash')

describe('actions user_accounts', () => {
  test('fetch user info by api method', async () => {
    unsplash.users.get.mockImplementationOnce(() =>
        Promise.resolve({
          response: {}
        })
    )

    const commit = jest.fn()
    const username = 'username'

    await actions.fetchUserInfo({commit}, username)
    expect(commit).toHaveBeenCalledWith('fetchUserInfo', {})
    expect(unsplash.users.get).toHaveBeenCalledTimes(1)
    expect(unsplash.users.get).toHaveBeenCalledWith({
      username
    })
  })

  test('fetch user liked photos by api method', async () => {
    unsplash.users.getLikes.mockImplementationOnce(() =>
        Promise.resolve({
          response: {
            results: []
          }
        })
    )

    const commit = jest.fn()
    const username = 'username'

    await actions.fetchUserLikedPhotos({commit}, username)
    expect(commit).toHaveBeenCalledWith('fetchUserLikedPhotos', [])
    expect(unsplash.users.getLikes).toHaveBeenCalledTimes(1)
    expect(unsplash.users.getLikes).toHaveBeenCalledWith({
      username
    })
  })

  test('fetch user collections by api method', async () => {
    unsplash.users.getCollections.mockImplementationOnce(() =>
        Promise.resolve({
          response: {
            results: []
          }
        })
    )

    const commit = jest.fn()
    const username = 'username'

    await actions.fetchUserCollections({commit}, username)
    expect(commit).toHaveBeenCalledWith('fetchUserCollections', [])
    expect(unsplash.users.getCollections).toHaveBeenCalledTimes(1)
    expect(unsplash.users.getCollections).toHaveBeenCalledWith({
      username
    })
  })

  test('add like by api method', async () => {
    const commit = jest.fn()
    const id = 'id'
    const accessToken = null

    mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            photo: {
              liked_by_user: true
            }
          }
        })
    )

    await actions.addLike({commit}, id)
    expect(commit).toHaveBeenCalledWith('addLike', true)
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(mockAxios.post).toHaveBeenCalledWith(
        `${process.env.VUE_APP_UNSPLASH_BASE_API}/photos/${id}/like`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
    )
  })

  test('add photo to user collection by api method', async () => {
    const commit = jest.fn()
    const payload = {}
    const accessToken = null

    mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {}
        })
    )

    await actions.addToCollection({commit}, payload)
    expect(mockAxios.post).toHaveBeenCalledTimes(2)
    expect(mockAxios.post).toHaveBeenCalledWith(
        `${process.env.VUE_APP_UNSPLASH_BASE_API}/collections/${payload.collectionId}/add`, {photo_id: payload.photoId}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
    )
  })
})
