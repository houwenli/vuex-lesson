import { inject } from 'vue'
const storeKey = 'store'

function useStore(injectKey = storeKey) {
  return inject(injectKey)
}

export {
  storeKey,
  useStore
}