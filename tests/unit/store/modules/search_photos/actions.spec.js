import actions from '@/store/modules/search_photos/actions'
import {unsplash} from '@/store/unsplash'

jest.mock('@/store/unsplash')

describe('actions search_photos', () => {
  test('fetch searching photo by api method', async () => {
    unsplash.search.getPhotos.mockImplementationOnce(() =>
        Promise.resolve({
          response: {
            results: []
          }
        })
    )

    const commit = jest.fn()
    const payload = {}
    await actions.searchPhotos({commit}, payload)
    expect(commit).toHaveBeenCalledWith('updatePhotos', [])
    expect(unsplash.search.getPhotos).toHaveBeenCalledTimes(1)
    expect(unsplash.search.getPhotos).toHaveBeenCalledWith(
        {
          query: payload.tagName,
          page: payload.page,
          perPage: 10,
          orientation: payload.orientation
        }
    )
  })

  test('fetch photo stats by api method', async () => {
    unsplash.photos.getStats.mockImplementationOnce(() =>
        Promise.resolve({
          response: {}
        })
    )

    const commit = jest.fn()
    const id = 'id'
    await actions.fetchPhotoStats({commit}, id)
    expect(unsplash.photos.getStats).toHaveBeenCalledTimes(1)
  })
})
