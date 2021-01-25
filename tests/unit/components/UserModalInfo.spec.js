import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import UserModalInfo from '@/components/modal/UserModalInfo'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('UserModalInfo.vue', () => {
  let vuetify
  let wrapper
  let actions
  let store

  const $route = {
    path: '/user-account/1'
  }
  const mockPush = jest.fn()
  const $router = {
    push: mockPush
  }

  beforeEach(() => {
    vuetify = new Vuetify()

    actions = {
      fetchUserInfo: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })

    wrapper = mount(UserModalInfo, {
      localVue,
      vuetify,
      propsData: {
        userCard: {
          username: 'username',
          profile_image: {},
          name: 'name'
        }
      },
      store,
      mocks: {
        $route,
        $router
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
    const userCard = {
      username: 'username',
      profile_image: {},
      name: 'name'
    }

    expect(wrapper.props()).toEqual({userCard})
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("dispatches a fetchUserInfo action when avatar image is clicked", async () => {
    const username = 'username'

    wrapper.find('.v-avatar').trigger('click')
    await wrapper.vm.$nextTick()

    expect(actions.fetchUserInfo.mock.calls).toHaveLength(1)
    expect(actions.fetchUserInfo.mock.calls[0][1]).toEqual(username)
    expect(actions.fetchUserInfo).toHaveBeenCalled()
  })

  it("should go to user-account page when avatar image is clicked", async () => {
    wrapper.find('.v-avatar').trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockPush).toBeCalled()
  })

  it("dispatches a fetchUserInfo action when avatar image is clicked", async () => {
    const username = 'username'

    wrapper.find('.avatar-title').trigger('click')
    await wrapper.vm.$nextTick()

    expect(actions.fetchUserInfo.mock.calls).toHaveLength(1)
    expect(actions.fetchUserInfo.mock.calls[0][1]).toEqual(username)
    expect(actions.fetchUserInfo).toHaveBeenCalled()
  })

  it("should go to user-account page when avatar title is clicked", async () => {
    wrapper.find('.avatar-title').trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockPush).toBeCalled()
  })
})
