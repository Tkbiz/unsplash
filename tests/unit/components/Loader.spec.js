import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Loader from '@/components/app/Loader'

Vue.use(Vuetify)

const localVue = createLocalVue()

describe('Loader.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Loader, {
      localVue,
      vuetify
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
})
