import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import CardSmall from '@/components/cards/CardSmall'
import Modal from '@/components/modal/Modal'
import {truncateTextMixin} from '@/mixins/truncateTextMixin'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CardSmall.vue', () => {
  let vuetify
  let wrapper
  let actions
  let store

  beforeEach(() => {
    vuetify = new Vuetify()

    actions = {
      searchPhotos: jest.fn(),
      fetchPhotoStats: jest.fn(),
      downloadPhoto: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })

    const el = document.createElement('div')
    el.setAttribute('data-app', true)
    document.body.appendChild(el)

    wrapper = mount(CardSmall, {
      localVue,
      vuetify,
      propsData: {
        card: {
          urls: {},
          user: {},
          tags: []
        },
        userName: ''
      },
      data: () => ({
        modal: false,
        tagName: '',
        samePhotos: [],
        photoStats: {},
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

  it("renders truncateTextMixin", () => {
    expect(wrapper.exists(truncateTextMixin)).toBe(true)
  })

  it("renders Modal", () => {
    expect(wrapper.exists(Modal)).toBe(true)
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders props when passed', () => {
    const card = {
      urls: {},
      user: {},
      tags: []
    }
    const userName = ''
    expect(wrapper.props()).toEqual({card, userName})
  })

  // it('dispatches a searchPhotos action when image is clicked', async () => {
  //   const tagName = ''
  //   const page = 1
  //
  //   wrapper.find('.card-img').trigger('click')
  //   await wrapper.vm.$nextTick()
  //
  //   expect(actions.searchPhotos.mock.calls).toHaveLength(1)
  //   expect(actions.searchPhotos.mock.calls[0][1]).toEqual({tagName, page})
  //   expect(actions.searchPhotos).toHaveBeenCalled()
  // })
  //
  // it('dispatches a searchPhotos action when card is clicked', async () => {
  //   const tagName = ''
  //   const page = 1
  //
  //   wrapper.find('.card-body').trigger('click')
  //   await wrapper.vm.$nextTick()
  //
  //   expect(actions.searchPhotos.mock.calls).toHaveLength(1)
  //   expect(actions.searchPhotos.mock.calls[0][1]).toEqual({tagName, page})
  //   expect(actions.searchPhotos).toHaveBeenCalled()
  // })
  //
  // it('dispatches a fetchPhotoStats action when image is clicked', async () => {
  //   wrapper.find('.card-img').trigger('click')
  //   await wrapper.vm.$nextTick()
  //
  //   expect(actions.fetchPhotoStats.mock.calls).toHaveLength(1)
  //   expect(actions.fetchPhotoStats).toHaveBeenCalled()
  // })
  //
  // it('dispatches a fetchPhotoStats action when card is clicked', async () => {
  //   wrapper.find('.card-body').trigger('click')
  //   await wrapper.vm.$nextTick()
  //
  //   expect(actions.fetchPhotoStats.mock.calls).toHaveLength(1)
  //   expect(actions.fetchPhotoStats).toHaveBeenCalled()
  // })

  it('dispatches a downloadPhoto action when button is clicked', async () => {
    wrapper.find('.card-footer .ml-n2 .v-btn').trigger('click')
    await wrapper.vm.$nextTick()

    expect(actions.downloadPhoto.mock.calls).toHaveLength(1)
    expect(actions.downloadPhoto).toHaveBeenCalled()
  })
})
