import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import MyProfileInfo from '@/components/me/MyProfileInfo'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyProfileInfo.vue', () => {
  let vuetify
  let wrapper
  let actions
  let getters
  let store

  beforeEach(() => {
    vuetify = new Vuetify()

    getters = {
      userLikedPhotos: () => ([]),
      userCollections: () => ([])
    }
    actions = {
      fetchUserLikedPhotos: jest.fn(),
      fetchUserCollections: jest.fn(),
      downloadPhoto: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions
    })

    wrapper = mount(MyProfileInfo, {
      localVue,
      vuetify,
      store,
      propsData: {
        logInUser: {
          photos: []
        }
      },
      data: () => ({
        tab: null,
        noPhotos: 'Not found any photos!'
      })
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders props when passed', () => {
    const logInUser = {
      photos: []
    }
    expect(wrapper.props()).toEqual({logInUser})
  })

  it('renders userLikedPhotos using computed options', () => {
    expect(JSON.stringify(wrapper.vm.userLikedPhotos)).toBe(JSON.stringify([]))
  })

  it('renders userCollections using computed options', () => {
    expect(JSON.stringify(wrapper.vm.userCollections)).toBe(JSON.stringify([]))
  })

  it('dispatches a fetchUserLikedPhotos action on mounted hook', async () => {
    expect(actions.fetchUserLikedPhotos.mock.calls).toHaveLength(1)
    expect(actions.fetchUserLikedPhotos).toHaveBeenCalled()
  })

  it('dispatches a fetchUserCollections action on mounted hook', async () => {
    expect(actions.fetchUserCollections.mock.calls).toHaveLength(1)
    expect(actions.fetchUserCollections).toHaveBeenCalled()
  })
})
