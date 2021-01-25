import {mount, createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import ViewsChart from '@/components/charts/ViewsChart'
import {Bar} from 'vue-chartjs'

Vue.use(Vuetify)

const localVue = createLocalVue()

jest.mock('vue-chartjs')

describe('ViewsChart.vue', () => {
  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(ViewsChart, {
      localVue,
      vuetify,
      propsData: {
        photoViews: {
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
