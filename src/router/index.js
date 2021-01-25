import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import auth from '@/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user-account/:id',
    name: 'User Account',
    component: () => import('../views/UserAccount')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile'),
    meta: {
      middleware: [
        auth
      ]
    }
  },
  {
    path: '/collections-list',
    name: 'Featured Collections',
    component: () => import('../views/CollectionsList')
  },
  {
    path: '/collection/:id',
    name: 'Collection',
    component: () => import('../views/Collection')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store,
    router
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})


export default router
