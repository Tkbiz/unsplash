import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import ModalStats from '@/components/modal/ModalStats'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ModalStats.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(ModalStats, {
      localVue,
      vuetify,
      propsData: {
        photoStats: {},
        tags: []
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders props when passed', () => {
     const photoStats = {}
     const tags = []

    expect(wrapper.props()).toEqual({photoStats, tags})
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
