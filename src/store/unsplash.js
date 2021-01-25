import {createApi} from "unsplash-js"

export const unsplash = createApi({
  accessKey: process.env.VUE_APP_UNSPLASH_ACCESS_KEY
})
