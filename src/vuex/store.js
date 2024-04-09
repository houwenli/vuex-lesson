import { reactive } from 'vue'

import { forEachValue } from './utils'
import { storeKey } from './injectKey'

import ModuleCollection from './module/moduleCollection'

// 递归生成state
function installModule(store, rootState, path = [], module) {
  let isRoot = !path.length

  // [a, b, c]
  if (!isRoot) {
    let parentState = path.slice(0, -1).reduce((state, key) => {
      return state[key]
    }, rootState)

    parentState[path[path.length - 1]] = module.state
  }

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child)
  })
}

export default class Store {
  constructor(options) {
    const store = this
    store._modules = new ModuleCollection(options)

    // state赋值
    // store.state.aCount.cCount.count
    // store.state.count
    // store.state.aCount.count
    const state = store._modules.root.state // 根节点
    installModule(store, state, [], store._modules.root)

    // 主要为了解决replaceState问题，响应式不好处理
    store._state = reactive({
      data: state
    })

  }

  get state() {
    return this._state.data
  }

  install(app, injectKey = '') {
    app.provide(injectKey || storeKey, this)

    // 增添$store
    // Vue.prototype.$store = this
    app.config.globalProperties.$store = this
  }
}

// 格式化用户参数
