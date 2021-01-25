import {mount, createLocalVue} from '@vue/test-utils'
import Observer from '@/components/Observer'

const localVue = createLocalVue()
const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()

window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect
}))

describe('Observer.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Observer, {
      localVue,
      propsData: {
        options: []
      },
      data: () => ({
        observer: null
      })
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should create an observer if IntersectionObserver is available', () => {
    expect(observe).toHaveBeenCalled()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
