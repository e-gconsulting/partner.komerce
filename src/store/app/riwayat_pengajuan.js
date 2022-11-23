import { axiosKomship } from '../helpers'

export default {
  namespaced: true,
  state: {
    inbound: [],
    detailInbound: [],
  },
  mutations: {
    LIST_INBOUND(state, listRiwayatInbound) {
      state.inbound = listRiwayatInbound
    },
    DETAIL_INBOUND(state, detailRiwayatInbound) {
      state.detailInbound = detailRiwayatInbound
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch('getListInbound')
      dispatch('getDetailInbound')
    },

    async getListInbound({ commit, rootState }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          '/v1/komship/inbound',
        )
        commit('LIST_INBOUND', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },

    async getDetailInbound({ commit, rootState }, query) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          '/v1/komship/inbound/detail', {
            params: query,
          },
        )
        commit('DETAIL_INBOUND', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
