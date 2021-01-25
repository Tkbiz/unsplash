export const unsplash = {
  collections: {
    list: jest.fn(() => Promise.resolve({response: {}})),
    getPhotos: () => Promise.resolve({response: {}})
  },
  photos: {
    getRandom: () => Promise.resolve({response: {}}),
    getStats: () => Promise.resolve({response: {}})
  },
  search: {
    getPhotos: () => Promise.resolve({response: {}})
  }
}
