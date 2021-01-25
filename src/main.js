import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Loader from '@/components/app/Loader'
import VueCarousel from 'vue-carousel'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, {lodash: lodash})

Vue.use(VueCarousel)

Vue.component('Loader', Loader)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
