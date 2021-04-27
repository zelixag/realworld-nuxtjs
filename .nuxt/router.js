import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5ae9406a = () => interopDefault(import('../pages/layout/index.vue' /* webpackChunkName: "" */))
const _bee99036 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _71140d23 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _556c20e3 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _2d4fe7ae = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _b63c8a1a = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _3c366430 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _5ae9406a,
    children: [{
      path: "",
      component: _bee99036,
      name: "home"
    }, {
      path: "/login",
      component: _71140d23,
      name: "login"
    }, {
      path: "/register",
      component: _71140d23,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _556c20e3,
      name: "profile"
    }, {
      path: "/settings",
      component: _2d4fe7ae,
      name: "settings"
    }, {
      path: "/editor",
      component: _b63c8a1a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _3c366430,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
