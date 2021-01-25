import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Navbar from '@/components/Navbar'

Vue.use(Vuetify)
Vue.use(VueRouter)

const localVue = createLocalVue()
localVue.use(Vuex)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/profile',
      name: 'Profile'
    },
    {
      path: '/collections-list',
      name: 'Featured Collections'
    }
  ]
})

describe('Navbar.vue', () => {
  let vuetify
  let wrapper
  let actions
  let getters
  let store

  beforeEach(() => {
    vuetify = new Vuetify()
    getters = {
      isLoggedIn: () => false,
      loginUrl: () => (`${process.env.VUE_APP_UNSPLASH_AUTH}?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${process.env.VUE_APP_UNSPLASH_REDIRECT_URI}&response_type=${process.env.VUE_APP_UNSPLASH_RESPONSE_TYPE}&scope=${process.env.VUE_APP_UNSPLASH_SCOPE}`)
    }
    actions = {
      logout: jest.fn(),
      login: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions
    })

    wrapper = mount(Navbar, {
      localVue,
      vuetify,
      store,
      router,
      data: () => ({
        sidebar: false
      })
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders isLoggedIn using computed options', () => {
    expect(wrapper.vm.isLoggedIn).toBe(undefined)
  })
})
