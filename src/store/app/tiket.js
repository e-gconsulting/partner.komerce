import axiosIns from '@/libs/axios'
import httpKomship from '@/libs/axioskomsipdev'

export default {
  namespaced: true,
  state: {
    totalKendala: 0,
  },
  getters: {
    sisaSaldo(state) {
      return state.totalKendala
    },
  },
  mutations: {
    SET_FOLLOWUP(state, folowup) {
      state.totalKendala = folowup
      return state.totalKendala
    },
  },
  actions: {
    async init({ dispatch }) {
      await dispatch('getTiket')
    },
    async getTiket({ commit }) {
      try {
        const response = await httpKomship.get('/v1/ticket-partner/count/need-followup')
        commit('SET_FOLLOWUP', response.data.data.need_followup)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
