import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import SearchNavigation from '@/components/SearchNavigation'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('SearchNavigation.vue', () => {
  let vuetify
  let wrapper
  let actions
  let mutations
  let getters
  let store

  beforeEach(() => {
    vuetify = new Vuetify()
    getters = {
      photosNewList: () => []
    }
    actions = {
      searchPhotos: jest.fn()
    }
    mutations = {
      fetchTagName: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions,
      mutations
    })

    wrapper = mount(SearchNavigation, {
      localVue,
      vuetify,
      propsData: {
        tags: []
      },
      data: () => ({
        search: null,
        page: 1
      }),
      store
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

  it('renders props.tags when passed', () => {
    const tags = []
    expect(wrapper.props()).toEqual({tags})
    expect(wrapper.props().tags).toEqual([])
  })

  it('when searchPhotos is called $emit is called', () => {
    wrapper.vm.$emit('change-photos', [])

    expect(wrapper.emitted('change-photos')).toBeTruthy()
    expect(wrapper.emitted('change-photos').length).toBe(1)
  })
})
