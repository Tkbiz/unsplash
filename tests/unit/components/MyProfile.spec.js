import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import MyProfile from '@/components/me/MyProfile'
import MyProfileInfo from '@/components/me/MyProfileInfo'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MyProfile.vue', () => {
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

    wrapper = mount(MyProfile, {
      localVue,
      vuetify,
      store,
      propsData: {
        logInUser: {
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

  it("renders MyProfileInfo", () => {
    expect(wrapper.exists(MyProfileInfo)).toBe(true)
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
})
