import actions from '@/store/modules/collections/actions'
import {unsplash} from '@/store/unsplash'

jest.mock('@/store/unsplash')

describe('actions collection', () => {
  test('fetch collections list by api method', async () => {
    unsplash.collections.list.mockImplementationOnce(() =>
        Promise.resolve({
          response: {
            results: []
          }
        })
    )

    await actions.fetchListCollections()
    expect(unsplash.collections.list).toHaveBeenCalledTimes(1)
  })

  test('fetch collection photos by api method', async () => {
    unsplash.collections.getPhotos.mockImplementationOnce(() =>
        Promise.resolve({
          response: {
            results: []
          }
        })
    )

    const commit = jest.fn()
    const payload = {}

    await actions.fetchCollection({commit}, payload)
    expect(commit).toHaveBeenCalledWith('fetchCollection', {
      collection: [],
      id: payload.id,
      user: payload.user,
      title: payload.title
    })
    expect(unsplash.collections.getPhotos).toHaveBeenCalledTimes(1)
  })
})
