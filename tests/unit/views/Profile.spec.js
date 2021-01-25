import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Profile from '@/views/Profile'
import MyProfile from '@/components/me/MyProfile'

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
      accessToken: () => false,
      logInUser: () => ({
        photos: []
      }),
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

    wrapper = mount(Profile, {
      localVue,
      vuetify,
      store
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders MyProfile', () => {
    expect(wrapper.exists(MyProfile)).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders accessToken using computed options', () => {
    expect(wrapper.vm.accessToken).toBe(false)
  })

  it('renders logInUser using computed options', () => {
    const logInUser = {
      photos: []
    }
    expect(JSON.stringify(wrapper.vm.logInUser)).toBe(JSON.stringify(logInUser))
  })
})
