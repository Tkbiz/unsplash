import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Modal from '@/components/modal/Modal'
import ViewsChart from '@/components/charts/ViewsChart'
import LikesChart from '@/components/charts/LikesChart'
import ModalStats from '@/components/modal/ModalStats'
import UserModalInfo from '@/components/modal/UserModalInfo'
import Loader from '@/components/app/Loader'
import Vuex from 'vuex'

Vue.use(Vuetify)
Vue.component('Loader', Loader)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Modal.vue', () => {
  let vuetify
  let wrapper
  let actions
  let getters
  let store
  const spy = {}

  beforeEach(() => {
    vuetify = new Vuetify()

    getters = {
      isLoggedIn: () => false,
      userCollections: () => ([]),
      isAddedToCollection: () => false,
      isLiked: () => false
    }
    actions = {
      searchPhotos: jest.fn(),
      addLike: jest.fn(),
      addToCollection: jest.fn(),
      fetchUserCollections: jest.fn()
    }
    store = new Vuex.Store({
      getters,
      actions
    })

    const el = document.createElement('div')
    el.setAttribute('data-app', true)
    document.body.appendChild(el)

    spy.closeModal = jest.spyOn(Modal.methods, 'closeModal')

    wrapper = mount(Modal, {
      localVue,
      vuetify,
      propsData: {
        visibleModal: true,
        card: {
          user: {},
          tags: []
        },
        samePhotos: [],
        tagName: 'tag name',
        photoStats: {},
        userName: 'user name'
      },
      data: () => ({
        page: 1,
        sameNewPhotos: [],
        loading: false,
        showMessage: false,
        showCollectionsList: false
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

  it('renders ViewsChart', () => {
    expect(wrapper.exists(ViewsChart)).toBe(true)
  })

  it('renders LikesChart', () => {
    expect(wrapper.exists(LikesChart)).toBe(true)
  })

  it('renders ModalStats', () => {
    expect(wrapper.exists(ModalStats)).toBe(true)
  })

  it('renders UserModalInfo', () => {
    expect(wrapper.exists(UserModalInfo)).toBe(true)
  })

  it('renders Loader', () => {
    expect(wrapper.exists(Loader)).toBe(true)
  })

  it('renders props when passed', () => {
    const visibleModal = true
    const card = {
      user: {},
      tags: []
    }
    const samePhotos = []
    const tagName = 'tag name'
    const photoStats = {}
    const userName = 'user name'
    expect(wrapper.props()).toEqual({
      visibleModal,
      card,
      samePhotos,
      tagName,
      photoStats,
      userName
    })
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders isLoggedIn using computed options', () => {
    expect(wrapper.vm.isLoggedIn).toBe(undefined)
  })

  it('renders userCollections using computed options', () => {
    expect(JSON.stringify(wrapper.vm.userCollections)).toBe(JSON.stringify([]))
  })

  it('renders isAddedToCollection using computed options', () => {
    expect(wrapper.vm.isAddedToCollection).toBe(false)
  })

  it('renders isLiked using computed options', () => {
    expect(wrapper.vm.isLiked).toBe(false)
  })

  it('renders showModal using computed options', () => {
    expect(wrapper.vm.showModal).toBe(true)
  })

  it('when button is clicked modal will be closed', () => {
    wrapper.find('.btn-close').trigger('click')
    wrapper.vm.$nextTick()

    expect(spy.closeModal).toHaveBeenCalled()
  })

  it("dispatches a searchPhotos action when button is clicked", async () => {
    const tagName = 'tag name'
    const page = 2

    wrapper.find('.dialog-body .py-0 .v-btn').trigger('click')
    await wrapper.vm.$nextTick()

    expect(actions.searchPhotos.mock.calls).toHaveLength(1)
    expect(actions.searchPhotos.mock.calls[0][1]).toEqual({tagName, page})
    expect(actions.searchPhotos).toHaveBeenCalled()
  })

  it("dispatches a addLike action when button is clicked", async () => {
    const id = 'id'
    wrapper.find('.action-block .btn-like').trigger('click')
    await wrapper.vm.$nextTick()

    if (wrapper.vm.isLoggedIn) {
      if (wrapper.vm.isLiked !== true) {
        expect(actions.addLike.mock.calls).toHaveLength(1)
        expect(actions.addLike.mock.calls[0][1]).toEqual({id})
        expect(actions.addLike).toHaveBeenCalled()
      }
    }
  })

  it("dispatches a fetchUserCollections action when button is clicked", async () => {
    const userName = 'user name'
    wrapper.find('.action-block .btn-add').trigger('click')
    await wrapper.vm.$nextTick()

    if (wrapper.vm.isLoggedIn) {
      wrapper.setData({showCollectionsList: true})

      expect(actions.fetchUserCollections.mock.calls).toHaveLength(1)
      expect(actions.fetchUserCollections.mock.calls[0][1]).toEqual({userName})
      expect(actions.fetchUserCollections).toHaveBeenCalled()
    }
  })

  it("dispatches a addToCollection action when button is clicked", async () => {
    const collectionId = 'collectionId'
    const photoId = 'photoId'
    wrapper.find('.action-block .btn-add').trigger('click')
    await wrapper.vm.$nextTick()

    if (wrapper.vm.showCollectionsList) {
      expect(actions.addToCollection.mock.calls).toHaveLength(1)
      expect(actions.addToCollection.mock.calls[0][1]).toEqual({collectionId, photoId})
      expect(actions.addToCollection).toHaveBeenCalled()
    }
  })
})
