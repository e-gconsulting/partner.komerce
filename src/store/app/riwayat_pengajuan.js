import { axiosKomship } from '../helpers'

export default {
  namespaced: true,
  state: {
    inbound: [],
    detailInbound: [],
    addProduct: [],
    listWarehouses: [],
    berlangganan: [],
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
    LIST_WAREHOUSES(state, listWarehouse) {
      state.listWarehouses = listWarehouse
    },
    LIST_BERLANGGANAN(state, listBerlangganan) {
      state.berlangganan = listBerlangganan
    },
  },
  actions: {
    async init({ dispatch }) {
      dispatch('getListInbound')
      dispatch('getDetailInbound')
      dispatch('getListAddProduct')
      dispatch('getListWarehouses')
      dispatch('getListBerlangganan')
    },

    async getListInbound({ commit, rootState }, query) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          '/v1/komship/inbound', {
            params: query,
          },
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
          '/v1/komship/submission/history/add-product', {
            params: query,
          },
        )
        commit('LIST_ADD_PRODUCT', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },

    async getListWarehouses({ commit, rootState }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          '/v1/komship/inbound/warehouses',
        )
        commit('LIST_WAREHOUSES', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },

    async getListBerlangganan({ commit, rootState }) {
      try {
        const partnerId = rootState.auth.userData.partner_detail.id
        const response = await axiosKomship(partnerId).get(
          '/v1/komship/submission/history/subscribe',
        )
        commit('LIST_BERLANGGANAN', response.data.data)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
