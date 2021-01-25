import Vue from 'vue'
import Vuex from 'vuex'

import random_photo from '@/store/modules/random_photo'
import search_photos from '@/store/modules/search_photos'
import user_accounts from '@/store/modules/user_accounts'
import my_profile from '@/store/modules/my_profile'
import collections from '@/store/modules/collections'
import download_photo from '@/store/modules/download_photo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    random_photo,
    search_photos,
    user_accounts,
    my_profile,
    collections,
    download_photo
  }
})
