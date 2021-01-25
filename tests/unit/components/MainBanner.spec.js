import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import MainBanner from '@/components/MainBanner'
import SearchNavigation from '@/components/SearchNavigation'
import {truncateTextMixin} from "@/mixins/truncateTextMixin"
import Vuex from 'vuex'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('MainBanner.vue', () => {
  let vuetify
  let wrapper
  let actions
  let store

  beforeEach(() => {
    vuetify = new Vuetify()

    actions = {
      fetchRandomPhoto: jest.fn()
    }

    store = new Vuex.Store({
      actions
    })

    wrapper = mount(MainBanner, {
      localVue,
      vuetify,
      store,
      propsData: {
        tags: []
      },
      data: () => ({
        bannerTitle: 'Photo of the Day by ',
        randomPhoto: {}
      })
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it("renders SearchNavigation", () => {
    expect(wrapper.exists(SearchNavigation)).toBe(true)
  })

  it("renders truncateTextMixin", () => {
    expect(wrapper.exists(truncateTextMixin)).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders props when passed', () => {
    const tags = []

    expect(wrapper.props()).toEqual({tags})
  })

  it('dispatches a fetchRandomPhoto action on mounted hook', () => {
    expect(actions.fetchRandomPhoto).toHaveBeenCalled()
    expect(actions.fetchRandomPhoto).toHaveBeenCalledTimes(1)
    expect(actions.fetchRandomPhoto.mock.calls.length).toBe(1)
  })
})
