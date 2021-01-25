import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import LikesChart from '@/components/charts/LikesChart'
import {Line} from 'vue-chartjs'

jest.mock('vue-chartjs')

Vue.use(Vuetify)

const localVue = createLocalVue()

describe('LikesChart.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(LikesChart, {
      localVue,
      vuetify,
      propsData: {
        photoLikes: {
          historical: {
            values: []
          }
        }
      }
    })
  })

  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
