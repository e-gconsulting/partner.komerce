import { axiosKomship } from '../helpers'

export default {
  namespaced: true,
  state: {
    inbound: [],
    detailInbound: [],
    addProduct: [],
  },
  mutations: {
    LIST_INBOUND(state, listRiwayatInbound) {
      state.inbound = listRiwayatInbound
    },
    DETAIL_INBOUND(state, detailRiwayatInbound) {
      state.detailInbound = detailRiwayatInbound
    },
    LIST_ADD_PRODUCT(state, listAddProduct) {
      state.addProduct = listAddProduct
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch('getListInbound')
      dispatch('getDetailInbound')
      dispatch('getListAddProduct')
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

    async getListAddProduct({ commit, rootState }, query) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          '/v1/komship/submission/history/add-product',
        )
        commit('LIST_ADD_PRODUCT', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
