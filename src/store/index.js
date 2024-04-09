import { createStore } from '@/vuex'

export default createStore({
  state: {
    count: 1
  },
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  mutations: {
    add(state, payload) {
      state.count += payload
    }
  },
  actions: {
    asyncAdd ({ commit }, payload) {
      setTimeout(() => {
        commit('add', payload)
      }, 1000)
    }
  },
  modules: { // 子模块
    aCount: {
      namespaced: true,
      state: {
        count: 2
      },
      mutations: {
        add(state, payload) {
          state.count += payload
        }
      },
      modules: {
        cCount: {
          namespaced: true,
          state: {
            count: 4
          },
          mutations: {
            add(state, payload) {
              state.count += payload
            }
          },
        },
      }
    },
    bCount: {
      namespaced: true,
      state: {
        count: 3
      },
      mutations: {
        add(state, payload) {
          state.count += payload
        }
      },
    }
  }
})

// dispatchEvent(action) => commit(mutation)
