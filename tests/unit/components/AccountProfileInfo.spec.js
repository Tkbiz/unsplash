import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import AccountProfileInfo from '@/components/user-account/AccountProfileInfo'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AccountProfileInfo.vue', () => {
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
      fetchUserCollections: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions
    })

    wrapper = mount(AccountProfileInfo, {
      localVue,
      vuetify,
      store,
      propsData: {
        userAccountId: {
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

  it('renders props.userAccountId when passed', () => {
    const userAccountId = {
      photos: []
    }
    expect(wrapper.props()).toEqual({userAccountId})
  })

  it('renders userLikedPhotos using computed options', () => {
    expect(JSON.stringify(wrapper.vm.userLikedPhotos)).toBe(JSON.stringify([]))
  })

  it('renders userCollections using computed options', () => {
    expect(JSON.stringify(wrapper.vm.userCollections)).toBe(JSON.stringify([]))
  })

  it('dispatches an action on mounted hook', () => {
    expect(actions.fetchUserLikedPhotos).toHaveBeenCalled()
    expect(actions.fetchUserLikedPhotos.mock.calls).toHaveLength(1)
    expect(actions.fetchUserCollections).toHaveBeenCalled()
    expect(actions.fetchUserCollections.mock.calls).toHaveLength(1)
  })
})
