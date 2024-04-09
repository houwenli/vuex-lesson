<template>
  <div>{{ count }}</div>
  <!-- <div>{{ $store.state.count }}</div>
  <div>{{ double }}</div>
  <button @click="add">加</button>
  <button @click="asyncAdd">异步加</button> -->

  <br>
  A模块
  <div>{{ aCount }}</div>
  <!-- <button @click="addA">加A</button> -->

  <br>
  B模块
  <div>{{ bCount }}</div>
  <!-- <button @click="addB">加B</button> -->

  <br>
  C模块
  <div>{{ cCount }}</div>
  <!-- <button @click="addC">加C</button> -->
</template>

<script>

import { useStore } from '@/vuex'
import { computed, inject, getCurrentInstance } from 'vue';

export default {
  name: 'App',
  components: {
  },
  setup() {
    const store = useStore()

    console.log(111, store)

    // function add () {
    //   store.state.aCount.count++
    // }

    function add() {
      store.commit('add', 1)
    }

    function asyncAdd() {
      const { dispatch } = store
      dispatch('asyncAdd', 2)
    }

    function addA() {
      store.commit('aCount/add', 2)
    }

    function addB() {
      store.commit('bCount/add', 3)
    }

    function addC() {
      store.commit('aCount/cCount/add', 3)
    }

    return {
      count: computed(() => store.state.count),
      // double: computed(() => store.getters.double),
      add,
      // asyncAdd,
      aCount: computed(() => store.state.aCount.count),
      // addA,
      bCount: computed(() => store.state.bCount.count),
      // addB,
      cCount: computed(() => store.state.aCount.cCount.count),
      // addC
    }
  }
}
</script>


