import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Cards from '@/components/cards/Cards'
import CardSmall from '@/components/cards/CardSmall'
import CardLarge from '@/components/cards/CardLarge'
import Observer from '@/components/Observer'
import {bus} from '@/bus'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Cards.vue', () => {
  let vuetify
  let wrapper
  let actions
  let getters
  let store

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

    actions = {
      searchPhotos: jest.fn()
    }
    getters = {
      tagName: () => ('tag name'),
      photosListByOrientation: () => ([])
    }
    store = new Vuex.Store({
      getters,
      actions
    })

    wrapper = mount(Cards, {
      localVue,
      vuetify,
      store,
      propsData: {
        photosList: [],
        userName: {}
      },
      data: () => ({
        page: 1,
        newPhotos: [],
        root: null,
        threshold: 0.5,
        loading: false,
        newPhotosList: [],
        removablePhotosList: [],
        scrollableNewPhotos: [],
        items: ['landscape', 'portrait', 'squarish'],
        selectOrientation: null
      })
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it("renders CardSmall", () => {
    expect(wrapper.exists(CardSmall)).toBe(true)
  })

  it("renders CardLarge", () => {
    expect(wrapper.exists(CardLarge)).toBe(true)
  })

  it("renders Observer", () => {
    expect(wrapper.exists(Observer)).toBe(true)
  })

  it("renders bus", () => {
    expect(wrapper.exists(bus)).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders tagName using computed options', () => {
    const tagName = 'tag name'
    expect(JSON.stringify(wrapper.vm.tagName)).toBe(JSON.stringify(tagName))
  })

  it('when searchPhotos is called $emit is called', () => {
    wrapper.vm.$emit('change-photos', [])

    expect(wrapper.emitted('change-photos')).toBeTruthy()
    expect(wrapper.emitted('change-photos').length).toBe(1)
  })
})
