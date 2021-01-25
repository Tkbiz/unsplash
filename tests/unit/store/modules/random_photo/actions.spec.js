import actions from '@/store/modules/random_photo/actions'
import {unsplash} from '@/store/unsplash'

jest.mock('@/store/unsplash')

describe('actions random_photo', () => {
  test('fetch random photo by api method', async () => {
    unsplash.photos.getRandom.mockImplementationOnce(() =>
        Promise.resolve({
          response: {}
        })
    )

    await actions.fetchRandomPhoto({})
    expect(unsplash.photos.getRandom).toHaveBeenCalledTimes(1)

  })
})
