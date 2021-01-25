import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import App from '@/App'
import Navbar from '@/components/Navbar'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue', () => {
  let vuetify
  let wrapper
  let actions
  let getters
  let store

  const $route = {
    path: '/',
    query: {
      code: 'code'
    }
  }
  const mockPush = jest.fn()
  const $router = {
    push: mockPush
  }

  beforeEach(() => {
    vuetify = new Vuetify()

    getters = {}
    actions = {
      login: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions
    })

    wrapper = mount(App, {
      localVue,
      vuetify,
      store,
      mocks: {
        $route,
        $router
      },
      stubs: ['router-view', 'router-link']
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders Navbar', () => {
    expect(wrapper.exists(Navbar)).toBe(true)
  })
})
