import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Home from '@/views/Home'
import Loader from '@/components/app/Loader'
import MainBanner from '@/components/MainBanner'
import Cards from '@/components/cards/Cards'
import {bus} from '@/bus'

Vue.use(Vuetify)
Vue.component('Loader', Loader)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home.vue', () => {
  let vuetify
  let wrapper
  let actions
  let mutations
  let getters
  let store
  const spy = {}

  const observe = jest.fn()
  const unobserve = jest.fn()
  const disconnect = jest.fn()

  window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect
  }))

  beforeEach(() => {
    vuetify = new Vuetify()

    spy.setNewPhotos = jest.spyOn(Home.methods, 'setNewPhotos')

    getters = {
      photosList: () => ([]),
      accessToken: () => false,
      logInUser: () => ({})
    }
    actions = {
      searchPhotos: jest.fn(),
      fetchRandomPhoto: jest.fn()
    }
    mutations = {
      fetchTagName: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions,
      mutations
    })

    wrapper = mount(Home, {
      localVue,
      vuetify,
      store,
      data: () => ({
        showErrorMessage: false,
        photos: [],
        tags: [
          'nature',
          'travel',
          'animals',
          'food',
          'health',
          'technology',
          'events'
        ],
        page: 1,
        loading: true,
        errorMessage: 'Please fill in the correct tag name!'
      })
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders MainBanner', () => {
    expect(wrapper.exists(MainBanner)).toBe(true)
  })

  it('renders Loader', () => {
    expect(wrapper.exists(Loader)).toBe(true)
  })

  it('renders Cards', () => {
    expect(wrapper.exists(Cards)).toBe(true)
  })

  it('renders bus event', () => {
    expect(wrapper.exists(bus)).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders photosList using computed options', () => {
    wrapper.setData({photosList: []})
    expect(JSON.stringify(wrapper.vm.photosList)).toBe(JSON.stringify([]))
  })

  it('dispatches a searchPhotos action on mounted hook', () => {
    expect(actions.searchPhotos).toHaveBeenCalled()
    expect(actions.searchPhotos.mock.calls).toHaveLength(1)
  })

  it('commits tagName on mounted hook', () => {
    expect(mutations.fetchTagName).toHaveBeenCalled()
  })

  it('renders logInUser using computed options', () => {
    expect(JSON.stringify(wrapper.vm.logInUser)).toBe(JSON.stringify({}))
  })

  it('renders accessToken using computed options', () => {
    expect(wrapper.vm.accessToken).toBe(false)
  })

  it('calls setNewPhotos method on mounted hook', () => {
    expect(spy.setNewPhotos).toHaveBeenCalled()
  })
})
