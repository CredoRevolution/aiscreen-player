import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    availableNetworks: [],
    activeNetwork: null,
    newNetwork: null,
  },
  getters: {
    availableNetworks: (state) => state.availableNetworks,
    activeNetwork: (state) => state.activeNetwork,
    newNetwork: (state) => state.newNetwork,
  },
  mutations: {
    setAvailableNetworks(state, networks) {
      state.availableNetworks = networks
    },
    setActiveNetwork(state, network) {
      state.activeNetwork = network
    },
    setNewNetwork(state, network) {
      state.newNetwork = network
    },
  },
  actions: {
    setAvailableNetworks({ commit }, networks) {
      commit('setAvailableNetworks', networks)
    },
    setActiveNetwork({ commit }, network) {
      commit('setActiveNetwork', network)
    },
    setNewNetwork({ commit }, network) {
      commit('setNewNetwork', network)
    },
  },
  modules: {},
})
