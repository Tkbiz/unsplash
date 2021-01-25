import actions from '@/store/modules/download_photo/actions'
import mockAxios from 'axios'
import axios from "axios";

jest.mock('axios')

test('download photo by api method', async () => {
  const url = 'url'

  mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {}
      })
  )

  URL.createObjectURL = jest.fn()
  URL.revokeObjectURL = jest.fn()

  const link = document.createElement('a')
  const blob = {}
  link.href = URL.createObjectURL(blob)
  link.download = 'image.jpg'
  link.click()
  URL.revokeObjectURL(link.href)

  await actions.downloadPhoto({}, url)
  expect(mockAxios.get).toHaveBeenCalledTimes(1)
})
