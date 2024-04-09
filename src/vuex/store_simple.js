import { reactive } from 'vue'

import { forEachValue } from './utils'
import { storeKey } from './injectKey'
export default class Store {
  constructor(options) {
    // console.log(options)
    const {
      state,
      getters,
      actions,
      mutations
    } = options

    const store = this

    // 主要为了解决replaceState问题，响应式不好处理
    store._state = reactive({
      data: state
    })

    store.getters = {}
    forEachValue(getters, (fn, key) => {
      Object.defineProperty(store.getters, key, {
        get: () => fn(store.state)
      })
    })

    // mutation action
    store._mutations = Object.create(null)
    store._actions = Object.create(null)

    forEachValue(mutations, (mutation, key) => {
      store._mutations[key] = (payload) => {
        mutation.call(store, store.state, payload )
      }
    })

    forEachValue(actions, (action, key) => {
      store._actions[key] = (payload) => {
        action.call(store, store, payload )
      }
    })

    console.log(3333, store._mutations, store._actions)
  }

  // 使用箭头函数的原因在于再对实例进行解构时，this丢失指向
  commit = (key, payload) => {
    this._mutations[key](payload)
  }

  dispatch = (key, payload) => {
    this._actions[key](payload)
  }

  get state() {
    return this._state.data
  }

  get aaa() {
    return this._state.data
  }

  install(app, injectKey = '') {
    app.provide(injectKey || storeKey, this)

    // 增添$store
    // Vue.prototype.$store = this
    app.config.globalProperties.$store = this
  }
}