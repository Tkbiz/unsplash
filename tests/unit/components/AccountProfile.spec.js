import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import AccountProfile from '@/components/user-account/AccountProfile'
import AccountProfileInfo from '@/components/user-account/AccountProfileInfo'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AccountProfile.vue', () => {
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

    wrapper = mount(AccountProfile, {
      localVue,
      vuetify,
      store,
      propsData: {
        userAccountId: {
          photos: []
        }
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders AccountProfileInfo', () => {
    expect(wrapper.exists(AccountProfileInfo)).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders props when passed', () => {
    const userAccountId = {
      photos: []
    }
    expect(wrapper.props()).toEqual({userAccountId})
  })
})
